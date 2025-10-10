// backend/chatbots/conductorBot.js

const db = require('../utils/db');


const fs = require('fs');
const path = require('path');
const { enviarConfirmacionCliente } = require('../services/emailService');

async function cargarConductores() {
  try {
    const { rows } = await db.query('SELECT nombre, numero FROM conductores WHERE activo = true ORDER BY created_at DESC');
    if (rows && rows.length) {
      return rows.map(c => {
        let numero = String(c.numero || '').replace(/\s+/g, '');
        // Si ya está en formato @c.us, dejarlo como está
        if (numero.endsWith('@c.us')) {
          return { nombre: c.nombre || 'Conductor', numero };
        }
        // Si no, normalizarlo
        if (!numero.startsWith('56')) {
          if (numero.startsWith('9') || numero.startsWith('2')) {
            numero = '56' + numero;
          }
        }
        numero += '@c.us';
        return { nombre: c.nombre || 'Conductor', numero };
      });
    }
  } catch (e) {
    console.warn('ℹ️ [CONDUCTOR BOT] No se pudo leer conductores desde Postgres, usando JSON. Detalle:', e.message);
  }
  // Fallback a JSON
  const rawData = fs.readFileSync(path.join(__dirname, '../data/conductores.json'));
  let conductores = JSON.parse(rawData);
  conductores = conductores.map(c => {
    let numero = c.numero.toString().replace(/\s+/g, '');
    if (!numero.endsWith('@c.us')) {
      if (!numero.startsWith('56')) {
        if (numero.startsWith('9') || numero.startsWith('2')) {
          numero = '56' + numero;
        }
      }
      numero += '@c.us';
    }
    return { ...c, numero };
  });
  return conductores;
}

// 🧠 Lista temporal de solicitudes activas
const solicitudesPendientes = new Map();

/**
 * Enviar solicitud de flete a todos los conductores disponibles
 */
async function enviarSolicitudAConductores(flete, client) {
  console.log('🔧 [CONDUCTOR BOT] enviarSolicitudAConductores llamado');
  if (!client || typeof client.sendMessage !== 'function') {
    console.error('❌ [CONDUCTOR BOT] cliente WhatsApp inválido');
    return;
  }

  const conductores = await cargarConductores();
  const fleteId = flete.id;
  solicitudesPendientes.set(fleteId, { ...flete, asignado: false });

  const pagoConductor = Math.round(Number(flete.precio || 0) * 0.9);
  const programado = flete.programadoPara ? `\n🗓️ Programado: ${new Date(flete.programadoPara).toLocaleString('es-CL')}` : '';
  const clienteLinea = flete.nombre || flete.cliente || null;
  const telefonoLinea = flete.telefono || flete.clienteTelefono || null;

  const mensaje = `🚛 *Nueva solicitud de flete disponible*\n\n🆔 ID del flete: ${fleteId}\n📍 Origen: ${flete.origen}\n📦 Destino: ${flete.destino}\n📦 Carga: ${flete.carga}\n👥 Ayudante: ${flete.ayudante ? 'Sí (+$10.000)' : 'No'}${programado}\n💰 Pago: $${pagoConductor.toLocaleString()} CLP\n\n✅ Responde con *Sí* para aceptarlo\n❌ Responde con *No* para rechazarlo.`;

  for (const conductor of conductores) {
    try {
      const isRegistered = await client.isRegisteredUser(conductor.numero);
      if (isRegistered) {
        await client.sendMessage(conductor.numero, mensaje);
      } else {
        console.warn(`⚠️ El número ${conductor.numero} no está registrado en WhatsApp.`);
      }
    } catch (err) {
      console.error(`❌ Error al enviar mensaje a ${conductor.numero}:`, err);
    }
  }

  console.log(`📤 Solicitud enviada a ${conductores.length} conductores. ID: ${fleteId}`);
}

/** Manejar respuestas entrantes de conductores */
async function manejarRespuestaConductor(message, client) {
  console.log('🔧 [CONDUCTOR BOT] manejarRespuestaConductor llamado');
  if (!client || typeof client.sendMessage !== 'function') return;

  const texto = message.body.trim().toLowerCase();
  if (texto === 'no') {
    return client.sendMessage(message.from, '❌ Has rechazado el flete. Gracias por responder.');
  }
  
  const partes = texto.split(/\s+/);
  const afirmativo = (partes[0] === 'si' || partes[0] === 'sí');

  if ((partes.length === 2 && afirmativo) || (partes.length === 1 && afirmativo)) {
    let fleteId = partes[1];
    if (!fleteId) {
      for (const [id, fleteData] of solicitudesPendientes.entries()) {
        if (!fleteData.asignado && fleteData && typeof fleteData === 'object') {
          fleteId = id; break;
        }
      }
    }
    const flete = solicitudesPendientes.get(fleteId);

    if (flete && !flete.asignado) {
      flete.asignado = true;
      solicitudesPendientes.set(fleteId, flete);
      try {
        try {
          await db.query('UPDATE reservas SET conductor_asignado = $1 WHERE id = $2', [message.from, fleteId]);
        } catch (e) { console.warn('ℹ️ reservas no actualizada:', e.message); }
        try {
          await db.query('UPDATE admin_fletes SET estado=$1, conductor_asignado=$2, updated_at=NOW() WHERE id=$3', ['asignado', message.from, fleteId]);
        } catch (e) { console.warn('ℹ️ admin_fletes no actualizado:', e.message); }
      } catch (err) {
        console.error('❌ Error guardando asignación:', err);
      }

      // Preparar datos del mensaje de confirmación
      const clienteLinea = flete.nombre || flete.cliente || 'Cliente';
      const telefonoLinea = flete.telefono || flete.clienteTelefono || 'N/D';
      const programado = flete.programadoPara ? `\n        🗓️ Programado: ${new Date(flete.programadoPara).toLocaleString('es-CL')}` : '';
      const pagoConductor = Math.round(Number(flete.precio || 0) * 0.9);
      
      const mensajeConfirmacion = `✅ *Flete asignado a ti*\n\n🆔 ID: ${fleteId}\n👤 Cliente: ${clienteLinea}\n📞 Teléfono: ${telefonoLinea}\n📍 Origen: ${flete.origen}\n📦 Destino: ${flete.destino}\n📦 Carga: ${flete.carga}\n👥 Ayudante: ${flete.ayudante ? 'Sí' : 'No'}${programado}\n💰 Tu pago: $${pagoConductor.toLocaleString()} CLP\n\n¡Contacta al cliente para coordinar el flete!`;
      
      client.sendMessage(message.from, mensajeConfirmacion)
        .catch(err => console.error('❌ Error al notificar conductor asignado:', err));
    } else if (flete && flete.asignado) {
      // Flete ya asignado a otro conductor
      client.sendMessage(message.from, '⚠️ *Flete ya asignado*\n\nEste flete ya fue tomado por otro conductor. Estaremos enviando nuevas oportunidades pronto.')
        .catch(err => console.error('❌ Error al notificar flete asignado:', err));
    } else {
      // No hay fletes pendientes
      client.sendMessage(message.from, 'ℹ️ *No hay fletes pendientes*\n\nActualmente no tienes solicitudes de fletes pendientes.')
        .catch(err => console.error('❌ Error al notificar sin fletes:', err));
    }
  }
}

module.exports = { enviarSolicitudAConductores, manejarRespuestaConductor };
