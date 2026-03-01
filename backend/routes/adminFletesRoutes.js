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
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS vehiculo_id UUID;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS recordatorio_enviado_at TIMESTAMPTZ;`);
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

// POST /admin/fletes - Crear flete en BD (agenda admin, sin broadcast a conductores)
router.post('/admin/fletes', async (req, res) => {
  try {
    console.log('📋 [ADMIN FLETES] POST /admin/fletes - Crear flete en agenda');
    const {
      nombre,
      telefono,
      origen,
      destino,
      carga,
      ayudante = false,
      precio = null,
      fecha,
      hora,
      vehiculoId = null
    } = req.body || {};

    console.log('📋 [ADMIN FLETES] Body recibido:', { nombre, telefono, origen, destino, carga, ayudante, precio, fecha, hora, vehiculoId });

    if (!nombre || !telefono || !origen || !destino || !fecha) {
      console.warn('⚠️ [ADMIN FLETES] Faltan campos requeridos');
      return res.status(400).json({ error: 'Campos requeridos: nombre, telefono, origen, destino, fecha' });
    }

    let programadoPara = null;
    if (fecha) {
      const datePart = fecha instanceof Date ? fecha : new Date(fecha);
      if (hora && /^\d{1,2}:\d{2}/.test(String(hora).trim())) {
        const [hh, mm] = String(hora).trim().split(':').map(Number);
        programadoPara = new Date(datePart);
        programadoPara.setHours(hh || 0, mm || 0, 0, 0);
      } else {
        programadoPara = datePart;
      }
    }

    const insertSql = `
      INSERT INTO admin_fletes (
        origen, destino, carga, ayudante, precio,
        cliente_nombre, cliente_telefono, programado_para,
        estado, vehiculo_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'enviado',$9)
      RETURNING *
    `;
    const params = [
      origen,
      destino,
      carga || '',
      !!ayudante,
      precio ? parseInt(String(precio).replace(/\D/g, ''), 10) : null,
      nombre,
      telefono,
      programadoPara,
      vehiculoId || null
    ];

    const { rows } = await db.query(insertSql, params);
    const flete = rows[0];
    console.log('✅ [ADMIN FLETES] Flete creado en BD:', flete.id);

    // Enviar WhatsApp inmediato al admin (siempre al 56979796841)
    const client = req.whatsapp;
    console.log('📋 [ADMIN FLETES] WhatsApp client presente:', !!client, 'sendMessage:', client ? typeof client.sendMessage : 'N/A');
    if (client) {
      try {
        const state = await client.getState().catch((e) => { console.log('📋 [ADMIN FLETES] getState error:', e.message); return null; });
        console.log('📋 [ADMIN FLETES] WhatsApp state:', state);
      } catch (_) {}
    }

    if (client && typeof client.sendMessage === 'function') {
      const adminChatId = '56979796841@c.us';
      const fechaHora = programadoPara ? programadoPara.toLocaleString('es-CL') : fecha;
      const msg = `📋 *Nueva reserva FletesPro*\n\n` +
        `Cliente: ${nombre || '—'}\n` +
        `Tel: ${telefono || '—'}\n` +
        `Origen: ${origen || '—'}\n` +
        `Destino: ${destino || '—'}\n` +
        `Carga: ${carga || '—'}\n` +
        `Precio: ${precio != null ? '$' + Number(precio).toLocaleString('es-CL') : '—'}\n` +
        `Programado: ${fechaHora}\n\nID: ${flete.id}`;
      try {
        console.log('📋 [ADMIN FLETES] Enviando WhatsApp a', adminChatId);
        // sendSeen: false evita error "markedUnread" al enviar al mismo número (cuenta vinculada)
        await client.sendMessage(adminChatId, msg, { sendSeen: false });
        console.log('📤 [ADMIN FLETES] WhatsApp enviado al admin correctamente');
      } catch (waErr) {
        console.error('⚠️ [ADMIN FLETES] Error enviando WhatsApp:', waErr.message);
        console.error('⚠️ [ADMIN FLETES] Stack:', waErr.stack);
      }
    } else {
      console.warn('⚠️ [ADMIN FLETES] WhatsApp no disponible para notificación (client=', !!client, ', sendMessage=', client ? typeof client.sendMessage : 'N/A', ')');
    }

    res.status(201).json({ success: true, fleteId: flete.id, flete });
  } catch (err) {
    console.error('❌ [ADMIN FLETES] Error creando flete:', err);
    res.status(500).json({ error: err.message || 'Error creando flete' });
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
      programadoPara = null,
      vehiculoId = null
    } = req.body || {};

    if (!origen || !destino || !carga) {
      return res.status(400).json({ error: 'Campos requeridos: origen, destino, carga' });
    }

    const insertSql = `
      INSERT INTO admin_fletes (
        origen, destino, carga, ayudante, precio, nota,
        cliente_nombre, cliente_telefono, programado_para,
        estado, creado_por, vehiculo_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'enviado',$10,$11)
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
      creadoPor,
      vehiculoId || null
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
