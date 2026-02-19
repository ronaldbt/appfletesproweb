<template>
  <div id="app" class="min-h-screen flex flex-col bg-white text-gray-900">
    <PortesNavbar @get-quote="scrollToCalc" />
    <PortesLanguageSwitcher />
    <main class="flex-grow">
      <slot />
    </main>
    <PortesFooter />
    <WhatsAppButton />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from '#app'

const route = useRoute()

const scrollToCalc = () => {
  if (process.client) document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
}

const getUsuarioFromStorage = () => {
  if (process.client) {
    try {
      const datos = localStorage.getItem('usuario')
      return datos ? JSON.parse(datos) : null
    } catch { 
      return null 
    }
  }
  return null
}

const usuario = ref(getUsuarioFromStorage())

const onStorage = (e) => {
  if (e.key === 'usuario') {
    try { 
      usuario.value = e.newValue ? JSON.parse(e.newValue) : null 
    } catch { 
      usuario.value = null 
    }
  }
}

watch(route, () => {
  if (process.client) {
    usuario.value = getUsuarioFromStorage()
  }
}, { immediate: true })

onMounted(() => {
  if (process.client) {
    window.addEventListener('storage', onStorage)
    usuario.value = getUsuarioFromStorage()
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('storage', onStorage)
  }
})
</script>

<style>
body { background-color: #ffffff; }
a { text-decoration: none; }
@media print {
  .fixed.bottom-6.right-6, header, .header-bar, Header { display: none !important; }
  html, body, #app { background-color: #fff !important; color: #000 !important; width: 100% !important; height: auto !important; overflow: visible !important; margin: 0 !important; padding: 0 !important; }
  main { display: block !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
  aside, nav, .sidebar, [class*="sidebar"] { display: none !important; }
  @page { margin-top: 0 !important; margin-bottom: 0 !important; }
}
</style>
