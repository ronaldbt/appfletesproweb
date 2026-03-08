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
    'iva_incluido BOOLEAN DEFAULT true',
    'cobrado BOOLEAN DEFAULT true',
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
    const unificado = req.query.unificado === '1' || req.query.unificado === 'true';
    if (unificado) {
      const [reservasRes, fletesRes] = await Promise.all([
        db.query(`SELECT * FROM reservas ORDER BY COALESCE(fecha, created_at) DESC NULLS LAST LIMIT 500`),
        db.query(`SELECT * FROM admin_fletes ORDER BY COALESCE(programado_para, created_at) DESC NULLS LAST LIMIT 500`)
      ]);
      const reservasList = (reservasRes.rows || []).map((r) => ({
        id: r.id,
        source: 'reserva',
        usuario_nombre: r.nombre ?? '',
        usuario_email: r.email ?? '',
        origen: r.origen ?? '',
        destino: r.destino ?? '',
        precio: r.precio != null ? parseFloat(r.precio) : null,
        estado: r.estado || 'pendiente',
        fecha: (r.fecha ? new Date(r.fecha) : (r.created_at ? new Date(r.created_at) : null))?.toISOString?.() ?? null,
        hora: r.hora ?? null,
        carga: r.carga ?? null,
        ayudante: r.ayudante ?? null,
        vehiculo_id: r.vehiculo_id ?? null,
        iva_incluido: r.iva_incluido !== false,
        cobrado: r.cobrado !== false,
      }));
      const fletesList = (fletesRes.rows || []).map((f) => ({
        id: f.id,
        source: 'flete',
        usuario_nombre: f.cliente_nombre ?? '',
        usuario_telefono: f.cliente_telefono ?? '',
        usuario_email: '',
        origen: f.origen ?? '',
        destino: f.destino ?? '',
        precio: f.precio != null ? parseFloat(f.precio) : null,
        estado: f.estado || 'enviado',
        fecha: (f.programado_para ? new Date(f.programado_para) : (f.created_at ? new Date(f.created_at) : null))?.toISOString?.() ?? null,
        hora: f.programado_para ? new Date(f.programado_para).toTimeString().slice(0, 5) : null,
        carga: f.carga ?? null,
        ayudante: f.ayudante ?? null,
        vehiculo_id: f.vehiculo_id ?? null,
        iva_incluido: f.iva_incluido !== false,
        cobrado: f.cobrado !== false,
      }));
      const reservas = [...fletesList, ...reservasList].sort((a, b) => {
        const da = a.fecha ? new Date(a.fecha).getTime() : 0;
        const db = b.fecha ? new Date(b.fecha).getTime() : 0;
        return db - da;
      });
      return res.json({ reservas });
    }
    const result = await db.query(
      `SELECT * FROM reservas ORDER BY id DESC LIMIT 500`
    );
    const rows = result.rows;
    const reservas = rows.map((r) => ({
      id: r.id,
      source: 'reserva',
      usuario_nombre: r.nombre ?? r.usuario_nombre ?? '',
      usuario_email: r.email ?? r.usuario_email ?? '',
      origen: r.origen ?? '',
      destino: r.destino ?? '',
      precio: r.precio != null ? parseFloat(r.precio) : null,
      estado: r.estado || 'pendiente',
      cobrado: r.cobrado !== false,
      fecha: (r.fecha ? new Date(r.fecha) : (r.created_at ? new Date(r.created_at) : null))?.toISOString?.() ?? null,
      hora: r.hora ?? null,
      carga: r.carga ?? null,
      ayudante: r.ayudante ?? null,
      vehiculo_id: r.vehiculo_id ?? null,
      iva_incluido: r.iva_incluido !== false,
    }));
    res.json({ reservas });
  } catch (err) {
    console.error('❌ [ADMIN RESERVAS] Error listando reservas:', err);
    res.status(500).json({ error: 'Error listando reservas', reservas: [] });
  }
});

// PATCH /api/admin/reservas/:id - Actualizar estado y/o cobrado
router.patch('/admin/reservas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, cobrado } = req.body || {};
    const updates = [];
    const params = [];
    let i = 1;
    if (estado) {
      const valid = ['pendiente', 'confirmado', 'en_proceso', 'completado', 'cancelado'];
      if (!valid.includes(estado)) return res.status(400).json({ error: 'estado inválido' });
      updates.push(`estado = $${i}`);
      params.push(estado);
      i++;
    }
    if (typeof cobrado === 'boolean') {
      updates.push(`cobrado = $${i}`);
      params.push(cobrado);
      i++;
    }
    if (updates.length === 0) return res.status(400).json({ error: 'Indica estado y/o cobrado' });
    params.push(id);
    const { rowCount } = await db.query(
      `UPDATE reservas SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${i}`,
      params
    );
    if (rowCount === 0) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json({ success: true, estado: estado || undefined, cobrado: typeof cobrado === 'boolean' ? cobrado : undefined });
  } catch (err) {
    console.error('❌ [ADMIN RESERVAS] Error actualizando:', err);
    res.status(500).json({ error: 'Error actualizando reserva' });
  }
});

module.exports = router;
