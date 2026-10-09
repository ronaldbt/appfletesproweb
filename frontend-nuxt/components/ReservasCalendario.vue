<template>
  <section class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <div class="flex gap-1 overflow-x-auto border-b border-slate-200 px-3 pt-3">
      <button
        v-for="tab in pestanas"
        :key="tab.id"
        type="button"
        class="shrink-0 rounded-t-lg px-3 py-2 text-sm font-bold border-b-2 -mb-px"
        :class="tabActiva === tab.id ? 'border-teal-600 text-teal-700 bg-teal-50' : 'border-transparent text-slate-500 hover:text-slate-800'"
        @click="tabActiva = tab.id"
      >{{ tab.nombre }}</button>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-200">
      <div class="flex items-center gap-2">
        <button type="button" class="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" :aria-label="vista === 'mes' ? 'Mes anterior' : 'Día anterior'" @click="anterior">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button type="button" class="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50" :aria-label="vista === 'mes' ? 'Mes siguiente' : 'Día siguiente'" @click="siguiente">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
        <h2 class="text-lg font-black text-slate-900 capitalize ml-1">{{ vista === 'mes' ? tituloMes : tituloDia }}</h2>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <div class="inline-flex rounded-lg border border-slate-200 overflow-hidden text-sm font-bold">
          <button type="button" class="px-3 py-1.5" :class="vista === 'horas' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-50'" @click="vista = 'horas'">Por horas</button>
          <button type="button" class="px-3 py-1.5" :class="vista === 'mes' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:bg-slate-50'" @click="vista = 'mes'">Por mes</button>
        </div>
        <button type="button" class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-50" @click="irHoy">Hoy</button>
      </div>
    </div>

    <template v-if="vista === 'mes'">
      <div class="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500">
        <div v-for="d in diasSemana" :key="d" class="px-2 py-2 text-center">{{ d }}</div>
      </div>
      <div class="grid grid-cols-7">
        <div
          v-for="celda in celdasMes"
          :key="celda.key"
          role="button"
          tabindex="0"
          class="min-h-[92px] sm:min-h-[112px] min-w-0 overflow-hidden border-b border-r border-slate-100 p-1 text-left align-top hover:bg-slate-50/80"
          :class="celda.inMonth ? 'bg-white' : 'bg-slate-50/60'"
          @click="elegirDia(celda.key)"
          @dblclick.stop="pedirFlete(celda.key, '')"
          @keydown.enter="elegirDia(celda.key)"
        >
          <div class="flex items-center gap-1 min-w-0">
            <span
              class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              :class="celda.isToday ? 'bg-teal-600 text-white' : (celda.inMonth ? 'text-slate-800' : 'text-slate-400')"
            >{{ celda.day }}</span>
            <span
              v-if="showPrice && celda.total"
              class="truncate text-[10px] sm:text-[11px] font-black leading-none"
              :class="celda.inMonth ? 'text-teal-700' : 'text-slate-400'"
              :title="'Total del día $' + formatClp(celda.total)"
            >${{ formatClp(celda.total) }}</span>
          </div>
          <div class="mt-1 space-y-0.5">
            <div
              v-for="ev in celda.events.slice(0, 3)"
              :key="ev.id"
              class="flex items-center gap-0.5 rounded px-1 py-0.5 text-[11px] font-semibold leading-tight"
              :class="claseEvento(ev)"
              @click.stop="detalle = ev"
              @dblclick.stop
            >
              <span class="min-w-0 flex-1 truncate">
                <span v-if="ev.hora" class="font-bold">{{ ev.hora }}</span>
                {{ ev.titulo }}
              </span>
              <button type="button" class="shrink-0 rounded p-0.5 text-slate-700 hover:bg-white/80" aria-label="Editar flete" title="Editar" @click.stop="emit('editar', ev)" @dblclick.stop>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button type="button" class="shrink-0 rounded p-0.5 text-red-700 hover:bg-white/80" aria-label="Eliminar flete" title="Eliminar" @click.stop="pedirEliminar(ev)" @dblclick.stop>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p v-if="celda.events.length > 3" class="px-1 text-[11px] font-bold text-slate-500">+{{ celda.events.length - 3 }} más</p>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="grid grid-cols-7 border-b border-slate-200">
      <button
        v-for="d in semana"
        :key="d.key"
        type="button"
        class="min-w-0 overflow-hidden px-1 py-2 text-center border-r border-slate-100 last:border-r-0"
        :class="d.key === diaKey ? 'bg-teal-50' : 'hover:bg-slate-50'"
        @click="dia = parseKey(d.key)"
      >
        <span class="block text-[11px] font-bold uppercase text-slate-500">{{ d.label }}</span>
        <span class="mt-1 flex items-center justify-center gap-1 min-w-0">
          <span
            class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black"
            :class="d.isToday ? 'bg-teal-600 text-white' : (d.key === diaKey ? 'text-teal-700' : 'text-slate-800')"
          >{{ d.day }}</span>
          <span
            v-if="showPrice && d.total"
            class="truncate text-[10px] font-black leading-none text-teal-700"
            :title="'Total del día $' + formatClp(d.total)"
          >${{ formatClp(d.total) }}</span>
        </span>
        <span v-if="d.count" class="mt-1 block text-[10px] font-bold text-teal-700">{{ d.count }}</span>
      </button>
    </div>

    <div v-if="vista === 'horas' && sinHora.length" class="border-b border-slate-200 bg-amber-50/70 px-4 py-2">
      <p class="text-[11px] font-bold uppercase tracking-wide text-amber-800 mb-1">Sin hora</p>
      <div class="flex flex-wrap gap-1">
        <div
          v-for="ev in sinHora"
          :key="ev.id"
          class="inline-flex items-center rounded text-xs font-semibold"
          :class="claseEvento(ev)"
        >
          <button type="button" class="px-2 py-1" @click="detalle = ev">{{ ev.titulo }}</button>
          <button type="button" class="px-1 py-1 text-slate-700 hover:bg-white/80" aria-label="Editar flete" title="Editar" @click.stop="emit('editar', ev)">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          </button>
          <button type="button" class="px-1 py-1 text-red-700 hover:bg-white/80" aria-label="Eliminar flete" title="Eliminar" @click.stop="pedirEliminar(ev)">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    </div>

    <p v-if="vista === 'horas'" class="px-4 pt-2 text-xs text-slate-400">Doble clic en una hora para anotar un flete.</p>
    <div v-if="vista === 'horas'" class="max-h-[640px] overflow-y-auto">
      <div class="relative" :style="{ height: altoGrilla + 'px' }">
        <div
          v-for="h in horas"
          :key="h"
          class="absolute left-0 right-0 border-t border-slate-100"
          :style="{ top: topHora(h) + 'px' }"
        >
          <span class="absolute left-2 -translate-y-1/2 bg-white pr-2 text-[11px] font-bold text-slate-400">{{ etiquetaHora(h) }}</span>
        </div>
        <div class="absolute left-14 right-2" :style="{ top: padHora + 'px', bottom: padHora + 'px' }" @dblclick="dobleClickHora">
          <div
            v-for="ev in colocados"
            :key="ev.id"
            class="absolute flex overflow-hidden rounded-md text-left text-[11px] font-semibold leading-tight shadow-sm"
            :class="claseEvento(ev)"
            :style="estiloEvento(ev)"
            @dblclick.stop
          >
            <button type="button" class="min-w-0 flex-1 overflow-hidden px-1.5 py-1 text-left" @click="detalle = ev" @dblclick.stop>
              <span class="block font-black">{{ ev.hora }} {{ ev.titulo }}</span>
              <span class="block truncate opacity-80">{{ ev.origen }} → {{ ev.destino }}</span>
            </button>
            <div class="flex shrink-0 flex-col gap-1 p-1">
              <button type="button" class="flex h-6 w-6 items-center justify-center rounded bg-white/90 text-slate-700 shadow-sm hover:bg-white" aria-label="Editar flete" title="Editar" @click.stop="emit('editar', ev)" @dblclick.stop>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button type="button" class="flex h-6 w-6 items-center justify-center rounded bg-white/90 text-red-600 shadow-sm hover:bg-white" aria-label="Eliminar flete" title="Eliminar" @click.stop="pedirEliminar(ev)" @dblclick.stop>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <p v-if="!colocados.length && !sinHora.length" class="absolute inset-x-0 top-8 text-center text-sm text-slate-400">Este día no tiene reservas</p>
        </div>
      </div>
    </div>

    <div v-if="detalle" class="border-t border-slate-200 bg-slate-50 px-4 py-3">
      <div class="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p class="text-sm font-black text-slate-900">{{ detalle.titulo }}</p>
          <p class="text-sm text-slate-600">{{ detalle.origen || '—' }} → {{ detalle.destino || '—' }}</p>
          <p class="text-xs text-slate-500 mt-1">
            {{ formatFecha(detalle.fecha) }}<span v-if="detalle.hora"> · {{ detalle.hora }}</span>
            · {{ textoEstado(detalle.estado) }}
            <span v-if="detalle.conductorNombre"> · {{ detalle.conductorNombre }}</span>
          </p>
          <p v-if="detalle.carga" class="text-xs text-slate-500">Carga: {{ detalle.carga }}</p>
          <p v-if="detalle.comentario" class="text-xs text-slate-600 mt-1">Comentario: {{ detalle.comentario }}</p>
          <p v-if="showPrice && detalle.precio != null" class="text-sm font-bold text-slate-900 mt-1">${{ Number(detalle.precio).toLocaleString('es-CL') }}</p>
        </div>
        <div class="flex items-center gap-3">
          <button type="button" class="text-xs font-bold text-teal-700 hover:underline" @click="emit('editar', detalle)">Editar</button>
          <button type="button" class="text-xs font-bold text-red-600 hover:underline" @click="pedirEliminar(detalle)">Eliminar</button>
          <button type="button" class="text-xs font-bold text-slate-500 hover:text-slate-800" @click="detalle = null">Cerrar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['crear', 'editar', 'eliminar'])

const props = defineProps({
  events: { type: Array, default: () => [] },
  conductores: { type: Array, default: () => [] },
  showPrice: { type: Boolean, default: false }
})

const tabActiva = ref('todos')
const vista = ref('horas')
const dia = ref(inicioDia(new Date()))
const detalle = ref(null)
const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const altoHora = 64
const padHora = 18
const duracionMin = 120

const pestanas = computed(() => [
  { id: 'todos', nombre: 'Todos' },
  { id: 'sin', nombre: 'Sin asignar' },
  ...props.conductores.map((c) => ({ id: String(c.id), nombre: c.nombre }))
])

const eventosFiltrados = computed(() => {
  if (tabActiva.value === 'todos') return props.events
  if (tabActiva.value === 'sin') return props.events.filter((e) => !e.conductorId)
  return props.events.filter((e) => String(e.conductorId) === tabActiva.value)
})

const diaKey = computed(() => ymd(dia.value))
const tituloDia = computed(() =>
  dia.value.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })
)
const tituloMes = computed(() =>
  dia.value.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })
)

const porDia = computed(() => {
  const map = {}
  for (const ev of eventosFiltrados.value) {
    if (!ev.fecha) continue
    if (!map[ev.fecha]) map[ev.fecha] = []
    map[ev.fecha].push(ev)
  }
  for (const key of Object.keys(map)) {
    map[key].sort((a, b) => String(a.hora || '99:99').localeCompare(String(b.hora || '99:99')))
  }
  return map
})

const celdasMes = computed(() => {
  const first = new Date(dia.value.getFullYear(), dia.value.getMonth(), 1)
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
      events: porDia.value[key] || [],
      total: totalDia(porDia.value[key] || [])
    })
  }
  return out
})

const semana = computed(() => {
  const lunes = inicioSemana(dia.value)
  const hoy = ymd(new Date())
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lunes)
    d.setDate(lunes.getDate() + i)
    const key = ymd(d)
    return {
      key,
      day: d.getDate(),
      label: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][i],
      isToday: key === hoy,
      count: (porDia.value[key] || []).length,
      total: totalDia(porDia.value[key] || [])
    }
  })
})

const delDia = computed(() => eventosFiltrados.value.filter((e) => e.fecha === diaKey.value))
const sinHora = computed(() => delDia.value.filter((e) => minutos(e.hora) == null))
const conHora = computed(() => delDia.value.filter((e) => minutos(e.hora) != null))

const horaInicio = computed(() => {
  const mins = conHora.value.map((e) => minutos(e.hora))
  if (!mins.length) return 7
  return Math.min(7, Math.floor(Math.min(...mins) / 60))
})

const horaFin = computed(() => {
  const ends = conHora.value.map((e) => minutos(e.hora) + duracionMin)
  if (!ends.length) return 21
  return Math.max(21, Math.ceil(Math.max(...ends) / 60))
})

const horas = computed(() => {
  const list = []
  for (let h = horaInicio.value; h <= horaFin.value; h++) list.push(h)
  return list
})

const altoGrilla = computed(() => Math.max(1, horaFin.value - horaInicio.value) * altoHora + padHora * 2)

const colocados = computed(() => {
  const items = conHora.value
    .map((e) => ({ ...e, start: minutos(e.hora), end: minutos(e.hora) + duracionMin }))
    .sort((a, b) => a.start - b.start || a.end - b.end)
  const clusters = []
  let group = []
  let groupEnd = -1
  for (const ev of items) {
    if (!group.length || ev.start < groupEnd) {
      group.push(ev)
      groupEnd = Math.max(groupEnd, ev.end)
    } else {
      clusters.push(group)
      group = [ev]
      groupEnd = ev.end
    }
  }
  if (group.length) clusters.push(group)
  const out = []
  for (const cluster of clusters) {
    const colsEnd = []
    for (const ev of cluster) {
      let col = colsEnd.findIndex((end) => end <= ev.start)
      if (col < 0) {
        col = colsEnd.length
        colsEnd.push(ev.end)
      } else colsEnd[col] = ev.end
      ev.col = col
    }
    const n = colsEnd.length
    for (const ev of cluster) out.push({ ...ev, cols: n })
  }
  return out
})

function topHora (h) {
  return (h - horaInicio.value) * altoHora + padHora
}

function dobleClickHora (e) {
  const zona = e.currentTarget.getBoundingClientRect()
  const y = e.clientY - zona.top
  const fraccion = Math.min(1, Math.max(0, y / zona.height))
  const minutosDia = horaInicio.value * 60 + fraccion * (horaFin.value - horaInicio.value) * 60
  const redondeado = Math.round(minutosDia / 30) * 30
  const hh = String(Math.floor(redondeado / 60)).padStart(2, '0')
  const mm = String(redondeado % 60).padStart(2, '0')
  pedirFlete(diaKey.value, `${hh}:${mm}`)
}

function pedirEliminar (ev) {
  if (!ev) return
  if (detalle.value?.id === ev.id) detalle.value = null
  emit('eliminar', ev)
}

function pedirFlete (fecha, hora) {
  if (fecha < fechaHoyChile()) return
  const tab = tabActiva.value
  const conductorId = tab !== 'todos' && tab !== 'sin' ? tab : ''
  emit('crear', { fecha, hora, conductorId })
}

function fechaHoyChile () {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date())
}

function estiloEvento (ev) {
  const top = ((ev.start - horaInicio.value * 60) / 60) * altoHora
  const height = Math.max(36, (duracionMin / 60) * altoHora - 4)
  const width = 100 / ev.cols
  return {
    top: `${top + 2}px`,
    height: `${height}px`,
    left: `${ev.col * width}%`,
    width: `calc(${width}% - 4px)`
  }
}

function anterior () {
  if (vista.value === 'mes') cambiarMes(-1)
  else moverDia(-1)
}

function siguiente () {
  if (vista.value === 'mes') cambiarMes(1)
  else moverDia(1)
}

function cambiarMes (delta) {
  const d = new Date(dia.value)
  const day = d.getDate()
  d.setDate(1)
  d.setMonth(d.getMonth() + delta)
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
  d.setDate(Math.min(day, last))
  dia.value = inicioDia(d)
  detalle.value = null
}

function elegirDia (key) {
  dia.value = parseKey(key)
  const lista = porDia.value[key] || []
  detalle.value = lista[0] || null
}

function moverDia (delta) {
  const d = new Date(dia.value)
  d.setDate(d.getDate() + delta)
  dia.value = inicioDia(d)
  detalle.value = null
}

function irHoy () {
  dia.value = inicioDia(new Date())
  detalle.value = null
}

function inicioDia (d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function inicioSemana (d) {
  const x = inicioDia(d)
  const pad = (x.getDay() + 6) % 7
  x.setDate(x.getDate() - pad)
  return x
}

function ymd (d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function parseKey (key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function minutos (hora) {
  const m = String(hora || '').match(/^(\d{1,2}):(\d{2})/)
  if (!m) return null
  return Number(m[1]) * 60 + Number(m[2])
}

function etiquetaHora (h) {
  return `${String(h).padStart(2, '0')}:00`
}

function formatFecha (iso) {
  if (!iso) return ''
  return parseKey(iso).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })
}

function montoEvento (ev) {
  const estado = String(ev.estado || '')
  if (estado.startsWith('cancelado') || estado === 'expirado') return 0
  const n = parseInt(String(ev.precio ?? '').replace(/\D/g, ''), 10)
  return Number.isFinite(n) && n > 0 ? n : 0
}

function totalDia (events) {
  return events.reduce((sum, ev) => sum + montoEvento(ev), 0)
}

function formatClp (n) {
  return Math.round(n).toLocaleString('es-CL')
}

function textoEstado (estado) {
  const map = {
    pendiente: 'Pendiente',
    confirmado: 'Confirmado',
    en_proceso: 'En proceso',
    completado: 'Completado',
    cancelado: 'Cancelado',
    cancelado_admin: 'Cancelado',
    enviado: 'Enviado',
    asignado: 'Asignado'
  }
  return map[estado] || estado || 'Pendiente'
}

function claseEvento (ev) {
  const e = String(ev.estado || '')
  if (e.startsWith('cancelado') || e === 'expirado') return 'bg-slate-200 text-slate-500'
  if (e === 'completado') return 'bg-teal-100 text-teal-900 border border-teal-200'
  if (e === 'en_proceso') return 'bg-violet-100 text-violet-900 border border-violet-200'
  if (e === 'confirmado' || e === 'asignado') return 'bg-sky-100 text-sky-900 border border-sky-200'
  return 'bg-amber-100 text-amber-950 border border-amber-200'
}
</script>
