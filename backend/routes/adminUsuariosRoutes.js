const express = require('express');
const router = express.Router();
const db = require('../utils/db');

// Obtener todos los usuarios (clientes y conductores) con paginación y filtros
router.get('/admin/usuarios', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      tipo = 'todos', 
      estado = 'todos', 
      busqueda = '' 
    } = req.query;

    const offset = (page - 1) * limit;
    let whereClause = '';
    let params = [];
    let paramCount = 0;

    // Construir filtros
    const filters = [];

    // Filtro por tipo
    if (tipo === 'clientes') {
      filters.push('tipo = $' + (++paramCount));
      params.push('cliente');
    } else if (tipo === 'conductores') {
      filters.push('tipo = $' + (++paramCount));
      params.push('conductor');
    }

    // Filtro por estado
    if (estado === 'activos') {
      filters.push('activo = $' + (++paramCount));
      params.push(true);
    } else if (estado === 'inactivos') {
      filters.push('activo = $' + (++paramCount));
      params.push(false);
    }

    // Filtro por búsqueda
    if (busqueda) {
      filters.push('(nombre ILIKE $' + (++paramCount) + ' OR email ILIKE $' + (++paramCount) + ' OR telefono ILIKE $' + (++paramCount) + ')');
      const searchTerm = `%${busqueda}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (filters.length > 0) {
      whereClause = 'WHERE ' + filters.join(' AND ');
    }

    // Query principal con UNION de usuarios y conductores
    const query = `
      SELECT 
        u.id::text,
        u.nombre,
        u.email,
        u.telefono,
        u.tipo,
        CASE 
          WHEN u.tipo = 'conductor' THEN c.activo
          ELSE true
        END as activo,
        u.creado_en as fecha_registro,
        c.zona
      FROM usuarios u
      LEFT JOIN conductores c ON u.id = c.usuario_id
      
      ${whereClause}
      ORDER BY u.creado_en DESC
      LIMIT $${++paramCount} OFFSET $${++paramCount}
    `;

    params.push(parseInt(limit), offset);

    // Query para contar total
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM usuarios u
      LEFT JOIN conductores c ON u.id = c.usuario_id
      ${whereClause}
    `;

    const [usuariosResult, countResult] = await Promise.all([
      db.query(query, params),
      db.query(countQuery, params.slice(0, -2)) // Excluir limit y offset
    ]);

    const usuarios = usuariosResult.rows.map(user => ({
      ...user,
      fecha_registro: new Date(user.fecha_registro).toLocaleDateString('es-CL'),
      activo: user.activo ? 'Activo' : 'Inactivo'
    }));

    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    res.json({
      usuarios,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Obtener estadísticas de usuarios
router.get('/admin/usuarios/stats', async (req, res) => {
  try {
    const [clientesResult, conductoresResult, activosResult] = await Promise.all([
      db.query('SELECT COUNT(*) as total FROM usuarios WHERE tipo = \'cliente\''),
      db.query('SELECT COUNT(*) as total FROM usuarios WHERE tipo = \'conductor\''),
      db.query('SELECT COUNT(*) as total FROM conductores WHERE activo = true')
    ]);

    res.json({
      totalClientes: parseInt(clientesResult.rows[0].total),
      totalConductores: parseInt(conductoresResult.rows[0].total),
      conductoresActivos: parseInt(activosResult.rows[0].total)
    });

  } catch (error) {
    console.error('❌ Error al obtener estadísticas de usuarios:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// Actualizar estado de conductor
router.put('/admin/usuarios/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    await db.query('UPDATE conductores SET activo = $1, updated_at = NOW() WHERE usuario_id = $2', [activo, id]);

    res.json({ success: true, message: 'Estado actualizado correctamente' });

  } catch (error) {
    console.error('❌ Error al actualizar estado:', error);
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
});

// Actualizar usuario completo
router.put('/admin/usuarios/:id', async (req, res) => {
  const client = await db.pool.connect();
  try {
    await client.query('BEGIN');
    
    const { id } = req.params;
    const { nombre, email, telefono, password } = req.body || {};
    
    // Verificar que el usuario existe
    const current = await client.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (!current.rows.length) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const user = current.rows[0];
    
    // Actualizar usuario
    if (password && String(password).length >= 6) {
      const bcrypt = require('bcrypt');
      const plain = String(password);
      const hash = await bcrypt.hash(plain, 10);
      
      await client.query(
        `UPDATE usuarios 
         SET nombre = COALESCE($1, nombre),
             email = COALESCE($2, email),
             telefono = COALESCE($3, telefono),
             password = $4,
             actualizado_en = NOW()
         WHERE id = $5`,
        [nombre, email, telefono, hash, id]
      );
    } else {
      await client.query(
        `UPDATE usuarios 
         SET nombre = COALESCE($1, nombre),
             email = COALESCE($2, email),
             telefono = COALESCE($3, telefono),
             actualizado_en = NOW()
         WHERE id = $4`,
        [nombre, email, telefono, id]
      );
    }
    
    // Si es conductor, también actualizar datos específicos del conductor
    if (user.tipo === 'conductor') {
      const { rut, vehiculo_placa, vehiculo_tipo, direccion, zona, activo } = req.body || {};
      
      await client.query(
        `UPDATE conductores 
         SET rut = COALESCE($1, rut),
             vehiculo_placa = COALESCE($2, vehiculo_placa),
             vehiculo_tipo = COALESCE($3, vehiculo_tipo),
             direccion = COALESCE($4, direccion),
             zona = COALESCE($5, zona),
             activo = COALESCE($6, activo),
             updated_at = NOW()
         WHERE usuario_id = $7`,
        [rut, vehiculo_placa, vehiculo_tipo, direccion, zona, activo, id]
      );
    }
    
    await client.query('COMMIT');
    
    // Obtener datos actualizados
    const updatedUser = await client.query(`
      SELECT 
        u.id::text,
        u.nombre,
        u.email,
        u.telefono,
        u.tipo,
        CASE 
          WHEN u.tipo = 'conductor' THEN c.activo
          ELSE true
        END as activo,
        u.creado_en as fecha_registro,
        c.zona,
        c.rut,
        c.vehiculo_placa,
        c.vehiculo_tipo,
        c.direccion
      FROM usuarios u
      LEFT JOIN conductores c ON u.id = c.usuario_id
      WHERE u.id = $1
    `, [id]);
    
    res.json({
      success: true,
      message: 'Usuario actualizado correctamente',
      usuario: updatedUser.rows[0]
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  } finally {
    client.release();
  }
});

module.exports = router;
