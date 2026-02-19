<template>
  <div class="mx-auto max-w-6xl">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h1 class="text-2xl font-black tracking-tight text-slate-900">Reservas</h1>
      <button @click="loadReservas" class="inline-flex items-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/30 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        Actualizar reservas
      </button>
    </div>

    <!-- Agenda de fletes (anotados por teléfono) -->
    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      <h2 class="text-lg font-black text-slate-900 mb-4">Agenda de fletes</h2>
      <p class="text-sm text-slate-500 mb-4">Anota aquí los fletes que te confirman por teléfono. Se borran solos después de un mes. 24 h antes puedes enviarte un recordatorio por WhatsApp.</p>

      <!-- Fletes mañana: recordatorio WhatsApp -->
      <div v-if="fletesManana.length > 0" class="mb-6 p-4 rounded-xl bg-teal-50 border border-teal-200">
        <h3 class="text-sm font-black text-teal-800 uppercase tracking-wider mb-3">Fletes mañana – recordatorio</h3>
        <div class="space-y-2">
          <a v-for="f in fletesManana" :key="f.id" :href="whatsappRecordatorioUrl(f)" target="_blank" rel="noopener"
             class="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-white border border-teal-100 hover:border-teal-300 transition-colors">
            <span class="text-sm font-medium text-slate-800">{{ f.nombre || '—' }} · {{ f.origen }} → {{ f.destino }}</span>
            <span class="text-xs text-slate-500">Tel: {{ f.telefono }}{{ f.precio ? ' · $' + formatPrecio(f.precio) : '' }}</span>
            <span class="inline-flex items-center gap-1 text-xs font-bold text-teal-600">Abrir WhatsApp</span>
          </a>
        </div>
      </div>

      <!-- Formulario nuevo / editar flete -->
      <form @submit.prevent="guardarFleteAgenda" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200" :class="{ 'ring-2 ring-teal-300': editingFleteId }">
        <label class="md:col-span-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre persona o empresa</span>
          <input v-model="nuevoFlete.nombre" type="text" required placeholder="Ej: Juan Pérez / Empresa XYZ" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        </label>
        <label>
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Precio del flete ($)</span>
          <input v-model="nuevoFlete.precio" type="text" placeholder="Ej: 45000" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        </label>
        <label>
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha del flete</span>
          <input v-model="nuevoFlete.fecha" type="date" required class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        </label>
        <label>
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Hora del flete</span>
          <input v-model="nuevoFlete.hora" type="time" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        </label>
        <label>
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Teléfono cliente</span>
          <input v-model="nuevoFlete.telefono" type="tel" required placeholder="+56912345678" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        </label>
        <label class="md:col-span-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Origen</span>
          <input v-model="nuevoFlete.origen" type="text" required placeholder="Dirección origen" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        </label>
        <label class="md:col-span-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Destino</span>
          <input v-model="nuevoFlete.destino" type="text" required placeholder="Dirección destino" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        </label>
        <label>
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">¿Con ayudante?</span>
          <select v-model="nuevoFlete.conAyudante" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none">
            <option value="no">No</option>
            <option value="si">Sí</option>
          </select>
        </label>
        <label class="md:col-span-2 lg:col-span-3">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Qué llevar (carga)</span>
          <input v-model="nuevoFlete.carga" type="text" placeholder="Ej: muebles, cajas, refrigerador" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        </label>
        <div class="md:col-span-2 lg:col-span-3 flex flex-wrap gap-2">
          <button type="submit" class="rounded-xl bg-teal-600 hover:bg-teal-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/30 transition-colors">
            {{ editingFleteId ? 'Guardar cambios' : 'Guardar flete en agenda' }}
          </button>
          <button v-if="editingFleteId" type="button" @click="cancelarEdicionFlete" class="rounded-xl border-2 border-slate-300 hover:border-slate-400 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
            Cancelar
          </button>
        </div>
      </form>

      <!-- Lista de fletes guardados (futuros, sin pasar 1 mes) -->
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-slate-700">
              <th class="px-4 py-3 text-left font-bold">Fecha</th>
              <th class="px-4 py-3 text-left font-bold">Hora</th>
              <th class="px-4 py-3 text-left font-bold">Nombre</th>
              <th class="px-4 py-3 text-left font-bold">Origen → Destino</th>
              <th class="px-4 py-3 text-left font-bold">Carga</th>
              <th class="px-4 py-3 text-left font-bold">Precio</th>
              <th class="px-4 py-3 text-left font-bold">Ayudante</th>
              <th class="px-4 py-3 text-left font-bold">Teléfono</th>
              <th class="px-4 py-3 text-left font-bold">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in agendaFletes" :key="f.id" class="border-t border-slate-200 hover:bg-slate-50/80">
              <td class="px-4 py-3 font-medium text-slate-800">{{ formatDate(f.fecha) }}</td>
              <td class="px-4 py-3 text-slate-700">{{ formatTime(f.hora) }}</td>
              <td class="px-4 py-3 font-medium text-slate-800">{{ f.nombre || '—' }}</td>
              <td class="px-4 py-3 text-slate-700">{{ f.origen }} → {{ f.destino }}</td>
              <td class="px-4 py-3 text-slate-600">{{ f.carga || '—' }}</td>
              <td class="px-4 py-3 font-bold text-slate-900">{{ f.precio ? '$' + formatPrecio(f.precio) : '—' }}</td>
              <td class="px-4 py-3">{{ f.conAyudante === 'si' ? 'Sí' : 'No' }}</td>
              <td class="px-4 py-3"><a :href="`https://wa.me/${f.telefono.replace(/\D/g, '')}`" target="_blank" rel="noopener" class="text-teal-600 font-bold hover:underline">{{ f.telefono }}</a></td>
              <td class="px-4 py-3 flex flex-wrap gap-2">
                <button type="button" @click="editarFleteAgenda(f)" class="text-teal-600 hover:text-teal-700 font-bold text-xs">Editar</button>
                <button type="button" @click="eliminarFleteAgenda(f.id)" class="text-red-600 hover:text-red-700 font-bold text-xs">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="agendaFletes.length === 0" class="p-6 text-center text-slate-500 text-sm">No hay fletes anotados. Los que tengan más de un mes se eliminan solos.</p>
      </div>
    </section>

    <!-- Reservas del sistema (API) -->
    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-lg font-black text-slate-900 mb-4">Reservas del sistema</h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Total</p>
          <p class="text-2xl font-black text-slate-900">{{ reservasStats.total }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-amber-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Pendientes</p>
          <p class="text-2xl font-black text-amber-700">{{ reservasStats.pendientes }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-teal-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Completadas</p>
          <p class="text-2xl font-black text-teal-700">{{ reservasStats.completadas }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Ingresos</p>
          <p class="text-xl font-black text-slate-900">${{ reservasStats.ingresos.toLocaleString('es-CL') }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input v-model="searchTerm" placeholder="Buscar..." class="md:col-span-2 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        <select v-model="filterEstado" class="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none">
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmado">Confirmado</option>
          <option value="en_proceso">En Proceso</option>
          <option value="completado">Completado</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <input v-model="filterFecha" type="date" class="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
      </div>

      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-slate-700">
              <th class="px-4 py-3 text-left font-bold">ID</th>
              <th class="px-4 py-3 text-left font-bold">Cliente</th>
              <th class="px-4 py-3 text-left font-bold">Ruta</th>
              <th class="px-4 py-3 text-left font-bold">Precio</th>
              <th class="px-4 py-3 text-left font-bold">Estado</th>
              <th class="px-4 py-3 text-left font-bold">Fecha y hora</th>
              <th class="px-4 py-3 text-left font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reserva in filteredReservas" :key="reserva.id" class="border-t border-slate-200 hover:bg-slate-50/80">
              <td class="px-4 py-3 font-mono text-slate-600">#{{ reserva.id }}</td>
              <td class="px-4 py-3">
                <div class="font-medium text-slate-900">{{ reserva.usuario_nombre }}</div>
                <div class="text-xs text-slate-500">{{ reserva.usuario_email }}</div>
              </td>
              <td class="px-4 py-3 text-slate-700">
                <div>{{ reserva.origen }}</div>
                <div class="text-teal-600">→ {{ reserva.destino }}</div>
              </td>
              <td class="px-4 py-3 font-bold text-slate-900">${{ reserva.precio?.toLocaleString('es-CL') }}</td>
              <td class="px-4 py-3">
                <span class="px-2 py-1 text-xs font-bold rounded-full" :class="getEstadoClass(reserva.estado)">{{ getEstadoText(reserva.estado) }}</span>
              </td>
              <td class="px-4 py-3 text-slate-600">{{ formatDate(reserva.fecha) }}</td>
              <td class="px-4 py-3">
                <button @click="viewReserva(reserva)" class="text-teal-600 hover:underline font-bold mr-2">Ver</button>
                <button @click="editReserva(reserva)" class="text-slate-600 hover:underline font-bold mr-2">Editar</button>
                <button @click="deleteReserva(reserva)" class="text-red-600 hover:underline font-bold">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mt-4 text-sm text-slate-500">Mostrando {{ filteredReservas.length }} de {{ reservas.length }} reservas</p>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
import { ref, computed, onMounted } from 'vue'
import { apiUrl } from '../../config/api.js'

const STORAGE_KEY = 'fletespro_agenda_fletes'
const WHATSAPP_NUMERO = '56979796841'
const UN_MES_MS = 30 * 24 * 60 * 60 * 1000

const reservas = ref([])
const searchTerm = ref('')
const filterEstado = ref('')
const filterFecha = ref('')

const editingFleteId = ref(null)
const nuevoFlete = ref({
  nombre: '',
  precio: '',
  fecha: '',
  hora: '',
  origen: '',
  destino: '',
  carga: '',
  conAyudante: 'no',
  telefono: ''
})

function getAgendaFromStorage() {
  if (process.client && typeof localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const list = raw ? JSON.parse(raw) : []
      const now = Date.now()
      const filtrado = list.filter(f => {
        const d = parseDateLocal(f.fecha)
        if (!d || isNaN(d.getTime())) return true
        return d.getTime() + UN_MES_MS > now
      })
      if (filtrado.length !== list.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(filtrado))
      return filtrado
    } catch (_) {}
  }
  return []
}

const agendaFletes = ref(getAgendaFromStorage())

const fletesManana = computed(() => {
  const manana = new Date()
  manana.setDate(manana.getDate() + 1)
  const y = manana.getFullYear()
  const m = String(manana.getMonth() + 1).padStart(2, '0')
  const d = String(manana.getDate()).padStart(2, '0')
  const mananaStr = `${y}-${m}-${d}`
  return agendaFletes.value.filter(f => f.fecha === mananaStr)
})

function formatPrecio(val) {
  if (val == null || val === '') return '—'
  const n = parseInt(String(val).replace(/\D/g, ''), 10)
  if (isNaN(n)) return String(val)
  return n.toLocaleString('es-CL')
}

function whatsappRecordatorioUrl(f) {
  const precioStr = f.precio ? `\n• Precio: $${formatPrecio(f.precio)}` : ''
  const horaStr = f.hora ? `\n• Hora: ${formatTime(f.hora)}` : ''
  const msg = `Recordatorio FletesPro: Tienes un flete mañana.\n• Cliente: ${f.nombre || '—'}\n• Origen: ${f.origen}\n• Destino: ${f.destino}\n• Carga: ${f.carga || '—'}${horaStr}${precioStr}\n• Teléfono: ${f.telefono}\n• Ayudante: ${f.conAyudante === 'si' ? 'Sí' : 'No'}`
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`
}

function guardarFleteAgenda() {
  const id = editingFleteId.value || Date.now().toString()
  const f = {
    id,
    nombre: (nuevoFlete.value.nombre || '').trim(),
    precio: (nuevoFlete.value.precio || '').trim().replace(/\D/g, '') || null,
    fecha: nuevoFlete.value.fecha,
    hora: (nuevoFlete.value.hora || '').trim() || null,
    origen: nuevoFlete.value.origen,
    destino: nuevoFlete.value.destino,
    carga: nuevoFlete.value.carga,
    conAyudante: nuevoFlete.value.conAyudante,
    telefono: nuevoFlete.value.telefono.replace(/\D/g, '').replace(/^0/, '56')
  }
  if (editingFleteId.value) {
    agendaFletes.value = agendaFletes.value.map(x => x.id === id ? f : x)
  } else {
    agendaFletes.value = [f, ...agendaFletes.value]
  }
  if (process.client) localStorage.setItem(STORAGE_KEY, JSON.stringify(agendaFletes.value))
  cancelarEdicionFlete()
}

function editarFleteAgenda(f) {
  editingFleteId.value = f.id
  nuevoFlete.value = {
    nombre: f.nombre || '',
    precio: f.precio ? String(f.precio) : '',
    fecha: f.fecha || '',
    hora: f.hora || '',
    origen: f.origen || '',
    destino: f.destino || '',
    carga: f.carga || '',
    conAyudante: f.conAyudante === 'si' ? 'si' : 'no',
    telefono: f.telefono ? (f.telefono.startsWith('56') ? f.telefono : '56' + f.telefono) : ''
  }
}

function cancelarEdicionFlete() {
  editingFleteId.value = null
  nuevoFlete.value = { nombre: '', precio: '', fecha: '', hora: '', origen: '', destino: '', carga: '', conAyudante: 'no', telefono: '' }
}

function eliminarFleteAgenda(id) {
  if (!confirm('¿Eliminar este flete de la agenda?')) return
  agendaFletes.value = agendaFletes.value.filter(f => f.id !== id)
  if (process.client) localStorage.setItem(STORAGE_KEY, JSON.stringify(agendaFletes.value))
  if (editingFleteId.value === id) cancelarEdicionFlete()
}

const reservasStats = computed(() => {
  const total = reservas.value.length
  const pendientes = reservas.value.filter(r => r.estado === 'pendiente').length
  const completadas = reservas.value.filter(r => r.estado === 'completado').length
  const ingresos = reservas.value.reduce((sum, r) => sum + parseFloat(r.precio || 0), 0)
  return { total, pendientes, completadas, ingresos }
})

const filteredReservas = computed(() => {
  let list = reservas.value
  if (searchTerm.value) {
    const q = searchTerm.value.toLowerCase()
    list = list.filter(r =>
      (r.usuario_nombre || '').toLowerCase().includes(q) ||
      (r.origen || '').toLowerCase().includes(q) ||
      (r.destino || '').toLowerCase().includes(q)
    )
  }
  if (filterEstado.value) list = list.filter(r => r.estado === filterEstado.value)
  if (filterFecha.value) list = list.filter(r => (r.fecha || '').split('T')[0] === filterFecha.value)
  return list
})

// Parsea YYYY-MM-DD como fecha local (evita que se muestre un día menos por UTC)
function parseDateLocal(dateString) {
  if (!dateString) return null
  const s = String(dateString).trim()
  const match = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (match) {
    const [, y, m, d] = match.map(Number)
    return new Date(y, m - 1, d)
  }
  return new Date(s)
}

function formatDate(dateString) {
  const d = parseDateLocal(dateString)
  if (!d || isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatTime(hora) {
  if (!hora) return '—'
  const s = String(hora).trim()
  if (!s) return '—'
  if (/^\d{1,2}:\d{2}$/.test(s)) return s
  if (/^\d{1,2}:\d{2}:\d{2}/.test(s)) return s.slice(0, 5)
  return s
}

function formatDateTime(dateString, hora) {
  const d = formatDate(dateString)
  const t = formatTime(hora)
  if (d === '—' && t === '—') return '—'
  if (t === '—') return d
  return `${d} ${t}`
}

function getEstadoClass(estado) {
  const map = {
    pendiente: 'bg-amber-100 text-amber-800',
    confirmado: 'bg-sky-100 text-sky-800',
    en_proceso: 'bg-violet-100 text-violet-800',
    completado: 'bg-teal-100 text-teal-800',
    cancelado: 'bg-red-100 text-red-800'
  }
  return map[estado] || 'bg-slate-100 text-slate-800'
}

function getEstadoText(estado) {
  const map = {
    pendiente: 'Pendiente',
    confirmado: 'Confirmado',
    en_proceso: 'En Proceso',
    completado: 'Completado',
    cancelado: 'Cancelado'
  }
  return map[estado] || estado
}

async function loadReservas() {
  try {
    const res = await fetch(apiUrl('/api/admin/reservas'))
    const data = await res.json()
    reservas.value = data.reservas || []
  } catch (e) {
    console.error(e)
  }
}

function viewReserva(r) { console.log('Ver', r) }
function editReserva(r) { console.log('Editar', r) }
function deleteReserva(r) {
  if (confirm(`¿Eliminar reserva #${r.id}?`)) console.log('Eliminar', r)
}

onMounted(() => {
  console.log('📋 [Reservas] onMounted: cargando agenda y reservas del sistema')
  agendaFletes.value = getAgendaFromStorage()
  loadReservas()
})
</script>
