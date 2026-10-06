<template>
  <div class="text-slate-900">
    <h1 class="text-3xl font-black text-teal-800 tracking-tight mb-1">Hola, {{ data?.cliente?.nombre || '…' }}</h1>
    <p class="text-slate-600 mb-6">Tu espacio de almacenamiento en FletesPro</p>

    <p v-if="error" class="mb-4 text-sm text-red-600">{{ error }}</p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <p class="text-xs font-semibold text-slate-500 uppercase">Cosas guardadas</p>
        <p class="text-3xl font-black text-teal-800 mt-1">{{ data?.stats?.itemsAlmacenados ?? '—' }}</p>
      </div>
      <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <p class="text-xs font-semibold text-slate-500 uppercase">Cuotas pendientes</p>
        <p class="text-3xl font-black mt-1" :class="(data?.stats?.cuotasPendientes || 0) > 0 ? 'text-amber-700' : 'text-teal-800'">
          {{ data?.stats?.cuotasPendientes ?? '—' }}
        </p>
      </div>
      <div class="bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-2xl p-5 shadow-lg shadow-teal-500/20">
        <p class="text-xs font-semibold text-teal-100 uppercase">Próximo pago</p>
        <template v-if="data?.proximaCuota">
          <p class="text-2xl font-black mt-1">{{ formatCLP(data.proximaCuota.monto) }}</p>
          <p class="text-sm text-teal-100 mt-1">Vence {{ data.proximaCuota.fecha_vencimiento }} · {{ data.proximaCuota.periodo }}</p>
        </template>
        <p v-else class="text-lg font-bold mt-2 text-teal-50">Sin cuotas pendientes</p>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-4">
      <NuxtLink to="/dashboard-bodega/items" class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-300 transition-colors">
        <h2 class="font-bold mb-1">Mis cosas</h2>
        <p class="text-sm text-slate-500">Ver inventario y fotos de lo que tienes guardado.</p>
      </NuxtLink>
      <NuxtLink to="/dashboard-bodega/pagos" class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-300 transition-colors">
        <h2 class="font-bold mb-1">Mis pagos</h2>
        <p class="text-sm text-slate-500">Historial de cuotas y fechas de vencimiento.</p>
      </NuxtLink>
      <NuxtLink to="/dashboard-bodega/contrato" class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-300 transition-colors">
        <h2 class="font-bold mb-1">Mi contrato</h2>
        <p class="text-sm text-slate-500">Tarifa, unidad y vigencia del servicio.</p>
      </NuxtLink>
      <NuxtLink to="/dashboard-bodega/perfil" class="bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-300 transition-colors">
        <h2 class="font-bold mb-1">Mi perfil</h2>
        <p class="text-sm text-slate-500">Datos de contacto de tu cuenta.</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { clienteBodegaFetch, API_ENDPOINTS, formatCLP } from '~/composables/useBodegaApi.js'
definePageMeta({ layout: 'bodega-cliente' })

const data = ref(null)
const error = ref('')

onMounted(async () => {
  try {
    data.value = await clienteBodegaFetch(API_ENDPOINTS.BODEGA_MI_RESUMEN)
  } catch (e) {
    error.value = e.message
  }
})
</script>
