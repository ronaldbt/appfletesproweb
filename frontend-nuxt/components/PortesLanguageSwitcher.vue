<template>
  <!-- Desktop: bottom-left -->
  <div class="fixed bottom-8 left-8 z-[80] hidden md:block">
    <div class="bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 flex items-center gap-2">
      <div class="bg-slate-900 text-teal-400 p-2 rounded-xl">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="flex gap-1 pr-2">
        <button
          v-for="lang in locales"
          :key="lang.code"
          @click="switchLanguage(lang.code)"
          :class="locale === lang.code 
            ? 'bg-teal-600 text-white shadow-lg' 
            : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'"
          class="px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest transition-all"
        >
          {{ languageMap[lang.code] || lang.code.toUpperCase() }}
        </button>
      </div>
    </div>
  </div>
  
  <!-- Mobile: top-right (debajo del navbar, no interfiere con WhatsApp) -->
  <div class="fixed top-20 right-4 z-[80] md:hidden">
    <div class="bg-white/95 backdrop-blur-xl p-1.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-slate-200 flex items-center gap-1.5">
      <div class="bg-slate-900 text-teal-400 p-1.5 rounded-lg">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="flex gap-0.5">
        <button
          v-for="lang in locales"
          :key="lang.code"
          @click="switchLanguage(lang.code)"
          :class="locale === lang.code 
            ? 'bg-teal-600 text-white shadow-md' 
            : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'"
          class="px-2 py-1 rounded-lg text-[9px] font-black tracking-widest transition-all active:scale-95"
        >
          {{ languageMap[lang.code] || lang.code.toUpperCase() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n()
const route = useRoute()
const switchLocalePath = useSwitchLocalePath()

const languageMap = {
  'es': 'ES',
  'en': 'EN'
}

const switchLanguage = (langCode) => {
  // Obtener la ruta actual sin el locale
  const currentPath = route.path
  const localeCodes = ['es', 'en']
  const pathSegments = currentPath.split('/').filter(Boolean)
  
  // Si el primer segmento es un locale, quitarlo para obtener la ruta base
  const pathWithoutLocale = localeCodes.includes(pathSegments[0])
    ? '/' + pathSegments.slice(1).join('/')
    : currentPath
  
  // Si la ruta sin locale está vacía o es solo '/', usar '/'
  const targetPath = !pathWithoutLocale || pathWithoutLocale === '/' ? '/' : pathWithoutLocale
  
  // Obtener la ruta con el nuevo locale
  // switchLocalePath obtiene automáticamente la ruta actual, pero necesitamos construir la ruta manualmente
  const newPath = langCode === 'es' 
    ? targetPath 
    : `/${langCode}${targetPath === '/' ? '' : targetPath}`
  
  // Navegar a la nueva ruta
  navigateTo(newPath)
}
</script>



