// backend/routes/adminReservasRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// Asegurar que la tabla reservas existe y tiene todas las columnas (PostgreSQL)
async function ensureReservasTable() {
  console.log('📋 [ADMIN RESERVAS] Comprobando tabla reservas...');
  await db.query(`
    CREATE TABLE IF NOT EXISTS reservas (
      id TEXT PRIMARY KEY,
      nombre TEXT,
      telefono TEXT,
      email TEXT,
      origen TEXT,
      destino TEXT,
      precio NUMERIC(12,2),
      carga TEXT,
      ayudante BOOLEAN DEFAULT false,
      fecha TIMESTAMPTZ DEFAULT NOW(),
      estado TEXT DEFAULT 'pendiente',
      usuario_id INTEGER,
      conductor_asignado TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  const columns = [
    'nombre TEXT',
    'telefono TEXT',
    'email TEXT',
    'origen TEXT',
    'destino TEXT',
    'precio NUMERIC(12,2)',
    'fecha TIMESTAMPTZ DEFAULT NOW()',
    'hora TEXT',
    'carga TEXT',
    'ayudante BOOLEAN DEFAULT false',
    'estado TEXT DEFAULT \'pendiente\'',
    'usuario_id INTEGER',
    'conductor_asignado TEXT',
    'vehiculo_id UUID',
    'recordatorio_enviado_at TIMESTAMPTZ',
    'created_at TIMESTAMPTZ DEFAULT NOW()',
    'updated_at TIMESTAMPTZ DEFAULT NOW()',
  ];
  for (const col of columns) {
    const [name, rest] = col.split(/\s+(.+)/);
    await db.query(`ALTER TABLE reservas ADD COLUMN IF NOT EXISTS ${name} ${rest || ''};`);
  }
  console.log('📋 [ADMIN RESERVAS] Tabla reservas lista.');
}

router.use(async (req, res, next) => {
  try {
    await ensureReservasTable();
    next();
  } catch (err) {
    console.error('❌ [ADMIN RESERVAS] Error asegurando tabla reservas:', err);
    res.status(500).json({ error: 'Error inicializando base de datos' });
  }
});

// GET /api/admin/reservas - Listar reservas para el panel admin
router.get('/admin/reservas', async (req, res) => {
  try {
    console.log('📋 [ADMIN RESERVAS] GET /admin/reservas llamado');
    const result = await db.query(
      `SELECT * FROM reservas ORDER BY id DESC LIMIT 500`
    );
    const rows = result.rows;
    console.log('📋 [ADMIN RESERVAS] Encontradas', rows.length, 'reservas');
    const reservas = rows.map((r) => ({
      id: r.id,
      usuario_nombre: r.nombre ?? r.usuario_nombre ?? '',
      usuario_email: r.email ?? r.usuario_email ?? '',
      origen: r.origen ?? '',
      destino: r.destino ?? '',
      precio: r.precio != null ? parseFloat(r.precio) : null,
      estado: r.estado || 'pendiente',
      fecha: (r.fecha ? new Date(r.fecha) : (r.created_at ? new Date(r.created_at) : null))?.toISOString?.() ?? null,
      hora: r.hora ?? null,
      carga: r.carga ?? null,
      ayudante: r.ayudante ?? null,
      vehiculo_id: r.vehiculo_id ?? null,
    }));
    res.json({ reservas });
  } catch (err) {
    console.error('❌ [ADMIN RESERVAS] Error listando reservas:', err);
    res.status(500).json({ error: 'Error listando reservas', reservas: [] });
  }
});

// PATCH /api/admin/reservas/:id - Actualizar estado (ej. cancelar)
router.patch('/admin/reservas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body || {};
    const valid = ['pendiente', 'confirmado', 'en_proceso', 'completado', 'cancelado'];
    if (!estado || !valid.includes(estado)) {
      return res.status(400).json({ error: 'estado inválido. Use: pendiente, confirmado, en_proceso, completado, cancelado' });
    }
    const { rowCount } = await db.query(
      'UPDATE reservas SET estado = $1, updated_at = NOW() WHERE id = $2',
      [estado, id]
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json({ success: true, estado });
  } catch (err) {
    console.error('❌ [ADMIN RESERVAS] Error actualizando estado:', err);
    res.status(500).json({ error: 'Error actualizando reserva' });
  }
});

module.exports = router;
