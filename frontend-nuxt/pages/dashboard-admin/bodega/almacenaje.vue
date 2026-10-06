<template>
  <div class="text-slate-900">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <NuxtLink to="/dashboard-admin/bodega" class="text-sm text-teal-700 hover:underline mb-1 inline-block">← Bodega</NuxtLink>
        <h1 class="text-3xl font-black text-teal-800 tracking-tight">Almacenaje</h1>
        <p class="text-slate-600 mt-1">Ítems con fotos por cliente (tenant).</p>
      </div>
      <button type="button" class="px-4 py-2.5 rounded-xl bg-teal-600 text-white font-semibold" @click="abrir()">+ Registrar ítem</button>
    </div>
    <p v-if="error" class="mb-3 text-sm text-red-600">{{ error }}</p>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <article v-for="item in items" :key="item.id" class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div class="aspect-video bg-slate-100 flex items-center justify-center overflow-hidden">
          <img
            v-if="primeraFoto(item)"
            :src="bodegaMediaUrl(primeraFoto(item))"
            :alt="item.nombre"
            class="w-full h-full object-cover"
          >
          <span v-else class="text-slate-400 text-sm">Sin foto</span>
        </div>
        <div class="p-4">
          <p class="font-bold text-slate-900">{{ item.nombre }}</p>
          <p class="text-xs text-slate-500">{{ item.cliente_nombre }} · {{ item.ubicacion || 'Sin ubicación' }}</p>
          <p class="text-xs text-slate-400 mt-1 capitalize">{{ item.estado }} · {{ item.fotos?.length || 0 }} fotos</p>
          <button type="button" class="mt-2 text-sm text-teal-700 font-semibold" @click="agregarFoto(item)">+ Foto</button>
        </div>
      </article>
    </div>
    <p v-if="!items.length" class="text-center text-slate-400 py-10">Sin ítems registrados.</p>

    <div v-if="modal" class="fixed inset-0 z-[80] bg-slate-900/50 flex items-center justify-center p-4" @click.self="modal=false">
      <form class="bg-white rounded-2xl p-6 w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto" @submit.prevent="guardar">
        <h2 class="text-lg font-black">Nuevo ítem</h2>
        <select v-model="form.cliente_id" required class="w-full px-3 py-2 border rounded-xl">
          <option disabled value="">Cliente *</option>
          <option v-for="u in clientes" :key="u.id" :value="u.id">{{ u.nombre }}</option>
        </select>
        <select v-model="form.contrato_id" class="w-full px-3 py-2 border rounded-xl">
          <option :value="null">Sin contrato</option>
          <option v-for="c in contratosFiltrados" :key="c.id" :value="c.id">#{{ c.id }} · {{ c.unidad_codigo || 'unidad' }} · {{ formatCLP(c.tarifa_mensual) }}</option>
        </select>
        <input v-model="form.nombre" required placeholder="Nombre del ítem *" class="w-full px-3 py-2 border rounded-xl">
        <textarea v-model="form.descripcion" rows="2" placeholder="Descripción" class="w-full px-3 py-2 border rounded-xl"></textarea>
        <div class="grid grid-cols-2 gap-3">
          <input v-model="form.categoria" placeholder="Categoría" class="px-3 py-2 border rounded-xl">
          <input v-model="form.ubicacion" placeholder="Ubicación física" class="px-3 py-2 border rounded-xl">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <input v-model.number="form.volumen_m3" type="number" step="0.01" placeholder="m³" class="px-3 py-2 border rounded-xl">
          <input v-model="form.codigo_etiqueta" placeholder="Código / etiqueta" class="px-3 py-2 border rounded-xl">
        </div>
        <label class="block text-sm">Fotos
          <input type="file" accept="image/*" multiple class="mt-1 block w-full text-sm" @change="onFiles">
        </label>
        <div class="flex justify-end gap-2">
          <button type="button" class="px-3 py-2 border rounded-xl" @click="modal=false">Cancelar</button>
          <button type="submit" class="px-3 py-2 bg-teal-600 text-white rounded-xl font-semibold">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { adminBodegaFetch, API_ENDPOINTS, formatCLP, bodegaMediaUrl } from '~/composables/useBodegaApi.js'
definePageMeta({ layout: 'admin' })

const items = ref([])
const clientes = ref([])
const contratos = ref([])
const error = ref('')
const modal = ref(false)
const form = ref({})
const pendingFotos = ref([])

const contratosFiltrados = computed(() =>
  contratos.value.filter(c => !form.value.cliente_id || Number(c.cliente_id) === Number(form.value.cliente_id))
)

function primeraFoto (item) {
  const f = item.fotos
  if (!Array.isArray(f) || !f.length) return null
  return f[0].url
}

async function cargar () {
  try {
    const [i, u, c] = await Promise.all([
      adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_ITEMS),
      adminBodegaFetch(`${API_ENDPOINTS.ADMIN_BODEGA_USUARIOS}?limit=200`),
      adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_CONTRATOS)
    ])
    items.value = i.items || []
    clientes.value = u.clientes || []
    contratos.value = c.contratos || []
  } catch (e) { error.value = e.message }
}

function abrir () {
  form.value = { cliente_id: '', contrato_id: null, nombre: '', descripcion: '', categoria: '', ubicacion: '', volumen_m3: null, codigo_etiqueta: '' }
  pendingFotos.value = []
  modal.value = true
}

function fileToDataUrl (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function onFiles (e) {
  const files = Array.from(e.target.files || [])
  pendingFotos.value = []
  for (const file of files.slice(0, 5)) {
    pendingFotos.value.push({ dataUrl: await fileToDataUrl(file) })
  }
}

async function guardar () {
  try {
    await adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_ITEMS, {
      method: 'POST',
      body: JSON.stringify({ ...form.value, fotos: pendingFotos.value })
    })
    modal.value = false
    await cargar()
  } catch (e) { error.value = e.message }
}

async function agregarFoto (item) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return
    try {
      const dataUrl = await fileToDataUrl(file)
      await adminBodegaFetch(`${API_ENDPOINTS.ADMIN_BODEGA_ITEMS}/${item.id}/fotos`, {
        method: 'POST',
        body: JSON.stringify({ dataUrl })
      })
      await cargar()
    } catch (e) { error.value = e.message }
  }
  input.click()
}

onMounted(cargar)
</script>
