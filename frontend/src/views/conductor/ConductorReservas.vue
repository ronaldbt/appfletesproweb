<template>
  <div class="min-h-screen bg-white text-gray-900">
    <Sidebar :userRole="'conductor'" ref="sidebar" />
    
    <button @click="toggleSidebar" 
            class="fixed top-4 left-4 z-50 lg:hidden bg-green-600 text-white p-2 rounded-lg shadow-lg">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <div class="lg:ml-64 transition-all duration-300">
      <div class="max-w-6xl mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6 text-green-700">📋 Reservas Asignadas</h1>
        
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-green-700">🚛 Fletes Pendientes</h2>
          </div>
          
          <div class="p-6">
            <div v-if="loading" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p class="mt-2 text-gray-500">Cargando reservas...</p>
            </div>
            
            <div v-else-if="reservas.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No tienes reservas asignadas</h3>
              <p class="mt-1 text-sm text-gray-500">Las reservas aparecerán aquí cuando tengas fletes asignados.</p>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="reserva in reservas" :key="reserva.id" 
                   class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      <h3 class="text-lg font-semibold text-gray-900">Reserva #{{ reserva.id }}</h3>
                      <span class="ml-3 px-2 py-1 text-xs font-medium rounded-full"
                            :class="getEstadoClass(reserva.estado)">
                        {{ getEstadoText(reserva.estado) }}
                      </span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p class="text-sm text-gray-500">Ruta</p>
                        <p class="text-gray-900">📍 {{ reserva.origen }} → {{ reserva.destino }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Tu ganancia</p>
                        <p class="text-gray-900 font-semibold text-green-600">${{ Math.round(reserva.precio * 0.9).toLocaleString() }} CLP</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Fecha programada</p>
                        <p class="text-gray-900">{{ formatDate(reserva.fecha) }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👤 {{ reserva.nombre_cliente || 'Cliente' }}</span>
                      <span>📞 {{ reserva.telefono_cliente || 'N/A' }}</span>
                      <span v-if="reserva.carga">📦 Carga: {{ reserva.carga }}</span>
                      <span>🚚 Ayudante: {{ reserva.ayudante ? 'Sí' : 'No' }}</span>
                    </div>
                  </div>
                  
                  <div class="flex flex-col space-y-2 ml-4">
                    <button @click="completarReserva(reserva)" 
                            v-if="reserva.estado === 'asignado'"
                            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      ✅ Completado
                    </button>
                    <button @click="rechazarReserva(reserva)" 
                            v-if="reserva.estado === 'asignado'"
                            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      ❌ Rechazar
                    </button>
                    <button @click="verDetalles(reserva)" 
                            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      👁️ Detalles
                    </button>
                  </div>
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
import { ref, onMounted } from 'vue'
import { API_BASE_URL } from '../../config/api.js'
import Sidebar from '../../components/Sidebar.vue'
import { useSidebar } from '../../composables/useSidebar.js'

const { updateReservasCount } = useSidebar()

const sidebar = ref(null)
const reservas = ref([])
const loading = ref(false)

const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
  }
}

const loadReservas = async () => {
  try {
    console.log('🚀 [ConductorReservas] Iniciando carga de reservas...')
    loading.value = true
    
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    console.log('👤 [ConductorReservas] Usuario desde localStorage:', usuario)
    
    if (!usuario) {
      console.log('❌ [ConductorReservas] No hay usuario en localStorage')
      return
    }

    const url = `${API_BASE_URL}/api/conductor/reservas/${usuario.id}`
    console.log('🌐 [ConductorReservas] URL de la API:', url)
    
    const response = await fetch(url)
    console.log('📡 [ConductorReservas] Response status:', response.status)
    console.log('📡 [ConductorReservas] Response ok:', response.ok)
    
    const data = await response.json()
    console.log('📦 [ConductorReservas] Datos recibidos:', data)
    console.log('📦 [ConductorReservas] Tipo de datos:', typeof data)
    console.log('📦 [ConductorReservas] Es array?', Array.isArray(data))
    
    if (Array.isArray(data)) {
      reservas.value = data
      console.log('✅ [ConductorReservas] Reservas cargadas:', data.length, 'elementos')
    } else if (data.reservas) {
      reservas.value = data.reservas
      console.log('✅ [ConductorReservas] Reservas desde data.reservas:', data.reservas.length, 'elementos')
    } else {
      reservas.value = []
      console.log('⚠️ [ConductorReservas] No se encontraron reservas en la respuesta')
    }
    
    console.log('📋 [ConductorReservas] Estado final de reservas:', reservas.value)
    
    // Actualizar el sidebar con el nuevo número de reservas
    await updateReservasCount()
  } catch (error) {
    console.error('❌ [ConductorReservas] Error al cargar reservas:', error)
    console.error('❌ [ConductorReservas] Error details:', error.message)
    reservas.value = []
  } finally {
    loading.value = false
    console.log('🏁 [ConductorReservas] Carga de reservas completada')
  }
}

const getEstadoClass = (estado) => {
  const classes = {
    asignado: 'bg-blue-100 text-blue-800',
    confirmado: 'bg-green-100 text-green-800',
    rechazado: 'bg-red-100 text-red-800'
  }
  return classes[estado] || 'bg-gray-100 text-gray-800'
}

const getEstadoText = (estado) => {
  const texts = {
    asignado: 'Asignado',
    confirmado: 'Confirmado',
    rechazado: 'Rechazado'
  }
  return texts[estado] || estado
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-CL')
}

const completarReserva = async (reserva) => {
  if (confirm(`¿Marcar como completada la reserva a ${reserva.destino}?`)) {
    try {
      console.log('✅ [ConductorReservas] Marcando reserva como completada:', reserva.id)
      
      // Determinar la URL correcta según el tipo de flete
      let url = ''
      let method = 'PUT'
      
      if (reserva.tipo_flete === 'admin') {
        url = `${API_BASE_URL}/api/admin/fletes/${reserva.id}/estado`
        method = 'POST' // Admin fletes usa POST
      } else {
        url = `${API_BASE_URL}/api/reservas/${reserva.id}/estado`
        method = 'PUT' // Reservas normales usa PUT
      }
      
      console.log(`🌐 [ConductorReservas] URL: ${url}, Method: ${method}`)
      
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'completado' })
      })
      
      const data = await response.json()
      console.log('📡 [ConductorReservas] Respuesta del servidor:', data)
      
      if (data.success || response.ok) {
        console.log('✅ [ConductorReservas] Reserva marcada como completada exitosamente')
        await loadReservas()
      } else {
        console.error('❌ [ConductorReservas] Error del servidor:', data)
      }
    } catch (error) {
      console.error('❌ [ConductorReservas] Error al completar reserva:', error)
    }
  }
}

const rechazarReserva = async (reserva) => {
  if (confirm(`¿Rechazar la reserva a ${reserva.destino}?`)) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reservas/${reserva.id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'rechazado' })
      })
      
      const data = await response.json()
      if (data.success) {
        await loadReservas()
      }
    } catch (error) {
      console.error('❌ Error al rechazar reserva:', error)
    }
  }
}

const verDetalles = (reserva) => {
  // TODO: Implementar modal de detalles
  console.log('Ver detalles de reserva:', reserva)
}

onMounted(() => {
  console.log('🎯 [ConductorReservas] Componente montado, iniciando carga de reservas...')
  loadReservas()
})
</script>
