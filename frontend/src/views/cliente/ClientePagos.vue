<template>
  <div class="min-h-screen bg-gray-900">
    <Sidebar :userRole="'cliente'" ref="sidebar" />
    
    <button @click="toggleSidebar" 
            class="fixed top-4 left-4 z-50 lg:hidden bg-blue-600 text-white p-2 rounded-lg shadow-lg">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <div class="lg:ml-64 transition-all duration-300">
      <div class="max-w-6xl mx-auto p-6 text-white">
        <h1 class="text-3xl font-bold mb-6">💳 Historial de Pagos</h1>
        
        <div class="bg-gray-800 p-6 rounded-lg">
          <p class="text-gray-400">Vista de historial de pagos - En desarrollo</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../../components/Sidebar.vue'

const sidebar = ref(null)

const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
  }
}
</script>
