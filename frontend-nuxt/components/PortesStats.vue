<template>
  <section class="bg-white py-12 border-y border-slate-100">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(stat, i) in stats"
          :key="i"
          class="text-center"
        >
          <p class="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tighter">
            {{ stat.value }}
          </p>
          <p class="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, watch, ref, onMounted } from 'vue'

const { t, locale, locales, loadLocaleMessages, setLocale } = useI18n()
const { $i18n } = useNuxtApp()

console.log('🟢 [PortesStats] Locale actual:', locale.value)
console.log('🟢 [PortesStats] Available locales:', locales.value?.map(l => l.code) || [])
console.log('🟢 [PortesStats] Test translation:', t('components.stats.movesCompleted'))
console.log('🟢 [PortesStats] i18n global:', $i18n ? 'exists' : 'missing')
console.log('🟢 [PortesStats] i18n messages:', $i18n?.messages?.value ? Object.keys($i18n.messages.value) : 'no messages')
console.log('🟢 [PortesStats] Current locale messages:', $i18n?.messages?.value?.[locale.value] ? Object.keys($i18n.messages.value[locale.value]).slice(0, 5) : 'no messages for locale')

// Con lazy: false, las traducciones están disponibles desde el inicio
onMounted(() => {
  const testKey = 'components.stats.movesCompleted'
  const testTranslation = t(testKey)
  console.log('🟢 [PortesStats] Componente montado, traducción test:', testTranslation)
  console.log('🟢 [PortesStats] Mensajes disponibles:', $i18n?.messages?.value?.[locale.value] ? Object.keys($i18n.messages.value[locale.value]) : 'no messages')
})

const stats = computed(() => {
  // Forzar reactividad con locale.value
  const currentLocale = locale.value
  console.log('🟢 [PortesStats] Computed recalculando, locale:', currentLocale)
  
  return [
    { label: t('components.stats.movesCompleted'), value: '4k+' },
    { label: t('components.stats.yearsExperience'), value: '+10' },
    { label: t('components.stats.vipClients'), value: '134' },
    { label: t('components.stats.zonesCovered'), value: '100%' },
  ]
})

// Watch locale changes - con lazy: false, las traducciones están disponibles desde el inicio
watch(locale, (newLocale) => {
  console.log('🟢 [PortesStats] Locale cambió a:', newLocale)
  const testKey = 'components.stats.movesCompleted'
  const testTranslation = t(testKey)
  console.log('🟢 [PortesStats] Test translation después de cambio:', testTranslation)
  console.log('🟢 [PortesStats] Mensajes disponibles:', $i18n?.messages?.value?.[newLocale] ? Object.keys($i18n.messages.value[newLocale]) : 'no messages')
}, { immediate: true })
</script>



