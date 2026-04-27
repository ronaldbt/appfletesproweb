<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <!-- Sidebar persistente -->
    <Sidebar :userRole="'admin'" ref="sidebar" />

    <!-- Botón toggle (solo desktop cuando sidebar colapsa; móvil usa barra inferior) -->
    <button @click="toggleSidebar"
            class="fixed top-4 left-4 z-40 hidden lg:flex bg-teal-600 text-white p-2.5 rounded-xl shadow-lg shadow-teal-500/30 hover:bg-teal-700 transition-colors">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Contenedor principal: en móvil padding-bottom para la barra inferior -->
    <div class="lg:ml-64 transition-all duration-300 pb-20 lg:pb-0">
      <div class="max-w-7xl mx-auto p-4 lg:p-6">
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
  :deep(.fixed.left-0.top-0.h-full.w-64),
  :deep(.sidebar),
  :deep([class*="sidebar"]) {
    display: none !important;
    visibility: hidden !important;
  }
  :deep(button.fixed.top-4.left-4),
  :deep(.fixed.inset-0.bg-black),
  :deep(div.fixed.inset-0.z-40.backdrop-blur-sm),
  :deep(nav.fixed.bottom-0.left-0.right-0) {
    display: none !important;
    visibility: hidden !important;
  }
  .min-h-screen {
    min-height: 0 !important;
    height: auto !important;
    overflow: visible !important;
  }
  .lg\:ml-64 {
    margin-left: 0 !important;
    padding-left: 0 !important;
    padding-bottom: 0 !important;
    overflow: visible !important;
  }
  .max-w-7xl.mx-auto.p-6,
  .max-w-7xl.mx-auto.p-4 {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  :deep(.cotizacion-wrapper),
  :deep(#cotizacion-container) {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    position: relative !important;
    z-index: 1 !important;
  }
}
</style>
