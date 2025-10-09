const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// KPIs para empresa de fletes
router.get('/admin/stats', async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // 1. ESTADÍSTICAS OPERACIONALES
    const [
      totalFletes,
      fletesMes,
      fletesMesAnterior,
      fletesCompletados,
      fletesCancelados,
      fletesPendientes,
      conductoresActivos,
      conductoresInactivos,
      totalClientes,
      nuevosClientesMes,
      tiempoPromedioAsignacion,
      distanciaTotal,
      fletesPorEstado
    ] = await Promise.all([
      // Total fletes
      db.query('SELECT COUNT(*) as total FROM admin_fletes'),
      
      // Fletes este mes
      db.query('SELECT COUNT(*) as total FROM admin_fletes WHERE created_at >= $1', [startOfMonth]),
      
      // Fletes mes anterior
      db.query('SELECT COUNT(*) as total FROM admin_fletes WHERE created_at >= $1 AND created_at <= $2', 
        [startOfLastMonth, endOfLastMonth]),
      
      // Fletes completados
      db.query('SELECT COUNT(*) as total FROM admin_fletes WHERE estado = $1', ['completado']),
      
      // Fletes cancelados
      db.query('SELECT COUNT(*) as total FROM admin_fletes WHERE estado LIKE $1', ['cancelado%']),
      
      // Fletes pendientes/en curso
      db.query('SELECT COUNT(*) as total FROM admin_fletes WHERE estado IN ($1, $2, $3)', 
        ['enviado', 'asignado', 'en_progreso']),
      
      // Conductores activos
      db.query('SELECT COUNT(*) as total FROM conductores WHERE activo = true'),
      
      // Conductores inactivos
      db.query('SELECT COUNT(*) as total FROM conductores WHERE activo = false'),
      
      // Total clientes (desde reservas)
      db.query('SELECT COUNT(DISTINCT telefono) as total FROM reservas'),
      
      // Nuevos clientes este mes
      db.query('SELECT COUNT(DISTINCT telefono) as total FROM reservas WHERE fecha >= $1', [startOfMonth]),
      
      // Tiempo promedio de asignación (en horas)
      db.query(`
        SELECT AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/3600) as promedio_horas
        FROM admin_fletes 
        WHERE conductor_asignado IS NOT NULL AND estado = 'asignado'
      `),
      
      // Distancia total (estimada)
      db.query(`
        SELECT COUNT(*) * 15 as distancia_estimada_km 
        FROM admin_fletes 
        WHERE estado = 'completado'
      `),
      
      // Fletes por estado
      db.query(`
        SELECT estado, COUNT(*) as cantidad 
        FROM admin_fletes 
        GROUP BY estado
      `)
    ]);

    // 2. ESTADÍSTICAS FINANCIERAS
    const [
      ingresosTotales,
      ingresosMes,
      ingresosMesAnterior,
      gananciaNeta,
      costoPromedioFlete,
      pagosPendientes
    ] = await Promise.all([
      // Ingresos totales
      db.query('SELECT COALESCE(SUM(precio), 0) as total FROM admin_fletes WHERE estado = $1', ['completado']),
      
      // Ingresos este mes
      db.query('SELECT COALESCE(SUM(precio), 0) as total FROM admin_fletes WHERE estado = $1 AND created_at >= $2', 
        ['completado', startOfMonth]),
      
      // Ingresos mes anterior
      db.query('SELECT COALESCE(SUM(precio), 0) as total FROM admin_fletes WHERE estado = $1 AND created_at >= $2 AND created_at <= $3', 
        ['completado', startOfLastMonth, endOfLastMonth]),
      
      // Ganancia neta (90% para conductores, 10% para empresa)
      db.query('SELECT COALESCE(SUM(precio * 0.1), 0) as ganancia FROM admin_fletes WHERE estado = $1', ['completado']),
      
      // Costo promedio por flete
      db.query('SELECT COALESCE(AVG(precio), 0) as promedio FROM admin_fletes WHERE estado = $1', ['completado']),
      
      // Pagos pendientes (fletes completados sin pago)
      db.query('SELECT COUNT(*) as total FROM admin_fletes WHERE estado = $1 AND precio IS NOT NULL', ['completado'])
    ]);

    // 3. CRECIMIENTO Y TENDENCIAS
    const crecimientoFletes = fletesMesAnterior.rows[0].total > 0 
      ? ((fletesMes.rows[0].total - fletesMesAnterior.rows[0].total) / fletesMesAnterior.rows[0].total * 100)
      : 0;

    const crecimientoIngresos = ingresosMesAnterior.rows[0].total > 0
      ? ((ingresosMes.rows[0].total - ingresosMesAnterior.rows[0].total) / ingresosMesAnterior.rows[0].total * 100)
      : 0;

    // 4. RUTAS POPULARES
    const rutasPopulares = await db.query(`
      SELECT origen, destino, COUNT(*) as frecuencia
      FROM admin_fletes 
      WHERE estado = 'completado'
      GROUP BY origen, destino
      ORDER BY frecuencia DESC
      LIMIT 5
    `);

    // 5. ACTIVIDAD RECIENTE
    const actividadReciente = await db.query(`
      SELECT 
        'Nuevo flete creado' as descripcion,
        created_at as timestamp
      FROM admin_fletes
      WHERE created_at >= NOW() - INTERVAL '24 hours'
      UNION ALL
      SELECT 
        'Flete completado' as descripcion,
        updated_at as timestamp
      FROM admin_fletes
      WHERE estado = 'completado' AND updated_at >= NOW() - INTERVAL '24 hours'
      ORDER BY timestamp DESC
      LIMIT 10
    `);

    const stats = {
      // Operacionales
      totalFletes: parseInt(totalFletes.rows[0].total),
      fletesMes: parseInt(fletesMes.rows[0].total),
      fletesMesAnterior: parseInt(fletesMesAnterior.rows[0].total),
      fletesCompletados: parseInt(fletesCompletados.rows[0].total),
      fletesCancelados: parseInt(fletesCancelados.rows[0].total),
      fletesPendientes: parseInt(fletesPendientes.rows[0].total),
      conductoresActivos: parseInt(conductoresActivos.rows[0].total),
      conductoresInactivos: parseInt(conductoresInactivos.rows[0].total),
      totalClientes: parseInt(totalClientes.rows[0].total),
      nuevosClientesMes: parseInt(nuevosClientesMes.rows[0].total),
      tiempoPromedioAsignacion: parseFloat(tiempoPromedioAsignacion.rows[0].promedio_horas || 0),
      distanciaTotal: parseInt(distanciaTotal.rows[0].distancia_estimada_km || 0),
      
      // Financieras
      ingresosTotales: parseInt(ingresosTotales.rows[0].total),
      ingresosMes: parseInt(ingresosMes.rows[0].total),
      ingresosMesAnterior: parseInt(ingresosMesAnterior.rows[0].total),
      gananciaNeta: parseInt(gananciaNeta.rows[0].ganancia),
      costoPromedioFlete: parseInt(costoPromedioFlete.rows[0].promedio),
      pagosPendientes: parseInt(pagosPendientes.rows[0].total),
      
      // Crecimiento
      crecimientoFletes: parseFloat(crecimientoFletes.toFixed(1)),
      crecimientoIngresos: parseFloat(crecimientoIngresos.toFixed(1)),
      
      // Distribución por estado
      fletesPorEstado: fletesPorEstado.rows,
      
      // Rutas populares
      rutasPopulares: rutasPopulares.rows,
      
      // Actividad reciente
      actividadReciente: actividadReciente.rows.map(act => ({
        descripcion: act.descripcion,
        timestamp: new Date(act.timestamp).toLocaleString('es-CL')
      }))
    };

    res.json(stats);
  } catch (error) {
    console.error('❌ Error al obtener estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

module.exports = router;
