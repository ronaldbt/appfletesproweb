<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- Sidebar -->
    <Sidebar :userRole="'cliente'" ref="sidebar" />
    
    <!-- Botón toggle para móvil -->
    <button @click="toggleSidebar" 
            class="fixed top-4 left-4 z-50 lg:hidden bg-green-600 text-white p-2 rounded-lg shadow-lg">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Contenido principal -->
    <div class="lg:ml-64 transition-all duration-300">
      <div class="max-w-6xl mx-auto p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-green-700">📋 Mis Reservas</h1>
          <router-link to="/" 
                       class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 font-medium transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Nueva Reserva</span>
          </router-link>
        </div>

        <!-- Estadísticas del cliente -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Reservas</p>
                <p class="text-2xl font-bold text-gray-900">{{ reservas.length }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Completadas</p>
                <p class="text-2xl font-bold text-gray-900">{{ reservasCompletadas }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Gastado</p>
                <p class="text-2xl font-bold text-gray-900">${{ totalGastado.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de reservas -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-green-700">📦 Lista de Reservas</h2>
          </div>
          
          <div class="p-6">
            <div v-if="reservas.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No tienes reservas</h3>
              <p class="mt-1 text-sm text-gray-500">Comienza creando tu primera reserva de flete.</p>
              <div class="mt-6">
                <router-link to="/" 
                             class="inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors">
                  <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Nueva Reserva
                </router-link>
              </div>
            </div>

            <div v-else class="space-y-4">
              <div v-for="reserva in reservas" :key="reserva.id" 
                   class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center mb-3">
                      <h3 class="text-lg font-semibold text-gray-900">Reserva #{{ reserva.id }}</h3>
                      <span class="ml-3 px-2 py-1 text-xs font-medium rounded-full"
                            :class="getEstadoClass(reserva.estado)">
                        {{ getEstadoText(reserva.estado) }}
                      </span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p class="text-sm text-gray-500 mb-1">Origen</p>
                        <p class="text-gray-900">📍 {{ reserva.origen }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500 mb-1">Destino</p>
                        <p class="text-gray-900">📍 {{ reserva.destino }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500 mb-1">Precio</p>
                        <p class="text-gray-900 font-semibold text-green-600">${{ reserva.precio.toLocaleString() }} CLP</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500 mb-1">Fecha</p>
                        <p class="text-gray-900">📅 {{ formatDate(reserva.fecha) }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span>🚚 Ayudante: {{ reserva.ayudante ? 'Sí' : 'No' }}</span>
                      <span>📅 Creado: {{ formatDate(reserva.creado_en) }}</span>
                    </div>
                  </div>
                  
                  <div class="flex flex-col space-y-2 ml-4">
                    <button @click="viewDetails(reserva)" 
                            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      👁️ Ver Detalles
                    </button>
                    <button v-if="reserva.estado === 'pendiente'" 
                            @click="cancelReserva(reserva)" 
                            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      ❌ Cancelar
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
import { ref, computed, onMounted } from 'vue'
import { apiUrl, API_ENDPOINTS } from '../../config/api.js'
import Sidebar from '../../components/Sidebar.vue'

const sidebar = ref(null)
const reservas = ref([])

// Computed
const reservasCompletadas = computed(() => {
  return reservas.value.filter(r => r.estado === 'completado').length
})

const totalGastado = computed(() => {
  return reservas.value.reduce((sum, r) => sum + parseFloat(r.precio), 0)
})

// Métodos
const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
  }
}

const loadReservas = async () => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (!usuario) return
    
    const response = await fetch(apiUrl(`/api/cliente/reservas/${usuario.id}`))
    const data = await response.json()
    reservas.value = data.reservas || []
  } catch (error) {
    console.error('Error al cargar reservas:', error)
  }
}

const getEstadoClass = (estado) => {
  const classes = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    confirmado: 'bg-blue-100 text-blue-800',
    en_proceso: 'bg-purple-100 text-purple-800',
    completado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800'
  }
  return classes[estado] || 'bg-gray-100 text-gray-800'
}

const getEstadoText = (estado) => {
  const texts = {
    pendiente: 'Pendiente',
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

const viewDetails = (reserva) => {
  // TODO: Implementar modal de detalles
  console.log('Ver detalles:', reserva)
}

const cancelReserva = (reserva) => {
  if (confirm(`¿Estás seguro de cancelar la reserva #${reserva.id}?`)) {
    // TODO: Implementar cancelación
    console.log('Cancelar reserva:', reserva)
  }
}

onMounted(() => {
  loadReservas()
})
</script>
