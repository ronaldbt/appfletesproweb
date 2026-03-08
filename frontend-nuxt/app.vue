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
  titleTemplate: '%s | FletesPro'
})
</script>
