<template>
  <div id="app" class="min-h-screen bg-white text-gray-900">
    <HeaderBar v-if="!usuario" />
    <main>
      <router-view />
    </main>
    <!-- Botón flotante de WhatsApp para soporte (visible en todas las vistas) -->
    <WhatsAppButton />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HeaderBar from './components/Header.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'

const router = useRouter()
const route = useRoute()

// Función para obtener usuario del localStorage
const getUsuarioFromStorage = () => {
  try {
    const datos = localStorage.getItem('usuario')
    return datos ? JSON.parse(datos) : null
  } catch { 
    return null 
  }
}

// Inicializar usuario desde localStorage
const usuario = ref(getUsuarioFromStorage())

// Mantener sincronizado si cambia desde otras pestañas
const onStorage = (e) => {
  if (e.key === 'usuario') {
    try { 
      usuario.value = e.newValue ? JSON.parse(e.newValue) : null 
    } catch { 
      usuario.value = null 
    }
  }
}

// Actualizar usuario cuando cambia la ruta (para detectar login/logout)
watch(route, () => {
  usuario.value = getUsuarioFromStorage()
}, { immediate: true })

onMounted(() => {
  window.addEventListener('storage', onStorage)
  // Verificar usuario al montar
  usuario.value = getUsuarioFromStorage()
})

onBeforeUnmount(() => {
  window.removeEventListener('storage', onStorage)
})

function cerrarSesion() {
  localStorage.removeItem('usuario')
  usuario.value = null
  router.push('/')
}
</script>

<style>
body { background-color: #ffffff; }
a { text-decoration: none; }

/* Ajustes globales para impresión de documentos (como la cotización) */
@media print {
  /* Ocultar botón flotante de WhatsApp en PDF */
  .fixed.bottom-6.right-6 {
    display: none !important;
  }

  /* Ocultar header en impresión */
  header,
  .header-bar,
  HeaderBar {
    display: none !important;
  }

  /* Evitar fondos raros en impresión */
  html, body, #app {
    background-color: #ffffff !important;
    color: #000000 !important;
    width: 100% !important;
    height: auto !important;
    overflow: visible !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Asegurar que el contenido principal sea visible */
  main {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Ocultar sidebar y elementos de navegación */
  aside,
  nav,
  .sidebar,
  [class*="sidebar"] {
    display: none !important;
  }

  /* Eliminar encabezados y pies de página del navegador */
  @page {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
}
</style>
