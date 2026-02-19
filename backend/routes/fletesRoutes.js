const express = require('express')
const router = express.Router()
const db = require('../utils/db')

// 📦 Obtener pedidos del cliente (PostgreSQL)
router.get('/cliente/:telefono', async (req, res) => {
  const telefono = req.params.telefono
  try {
    console.log('📋 [FLETES] GET /cliente/:telefono', telefono)
    const { rows } = await db.query(
      `SELECT * FROM reservas WHERE telefono = $1 ORDER BY COALESCE(fecha, created_at) DESC`,
      [telefono]
    )
    console.log('📋 [FLETES] Reservas cliente:', rows.length)
    res.json(rows)
  } catch (error) {
    console.error('❌ [FLETES] Error al obtener pedidos cliente:', error)
    res.status(500).json({ error: 'Error al obtener pedidos' })
  }
})

// 🚚 Obtener fletes realizados por el conductor (PostgreSQL)
router.get('/conductor/:numero', async (req, res) => {
  const numero = req.params.numero
  try {
    console.log('📋 [FLETES] GET /conductor/:numero', numero)
    const { rows } = await db.query(
      `SELECT * FROM reservas WHERE conductor_asignado = $1 ORDER BY COALESCE(fecha, created_at) DESC`,
      [numero]
    )
    console.log('📋 [FLETES] Reservas conductor:', rows.length)
    res.json(rows)
  } catch (error) {
    console.error('❌ [FLETES] Error al obtener fletes del conductor:', error)
    res.status(500).json({ error: 'Error al obtener fletes' })
  }
})

module.exports = router
