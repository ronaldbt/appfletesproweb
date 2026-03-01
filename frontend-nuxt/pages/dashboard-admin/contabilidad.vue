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

    <!-- Resumen -->
    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
      <h2 class="text-lg font-black text-slate-900 mb-4">Resumen</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Ingresos (fletes realizados)</p>
          <p class="text-2xl font-black text-slate-900">${{ resumen.ingresos.toLocaleString('es-CL') }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-teal-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Fletes realizados</p>
          <p class="text-2xl font-black text-teal-700">{{ resumen.cantidadFletes }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-amber-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Promedio por flete</p>
          <p class="text-2xl font-black text-amber-700">${{ resumen.promedioFlete.toLocaleString('es-CL') }}</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-xs font-bold text-slate-500 uppercase">Ganancia neta (aprox.)</p>
          <p class="text-xl font-black text-slate-900">${{ resumen.gananciaNeta.toLocaleString('es-CL') }}</p>
        </div>
      </div>
    </section>

    <!-- Fletes realizados (detalle) -->
    <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 class="text-lg font-black text-slate-900 mb-4">Fletes realizados</h2>
      <div class="overflow-x-auto rounded-xl border border-slate-200">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-slate-50 text-slate-700">
              <th class="px-4 py-3 text-left font-bold">Fecha</th>
              <th class="px-4 py-3 text-left font-bold">Origen → Destino</th>
              <th class="px-4 py-3 text-left font-bold">Cliente</th>
              <th class="px-4 py-3 text-left font-bold">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in fletesRealizados" :key="f.id" class="border-t border-slate-200 hover:bg-slate-50/80">
              <td class="px-4 py-3 text-slate-600">{{ formatDate(f.created_at || f.updated_at) }}</td>
              <td class="px-4 py-3 text-slate-800">{{ f.origen }} → {{ f.destino }}</td>
              <td class="px-4 py-3 text-slate-700">{{ f.cliente_nombre || f.cliente_telefono || '—' }}</td>
              <td class="px-4 py-3 font-bold text-slate-900">${{ (f.precio || 0).toLocaleString('es-CL') }}</td>
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

const periodo = ref('mes')
const stats = ref(null)
const fletesRealizados = ref([])

const resumen = computed(() => {
  const list = fletesRealizados.value
  const ingresos = list.reduce((s, f) => s + parseFloat(f.precio || 0), 0)
  const cantidad = list.length
  const promedioFlete = cantidad ? Math.round(ingresos / cantidad) : 0
  const gananciaNeta = Math.round(ingresos * 0.1)
  return {
    ingresos,
    cantidadFletes: cantidad,
    promedioFlete,
    gananciaNeta
  }
})

function formatDate(d) {
  if (!d) return '—'
  const date = new Date(d)
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

async function cargar() {
  try {
    const [statsRes, fletesRes] = await Promise.all([
      fetch(apiUrl('/api/admin/stats')),
      fetch(apiUrl('/api/admin/fletes?estado=completado'))
    ])
    const statsData = await statsRes.json()
    const fletesData = await fletesRes.json()
    stats.value = statsData
    let list = Array.isArray(fletesData) ? fletesData : []

    const now = new Date()
    if (periodo.value === 'semana') {
      const inicioSemana = new Date(now)
      inicioSemana.setDate(now.getDate() - now.getDay())
      inicioSemana.setHours(0, 0, 0, 0)
      list = list.filter(f => new Date(f.created_at || f.updated_at) >= inicioSemana)
    } else if (periodo.value === 'mes') {
      const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1)
      list = list.filter(f => new Date(f.created_at || f.updated_at) >= inicioMes)
    }

    fletesRealizados.value = list.sort((a, b) => new Date(b.created_at || b.updated_at) - new Date(a.created_at || a.updated_at))
  } catch (e) {
    console.error(e)
    fletesRealizados.value = []
  }
}

onMounted(() => cargar())
</script>
