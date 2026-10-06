<template>
  <div class="text-slate-900">
    <div class="mb-8">
      <h1 class="text-3xl font-black text-teal-800 tracking-tight mb-2">Bodega</h1>
      <p class="text-slate-600 max-w-2xl">
        Administración multitenant de guardamuebles: sedes, clientes con acceso propio, contratos, inventario con fotos y cobros.
      </p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
      <div v-for="s in statCards" :key="s.label" class="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">{{ s.label }}</p>
        <p class="text-2xl font-black text-teal-800 mt-1">{{ s.value }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <NuxtLink
        v-for="card in cards"
        :key="card.to"
        :to="card.to"
        class="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-teal-300 hover:shadow-md transition-all"
      >
        <h2 class="font-bold text-slate-900 mb-1 group-hover:text-teal-800">{{ card.title }}</h2>
        <p class="text-sm text-slate-500">{{ card.desc }}</p>
      </NuxtLink>
    </div>

    <div class="bg-teal-50 border border-teal-100 rounded-2xl p-5 text-sm text-teal-950">
      <p class="font-semibold mb-1">Flujo rápido</p>
      <ol class="list-decimal ml-4 space-y-1 text-teal-900/90">
        <li>Crea una <NuxtLink to="/dashboard-admin/bodega/bodegas" class="underline font-medium">bodega/sede</NuxtLink>.</li>
        <li>Crea un <NuxtLink to="/dashboard-admin/bodega/usuarios" class="underline font-medium">cliente</NuxtLink> con email y contraseña.</li>
        <li>Asocia un <NuxtLink to="/dashboard-admin/bodega/contratos" class="underline font-medium">contrato</NuxtLink> y registra <NuxtLink to="/dashboard-admin/bodega/almacenaje" class="underline font-medium">ítems + fotos</NuxtLink>.</li>
        <li>Genera <NuxtLink to="/dashboard-admin/bodega/pagos" class="underline font-medium">cuotas</NuxtLink>. El cliente ve todo en <code class="bg-white/70 px-1 rounded">/dashboard-bodega</code>.</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { adminBodegaFetch, API_ENDPOINTS } from '~/composables/useBodegaApi.js'

definePageMeta({ layout: 'admin' })

const stats = ref({
  bodegasActivas: 0,
  clientesActivos: 0,
  itemsAlmacenados: 0,
  cuotasPendientes: 0,
  contratosActivos: 0
})

const statCards = computed(() => [
  { label: 'Bodegas', value: stats.value.bodegasActivas },
  { label: 'Clientes', value: stats.value.clientesActivos },
  { label: 'Contratos', value: stats.value.contratosActivos },
  { label: 'Ítems', value: stats.value.itemsAlmacenados },
  { label: 'Cuotas pend.', value: stats.value.cuotasPendientes }
])

const cards = [
  { title: 'Bodegas', desc: 'Sedes, capacidad y estado.', to: '/dashboard-admin/bodega/bodegas' },
  { title: 'Usuarios', desc: 'Clientes con login propio (tenant).', to: '/dashboard-admin/bodega/usuarios' },
  { title: 'Almacenaje', desc: 'Ítems, fotos y ubicación.', to: '/dashboard-admin/bodega/almacenaje' },
  { title: 'Contratos', desc: 'Tarifa, unidad y vigencia.', to: '/dashboard-admin/bodega/contratos' },
  { title: 'Pagos bodega', desc: 'Cuotas, vencimientos y mora.', to: '/dashboard-admin/bodega/pagos' }
]

onMounted(async () => {
  try {
    stats.value = await adminBodegaFetch(API_ENDPOINTS.ADMIN_BODEGA_STATS)
  } catch (_) {}
})
</script>
