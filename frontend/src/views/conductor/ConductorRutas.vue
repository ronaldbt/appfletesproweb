<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Sidebar -->
    <Sidebar :userRole="'conductor'" ref="sidebar" />
    
    <!-- Botón toggle para móvil -->
    <button @click="toggleSidebar" 
            class="fixed top-4 left-4 z-50 lg:hidden bg-blue-600 text-white p-2 rounded-lg shadow-lg">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Contenido principal -->
    <div class="lg:ml-64 transition-all duration-300">
      <div class="max-w-6xl mx-auto p-6 text-white">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">🗺️ Mis Rutas</h1>
          <div class="flex space-x-3">
            <button @click="toggleDisponibilidad" 
                    :class="disponible ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'"
                    class="px-4 py-2 rounded-lg flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span>{{ disponible ? 'Marcar No Disponible' : 'Marcar Disponible' }}</span>
            </button>
            <button @click="loadRutas" 
                    class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Actualizar</span>
            </button>
          </div>
        </div>

        <!-- Estado del conductor -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gray-800 p-4 rounded-lg">
            <div class="flex items-center">
              <div class="p-2 rounded-lg" :class="disponible ? 'bg-green-600' : 'bg-red-600'">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-400">Estado</p>
                <p class="text-xl font-bold" :class="disponible ? 'text-green-400' : 'text-red-400'">
                  {{ disponible ? 'Disponible' : 'No Disponible' }}
                </p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-800 p-4 rounded-lg">
            <div class="flex items-center">
              <div class="p-2 bg-blue-600 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-400">Rutas Hoy</p>
                <p class="text-xl font-bold">{{ rutasHoy.length }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-800 p-4 rounded-lg">
            <div class="flex items-center">
              <div class="p-2 bg-purple-600 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-400">Ganancia Hoy</p>
                <p class="text-xl font-bold text-purple-400">${{ gananciaHoy.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mapa y rutas del día -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h3 class="text-xl font-bold mb-4">🗺️ Mapa de Rutas</h3>
          <div ref="map" class="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
            <p class="text-gray-400">Mapa de rutas se cargará aquí</p>
          </div>
        </div>

        <!-- Lista de rutas -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold mb-4">📋 Rutas Asignadas</h3>
          
          <div v-if="rutas.length === 0" class="text-center py-8">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-300">No hay rutas asignadas</h3>
            <p class="mt-1 text-sm text-gray-500">Las rutas aparecerán aquí cuando tengas reservas asignadas.</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="ruta in rutas" :key="ruta.id" 
                 class="border border-gray-700 p-4 rounded-lg hover:bg-gray-700 transition">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <h4 class="text-lg font-semibold text-white">Ruta #{{ ruta.id }}</h4>
                    <span class="ml-3 px-2 py-1 text-xs font-medium rounded-full"
                          :class="getEstadoClass(ruta.estado)">
                      {{ getEstadoText(ruta.estado) }}
                    </span>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p class="text-sm text-gray-400">Origen</p>
                      <p class="text-white">📍 {{ ruta.origen }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-400">Destino</p>
                      <p class="text-white">📍 {{ ruta.destino }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-400">Tu ganancia</p>
                      <p class="text-white font-semibold">${{ Math.round(ruta.precio * 0.9).toLocaleString() }} CLP</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-4 text-sm text-gray-400">
                    <span>👤 {{ ruta.cliente_nombre }}</span>
                    <span>📅 {{ formatDate(ruta.fecha) }}</span>
                    <span>🚚 Ayudante: {{ ruta.ayudante ? 'Sí' : 'No' }}</span>
                  </div>
                </div>
                
                <div class="flex flex-col space-y-2 ml-4">
                  <button @click="iniciarRuta(ruta)" 
                          v-if="ruta.estado === 'confirmado'"
                          class="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm">
                    Iniciar
                  </button>
                  <button @click="completarRuta(ruta)" 
                          v-if="ruta.estado === 'en_proceso'"
                          class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
                    Completar
                  </button>
                  <button @click="verDetalles(ruta)" 
                          class="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm">
                    Detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { apiUrl, API_ENDPOINTS } from '../../config/api.js'
import Sidebar from '../../components/Sidebar.vue'

const sidebar = ref(null)
const rutas = ref([])
const disponible = ref(true)
const map = ref(null)

// Computed
const rutasHoy = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return rutas.value.filter(ruta => 
    new Date(ruta.fecha).toISOString().split('T')[0] === today
  )
})

const gananciaHoy = computed(() => {
  return rutasHoy.value.reduce((sum, ruta) => sum + (ruta.precio * 0.9), 0)
})

// Métodos
const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
  }
}

const toggleDisponibilidad = async () => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const response = await fetch(apiUrl(`/api/conductor/disponibilidad/${usuario.id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ disponible: !disponible.value })
    })
    
    const data = await response.json()
    if (data.success) {
      disponible.value = !disponible.value
    }
  } catch (error) {
    console.error('Error al cambiar disponibilidad:', error)
  }
}

const loadRutas = async () => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const response = await fetch(apiUrl(`/api/conductor/rutas/${usuario.id}`))
    const data = await response.json()
    rutas.value = data.rutas || []
  } catch (error) {
    console.error('Error al cargar rutas:', error)
  }
}

const getEstadoClass = (estado) => {
  const classes = {
    confirmado: 'bg-blue-100 text-blue-800',
    en_proceso: 'bg-yellow-100 text-yellow-800',
    completado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800'
  }
  return classes[estado] || 'bg-gray-100 text-gray-800'
}

const getEstadoText = (estado) => {
  const texts = {
    confirmado: 'Confirmado',
    en_proceso: 'En Proceso',
    completado: 'Completado',
    cancelado: 'Cancelado'
  }
  return texts[estado] || estado
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-CL')
}

const iniciarRuta = async (ruta) => {
  if (confirm(`¿Iniciar la ruta a ${ruta.destino}?`)) {
    try {
      const response = await fetch(apiUrl(`/api/reservas/${ruta.id}/estado`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'en_proceso' })
      })
      
      const data = await response.json()
      if (data.success) {
        loadRutas() // Recargar rutas
      }
    } catch (error) {
      console.error('Error al iniciar ruta:', error)
    }
  }
}

const completarRuta = async (ruta) => {
  if (confirm(`¿Marcar como completada la ruta a ${ruta.destino}?`)) {
    try {
      const response = await fetch(apiUrl(`/api/reservas/${ruta.id}/estado`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'completado' })
      })
      
      const data = await response.json()
      if (data.success) {
        loadRutas() // Recargar rutas
      }
    } catch (error) {
      console.error('Error al completar ruta:', error)
    }
  }
}

const verDetalles = (ruta) => {
  // TODO: Implementar modal de detalles
  console.log('Ver detalles de ruta:', ruta)
}

onMounted(() => {
  loadRutas()
})
</script>
