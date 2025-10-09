// backend/models/usuarioModel.js

const db = require("../utils/db");
const bcrypt = require("bcryptjs");

// Buscar usuario por campo exacto
async function buscarUsuarioPorCampo(campo, valor) {
  const result = await db.query(`SELECT * FROM usuarios WHERE ${campo} = $1 LIMIT 1`, [valor]);
  return result.rows[0] || null;
}

// Buscar usuario por email (case-insensitive)
async function buscarUsuarioPorEmailInsensitive(email) {
  const result = await db.query(`SELECT * FROM usuarios WHERE LOWER(email) = LOWER($1) LIMIT 1`, [email]);
  return result.rows[0] || null;
}

// Buscar usuario por teléfono
async function buscarUsuarioPorTelefono(telefono) {
  const result = await db.query(`SELECT * FROM usuarios WHERE telefono = $1 LIMIT 1`, [telefono]);
  return result.rows[0] || null;
}

// Crear nuevo usuario (cliente o conductor)
async function crearUsuario({ nombre, telefono, email, password, tipo }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const fecha = new Date().toISOString().slice(0, 19).replace("T", " ");

  await db.query(
    `INSERT INTO usuarios (nombre, telefono, email, password, tipo, creado_en)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [nombre, telefono, email, hashedPassword, tipo || "cliente", fecha]
  );
}

// Verificar contraseña
async function verificarPassword(passwordIngresado, passwordHasheado) {
  return await bcrypt.compare(passwordIngresado, passwordHasheado);
}

module.exports = {
  buscarUsuarioPorCampo,
  buscarUsuarioPorEmailInsensitive,
  buscarUsuarioPorTelefono,
  crearUsuario,
  verificarPassword
};
