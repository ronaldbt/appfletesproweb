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
          <div class="text-center mb-10 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm border border-slate-200">
              {{ $t('pages.embalajes.hero.badge') }}
            </span>
            <h1 class="text-3xl md:text-5xl font-black text-slate-950 leading-tight tracking-tighter mb-6">
              {{ $t('pages.embalajes.hero.title') }}
            </h1>
            <p class="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium mb-8">
              {{ $t('pages.embalajes.hero.subtitle') }}
            </p>
            <a
              href="#hero-calculator"
              class="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg transition-all hover:scale-105"
              @click.prevent="scrollToCalc"
            >
              Cotizar embalaje
            </a>
          </div>
        </div>
      </section>

      <!-- Types Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.embalajes.types.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.embalajes.types.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

      <!-- Materials Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.embalajes.materials.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.embalajes.materials.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(item, idx) in materiales"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="item.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ item.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.embalajes.services.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.embalajes.services.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div
              v-for="(service, idx) in servicios"
              :key="idx"
              class="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div class="text-5xl font-black text-teal-600 mb-4">{{ service.number }}</div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ service.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium mb-6">{{ service.desc }}</p>
              <ul class="space-y-3">
                <li v-for="(feature, i) in service.features" :key="i" class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-slate-600 font-medium text-sm">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.embalajes.process.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.embalajes.process.subtitle') }}
            </p>
          </div>

          <div class="max-w-5xl mx-auto">
            <div class="grid md:grid-cols-5 gap-6">
              <div
                v-for="(step, idx) in processSteps"
                :key="idx"
                class="text-center"
              >
                <div class="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-black mb-4 mx-auto shadow-lg">
                  {{ idx + 1 }}
                </div>
                <h3 class="text-lg font-black text-slate-900 mb-2">{{ step.title }}</h3>
                <p class="text-sm text-slate-500 leading-relaxed">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Zones Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.embalajes.zones.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.embalajes.zones.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                v-for="(zone, idx) in zones"
                :key="idx"
                class="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:bg-teal-50 transition-all"
              >
                <p class="font-black text-slate-900 text-lg">{{ zone }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Calculadora de embalaje (scroll target desde nav) -->
      <section id="hero-calculator" class="relative py-16 md:py-24 bg-slate-50 overflow-hidden">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-10">
            <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tighter">
              Cotiza tu embalaje
            </h2>
            <p class="text-slate-500 font-medium">
              {{ $t('pages.embalajes.cta.subtitle') }}
            </p>
          </div>
          <EmbalajesCalculator />
          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <NuxtLink
              to="/contacto"
              class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105 text-center"
            >
              {{ $t('pages.embalajes.cta.button1') }}
            </NuxtLink>
            <NuxtLink
              to="/"
              class="bg-white hover:bg-slate-100 text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border border-slate-200 transition-all hover:scale-105 text-center"
            >
              {{ $t('pages.embalajes.cta.button2') }}
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- FAQs Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.embalajes.faqs.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.embalajes.faqs.subtitle') }}
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
const currentUrl = `${siteUrl}/embalajes`
const defaultImage = `${siteUrl}/og-image.jpg`

useHead(() => ({
  title: `${t('pages.embalajes.hero.title')} | FletesPro`,
  meta: [
    {
      name: 'description',
      content: t('pages.embalajes.description')
    },
    {
      name: 'keywords',
      content: 'embalaje profesional Santiago, embalaje para mudanzas, embalaje mudanza, servicio embalaje profesional, embalaje completo, embalaje parcial, embalaje muebles, embalaje electrodomésticos, embalaje a domicilio, embalaje Región Metropolitana'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: `${t('pages.embalajes.hero.title')} | FletesPro` },
    { property: 'og:description', content: t('pages.embalajes.description') },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: `${t('pages.embalajes.hero.title')} | FletesPro` },
    { name: 'twitter:description', content: t('pages.embalajes.description') },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [
    { rel: 'canonical', href: currentUrl }
  ]
}))

// Iconos
const IconBox = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const IconBubble = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' })
])

const IconShield = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
])

const IconPackage = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' })
])

const IconRuler = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' })
])

const IconTape = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
])

const IconFurniture = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
])

const IconFragile = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' })
])

// Types
const types = computed(() => [
  {
    icon: IconPackage,
    title: t('pages.embalajes.types.type1.title'),
    description: t('pages.embalajes.types.type1.description')
  },
  {
    icon: IconFragile,
    title: t('pages.embalajes.types.type2.title'),
    description: t('pages.embalajes.types.type2.description')
  },
  {
    icon: IconFurniture,
    title: t('pages.embalajes.types.type3.title'),
    description: t('pages.embalajes.types.type3.description')
  },
  {
    icon: IconShield,
    title: t('pages.embalajes.types.type4.title'),
    description: t('pages.embalajes.types.type4.description')
  },
  {
    icon: IconBubble,
    title: t('pages.embalajes.types.type5.title'),
    description: t('pages.embalajes.types.type5.description')
  }
])

// Materiales
const materiales = computed(() => [
  {
    icon: IconBox,
    title: t('pages.embalajes.materials.material1.title'),
    desc: t('pages.embalajes.materials.material1.description')
  },
  {
    icon: IconBubble,
    title: t('pages.embalajes.materials.material2.title'),
    desc: t('pages.embalajes.materials.material2.description')
  },
  {
    icon: IconShield,
    title: t('pages.embalajes.materials.material3.title'),
    desc: t('pages.embalajes.materials.material3.description')
  },
  {
    icon: IconTape,
    title: t('pages.embalajes.materials.material4.title'),
    desc: t('pages.embalajes.materials.material4.description')
  },
  {
    icon: IconPackage,
    title: t('pages.embalajes.materials.material5.title'),
    desc: t('pages.embalajes.materials.material5.description')
  },
  {
    icon: IconRuler,
    title: t('pages.embalajes.materials.material6.title'),
    desc: t('pages.embalajes.materials.material6.description')
  }
])

// Servicios
const servicios = computed(() => [
  {
    number: '01',
    title: t('pages.embalajes.services.service1.title'),
    desc: t('pages.embalajes.services.service1.description'),
    features: [
      t('pages.embalajes.services.service1.feature1'),
      t('pages.embalajes.services.service1.feature2'),
      t('pages.embalajes.services.service1.feature3'),
      t('pages.embalajes.services.service1.feature4')
    ]
  },
  {
    number: '02',
    title: t('pages.embalajes.services.service2.title'),
    desc: t('pages.embalajes.services.service2.description'),
    features: [
      t('pages.embalajes.services.service2.feature1'),
      t('pages.embalajes.services.service2.feature2'),
      t('pages.embalajes.services.service2.feature3'),
      t('pages.embalajes.services.service2.feature4')
    ]
  },
  {
    number: '03',
    title: t('pages.embalajes.services.service3.title'),
    desc: t('pages.embalajes.services.service3.description'),
    features: [
      t('pages.embalajes.services.service3.feature1'),
      t('pages.embalajes.services.service3.feature2'),
      t('pages.embalajes.services.service3.feature3'),
      t('pages.embalajes.services.service3.feature4')
    ]
  },
  {
    number: '04',
    title: t('pages.embalajes.services.service4.title'),
    desc: t('pages.embalajes.services.service4.description'),
    features: [
      t('pages.embalajes.services.service4.feature1'),
      t('pages.embalajes.services.service4.feature2'),
      t('pages.embalajes.services.service4.feature3'),
      t('pages.embalajes.services.service4.feature4')
    ]
  }
])

// Process Steps
const processSteps = computed(() => [
  {
    title: t('pages.embalajes.process.step1.title'),
    description: t('pages.embalajes.process.step1.description')
  },
  {
    title: t('pages.embalajes.process.step2.title'),
    description: t('pages.embalajes.process.step2.description')
  },
  {
    title: t('pages.embalajes.process.step3.title'),
    description: t('pages.embalajes.process.step3.description')
  },
  {
    title: t('pages.embalajes.process.step4.title'),
    description: t('pages.embalajes.process.step4.description')
  },
  {
    title: t('pages.embalajes.process.step5.title'),
    description: t('pages.embalajes.process.step5.description')
  }
])

// Zones
const zones = computed(() => [
  t('pages.embalajes.zones.zone1'),
  t('pages.embalajes.zones.zone2'),
  t('pages.embalajes.zones.zone3'),
  t('pages.embalajes.zones.zone4'),
  t('pages.embalajes.zones.zone5'),
  t('pages.embalajes.zones.zone6'),
  t('pages.embalajes.zones.zone7'),
  t('pages.embalajes.zones.zone8')
])

// FAQs
const faqs = computed(() => [
  {
    question: t('pages.embalajes.faqs.faq1.question'),
    answer: t('pages.embalajes.faqs.faq1.answer'),
    open: false
  },
  {
    question: t('pages.embalajes.faqs.faq2.question'),
    answer: t('pages.embalajes.faqs.faq2.answer'),
    open: false
  },
  {
    question: t('pages.embalajes.faqs.faq3.question'),
    answer: t('pages.embalajes.faqs.faq3.answer'),
    open: false
  },
  {
    question: t('pages.embalajes.faqs.faq4.question'),
    answer: t('pages.embalajes.faqs.faq4.answer'),
    open: false
  },
  {
    question: t('pages.embalajes.faqs.faq5.question'),
    answer: t('pages.embalajes.faqs.faq5.answer'),
    open: false
  },
  {
    question: t('pages.embalajes.faqs.faq6.question'),
    answer: t('pages.embalajes.faqs.faq6.answer'),
    open: false
  },
  {
    question: t('pages.embalajes.faqs.faq7.question'),
    answer: t('pages.embalajes.faqs.faq7.answer'),
    open: false
  },
  {
    question: t('pages.embalajes.faqs.faq8.question'),
    answer: t('pages.embalajes.faqs.faq8.answer'),
    open: false
  },
  {
    question: t('pages.embalajes.faqs.faq9.question'),
    answer: t('pages.embalajes.faqs.faq9.answer'),
    open: false
  },
  {
    question: t('pages.embalajes.faqs.faq10.question'),
    answer: t('pages.embalajes.faqs.faq10.answer'),
    open: false
  },
  {
    question: t('pages.embalajes.faqs.faq11.question'),
    answer: t('pages.embalajes.faqs.faq11.answer'),
    open: false
  },
  {
    question: t('pages.embalajes.faqs.faq12.question'),
    answer: t('pages.embalajes.faqs.faq12.answer'),
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

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-float-1 {
  animation: float-1 25s infinite linear;
}

.animate-float-2 {
  animation: float-2 30s infinite linear;
}
</style>
