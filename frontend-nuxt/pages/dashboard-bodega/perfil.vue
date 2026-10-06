<template>
  <div class="text-slate-900">
    <h1 class="text-3xl font-black text-teal-800 tracking-tight mb-2">Mi perfil</h1>
    <p class="text-slate-600 mb-6">Datos de tu cuenta de almacenamiento.</p>
    <p v-if="error" class="mb-4 text-sm text-red-600">{{ error }}</p>

    <div v-if="cliente" class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-lg space-y-4">
      <div>
        <p class="text-xs font-semibold text-slate-500 uppercase">Nombre</p>
        <p class="font-bold text-lg">{{ cliente.nombre }}</p>
      </div>
      <div>
        <p class="text-xs font-semibold text-slate-500 uppercase">Email</p>
        <p>{{ cliente.email || '—' }}</p>
      </div>
      <div>
        <p class="text-xs font-semibold text-slate-500 uppercase">Teléfono</p>
        <p>{{ cliente.telefono || '—' }}</p>
      </div>
      <div>
        <p class="text-xs font-semibold text-slate-500 uppercase">RUT</p>
        <p>{{ cliente.rut || '—' }}</p>
      </div>
      <div>
        <p class="text-xs font-semibold text-slate-500 uppercase">Dirección</p>
        <p>{{ cliente.direccion || '—' }}</p>
      </div>
      <p class="text-xs text-slate-400 pt-2 border-t border-slate-100">
        Para cambiar tu contraseña o datos, contacta a FletesPro. Tu acceso es exclusivo a tu inventario y pagos.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { clienteBodegaFetch, API_ENDPOINTS } from '~/composables/useBodegaApi.js'
definePageMeta({ layout: 'bodega-cliente' })

const cliente = ref(null)
const error = ref('')

onMounted(async () => {
  try {
    const data = await clienteBodegaFetch(API_ENDPOINTS.BODEGA_MI_PERFIL)
    cliente.value = data.cliente
  } catch (e) {
    error.value = e.message
  }
})
</script>
