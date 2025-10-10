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
      <div class="max-w-7xl mx-auto p-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-3xl font-bold text-green-700">📦 Bienvenido a FletesPro</h1>
            <p class="text-sm text-gray-500 mt-1">{{ fechaActual }}</p>
          </div>
          <router-link to="/" 
                       class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>Calcular Nuevo Flete</span>
          </router-link>
        </div>

        <!-- Estadísticas principales -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-orange-100 rounded-lg">
                <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">En Proceso</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.enProceso }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Completados</p>
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
                <p class="text-sm font-medium text-gray-600">Total Gastado</p>
                <p class="text-2xl font-bold text-gray-900">${{ stats.totalGastado.toLocaleString() }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Reservas</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalReservas }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Acciones rápidas -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <router-link to="/" 
                       class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:scale-105">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium opacity-90">Nuevo</p>
                <p class="text-xl font-bold mt-1">Calcular Flete</p>
                <p class="text-sm opacity-90 mt-1">Cotiza tu envío</p>
              </div>
              <svg class="w-10 h-10 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
          </router-link>

          <router-link to="/cliente/reservas" 
                       class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:scale-105">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium opacity-90">Ver</p>
                <p class="text-xl font-bold mt-1">Mis Reservas</p>
                <p class="text-sm opacity-90 mt-1">{{ stats.enProceso }} pendientes</p>
              </div>
              <svg class="w-10 h-10 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </router-link>

          <router-link to="/cliente/pagos" 
                       class="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all transform hover:scale-105">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium opacity-90">Gestionar</p>
                <p class="text-xl font-bold mt-1">Mis Pagos</p>
                <p class="text-sm opacity-90 mt-1">Ver historial</p>
              </div>
              <svg class="w-10 h-10 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </router-link>
        </div>

        <!-- Información útil -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Cómo funciona -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-bold text-green-800 mb-4">🚀 ¿Cómo funciona?</h3>
            <ol class="space-y-3 text-sm text-green-700">
              <li class="flex items-start">
                <span class="font-bold mr-2">1.</span>
                <span><strong>Calcula</strong> el precio de tu flete ingresando origen y destino</span>
              </li>
              <li class="flex items-start">
                <span class="font-bold mr-2">2.</span>
                <span><strong>Solicita</strong> tu flete y será enviado a conductores verificados</span>
              </li>
              <li class="flex items-start">
                <span class="font-bold mr-2">3.</span>
                <span><strong>Un conductor acepta</strong> y te contacta por WhatsApp</span>
              </li>
              <li class="flex items-start">
                <span class="font-bold mr-2">4.</span>
                <span><strong>Realiza el pago</strong> y el conductor recogerá tu carga</span>
              </li>
            </ol>
          </div>

          <!-- Consejos -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm">
            <h3 class="text-lg font-bold text-blue-800 mb-4">💡 Consejos útiles</h3>
            <ul class="space-y-3 text-sm text-blue-700">
              <li class="flex items-start">
                <span class="mr-2">✅</span>
                <span>Especifica bien la dirección de origen y destino</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">✅</span>
                <span>Indica si necesitas ayudante para cargar/descargar</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">✅</span>
                <span>Mantén tu teléfono activo para coordinar con el conductor</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">✅</span>
                <span>Revisa el perfil del conductor antes de confirmar</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Últimas reservas -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-xl font-semibold text-green-700">📋 Últimas Reservas</h2>
            <router-link to="/cliente/reservas" class="text-sm text-green-600 hover:text-green-700 font-medium">
              Ver todas →
            </router-link>
          </div>
          
          <div class="p-6">
            <div v-if="loading" class="text-center py-8">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
              <p class="mt-2 text-gray-500">Cargando reservas...</p>
            </div>
            
            <div v-else-if="fletes.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">Aún no has solicitado ningún flete</h3>
              <p class="mt-1 text-sm text-gray-500">Comienza calculando el precio de tu envío</p>
              <div class="mt-6">
                <router-link to="/" 
                             class="inline-flex items-center px-6 py-3 shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors">
                  <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  Calcular mi primer flete
                </router-link>
              </div>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="flete in ultimasReservas" :key="flete.id" 
                   class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      <h3 class="text-lg font-semibold text-gray-900">Reserva #{{ flete.id }}</h3>
                      <span class="ml-3 px-2 py-1 text-xs font-medium rounded-full"
                            :class="getEstadoClass(flete.estado)">
                        {{ getEstadoText(flete.estado) }}
                      </span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p class="text-sm text-gray-500">Ruta</p>
                        <p class="text-gray-900">📍 {{ flete.origen }} → {{ flete.destino }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Precio</p>
                        <p class="text-gray-900 font-semibold text-green-600">${{ flete.precio.toLocaleString() }} CLP</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Fecha</p>
                        <p class="text-gray-900">{{ formatDate(flete.fecha) }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <router-link :to="`/cliente/reservas`" 
                               class="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Ver Detalles →
                  </router-link>
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
import { apiUrl, API_ENDPOINTS } from '../../config/api.js'
import Sidebar from '../../components/Sidebar.vue'

const fletes = ref([])
const sidebar = ref(null)
const loading = ref(false)
const fechaActual = ref('')

const stats = ref({
  enProceso: 0,
  completados: 0,
  totalGastado: 0,
  totalReservas: 0
})

const ultimasReservas = ref([])

// Método para toggle del sidebar
const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
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

// Cargar reservas del cliente
const loadReservas = async () => {
  try {
    loading.value = true
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (!usuario) return

    const response = await fetch(apiUrl(`/api/cliente/reservas/${usuario.id}`))
    const data = await response.json()
    fletes.value = data.reservas || []
    
    // Obtener solo las últimas 3 reservas
    ultimasReservas.value = fletes.value.slice(0, 3)
    
    // Calcular estadísticas
    stats.value.enProceso = fletes.value.filter(f => f.estado === 'asignado' || f.estado === 'en_proceso').length
    stats.value.completados = fletes.value.filter(f => f.estado === 'completado').length
    stats.value.totalReservas = fletes.value.length
    stats.value.totalGastado = fletes.value
      .filter(f => f.estado === 'completado')
      .reduce((sum, f) => sum + parseFloat(f.precio || 0), 0)
    
    console.log('📊 [DashboardCliente] Estadísticas:', stats.value)
  } catch (error) {
    console.error('❌ Error al cargar reservas:', error)
    fletes.value = []
  } finally {
    loading.value = false
  }
}

const getEstadoClass = (estado) => {
  const classes = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    asignado: 'bg-blue-100 text-blue-800',
    en_proceso: 'bg-orange-100 text-orange-800',
    completado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800'
  }
  return classes[estado] || 'bg-gray-100 text-gray-800'
}

const getEstadoText = (estado) => {
  const texts = {
    pendiente: 'Pendiente',
    asignado: 'Asignado',
    en_proceso: 'En Proceso',
    completado: 'Completado',
    cancelado: 'Cancelado'
  }
  return texts[estado] || estado
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-CL')
}
  
onMounted(async () => {
  actualizarFechaActual()
  await loadReservas()
  
  // Actualizar fecha cada minuto
  setInterval(actualizarFechaActual, 60000)
})
</script>
  