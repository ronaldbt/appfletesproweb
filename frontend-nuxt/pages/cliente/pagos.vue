<template>
  <div class="min-h-screen bg-white text-gray-900">
    <Sidebar :userRole="'cliente'" ref="sidebar" />
    
    <button @click="toggleSidebar" 
            class="fixed top-4 left-4 z-50 lg:hidden bg-green-600 text-white p-2 rounded-lg shadow-lg">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <div class="lg:ml-64 transition-all duration-300">
      <div class="max-w-6xl mx-auto p-6">
        <h1 class="text-3xl font-bold text-green-700 mb-6">💳 Historial de Pagos</h1>
        
        <!-- Resumen de pagos -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pagos Completados</p>
                <p class="text-2xl font-bold text-gray-900">{{ pagosCompletados }}</p>
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
                <p class="text-sm font-medium text-gray-600">Total Pagado</p>
                <p class="text-2xl font-bold text-gray-900">${{ totalPagado.toLocaleString() }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div class="flex items-center">
              <div class="p-3 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pagos Pendientes</p>
                <p class="text-2xl font-bold text-gray-900">{{ pagosPendientes }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Lista de pagos -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-green-700">📜 Historial de Transacciones</h2>
          </div>
          
          <div class="p-6">
            <div v-if="pagos.length === 0" class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No hay pagos registrados</h3>
              <p class="mt-1 text-sm text-gray-500">Tus pagos aparecerán aquí cuando completes reservas.</p>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="pago in pagos" :key="pago.id" 
                   class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div class="flex justify-between items-center">
                  <div class="flex-1">
                    <div class="flex items-center mb-2">
                      <h3 class="text-lg font-semibold text-gray-900">Pago #{{ pago.id }}</h3>
                      <span class="ml-3 px-2 py-1 text-xs font-medium rounded-full"
                            :class="getEstadoPagoClass(pago.estado)">
                        {{ getEstadoPagoText(pago.estado) }}
                      </span>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p class="text-sm text-gray-500">Monto</p>
                        <p class="text-gray-900 font-semibold text-green-600">${{ pago.monto.toLocaleString() }} CLP</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Fecha</p>
                        <p class="text-gray-900">{{ formatDate(pago.fecha) }}</p>
                      </div>
                      <div>
                        <p class="text-sm text-gray-500">Método</p>
                        <p class="text-gray-900">{{ pago.metodo || 'Transferencia' }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <button @click="verComprobante(pago)" 
                          class="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    📄 Ver Comprobante
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
import Sidebar from '../../components/Sidebar.vue'

const sidebar = ref(null)
const pagos = ref([])

// Computed
const pagosCompletados = computed(() => {
  return pagos.value.filter(p => p.estado === 'completado').length
})

const pagosPendientes = computed(() => {
  return pagos.value.filter(p => p.estado === 'pendiente').length
})

const totalPagado = computed(() => {
  return pagos.value
    .filter(p => p.estado === 'completado')
    .reduce((sum, p) => sum + parseFloat(p.monto || 0), 0)
})

// Métodos
const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
  }
}

const loadPagos = async () => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (!usuario) return
    
    // Por ahora, datos de ejemplo
    pagos.value = []
    console.log('📄 Cargando pagos del cliente...')
  } catch (error) {
    console.error('❌ Error al cargar pagos:', error)
  }
}

const getEstadoPagoClass = (estado) => {
  const classes = {
    completado: 'bg-green-100 text-green-800',
    pendiente: 'bg-yellow-100 text-yellow-800',
    rechazado: 'bg-red-100 text-red-800'
  }
  return classes[estado] || 'bg-gray-100 text-gray-800'
}

const getEstadoPagoText = (estado) => {
  const texts = {
    completado: 'Completado',
    pendiente: 'Pendiente',
    rechazado: 'Rechazado'
  }
  return texts[estado] || estado
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-CL')
}

const verComprobante = (pago) => {
  console.log('📄 Ver comprobante:', pago)
  alert('Funcionalidad en desarrollo')
}

onMounted(() => {
  loadPagos()
})
</script>
