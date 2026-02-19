// backend/controllers/reservasController.js

const validator = require('validator');
const {enviarSolicitudAConductores} = require('../chatbots/conductorBot');
const {enviarConfirmacionCliente} = require('../services/emailService');
const {crearSolicitud, guardarSolicitud} = require('../models/solicitudModel');
const mpapi = require("../utils/mpapi");

const crearReserva = async (req, res) => {
    console.log('🔧 [RESERVAS CONTROLLER] crearReserva llamado');
    
    // Usar el cliente desde el middleware inyectado en req
    const client = req.whatsapp;
    console.log('🔧 [RESERVAS CONTROLLER] Cliente WhatsApp disponible:', !!client);
    
    const {nombre, telefono, email, origen, destino, precio, carga, ayudante, hora} = req.body;
    
    console.log('🔧 [RESERVAS CONTROLLER] Datos recibidos:', {nombre, telefono, email, origen, destino, precio, carga, ayudante, hora});

    if (!nombre || !telefono || !origen || !destino || !precio || !carga || ayudante === undefined) {
        console.warn('⚠️ Solicitud incompleta recibida:', req.body);
        return res.status(400).json({error: 'Faltan datos obligatorios en la reserva.'});
    }

    if (!validator.isMobilePhone(telefono, 'any')) {
        return res.status(400).json({error: 'Número de teléfono inválido.'});
    }

    if (email && !validator.isEmail(email)) {
        return res.status(400).json({error: 'Correo electrónico inválido.'});
    }

    const nuevaSolicitud = crearSolicitud({nombre, telefono, email, origen, destino, precio, carga, ayudante, hora});

    try {
        console.log('🔧 [RESERVAS CONTROLLER] Solicitud creada:', nuevaSolicitud.id);
        
        // Solo enviar a conductores si hay cliente WhatsApp disponible
        if (client && typeof client.sendMessage === 'function') {
            console.log('🔧 [RESERVAS CONTROLLER] Enviando a conductores via WhatsApp...');
            // enviarSolicitudAConductores(nuevaSolicitud, client);
        } else {
            console.log('⚠️ [RESERVAS CONTROLLER] WhatsApp no disponible, saltando envío a conductores');
        }

        if (email) {
            console.log('🔧 [RESERVAS CONTROLLER] Enviando confirmación por email...');
            // await enviarConfirmacionCliente(nuevaSolicitud);
        }

        console.log('🔧 [RESERVAS CONTROLLER] Guardando solicitud en BD...');
        const solicitudId = await guardarSolicitud(nuevaSolicitud);
        console.log('✅ [RESERVAS CONTROLLER] Solicitud guardada con ID:', solicitudId);

        await mpapi.nuevo(solicitudId, parseInt(precio)).then((mercadoResponse) => {
            console.log(mercadoResponse.init_point)
            return res.status(200).json({
                mensaje: 'Solicitud enviada y registrada correctamente.',
                fleteId: solicitudId,
                url: mercadoResponse.init_point
            });
        }).catch((error) => {
            console.log(error)
            return res.status(500).json({url: '', error: 'Ha sucedido un error al solicitar el pago'});
        });

    } catch (error) {
        console.error('❌ Error al procesar reserva:', error);
        return res.status(500).json({error: 'Ocurrió un error al procesar la reserva.'});
    }
};

module.exports = {crearReserva};
