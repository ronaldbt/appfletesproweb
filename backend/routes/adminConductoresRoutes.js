const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function ensureTable() {
  // Extensión para gen_random_uuid
  await db.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
  // Crear tabla si no existe (estructura base mínima)
  await db.query(`
    CREATE TABLE IF NOT EXISTS conductores (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid()
    );
  `);
  // Asegurar columnas requeridas (ADD COLUMN IF NOT EXISTS)
  await db.query(`ALTER TABLE conductores ADD COLUMN IF NOT EXISTS nombre TEXT;`);
  await db.query(`ALTER TABLE conductores ADD COLUMN IF NOT EXISTS numero TEXT;`);
  await db.query(`ALTER TABLE conductores ADD COLUMN IF NOT EXISTS activo BOOLEAN NOT NULL DEFAULT true;`);
  await db.query(`ALTER TABLE conductores ADD COLUMN IF NOT EXISTS zona TEXT;`);
  await db.query(`ALTER TABLE conductores ADD COLUMN IF NOT EXISTS rut TEXT;`);
  await db.query(`ALTER TABLE conductores ADD COLUMN IF NOT EXISTS vehiculo_placa TEXT;`);
  await db.query(`ALTER TABLE conductores ADD COLUMN IF NOT EXISTS vehiculo_tipo TEXT;`);
  await db.query(`ALTER TABLE conductores ADD COLUMN IF NOT EXISTS direccion TEXT;`);
  await db.query(`ALTER TABLE conductores ADD COLUMN IF NOT EXISTS usuario_id INTEGER REFERENCES usuarios(id);`);
  await db.query(`ALTER TABLE conductores ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();`);
  await db.query(`ALTER TABLE conductores ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();`);
  // Índice único para numero (ignorar error si ya existe)
  try {
    await db.query(`CREATE UNIQUE INDEX conductores_numero_key ON conductores (numero);`);
  } catch (_) {}

  // Asegurar columnas para contraseña visible en usuarios
  await db.query(`ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS password_visible_enc BYTEA;`);
  await db.query(`ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS password_visible_iv BYTEA;`);
  await db.query(`ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS password_visible_tag BYTEA;`);
}

function normalizeNumero(raw) {
  if (!raw) return '';
  let n = String(raw).replace(/\s+/g, '');
  if (!n.endsWith('@c.us')) n += '@c.us';
  return n;
}

// Cifrado AES-256-GCM para contraseña visible (solo admin)
function getAesKey() {
  const secret = process.env.PASSWORD_VISIBLE_KEY || process.env.PASSWORD_VISIBLE_SECRET || 'dev-fletespro-secret-key';
  // Derivar clave de 32 bytes (sha256)
  return crypto.createHash('sha256').update(String(secret)).digest();
}

function encryptVisiblePassword(plain) {
  const key = getAesKey();
  const iv = crypto.randomBytes(12); // 96-bit IV recomendado para GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(Buffer.from(String(plain), 'utf8')), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { enc, iv, tag };
}

function decryptVisiblePassword(enc, iv, tag) {
  if (!enc || !iv || !tag) return null;
  const key = getAesKey();
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
  return dec.toString('utf8');
}

router.use(async (req, res, next) => {
  try {
    await ensureTable();
    next();
  } catch (err) {
    console.error('❌ [CONDUCTORES] Error asegurando tabla:', err);
    res.status(500).json({ error: 'DB init error' });
  }
});

// GET list
router.get('/admin/conductores', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT 
        c.*,
        u.email,
        u.telefono as telefono_usuario
      FROM conductores c
      LEFT JOIN usuarios u ON c.usuario_id = u.id
      ORDER BY c.created_at DESC 
      LIMIT 500
    `, []);
    res.json(rows);
  } catch (err) {
    console.error('❌ [CONDUCTORES] Error listando:', err);
    res.status(500).json({ error: 'Error listando conductores' });
  }
});

// POST create
router.post('/admin/conductores', async (req, res) => {
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    
    const { nombre, numero, email, rut, vehiculo_placa = null, vehiculo_tipo = null, direccion = null, activo = true, zona = null, password = null } = req.body || {};
    if (!nombre || !numero || !email || !rut) {
      return res.status(400).json({ error: 'Campos requeridos: nombre, numero, email, rut' });
    }
    
    const num = normalizeNumero(numero);
    
    // 1. Crear usuario en tabla usuarios
    const provided = password && String(password).length >= 6 ? String(password) : null;
    const tempPassword = provided ? null : crypto.randomBytes(6).toString('base64url'); // ~8-9 chars URL-safe
    const passwordPlano = provided || tempPassword;
    const hash = await bcrypt.hash(String(passwordPlano), 10);
    const { enc, iv, tag } = encryptVisiblePassword(passwordPlano);
    const usuarioResult = await client.query(
      'INSERT INTO usuarios (nombre, email, telefono, password, tipo, password_visible_enc, password_visible_iv, password_visible_tag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      [nombre, email, num, hash, 'conductor', enc, iv, tag]
    );
    const usuarioId = usuarioResult.rows[0].id;
    
    // 2. Crear conductor en tabla conductores
    const conductorResult = await client.query(
      'INSERT INTO conductores (nombre, numero, rut, vehiculo_placa, vehiculo_tipo, direccion, activo, zona, usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [nombre, num, rut, vehiculo_placa, vehiculo_tipo, direccion, !!activo, zona, usuarioId]
    );
    
    await client.query('COMMIT');
    // Devolver la contraseña (provista por admin o generada) solo al admin que crea
    const payload = { ...conductorResult.rows[0] };
    payload.password_visible = passwordPlano;
    res.status(201).json(payload);
    
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ [CONDUCTORES] Error creando:', err);
    res.status(500).json({ error: 'Error creando conductor' });
  } finally {
    client.release();
  }
});

// PUT update
router.put('/admin/conductores/:id', async (req, res) => {
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    const { nombre, numero, email, rut, vehiculo_placa, vehiculo_tipo, direccion, activo, zona, password } = req.body || {};
    const num = numero !== undefined ? normalizeNumero(numero) : undefined;
    
    const current = await client.query('SELECT * FROM conductores WHERE id=$1', [id]);
    if (!current.rows.length) return res.status(404).json({ error: 'No encontrado' });
    const c = current.rows[0];
    
    // Actualizar conductor
    const upd = await client.query(
      'UPDATE conductores SET nombre=$1, numero=$2, rut=$3, vehiculo_placa=$4, vehiculo_tipo=$5, direccion=$6, activo=$7, zona=$8, updated_at=NOW() WHERE id=$9 RETURNING *',
      [
        nombre ?? c.nombre,
        num ?? c.numero,
        rut ?? c.rut,
        vehiculo_placa ?? c.vehiculo_placa,
        vehiculo_tipo ?? c.vehiculo_tipo,
        direccion ?? c.direccion,
        (activo ?? c.activo),
        (zona ?? c.zona),
        id
      ]
    );
    
    // Actualizar usuario si existe
    if (c.usuario_id) {
      if (password && String(password).length >= 6) {
        const plain = String(password);
        const hash = await bcrypt.hash(plain, 10);
        const { enc, iv, tag } = encryptVisiblePassword(plain);
        await client.query(
          `UPDATE usuarios 
             SET nombre = COALESCE($1, nombre),
                 email = COALESCE($2, email),
                 telefono = COALESCE($3, telefono),
                 password = $4,
                 password_visible_enc = $5,
                 password_visible_iv = $6,
                 password_visible_tag = $7,
                 actualizado_en = NOW()
           WHERE id = $8`,
          [nombre, email, num, hash, enc, iv, tag, c.usuario_id]
        );
      } else {
        await client.query(
          `UPDATE usuarios 
             SET nombre = COALESCE($1, nombre),
                 email = COALESCE($2, email),
                 telefono = COALESCE($3, telefono),
                 actualizado_en = NOW()
           WHERE id = $4`,
          [nombre, email, num, c.usuario_id]
        );
      }
    }
    
    await client.query('COMMIT');
    res.json(upd.rows[0]);
    
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ [CONDUCTORES] Error actualizando:', err);
    res.status(500).json({ error: 'Error actualizando conductor' });
  } finally {
    client.release();
  }
});

// DELETE
router.delete('/admin/conductores/:id', async (req, res) => {
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    
    // Obtener usuario_id antes de eliminar
    const conductor = await client.query('SELECT usuario_id FROM conductores WHERE id=$1', [id]);
    if (!conductor.rows.length) return res.status(404).json({ error: 'No encontrado' });
    
    // Eliminar conductor
    await client.query('DELETE FROM conductores WHERE id=$1', [id]);
    
    // Eliminar usuario si existe
    if (conductor.rows[0].usuario_id) {
      await client.query('DELETE FROM usuarios WHERE id=$1', [conductor.rows[0].usuario_id]);
    }
    
    await client.query('COMMIT');
    res.json({ success: true });
    
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ [CONDUCTORES] Error eliminando:', err);
    res.status(500).json({ error: 'Error eliminando conductor' });
  } finally {
    client.release();
  }
});

// POST reset password (genera contraseña temporal y la devuelve al admin)
router.post('/admin/conductores/:id/reset-password', async (req, res) => {
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');

    const { id } = req.params;
    const current = await client.query('SELECT usuario_id, nombre FROM conductores WHERE id=$1', [id]);
    if (!current.rows.length) return res.status(404).json({ error: 'No encontrado' });

    const usuarioId = current.rows[0].usuario_id;
    if (!usuarioId) return res.status(400).json({ error: 'Conductor sin usuario asociado' });

    const tempPassword = crypto.randomBytes(6).toString('base64url');
    const hash = await bcrypt.hash(String(tempPassword), 10);
    const { enc, iv, tag } = encryptVisiblePassword(tempPassword);
    await client.query('UPDATE usuarios SET password=$1, password_visible_enc=$2, password_visible_iv=$3, password_visible_tag=$4, actualizado_en=NOW() WHERE id=$5', [hash, enc, iv, tag, usuarioId]);

    await client.query('COMMIT');
    res.json({ password_temp: tempPassword });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ [CONDUCTORES] Error reseteando password:', err);
    res.status(500).json({ error: 'Error reseteando contraseña' });
  } finally {
    client.release();
  }
});

// GET list (admin) con password_visible descifrada
// Nota: ya existe un GET arriba; para no romper, ampliamos la selección y mapeamos
router.get('/admin/conductores', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 200);
    const offset = (page - 1) * limit;

    const countQuery = `SELECT COUNT(*) AS total FROM conductores`;
    const countResult = await db.query(countQuery, []);
    const total = parseInt(countResult.rows[0].total, 10) || 0;

    const listQuery = `
      SELECT 
        c.*,
        u.email,
        u.telefono as telefono_usuario,
        u.password_visible_enc,
        u.password_visible_iv,
        u.password_visible_tag
      FROM conductores c
      LEFT JOIN usuarios u ON c.usuario_id = u.id
      ORDER BY c.created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const { rows } = await db.query(listQuery, [limit, offset]);

    const items = rows.map(r => {
      let password_visible = null;
      try {
        if (r.password_visible_enc && r.password_visible_iv && r.password_visible_tag) {
          password_visible = decryptVisiblePassword(r.password_visible_enc, r.password_visible_iv, r.password_visible_tag);
        }
      } catch (_) {}
      const { password_visible_enc, password_visible_iv, password_visible_tag, ...rest } = r;
      return { ...rest, password_visible };
    });

    res.json({ items, total, page, limit });
  } catch (err) {
    console.error('❌ [CONDUCTORES] Error listando:', err);
    res.status(500).json({ error: 'Error listando conductores' });
  }
});

module.exports = router;
