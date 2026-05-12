<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { locale } = useI18n()

// Mapeo de locales a atributos HTML lang (es-CL para Chile)
const langMap = {
  'es': 'es-CL',
  'en': 'en',
  'sv': 'sv',
  'ru': 'ru'
}

useHead({
  htmlAttrs: computed(() => ({
    lang: langMap[locale.value] || 'es-CL'
  })),
  // Evita "… | FletesPro | FletesPro" si la página ya incluye la marca al final
  titleTemplate: (titleChunk) => {
    const t = titleChunk != null ? String(titleChunk).trim() : ''
    if (!t) return 'FletesPro'
    if (/\|\s*FletesPro\s*$/i.test(t) || /[-–]\s*FletesPro\s*$/i.test(t)) return t
    return `${t} | FletesPro`
  }
})
</script>
