<template>
  <div class="text-gray-900">
    <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl font-extrabold mb-6 text-green-700">📊 Panel de Estadísticas</h1>
        
        <!-- KPIs Principales -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Fletes Este Mes -->
          <div class="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100 text-sm">Fletes Este Mes</p>
                <p class="text-3xl font-bold text-white">{{ stats.fletesMes || 0 }}</p>
                <p class="text-green-200 text-xs mt-1" :class="stats.crecimientoFletes >= 0 ? 'text-white' : 'text-red-100'">
                  {{ stats.crecimientoFletes >= 0 ? '↗' : '↘' }} {{ Math.abs(stats.crecimientoFletes) }}% vs mes anterior
                </p>
              </div>
              <div class="bg-emerald-500 p-3 rounded-full">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Ingresos Este Mes -->
          <div class="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100 text-sm">Ingresos Este Mes</p>
                <p class="text-3xl font-bold text-white">${{ (stats.ingresosMes || 0).toLocaleString() }}</p>
                <p class="text-green-200 text-xs mt-1" :class="stats.crecimientoIngresos >= 0 ? 'text-green-300' : 'text-red-300'">
                  {{ stats.crecimientoIngresos >= 0 ? '↗' : '↘' }} {{ Math.abs(stats.crecimientoIngresos) }}% vs mes anterior
                </p>
              </div>
              <div class="bg-green-500 p-3 rounded-full">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Conductores Activos -->
          <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-700 text-sm font-semibold">Conductores Activos</p>
                <p class="text-3xl font-extrabold text-gray-900">{{ stats.conductoresActivos || 0 }}</p>
                <p class="text-gray-500 text-xs mt-1">
                  {{ stats.conductoresInactivos || 0 }} inactivos
                </p>
              </div>
              <div class="bg-green-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Ganancia Neta -->
          <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-700 text-sm font-semibold">Ganancia Neta</p>
                <p class="text-3xl font-extrabold text-gray-900">${{ (stats.gananciaNeta || 0).toLocaleString() }}</p>
                <p class="text-gray-500 text-xs mt-1">
                  Comisión 10%
                </p>
              </div>
              <div class="bg-green-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Estadísticas Detalladas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <!-- Total Fletes -->
          <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-700 text-sm font-semibold">Total Fletes</p>
                <p class="text-3xl font-extrabold text-gray-900">{{ stats.totalFletes || 0 }}</p>
                <p class="text-gray-500 text-xs mt-1">{{ stats.fletesCompletados || 0 }} completados</p>
              </div>
              <div class="bg-green-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Fletes Pendientes -->
          <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-700 text-sm font-semibold">Fletes Pendientes</p>
                <p class="text-3xl font-extrabold text-gray-900">{{ stats.fletesPendientes || 0 }}</p>
                <p class="text-gray-500 text-xs mt-1">{{ stats.fletesCancelados || 0 }} cancelados</p>
              </div>
              <div class="bg-green-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Tiempo Promedio Asignación -->
          <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-700 text-sm font-semibold">Tiempo Promedio</p>
                <p class="text-3xl font-extrabold text-gray-900">{{ Math.round(stats.tiempoPromedioAsignacion || 0) }}h</p>
                <p class="text-gray-500 text-xs mt-1">Asignación de fletes</p>
              </div>
              <div class="bg-green-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Rutas Populares y Actividad -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Rutas Populares -->
          <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
              <span class="mr-2">🗺️</span>
              Rutas Populares
            </h2>
            
            <div v-if="!stats.rutasPopulares || stats.rutasPopulares.length === 0" class="text-gray-500">
              No hay datos de rutas disponibles.
            </div>
            
            <ul v-else class="space-y-3">
              <li v-for="(ruta, index) in stats.rutasPopulares" :key="index" class="flex justify-between items-center py-2 border-b border-gray-200">
                <div>
                  <span class="text-sm font-medium">{{ ruta.origen }}</span>
                  <span class="text-gray-400 mx-2">→</span>
                  <span class="text-sm font-medium">{{ ruta.destino }}</span>
                </div>
                <span class="text-xs bg-green-600 text-white px-2 py-1 rounded-full">{{ ruta.frecuencia }} viajes</span>
              </li>
            </ul>
          </div>

          <!-- Actividad Reciente -->
          <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
              <span class="mr-2">🕒</span>
              Actividad Reciente
            </h2>
            
            <div v-if="!stats.actividadReciente || stats.actividadReciente.length === 0" class="text-gray-500">
              No hay actividad reciente.
            </div>
            
            <ul v-else class="space-y-2">
              <li v-for="(activity, index) in stats.actividadReciente" :key="index" class="flex justify-between items-center py-2 border-b border-gray-200">
                <span class="text-sm">{{ activity.descripcion }}</span>
                <span class="text-xs text-gray-400">{{ activity.timestamp }}</span>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

import { ref, onMounted } from 'vue'
import { API_BASE_URL } from '../../config/api.js'

// Estadísticas
const stats = ref({})

const loadStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/stats`)
    const data = await response.json()
    stats.value = data
    console.log('📊 Estadísticas cargadas:', data)
  } catch (error) {
    console.error('❌ Error al cargar estadísticas:', error)
    // Datos de ejemplo para desarrollo
    stats.value = {
      totalFletes: 0,
      fletesMes: 0,
      fletesCompletados: 0,
      fletesPendientes: 0,
      fletesCancelados: 0,
      conductoresActivos: 0,
      conductoresInactivos: 0,
      totalClientes: 0,
      nuevosClientesMes: 0,
      tiempoPromedioAsignacion: 0,
      distanciaTotal: 0,
      ingresosTotales: 0,
      ingresosMes: 0,
      gananciaNeta: 0,
      costoPromedioFlete: 0,
      crecimientoFletes: 0,
      crecimientoIngresos: 0,
      rutasPopulares: [],
      actividadReciente: []
    }
  }
}


onMounted(() => {
  loadStats()
})
</script>