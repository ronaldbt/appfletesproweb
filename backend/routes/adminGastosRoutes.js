// backend/routes/adminGastosRoutes.js - Gastos para contabilidad (bencina, repuestos, salario, etc.)
const express = require('express');
const router = express.Router();
const db = require('../utils/db');

const TIPOS_GASTO = ['bencina', 'repuestos', 'mantenimiento', 'salario', 'peaje', 'multas', 'otros'];

// Fecha a YYYY-MM-DD usando día civil (evita que 1 marzo se devuelva como 28 feb en UTC)
function fechaToYYYYMMDD(val) {
  if (!val) return null;
  if (typeof val === 'string' && val.length >= 10 && !val.includes('T')) return val.slice(0, 10);
  const d = new Date(val);
  if (isNaN(d.getTime())) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

async function ensureGastosTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS gastos (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      tipo TEXT NOT NULL,
      monto NUMERIC(12,2) NOT NULL,
      fecha DATE NOT NULL DEFAULT CURRENT_DATE,
      descripcion TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

router.use(async (req, res, next) => {
  try {
    await ensureGastosTable();
    next();
  } catch (err) {
    console.error('❌ [ADMIN GASTOS] Error:', err);
    res.status(500).json({ error: 'Error inicializando tabla gastos' });
  }
});

// GET /api/admin/gastos - Listar gastos (opcional: ?desde=YYYY-MM-DD&hasta=YYYY-MM-DD)
router.get('/admin/gastos', async (req, res) => {
  try {
    console.log('📋 [ADMIN GASTOS] GET /admin/gastos', req.query || {});
    const { desde, hasta } = req.query || {};
    let sql = 'SELECT * FROM gastos WHERE 1=1';
    const params = [];
    let i = 1;
    if (desde) {
      sql += ` AND fecha >= $${i}`;
      params.push(desde);
      i++;
    }
    if (hasta) {
      sql += ` AND fecha <= $${i}`;
      params.push(hasta);
      i++;
    }
    sql = sql.replace('SELECT *', "SELECT id, tipo, monto, to_char(fecha, 'YYYY-MM-DD') AS fecha, descripcion, created_at");
    sql += ' ORDER BY fecha DESC, created_at DESC LIMIT 500';
    const { rows } = await db.query(sql, params);
    const normalized = rows;
    console.log('📋 [ADMIN GASTOS] Listados', normalized.length, 'gastos');
    res.json(normalized);
  } catch (err) {
    console.error('❌ [ADMIN GASTOS] Error listando:', err.message, err.stack);
    res.status(500).json({ error: 'Error listando gastos' });
  }
});

// POST /api/admin/gastos - Crear gasto
router.post('/admin/gastos', async (req, res) => {
  try {
    console.log('📋 [ADMIN GASTOS] POST /admin/gastos recibido, body:', JSON.stringify(req.body || {}));
    const { tipo, monto, fecha, descripcion } = req.body || {};
    if (!tipo || !TIPOS_GASTO.includes(tipo)) {
      console.warn('⚠️ [ADMIN GASTOS] tipo inválido:', tipo);
      return res.status(400).json({ error: 'tipo inválido. Use: ' + TIPOS_GASTO.join(', ') });
    }
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum < 0) {
      console.warn('⚠️ [ADMIN GASTOS] monto inválido:', monto, '->', montoNum);
      return res.status(400).json({ error: 'monto debe ser un número positivo' });
    }
    const fechaVal = fecha || new Date().toISOString().slice(0, 10);
    console.log('📋 [ADMIN GASTOS] Insertando gasto:', { tipo, montoNum, fechaVal, descripcion: descripcion || null });
    const { rows } = await db.query(
      `INSERT INTO gastos (tipo, monto, fecha, descripcion) VALUES ($1, $2, $3, $4) RETURNING *`,
      [tipo, montoNum, fechaVal, descripcion || null]
    );
    const row = rows[0];
    const normalized = row ? { ...row, fecha: fechaToYYYYMMDD(row.fecha) } : row;
    console.log('✅ [ADMIN GASTOS] Gasto creado:', normalized?.id);
    res.status(201).json(normalized);
  } catch (err) {
    console.error('❌ [ADMIN GASTOS] Error creando:', err.message, err.stack);
    res.status(500).json({ error: err.message || 'Error creando gasto' });
  }
});

// DELETE /api/admin/gastos/:id
router.delete('/admin/gastos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM gastos WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.json({ success: true });
  } catch (err) {
    console.error('❌ [ADMIN GASTOS] Error eliminando:', err);
    res.status(500).json({ error: 'Error eliminando gasto' });
  }
});

module.exports = router;
