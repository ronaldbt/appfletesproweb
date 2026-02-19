#!/usr/bin/env node
/**
 * Restaura conductores desde backend/data/conductores.json a PostgreSQL.
 * Uso: node scripts/restore-conductores.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const db = require('../utils/db');
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '../data/conductores.json');

async function main() {
  let raw;
  try {
    raw = fs.readFileSync(JSON_PATH, 'utf8');
  } catch (e) {
    console.error('No se encontró', JSON_PATH, e.message);
    process.exit(1);
  }
  const list = JSON.parse(raw);
  if (!Array.isArray(list) || list.length === 0) {
    console.log('Lista de conductores vacía en el JSON.');
    process.exit(0);
  }
  let inserted = 0;
  let skipped = 0;
  for (const c of list) {
    const nombre = (c.nombre || '').trim() || null;
    const numero = (c.numero || '').trim() || null;
    if (!numero) {
      console.warn('Conductor sin numero, se omite:', c);
      skipped++;
      continue;
    }
    try {
      await db.query(
        `INSERT INTO conductores (nombre, numero, activo)
         VALUES ($1, $2, true)
         ON CONFLICT (numero) DO UPDATE SET nombre = EXCLUDED.nombre, activo = true, updated_at = NOW()`,
        [nombre, numero]
      );
      const tag = nombre ? `${nombre} (${numero})` : numero;
      console.log('OK:', tag);
      inserted++;
    } catch (e) {
      console.error('Error insertando', numero, e.message);
    }
  }
  console.log('---');
  console.log('Insertados/actualizados:', inserted, 'Omitidos:', skipped);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
