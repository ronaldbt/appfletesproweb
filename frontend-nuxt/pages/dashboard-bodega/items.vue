<template>
  <div class="text-slate-900">
    <h1 class="text-3xl font-black text-teal-800 tracking-tight mb-2">Mis cosas</h1>
    <p class="text-slate-600 mb-6">Inventario de lo que tienes almacenado con nosotros.</p>
    <p v-if="error" class="mb-4 text-sm text-red-600">{{ error }}</p>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <article v-for="item in items" :key="item.id" class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div class="aspect-video bg-slate-100 overflow-hidden">
          <img
            v-if="item.fotos?.[0]?.url"
            :src="bodegaMediaUrl(item.fotos[0].url)"
            :alt="item.nombre"
            class="w-full h-full object-cover"
          >
          <div v-else class="w-full h-full flex items-center justify-center text-slate-400 text-sm">Sin foto</div>
        </div>
        <div class="p-4">
          <h2 class="font-bold">{{ item.nombre }}</h2>
          <p class="text-sm text-slate-500 mt-1">{{ item.descripcion || 'Sin descripción' }}</p>
          <p class="text-xs text-slate-400 mt-2">{{ item.ubicacion || 'Ubicación n/d' }} · {{ item.codigo_etiqueta || 'Sin código' }}</p>
          <div v-if="item.fotos?.length > 1" class="flex gap-2 mt-3 overflow-x-auto">
            <img
              v-for="f in item.fotos.slice(0, 4)"
              :key="f.id"
              :src="bodegaMediaUrl(f.url)"
              class="w-14 h-14 rounded-lg object-cover border border-slate-200"
              alt=""
            >
          </div>
        </div>
      </article>
    </div>
    <p v-if="!loading && !items.length" class="text-center text-slate-400 py-12">Aún no hay ítems registrados a tu nombre.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { clienteBodegaFetch, API_ENDPOINTS, bodegaMediaUrl } from '~/composables/useBodegaApi.js'
definePageMeta({ layout: 'bodega-cliente' })

const items = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const data = await clienteBodegaFetch(API_ENDPOINTS.BODEGA_MI_ITEMS)
    items.value = data.items || []
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>
