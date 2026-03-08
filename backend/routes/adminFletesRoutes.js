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
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS iva_incluido BOOLEAN DEFAULT true;`);
  await db.query(`ALTER TABLE admin_fletes ADD COLUMN IF NOT EXISTS cobrado BOOLEAN DEFAULT true;`);
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
      vehiculoId = null,
      ivaIncluido = true
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
        estado, vehiculo_id, iva_incluido
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'enviado',$9,$10)
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
      vehiculoId || null,
      ivaIncluido !== false
    ];

    const { rows } = await db.query(insertSql, params);
    const flete = rows[0];
    console.log('✅ [ADMIN FLETES] Flete creado en BD:', flete.id);

    // Enviar WhatsApp inmediato al admin (56979796841)
    const client = req.whatsapp;
    const adminNum = '56979796841';
    const adminChatId = adminNum + '@c.us';
    const linkedNum = client && client.info && client.info.wid && client.info.wid.user ? client.info.wid.user : null;
    const mismoNumero = linkedNum && String(linkedNum).replace(/\D/g, '').endsWith(adminNum.replace(/\D/g, ''));
    const state = client ? await client.getState().catch(() => null) : null;

    console.log('📋 [ADMIN FLETES] WhatsApp: client=', !!client, 'state=', state, '| Destino:', adminChatId, '| Vinculado:', linkedNum || 'N/A', '| ¿Mismo número?', mismoNumero);

    if (client && typeof client.sendMessage === 'function') {
      if (state !== 'CONNECTED') {
        console.warn('⚠️ [ADMIN FLETES] WhatsApp no CONNECTED (state:', state, '). No se envía notificación.');
      } else {
        const fechaHora = programadoPara ? programadoPara.toLocaleString('es-CL') : fecha;
        const msg = `📋 *Nueva reserva FletesPro*\n\n` +
          `Cliente: ${nombre || '—'}\n` +
          `Tel: ${telefono || '—'}\n` +
          `Origen: ${origen || '—'}\n` +
          `Destino: ${destino || '—'}\n` +
          `Carga: ${carga || '—'}\n` +
          `Precio: ${precio != null ? '$' + Number(precio).toLocaleString('es-CL') : '—'}\n` +
          `Programado: ${fechaHora}\n\nID: ${flete.id}`;
        // Fire-and-forget: no bloquear respuesta, evitar que errores de WA corrompan la sesión
        console.log('📋 [ADMIN FLETES] Enviando mensaje a', adminChatId);
        client.sendMessage(adminChatId, msg, { sendSeen: false })
          .then((sent) => {
            if (sent) console.log('📤 [ADMIN FLETES] WhatsApp enviado OK');
            else console.warn('📤 [ADMIN FLETES] Envío devolvió null (OK si librería falló internamente)');
          })
          .catch((waErr) => {
            console.error('⚠️ [ADMIN FLETES] Error WhatsApp (no bloqueante):', waErr.message);
          });
      }
    } else {
      console.warn('⚠️ [ADMIN FLETES] WhatsApp no disponible (client=', !!client, ')');
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
    const { id } = req.params;
    const { estado, cobrado } = req.body || {};
    const valid = ['pendiente','enviado','asignado','en_progreso','completado','cancelado_admin','cancelado_conductor','cancelado_cliente','expirado'];
    if (!valid.includes(estado)) return res.status(400).json({ error: 'Estado inválido' });
    if (typeof cobrado === 'boolean') {
      await db.query('UPDATE admin_fletes SET estado=$1, cobrado=$2, updated_at=NOW() WHERE id=$3', [estado, cobrado, id]);
    } else {
      await db.query('UPDATE admin_fletes SET estado=$1, updated_at=NOW() WHERE id=$2', [estado, id]);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('❌ [ADMIN FLETES] Error actualizando estado:', err);
    res.status(500).json({ error: 'Error actualizando estado' });
  }
});

// PATCH /admin/fletes/:id - Actualizar flete de agenda
router.patch('/admin/fletes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, origen, destino, carga, ayudante, precio, fecha, hora, vehiculoId, ivaIncluido, cobrado } = req.body || {};
    const updates = [];
    const params = [];
    let i = 1;
    if (nombre !== undefined) { updates.push(`cliente_nombre = $${i}`); params.push(nombre); i++; }
    if (telefono !== undefined) { updates.push(`cliente_telefono = $${i}`); params.push(telefono); i++; }
    if (origen !== undefined) { updates.push(`origen = $${i}`); params.push(origen); i++; }
    if (destino !== undefined) { updates.push(`destino = $${i}`); params.push(destino); i++; }
    if (carga !== undefined) { updates.push(`carga = $${i}`); params.push(carga); i++; }
    if (ayudante !== undefined) { updates.push(`ayudante = $${i}`); params.push(!!ayudante); i++; }
    if (precio !== undefined) { updates.push(`precio = $${i}`); params.push(precio != null ? parseInt(String(precio).replace(/\D/g, ''), 10) : null); i++; }
    if (fecha !== undefined || hora !== undefined) {
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
      updates.push(`programado_para = $${i}`); params.push(programadoPara); i++;
    }
    if (vehiculoId !== undefined) { updates.push(`vehiculo_id = $${i}`); params.push(vehiculoId || null); i++; }
    if (ivaIncluido !== undefined) { updates.push(`iva_incluido = $${i}`); params.push(ivaIncluido !== false); i++; }
    if (typeof cobrado === 'boolean') { updates.push(`cobrado = $${i}`); params.push(cobrado); i++; }
    if (updates.length === 0) return res.status(400).json({ error: 'Nada que actualizar' });
    params.push(id);
    const sql = `UPDATE admin_fletes SET ${updates.join(', ')}, updated_at = NOW() WHERE id = $${i} RETURNING *`;
    const { rows } = await db.query(sql, params);
    if (!rows.length) return res.status(404).json({ error: 'Flete no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error('❌ [ADMIN FLETES] Error actualizando flete:', err);
    res.status(500).json({ error: err.message || 'Error actualizando flete' });
  }
});

// DELETE /admin/fletes/:id - Eliminar flete de agenda
router.delete('/admin/fletes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await db.query('DELETE FROM admin_fletes WHERE id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Flete no encontrado' });
    res.json({ success: true });
  } catch (err) {
    console.error('❌ [ADMIN FLETES] Error eliminando flete:', err);
    res.status(500).json({ error: err.message || 'Error eliminando flete' });
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
