const fs = require('fs');
const path = require('path');
const db = require('../utils/db');

function normalizeNumero(numero) {
  if (!numero) return '';
  let n = String(numero).replace(/\s+/g, '');
  if (!n.endsWith('@c.us')) n += '@c.us';
  return n;
}

async function esConductor(numero) {
  try {
    const num = normalizeNumero(numero);
    const { rows } = await db.query('SELECT 1 FROM conductores WHERE numero = $1 AND activo = true LIMIT 1', [num]);
    if (rows && rows.length) return true;
  } catch (e) {
    console.warn('ℹ️ [IDENTIFICAR] Postgres no disponible, fallback a JSON:', e.message);
  }
  try {
    const rawData = fs.readFileSync(path.join(__dirname, '../data/conductores.json'));
    const conductores = JSON.parse(rawData);
    return conductores.some(c => normalizeNumero(c.numero) === normalizeNumero(numero));
  } catch (_) {
    return false;
  }
}

module.exports = { esConductor };
