<template>
  <div class="overflow-x-hidden" :class="selectionClass">
    <Breadcrumbs />
    <!-- Hero + Calculadora: variante por defecto (teal) o las-condes (amber) -->
    <section
      id="hero-calculator"
      class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden"
      :class="heroSectionClass"
    >
      <!-- Decoración según variante -->
      <div v-if="variant === 'las-condes'" class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl" />
        <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
      </div>
      <div v-else-if="variant === 'buin'" class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-64 bg-emerald-500/[0.04] rounded-b-[50%]" />
        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400/40 via-emerald-500/60 to-emerald-400/40" />
      </div>
      <div v-else-if="variant === 'cerro-navia'" class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-violet-200/20 blur-3xl" />
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400/30 via-violet-500/50 to-violet-400/30" />
      </div>
      <div v-else-if="variant === 'colina'" class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 rounded-full bg-sky-200/15 blur-3xl" />
        <div class="absolute bottom-0 right-0 left-0 h-px bg-gradient-to-r from-sky-300/40 via-sky-500/50 to-sky-300/40" />
      </div>
      <div v-else-if="variant === 'conchali'" class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 right-1/3 w-72 h-72 rounded-full bg-rose-200/20 blur-3xl" />
        <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-300/40 via-rose-500/50 to-rose-300/40" />
      </div>
      <div v-else-if="variant === 'chicureo'" class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-[110%] h-48 bg-cyan-500/[0.05] rounded-b-[40%]" />
        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400/30 via-cyan-500/50 to-cyan-400/30" />
      </div>
      <div v-else class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />

      <div class="container mx-auto px-4 relative z-10">
        <div
          class="mb-16 animate-fade-in max-w-4xl"
          :class="heroContentAlign"
        >
          <span
            v-if="hero.tagline"
            class="inline-block px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border"
            :class="heroTaglineClass"
          >
            {{ hero.tagline }}
          </span>
          <h1
            class="font-black text-slate-950 leading-tight tracking-tight mb-8"
            :class="heroTitleClass"
          >
            {{ hero.title }}
          </h1>
          <p
            class="text-lg max-w-2xl font-medium"
            :class="heroIntroClass"
          >
            {{ hero.intro }}
          </p>
          <p
            v-if="hero.introExtra"
            class="mt-4 text-base text-slate-600 max-w-2xl mx-auto"
            :class="heroExtraAlign"
          >
            {{ hero.introExtra }}
          </p>
        </div>
        <div class="animate-slide-up">
          <ClientOnly>
            <PortesCalculator :is-hero="true" />
            <template #fallback>
              <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 animate-pulse">
                <div class="h-10 bg-slate-200 rounded-xl w-2/3 mb-6" />
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div class="h-12 bg-slate-100 rounded-xl" />
                  <div class="h-12 bg-slate-100 rounded-xl" />
                </div>
                <div class="aspect-[3/2] bg-slate-100 rounded-2xl" />
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </section>

    <slot />

    <FletesBodegajeCta
      v-if="crossSellBodegaje"
      :comuna-label="crossSellBodegaje.label"
      :to="crossSellBodegaje.to"
    />

    <PortesStats />
    <FletesLocalAuthority
      v-if="showLocalAuthority"
      :title="localAuthority?.title"
      :eyebrow="localAuthority?.eyebrow"
      :manager-name="localAuthority?.managerName"
      :manager-role="localAuthority?.managerRole"
      :history="localAuthority?.history"
      :extra="localAuthority?.extra"
      :image-src="localAuthority?.imageSrc"
      :image-alt="localAuthority?.imageAlt"
    />
    <PortesTestimonials />
  </div>
</template>

<script setup>
import { getBodegajeSlugForFletePath, getBodegajeComunaBySlug, normalizeRoutePathForLocale } from '~/config/bodegajeComunas.js'

const route = useRoute()
const localePath = useLocalePath()

const crossSellBodegaje = computed(() => {
  const slug = getBodegajeSlugForFletePath(normalizeRoutePathForLocale(route.path))
  if (!slug) {
    return null
  }
  const row = getBodegajeComunaBySlug(slug)
  if (!row) {
    return null
  }
  return {
    label: row.comunaLabel,
    to: localePath(`/bodegaje/${slug}`)
  }
})

const props = defineProps({
  hero: {
    type: Object,
    required: true,
    default: () => ({ tagline: '', title: '', intro: '', introExtra: '' })
  },
  variant: {
    type: String,
    default: ''
  },
  showLocalAuthority: {
    type: Boolean,
    default: true
  },
  localAuthority: {
    type: Object,
    default: null
  }
})

const variantStyles = {
  'las-condes': { selection: 'selection:bg-amber-100 selection:text-slate-900', heroBg: 'bg-gradient-to-br from-slate-50 via-white to-amber-50/30', align: 'md:text-left text-center', tagline: 'bg-white/90 text-amber-800 border-amber-200/60', title: 'text-4xl md:text-6xl lg:text-7xl', intro: 'md:text-xl text-slate-600 md:mr-0 mx-auto', extraAlign: 'md:mr-0' },
  'buin': { selection: 'selection:bg-emerald-100 selection:text-slate-900', heroBg: 'bg-gradient-to-b from-slate-50 to-emerald-50/20', align: 'text-center mx-auto', tagline: 'bg-white/95 text-emerald-800 border-emerald-200/60', title: 'text-4xl md:text-6xl lg:text-7xl', intro: 'md:text-xl text-slate-600 mx-auto', extraAlign: 'md:mr-0' },
  'cerro-navia': { selection: 'selection:bg-violet-100 selection:text-slate-900', heroBg: 'bg-gradient-to-b from-slate-50 to-violet-50/20', align: 'text-center mx-auto', tagline: 'bg-white/95 text-violet-800 border-violet-200/60', title: 'text-4xl md:text-6xl lg:text-7xl', intro: 'md:text-xl text-slate-600 mx-auto', extraAlign: '' },
  'colina': { selection: 'selection:bg-sky-100 selection:text-slate-900', heroBg: 'bg-gradient-to-b from-slate-50 to-sky-50/25', align: 'text-center mx-auto', tagline: 'bg-white/95 text-sky-800 border-sky-200/60', title: 'text-4xl md:text-6xl lg:text-7xl', intro: 'md:text-xl text-slate-600 mx-auto', extraAlign: '' },
  'conchali': { selection: 'selection:bg-rose-100 selection:text-slate-900', heroBg: 'bg-gradient-to-b from-slate-50 to-rose-50/20', align: 'text-center mx-auto', tagline: 'bg-white/95 text-rose-800 border-rose-200/60', title: 'text-4xl md:text-6xl lg:text-7xl', intro: 'md:text-xl text-slate-600 mx-auto', extraAlign: '' },
  'chicureo': { selection: 'selection:bg-cyan-100 selection:text-slate-900', heroBg: 'bg-gradient-to-b from-slate-50 to-cyan-50/20', align: 'text-center mx-auto', tagline: 'bg-white/95 text-cyan-800 border-cyan-200/60', title: 'text-4xl md:text-6xl lg:text-7xl', intro: 'md:text-xl text-slate-600 mx-auto', extraAlign: '' }
}

const v = computed(() => variantStyles[props.variant] || {})

const selectionClass = computed(() => v.value.selection || 'selection:bg-teal-100 selection:text-teal-900')
const heroSectionClass = computed(() => v.value.heroBg || 'bg-slate-50')
const heroContentAlign = computed(() => v.value.align || 'text-center mx-auto')
const heroTaglineClass = computed(() => v.value.tagline || 'bg-white text-teal-700 border-slate-200')
const heroTitleClass = computed(() => v.value.title || 'text-5xl md:text-8xl leading-[0.9] tracking-tighter')
const heroIntroClass = computed(() => v.value.intro || 'md:text-2xl text-slate-500 max-w-3xl mx-auto')
const heroExtraAlign = computed(() => v.value.extraAlign || '')
</script>
