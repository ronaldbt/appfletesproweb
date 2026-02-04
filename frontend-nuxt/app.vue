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

// Mapeo de locales a atributos HTML lang
const langMap = {
  'es': 'es',
  'en': 'en',
  'sv': 'sv',
  'ru': 'ru'
}

useHead({
  htmlAttrs: computed(() => ({
    lang: langMap[locale.value] || 'es'
  })),
  titleTemplate: '%s | PortesPro'
})
</script>
