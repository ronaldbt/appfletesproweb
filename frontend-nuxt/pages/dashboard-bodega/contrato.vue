<template>
  <div class="text-slate-900">
    <h1 class="text-3xl font-black text-teal-800 tracking-tight mb-2">Mi contrato</h1>
    <p class="text-slate-600 mb-6">Detalle del servicio de almacenamiento.</p>
    <p v-if="error" class="mb-4 text-sm text-red-600">{{ error }}</p>

    <div class="space-y-4">
      <article v-for="c in contratos" :key="c.id" class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="font-bold text-lg">{{ c.bodega_nombre || 'Bodega' }}</p>
            <p class="text-sm text-slate-500">{{ c.bodega_direccion || '—' }}</p>
          </div>
          <span class="px-2.5 py-1 rounded-full text-xs font-bold capitalize bg-teal-50 text-teal-800">{{ c.estado }}</span>
        </div>
        <dl class="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          <div><dt class="text-slate-500">Unidad</dt><dd class="font-semibold">{{ c.unidad_codigo || '—' }}</dd></div>
          <div><dt class="text-slate-500">Tarifa mensual</dt><dd class="font-semibold">{{ formatCLP(c.tarifa_mensual) }}</dd></div>
          <div><dt class="text-slate-500">Inicio</dt><dd class="font-semibold">{{ c.fecha_inicio }}</dd></div>
          <div><dt class="text-slate-500">Fin</dt><dd class="font-semibold">{{ c.fecha_fin || 'Indefinido' }}</dd></div>
          <div><dt class="text-slate-500">Volumen</dt><dd class="font-semibold">{{ c.volumen_m3 ? `${c.volumen_m3} m³` : '—' }}</dd></div>
        </dl>
      </article>
      <p v-if="!contratos.length" class="text-center text-slate-400 py-10">No tienes contratos registrados aún.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { clienteBodegaFetch, API_ENDPOINTS, formatCLP } from '~/composables/useBodegaApi.js'
definePageMeta({ layout: 'bodega-cliente' })

const contratos = ref([])
const error = ref('')

onMounted(async () => {
  try {
    const data = await clienteBodegaFetch(API_ENDPOINTS.BODEGA_MI_CONTRATO)
    contratos.value = data.contratos || []
  } catch (e) {
    error.value = e.message
  }
})
</script>
