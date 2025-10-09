<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Sidebar -->
    <Sidebar :userRole="'admin'" ref="sidebar" />
    
    <!-- Botón toggle para móvil -->
    <button @click="toggleSidebar" 
            class="fixed top-4 left-4 z-50 lg:hidden bg-blue-600 text-white p-2 rounded-lg shadow-lg">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Contenido principal -->
    <div class="lg:ml-64 transition-all duration-300">
      <div class="max-w-7xl mx-auto p-6 text-white">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">📋 Gestión de Reservas</h1>
          <div class="flex space-x-3">
            <button @click="loadReservas" 
                    class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Actualizar</span>
            </button>
          </div>
        </div>

        <!-- Estadísticas rápidas -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-gray-800 p-4 rounded-lg">
            <div class="flex items-center">
              <div class="p-2 bg-blue-600 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-400">Total Reservas</p>
                <p class="text-2xl font-bold">{{ reservasStats.total }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-800 p-4 rounded-lg">
            <div class="flex items-center">
              <div class="p-2 bg-yellow-600 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-400">Pendientes</p>
                <p class="text-2xl font-bold text-yellow-400">{{ reservasStats.pendientes }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-800 p-4 rounded-lg">
            <div class="flex items-center">
              <div class="p-2 bg-green-600 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-400">Completadas</p>
                <p class="text-2xl font-bold text-green-400">{{ reservasStats.completadas }}</p>
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
                <p class="text-sm text-gray-400">Ingresos Total</p>
                <p class="text-2xl font-bold text-purple-400">${{ reservasStats.ingresos.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Filtros -->
        <div class="bg-gray-800 p-4 rounded-lg mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Buscar</label>
              <input v-model="searchTerm" 
                     placeholder="Cliente, origen, destino..."
                     class="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Estado</label>
              <select v-model="filterEstado" 
                      class="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmado">Confirmado</option>
                <option value="en_proceso">En Proceso</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Fecha</label>
              <input v-model="filterFecha" 
                     type="date"
                     class="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div class="flex items-end">
              <button @click="loadReservas" 
                      class="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg">
                Filtrar
              </button>
            </div>
          </div>
        </div>

        <!-- Tabla de reservas -->
        <div class="bg-gray-800 rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-700">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ruta</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Precio</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estado</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fecha</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr v-for="reserva in filteredReservas" :key="reserva.id" class="hover:bg-gray-700">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    #{{ reserva.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-white">{{ reserva.usuario_nombre }}</div>
                    <div class="text-sm text-gray-400">{{ reserva.usuario_email }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-white">
                      <div class="flex items-center mb-1">
                        <span class="text-green-400">📍</span>
                        <span class="ml-2 truncate">{{ reserva.origen }}</span>
                      </div>
                      <div class="flex items-center">
                        <span class="text-red-400">📍</span>
                        <span class="ml-2 truncate">{{ reserva.destino }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    ${{ reserva.precio.toLocaleString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                          :class="getEstadoClass(reserva.estado)">
                      {{ getEstadoText(reserva.estado) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {{ formatDate(reserva.fecha) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button @click="viewReserva(reserva)" 
                              class="text-blue-400 hover:text-blue-300">
                        Ver
                      </button>
                      <button @click="editReserva(reserva)" 
                              class="text-green-400 hover:text-green-300">
                        Editar
                      </button>
                      <button @click="deleteReserva(reserva)" 
                              class="text-red-400 hover:text-red-300">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Paginación -->
        <div class="mt-6 flex justify-between items-center">
          <div class="text-sm text-gray-400">
            Mostrando {{ filteredReservas.length }} de {{ reservas.length }} reservas
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
const searchTerm = ref('')
const filterEstado = ref('')
const filterFecha = ref('')

// Estadísticas calculadas
const reservasStats = computed(() => {
  const total = reservas.value.length
  const pendientes = reservas.value.filter(r => r.estado === 'pendiente').length
  const completadas = reservas.value.filter(r => r.estado === 'completado').length
  const ingresos = reservas.value.reduce((sum, r) => sum + parseFloat(r.precio), 0)
  
  return {
    total,
    pendientes,
    completadas,
    ingresos
  }
})

// Reservas filtradas
const filteredReservas = computed(() => {
  let filtered = reservas.value

  if (searchTerm.value) {
    filtered = filtered.filter(reserva => 
      reserva.usuario_nombre?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      reserva.origen.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      reserva.destino.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (filterEstado.value) {
    filtered = filtered.filter(reserva => reserva.estado === filterEstado.value)
  }

  if (filterFecha.value) {
    filtered = filtered.filter(reserva => 
      new Date(reserva.fecha).toISOString().split('T')[0] === filterFecha.value
    )
  }

  return filtered
})

// Métodos
const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
  }
}

const loadReservas = async () => {
  try {
    const response = await fetch(apiUrl('/api/admin/reservas'))
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

const viewReserva = (reserva) => {
  // TODO: Implementar modal de detalles
  console.log('Ver reserva:', reserva)
}

const editReserva = (reserva) => {
  // TODO: Implementar modal de edición
  console.log('Editar reserva:', reserva)
}

const deleteReserva = (reserva) => {
  if (confirm(`¿Estás seguro de eliminar la reserva #${reserva.id}?`)) {
    // TODO: Implementar eliminación
    console.log('Eliminar reserva:', reserva)
  }
}

onMounted(() => {
  loadReservas()
})
</script>
