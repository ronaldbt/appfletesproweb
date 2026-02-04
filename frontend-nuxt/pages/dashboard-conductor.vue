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
        <!-- Header con fecha y hora actual -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 class="text-3xl font-bold text-green-700">🚛 Centro de Control</h1>
            <p class="text-sm text-gray-500 mt-1">{{ fechaActual }}</p>
          </div>
          <div class="mt-4 md:mt-0 flex items-center space-x-3">
            <button @click="toggleDisponibilidad" 
                    :class="['px-4 py-2 rounded-lg font-medium transition-all', 
                             disponible ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-700 hover:bg-gray-400']">
              {{ disponible ? '✅ Disponible' : '⏸️ No Disponible' }}
            </button>
            <button @click="loadAllData" 
                    class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              🔄 Actualizar
            </button>
          </div>
        </div>

        <!-- Alerta de próximo flete -->
        <div v-if="proximoFlete" class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6 shadow-sm">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4 flex-1">
              <h3 class="text-lg font-bold text-yellow-800">⚡ Próximo Flete</h3>
              <p class="text-yellow-700 mt-1">
                <span class="font-semibold">{{ proximoFlete.origen }}</span> → 
                <span class="font-semibold">{{ proximoFlete.destino }}</span>
              </p>
              <p class="text-sm text-yellow-600 mt-1">
                🕐 Programado: {{ formatearFechaHora(proximoFlete.programado_para) }}
              </p>
              <p class="text-sm text-yellow-600">
                👤 Cliente: {{ proximoFlete.nombre_cliente || 'Sin especificar' }} | 
                📞 {{ proximoFlete.telefono_cliente || 'N/A' }}
              </p>
              <p class="text-lg font-bold text-green-700 mt-2">
                💰 Tu ganancia: ${{ Math.round(proximoFlete.precio * 0.9).toLocaleString() }} CLP
              </p>
            </div>
            <button @click="verDetallesFlete(proximoFlete)" 
                    class="ml-4 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Ver Detalles
            </button>
          </div>
        </div>

        <!-- Métricas del día -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-orange-100 rounded-lg">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Fletes de Hoy</p>
                <p class="text-2xl font-bold text-gray-900">{{ fletesHoy.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pendientes</p>
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
                <p class="text-sm font-medium text-gray-600">Ganancia esta semana</p>
                <p class="text-2xl font-bold text-gray-900">${{ stats.gananciaSemana?.toLocaleString() || '0' }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Tu Rating</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.ratingPromedio }}/5</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Acciones rápidas -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <NuxtLink to="/conductor/reservas" 
                       class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:scale-105">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium opacity-90">Ir a</p>
                <p class="text-xl font-bold mt-1">Reservas Asignadas</p>
                <p class="text-sm opacity-90 mt-1">{{ stats.fletesActivos }} pendientes</p>
              </div>
              <svg class="w-10 h-10 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </NuxtLink>

          <NuxtLink to="/conductor/historial" 
                       class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:scale-105">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium opacity-90">Ver</p>
                <p class="text-xl font-bold mt-1">Historial Completo</p>
                <p class="text-sm opacity-90 mt-1">{{ stats.fletesCompletados }} completados</p>
              </div>
              <svg class="w-10 h-10 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </NuxtLink>

          <NuxtLink to="/conductor/perfil" 
                       class="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:scale-105">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium opacity-90">Configurar</p>
                <p class="text-xl font-bold mt-1">Mi Perfil</p>
                <p class="text-sm opacity-90 mt-1">Datos y vehículo</p>
              </div>
              <svg class="w-10 h-10 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </NuxtLink>
        </div>

        <!-- Fletes Programados para Hoy -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-xl font-semibold text-green-700">📅 Fletes de Hoy</h2>
            <NuxtLink to="/conductor/reservas" class="text-sm text-green-600 hover:text-green-700 font-medium">
              Ver todas las reservas →
            </NuxtLink>
          </div>
          
          <div class="p-6">
            <div v-if="loading" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p class="mt-2 text-gray-500">Cargando fletes...</p>
            </div>
            
            <div v-else-if="fletesHoy.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No tienes fletes programados para hoy</h3>
              <p class="mt-1 text-sm text-gray-500">
                Tienes <span class="font-semibold text-green-600">{{ stats.fletesActivos }}</span> reservas asignadas para otros días.
              </p>
              <NuxtLink to="/conductor/reservas" 
                           class="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Ver todas las reservas
              </NuxtLink>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="flete in fletesHoy" :key="flete.id" 
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
                      <span>👤 {{ flete.nombre_cliente || 'Cliente' }}</span>
                      <span>📞 {{ flete.telefono_cliente || 'N/A' }}</span>
                      <span v-if="flete.carga">📦 {{ flete.carga }}</span>
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
import { useSidebar } from '../../composables/useSidebar.js'

const { setSidebarRef } = useSidebar()

const fletes = ref([])
const sidebar = ref(null)
const loading = ref(false)
const conductorInfo = ref(null)
const disponible = ref(true)
const fechaActual = ref('')
const proximoFlete = ref(null)
const fletesHoy = ref([])

const stats = ref({
  fletesActivos: 0,
  gananciaMes: 0,
  fletesCompletados: 0,
  gananciaSemana: 0,
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

    const response = await fetch(`${API_BASE_URL}/api/conductor/reservas/${usuario.id}`)
    const data = await response.json()
    fletes.value = Array.isArray(data) ? data : []
    
    // Filtrar fletes de hoy
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const mañana = new Date(hoy)
    mañana.setDate(mañana.getDate() + 1)
    
    fletesHoy.value = fletes.value.filter(f => {
      if (!f.programado_para) return false
      const fechaFlete = new Date(f.programado_para)
      return fechaFlete >= hoy && fechaFlete < mañana
    })
    
    // Obtener el próximo flete (el más cercano en el tiempo)
    const fletesOrdenados = [...fletes.value].sort((a, b) => {
      const fechaA = new Date(a.programado_para || a.fecha)
      const fechaB = new Date(b.programado_para || b.fecha)
      return fechaA - fechaB
    })
    proximoFlete.value = fletesOrdenados.length > 0 ? fletesOrdenados[0] : null
    
    console.log(`📅 Fletes de hoy: ${fletesHoy.value.length}`)
    console.log(`⏰ Próximo flete:`, proximoFlete.value ? proximoFlete.value.id : 'Ninguno')
  } catch (error) {
    console.error('❌ Error al cargar fletes:', error)
    fletes.value = []
    fletesHoy.value = []
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
    
    // Calcular ganancia de la semana basada en fletes completados
    const gananciaSemana = fletes.value
      .filter(f => {
        if (f.estado !== 'completado') return false
        const fechaFlete = new Date(f.fecha)
        const hace7Dias = new Date()
        hace7Dias.setDate(hace7Dias.getDate() - 7)
        return fechaFlete >= hace7Dias
      })
      .reduce((sum, f) => sum + (f.precio * 0.9), 0)
    
    stats.value = { 
      ...stats.value, 
      ...(data.stats || data),
      gananciaSemana: Math.round(gananciaSemana)
    }
  } catch (error) {
    console.error('❌ Error al cargar estadísticas:', error)
  }
}

// Actualizar fecha actual
const actualizarFechaActual = () => {
  const opciones = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  fechaActual.value = new Date().toLocaleDateString('es-CL', opciones)
}

// Toggle disponibilidad
const toggleDisponibilidad = () => {
  disponible.value = !disponible.value
  console.log(`🔄 Disponibilidad cambiada a: ${disponible.value ? 'Disponible' : 'No disponible'}`)
  // TODO: Guardar en backend
}

// Actualizar todos los datos
const loadAllData = async () => {
  console.log('🔄 Actualizando todos los datos...')
  actualizarFechaActual()
  await Promise.all([
    loadConductorInfo(),
    loadFletes(),
    loadStats()
  ])
}

// Formatear fecha y hora
const formatearFechaHora = (fechaStr) => {
  if (!fechaStr) return 'Sin programar'
  const fecha = new Date(fechaStr)
  return fecha.toLocaleString('es-CL', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Ver detalles del flete
const verDetallesFlete = (flete) => {
  console.log('📋 Ver detalles de flete:', flete)
  // TODO: Implementar modal de detalles
  alert(`Flete: ${flete.origen} → ${flete.destino}\nCliente: ${flete.nombre_cliente}\nTeléfono: ${flete.telefono_cliente}\nGanancia: $${Math.round(flete.precio * 0.9).toLocaleString()}`)
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
  // Configurar referencia del sidebar
  setSidebarRef(sidebar.value)
  
  // Actualizar fecha y cargar todos los datos
  actualizarFechaActual()
  await loadAllData()
  
  // Actualizar fecha cada minuto
  setInterval(actualizarFechaActual, 60000)
})
</script>
  