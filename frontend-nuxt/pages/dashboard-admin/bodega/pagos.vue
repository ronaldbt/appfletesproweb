<template>
  <div class="text-slate-900">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <NuxtLink to="/dashboard-admin/bodega" class="text-sm text-teal-700 hover:underline mb-1 inline-block">← Bodega</NuxtLink>
        <h1 class="text-3xl font-black text-teal-800 tracking-tight">Pagos bodega</h1>
      </div>
      <button type="button" class="px-4 py-2.5 rounded-xl bg-teal-600 text-white font-semibold" @click="abrir()">+ Nueva cuota</button>
    </div>
    <div class="mb-4">
      <select v-model="filtroEstado" class="px-3 py-2 border rounded-xl bg-white" @change="cargar">
        <option value="todos">Todos</option>
        <option value="pendiente">Pendientes</option>
        <option value="mora">Mora</option>
        <option value="pagado">Pagados</option>
      </select>
    </div>
    <p v-if="error" class="mb-3 text-sm text-red-600">{{ error }}</p>
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-slate-600">
          <tr>
            <th class="px-4 py-3">Cliente</th>
            <th class="px-4 py-3">Periodo</th>
            <th class="px-4 py-3">Monto</th>
            <th class="px-4 py-3">Vence</th>
            <th class="px-4 py-3">Estado</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in cuotas" :key="c.id" class="border-t border-slate-100">
            <td class="px-4 py-3 font-medium">{{ c.cliente_nombre }}</td>
            <td class="px-4 py-3">{{ c.periodo }}</td>
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
            <td class="px-4 py-3 text-right">
              <button v-if="c.estado !== 'pagado'" type="button" class="text-teal-700 font-semibold" @click="marcarPagada(c)">Marcar pagada</button>
            </td>
          </tr>
          <tr v-if="!cuotas.length"><td colspan="6" class="px-4 py-8 text-center text-slate-400">Sin cuotas</td></tr>
        </tbody>
      </table>
    </div>

    <div v-if="modal" class="fixed inset-0 z-[80] bg-slate-900/50 flex items-center justify-center p-4" @click.self="modal=false">
      <form class="bg-white rounded-2xl p-6 w-full max-w-md space-y-3" @submit.prevent="guardar">
        <h2 class="text-lg font-black">Nueva cuota</h2>
        <select v-model="form.contrato_id" required class="w-full px-3 py-2 border rounded-xl" @change="onContrato">
          <option disabled value="">Contrato *</option>
          <option v-for="ct in contratos" :key="ct.id" :value="ct.id">
            #{{ ct.id }} · {{ ct.cliente_nombre }} · {{ formatCLP(ct.tarifa_mensual) }}
          </option>
        </select>
        <input v-model="form.periodo" required placeholder="Periodo YYYY-MM" pattern="\d{4}-\d{2}" class="w-full px-3 py-2 border rounded-xl">
        <input v-model.number="form.monto" type="number" required placeholder="Monto CLP" class="w-full px-3 py-2 border rounded-xl">
        <input v-model="form.fecha_vencimiento" type="date" required class="w-full px-3 py-2 border rounded-xl">
        <div class="flex justify-end gap-2">
          <button type="button" class="px-3 py-2 border rounded-xl" @click="modal=false">Cancelar</button>
          <button type="submit" class="px-3 py-2 bg-teal-600 text-white rounded-xl font-semibold">Crear</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { adminBodegaFetch, API_ENDPOINTS, formatCLP } from '~/composables/useBodegaApi.js'
definePageMeta({ layout: 'admin' })

const cuotas = ref([])
const contratos = ref([])
const filtroEstado = ref('todos')
const error = ref('')
const modal = ref(false)
const form = ref({})

async function cargar () {
  try {
    const q = filtroEstado.value !== 'todos' ? `?estado=${filtroEstado.value}` : ''
    const [c, ct] = await Promise.all([
      adminBodegaFetch(`${API_ENDPOINTS.ADMIN_BODEGA_CUOTAS}${q}`),
      adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_CONTRATOS)
    ])
    cuotas.value = c.cuotas || []
    contratos.value = ct.contratos || []
  } catch (e) { error.value = e.message }
}

function abrir () {
  const now = new Date()
  const periodo = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  form.value = { contrato_id: '', cliente_id: null, periodo, monto: 0, fecha_vencimiento: '' }
  modal.value = true
}

function onContrato () {
  const ct = contratos.value.find(x => Number(x.id) === Number(form.value.contrato_id))
  if (ct) {
    form.value.cliente_id = ct.cliente_id
    form.value.monto = ct.tarifa_mensual
  }
}

async function guardar () {
  try {
    await adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_CUOTAS, {
      method: 'POST',
      body: JSON.stringify(form.value)
    })
    modal.value = false
    await cargar()
  } catch (e) { error.value = e.message }
}

async function marcarPagada (c) {
  try {
    await adminBodegaFetch(`${API_ENDPOINTS.ADMIN_BODEGA_CUOTAS}/${c.id}/marcar-pagada`, { method: 'POST', body: '{}' })
    await cargar()
  } catch (e) { error.value = e.message }
}

onMounted(cargar)
</script>
