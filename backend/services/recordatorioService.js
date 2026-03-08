/**
 * Recordatorio automático: 1-2 horas antes del flete, envía WhatsApp solo a +56979796841.
 */
const db = require('../utils/db');

const RECORDATORIO_NUMERO = '56979796841';
const INTERVALO_MS = 15 * 60 * 1000; // 15 minutos
const HORAS_ANTES_MIN = 1;
const HORAS_ANTES_MAX = 2;

function getChatId(numero) {
  let n = String(numero).replace(/\D/g, '');
  if (n.startsWith('0')) n = '56' + n;
  if (!n.startsWith('56')) n = '56' + n;
  return n + '@c.us';
}

async function enviarRecordatorios(client) {
  if (!client || typeof client.sendMessage !== 'function') return;
  const chatId = getChatId(RECORDATORIO_NUMERO);
  const linkedNum = client.info && client.info.wid && client.info.wid.user ? client.info.wid.user : null;
  const mismoNumero = linkedNum && String(linkedNum).replace(/\D/g, '').endsWith(String(RECORDATORIO_NUMERO).replace(/\D/g, ''));
  if (mismoNumero) console.log('📋 [Recordatorio] Destino', RECORDATORIO_NUMERO, '= número vinculado (riesgo markedUnread/getChat)');

  const now = new Date();
  const in1h = new Date(now.getTime() + HORAS_ANTES_MIN * 60 * 60 * 1000);
  const in2h = new Date(now.getTime() + HORAS_ANTES_MAX * 60 * 60 * 1000);

  try {
    // admin_fletes con programado_para entre 1h y 2h desde ahora, sin recordatorio enviado
    const { rows: fletes } = await db.query(
      `SELECT id, origen, destino, carga, precio, cliente_nombre, cliente_telefono, programado_para
       FROM admin_fletes
       WHERE programado_para IS NOT NULL
         AND programado_para >= $1 AND programado_para <= $2
         AND (recordatorio_enviado_at IS NULL)`,
      [in1h, in2h]
    );

    for (const f of fletes) {
      const fechaHora = f.programado_para ? new Date(f.programado_para).toLocaleString('es-CL') : '—';
      const msg = `⏰ Recordatorio FletesPro – Flete en 1-2 h\n\n` +
        `Cliente: ${f.cliente_nombre || '—'}\n` +
        `Tel: ${f.cliente_telefono || '—'}\n` +
        `Origen: ${f.origen || '—'}\n` +
        `Destino: ${f.destino || '—'}\n` +
        `Carga: ${f.carga || '—'}\n` +
        `Precio: ${f.precio != null ? '$' + Number(f.precio).toLocaleString('es-CL') : '—'}\n` +
        `Programado: ${fechaHora}\n\nID: ${f.id}`;
      try {
        await client.sendMessage(chatId, msg, { sendSeen: false });
        await db.query('UPDATE admin_fletes SET recordatorio_enviado_at = NOW() WHERE id = $1', [f.id]);
        console.log('📤 [Recordatorio] Enviado a', RECORDATORIO_NUMERO, 'flete', f.id);
      } catch (e) {
        console.error('❌ [Recordatorio] Error enviando flete', f.id, e.message);
      }
    }

    // reservas: combinar fecha + hora para ventana 1-2h
    const { rows: reservas } = await db.query(
      `SELECT id, nombre, telefono, origen, destino, precio, carga, fecha, hora, recordatorio_enviado_at
       FROM reservas
       WHERE estado NOT IN ('completado', 'cancelado')
         AND (recordatorio_enviado_at IS NULL)
         AND fecha IS NOT NULL`
    );

    for (const r of reservas) {
      let programadoAt = null;
      if (r.fecha) {
        const datePart = r.fecha instanceof Date ? r.fecha : new Date(r.fecha);
        if (r.hora && /^\d{1,2}:\d{2}/.test(String(r.hora).trim())) {
          const [hh, mm] = String(r.hora).trim().split(':').map(Number);
          programadoAt = new Date(datePart);
          programadoAt.setHours(hh || 0, mm || 0, 0, 0);
        } else {
          programadoAt = datePart;
        }
      }
      if (!programadoAt || isNaN(programadoAt.getTime())) continue;
      if (programadoAt < in1h || programadoAt > in2h) continue;

      const fechaHora = programadoAt.toLocaleString('es-CL');
      const msg = `⏰ Recordatorio FletesPro – Reserva en 1-2 h\n\n` +
        `Cliente: ${r.nombre || '—'}\n` +
        `Tel: ${r.telefono || '—'}\n` +
        `Origen: ${r.origen || '—'}\n` +
        `Destino: ${r.destino || '—'}\n` +
        `Carga: ${r.carga || '—'}\n` +
        `Precio: ${r.precio != null ? '$' + Number(r.precio).toLocaleString('es-CL') : '—'}\n` +
        `Programado: ${fechaHora}\n\nID: ${r.id}`;
      try {
        await client.sendMessage(chatId, msg, { sendSeen: false });
        await db.query('UPDATE reservas SET recordatorio_enviado_at = NOW() WHERE id = $1', [r.id]);
        console.log('📤 [Recordatorio] Enviado a', RECORDATORIO_NUMERO, 'reserva', r.id);
      } catch (e) {
        console.error('❌ [Recordatorio] Error enviando reserva', r.id, e.message);
      }
    }
  } catch (err) {
    console.error('❌ [Recordatorio] Error en job:', err.message);
  }
}

let intervalId = null;

function startRecordatorioJob(client) {
  if (intervalId) return;
  enviarRecordatorios(client);
  intervalId = setInterval(() => enviarRecordatorios(client), INTERVALO_MS);
  console.log('⏰ [Recordatorio] Job iniciado: cada 15 min, solo a', RECORDATORIO_NUMERO);
}

function stopRecordatorioJob() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log('⏰ [Recordatorio] Job detenido');
  }
}

module.exports = { startRecordatorioJob, stopRecordatorioJob, enviarRecordatorios };
