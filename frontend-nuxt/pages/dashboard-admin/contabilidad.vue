<template>
  <div class="mx-auto max-w-6xl">
    <div class="flex flex-col gap-4 mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 class="text-2xl font-black tracking-tight text-slate-900">Contabilidad</h1>
        <div class="flex flex-wrap items-center gap-2">
          <button @click="cargar" class="inline-flex items-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/30">Actualizar</button>
          <button @click="descargarPdf" class="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800">Descargar PDF</button>
        </div>
      </div>
      <div class="flex flex-wrap items-end gap-2">
        <button v-for="p in presets" :key="p.id" type="button" @click="aplicarPreset(p.id)"
          class="rounded-lg px-3 py-1.5 text-sm font-bold border"
          :class="periodo === p.id ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'">
          {{ p.label }}
        </button>
        <label class="text-xs font-bold text-slate-500">
          Desde
          <input v-model="desde" type="date" @change="periodo = 'personalizado'" class="mt-1 block rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm text-slate-900" />
        </label>
        <label class="text-xs font-bold text-slate-500">
          Hasta
          <input v-model="hasta" type="date" @change="periodo = 'personalizado'" class="mt-1 block rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm text-slate-900" />
        </label>
      </div>
      <p class="text-sm text-slate-500">{{ textoPeriodo }} · comparado con {{ textoPeriodoAnterior }}. El total es solo de estas fechas. Las reservas posteriores a hoy no se suman.</p>
      <p v-if="proximasEnPeriodo.length" class="text-sm text-slate-500">
        En este rango hay {{ proximasEnPeriodo.length }} reserva{{ proximasEnPeriodo.length === 1 ? '' : 's' }} futura{{ proximasEnPeriodo.length === 1 ? '' : 's' }} por {{ clp(totalProximasPeriodo) }} que todavía no se contabilizan.
      </p>
    </div>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
        <div>
          <h2 class="text-lg font-black text-slate-900">{{ grafico.titulo }}</h2>
          <p class="text-sm text-slate-500 mt-1">{{ grafico.subtitulo }}</p>
        </div>
        <p class="text-sm font-bold text-slate-800">{{ puntoActivo ? puntoActivo.titulo + ' · ' + clp(puntoActivo.valor) : grafico.resumen }}</p>
      </div>
      <div v-if="grafico.modo !== 'fletes'" class="flex flex-wrap gap-4 text-xs font-bold text-slate-500 mb-2">
        <span class="inline-flex items-center gap-2"><span class="w-6 border-t-2 border-teal-600"></span> Este período</span>
        <span class="inline-flex items-center gap-2"><span class="w-6 border-t-2 border-dashed border-slate-400"></span> Período anterior</span>
      </div>
      <p v-if="!grafico.puntos.length" class="py-8 text-center text-sm text-slate-500">No hay ventas en este período para graficar.</p>
      <svg v-else class="w-full h-auto" viewBox="0 0 720 280" role="img" :aria-label="grafico.titulo" @mouseleave="puntoActivo = null">
        <line v-for="tick in grafico.ticks" :key="tick.y" :x1="grafico.pl" :x2="704" :y1="tick.y" :y2="tick.y" stroke="#e2e8f0" />
        <text v-for="tick in grafico.ticks" :key="'t'+tick.y" :x="grafico.pl - 8" :y="tick.y + 4" text-anchor="end" fill="#64748b" font-size="11">{{ tick.label }}</text>
        <template v-if="grafico.modo === 'fletes'">
          <g v-for="p in grafico.puntos" :key="p.i">
            <rect :x="p.x - p.w / 2" :y="p.y" :width="p.w" :height="p.h" rx="4" fill="#0d9488" class="cursor-pointer" @mouseenter="puntoActivo = p" />
            <text :x="p.x" :y="268" text-anchor="middle" fill="#64748b" font-size="11">{{ p.eje }}</text>
          </g>
        </template>
        <template v-else>
          <polygon v-if="grafico.area" :points="grafico.area" fill="#14b8a6" opacity="0.15" />
          <polyline v-if="grafico.lineaPrevia" :points="grafico.lineaPrevia" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4" />
          <polyline :points="grafico.linea" fill="none" stroke="#0d9488" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
          <g v-for="p in grafico.puntos" :key="p.i">
            <circle :cx="p.x" :cy="p.y" r="8" fill="transparent" class="cursor-pointer" @mouseenter="puntoActivo = p" />
            <circle :cx="p.x" :cy="p.y" r="3.5" fill="#0f766e" />
            <text v-if="p.mostrar" :x="p.x" :y="268" text-anchor="middle" fill="#64748b" font-size="11">{{ p.eje }}</text>
          </g>
        </template>
      </svg>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      <h2 class="text-lg font-black text-slate-900 mb-4">Resumen del período</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="card in tarjetas" :key="card.label" class="rounded-xl border p-4" :class="card.caja">
          <p class="text-xs font-bold uppercase" :class="card.titulo">{{ card.label }}</p>
          <p class="text-2xl font-black" :class="card.valor">{{ card.texto }}</p>
          <p class="text-xs mt-1 font-bold" :class="card.mejora ? 'text-emerald-700' : 'text-red-600'">{{ card.variacion }}</p>
        </div>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      <h2 class="text-lg font-black text-slate-900 mb-1">Estado de resultados</h2>
      <p class="text-sm text-slate-500 mb-4">Los precios de las reservas son netos, sin IVA. El resultado es esa venta menos los gastos del período.</p>
      <table class="w-full text-sm">
        <tbody>
          <tr v-for="linea in estadoResultados" :key="linea.concepto" class="border-t border-slate-100" :class="linea.fuerte ? 'bg-slate-50' : ''">
            <td class="px-3 py-2" :class="linea.fuerte ? 'font-black text-slate-900' : 'text-slate-700'">{{ linea.concepto }}</td>
            <td class="px-3 py-2 text-right font-bold" :class="linea.negativo ? 'text-red-700' : 'text-slate-900'">{{ linea.monto }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-if="porDia.length && porDia.length <= 45" class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      <h2 class="text-lg font-black text-slate-900 mb-4">Ventas por día</h2>
      <div class="space-y-2 max-h-[420px] overflow-y-auto">
        <div v-for="d in porDia" :key="d.fecha" class="grid grid-cols-[88px_1fr_110px] items-center gap-2 text-sm">
          <span class="text-slate-500">{{ formatClave(d.fecha) }}</span>
          <div class="h-3 rounded-full bg-slate-100 overflow-hidden">
            <div class="h-full rounded-full bg-teal-500" :style="{ width: anchoBarra(d.ingresos) }"></div>
          </div>
          <span class="text-right font-bold text-slate-800">{{ clp(d.ingresos) }}</span>
        </div>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      <h2 class="text-lg font-black text-slate-900 mb-4">Ventas por semana</h2>
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-slate-700">
              <th class="px-4 py-3 text-left font-bold">Semana</th>
              <th class="px-4 py-3 text-right font-bold">Fletes</th>
              <th class="px-4 py-3 text-right font-bold">Ventas</th>
              <th class="px-4 py-3 text-right font-bold">Gastos</th>
              <th class="px-4 py-3 text-right font-bold">Resultado neto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in porSemana" :key="s.clave" class="border-t border-slate-200">
              <td class="px-4 py-3 text-slate-700">{{ s.label }}</td>
              <td class="px-4 py-3 text-right">{{ s.fletes }}</td>
              <td class="px-4 py-3 text-right font-bold">{{ clp(s.ingresos) }}</td>
              <td class="px-4 py-3 text-right text-red-700">{{ clp(s.gastos) }}</td>
              <td class="px-4 py-3 text-right font-bold" :class="s.resultado >= 0 ? 'text-teal-800' : 'text-red-700'">{{ clp(s.resultado) }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="porSemana.length === 0" class="p-6 text-center text-slate-500 text-sm">No hay movimientos en el período.</p>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      <h2 class="text-lg font-black text-slate-900 mb-4">Gastos por tipo</h2>
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-slate-700">
              <th class="px-4 py-3 text-left font-bold">Tipo</th>
              <th class="px-4 py-3 text-right font-bold">Movimientos</th>
              <th class="px-4 py-3 text-right font-bold">Monto</th>
              <th class="px-4 py-3 text-right font-bold">% de gastos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in gastosPorTipo" :key="g.tipo" class="border-t border-slate-200">
              <td class="px-4 py-3 font-medium text-slate-800">{{ getTipoGastoLabel(g.tipo) }}</td>
              <td class="px-4 py-3 text-right">{{ g.cantidad }}</td>
              <td class="px-4 py-3 text-right font-bold text-red-700">{{ clp(g.monto) }}</td>
              <td class="px-4 py-3 text-right text-slate-600">{{ g.porcentaje }}%</td>
            </tr>
          </tbody>
        </table>
        <p v-if="gastosPorTipo.length === 0" class="p-6 text-center text-slate-500 text-sm">No hay gastos en el período.</p>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      <h2 class="text-lg font-black text-slate-900 mb-4">Gastos (bencina, repuestos, salario, etc.)</h2>
      <form @submit.prevent="agregarGasto" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <label>
          <span class="text-xs font-bold text-slate-500 uppercase">Tipo</span>
          <select v-model="nuevoGasto.tipo" required class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none">
            <option value="bencina">Bencina</option>
            <option value="repuestos">Repuestos</option>
            <option value="mantenimiento">Mantenimiento</option>
            <option value="salario">Salario</option>
            <option value="peaje">Peaje</option>
            <option value="multas">Multas</option>
            <option value="otros">Otros</option>
          </select>
        </label>
        <label>
          <span class="text-xs font-bold text-slate-500 uppercase">Monto ($)</span>
          <input v-model="nuevoGasto.monto" type="number" min="0" step="1" required placeholder="0" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        </label>
        <label>
          <span class="text-xs font-bold text-slate-500 uppercase">Fecha</span>
          <input v-model="nuevoGasto.fecha" type="date" required class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        </label>
        <label class="lg:col-span-2">
          <span class="text-xs font-bold text-slate-500 uppercase">Descripción (opcional)</span>
          <input v-model="nuevoGasto.descripcion" type="text" placeholder="Ej: Tanque lleno camión 1" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none" />
        </label>
        <div class="md:col-span-2 lg:col-span-5 flex justify-end">
          <button type="submit" class="rounded-xl bg-teal-600 hover:bg-teal-700 px-4 py-2.5 text-sm font-bold text-white">Agregar gasto</button>
        </div>
      </form>
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-slate-700">
              <th class="px-4 py-3 text-left font-bold">Fecha</th>
              <th class="px-4 py-3 text-left font-bold">Tipo</th>
              <th class="px-4 py-3 text-left font-bold">Descripción</th>
              <th class="px-4 py-3 text-right font-bold">Monto</th>
              <th class="px-4 py-3 text-left font-bold">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in gastosPeriodo" :key="g.id" class="border-t border-slate-200">
              <td class="px-4 py-3 text-slate-600">{{ formatClave(fechaClave(g.fecha)) }}</td>
              <td class="px-4 py-3 font-medium text-slate-800">{{ getTipoGastoLabel(g.tipo) }}</td>
              <td class="px-4 py-3 text-slate-600">{{ g.descripcion || '—' }}</td>
              <td class="px-4 py-3 text-right font-bold text-red-700">{{ clp(g.monto) }}</td>
              <td class="px-4 py-3">
                <button type="button" @click="eliminarGasto(g)" class="text-red-600 hover:underline font-bold text-xs">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="gastosPeriodo.length === 0" class="p-6 text-center text-slate-500 text-sm">No hay gastos en el período.</p>
      </div>
    </section>

    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-lg font-black text-slate-900 mb-1">Ventas del período</h2>
      <p class="text-sm text-slate-500 mb-4">Reservas cuya fecha ya llegó y cae en este período. Entran aunque no las hayas marcado como completadas.</p>
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-slate-700">
              <th class="px-4 py-3 text-left font-bold">Fecha</th>
              <th class="px-4 py-3 text-left font-bold">Origen → Destino</th>
              <th class="px-4 py-3 text-left font-bold">Cliente</th>
              <th class="px-4 py-3 text-right font-bold">Precio neto</th>
              <th class="px-4 py-3 text-center font-bold">Cobrado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in fletesPeriodo" :key="(f.source || 'f') + '-' + f.id" class="border-t border-slate-200">
              <td class="px-4 py-3 text-slate-600">{{ formatClave(fechaClave(f.fecha)) }}</td>
              <td class="px-4 py-3 text-slate-800">{{ f.origen }} → {{ f.destino }}</td>
              <td class="px-4 py-3 text-slate-700">{{ f.usuario_nombre || '—' }}</td>
              <td class="px-4 py-3 text-right font-bold text-slate-900">{{ f.precio == null || f.precio === '' ? 'Sin precio' : clp(f.precio) }}</td>
              <td class="px-4 py-3 text-center">{{ f.cobrado !== false ? 'Sí' : 'Por cobrar' }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="fletesPeriodo.length === 0" class="p-6 text-center text-slate-500 text-sm">No hay ventas en el período. Las reservas de días futuros se suman cuando llega su fecha.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
import { ref, computed, onMounted, watch } from 'vue'
import { apiUrl } from '../../config/api.js'

const presets = [
  { id: 'hoy', label: 'Hoy' },
  { id: 'semana', label: 'Esta semana' },
  { id: 'mes', label: 'Este mes' },
  { id: '7d', label: '7 días' },
  { id: '30d', label: '30 días' },
  { id: 'mes_anterior', label: 'Mes anterior' },
  { id: 'personalizado', label: 'Fechas' }
]

const periodo = ref('mes')
const puntoActivo = ref(null)
const desde = ref('')
const hasta = ref('')
watch([desde, hasta], () => { puntoActivo.value = null })
const fletes = ref([])
const gastos = ref([])
const nuevoGasto = ref({
  tipo: 'bencina',
  monto: '',
  fecha: hoyChile(),
  descripcion: ''
})

function hoyChile () {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date())
}

function parseYmd (s) {
  const [y, m, d] = String(s).split('-').map(Number)
  return new Date(y, (m || 1) - 1, d || 1)
}

function ymd (d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function addDays (s, n) {
  const d = parseYmd(s)
  d.setDate(d.getDate() + n)
  return ymd(d)
}

function fechaClave (valor) {
  const m = String(valor || '').match(/^(\d{4}-\d{2}-\d{2})/)
  return m ? m[1] : ''
}

function formatClave (clave) {
  if (!clave) return '—'
  const [y, m, d] = clave.split('-')
  return `${d}-${m}-${y}`
}

function clp (n) {
  const v = Math.round(Number(n) || 0)
  const signo = v < 0 ? '-' : ''
  return `${signo}$${Math.abs(v).toLocaleString('es-CL')}`
}

function aplicarPreset (id) {
  periodo.value = id
  const hoy = hoyChile()
  if (id === 'hoy') {
    desde.value = hoy
    hasta.value = hoy
  } else if (id === 'semana') {
    const d = parseYmd(hoy)
    const pad = (d.getDay() + 6) % 7
    d.setDate(d.getDate() - pad)
    desde.value = ymd(d)
    hasta.value = hoy
  } else if (id === 'mes') {
    desde.value = `${hoy.slice(0, 8)}01`
    hasta.value = hoy
  } else if (id === '7d') {
    desde.value = addDays(hoy, -6)
    hasta.value = hoy
  } else if (id === '30d') {
    desde.value = addDays(hoy, -29)
    hasta.value = hoy
  } else if (id === 'mes_anterior') {
    const d = parseYmd(hoy)
    const first = new Date(d.getFullYear(), d.getMonth() - 1, 1)
    const last = new Date(d.getFullYear(), d.getMonth(), 0)
    desde.value = ymd(first)
    hasta.value = ymd(last)
  }
}

function rangoAnterior (ini, fin) {
  const a = parseYmd(ini)
  const b = parseYmd(fin)
  const dias = Math.round((b - a) / 86400000) + 1
  const hastaPrev = new Date(a)
  hastaPrev.setDate(hastaPrev.getDate() - 1)
  const desdePrev = new Date(hastaPrev)
  desdePrev.setDate(desdePrev.getDate() - (dias - 1))
  return { desde: ymd(desdePrev), hasta: ymd(hastaPrev), dias }
}

function enRango (clave, ini, fin) {
  return !!clave && clave >= ini && clave <= fin
}

function estadoCancelado (estado) {
  const e = String(estado || '')
  return e.startsWith('cancelado') || e === 'expirado'
}

function esVenta (f) {
  const clave = fechaClave(f.fecha)
  return !!clave && clave <= hoyChile() && !estadoCancelado(f.estado)
}

function desglose (listaFletes, listaGastos) {
  let ingresos = 0
  let cobrados = 0
  let porCobrar = 0
  let neto = 0
  listaFletes.forEach((f) => {
    const p = parseFloat(f.precio || 0)
    ingresos += p
    neto += p
    if (f.cobrado === false) porCobrar += p
    else cobrados += p
  })
  const totalGastos = listaGastos.reduce((s, g) => s + parseFloat(g.monto || 0), 0)
  return {
    ingresos,
    cobrados,
    porCobrar,
    neto: Math.round(neto),
    gastos: totalGastos,
    fletes: listaFletes.length,
    resultado: Math.round(neto - totalGastos),
    caja: Math.round(cobrados - totalGastos),
    ticket: listaFletes.length ? Math.round(ingresos / listaFletes.length) : 0
  }
}

const ventasHastaHoy = computed(() => fletes.value.filter(esVenta))

const proximasEnPeriodo = computed(() => {
  const hoy = hoyChile()
  return fletes.value.filter((f) => {
    const clave = fechaClave(f.fecha)
    return !!clave && clave > hoy && !estadoCancelado(f.estado) && enRango(clave, desde.value, hasta.value)
  })
})

const totalProximasPeriodo = computed(() => proximasEnPeriodo.value.reduce((s, f) => s + parseFloat(f.precio || 0), 0))

const fletesPeriodo = computed(() => {
  return ventasHastaHoy.value
    .filter((f) => enRango(fechaClave(f.fecha), desde.value, hasta.value))
    .sort((a, b) => fechaClave(b.fecha).localeCompare(fechaClave(a.fecha)))
})

const gastosPeriodo = computed(() => {
  return gastos.value
    .filter((g) => enRango(fechaClave(g.fecha), desde.value, hasta.value))
    .sort((a, b) => fechaClave(b.fecha).localeCompare(fechaClave(a.fecha)))
})

const anterior = computed(() => rangoAnterior(desde.value || hoyChile(), hasta.value || hoyChile()))

const fletesAnterior = computed(() => {
  const r = anterior.value
  return ventasHastaHoy.value.filter((f) => enRango(fechaClave(f.fecha), r.desde, r.hasta))
})

const gastosAnterior = computed(() => {
  const r = anterior.value
  return gastos.value.filter((g) => enRango(fechaClave(g.fecha), r.desde, r.hasta))
})

const resumen = computed(() => desglose(fletesPeriodo.value, gastosPeriodo.value))
const resumenAnterior = computed(() => desglose(fletesAnterior.value, gastosAnterior.value))

function variacion (actual, previo, mejorSiSube) {
  const diff = actual - previo
  const sube = diff > 0
  const baja = diff < 0
  const mejora = mejorSiSube ? sube || diff === 0 : baja || diff === 0
  let texto = 'Sin cambio'
  if (diff !== 0) {
    const pct = previo === 0 ? null : Math.round((diff / Math.abs(previo)) * 100)
    texto = `${diff > 0 ? '+' : ''}${clp(diff)}`
    if (pct != null) texto += ` (${pct > 0 ? '+' : ''}${pct}%)`
    else texto += diff > 0 ? ' (nuevo)' : ''
  }
  return { texto, mejora: diff === 0 ? true : mejora }
}

const tarjetas = computed(() => {
  const a = resumen.value
  const p = resumenAnterior.value
  const items = [
    ['Ventas netas', a.ingresos, p.ingresos, true, 'border-slate-200 bg-slate-50', 'text-slate-500', 'text-slate-900'],
    ['Por cobrar', a.porCobrar, p.porCobrar, false, 'border-slate-200 bg-amber-50', 'text-amber-700', 'text-amber-800'],
    ['Gastos', a.gastos, p.gastos, false, 'border-slate-200 bg-red-50', 'text-slate-500', 'text-red-800'],
    ['Resultado', a.resultado, p.resultado, true, 'border-teal-300 bg-teal-50', 'text-teal-700', a.resultado >= 0 ? 'text-teal-800' : 'text-red-700'],
    ['Fletes', a.fletes, p.fletes, true, 'border-slate-200 bg-teal-50', 'text-slate-500', 'text-teal-700'],
    ['Ticket promedio', a.ticket, p.ticket, true, 'border-slate-200 bg-slate-50', 'text-slate-500', 'text-slate-900'],
    ['Caja (cobrado − gastos)', a.caja, p.caja, true, 'border-slate-200 bg-violet-50', 'text-slate-500', a.caja >= 0 ? 'text-violet-800' : 'text-red-700']
  ]
  return items.map(([label, actual, previo, mejorSiSube, caja, titulo, valor]) => {
    const v = variacion(actual, previo, mejorSiSube)
    const texto = label === 'Fletes' ? String(actual) : clp(actual)
    return { label, texto, variacion: v.texto, mejora: v.mejora, caja, titulo, valor }
  })
})

const estadoResultados = computed(() => {
  const a = resumen.value
  const lineas = [
    { concepto: 'Ventas netas (sin IVA)', monto: clp(a.ingresos), fuerte: true }
  ]
  gastosPorTipo.value.forEach((g) => {
    lineas.push({ concepto: `Gasto: ${getTipoGastoLabel(g.tipo)}`, monto: clp(-g.monto), negativo: true })
  })
  if (!gastosPorTipo.value.length) {
    lineas.push({ concepto: 'Gastos de operación', monto: clp(0) })
  }
  lineas.push({ concepto: 'Resultado del período', monto: clp(a.resultado), fuerte: true, negativo: a.resultado < 0 })
  lineas.push({ concepto: 'Cuentas por cobrar', monto: clp(a.porCobrar) })
  lineas.push({ concepto: 'Ya cobrado', monto: clp(a.cobrados) })
  return lineas
})

const porDia = computed(() => {
  if (!desde.value || !hasta.value) return []
  const map = {}
  let cursor = desde.value
  let guard = 0
  while (cursor <= hasta.value && guard < 120) {
    map[cursor] = { fecha: cursor, ingresos: 0, gastos: 0, fletes: 0 }
    cursor = addDays(cursor, 1)
    guard++
  }
  fletesPeriodo.value.forEach((f) => {
    const k = fechaClave(f.fecha)
    if (map[k]) {
      map[k].ingresos += parseFloat(f.precio || 0)
      map[k].fletes += 1
    }
  })
  gastosPeriodo.value.forEach((g) => {
    const k = fechaClave(g.fecha)
    if (map[k]) map[k].gastos += parseFloat(g.monto || 0)
  })
  return Object.values(map)
})

const maxDia = computed(() => Math.max(1, ...porDia.value.map((d) => d.ingresos)))
function anchoBarra (n) {
  return `${Math.max(2, Math.round((n / maxDia.value) * 100))}%`
}

const porSemana = computed(() => {
  const map = {}
  const meter = (clave, campo, valor) => {
    if (!clave) return
    const d = parseYmd(clave)
    const pad = (d.getDay() + 6) % 7
    d.setDate(d.getDate() - pad)
    const ini = ymd(d)
    const fin = addDays(ini, 6)
    if (!map[ini]) map[ini] = { clave: ini, label: `${formatClave(ini)} – ${formatClave(fin)}`, ingresos: 0, neto: 0, gastos: 0, fletes: 0 }
    map[ini][campo] += valor
  }
  fletesPeriodo.value.forEach((f) => {
    const p = parseFloat(f.precio || 0)
    meter(fechaClave(f.fecha), 'ingresos', p)
    meter(fechaClave(f.fecha), 'neto', p)
    meter(fechaClave(f.fecha), 'fletes', 1)
  })
  gastosPeriodo.value.forEach((g) => meter(fechaClave(g.fecha), 'gastos', parseFloat(g.monto || 0)))
  return Object.values(map)
    .sort((a, b) => a.clave.localeCompare(b.clave))
    .map((s) => ({ ...s, resultado: Math.round(s.neto - s.gastos) }))
})

const gastosPorTipo = computed(() => {
  const map = {}
  gastosPeriodo.value.forEach((g) => {
    const tipo = g.tipo || 'otros'
    if (!map[tipo]) map[tipo] = { tipo, monto: 0, cantidad: 0 }
    map[tipo].monto += parseFloat(g.monto || 0)
    map[tipo].cantidad += 1
  })
  const total = Object.values(map).reduce((s, g) => s + g.monto, 0) || 1
  return Object.values(map)
    .sort((a, b) => b.monto - a.monto)
    .map((g) => ({ ...g, porcentaje: Math.round((g.monto / total) * 100) }))
})

function etiquetaDia (clave, cruzaMes) {
  const [, m, d] = clave.split('-').map(Number)
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  const wd = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'][parseYmd(clave).getDay()]
  if (cruzaMes) return `${d} ${meses[(m || 1) - 1]}`
  return `${wd} ${d}`
}

function clpCorto (n) {
  const v = Math.round(Number(n) || 0)
  if (Math.abs(v) >= 1000000) return `$${(v / 1000000).toFixed(1)}M`
  if (Math.abs(v) >= 1000) return `$${Math.round(v / 1000)} mil`
  return `$${v}`
}

function ventasPorFecha (lista) {
  const map = {}
  lista.forEach((f) => {
    const k = fechaClave(f.fecha)
    if (!k) return
    map[k] = (map[k] || 0) + parseFloat(f.precio || 0)
  })
  return map
}

const grafico = computed(() => {
  const vacio = { titulo: 'Evolución', subtitulo: '', resumen: '', modo: 'dias', puntos: [], ticks: [], linea: '', lineaPrevia: '', area: '', pl: 64 }
  const ini = desde.value
  const finPedido = hasta.value
  if (!ini || !finPedido) return vacio
  const hoy = hoyChile()
  const fin = finPedido > hoy ? hoy : finPedido
  if (ini > fin) return vacio
  const dias = Math.round((parseYmd(fin) - parseYmd(ini)) / 86400000) + 1
  const unDia = periodo.value === 'hoy' || ((periodo.value === 'personalizado' || !periodo.value) && dias <= 1)
  const modo = unDia ? 'fletes' : (dias > 62 ? 'semanas' : 'dias')
  const W = 720
  const H = 280
  const pl = 64
  const pr = 16
  const pt = 18
  const pb = 32
  const innerW = W - pl - pr
  const innerH = H - pt - pb
  const baseY = pt + innerH

  let crudos = []
  let previa = []
  let titulo = 'Evolución por día'
  let subtitulo = 'La línea muestra la venta neta de cada día. Sube o baja según lo que se hizo.'
  if (modo === 'fletes') {
    titulo = 'Fletes del día'
    subtitulo = 'Cada barra es un flete de este día, en el orden de la hora.'
    crudos = fletesPeriodo.value
      .filter((f) => fechaClave(f.fecha) === ini)
      .sort((a, b) => String(a.hora || '99:99').localeCompare(String(b.hora || '99:99')))
      .map((f) => {
        const hora = String(f.hora || '').slice(0, 5)
        const nombre = String(f.usuario_nombre || 'Flete').trim()
        return {
          eje: hora || 's/h',
          titulo: `${hora ? hora + ' · ' : ''}${nombre}`,
          valor: parseFloat(f.precio || 0)
        }
      })
  } else if (modo === 'semanas') {
    titulo = 'Evolución por semana'
    subtitulo = 'Cada punto es la venta neta de esa semana. La línea gris es el período anterior.'
    const armar = (desdeSem, hastaSem, lista) => {
      const map = ventasPorFecha(lista)
      const out = []
      let cursor = desdeSem
      let guard = 0
      while (cursor <= hastaSem && guard < 80) {
        const lunes = parseYmd(cursor)
        const pad = (lunes.getDay() + 6) % 7
        lunes.setDate(lunes.getDate() - pad)
        const clave = ymd(lunes)
        const corte = addDays(clave, 6)
        if (!out.length || out[out.length - 1].clave !== clave) {
          let valor = 0
          let dia = clave < desdeSem ? desdeSem : clave
          const ultimo = corte > hastaSem ? hastaSem : corte
          while (dia <= ultimo) {
            valor += map[dia] || 0
            dia = addDays(dia, 1)
          }
          out.push({ clave, eje: formatClave(clave).slice(0, 5), titulo: `${formatClave(clave)} – ${formatClave(corte)}`, valor })
        }
        cursor = addDays(corte, 1)
        guard++
      }
      return out
    }
    crudos = armar(ini, fin, fletesPeriodo.value)
    const prev = anterior.value
    previa = armar(prev.desde, prev.hasta, fletesAnterior.value)
  } else {
    if (dias <= 8) {
      titulo = 'Evolución de la semana'
      subtitulo = 'La línea verde es la venta neta de cada día. La gris es la semana anterior, en el mismo orden.'
    } else {
      titulo = 'Evolución del mes, día a día'
      subtitulo = 'Cada punto es un día. La línea gris repite el período anterior para comparar cómo va el negocio.'
    }
    const cruzaMes = ini.slice(0, 7) !== fin.slice(0, 7)
    const mapActual = ventasPorFecha(fletesPeriodo.value)
    const mapPrevio = ventasPorFecha(fletesAnterior.value)
    const prevIni = anterior.value.desde
    let cursor = ini
    for (let i = 0; i < dias; i++) {
      const clavePrev = addDays(prevIni, i)
      crudos.push({
        eje: dias <= 10 ? etiquetaDia(cursor, cruzaMes) : String(parseYmd(cursor).getDate()),
        titulo: formatClave(cursor),
        valor: mapActual[cursor] || 0
      })
      previa.push({ valor: mapPrevio[clavePrev] || 0 })
      cursor = addDays(cursor, 1)
    }
  }

  const max = Math.max(1, ...crudos.map((p) => p.valor), ...previa.map((p) => p.valor || 0))
  const n = crudos.length
  const paso = n <= 8 ? 1 : Math.ceil(n / 8)
  const puntos = crudos.map((p, i) => {
    const x = modo === 'fletes'
      ? pl + ((i + 0.5) / Math.max(n, 1)) * innerW
      : (n <= 1 ? pl + innerW / 2 : pl + (i / (n - 1)) * innerW)
    const y = pt + innerH - (p.valor / max) * innerH
    const w = modo === 'fletes' ? Math.max(12, Math.min(48, (innerW / Math.max(n, 1)) * 0.55)) : 0
    return { ...p, i, x, y, w, h: baseY - y, mostrar: i % paso === 0 || i === n - 1 }
  })
  const linea = puntos.map((p) => `${p.x},${p.y}`).join(' ')
  const lineaPrevia = previa.length === puntos.length && modo !== 'fletes'
    ? previa.map((p, i) => {
      const y = pt + innerH - ((p.valor || 0) / max) * innerH
      return `${puntos[i].x},${y}`
    }).join(' ')
    : ''
  const area = puntos.length
    ? `${linea} ${puntos[puntos.length - 1].x},${baseY} ${puntos[0].x},${baseY}`
    : ''
  const ticks = [max, max / 2, 0].map((v) => ({
    y: pt + innerH - (v / max) * innerH,
    label: clpCorto(v)
  }))
  const total = crudos.reduce((s, p) => s + p.valor, 0)
  return {
    titulo,
    subtitulo,
    resumen: crudos.length ? clp(total) : '',
    modo,
    puntos,
    ticks,
    linea,
    lineaPrevia,
    area,
    pl
  }
})

const textoPeriodo = computed(() => `${formatClave(desde.value)} al ${formatClave(hasta.value)}`)
const textoPeriodoAnterior = computed(() => `${formatClave(anterior.value.desde)} al ${formatClave(anterior.value.hasta)}`)

function getTipoGastoLabel (tipo) {
  const map = {
    bencina: 'Bencina',
    repuestos: 'Repuestos',
    mantenimiento: 'Mantenimiento',
    salario: 'Salario',
    peaje: 'Peaje',
    multas: 'Multas',
    otros: 'Otros'
  }
  return map[tipo] || tipo
}

function esc (s) {
  return String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
}

function descargarPdf () {
  const a = resumen.value
  const p = resumenAnterior.value
  const filasEstado = estadoResultados.value.map((l) => `<tr><td>${esc(l.concepto)}</td><td class="num">${esc(l.monto)}</td></tr>`).join('')
  const filasSemana = porSemana.value.map((s) => `<tr><td>${esc(s.label)}</td><td class="num">${s.fletes}</td><td class="num">${esc(clp(s.ingresos))}</td><td class="num">${esc(clp(s.gastos))}</td><td class="num">${esc(clp(s.resultado))}</td></tr>`).join('')
  const filasGastos = gastosPeriodo.value.map((g) => `<tr><td>${esc(formatClave(fechaClave(g.fecha)))}</td><td>${esc(getTipoGastoLabel(g.tipo))}</td><td>${esc(g.descripcion || '—')}</td><td class="num">${esc(clp(g.monto))}</td></tr>`).join('')
  const filasFletes = fletesPeriodo.value.map((f) => `<tr><td>${esc(formatClave(fechaClave(f.fecha)))}</td><td>${esc(f.usuario_nombre || '—')}</td><td>${esc((f.origen || '') + ' → ' + (f.destino || ''))}</td><td class="num">${esc(clp(f.precio))}</td><td>${f.cobrado !== false ? 'Cobrado' : 'Por cobrar'}</td></tr>`).join('')
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Informe contable ${esc(desde.value)} ${esc(hasta.value)}</title>
<style>
  body { font-family: Georgia, serif; color: #111; margin: 24px; }
  h1 { font-size: 22px; margin: 0; }
  h2 { font-size: 16px; margin: 22px 0 8px; border-bottom: 1px solid #ccc; }
  p { font-size: 12px; color: #333; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 8px; }
  th, td { border-bottom: 1px solid #ddd; padding: 5px 6px; text-align: left; vertical-align: top; }
  th { background: #f3f4f6; }
  .num { text-align: right; white-space: nowrap; }
  .nota { font-size: 11px; color: #444; }
  @page { size: A4; margin: 14mm; }
</style></head><body>
<h1>FletesPro — Informe contable</h1>
<p>Período: ${esc(textoPeriodo.value)}<br>Comparado con: ${esc(textoPeriodoAnterior.value)}<br>Emitido: ${esc(formatClave(hoyChile()))}</p>
<h2>Estado de resultados</h2>
<table>${filasEstado}</table>
<h2>Comparación con el período anterior</h2>
<table>
<tr><th></th><th class="num">Este período</th><th class="num">Anterior</th><th class="num">Diferencia</th></tr>
<tr><td>Ventas netas (sin IVA)</td><td class="num">${esc(clp(a.ingresos))}</td><td class="num">${esc(clp(p.ingresos))}</td><td class="num">${esc(clp(a.ingresos - p.ingresos))}</td></tr>
<tr><td>Gastos</td><td class="num">${esc(clp(a.gastos))}</td><td class="num">${esc(clp(p.gastos))}</td><td class="num">${esc(clp(a.gastos - p.gastos))}</td></tr>
<tr><td>Resultado</td><td class="num">${esc(clp(a.resultado))}</td><td class="num">${esc(clp(p.resultado))}</td><td class="num">${esc(clp(a.resultado - p.resultado))}</td></tr>
<tr><td>Fletes</td><td class="num">${a.fletes}</td><td class="num">${p.fletes}</td><td class="num">${a.fletes - p.fletes}</td></tr>
<tr><td>Ticket promedio</td><td class="num">${esc(clp(a.ticket))}</td><td class="num">${esc(clp(p.ticket))}</td><td class="num">${esc(clp(a.ticket - p.ticket))}</td></tr>
</table>
<h2>Estado de cobranzas</h2>
<table>
<tr><td>Ya cobrado</td><td class="num">${esc(clp(a.cobrados))}</td></tr>
<tr><td>Cuentas por cobrar</td><td class="num">${esc(clp(a.porCobrar))}</td></tr>
<tr><td>Caja del período (cobrado − gastos)</td><td class="num">${esc(clp(a.caja))}</td></tr>
</table>
<p class="nota">No se incluye un balance general con caja, activos fijos ni patrimonio: esos saldos no están registrados en el panel. Las ventas son las reservas con fecha de hoy o anterior. Las reservas futuras no se suman hasta que llega su día. Los gastos son los ingresados en el panel.</p>
<h2>Ventas por semana</h2>
<table><tr><th>Semana</th><th class="num">Fletes</th><th class="num">Ventas</th><th class="num">Gastos</th><th class="num">Resultado neto</th></tr>${filasSemana || '<tr><td colspan="5">Sin movimientos</td></tr>'}</table>
<h2>Detalle de fletes</h2>
<table><tr><th>Fecha</th><th>Cliente</th><th>Ruta</th><th class="num">Precio</th><th>Cobro</th></tr>${filasFletes || '<tr><td colspan="5">Sin fletes</td></tr>'}</table>
<h2>Detalle de gastos</h2>
<table><tr><th>Fecha</th><th>Tipo</th><th>Descripción</th><th class="num">Monto</th></tr>${filasGastos || '<tr><td colspan="4">Sin gastos</td></tr>'}</table>
<p class="nota">Los precios se registran netos, sin IVA. Este informe es de gestión interna y no reemplaza los libros contables ni un estado financiero auditado.</p>
</body></html>`
  const w = window.open('', '_blank')
  if (!w) {
    alert('Permite las ventanas emergentes para abrir el informe y guardarlo como PDF.')
    return
  }
  w.document.open()
  w.document.write(html)
  w.document.close()
  w.focus()
  setTimeout(() => w.print(), 400)
}

async function cargar () {
  try {
    const [reservasRes, gastosRes] = await Promise.all([
      fetch(apiUrl('/api/admin/reservas?unificado=1')),
      fetch(apiUrl('/api/admin/gastos'))
    ])
    const reservasData = await reservasRes.json()
    const gastosRaw = await gastosRes.json()
    fletes.value = reservasData.reservas || []
    gastos.value = Array.isArray(gastosRaw) ? gastosRaw : []
  } catch (e) {
    console.error(e)
    fletes.value = []
    gastos.value = []
  }
}

async function agregarGasto () {
  const payload = {
    tipo: nuevoGasto.value.tipo,
    monto: parseFloat(String(nuevoGasto.value.monto).replace(',', '.')) || 0,
    fecha: nuevoGasto.value.fecha || hoyChile(),
    descripcion: nuevoGasto.value.descripcion?.trim() || null
  }
  if (payload.monto <= 0) {
    alert('El monto debe ser mayor a 0.')
    return
  }
  try {
    const res = await fetch(apiUrl('/api/admin/gastos'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const text = await res.text()
    if (!res.ok) {
      let errMsg = 'Error al agregar gasto'
      try {
        const data = JSON.parse(text)
        if (data?.error) errMsg = data.error
      } catch (_) {}
      throw new Error(errMsg)
    }
    nuevoGasto.value = { tipo: 'bencina', monto: '', fecha: hoyChile(), descripcion: '' }
    await cargar()
  } catch (e) {
    alert(e.message || 'Error al agregar gasto')
  }
}

async function eliminarGasto (g) {
  if (!confirm('¿Eliminar este gasto?')) return
  try {
    const res = await fetch(apiUrl(`/api/admin/gastos/${g.id}`), { method: 'DELETE' })
    if (!res.ok) throw new Error('Error')
    await cargar()
  } catch (e) {
    alert('Error al eliminar')
  }
}

onMounted(() => {
  aplicarPreset('mes')
  cargar()
})
</script>
