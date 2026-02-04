<template>
  <section id="servicios" class="py-24 bg-white relative overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-extrabold text-slate-900 mb-4">
          {{ $t('components.features.title') }}
        </h2>
        <div class="h-1.5 bg-teal-500 mx-auto rounded-full w-24" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(f, idx) in features"
          :key="idx"
          class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
        >
          <div :class="`${f.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md`">
            <component :is="f.iconComponent" class="w-8 h-8" />
          </div>
          <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ f.title }}</h3>
          <p class="text-slate-500 leading-relaxed font-medium">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h, computed, watch, ref, onMounted } from 'vue'

const { t, locale, waitForPendingLocaleChange } = useI18n()
const isReady = ref(false)

console.log('🟢 [PortesFeatures] Locale actual:', locale.value)

// Esperar a que las traducciones se carguen
onMounted(async () => {
  try {
    await waitForPendingLocaleChange()
    isReady.value = true
    console.log('🟢 [PortesFeatures] Traducciones cargadas, test:', t('components.features.title'))
  } catch (e) {
    console.error('🟢 [PortesFeatures] Error cargando traducciones:', e)
    isReady.value = true
  }
})

// Watch locale changes y esperar a que se carguen las traducciones
watch(locale, async (newLocale) => {
  console.log('🟢 [PortesFeatures] Locale cambió a:', newLocale)
  isReady.value = false
  try {
    await waitForPendingLocaleChange()
    isReady.value = true
    console.log('🟢 [PortesFeatures] Nuevas traducciones cargadas para:', newLocale)
  } catch (e) {
    console.error('🟢 [PortesFeatures] Error cargando traducciones:', e)
    isReady.value = true
  }
}, { immediate: true })

const IconLanguages = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' })
])

const IconTruck = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const IconPackage = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const IconRuler = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' })
])

const IconShield = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
])

const IconClock = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const features = computed(() => {
  // Forzar reactividad con locale.value
  const currentLocale = locale.value
  console.log('🟢 [PortesFeatures] Computed recalculando, locale:', currentLocale)
  
  return [
    {
      iconComponent: IconLanguages,
      title: t('components.features.trilingualDrivers'),
      desc: t('components.features.trilingualDriversDesc'),
      color: 'bg-teal-600 text-white'
    },
    {
      iconComponent: IconTruck,
      title: t('components.features.portesMudanzas'),
      desc: t('components.features.portesMudanzasDesc'),
      color: 'bg-slate-900 text-white'
    },
    {
      iconComponent: IconPackage,
      title: t('components.features.packingOnDemand'),
      desc: t('components.features.packingOnDemandDesc'),
      color: 'bg-teal-50 text-teal-600'
    },
    {
      iconComponent: IconRuler,
      title: t('components.features.flexibleCapacity'),
      desc: t('components.features.flexibleCapacityDesc'),
      color: 'bg-slate-100 text-slate-600'
    },
    {
      iconComponent: IconShield,
      title: t('components.features.insurance'),
      desc: t('components.features.insuranceDesc'),
      color: 'bg-teal-100 text-teal-700'
    },
    {
      iconComponent: IconClock,
      title: t('components.features.realTimeTracking'),
      desc: t('components.features.realTimeTrackingDesc'),
      color: 'bg-slate-200 text-slate-900'
    }
  ]
})
</script>



