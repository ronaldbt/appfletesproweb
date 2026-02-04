<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <PortesNavbar @get-quote="scrollToCalc" />
    
    <PortesLanguageSwitcher :current-lang="lang" @lang-change="lang = $event" />

    <main class="flex-grow">
      <Breadcrumbs />
      <!-- Hero Section with Calculator -->
      <section class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              {{ $t('pages.guardamuebles.hero.badge') }}
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              {{ $t('pages.guardamuebles.hero.title') }}
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              {{ $t('pages.guardamuebles.hero.subtitle') }}
            </p>
          </div>

          <div class="animate-slide-up">
            <GuardamueblesCalculator />
          </div>
        </div>
      </section>

      <!-- Pickup Service Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.guardamuebles.pickupService.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.guardamuebles.pickupService.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="grid md:grid-cols-2 gap-6">
              <div
                v-for="(feature, idx) in pickupFeatures"
                :key="idx"
                class="p-8 rounded-[2.5rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl transition-all"
              >
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p class="text-slate-700 font-medium text-lg">{{ feature }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Online Platform Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.guardamuebles.onlinePlatform.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.guardamuebles.onlinePlatform.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="grid md:grid-cols-2 gap-6">
              <div
                v-for="(feature, idx) in onlineFeatures"
                :key="idx"
                class="p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-xl transition-all"
              >
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p class="text-slate-700 font-medium text-lg">{{ feature }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.guardamuebles.sizes.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.guardamuebles.sizes.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div
              v-for="(size, idx) in tamanos"
              :key="idx"
              class="p-8 rounded-[2.5rem] border-2 border-slate-100 bg-white hover:border-teal-600 hover:shadow-2xl hover:shadow-teal-100/40 transition-all group"
            >
              <div class="text-4xl font-black text-teal-600 mb-4">{{ size.metros }}</div>
              <h3 class="text-xl font-black text-slate-900 mb-2 tracking-tight">{{ size.title }}</h3>
              <p class="text-slate-500 text-sm font-medium mb-6">{{ size.desc }}</p>
              <div class="text-2xl font-black text-slate-900 mb-2">{{ size.precio }}</div>
              <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">mensual</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Types Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.guardamuebles.types.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.guardamuebles.types.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(type, idx) in types"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="type.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ type.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ type.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.guardamuebles.pricing.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.guardamuebles.pricing.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="grid md:grid-cols-2 gap-6">
              <div
                v-for="(info, idx) in pricingInfo"
                :key="idx"
                class="p-8 rounded-2xl border border-slate-100 bg-slate-50 text-center"
              >
                <p class="text-slate-700 font-medium text-lg">{{ info }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.guardamuebles.features.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.guardamuebles.features.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(feature, idx) in features"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="feature.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ feature.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Use Cases Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.guardamuebles.useCases.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.guardamuebles.useCases.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div
              v-for="(useCase, idx) in useCases"
              :key="idx"
              class="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
            >
              <div class="text-5xl font-black text-teal-600 mb-4">{{ idx + 1 }}</div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ useCase.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ useCase.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Zones Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.guardamuebles.zones.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.guardamuebles.zones.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                v-for="(zone, idx) in zones"
                :key="idx"
                class="bg-white p-6 rounded-2xl border border-slate-100 text-center hover:bg-teal-50 transition-all"
              >
                <p class="font-black text-slate-900 text-lg">{{ zone }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section id="hero-calculator" class="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.05] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
              {{ $t('pages.guardamuebles.cta.title') }}
            </h2>
            <p class="text-xl text-slate-300 mb-12 font-medium">
              {{ $t('pages.guardamuebles.cta.subtitle') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                @click="scrollToCalc"
                class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                {{ $t('pages.guardamuebles.cta.button1') }}
              </button>
              <button
                @click="scrollToCalc"
                class="bg-white hover:bg-slate-100 text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                {{ $t('pages.guardamuebles.cta.button2') }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQs Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.guardamuebles.faqs.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.guardamuebles.faqs.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto space-y-6">
            <div
              v-for="(faq, idx) in faqs"
              :key="idx"
              class="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"
            >
              <button
                @click="faq.open = !faq.open"
                class="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-100 transition-all"
              >
                <h3 class="text-lg font-black text-slate-900 pr-8">{{ faq.question }}</h3>
                <svg
                  :class="['w-6 h-6 text-teal-600 transition-transform flex-shrink-0', faq.open ? 'rotate-180' : '']"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-screen"
                leave-active-class="transition-all duration-300"
                leave-from-class="opacity-100 max-h-screen"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="faq.open" class="px-8 pb-6">
                  <p class="text-slate-600 leading-relaxed font-medium">{{ faq.answer }}</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>

      <PortesStats />
      <PortesTestimonials />
    </main>

    <PortesFooter />

    <div class="fixed top-0 left-0 w-full h-full -z-40 pointer-events-none opacity-30 overflow-hidden">
      <div class="absolute top-1/4 -right-1/4 w-[700px] h-[700px] bg-teal-200/20 rounded-full blur-[180px] animate-float-1" />
      <div class="absolute bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-slate-300/40 rounded-full blur-[180px] animate-float-2" />
    </div>
  </div>
</template>

<script setup>
import { ref, h, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const lang = ref('es')

const scrollToCalc = () => {
  if (process.client) {
    document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
}

// SEO Meta Tags
const siteUrl = 'https://app.fletespro.cl'
const currentUrl = `${siteUrl}/guardamuebles`
const defaultImage = `${siteUrl}/og-image.jpg`

useHead(() => ({
  title: `${t('pages.guardamuebles.hero.title')} | FletesPro`,
  meta: [
    {
      name: 'description',
      content: t('pages.guardamuebles.description')
    },
    {
      name: 'keywords',
      content: 'bodegaje Santiago, arriendo bodega Santiago, bodegaje Región Metropolitana, guardar muebles Santiago, arriendo bodega guardar cosas, mini bodegas Santiago, bodegaje precios, precio bodegaje mes, almacenamiento Santiago, bodegas particulares, bodegas empresas, bodegaje con mudanza, self storage Santiago, espacios almacenamiento Región Metropolitana'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: `${t('pages.guardamuebles.hero.title')} | FletesPro` },
    { property: 'og:description', content: t('pages.guardamuebles.description') },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: `${t('pages.guardamuebles.hero.title')} | FletesPro` },
    { name: 'twitter:description', content: t('pages.guardamuebles.description') },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [
    { rel: 'canonical', href: currentUrl }
  ]
}))

// Iconos
const IconTemperature = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
])

const IconShield = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
])

const IconLock = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' })
])

const IconCamera = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 13a3 3 0 11-6 0 3 3 0 016 0z' })
])

const IconClock = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const IconKey = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' })
])

const IconBox = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const IconHome = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
])

const IconBuilding = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
])

const IconPuzzle = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' })
])

const IconStorage = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' })
])

// Pickup Service Features
const pickupFeatures = computed(() => [
  t('pages.guardamuebles.pickupService.feature1'),
  t('pages.guardamuebles.pickupService.feature2'),
  t('pages.guardamuebles.pickupService.feature3'),
  t('pages.guardamuebles.pickupService.feature4')
])

// Online Platform Features
const onlineFeatures = computed(() => [
  t('pages.guardamuebles.onlinePlatform.feature1'),
  t('pages.guardamuebles.onlinePlatform.feature2'),
  t('pages.guardamuebles.onlinePlatform.feature3'),
  t('pages.guardamuebles.onlinePlatform.feature4')
])

// Tamaños
const tamanos = computed(() => [
  {
    metros: t('pages.guardamuebles.sizes.size1.metros'),
    title: t('pages.guardamuebles.sizes.size1.title'),
    desc: t('pages.guardamuebles.sizes.size1.description'),
    precio: t('pages.guardamuebles.sizes.size1.price')
  },
  {
    metros: t('pages.guardamuebles.sizes.size2.metros'),
    title: t('pages.guardamuebles.sizes.size2.title'),
    desc: t('pages.guardamuebles.sizes.size2.description'),
    precio: t('pages.guardamuebles.sizes.size2.price')
  },
  {
    metros: t('pages.guardamuebles.sizes.size3.metros'),
    title: t('pages.guardamuebles.sizes.size3.title'),
    desc: t('pages.guardamuebles.sizes.size3.description'),
    precio: t('pages.guardamuebles.sizes.size3.price')
  },
  {
    metros: t('pages.guardamuebles.sizes.size4.metros'),
    title: t('pages.guardamuebles.sizes.size4.title'),
    desc: t('pages.guardamuebles.sizes.size4.description'),
    precio: t('pages.guardamuebles.sizes.size4.price')
  },
  {
    metros: t('pages.guardamuebles.sizes.size5.metros'),
    title: t('pages.guardamuebles.sizes.size5.title'),
    desc: t('pages.guardamuebles.sizes.size5.description'),
    precio: t('pages.guardamuebles.sizes.size5.price')
  },
  {
    metros: t('pages.guardamuebles.sizes.size6.metros'),
    title: t('pages.guardamuebles.sizes.size6.title'),
    desc: t('pages.guardamuebles.sizes.size6.description'),
    precio: t('pages.guardamuebles.sizes.size6.price')
  }
])

// Types
const types = computed(() => [
  {
    icon: IconBox,
    title: t('pages.guardamuebles.types.type1.title'),
    description: t('pages.guardamuebles.types.type1.description')
  },
  {
    icon: IconHome,
    title: t('pages.guardamuebles.types.type2.title'),
    description: t('pages.guardamuebles.types.type2.description')
  },
  {
    icon: IconBuilding,
    title: t('pages.guardamuebles.types.type3.title'),
    description: t('pages.guardamuebles.types.type3.description')
  },
  {
    icon: IconPuzzle,
    title: t('pages.guardamuebles.types.type4.title'),
    description: t('pages.guardamuebles.types.type4.description')
  },
  {
    icon: IconStorage,
    title: t('pages.guardamuebles.types.type5.title'),
    description: t('pages.guardamuebles.types.type5.description')
  }
])

// Pricing Info
const pricingInfo = computed(() => [
  t('pages.guardamuebles.pricing.info1'),
  t('pages.guardamuebles.pricing.info2'),
  t('pages.guardamuebles.pricing.info3'),
  t('pages.guardamuebles.pricing.info4')
])

// Features
const features = computed(() => [
  {
    icon: IconTemperature,
    title: t('pages.guardamuebles.features.feature1.title'),
    desc: t('pages.guardamuebles.features.feature1.description')
  },
  {
    icon: IconShield,
    title: t('pages.guardamuebles.features.feature2.title'),
    desc: t('pages.guardamuebles.features.feature2.description')
  },
  {
    icon: IconClock,
    title: t('pages.guardamuebles.features.feature3.title'),
    desc: t('pages.guardamuebles.features.feature3.description')
  },
  {
    icon: IconKey,
    title: t('pages.guardamuebles.features.feature4.title'),
    desc: t('pages.guardamuebles.features.feature4.description')
  },
  {
    icon: IconLock,
    title: t('pages.guardamuebles.features.feature5.title'),
    desc: t('pages.guardamuebles.features.feature5.description')
  },
  {
    icon: IconCamera,
    title: t('pages.guardamuebles.features.feature6.title'),
    desc: t('pages.guardamuebles.features.feature6.description')
  }
])

// Use Cases
const useCases = computed(() => [
  {
    title: t('pages.guardamuebles.useCases.case1.title'),
    desc: t('pages.guardamuebles.useCases.case1.description')
  },
  {
    title: t('pages.guardamuebles.useCases.case2.title'),
    desc: t('pages.guardamuebles.useCases.case2.description')
  },
  {
    title: t('pages.guardamuebles.useCases.case3.title'),
    desc: t('pages.guardamuebles.useCases.case3.description')
  },
  {
    title: t('pages.guardamuebles.useCases.case4.title'),
    desc: t('pages.guardamuebles.useCases.case4.description')
  }
])

// Zones
const zones = computed(() => [
  t('pages.guardamuebles.zones.zone1'),
  t('pages.guardamuebles.zones.zone2'),
  t('pages.guardamuebles.zones.zone3'),
  t('pages.guardamuebles.zones.zone4'),
  t('pages.guardamuebles.zones.zone5'),
  t('pages.guardamuebles.zones.zone6'),
  t('pages.guardamuebles.zones.zone7'),
  t('pages.guardamuebles.zones.zone8')
])

// FAQs
const faqs = computed(() => [
  {
    question: t('pages.guardamuebles.faqs.faq1.question'),
    answer: t('pages.guardamuebles.faqs.faq1.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq2.question'),
    answer: t('pages.guardamuebles.faqs.faq2.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq3.question'),
    answer: t('pages.guardamuebles.faqs.faq3.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq4.question'),
    answer: t('pages.guardamuebles.faqs.faq4.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq5.question'),
    answer: t('pages.guardamuebles.faqs.faq5.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq6.question'),
    answer: t('pages.guardamuebles.faqs.faq6.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq7.question'),
    answer: t('pages.guardamuebles.faqs.faq7.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq8.question'),
    answer: t('pages.guardamuebles.faqs.faq8.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq9.question'),
    answer: t('pages.guardamuebles.faqs.faq9.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq10.question'),
    answer: t('pages.guardamuebles.faqs.faq10.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq11.question'),
    answer: t('pages.guardamuebles.faqs.faq11.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq12.question'),
    answer: t('pages.guardamuebles.faqs.faq12.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq13.question'),
    answer: t('pages.guardamuebles.faqs.faq13.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq14.question'),
    answer: t('pages.guardamuebles.faqs.faq14.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq15.question'),
    answer: t('pages.guardamuebles.faqs.faq15.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq16.question'),
    answer: t('pages.guardamuebles.faqs.faq16.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq17.question'),
    answer: t('pages.guardamuebles.faqs.faq17.answer'),
    open: false
  },
  {
    question: t('pages.guardamuebles.faqs.faq18.question'),
    answer: t('pages.guardamuebles.faqs.faq18.answer'),
    open: false
  }
])
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-1 {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(80px, -40px);
  }
  66% {
    transform: translate(-40px, 80px);
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-60px, 100px);
  }
  66% {
    transform: translate(100px, -60px);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out 0.3s both;
}

.animate-float-1 {
  animation: float-1 25s infinite linear;
}

.animate-float-2 {
  animation: float-2 30s infinite linear;
}
</style>
