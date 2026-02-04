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
        <h1 class="text-3xl font-bold mb-6 text-green-700">📊 Mi Historial</h1>
        
        <!-- Filtros -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Período</label>
              <select v-model="filtro.periodo" @change="loadHistorial" 
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="mes">Este mes</option>
                <option value="3meses">Últimos 3 meses</option>
                <option value="año">Este año</option>
                <option value="todos">Todos</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select v-model="filtro.estado" @change="loadHistorial"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="todos">Todos</option>
                <option value="completado">Completados</option>
                <option value="cancelado">Cancelados</option>
              </select>
            </div>
            <div class="flex items-end">
              <button @click="loadHistorial" 
                      class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                🔍 Filtrar
              </button>
            </div>
          </div>
        </div>

        <!-- Estadísticas del período -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Fletes Completados</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.completados }}</p>
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
                <p class="text-sm font-medium text-gray-600">Ganancia Total</p>
                <p class="text-2xl font-bold text-gray-900">${{ stats.gananciaTotal.toLocaleString() }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Rating Promedio</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.ratingPromedio }}/5</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Tiempo Promedio</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.tiempoPromedio }}h</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de fletes -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-green-700">📋 Historial de Fletes</h2>
          </div>
          
          <div class="p-6">
            <div v-if="loading" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p class="mt-2 text-gray-500">Cargando historial...</p>
            </div>
            
            <div v-else-if="historial.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No hay fletes en el historial</h3>
              <p class="mt-1 text-sm text-gray-500">Los fletes completados aparecerán aquí.</p>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="flete in historial" :key="flete.id" 
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
                        <p class="text-sm text-gray-500">Ruta</p>
                        <p class="text-gray-900">📍 {{ flete.origen }} → {{ flete.destino }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Ganancia</p>
                        <p class="text-gray-900 font-semibold text-green-600">${{ Math.round(flete.precio * 0.9).toLocaleString() }} CLP</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Fecha</p>
                        <p class="text-gray-900">{{ formatDate(flete.fecha) }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👤 {{ flete.nombre_cliente || 'Cliente' }}</span>
                      <span>📞 {{ flete.telefono_cliente || 'N/A' }}</span>
                      <span v-if="flete.carga">📦 Carga: {{ flete.carga }}</span>
                      <span>🚚 Ayudante: {{ flete.ayudante ? 'Sí' : 'No' }}</span>
                      <span>⭐ {{ flete.rating || 'Sin calificar' }}/5</span>
                    </div>
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

const sidebar = ref(null)
const historial = ref([])
const loading = ref(false)
const filtro = ref({
  periodo: 'mes',
  estado: 'todos'
})
const stats = ref({
  completados: 0,
  gananciaTotal: 0,
  ratingPromedio: 4.5,
  tiempoPromedio: 2.5
})

const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
  }
}

const loadHistorial = async () => {
  try {
    console.log('📊 [ConductorHistorial] Iniciando carga de historial...')
    loading.value = true
    
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    console.log('👤 [ConductorHistorial] Usuario:', usuario)
    
    if (!usuario) {
      console.log('❌ [ConductorHistorial] No hay usuario en localStorage')
      return
    }

    const params = new URLSearchParams(filtro.value)
    const url = `${API_BASE_URL}/api/conductor/historial/${usuario.id}?${params}`
    console.log('🌐 [ConductorHistorial] URL:', url)
    
    const response = await fetch(url)
    console.log('📡 [ConductorHistorial] Response status:', response.status)
    
    const data = await response.json()
    console.log('📦 [ConductorHistorial] Datos recibidos:', data)
    
    historial.value = data.historial || []
    console.log(`📋 [ConductorHistorial] Historial cargado: ${historial.value.length} elementos`)
    
    if (data.stats) {
      stats.value = data.stats
      console.log('📊 [ConductorHistorial] Estadísticas:', data.stats)
    }
  } catch (error) {
    console.error('❌ [ConductorHistorial] Error al cargar historial:', error)
    historial.value = []
  } finally {
    loading.value = false
    console.log('🏁 [ConductorHistorial] Carga de historial completada')
  }
}

const getEstadoClass = (estado) => {
  const classes = {
    completado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800'
  }
  return classes[estado] || 'bg-gray-100 text-gray-800'
}

const getEstadoText = (estado) => {
  const texts = {
    completado: 'Completado',
    cancelado: 'Cancelado'
  }
  return texts[estado] || estado
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-CL')
}

onMounted(() => {
  loadHistorial()
})
</script>
