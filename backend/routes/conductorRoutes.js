// backend/routes/conductorRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// Obtener información del conductor
router.get('/conductor/info/:id', async (req, res) => {
  try {
    const conductorId = req.params.id;
    
    // Obtener datos básicos del conductor
    const result = await db.query(
      'SELECT id, nombre, email, telefono, vehiculo_tipo, vehiculo_placa, direccion, rating_promedio FROM usuarios WHERE id = $1 AND tipo = $2',
      [conductorId, 'conductor']
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conductor no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al obtener info del conductor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener fletes del conductor
router.get('/conductor/fletes/:id', async (req, res) => {
  try {
    const conductorId = req.params.id;
    
    // Obtener fletes asignados al conductor
    const result = await db.query(
      `SELECT r.*, u.nombre as cliente_nombre, u.telefono as cliente_telefono
       FROM reservas r 
       JOIN usuarios u ON r.cliente_id = u.id 
       WHERE r.conductor_asignado = $1 
       ORDER BY r.fecha DESC 
       LIMIT 50`,
      [conductorId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener fletes del conductor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener estadísticas del conductor
router.get('/conductor/stats/:id', async (req, res) => {
  try {
    const conductorId = req.params.id;
    
    // Obtener estadísticas del conductor
    const fletesActivos = await db.query(
      'SELECT COUNT(*) as count FROM reservas WHERE conductor_asignado = $1 AND estado IN ($2, $3)',
      [conductorId, 'asignado', 'en_proceso']
    );
    
    const fletesCompletados = await db.query(
      'SELECT COUNT(*) as count FROM reservas WHERE conductor_asignado = $1 AND estado = $2',
      [conductorId, 'completado']
    );
    
    const gananciaMes = await db.query(
      `SELECT COALESCE(SUM(precio), 0) as total 
       FROM reservas 
       WHERE conductor_asignado = $1 
       AND estado = $2 
       AND EXTRACT(MONTH FROM fecha) = EXTRACT(MONTH FROM CURRENT_DATE) 
       AND EXTRACT(YEAR FROM fecha) = EXTRACT(YEAR FROM CURRENT_DATE)`,
      [conductorId, 'completado']
    );
    
    const rating = await db.query(
      'SELECT COALESCE(AVG(rating), 4.5) as promedio FROM reservas WHERE conductor_asignado = $1 AND rating IS NOT NULL',
      [conductorId]
    );
    
    res.json({
      fletes_activos: fletesActivos.rows[0].count,
      fletes_completados: fletesCompletados.rows[0].count,
      ganancia_mes: gananciaMes.rows[0].total,
      rating_promedio: parseFloat(rating.rows[0].promedio).toFixed(1)
    });
  } catch (error) {
    console.error('❌ Error al obtener estadísticas del conductor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener historial de fletes completados del conductor
router.get('/conductor/historial/:id', async (req, res) => {
  try {
    const conductorId = req.params.id;
    const { periodo, estado } = req.query;
    
    console.log(`📊 [ConductorHistorial] Cargando historial para conductor ID ${conductorId}`);
    console.log(`📊 [ConductorHistorial] Filtros: periodo=${periodo}, estado=${estado}`);
    
    // Primero obtener el número de teléfono del conductor
    const conductorInfo = await db.query(
      'SELECT telefono FROM usuarios WHERE id = $1 AND tipo = $2',
      [conductorId, 'conductor']
    );
    
    if (conductorInfo.rows.length === 0) {
      return res.json({ historial: [], stats: { completados: 0, gananciaTotal: 0, ratingPromedio: 0, tiempoPromedio: 0 } });
    }
    
    const conductorTelefono = conductorInfo.rows[0].telefono;
    
    // Construir filtros de fecha
    let fechaFiltro = '';
    const params = [conductorTelefono];
    let paramIndex = 2;
    
    if (periodo === 'mes') {
      fechaFiltro = `AND created_at >= NOW() - INTERVAL '1 month'`;
    } else if (periodo === '3meses') {
      fechaFiltro = `AND created_at >= NOW() - INTERVAL '3 months'`;
    } else if (periodo === 'año') {
      fechaFiltro = `AND created_at >= NOW() - INTERVAL '1 year'`;
    }
    
    // Buscar fletes completados en admin_fletes
    let adminFletesQuery = `
      SELECT 
        id,
        origen,
        destino,
        carga,
        ayudante,
        precio,
        estado,
        conductor_asignado,
        created_at as fecha,
        programado_para,
        cliente_nombre as nombre_cliente,
        cliente_telefono as telefono_cliente,
        'admin' as tipo_flete,
        NULL as rating,
        NULL as tiempo_estimado
      FROM admin_fletes 
      WHERE conductor_asignado = $1 
        AND estado IN ('completado', 'cancelado_admin', 'cancelado_conductor', 'cancelado_cliente')
        ${fechaFiltro}
      ORDER BY created_at DESC
    `;
    
    const adminFletes = await db.query(adminFletesQuery, params);
    
    // Por ahora solo buscar en admin_fletes, las reservas de clientes no tienen conductor asignado
    // TODO: Implementar sistema de asignación de conductores a reservas de clientes
    const reservas = { rows: [] };
    
    // Combinar resultados
    const todoElHistorial = [...adminFletes.rows, ...reservas.rows];
    
    // Filtrar por estado si se especifica
    let historialFiltrado = todoElHistorial;
    if (estado && estado !== 'todos') {
      if (estado === 'completado') {
        historialFiltrado = todoElHistorial.filter(f => f.estado === 'completado');
      } else if (estado === 'cancelado') {
        historialFiltrado = todoElHistorial.filter(f => f.estado.startsWith('cancelado'));
      }
    }
    
    // Calcular estadísticas
    const completados = historialFiltrado.filter(f => f.estado === 'completado');
    const gananciaTotal = completados.reduce((sum, f) => sum + (f.precio * 0.9), 0);
    const ratingPromedio = completados.length > 0 ? 4.5 : 0; // Placeholder
    const tiempoPromedio = completados.length > 0 ? 2.5 : 0; // Placeholder
    
    const estadisticas = {
      completados: completados.length,
      gananciaTotal: Math.round(gananciaTotal),
      ratingPromedio,
      tiempoPromedio
    };
    
    console.log(`📊 [ConductorHistorial] Encontrados ${historialFiltrado.length} fletes en historial`);
    
    res.json({
      historial: historialFiltrado,
      stats: estadisticas
    });
  } catch (error) {
    console.error('❌ Error al obtener historial del conductor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener reservas asignadas al conductor
router.get('/conductor/reservas/:id', async (req, res) => {
  try {
    const conductorId = req.params.id;
    
    // Primero obtener el número de teléfono del conductor desde la tabla usuarios
    const conductorInfo = await db.query(
      'SELECT telefono FROM usuarios WHERE id = $1 AND tipo = $2',
      [conductorId, 'conductor']
    );
    
    if (conductorInfo.rows.length === 0) {
      return res.json([]);
    }
    
    const conductorTelefono = conductorInfo.rows[0].telefono;
    console.log(`🔍 Buscando fletes para conductor ID ${conductorId} con teléfono ${conductorTelefono}`);
    
    // Buscar en tabla admin_fletes (fletes creados por admin) - Solo fletes asignados, no completados
    const adminFletes = await db.query(
      `SELECT 
        id,
        origen,
        destino,
        carga,
        ayudante,
        precio,
        estado,
        conductor_asignado,
        created_at as fecha,
        programado_para,
        cliente_nombre as nombre_cliente,
        cliente_telefono as telefono_cliente,
        'admin' as tipo_flete
       FROM admin_fletes 
       WHERE conductor_asignado = $1 
         AND estado = 'asignado'
       ORDER BY created_at DESC`,
      [conductorTelefono]
    );
    
    // Buscar en tabla reservas (reservas creadas por clientes)
    const reservas = await db.query(
      `SELECT 
        r.id,
        r.origen,
        r.destino,
        r.estado,
        r.fecha,
        r.precio,
        u.nombre as nombre_cliente,
        u.telefono as telefono_cliente,
        'cliente' as tipo_flete,
        NULL as carga,
        NULL as ayudante,
        NULL as conductor_asignado,
        NULL as programado_para
       FROM reservas r
       LEFT JOIN usuarios u ON r.usuario_id = u.id
       WHERE r.estado IS NOT NULL 
       ORDER BY r.fecha DESC`,
      []
    );
    
    // Combinar ambos resultados
    const todasLasReservas = [...adminFletes.rows, ...reservas.rows];
    
    // Ordenar por fecha descendente
    todasLasReservas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    res.json(todasLasReservas);
  } catch (error) {
    console.error('❌ Error al obtener reservas del conductor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener perfil completo del conductor
router.get('/conductor/perfil/:id', async (req, res) => {
  try {
    const conductorId = req.params.id;
    
    // Obtener datos del conductor desde la tabla conductores
    const result = await db.query(
      `SELECT c.*, u.email 
       FROM conductores c
       JOIN usuarios u ON c.usuario_id = u.id
       WHERE c.usuario_id = $1`,
      [conductorId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conductor no encontrado' });
    }
    
    const conductor = result.rows[0];
    
    // Obtener estadísticas
    const stats = {
      fletesCompletados: 0,
      ratingPromedio: 4.5
    };
    
    res.json({ conductor, stats });
  } catch (error) {
    console.error('❌ Error al obtener perfil del conductor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar perfil del conductor
router.put('/conductor/perfil/:id', async (req, res) => {
  try {
    const conductorId = req.params.id;
    const {
      nombre,
      email,
      numero,
      rut,
      vehiculo_placa,
      vehiculo_tipo,
      direccion,
      zona,
      password,
      // Datos bancarios
      banco,
      tipo_cuenta,
      numero_cuenta,
      rut_titular,
      nombre_titular
    } = req.body;
    
    console.log('📝 Actualizando perfil del conductor ID:', conductorId);
    
    // Actualizar tabla conductores
    await db.query(
      `UPDATE conductores SET 
        nombre = $1,
        rut = $2,
        numero = $3,
        vehiculo_placa = $4,
        vehiculo_tipo = $5,
        direccion = $6,
        zona = $7,
        banco = $8,
        tipo_cuenta = $9,
        numero_cuenta = $10,
        rut_titular = $11,
        nombre_titular = $12,
        updated_at = NOW()
       WHERE usuario_id = $13`,
      [
        nombre,
        rut,
        numero,
        vehiculo_placa,
        vehiculo_tipo,
        direccion,
        zona,
        banco,
        tipo_cuenta,
        numero_cuenta,
        rut_titular,
        nombre_titular,
        conductorId
      ]
    );
    
    // Actualizar tabla usuarios si cambió email o contraseña
    if (email) {
      await db.query('UPDATE usuarios SET email = $1 WHERE id = $2', [email, conductorId]);
    }
    
    if (password) {
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query('UPDATE usuarios SET password = $1 WHERE id = $2', [hashedPassword, conductorId]);
    }
    
    console.log('✅ Perfil del conductor actualizado exitosamente');
    res.json({ success: true, message: 'Perfil actualizado correctamente' });
  } catch (error) {
    console.error('❌ Error al actualizar perfil del conductor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
