<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- Hero -->
    <section class="bg-gradient-to-b from-green-50 to-white">
      <div class="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-green-700 leading-tight">
            Fletes rápidos, seguros y al mejor precio
          </h1>
          <p class="mt-4 text-gray-600 text-lg">
            Conecta con conductores verificados y gestiona tus fletes en minutos.
          </p>
          <div class="mt-6 flex gap-3">
            <router-link to="/register" class="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700">Comenzar ahora</router-link>
            <router-link to="/login" class="px-6 py-3 rounded-lg border border-green-600 text-green-700 font-semibold hover:bg-green-50">Ya tengo cuenta</router-link>
          </div>
        </div>
        <div class="bg-white border border-green-100 rounded-xl shadow-sm p-4">
          <FleteCalculator />
        </div>
      </div>
    </section>

    <!-- Beneficios -->
    <section class="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
      <div class="rounded-lg border border-gray-200 p-6 bg-white">
        <h3 class="font-bold text-green-700 mb-2">Conductores verificados</h3>
        <p class="text-gray-600 text-sm">Trabajamos con una red de conductores confiables y evaluados.</p>
      </div>
      <div class="rounded-lg border border-gray-200 p-6 bg-white">
        <h3 class="font-bold text-green-700 mb-2">Precios transparentes</h3>
        <p class="text-gray-600 text-sm">Calcula el costo de tu flete antes de confirmar la solicitud.</p>
      </div>
      <div class="rounded-lg border border-gray-200 p-6 bg-white">
        <h3 class="font-bold text-green-700 mb-2">Soporte en tiempo real</h3>
        <p class="text-gray-600 text-sm">Estamos disponibles para ayudarte en cada etapa del proceso.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import FleteCalculator from '../components/FleteCalculator.vue'
</script>
  