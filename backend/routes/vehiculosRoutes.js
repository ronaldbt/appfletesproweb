// backend/routes/vehiculosRoutes.js - CRUD flota propia (camiones)
const express = require('express');
const router = express.Router();
const db = require('../utils/db');

async function ensureTable() {
  await db.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
  await db.query(`
    CREATE TABLE IF NOT EXISTS vehiculos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      patente TEXT NOT NULL,
      tipo TEXT,
      nombre TEXT,
      activo BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  try {
    await db.query(`CREATE UNIQUE INDEX IF NOT EXISTS vehiculos_patente_key ON vehiculos (patente);`);
  } catch (_) {}
}

router.use(async (req, res, next) => {
  try {
    await ensureTable();
    next();
  } catch (err) {
    console.error('❌ [VEHICULOS] Error init:', err);
    res.status(500).json({ error: 'Error inicializando tabla vehiculos' });
  }
});

// GET list
router.get('/admin/vehiculos', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT * FROM vehiculos ORDER BY nombre ASC NULLS LAST, patente ASC LIMIT 200
    `);
    res.json(rows);
  } catch (err) {
    console.error('❌ [VEHICULOS] Error listando:', err);
    res.status(500).json({ error: 'Error listando vehículos' });
  }
});

// POST create
router.post('/admin/vehiculos', async (req, res) => {
  try {
    const { patente, tipo, nombre, activo = true } = req.body || {};
    if (!patente || !String(patente).trim()) {
      return res.status(400).json({ error: 'patente es requerida' });
    }
    const { rows } = await db.query(
      `INSERT INTO vehiculos (patente, tipo, nombre, activo) VALUES ($1, $2, $3, $4) RETURNING *`,
      [String(patente).trim().toUpperCase(), tipo || null, nombre || null, !!activo]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Ya existe un vehículo con esa patente' });
    console.error('❌ [VEHICULOS] Error creando:', err);
    res.status(500).json({ error: 'Error creando vehículo' });
  }
});

// PUT update
router.put('/admin/vehiculos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { patente, tipo, nombre, activo } = req.body || {};
    const { rows } = await db.query(
      `UPDATE vehiculos SET 
        patente = COALESCE($1, patente),
        tipo = COALESCE($2, tipo),
        nombre = COALESCE($3, nombre),
        activo = COALESCE($4, activo),
        updated_at = NOW()
       WHERE id = $5 RETURNING *`,
      [patente != null ? String(patente).trim().toUpperCase() : null, tipo, nombre, activo, id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Vehículo no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Ya existe un vehículo con esa patente' });
    console.error('❌ [VEHICULOS] Error actualizando:', err);
    res.status(500).json({ error: 'Error actualizando vehículo' });
  }
});

// DELETE
router.delete('/admin/vehiculos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM vehiculos WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Vehículo no encontrado' });
    res.json({ success: true });
  } catch (err) {
    console.error('❌ [VEHICULOS] Error eliminando:', err);
    res.status(500).json({ error: 'Error eliminando vehículo' });
  }
});

module.exports = router;
