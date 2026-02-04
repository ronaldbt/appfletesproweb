<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- Sidebar persistente -->
    <Sidebar :userRole="'admin'" ref="sidebar" />

    <!-- Botón toggle para móvil -->
    <button @click="toggleSidebar"
            class="fixed top-4 left-4 z-50 lg:hidden bg-green-600 text-white p-2 rounded-lg shadow-lg">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Contenedor principal -->
    <div class="lg:ml-64 transition-all duration-300">
      <div class="max-w-7xl mx-auto p-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'

const sidebar = ref(null)

const toggleSidebar = () => {
  if (sidebar.value && typeof sidebar.value.toggleSidebar === 'function') {
    sidebar.value.toggleSidebar()
  }
}
</script>

<style scoped>
@media print {
  /* Ocultar sidebar completo en modo impresión */
  :deep(.fixed.left-0.top-0.h-full.w-64),
  :deep(.sidebar),
  :deep([class*="sidebar"]) {
    display: none !important;
    visibility: hidden !important;
  }

  /* Ocultar overlay y botón toggle móvil */
  :deep(button.fixed.top-4.left-4),
  :deep(.fixed.inset-0.bg-black) {
    display: none !important;
    visibility: hidden !important;
  }

  /* Hacer que el contenido use todo el ancho en impresión */
  .lg\:ml-64 {
    margin-left: 0 !important;
    padding-left: 0 !important;
  }

  .max-w-7xl.mx-auto.p-6 {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /* Asegurar que el contenido sea visible */
  :deep(.cotizacion-wrapper),
  :deep(#cotizacion-container) {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>

