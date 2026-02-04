<template>
  <nav aria-label="Breadcrumb" class="container mx-auto px-4 md:px-6 pt-24 pb-4">
    <ol class="flex items-center space-x-2">
      <li>
        <NuxtLink 
          :to="localePath('/')" 
          :class="isHomePage 
            ? 'text-teal-600 font-black' 
            : 'text-slate-500 hover:text-teal-600 font-medium'"
          class="text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group"
        >
          <svg 
            class="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>{{ $t('breadcrumbs.home') }}</span>
        </NuxtLink>
      </li>
      <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center">
        <svg class="w-3 h-3 text-slate-300 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <NuxtLink
          v-if="index < crumbs.length - 1"
          :to="localePath(crumb.path)"
          class="text-xs uppercase tracking-widest text-slate-500 hover:text-teal-600 font-medium transition-all duration-300"
        >
          {{ crumb.name }}
        </NuxtLink>
        <span 
          v-else 
          class="text-xs uppercase tracking-widest text-slate-900 font-black"
        >
          {{ crumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const { locale, locales } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const crumbs = computed(() => {
  // Filtrar el locale del path (es, en, sv, ru)
  const pathSegments = route.path.split('/').filter(Boolean)
  const localeCodes = ['es', 'en', 'sv', 'ru']
  
  // Si el primer segmento es un locale, ignorarlo
  const filteredSegments = localeCodes.includes(pathSegments[0]) 
    ? pathSegments.slice(1) 
    : pathSegments
  
  // Si no hay segmentos (estamos en la página principal), retornar vacío
  if (filteredSegments.length === 0) {
    return []
  }
  
  const breadcrumbs = []
  let currentPath = ''
  
  filteredSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbs.push({
      name: name,
      path: currentPath
    })
  })
  
  return breadcrumbs
})

// Verificar si estamos en la página principal
const isHomePage = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const localeCodes = ['es', 'en', 'sv', 'ru']
  
  // Si no hay segmentos, estamos en la raíz (/)
  if (pathSegments.length === 0) {
    return true
  }
  
  // Si solo hay un segmento y es un locale, estamos en la página principal
  if (pathSegments.length === 1 && localeCodes.includes(pathSegments[0])) {
    return true
  }
  
  // Si el primer segmento es un locale y no hay más segmentos, estamos en la página principal
  const filteredSegments = localeCodes.includes(pathSegments[0]) 
    ? pathSegments.slice(1) 
    : pathSegments
  
  // Si después de filtrar no hay segmentos, estamos en la página principal
  return filteredSegments.length === 0
})
</script>

