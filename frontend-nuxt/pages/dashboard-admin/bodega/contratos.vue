<template>
  <div class="text-slate-900">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <NuxtLink to="/dashboard-admin/bodega" class="text-sm text-teal-700 hover:underline mb-1 inline-block">← Bodega</NuxtLink>
        <h1 class="text-3xl font-black text-teal-800 tracking-tight">Contratos</h1>
      </div>
      <button type="button" class="px-4 py-2.5 rounded-xl bg-teal-600 text-white font-semibold" @click="abrir()">+ Nuevo contrato</button>
    </div>
    <p v-if="error" class="mb-3 text-sm text-red-600">{{ error }}</p>
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <table class="w-full text-sm">
        <thead class="bg-slate-50 text-left text-slate-600">
          <tr>
            <th class="px-4 py-3">Cliente</th>
            <th class="px-4 py-3">Bodega / unidad</th>
            <th class="px-4 py-3">Tarifa</th>
            <th class="px-4 py-3">Inicio</th>
            <th class="px-4 py-3">Estado</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in contratos" :key="c.id" class="border-t border-slate-100">
            <td class="px-4 py-3">
              <p class="font-semibold">{{ c.cliente_nombre }}</p>
              <p class="text-xs text-slate-400">{{ c.cliente_email }}</p>
            </td>
            <td class="px-4 py-3">{{ c.bodega_nombre || '—' }} / {{ c.unidad_codigo || '—' }}</td>
            <td class="px-4 py-3 font-medium">{{ formatCLP(c.tarifa_mensual) }}</td>
            <td class="px-4 py-3">{{ c.fecha_inicio }}</td>
            <td class="px-4 py-3 capitalize">{{ c.estado }}</td>
            <td class="px-4 py-3 text-right">
              <button type="button" class="text-teal-700 font-semibold" @click="abrir(c)">Editar</button>
            </td>
          </tr>
          <tr v-if="!contratos.length"><td colspan="6" class="px-4 py-8 text-center text-slate-400">Sin contratos</td></tr>
        </tbody>
      </table>
    </div>

    <div v-if="modal" class="fixed inset-0 z-[80] bg-slate-900/50 flex items-center justify-center p-4" @click.self="modal=false">
      <form class="bg-white rounded-2xl p-6 w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto" @submit.prevent="guardar">
        <h2 class="text-lg font-black">{{ form.id ? 'Editar' : 'Nuevo' }} contrato</h2>
        <label class="block text-sm">Cliente *
          <select v-model="form.cliente_id" required class="mt-1 w-full px-3 py-2 border rounded-xl" :disabled="!!form.id">
            <option disabled value="">Seleccionar…</option>
            <option v-for="u in clientes" :key="u.id" :value="u.id">{{ u.nombre }} ({{ u.email || u.telefono }})</option>
          </select>
        </label>
        <label class="block text-sm">Bodega
          <select v-model="form.bodega_id" class="mt-1 w-full px-3 py-2 border rounded-xl">
            <option :value="null">—</option>
            <option v-for="b in bodegas" :key="b.id" :value="b.id">{{ b.nombre }}</option>
          </select>
        </label>
        <div class="grid grid-cols-2 gap-3">
          <input v-model="form.unidad_codigo" placeholder="Unidad (ej. A-12)" class="px-3 py-2 border rounded-xl">
          <input v-model.number="form.tarifa_mensual" type="number" placeholder="Tarifa mensual CLP" class="px-3 py-2 border rounded-xl">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <label class="text-sm">Inicio<input v-model="form.fecha_inicio" type="date" required class="mt-1 w-full px-3 py-2 border rounded-xl"></label>
          <label class="text-sm">Fin<input v-model="form.fecha_fin" type="date" class="mt-1 w-full px-3 py-2 border rounded-xl"></label>
        </div>
        <input v-model.number="form.volumen_m3" type="number" step="0.01" placeholder="Volumen m³" class="w-full px-3 py-2 border rounded-xl">
        <select v-model="form.estado" class="w-full px-3 py-2 border rounded-xl">
          <option value="activo">Activo</option>
          <option value="pausado">Pausado</option>
          <option value="terminado">Terminado</option>
        </select>
        <textarea v-model="form.notas" rows="2" placeholder="Notas" class="w-full px-3 py-2 border rounded-xl"></textarea>
        <div class="flex justify-end gap-2">
          <button type="button" class="px-3 py-2 border rounded-xl" @click="modal=false">Cancelar</button>
          <button type="submit" class="px-3 py-2 bg-teal-600 text-white rounded-xl font-semibold">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { adminBodegaFetch, API_ENDPOINTS, formatCLP } from '~/composables/useBodegaApi.js'
definePageMeta({ layout: 'admin' })

const contratos = ref([])
const clientes = ref([])
const bodegas = ref([])
const error = ref('')
const modal = ref(false)
const form = ref({})

async function cargar () {
  try {
    const [c, u, b] = await Promise.all([
      adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_CONTRATOS),
      adminBodegaFetch(`${API_ENDPOINTS.ADMIN_BODEGA_USUARIOS}?limit=200`),
      adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_BODEGAS)
    ])
    contratos.value = c.contratos || []
    clientes.value = u.clientes || []
    bodegas.value = b.bodegas || []
  } catch (e) { error.value = e.message }
}
function abrir (c = null) {
  form.value = c
    ? { ...c, bodega_id: c.bodega_id || null }
    : { cliente_id: '', bodega_id: null, unidad_codigo: '', tarifa_mensual: 0, volumen_m3: null, fecha_inicio: new Date().toISOString().slice(0, 10), fecha_fin: '', estado: 'activo', notas: '' }
  modal.value = true
}
async function guardar () {
  try {
    const body = { ...form.value }
    if (!body.fecha_fin) body.fecha_fin = null
    if (form.value.id) {
      await adminBodegaFetch(`${API_ENDPOINTS.ADMIN_BODEGA_CONTRATOS}/${form.value.id}`, { method: 'PUT', body: JSON.stringify(body) })
    } else {
      await adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_CONTRATOS, { method: 'POST', body: JSON.stringify(body) })
    }
    modal.value = false
    await cargar()
  } catch (e) { error.value = e.message }
}
onMounted(cargar)
</script>
