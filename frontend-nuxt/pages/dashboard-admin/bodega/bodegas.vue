<template>
  <div class="text-slate-900">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <NuxtLink to="/dashboard-admin/bodega" class="text-sm text-teal-700 hover:underline mb-1 inline-block">← Bodega</NuxtLink>
        <h1 class="text-3xl font-black text-teal-800 tracking-tight">Bodegas</h1>
      </div>
      <button type="button" class="px-4 py-2.5 rounded-xl bg-teal-600 text-white font-semibold" @click="abrir()">+ Nueva bodega</button>
    </div>
    <p v-if="error" class="mb-3 text-sm text-red-600">{{ error }}</p>
    <div class="grid gap-3">
      <div v-for="b in bodegas" :key="b.id" class="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <p class="font-bold text-slate-900">{{ b.nombre }}</p>
          <p class="text-sm text-slate-500">{{ b.direccion || 'Sin dirección' }}</p>
          <p class="text-xs text-slate-400 mt-1">{{ b.capacidad_m3 ? `${b.capacidad_m3} m³` : 'Capacidad n/d' }} · {{ b.contratos_activos }} contratos</p>
        </div>
        <div class="flex gap-2">
          <button type="button" class="text-teal-700 font-semibold text-sm" @click="abrir(b)">Editar</button>
          <button type="button" class="text-red-600 font-semibold text-sm" @click="eliminar(b)">Eliminar</button>
        </div>
      </div>
      <p v-if="!loading && !bodegas.length" class="text-slate-400 text-center py-8">No hay bodegas aún.</p>
    </div>

    <div v-if="modal" class="fixed inset-0 z-[80] bg-slate-900/50 flex items-center justify-center p-4" @click.self="modal=false">
      <form class="bg-white rounded-2xl p-6 w-full max-w-md space-y-3" @submit.prevent="guardar">
        <h2 class="text-lg font-black">{{ form.id ? 'Editar' : 'Nueva' }} bodega</h2>
        <input v-model="form.nombre" required placeholder="Nombre *" class="w-full px-3 py-2 border rounded-xl">
        <input v-model="form.direccion" placeholder="Dirección" class="w-full px-3 py-2 border rounded-xl">
        <input v-model.number="form.capacidad_m3" type="number" step="0.01" placeholder="Capacidad m³" class="w-full px-3 py-2 border rounded-xl">
        <textarea v-model="form.notas" placeholder="Notas" rows="2" class="w-full px-3 py-2 border rounded-xl"></textarea>
        <label class="flex items-center gap-2 text-sm"><input v-model="form.activo" type="checkbox"> Activa</label>
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
import { adminBodegaFetch, API_ENDPOINTS } from '~/composables/useBodegaApi.js'
definePageMeta({ layout: 'admin' })

const bodegas = ref([])
const loading = ref(false)
const error = ref('')
const modal = ref(false)
const form = ref({})

async function cargar () {
  loading.value = true
  try {
    const data = await adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_BODEGAS)
    bodegas.value = data.bodegas || []
  } catch (e) { error.value = e.message }
  finally { loading.value = false }
}
function abrir (b = null) {
  form.value = b ? { ...b } : { nombre: '', direccion: '', capacidad_m3: null, notas: '', activo: true }
  modal.value = true
}
async function guardar () {
  try {
    if (form.value.id) {
      await adminBodegaFetch(`${API_ENDPOINTS.ADMIN_BODEGA_BODEGAS}/${form.value.id}`, { method: 'PUT', body: JSON.stringify(form.value) })
    } else {
      await adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_BODEGAS, { method: 'POST', body: JSON.stringify(form.value) })
    }
    modal.value = false
    await cargar()
  } catch (e) { error.value = e.message }
}
async function eliminar (b) {
  if (!confirm(`¿Eliminar bodega "${b.nombre}"?`)) return
  try {
    await adminBodegaFetch(`${API_ENDPOINTS.ADMIN_BODEGA_BODEGAS}/${b.id}`, { method: 'DELETE' })
    await cargar()
  } catch (e) { error.value = e.message }
}
onMounted(cargar)
</script>
