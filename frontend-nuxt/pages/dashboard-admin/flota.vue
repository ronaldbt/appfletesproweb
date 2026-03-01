<template>
  <div class="mx-auto max-w-6xl">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h1 class="text-2xl font-black tracking-tight text-slate-900">Flota (camiones propios)</h1>
      <button @click="abrirModal(null)" class="inline-flex items-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/30 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8v8H4V4h8m8 0H4v8m8-4V4" /></svg>
        Nuevo camión
      </button>
    </div>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-slate-700">
              <th class="px-4 py-3 text-left font-bold">Patente</th>
              <th class="px-4 py-3 text-left font-bold">Nombre / alias</th>
              <th class="px-4 py-3 text-left font-bold">Tipo</th>
              <th class="px-4 py-3 text-left font-bold">Estado</th>
              <th class="px-4 py-3 text-left font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="v in vehiculos" :key="v.id" class="border-t border-slate-200 hover:bg-slate-50/80">
              <td class="px-4 py-3 font-mono font-bold text-slate-900">{{ v.patente }}</td>
              <td class="px-4 py-3 text-slate-800">{{ v.nombre || '—' }}</td>
              <td class="px-4 py-3 text-slate-700">{{ v.tipo || '—' }}</td>
              <td class="px-4 py-3">
                <span :class="v.activo ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-600'" class="px-2 py-1 text-xs font-bold rounded-full">{{ v.activo ? 'Activo' : 'Inactivo' }}</span>
              </td>
              <td class="px-4 py-3 flex flex-wrap gap-2">
                <button @click="abrirModal(v)" class="text-teal-600 hover:underline font-bold text-xs">Editar</button>
                <button @click="eliminar(v)" class="text-red-600 hover:underline font-bold text-xs">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="vehiculos.length === 0" class="p-6 text-center text-slate-500 text-sm">No hay camiones. Agrega uno para tu flota propia.</p>
      </div>
    </section>

    <!-- Modal crear/editar -->
    <div v-if="modalAbierto" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50" @click.self="cerrarModal">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg font-black text-slate-900 mb-4">{{ editando ? 'Editar camión' : 'Nuevo camión' }}</h3>
        <form @submit.prevent="guardar" class="space-y-4">
          <label class="block">
            <span class="text-xs font-bold text-slate-500 uppercase">Patente</span>
            <input v-model="form.patente" type="text" required placeholder="Ej: ABCD12" class="mt-1 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none uppercase" />
          </label>
          <label class="block">
            <span class="text-xs font-bold text-slate-500 uppercase">Nombre o alias</span>
            <input v-model="form.nombre" type="text" placeholder="Ej: Camión 1" class="mt-1 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
          </label>
          <label class="block">
            <span class="text-xs font-bold text-slate-500 uppercase">Tipo</span>
            <input v-model="form.tipo" type="text" placeholder="Ej: Camión 3/4, Tolva" class="mt-1 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
          </label>
          <label v-if="editando" class="flex items-center gap-2">
            <input v-model="form.activo" type="checkbox" class="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
            <span class="text-sm font-medium text-slate-700">Activo</span>
          </label>
          <div class="flex gap-2 pt-2">
            <button type="submit" class="rounded-xl bg-teal-600 hover:bg-teal-700 px-4 py-2.5 text-sm font-bold text-white">Guardar</button>
            <button type="button" @click="cerrarModal" class="rounded-xl border-2 border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
import { ref, onMounted } from 'vue'
import { apiUrl } from '../../config/api.js'

const vehiculos = ref([])
const modalAbierto = ref(false)
const editando = ref(null)
const form = ref({
  patente: '',
  nombre: '',
  tipo: '',
  activo: true
})

async function cargar() {
  try {
    const res = await fetch(apiUrl('/api/admin/vehiculos'))
    const data = await res.json()
    vehiculos.value = Array.isArray(data) ? data : []
  } catch (e) {
    console.error(e)
    vehiculos.value = []
  }
}

function abrirModal(v) {
  editando.value = v
  form.value = v
    ? { patente: v.patente, nombre: v.nombre || '', tipo: v.tipo || '', activo: v.activo !== false }
    : { patente: '', nombre: '', tipo: '', activo: true }
  modalAbierto.value = true
}

function cerrarModal() {
  modalAbierto.value = false
  editando.value = null
}

async function guardar() {
  try {
    const url = editando.value ? apiUrl(`/api/admin/vehiculos/${editando.value.id}`) : apiUrl('/api/admin/vehiculos')
    const method = editando.value ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || res.statusText)
    }
    cerrarModal()
    await cargar()
  } catch (e) {
    alert(e.message || 'Error al guardar')
  }
}

async function eliminar(v) {
  if (!confirm(`¿Eliminar camión ${v.patente}?`)) return
  try {
    const res = await fetch(apiUrl(`/api/admin/vehiculos/${v.id}`), { method: 'DELETE' })
    if (!res.ok) throw new Error(await res.text())
    await cargar()
  } catch (e) {
    alert('Error al eliminar')
  }
}

onMounted(() => cargar())
</script>
