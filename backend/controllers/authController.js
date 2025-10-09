// backend/controllers/authController.js

const bcrypt = require('bcrypt');
const validator = require('validator');
const db = require('../utils/db');
const {
  buscarUsuarioPorCampo,
  buscarUsuarioPorEmailInsensitive,
  buscarUsuarioPorTelefono,
  crearUsuario,
  verificarPassword
} = require('../models/usuarioModel');

// Registro de usuarios (cliente o conductor)
async function registrar(req, res) {
  const client = await db.pool.connect();
  try {
    const { nombre, email, telefono, password, tipo, rut, vehiculo_placa, vehiculo_tipo, direccion } = req.body;

    if (!nombre || !password || (!email && !telefono)) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    if (telefono && !validator.isMobilePhone(telefono, 'any')) {
      return res.status(400).json({ error: 'Teléfono inválido' });
    }

    // Verificar que el usuario no exista
    if (email) {
      const existente = await buscarUsuarioPorCampo('email', email);
      if (existente) return res.status(409).json({ error: 'Ya existe un usuario con este email' });
    }

    if (telefono) {
      const existente = await buscarUsuarioPorCampo('telefono', telefono);
      if (existente) return res.status(409).json({ error: 'Ya existe un usuario con este teléfono' });
    }

    await client.query('BEGIN');

    // Crear usuario
    await crearUsuario({ nombre, email, telefono, password, tipo });

    // Si es conductor, crear registro en tabla conductores
    if (tipo === 'conductor') {
      const userRow = await db.query('SELECT id FROM usuarios WHERE email = $1 OR telefono = $2 ORDER BY id DESC LIMIT 1', [email || null, telefono || null]);
      const usuarioId = userRow.rows[0]?.id;
      if (!usuarioId) throw new Error('No se pudo obtener el usuario creado');

      await client.query(
        `INSERT INTO conductores (nombre, numero, rut, vehiculo_placa, vehiculo_tipo, direccion, activo, usuario_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [nombre, telefono || null, rut || null, vehiculo_placa || null, vehiculo_tipo || null, direccion || null, true, usuarioId]
      );
    }

    await client.query('COMMIT');

    res.status(201).json({ mensaje: 'Registro exitoso' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error en registro:', err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  } finally {
    client.release();
  }
}

// Login de usuarios
async function login(req, res) {
  try {
    // Debug temporal: inspeccionar payload recibido
    try {
      console.log('🛂 /api/login headers:', req.headers);
      console.log('🛂 /api/login body:', req.body);
    } catch (_) {}
    const { email, telefono, password } = req.body || {};

    if (!password || (!email && !telefono)) {
      return res.status(400).json({ error: 'Credenciales incompletas' });
    }

    // Normalizar: si parece número, usar teléfono; si contiene @, usar email (case-insensitive)
    let usuario = null;
    if (email) {
      usuario = await buscarUsuarioPorEmailInsensitive(email);
    } else if (telefono) {
      usuario = await buscarUsuarioPorTelefono(telefono);
    }
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const esValido = await verificarPassword(password, usuario.password);
    if (!esValido) return res.status(403).json({ error: 'Contraseña incorrecta' });

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        tipo: usuario.tipo,
        telefono: usuario.telefono,
        email: usuario.email
      }
    });
  } catch (err) {
    console.error('❌ Error en login:', err);
    res.status(500).json({ error: 'Error en login' });
  }
}

module.exports = { registrar, login };
