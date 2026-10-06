<template>
  <section class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-200">
      <div class="flex items-center gap-2">
        <button type="button" class="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" aria-label="Mes anterior" @click="cambiarMes(-1)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button type="button" class="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" aria-label="Mes siguiente" @click="cambiarMes(1)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
        <h2 class="text-lg font-black text-slate-900 capitalize ml-1">{{ tituloMes }}</h2>
      </div>
      <button type="button" class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-50" @click="irHoy">
        Hoy
      </button>
    </div>

    <div class="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500">
      <div v-for="d in diasSemana" :key="d" class="px-2 py-2 text-center">{{ d }}</div>
    </div>

    <div class="grid grid-cols-7">
      <button
        v-for="celda in celdas"
        :key="celda.key"
        type="button"
        class="min-h-[92px] sm:min-h-[112px] border-b border-r border-slate-100 p-1 text-left align-top hover:bg-slate-50/80"
        :class="celda.inMonth ? 'bg-white' : 'bg-slate-50/60'"
        @click="seleccionarDia(celda.key)"
      >
        <span
          class="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
          :class="celda.isToday ? 'bg-teal-600 text-white' : (celda.inMonth ? 'text-slate-800' : 'text-slate-400')"
        >{{ celda.day }}</span>
        <div class="mt-1 space-y-0.5">
          <div
            v-for="ev in celda.events.slice(0, 3)"
            :key="ev.id"
            class="truncate rounded px-1 py-0.5 text-[11px] font-semibold leading-tight"
            :class="claseEvento(ev)"
            :title="tituloEvento(ev)"
            @click.stop="seleccionarEvento(ev)"
          >
            <span v-if="ev.hora" class="font-bold">{{ ev.hora }}</span>
            {{ ev.titulo }}
          </div>
          <p v-if="celda.events.length > 3" class="px-1 text-[11px] font-bold text-slate-500">+{{ celda.events.length - 3 }} más</p>
        </div>
      </button>
    </div>

    <div v-if="detalle" class="border-t border-slate-200 bg-slate-50 px-4 py-3">
      <div class="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p class="text-sm font-black text-slate-900">{{ detalle.titulo }}</p>
          <p class="text-sm text-slate-600">{{ detalle.origen || '—' }} → {{ detalle.destino || '—' }}</p>
          <p class="text-xs text-slate-500 mt-1">
            {{ formatFecha(detalle.fecha) }}<span v-if="detalle.hora"> · {{ detalle.hora }}</span>
            · {{ textoEstado(detalle.estado) }}
            · {{ detalle.source === 'flete' ? 'Agenda' : 'Sistema' }}
          </p>
          <p v-if="detalle.carga" class="text-xs text-slate-500">Carga: {{ detalle.carga }}</p>
          <p v-if="showPrice && detalle.precio != null" class="text-sm font-bold text-slate-900 mt-1">${{ Number(detalle.precio).toLocaleString('es-CL') }}</p>
        </div>
        <button type="button" class="text-xs font-bold text-slate-500 hover:text-slate-800" @click="detalle = null">Cerrar</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  events: { type: Array, default: () => [] },
  showPrice: { type: Boolean, default: false }
})

const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const cursor = ref(inicioMes(new Date()))
const detalle = ref(null)

const tituloMes = computed(() =>
  cursor.value.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })
)

const porDia = computed(() => {
  const map = {}
  for (const ev of props.events) {
    if (!ev.fecha) continue
    if (!map[ev.fecha]) map[ev.fecha] = []
    map[ev.fecha].push(ev)
  }
  for (const key of Object.keys(map)) {
    map[key].sort((a, b) => String(a.hora || '99:99').localeCompare(String(b.hora || '99:99')))
  }
  return map
})

const celdas = computed(() => {
  const first = inicioMes(cursor.value)
  const pad = (first.getDay() + 6) % 7
  const start = new Date(first)
  start.setDate(1 - pad)
  const hoy = ymd(new Date())
  const out = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const key = ymd(d)
    out.push({
      key,
      day: d.getDate(),
      inMonth: d.getMonth() === first.getMonth(),
      isToday: key === hoy,
      events: porDia.value[key] || []
    })
  }
  return out
})

function inicioMes(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function ymd(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function cambiarMes(delta) {
  const d = new Date(cursor.value)
  d.setMonth(d.getMonth() + delta)
  cursor.value = inicioMes(d)
  detalle.value = null
}

function irHoy() {
  cursor.value = inicioMes(new Date())
}

function seleccionarDia(key) {
  const lista = porDia.value[key] || []
  detalle.value = lista[0] || null
}

function seleccionarEvento(ev) {
  detalle.value = ev
}

function formatFecha(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })
}

function textoEstado(estado) {
  const map = {
    pendiente: 'Pendiente',
    confirmado: 'Confirmado',
    en_proceso: 'En proceso',
    completado: 'Completado',
    cancelado: 'Cancelado',
    cancelado_admin: 'Cancelado',
    cancelado_conductor: 'Cancelado',
    cancelado_cliente: 'Cancelado',
    expirado: 'Expirado'
  }
  return map[estado] || estado || 'Pendiente'
}

function claseEvento(ev) {
  const e = String(ev.estado || '')
  if (e.startsWith('cancelado') || e === 'expirado') return 'bg-slate-200 text-slate-500 line-through'
  if (e === 'completado') return 'bg-teal-100 text-teal-900'
  if (e === 'en_proceso') return 'bg-violet-100 text-violet-900'
  if (e === 'confirmado' || e === 'asignado') return 'bg-sky-100 text-sky-900'
  if (ev.source === 'flete') return 'bg-amber-100 text-amber-900'
  return 'bg-emerald-100 text-emerald-900'
}

function tituloEvento(ev) {
  const precio = props.showPrice && ev.precio != null ? ` · $${Number(ev.precio).toLocaleString('es-CL')}` : ''
  return `${ev.hora || ''} ${ev.titulo} ${ev.origen || ''} → ${ev.destino || ''}${precio}`.trim()
}
</script>
