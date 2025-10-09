<template>
  <div id="app" class="min-h-screen bg-white text-gray-900">
    <HeaderBar v-if="!usuario" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import HeaderBar from './components/Header.vue'

const router = useRouter()
// Inicializar inmediatamente desde localStorage para evitar parpadeo del Header
const usuario = ref(null)
try {
  const datos = localStorage.getItem('usuario')
  usuario.value = datos ? JSON.parse(datos) : null
} catch { usuario.value = null }

// Mantener sincronizado si cambia desde otras pestañas
const onStorage = (e) => {
  if (e.key === 'usuario') {
    try { usuario.value = e.newValue ? JSON.parse(e.newValue) : null } catch { usuario.value = null }
  }
}

onMounted(() => {
  window.addEventListener('storage', onStorage)
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', onStorage)
})

function cerrarSesion() {
  localStorage.removeItem('usuario')
  router.push('/')
  location.reload()
}
</script>

<style>
body { background-color: #ffffff; }
a { text-decoration: none; }
</style>
