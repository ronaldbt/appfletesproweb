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
      <div class="max-w-4xl mx-auto p-6">
        <h1 class="text-2xl font-extrabold mb-4 text-green-700">📋 Mis Solicitudes de Flete</h1>
        
        <div v-if="fletes.length === 0" class="text-gray-500">
          Aún no has hecho ninguna solicitud de flete.
        </div>
        
        <ul v-else class="space-y-4">
          <li v-for="flete in fletes" :key="flete.id" class="bg-white border border-gray-200 p-4 rounded shadow-sm">
            <p><strong>🆔 ID:</strong> {{ flete.id }}</p>
            <p><strong>📍 Origen:</strong> {{ flete.origen }}</p>
            <p><strong>📦 Destino:</strong> {{ flete.destino }}</p>
            <p><strong>💰 Precio:</strong> ${{ flete.precio.toLocaleString() }} CLP</p>
            <p><strong>📅 Fecha:</strong> {{ flete.fecha }}</p>
            <p><strong>🚚 Ayudante:</strong> {{ flete.ayudante ? 'Sí' : 'No' }}</p>
          </li>
        </ul>
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

// Método para toggle del sidebar
const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
  }
}
  
onMounted(async () => {
  const clienteId = localStorage.getItem('cliente_id')
  if (!clienteId) return

  try {
    const res = await fetch(apiUrl(API_ENDPOINTS.FLETES_CLIENTE) + `/${clienteId}`)
    const data = await res.json()
    fletes.value = data.fletes || []
  } catch (err) {
    console.error('❌ Error al obtener fletes del cliente:', err)
  }
})
</script>
  