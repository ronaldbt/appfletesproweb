<template>
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2">
        <img src="/favicon.svg" alt="FletesPro" class="h-7 w-7" />
        <span class="text-xl font-extrabold text-green-700">FletesPro</span>
      </router-link>
      <nav class="flex items-center gap-4">
        <router-link to="/register" class="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700">Registrarse</router-link>
        <router-link to="/login" class="px-4 py-2 rounded-lg border border-green-600 text-green-700 font-semibold hover:bg-green-50">Ingresar</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
</style>




