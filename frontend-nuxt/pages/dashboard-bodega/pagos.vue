<template>
  <div class="text-slate-900">
    <h1 class="text-3xl font-black text-teal-800 tracking-tight mb-2">Mis pagos</h1>
    <p class="text-slate-600 mb-6">Cuotas de tu contrato de almacenamiento.</p>
    <p v-if="error" class="mb-4 text-sm text-red-600">{{ error }}</p>

    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-slate-600">
          <tr>
            <th class="px-4 py-3">Periodo</th>
            <th class="px-4 py-3">Monto</th>
            <th class="px-4 py-3">Vencimiento</th>
            <th class="px-4 py-3">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in cuotas" :key="c.id" class="border-t border-slate-100">
            <td class="px-4 py-3 font-medium">{{ c.periodo }}</td>
            <td class="px-4 py-3">{{ formatCLP(c.monto) }}</td>
            <td class="px-4 py-3">{{ c.fecha_vencimiento }}</td>
            <td class="px-4 py-3">
              <span class="px-2 py-0.5 rounded-full text-xs font-bold capitalize"
                :class="{
                  'bg-amber-50 text-amber-800': c.estado === 'pendiente',
                  'bg-red-50 text-red-700': c.estado === 'mora',
                  'bg-teal-50 text-teal-800': c.estado === 'pagado'
                }">{{ c.estado }}</span>
            </td>
          </tr>
          <tr v-if="!cuotas.length">
            <td colspan="4" class="px-4 py-10 text-center text-slate-400">Sin cuotas registradas</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { clienteBodegaFetch, API_ENDPOINTS, formatCLP } from '~/composables/useBodegaApi.js'
definePageMeta({ layout: 'bodega-cliente' })

const cuotas = ref([])
const error = ref('')

onMounted(async () => {
  try {
    const data = await clienteBodegaFetch(API_ENDPOINTS.BODEGA_MI_PAGOS)
    cuotas.value = data.cuotas || []
  } catch (e) {
    error.value = e.message
  }
})
</script>
