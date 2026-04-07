<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />
      <!-- Hero Section -->
      <section class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              {{ $t('pages.ultimaMilla.hero.badge') }}
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              {{ $t('pages.ultimaMilla.hero.title') }}
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              {{ $t('pages.ultimaMilla.hero.subtitle') }}
            </p>
          </div>

          <div class="animate-slide-up">
            <UltimaMillaCalculator />
          </div>
        </div>
      </section>

      <!-- Sectors Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.ultimaMilla.sectors.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.ultimaMilla.sectors.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(sector, idx) in sectores"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="sector.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ sector.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium mb-6">{{ sector.desc }}</p>
              <ul class="space-y-2">
                <li v-for="(feature, i) in sector.features" :key="i" class="flex items-start gap-2">
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

      <!-- Delivery Types Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.ultimaMilla.deliveryTypes.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.ultimaMilla.deliveryTypes.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div
              v-for="(tipo, idx) in tiposEntrega"
              :key="idx"
              class="p-8 rounded-[2.5rem] border-2 border-slate-100 bg-white hover:border-teal-600 hover:shadow-xl transition-all text-center"
            >
              <div class="text-4xl font-black text-teal-600 mb-4">{{ tipo.icon }}</div>
              <h3 class="text-xl font-black text-slate-900 mb-2 tracking-tight">{{ tipo.title }}</h3>
              <p class="text-slate-500 text-sm font-medium">{{ tipo.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Technology Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.ultimaMilla.technology.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.ultimaMilla.technology.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(tech, idx) in tecnologia"
              :key="idx"
              class="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
            >
              <div class="text-5xl font-black text-teal-600 mb-4">{{ tech.number }}</div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ tech.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ tech.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Coverage Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.ultimaMilla.zones.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.ultimaMilla.zones.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div
              v-for="(zona, idx) in zonas"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-200 bg-white text-center hover:border-teal-600 hover:shadow-xl transition-all"
            >
              <div class="text-4xl font-black text-teal-600 mb-4">{{ zona.icon }}</div>
              <h3 class="text-xl font-black text-slate-900 mb-2 tracking-tight">{{ zona.title }}</h3>
              <p class="text-slate-500 text-sm font-medium">{{ zona.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Ecommerce Shipping Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.ultimaMilla.ecommerceShipping.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.ultimaMilla.ecommerceShipping.subtitle') }}
            </p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              v-for="(service, idx) in ecommerceShipping"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50 shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="service.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ service.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ service.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Companies Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.ultimaMilla.companies.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.ultimaMilla.companies.subtitle') }}
            </p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              v-for="(company, idx) in companies"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="company.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ company.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ company.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.ultimaMilla.pricing.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.ultimaMilla.pricing.subtitle') }}
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(price, idx) in pricing"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50 hover:border-teal-600 hover:shadow-xl transition-all"
            >
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ price.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ price.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Concept Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.ultimaMilla.concept.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.ultimaMilla.concept.subtitle') }}
            </p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div
              v-for="(item, idx) in concept"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all"
            >
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ item.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ item.desc }}</p>
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
              {{ $t('pages.ultimaMilla.cta.title') }}
            </h2>
            <p class="text-xl text-slate-300 mb-12 font-medium">
              {{ $t('pages.ultimaMilla.cta.subtitle') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                @click="scrollToCalc"
                class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                {{ $t('pages.ultimaMilla.cta.button1') }}
              </button>
              <button
                @click="scrollToCalc"
                class="bg-white hover:bg-slate-100 text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                {{ $t('pages.ultimaMilla.cta.button2') }}
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
              {{ $t('pages.ultimaMilla.faqs.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.ultimaMilla.faqs.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto space-y-6">
            <div
              v-for="(faq, idx) in faqs"
              :key="idx"
              class="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"
            >
              <button
                type="button"
                @click="toggleFaq(idx)"
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
const siteUrl = 'https://fletespro.cl'
const currentUrl = computed(() => `${siteUrl}/ultima-milla`)
const defaultImage = `${siteUrl}/og-image.jpg`

const faqOpenStates = ref(Array(18).fill(false))
function toggleFaq (idx) {
  const next = [...faqOpenStates.value]
  next[idx] = !next[idx]
  faqOpenStates.value = next
}

const faqs = computed(() => {
  const o = faqOpenStates.value
  const rows = [
    { question: t('pages.ultimaMilla.faqs.faq1.question'), answer: t('pages.ultimaMilla.faqs.faq1.answer') },
    { question: t('pages.ultimaMilla.faqs.faq2.question'), answer: t('pages.ultimaMilla.faqs.faq2.answer') },
    { question: t('pages.ultimaMilla.faqs.faq3.question'), answer: t('pages.ultimaMilla.faqs.faq3.answer') },
    { question: t('pages.ultimaMilla.faqs.faq4.question'), answer: t('pages.ultimaMilla.faqs.faq4.answer') },
    { question: t('pages.ultimaMilla.faqs.faq5.question'), answer: t('pages.ultimaMilla.faqs.faq5.answer') },
    { question: t('pages.ultimaMilla.faqs.faq6.question'), answer: t('pages.ultimaMilla.faqs.faq6.answer') },
    { question: t('pages.ultimaMilla.faqs.faq7.question'), answer: t('pages.ultimaMilla.faqs.faq7.answer') },
    { question: t('pages.ultimaMilla.faqs.faq8.question'), answer: t('pages.ultimaMilla.faqs.faq8.answer') },
    { question: t('pages.ultimaMilla.faqs.faq9.question'), answer: t('pages.ultimaMilla.faqs.faq9.answer') },
    { question: t('pages.ultimaMilla.faqs.faq10.question'), answer: t('pages.ultimaMilla.faqs.faq10.answer') },
    { question: t('pages.ultimaMilla.faqs.faq11.question'), answer: t('pages.ultimaMilla.faqs.faq11.answer') },
    { question: t('pages.ultimaMilla.faqs.faq12.question'), answer: t('pages.ultimaMilla.faqs.faq12.answer') },
    { question: t('pages.ultimaMilla.faqs.faq13.question'), answer: t('pages.ultimaMilla.faqs.faq13.answer') },
    { question: t('pages.ultimaMilla.faqs.faq14.question'), answer: t('pages.ultimaMilla.faqs.faq14.answer') },
    { question: t('pages.ultimaMilla.faqs.faq15.question'), answer: t('pages.ultimaMilla.faqs.faq15.answer') },
    { question: t('pages.ultimaMilla.faqs.faq16.question'), answer: t('pages.ultimaMilla.faqs.faq16.answer') },
    { question: t('pages.ultimaMilla.faqs.faq17.question'), answer: t('pages.ultimaMilla.faqs.faq17.answer') },
    { question: t('pages.ultimaMilla.faqs.faq18.question'), answer: t('pages.ultimaMilla.faqs.faq18.answer') }
  ]
  return rows.map((row, i) => ({ ...row, open: o[i] }))
})

useHead(computed(() => ({
  title: t('pages.ultimaMilla.seo.title'),
  meta: [
    { name: 'description', content: t('pages.ultimaMilla.seo.description') },
    { name: 'keywords', content: t('pages.ultimaMilla.seo.keywords') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl.value },
    { property: 'og:title', content: t('pages.ultimaMilla.seo.ogTitle') },
    { property: 'og:description', content: t('pages.ultimaMilla.seo.ogDescription') },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl.value },
    { name: 'twitter:title', content: t('pages.ultimaMilla.seo.twitterTitle') },
    { name: 'twitter:description', content: t('pages.ultimaMilla.seo.twitterDescription') },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [
    { rel: 'canonical', href: currentUrl.value }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: t('pages.ultimaMilla.seo.schemaServiceType'),
        provider: {
          '@type': 'LocalBusiness',
          name: 'FletesPro',
          url: siteUrl
        },
        areaServed: {
          '@type': 'City',
          name: ['Santiago', 'Región Metropolitana', 'Chile']
        },
        description: t('pages.ultimaMilla.seo.schemaDescription')
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('breadcrumbs.home'),
            item: siteUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('breadcrumbs.ultimaMilla'),
            item: currentUrl.value
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.value.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      })
    }
  ]
})))

// Iconos
const IconShopping = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
])

const IconFood = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
])

const IconPill = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' })
])

const IconPackage = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const IconRestaurant = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
])

const IconDelivery = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
])

const IconBuilding = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
])

const IconTruck = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const IconGlobe = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' })
])

const IconCurrency = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const sectores = computed(() => [
  {
    icon: IconShopping,
    title: t('pages.ultimaMilla.sectors.sector1.title'),
    desc: t('pages.ultimaMilla.sectors.sector1.description'),
    features: [
      t('pages.ultimaMilla.sectors.sector1.feature1'),
      t('pages.ultimaMilla.sectors.sector1.feature2'),
      t('pages.ultimaMilla.sectors.sector1.feature3'),
      t('pages.ultimaMilla.sectors.sector1.feature4')
    ]
  },
  {
    icon: IconFood,
    title: t('pages.ultimaMilla.sectors.sector2.title'),
    desc: t('pages.ultimaMilla.sectors.sector2.description'),
    features: [
      t('pages.ultimaMilla.sectors.sector2.feature1'),
      t('pages.ultimaMilla.sectors.sector2.feature2'),
      t('pages.ultimaMilla.sectors.sector2.feature3'),
      t('pages.ultimaMilla.sectors.sector2.feature4')
    ]
  },
  {
    icon: IconRestaurant,
    title: t('pages.ultimaMilla.sectors.sector3.title'),
    desc: t('pages.ultimaMilla.sectors.sector3.description'),
    features: [
      t('pages.ultimaMilla.sectors.sector3.feature1'),
      t('pages.ultimaMilla.sectors.sector3.feature2'),
      t('pages.ultimaMilla.sectors.sector3.feature3'),
      t('pages.ultimaMilla.sectors.sector3.feature4')
    ]
  },
  {
    icon: IconPill,
    title: t('pages.ultimaMilla.sectors.sector4.title'),
    desc: t('pages.ultimaMilla.sectors.sector4.description'),
    features: [
      t('pages.ultimaMilla.sectors.sector4.feature1'),
      t('pages.ultimaMilla.sectors.sector4.feature2'),
      t('pages.ultimaMilla.sectors.sector4.feature3'),
      t('pages.ultimaMilla.sectors.sector4.feature4')
    ]
  },
  {
    icon: IconPackage,
    title: t('pages.ultimaMilla.sectors.sector5.title'),
    desc: t('pages.ultimaMilla.sectors.sector5.description'),
    features: [
      t('pages.ultimaMilla.sectors.sector5.feature1'),
      t('pages.ultimaMilla.sectors.sector5.feature2'),
      t('pages.ultimaMilla.sectors.sector5.feature3'),
      t('pages.ultimaMilla.sectors.sector5.feature4')
    ]
  }
])

const tiposEntrega = computed(() => [
  {
    icon: '⚡',
    title: t('pages.ultimaMilla.deliveryTypes.type1.title'),
    desc: t('pages.ultimaMilla.deliveryTypes.type1.description')
  },
  {
    icon: '🚀',
    title: t('pages.ultimaMilla.deliveryTypes.type2.title'),
    desc: t('pages.ultimaMilla.deliveryTypes.type2.description')
  },
  {
    icon: '📅',
    title: t('pages.ultimaMilla.deliveryTypes.type3.title'),
    desc: t('pages.ultimaMilla.deliveryTypes.type3.description')
  },
  {
    icon: '🌙',
    title: t('pages.ultimaMilla.deliveryTypes.type4.title'),
    desc: t('pages.ultimaMilla.deliveryTypes.type4.description')
  }
])

const tecnologia = computed(() => [
  {
    number: '01',
    title: t('pages.ultimaMilla.technology.tech1.title'),
    desc: t('pages.ultimaMilla.technology.tech1.description')
  },
  {
    number: '02',
    title: t('pages.ultimaMilla.technology.tech2.title'),
    desc: t('pages.ultimaMilla.technology.tech2.description')
  },
  {
    number: '03',
    title: t('pages.ultimaMilla.technology.tech3.title'),
    desc: t('pages.ultimaMilla.technology.tech3.description')
  }
])

const zonas = computed(() => [
  {
    icon: '🏙️',
    title: t('pages.ultimaMilla.zones.zone1.title'),
    desc: t('pages.ultimaMilla.zones.zone1.description')
  },
  {
    icon: '🌆',
    title: t('pages.ultimaMilla.zones.zone2.title'),
    desc: t('pages.ultimaMilla.zones.zone2.description')
  },
  {
    icon: '🌳',
    title: t('pages.ultimaMilla.zones.zone3.title'),
    desc: t('pages.ultimaMilla.zones.zone3.description')
  }
])

const ecommerceShipping = computed(() => [
  {
    icon: IconShopping,
    title: t('pages.ultimaMilla.ecommerceShipping.service1.title'),
    desc: t('pages.ultimaMilla.ecommerceShipping.service1.description')
  },
  {
    icon: IconPackage,
    title: t('pages.ultimaMilla.ecommerceShipping.service2.title'),
    desc: t('pages.ultimaMilla.ecommerceShipping.service2.description')
  },
  {
    icon: IconDelivery,
    title: t('pages.ultimaMilla.ecommerceShipping.service3.title'),
    desc: t('pages.ultimaMilla.ecommerceShipping.service3.description')
  },
  {
    icon: IconGlobe,
    title: t('pages.ultimaMilla.ecommerceShipping.service4.title'),
    desc: t('pages.ultimaMilla.ecommerceShipping.service4.description')
  }
])

const companies = computed(() => [
  {
    icon: IconBuilding,
    title: t('pages.ultimaMilla.companies.company1.title'),
    desc: t('pages.ultimaMilla.companies.company1.description')
  },
  {
    icon: IconTruck,
    title: t('pages.ultimaMilla.companies.company2.title'),
    desc: t('pages.ultimaMilla.companies.company2.description')
  },
  {
    icon: IconDelivery,
    title: t('pages.ultimaMilla.companies.company3.title'),
    desc: t('pages.ultimaMilla.companies.company3.description')
  },
  {
    icon: IconGlobe,
    title: t('pages.ultimaMilla.companies.company4.title'),
    desc: t('pages.ultimaMilla.companies.company4.description')
  }
])

const pricing = computed(() => [
  {
    title: t('pages.ultimaMilla.pricing.price1.title'),
    desc: t('pages.ultimaMilla.pricing.price1.description')
  },
  {
    title: t('pages.ultimaMilla.pricing.price2.title'),
    desc: t('pages.ultimaMilla.pricing.price2.description')
  },
  {
    title: t('pages.ultimaMilla.pricing.price3.title'),
    desc: t('pages.ultimaMilla.pricing.price3.description')
  }
])

const concept = computed(() => [
  {
    title: t('pages.ultimaMilla.concept.concept1.title'),
    desc: t('pages.ultimaMilla.concept.concept1.description')
  },
  {
    title: t('pages.ultimaMilla.concept.concept2.title'),
    desc: t('pages.ultimaMilla.concept.concept2.description')
  },
  {
    title: t('pages.ultimaMilla.concept.concept3.title'),
    desc: t('pages.ultimaMilla.concept.concept3.description')
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

