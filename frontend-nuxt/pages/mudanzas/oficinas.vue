<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />
      <!-- Hero Section -->
      <section id="hero-calculator" class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              {{ $t('pages.mudanzasOficinas.hero.badge') }}
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              {{ $t('pages.mudanzasOficinas.hero.title') }}
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              {{ $t('pages.mudanzasOficinas.hero.subtitle') }}
            </p>
          </div>

          <div class="animate-slide-up">
            <ClientOnly>
              <PortesCalculator :is-hero="true" />
              <template #fallback>
                <div class="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 animate-pulse">
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

      <!-- Services Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.mudanzasOficinas.services.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.mudanzasOficinas.services.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div
              v-for="(service, idx) in services"
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

      <!-- Benefits Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.mudanzasOficinas.benefits.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.mudanzasOficinas.benefits.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div
              v-for="(benefit, idx) in benefits"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all text-center"
            >
              <div class="text-4xl font-black text-teal-600 mb-4">{{ benefit.icon }}</div>
              <h3 class="text-xl font-black text-slate-900 mb-2 tracking-tight">{{ benefit.title }}</h3>
              <p class="text-slate-500 text-sm font-medium">{{ benefit.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.mudanzasOficinas.process.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.mudanzasOficinas.process.subtitle') }}
            </p>
          </div>

          <div class="max-w-5xl mx-auto">
            <div class="grid md:grid-cols-4 gap-6">
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

      <!-- CTA Section -->
      <section class="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.05] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
              {{ $t('pages.mudanzasOficinas.cta.title') }}
            </h2>
            <p class="text-xl text-slate-300 mb-12 font-medium">
              {{ $t('pages.mudanzasOficinas.cta.subtitle') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                @click="scrollToCalc"
                class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                {{ $t('pages.mudanzasOficinas.cta.button1') }}
              </button>
              <button
                @click="scrollToCalc"
                class="bg-white hover:bg-slate-100 text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                {{ $t('pages.mudanzasOficinas.cta.button2') }}
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
              {{ $t('pages.mudanzasOficinas.faqs.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.mudanzasOficinas.faqs.subtitle') }}
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

// Iconos
const IconHome = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
])

const IconPackage = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const IconShield = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
])

const services = computed(() => [
  {
    icon: IconHome,
    title: t('pages.mudanzasOficinas.services.service1.title'),
    desc: t('pages.mudanzasOficinas.services.service1.description')
  },
  {
    icon: IconPackage,
    title: t('pages.mudanzasOficinas.services.service2.title'),
    desc: t('pages.mudanzasOficinas.services.service2.description')
  },
  {
    icon: IconShield,
    title: t('pages.mudanzasOficinas.services.service3.title'),
    desc: t('pages.mudanzasOficinas.services.service3.description')
  }
])

const benefits = computed(() => [
  {
    icon: '💰',
    title: t('pages.mudanzasOficinas.benefits.benefit1.title'),
    desc: t('pages.mudanzasOficinas.benefits.benefit1.description')
  },
  {
    icon: '⚡',
    title: t('pages.mudanzasOficinas.benefits.benefit2.title'),
    desc: t('pages.mudanzasOficinas.benefits.benefit2.description')
  },
  {
    icon: '🛡️',
    title: t('pages.mudanzasOficinas.benefits.benefit3.title'),
    desc: t('pages.mudanzasOficinas.benefits.benefit3.description')
  },
  {
    icon: '📦',
    title: t('pages.mudanzasOficinas.benefits.benefit4.title'),
    desc: t('pages.mudanzasOficinas.benefits.benefit4.description')
  }
])

const processSteps = computed(() => [
  {
    title: t('pages.mudanzasOficinas.process.step1.title'),
    description: t('pages.mudanzasOficinas.process.step1.description')
  },
  {
    title: t('pages.mudanzasOficinas.process.step2.title'),
    description: t('pages.mudanzasOficinas.process.step2.description')
  },
  {
    title: t('pages.mudanzasOficinas.process.step3.title'),
    description: t('pages.mudanzasOficinas.process.step3.description')
  },
  {
    title: t('pages.mudanzasOficinas.process.step4.title'),
    description: t('pages.mudanzasOficinas.process.step4.description')
  }
])

const faqOpenStates = ref(Array(6).fill(false))
function toggleFaq (idx) {
  const next = [...faqOpenStates.value]
  next[idx] = !next[idx]
  faqOpenStates.value = next
}
const faqs = computed(() => {
  const o = faqOpenStates.value
  const base = 'pages.mudanzasOficinas.faqs'
  return Array.from({ length: 6 }, (_, i) => ({
    question: t(`${base}.faq${i + 1}.question`),
    answer: t(`${base}.faq${i + 1}.answer`),
    open: o[i]
  }))
})

// SEO Meta Tags
const siteUrl = 'https://fletespro.cl'
const currentUrl = computed(() => `${siteUrl}/mudanzas/oficinas`)
const defaultImage = `${siteUrl}/og-image.jpg`

useHead(computed(() => ({
  title: t('pages.mudanzasOficinas.seo.title'),
  meta: [
    { name: 'description', content: t('pages.mudanzasOficinas.seo.description') },
    { name: 'keywords', content: t('pages.mudanzasOficinas.seo.keywords') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl.value },
    { property: 'og:title', content: t('pages.mudanzasOficinas.seo.ogTitle') },
    { property: 'og:description', content: t('pages.mudanzasOficinas.seo.ogDescription') },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl.value },
    { name: 'twitter:title', content: t('pages.mudanzasOficinas.seo.twitterTitle') },
    { name: 'twitter:description', content: t('pages.mudanzasOficinas.seo.twitterDescription') },
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
        serviceType: t('pages.mudanzasOficinas.seo.schemaServiceType'),
        provider: {
          '@type': 'LocalBusiness',
          name: 'FletesPro',
          url: siteUrl
        },
        areaServed: {
          '@type': 'City',
          name: ['Santiago', 'Región Metropolitana', 'Chile']
        },
        description: t('pages.mudanzasOficinas.seo.schemaDescription')
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
            name: t('nav.mudanzas'),
            item: `${siteUrl}/mudanzas`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: t('nav.mudanzasOficinas'),
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

