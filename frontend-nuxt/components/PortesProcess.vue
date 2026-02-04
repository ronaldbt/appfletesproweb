<template>
  <section class="py-32 bg-white overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
        <div class="max-w-2xl">
          <span class="text-teal-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">{{ $t('components.process.tag') }}</span>
          <h2 class="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter leading-none">
            {{ $t('components.process.title') }}
          </h2>
        </div>
        <p class="text-slate-500 font-medium max-w-sm lg:text-right">
          {{ $t('components.process.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all group relative overflow-hidden"
        >
          <div class="absolute -top-10 -right-10 text-slate-200/50 font-black text-9xl group-hover:text-teal-500/10 transition-colors">
            {{ i + 1 }}
          </div>
          <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-all">
            <component :is="step.iconComponent" :size="24" />
          </div>
          <h3 class="text-xl font-black text-slate-900 mb-4 tracking-tight">{{ step.title }}</h3>
          <p class="text-slate-500 text-sm leading-relaxed font-medium">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { h, computed, watch, ref, onMounted } from 'vue'

const { t, locale, waitForPendingLocaleChange } = useI18n()
const isReady = ref(false)

console.log('🟢 [PortesProcess] Locale actual:', locale.value)

// Esperar a que las traducciones se carguen
onMounted(async () => {
  try {
    await waitForPendingLocaleChange()
    isReady.value = true
    console.log('🟢 [PortesProcess] Traducciones cargadas, test:', t('components.process.title'))
  } catch (e) {
    console.error('🟢 [PortesProcess] Error cargando traducciones:', e)
    isReady.value = true
  }
})

// Watch locale changes y esperar a que se carguen las traducciones
watch(locale, async (newLocale) => {
  console.log('🟢 [PortesProcess] Locale cambió a:', newLocale)
  isReady.value = false
  try {
    await waitForPendingLocaleChange()
    isReady.value = true
    console.log('🟢 [PortesProcess] Nuevas traducciones cargadas para:', newLocale)
  } catch (e) {
    console.error('🟢 [PortesProcess] Error cargando traducciones:', e)
    isReady.value = true
  }
}, { immediate: true })

const createIcon = (path) => (props) => h('svg', { class: `w-${props.size || 6} h-${props.size || 6}`, fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: path })
])

const IconClipboardCheck = createIcon('M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4')
const IconPackageSearch = createIcon('M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4')
const IconTruck = createIcon('M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z')
const IconKey = createIcon('M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z')

const steps = computed(() => {
  // Forzar reactividad con locale.value
  const currentLocale = locale.value
  console.log('🟢 [PortesProcess] Computed recalculando, locale:', currentLocale)
  
  return [
    {
      iconComponent: IconClipboardCheck,
      title: t('components.process.step1Title'),
      desc: t('components.process.step1Desc')
    },
    {
      iconComponent: IconPackageSearch,
      title: t('components.process.step2Title'),
      desc: t('components.process.step2Desc')
    },
    {
      iconComponent: IconTruck,
      title: t('components.process.step3Title'),
      desc: t('components.process.step3Desc')
    },
    {
      iconComponent: IconKey,
      title: t('components.process.step4Title'),
      desc: t('components.process.step4Desc')
    }
  ]
})
</script>



