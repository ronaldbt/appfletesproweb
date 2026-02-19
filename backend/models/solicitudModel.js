// backend/models/solicitudModel.js - PostgreSQL
const db = require('../utils/db');

function generarId() {
  return 'F' + Math.floor(100000 + Math.random() * 900000);
}

function crearSolicitud({ nombre, telefono, email, origen, destino, precio, carga, ayudante, hora }) {
  const id = generarId();
  const fecha = new Date().toISOString();
  return {
    id,
    nombre,
    telefono,
    email: email || null,
    origen,
    destino,
    precio,
    carga: carga || null,
    ayudante: ayudante === true || ayudante === 'si',
    hora: hora || null,
    fecha,
    asignado: false
  };
}

async function guardarSolicitud(solicitud) {
  console.log('📋 [solicitudModel] guardarSolicitud:', solicitud.id);
  const sql = `
    INSERT INTO reservas 
      (id, nombre, telefono, email, origen, destino, precio, carga, ayudante, hora, fecha)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  `;
  const values = [
    solicitud.id,
    solicitud.nombre,
    solicitud.telefono,
    solicitud.email,
    solicitud.origen,
    solicitud.destino,
    solicitud.precio,
    solicitud.carga,
    solicitud.ayudante,
    solicitud.hora,
    solicitud.fecha
  ];
  await db.query(sql, values);
  console.log('📋 [solicitudModel] Reserva guardada OK:', solicitud.id);
  return solicitud.id;
}

module.exports = {
  crearSolicitud,
  guardarSolicitud
};
