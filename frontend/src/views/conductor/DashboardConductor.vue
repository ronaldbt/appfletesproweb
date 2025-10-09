<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- Sidebar -->
    <Sidebar :userRole="'conductor'" ref="sidebar" />
    
    <!-- Botón toggle para móvil -->
    <button @click="toggleSidebar" 
            class="fixed top-4 left-4 z-50 lg:hidden bg-green-600 text-white p-2 rounded-lg shadow-lg">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Contenido principal -->
    <div class="lg:ml-64 transition-all duration-300">
      <div class="max-w-7xl mx-auto p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-green-700">🚛 Dashboard del Conductor</h1>
          <div class="text-sm text-gray-500">
            Bienvenido, {{ conductorInfo?.nombre || 'Conductor' }}
          </div>
        </div>

        <!-- Estadísticas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Fletes Activos</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.fletesActivos }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Ganancia del Mes</p>
                <p class="text-2xl font-bold text-gray-900">${{ stats.gananciaMes.toLocaleString() }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Fletes Completados</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.fletesCompletados }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Rating Promedio</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.ratingPromedio }}/5</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Fletes Asignados -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-green-700">📋 Fletes Asignados</h2>
          </div>
          
          <div class="p-6">
            <div v-if="loading" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p class="mt-2 text-gray-500">Cargando fletes...</p>
            </div>
            
            <div v-else-if="fletes.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No tienes fletes asignados</h3>
              <p class="mt-1 text-sm text-gray-500">Los fletes aparecerán aquí cuando tengas reservas asignadas.</p>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="flete in fletes" :key="flete.id" 
                   class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      <h3 class="text-lg font-semibold text-gray-900">Flete #{{ flete.id }}</h3>
                      <span class="ml-3 px-2 py-1 text-xs font-medium rounded-full"
                            :class="getEstadoClass(flete.estado)">
                        {{ getEstadoText(flete.estado) }}
                      </span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p class="text-sm text-gray-500">Origen</p>
                        <p class="text-gray-900">📍 {{ flete.origen }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Destino</p>
                        <p class="text-gray-900">📍 {{ flete.destino }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Tu ganancia</p>
                        <p class="text-gray-900 font-semibold text-green-600">${{ Math.round(flete.precio * 0.9).toLocaleString() }} CLP</p>
                      </div>
                    </div>
                    
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👤 {{ flete.cliente_nombre || 'Cliente' }}</span>
                      <span>📅 {{ formatDate(flete.fecha) }}</span>
                      <span>🚚 Ayudante: {{ flete.ayudante ? 'Sí' : 'No' }}</span>
                    </div>
                  </div>
                  
                  <div class="flex flex-col space-y-2 ml-4">
                    <button @click="iniciarFlete(flete)" 
                            v-if="flete.estado === 'confirmado'"
                            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Iniciar
                    </button>
                    <button @click="completarFlete(flete)" 
                            v-if="flete.estado === 'en_proceso'"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Completar
                    </button>
                    <button @click="verDetalles(flete)" 
                            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Información de pagos -->
        <div class="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
            <p class="text-green-800 font-medium">
              💸 Tus pagos se procesan todos los miércoles automáticamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { API_BASE_URL } from '../../config/api.js'
import Sidebar from '../../components/Sidebar.vue'

const fletes = ref([])
const sidebar = ref(null)
const loading = ref(false)
const conductorInfo = ref(null)
const stats = ref({
  fletesActivos: 0,
  gananciaMes: 0,
  fletesCompletados: 0,
  ratingPromedio: 4.5
})

// Método para toggle del sidebar
const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
  }
}

// Cargar información del conductor
const loadConductorInfo = async () => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (!usuario) return

    const response = await fetch(`${API_BASE_URL}/api/conductor/info/${usuario.id}`)
    const data = await response.json()
    conductorInfo.value = data.conductor || usuario
  } catch (error) {
    console.error('❌ Error al cargar info del conductor:', error)
  }
}

// Cargar fletes del conductor
const loadFletes = async () => {
  try {
    loading.value = true
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (!usuario) return

    const response = await fetch(`${API_BASE_URL}/api/conductor/fletes/${usuario.id}`)
    const data = await response.json()
    fletes.value = data.fletes || []
  } catch (error) {
    console.error('❌ Error al cargar fletes:', error)
    fletes.value = []
  } finally {
    loading.value = false
  }
}

// Cargar estadísticas
const loadStats = async () => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (!usuario) return

    const response = await fetch(`${API_BASE_URL}/api/conductor/stats/${usuario.id}`)
    const data = await response.json()
    stats.value = data.stats || stats.value
  } catch (error) {
    console.error('❌ Error al cargar estadísticas:', error)
  }
}

// Utilidades
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

// Acciones de fletes
const iniciarFlete = async (flete) => {
  if (confirm(`¿Iniciar el flete a ${flete.destino}?`)) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/fletes/${flete.id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'en_proceso' })
      })
      
      const data = await response.json()
      if (data.success) {
        await loadFletes()
        await loadStats()
      }
    } catch (error) {
      console.error('❌ Error al iniciar flete:', error)
    }
  }
}

const completarFlete = async (flete) => {
  if (confirm(`¿Marcar como completado el flete a ${flete.destino}?`)) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/fletes/${flete.id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'completado' })
      })
      
      const data = await response.json()
      if (data.success) {
        await loadFletes()
        await loadStats()
      }
    } catch (error) {
      console.error('❌ Error al completar flete:', error)
    }
  }
}

const verDetalles = (flete) => {
  // TODO: Implementar modal de detalles
  console.log('Ver detalles de flete:', flete)
}

onMounted(async () => {
  await Promise.all([
    loadConductorInfo(),
    loadFletes(),
    loadStats()
  ])
})
</script>
  