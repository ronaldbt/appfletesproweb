<template>
  <div class="mx-auto max-w-6xl">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <h1 class="text-2xl font-black tracking-tight text-slate-900">Contabilidad</h1>
      <div class="flex items-center gap-2">
        <select v-model="periodo" @change="cargar" class="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-slate-900 focus:border-teal-500 focus:outline-none text-sm font-medium">
          <option value="mes">Este mes</option>
          <option value="semana">Esta semana</option>
          <option value="todo">Todo</option>
        </select>
        <button @click="cargar" class="inline-flex items-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/30 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Actualizar
        </button>
      </div>
    </div>

    <!-- Resumen: Ingresos cobrados / por cobrar, Gastos, IVA, Balance -->
    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      <h2 class="text-lg font-black text-slate-900 mb-4">Resumen</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Ingresos cobrados</p>
          <p class="text-2xl font-black text-slate-900">${{ resumen.ingresosCobrados.toLocaleString('es-CL') }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-amber-50 p-4">
          <p class="text-xs font-bold text-amber-700 uppercase">Por cobrar</p>
          <p class="text-xl font-black text-amber-800">${{ resumen.ingresosPorCobrar.toLocaleString('es-CL') }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-emerald-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Neto (sin IVA)</p>
          <p class="text-xl font-black text-emerald-800">${{ resumen.netoSinIva.toLocaleString('es-CL') }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-violet-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">IVA recaudado</p>
          <p class="text-xl font-black text-violet-800">${{ resumen.ivaRecaudado.toLocaleString('es-CL') }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-red-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Gastos</p>
          <p class="text-2xl font-black text-red-800">${{ resumen.gastos.toLocaleString('es-CL') }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-teal-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Fletes realizados</p>
          <p class="text-2xl font-black text-teal-700">{{ resumen.cantidadFletes }}</p>
        </div>
        <div class="rounded-xl border-2 border-teal-300 bg-teal-50 p-4">
          <p class="text-xs font-bold text-teal-700 uppercase">Balance</p>
          <p class="text-2xl font-black" :class="resumen.balance >= 0 ? 'text-teal-800' : 'text-red-700'">${{ resumen.balance.toLocaleString('es-CL') }}</p>
        </div>
      </div>
    </section>

    <!-- Gastos: agregar y listar (bencina, repuestos, salario, etc.) -->
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
          <button type="submit" class="rounded-xl bg-teal-600 hover:bg-teal-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/30 transition-colors">Agregar gasto</button>
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
            <tr v-for="g in gastosFiltrados" :key="g.id" class="border-t border-slate-200 hover:bg-slate-50/80">
              <td class="px-4 py-3 text-slate-600">{{ formatDate(g.fecha) }}</td>
              <td class="px-4 py-3 font-medium text-slate-800">{{ getTipoGastoLabel(g.tipo) }}</td>
              <td class="px-4 py-3 text-slate-600">{{ g.descripcion || '—' }}</td>
              <td class="px-4 py-3 text-right font-bold text-red-700">${{ (parseFloat(g.monto) || 0).toLocaleString('es-CL') }}</td>
              <td class="px-4 py-3">
                <button type="button" @click="eliminarGasto(g)" class="text-red-600 hover:underline font-bold text-xs">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="gastosFiltrados.length === 0" class="p-6 text-center text-slate-500 text-sm">No hay gastos en el período.</p>
      </div>
    </section>

    <!-- Fletes realizados (detalle) con IVA -->
    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-lg font-black text-slate-900 mb-4">Fletes realizados</h2>
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-slate-700">
              <th class="px-4 py-3 text-left font-bold">Fecha</th>
              <th class="px-4 py-3 text-left font-bold">Origen → Destino</th>
              <th class="px-4 py-3 text-left font-bold">Cliente</th>
              <th class="px-4 py-3 text-right font-bold">Precio</th>
              <th class="px-4 py-3 text-center font-bold">IVA</th>
              <th class="px-4 py-3 text-center font-bold">Cobrado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in fletesRealizados" :key="f.id" class="border-t border-slate-200 hover:bg-slate-50/80">
              <td class="px-4 py-3 text-slate-600">{{ formatDate(f.created_at || f.updated_at || f.fecha) }}</td>
              <td class="px-4 py-3 text-slate-800">{{ f.origen }} → {{ f.destino }}</td>
              <td class="px-4 py-3 text-slate-700">{{ f.cliente_nombre || f.cliente_telefono || f.usuario_nombre || '—' }}</td>
              <td class="px-4 py-3 text-right font-bold text-slate-900">${{ (f.precio || 0).toLocaleString('es-CL') }}</td>
              <td class="px-4 py-3 text-center">{{ f.iva_incluido !== false ? 'Sí' : 'No' }}</td>
              <td class="px-4 py-3 text-center">{{ f.cobrado !== false ? 'Sí' : 'Por cobrar' }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="fletesRealizados.length === 0" class="p-6 text-center text-slate-500 text-sm">No hay fletes realizados en el período.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })
import { ref, computed, onMounted } from 'vue'
import { apiUrl } from '../../config/api.js'

const IVA_CHILE = 0.19 // 19%

const periodo = ref('mes')
const stats = ref(null)
const fletesRealizados = ref([])
const gastos = ref([])

const nuevoGasto = ref({
  tipo: 'bencina',
  monto: '',
  fecha: new Date().toISOString().slice(0, 10),
  descripcion: ''
})

function toLocalDateStr(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function getFechasPeriodo() {
  const now = new Date()
  let desde, hasta
  if (periodo.value === 'semana') {
    desde = new Date(now)
    desde.setDate(now.getDate() - now.getDay())
    desde.setHours(0, 0, 0, 0)
    hasta = new Date(now)
  } else if (periodo.value === 'mes') {
    desde = new Date(now.getFullYear(), now.getMonth(), 1)
    hasta = new Date(now)
  } else {
    // "Todo": rango amplio para incluir todos los gastos
    desde = '1970-01-01'
    hasta = toLocalDateStr(now)
  }
  return {
    desde: typeof desde === 'string' ? desde : toLocalDateStr(desde),
    hasta: typeof hasta === 'string' ? hasta : toLocalDateStr(hasta)
  }
}

// Fecha del gasto para filtrar: si ya es YYYY-MM-DD usarla tal cual; si es ISO con hora, usar fecha local
function fechaGastoParaFiltro(g) {
  if (!g?.fecha) return ''
  const s = String(g.fecha)
  if (s.length >= 10 && !s.includes('T')) return s.slice(0, 10)
  return toLocalDateStr(new Date(g.fecha))
}

const gastosFiltrados = computed(() => {
  const list = gastos.value
  const { desde, hasta } = getFechasPeriodo()
  if (periodo.value === 'todo') return list
  return list.filter(g => {
    const d = fechaGastoParaFiltro(g)
    return d >= desde && d <= hasta
  })
})

const resumen = computed(() => {
  const list = fletesRealizados.value
  const ingresosCobrados = list.filter(f => f.cobrado !== false).reduce((s, f) => s + parseFloat(f.precio || 0), 0)
  const ingresosPorCobrar = list.filter(f => f.cobrado === false).reduce((s, f) => s + parseFloat(f.precio || 0), 0)
  const ingresos = ingresosCobrados + ingresosPorCobrar
  let netoSinIva = 0
  let ivaRecaudado = 0
  list.forEach(f => {
    const p = parseFloat(f.precio || 0)
    if (f.iva_incluido !== false && p > 0) {
      netoSinIva += p / (1 + IVA_CHILE)
      ivaRecaudado += p - (p / (1 + IVA_CHILE))
    } else {
      netoSinIva += p
    }
  })
  const totalGastos = gastosFiltrados.value.reduce((s, g) => s + parseFloat(g.monto || 0), 0)
  return {
    ingresos,
    ingresosCobrados,
    ingresosPorCobrar,
    netoSinIva: Math.round(netoSinIva),
    ivaRecaudado: Math.round(ivaRecaudado),
    gastos: totalGastos,
    cantidadFletes: list.length,
    balance: Math.round(ingresosCobrados - totalGastos)
  }
})

function getTipoGastoLabel(tipo) {
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

function formatDate(d) {
  if (!d) return '—'
  const date = new Date(d)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

async function cargar() {
  try {
    const { desde, hasta } = getFechasPeriodo()
    // Gastos: pedir todos y filtrar por período en frontend para no perder ninguno por zona horaria
    const [statsRes, fletesRes, reservasRes, gastosRes] = await Promise.all([
      fetch(apiUrl('/api/admin/stats')),
      fetch(apiUrl('/api/admin/fletes?estado=completado')),
      fetch(apiUrl('/api/admin/reservas')),
      fetch(apiUrl('/api/admin/gastos'))
    ])
    stats.value = await statsRes.json()
    const fletesData = await fletesRes.json()
    const reservasData = await reservasRes.json()
    const gastosRaw = await gastosRes.json()
    gastos.value = Array.isArray(gastosRaw) ? gastosRaw : []
    console.log('📋 [Contabilidad] Gastos cargados:', gastos.value.length, gastos.value.slice(0, 3))

    let listFletes = Array.isArray(fletesData) ? fletesData : []
    const reservasList = (reservasData.reservas || []).filter(r => r.estado === 'completado')

    const now = new Date()
    if (periodo.value === 'semana') {
      const inicioSemana = new Date(now)
      inicioSemana.setDate(now.getDate() - now.getDay())
      inicioSemana.setHours(0, 0, 0, 0)
      listFletes = listFletes.filter(f => new Date(f.created_at || f.updated_at) >= inicioSemana)
    } else if (periodo.value === 'mes') {
      const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1)
      listFletes = listFletes.filter(f => new Date(f.created_at || f.updated_at) >= inicioMes)
    }

    const listReservas = reservasList.map(r => ({
      id: r.id,
      origen: r.origen || '—',
      destino: r.destino || '—',
      usuario_nombre: r.usuario_nombre || '—',
      precio: r.precio,
      iva_incluido: r.iva_incluido !== false,
      cobrado: r.cobrado !== false,
      fecha: r.fecha,
      created_at: r.fecha,
      updated_at: r.fecha
    })).filter(r => {
      if (periodo.value === 'todo') return true
      const d = r.fecha ? new Date(r.fecha) : null
      if (!d) return false
      if (periodo.value === 'mes') return d >= new Date(now.getFullYear(), now.getMonth(), 1)
      if (periodo.value === 'semana') {
        const inicioSemana = new Date(now)
        inicioSemana.setDate(now.getDate() - now.getDay())
        inicioSemana.setHours(0, 0, 0, 0)
        return d >= inicioSemana
      }
      return true
    })

    const todos = [...listFletes.map(f => ({ ...f, iva_incluido: f.iva_incluido !== false, cobrado: f.cobrado !== false })), ...listReservas]
    fletesRealizados.value = todos.sort((a, b) => new Date(b.created_at || b.updated_at || b.fecha) - new Date(a.created_at || a.updated_at || a.fecha))
  } catch (e) {
    console.error(e)
    fletesRealizados.value = []
    gastos.value = []
  }
}

async function agregarGasto() {
  const payload = {
    tipo: nuevoGasto.value.tipo,
    monto: parseFloat(String(nuevoGasto.value.monto).replace(',', '.')) || 0,
    fecha: nuevoGasto.value.fecha || new Date().toISOString().slice(0, 10),
    descripcion: nuevoGasto.value.descripcion?.trim() || null
  }
  console.log('📋 [Contabilidad] agregarGasto payload:', payload)
  if (payload.monto <= 0) {
    console.warn('📋 [Contabilidad] Monto debe ser mayor a 0')
    alert('El monto debe ser mayor a 0.')
    return
  }
  try {
    const url = apiUrl('/api/admin/gastos')
    console.log('📋 [Contabilidad] POST', url)
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const text = await res.text()
    console.log('📋 [Contabilidad] Respuesta status:', res.status, 'body:', text?.slice(0, 200))
    if (!res.ok) {
      let errMsg = 'Error al agregar gasto'
      try {
        const data = JSON.parse(text)
        if (data?.error) errMsg = data.error
      } catch (_) {
        if (text) errMsg = text.slice(0, 150)
      }
      throw new Error(errMsg)
    }
    const data = JSON.parse(text || '{}')
    console.log('✅ [Contabilidad] Gasto creado:', data?.id)
    nuevoGasto.value = { tipo: 'bencina', monto: '', fecha: new Date().toISOString().slice(0, 10), descripcion: '' }
    await cargar()
  } catch (e) {
    console.error('❌ [Contabilidad] Error agregar gasto:', e)
    alert(e.message || 'Error al agregar gasto')
  }
}

async function eliminarGasto(g) {
  if (!confirm('¿Eliminar este gasto?')) return
  try {
    const res = await fetch(apiUrl(`/api/admin/gastos/${g.id}`), { method: 'DELETE' })
    if (!res.ok) throw new Error('Error')
    await cargar()
  } catch (e) {
    console.error(e)
    alert('Error al eliminar')
  }
}

onMounted(() => cargar())
</script>
