<template>
  <div class="text-slate-900">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <NuxtLink to="/dashboard-admin/bodega" class="text-sm text-teal-700 hover:underline mb-1 inline-block">← Bodega</NuxtLink>
        <h1 class="text-3xl font-black text-teal-800 tracking-tight">Usuarios de bodega</h1>
        <p class="text-slate-600 mt-1">Crea clientes con usuario/contraseña. Ellos entran a su portal y solo ven sus datos.</p>
      </div>
      <button
        type="button"
        class="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-lg shadow-teal-500/20"
        @click="abrirFormulario()"
      >
        + Nuevo cliente
      </button>
    </div>

    <div class="bg-white border border-slate-200 rounded-2xl p-4 mb-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
      <input
        v-model="filtros.busqueda"
        type="search"
        placeholder="Buscar nombre, email, teléfono, RUT…"
        class="px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-teal-500"
        @keyup.enter="cargar"
      >
      <select v-model="filtros.activo" class="px-3 py-2 border border-slate-200 rounded-xl bg-slate-50" @change="cargar">
        <option value="todos">Todos</option>
        <option value="activos">Activos</option>
        <option value="inactivos">Inactivos</option>
      </select>
      <button type="button" class="px-3 py-2 rounded-xl bg-slate-900 text-white font-medium" @click="cargar">Buscar</button>
    </div>

    <p v-if="error" class="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{{ error }}</p>
    <p v-if="okMsg" class="mb-4 text-sm text-teal-800 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3">{{ okMsg }}</p>

    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 text-slate-600 text-left">
            <tr>
              <th class="px-4 py-3 font-semibold">Cliente</th>
              <th class="px-4 py-3 font-semibold">Contacto</th>
              <th class="px-4 py-3 font-semibold">Ítems</th>
              <th class="px-4 py-3 font-semibold">Cuotas</th>
              <th class="px-4 py-3 font-semibold">Estado</th>
              <th class="px-4 py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="6" class="px-4 py-8 text-center text-slate-400">Cargando…</td>
            </tr>
            <tr v-else-if="!clientes.length">
              <td colspan="6" class="px-4 py-8 text-center text-slate-400">Sin clientes. Crea el primero para darle acceso al portal.</td>
            </tr>
            <tr v-for="c in clientes" :key="c.id" class="border-t border-slate-100 hover:bg-slate-50/80">
              <td class="px-4 py-3">
                <p class="font-semibold text-slate-900">{{ c.nombre }}</p>
                <p class="text-xs text-slate-400">ID {{ c.id }} · usuario {{ c.usuario_id }}</p>
                <p v-if="c.rut" class="text-xs text-slate-500">RUT {{ c.rut }}</p>
              </td>
              <td class="px-4 py-3">
                <p>{{ c.email || '—' }}</p>
                <p class="text-slate-500">{{ c.telefono || '—' }}</p>
              </td>
              <td class="px-4 py-3 font-medium">{{ c.items_count }}</td>
              <td class="px-4 py-3">
                <span :class="c.cuotas_pendientes ? 'text-amber-700 font-semibold' : 'text-slate-500'">
                  {{ c.cuotas_pendientes }} pend.
                </span>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-flex px-2 py-0.5 rounded-full text-xs font-bold"
                  :class="c.activo ? 'bg-teal-50 text-teal-800' : 'bg-slate-100 text-slate-500'"
                >
                  {{ c.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                <button type="button" class="text-teal-700 font-semibold hover:underline" @click="abrirFormulario(c)">Editar</button>
                <button
                  type="button"
                  class="text-slate-600 font-semibold hover:underline"
                  @click="toggleActivo(c)"
                >
                  {{ c.activo ? 'Desactivar' : 'Activar' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal crear/editar -->
    <div v-if="modalAbierto" class="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" @click.self="cerrarModal">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <h2 class="text-xl font-black text-slate-900 mb-4">{{ editando ? 'Editar cliente' : 'Nuevo cliente de bodega' }}</h2>
        <p v-if="error" class="mb-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{{ error }}</p>
        <form class="space-y-3" @submit.prevent="guardar">
          <label class="block text-sm">
            <span class="font-medium text-slate-600">Nombre *</span>
            <input v-model="form.nombre" required class="mt-1 w-full px-3 py-2 border border-slate-200 rounded-xl">
          </label>
          <label class="block text-sm">
            <span class="font-medium text-slate-600">Email</span>
            <input v-model="form.email" type="email" class="mt-1 w-full px-3 py-2 border border-slate-200 rounded-xl">
          </label>
          <label class="block text-sm">
            <span class="font-medium text-slate-600">Teléfono</span>
            <input v-model="form.telefono" class="mt-1 w-full px-3 py-2 border border-slate-200 rounded-xl">
          </label>
          <label class="block text-sm">
            <span class="font-medium text-slate-600">{{ editando ? 'Nueva contraseña (opcional)' : 'Contraseña *' }}</span>
            <input v-model="form.password" type="password" :required="!editando" minlength="6" class="mt-1 w-full px-3 py-2 border border-slate-200 rounded-xl" :placeholder="editando ? 'Dejar vacío para no cambiar' : 'Mínimo 6 caracteres'">
          </label>
          <div class="grid grid-cols-2 gap-3">
            <label class="block text-sm">
              <span class="font-medium text-slate-600">RUT</span>
              <input v-model="form.rut" class="mt-1 w-full px-3 py-2 border border-slate-200 rounded-xl">
            </label>
            <label v-if="editando" class="block text-sm">
              <span class="font-medium text-slate-600">Estado</span>
              <select v-model="form.activo" class="mt-1 w-full px-3 py-2 border border-slate-200 rounded-xl">
                <option :value="true">Activo</option>
                <option :value="false">Inactivo</option>
              </select>
            </label>
          </div>
          <label class="block text-sm">
            <span class="font-medium text-slate-600">Dirección</span>
            <input v-model="form.direccion" class="mt-1 w-full px-3 py-2 border border-slate-200 rounded-xl">
          </label>
          <label class="block text-sm">
            <span class="font-medium text-slate-600">Notas internas</span>
            <textarea v-model="form.notas" rows="2" class="mt-1 w-full px-3 py-2 border border-slate-200 rounded-xl"></textarea>
          </label>
          <p class="text-xs text-slate-500">
            El cliente inicia sesión en /login con este email y contraseña, y entra a <strong>/dashboard-bodega</strong>.
          </p>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" class="px-4 py-2 rounded-xl border border-slate-200" @click="cerrarModal">Cancelar</button>
            <button type="submit" class="px-4 py-2 rounded-xl bg-teal-600 text-white font-semibold" :disabled="saving">
              {{ saving ? 'Guardando…' : 'Guardar' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { adminBodegaFetch, API_ENDPOINTS } from '~/composables/useBodegaApi.js'

definePageMeta({ layout: 'admin' })

const clientes = ref([])
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const okMsg = ref('')
const modalAbierto = ref(false)
const editando = ref(null)
const filtros = ref({ busqueda: '', activo: 'todos' })
const form = ref(formVacio())

function formVacio () {
  return {
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    rut: '',
    direccion: '',
    notas: '',
    activo: true
  }
}

async function cargar () {
  loading.value = true
  error.value = ''
  try {
    const q = new URLSearchParams({
      busqueda: filtros.value.busqueda || '',
      activo: filtros.value.activo,
      limit: '50'
    })
    const data = await adminBodegaFetch(`${API_ENDPOINTS.ADMIN_BODEGA_USUARIOS}?${q}`)
    clientes.value = data.clientes || []
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function abrirFormulario (cliente = null) {
  editando.value = cliente
  form.value = cliente
    ? {
        nombre: cliente.nombre || '',
        email: cliente.email || '',
        telefono: cliente.telefono || '',
        password: '',
        rut: cliente.rut || '',
        direccion: cliente.direccion || '',
        notas: cliente.notas || '',
        activo: !!cliente.activo
      }
    : formVacio()
  modalAbierto.value = true
  error.value = ''
  okMsg.value = ''
}

function cerrarModal () {
  modalAbierto.value = false
  editando.value = null
}

async function guardar () {
  if (!form.value.email && !form.value.telefono) {
    error.value = 'Indica email o teléfono'
    return
  }
  saving.value = true
  error.value = ''
  try {
    const body = { ...form.value }
    if (editando.value && !body.password) delete body.password
    if (editando.value) {
      await adminBodegaFetch(`${API_ENDPOINTS.ADMIN_BODEGA_USUARIOS}/${editando.value.id}`, {
        method: 'PUT',
        body: JSON.stringify(body)
      })
      okMsg.value = 'Cliente actualizado'
    } else {
      const data = await adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_USUARIOS, {
        method: 'POST',
        body: JSON.stringify(body)
      })
      okMsg.value = data?.cliente?.vinculado_existente
        ? 'Cliente vinculado a un usuario existente. Ya puede iniciar sesión en /login'
        : 'Cliente creado. Ya puede iniciar sesión en /login'
    }
    cerrarModal()
    await cargar()
  } catch (e) {
    error.value = e.message
  } finally {
    saving.value = false
  }
}

async function toggleActivo (c) {
  try {
    await adminBodegaFetch(`${API_ENDPOINTS.ADMIN_BODEGA_USUARIOS}/${c.id}`, {
      method: 'PUT',
      body: JSON.stringify({ activo: !c.activo })
    })
    await cargar()
  } catch (e) {
    error.value = e.message
  }
}

onMounted(cargar)
</script>
