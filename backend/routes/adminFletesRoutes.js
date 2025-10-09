const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const { enviarSolicitudAConductores } = require('../chatbots/conductorBot');

// Asegurar tabla admin_fletes sin colisiones de tipo
async function ensureTable() {
  await db.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
  await db.query(`
    CREATE TABLE IF NOT EXISTS admin_fletes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid()
    );
  `);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS origen TEXT;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS destino TEXT;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS carga TEXT;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS ayudante BOOLEAN NOT NULL DEFAULT false;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS precio INTEGER;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS nota TEXT;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS cliente_nombre TEXT;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS cliente_telefono TEXT;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS programado_para TIMESTAMPTZ;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS estado TEXT NOT NULL DEFAULT 'enviado';`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS conductor_asignado TEXT;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS enviados_a JSONB;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS creado_por TEXT;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();`);
}

router.use(async (req, res, next) => {
  try { await ensureTable(); next(); } catch (err) {
    console.error('❌ [ADMIN FLETES] Error asegurando tabla:', err);
    res.status(500).json({ error: 'DB init error' });
  }
});

router.post('/admin/fletes/send', async (req, res) => {
  try {
    const client = req.whatsapp;
    if (!client || typeof client.sendMessage !== 'function') {
      return res.status(500).json({ error: 'WhatsApp no disponible' });
    }

    const {
      origen,
      destino,
      carga,
      ayudante = false,
      precio = null,
      nota = null,
      creadoPor = null,
      clienteNombre = null,
      clienteTelefono = null,
      programadoPara = null
    } = req.body || {};

    if (!origen || !destino || !carga) {
      return res.status(400).json({ error: 'Campos requeridos: origen, destino, carga' });
    }

    const insertSql = `
      INSERT INTO admin_fletes (
        origen, destino, carga, ayudante, precio, nota,
        cliente_nombre, cliente_telefono, programado_para,
        estado, creado_por
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'enviado',$10)
      RETURNING *
    `;
    const params = [
      origen,
      destino,
      carga,
      !!ayudante,
      precio,
      nota,
      clienteNombre,
      clienteTelefono,
      programadoPara ? new Date(programadoPara) : null,
      creadoPor
    ];
    const { rows } = await db.query(insertSql, params);
    const flete = rows[0];

    await enviarSolicitudAConductores({
      id: flete.id,
      origen: flete.origen,
      destino: flete.destino,
      carga: flete.carga,
      ayudante: flete.ayudante,
      precio: flete.precio,
      nombre: flete.cliente_nombre || 'Cliente',
      telefono: flete.cliente_telefono || '',
      programadoPara: flete.programado_para
    }, req.whatsapp);

    await db.query('UPDATE admin_fletes SET enviados_a = $1, updated_at = NOW() WHERE id = $2', [JSON.stringify({ broadcast: true, at: new Date().toISOString() }), flete.id]);

    res.status(201).json({ success: true, fleteId: flete.id, estado: 'enviado' });
  } catch (err) {
    console.error('❌ [ADMIN FLETES] Error en send:', err);
    res.status(500).json({ error: 'Error enviando a conductores' });
  }
});

router.post('/admin/fletes/:id/estado', async (req, res) => {
  try {
    const { id } = req.params; const { estado } = req.body || {};
    const valid = ['pendiente','enviado','asignado','en_progreso','completado','cancelado_admin','cancelado_conductor','cancelado_cliente','expirado'];
    if (!valid.includes(estado)) return res.status(400).json({ error: 'Estado inválido' });
    await db.query('UPDATE admin_fletes SET estado=$1, updated_at=NOW() WHERE id=$2', [estado, id]);
    res.json({ success: true });
  } catch (err) {
    console.error('❌ [ADMIN FLETES] Error actualizando estado:', err);
    res.status(500).json({ error: 'Error actualizando estado' });
  }
});

router.get('/admin/fletes', async (req, res) => {
  try {
    const { estado } = req.query; let sql = 'SELECT * FROM admin_fletes'; const params = [];
    if (estado) { sql += ' WHERE estado = $1'; params.push(estado); }
    sql += ' ORDER BY created_at DESC LIMIT 200';
    const { rows } = await db.query(sql, params); res.json(rows);
  } catch (err) {
    console.error('❌ [ADMIN FLETES] Error listando:', err);
    res.status(500).json({ error: 'Error listando fletes' });
  }
});

router.get('/admin/fletes/:id', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM admin_fletes WHERE id=$1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error('❌ [ADMIN FLETES] Error obteniendo detalle:', err);
    res.status(500).json({ error: 'Error obteniendo detalle' });
  }
});

module.exports = router;
