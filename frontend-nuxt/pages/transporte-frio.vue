<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />
      <!-- Hero Section -->
      <section class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              {{ $t('pages.transporteFrio.hero.badge') }}
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              {{ $t('pages.transporteFrio.hero.title') }}
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              {{ $t('pages.transporteFrio.hero.subtitle') }}
            </p>
          </div>

          <div class="animate-slide-up">
            <TransporteFrioCalculator />
          </div>
        </div>
      </section>

      <!-- Transporte en frío: garantizando la seguridad + video (widget al lado) -->
      <section class="py-16 bg-white border-t border-slate-100">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <h2 class="text-2xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Transporte en frío: garantizando la seguridad de tus productos perecederos
              </h2>
              <p class="text-slate-600 leading-relaxed mb-4">
                El transporte en frío es fundamental si necesitas trasladar productos perecederos, como alimentos o medicamentos, que requieren condiciones de temperatura controlada. Tenemos el más confiable transporte refrigerado a tu servicio a precios muy competitivos.
              </p>
              <p class="text-slate-600 leading-relaxed mb-4">
                La importancia del transporte en la cadena de frío es clave: desde el origen hasta el destino la temperatura debe mantenerse estable. Somos una empresa de transporte en frío en Santiago de Chile y Región Metropolitana; ofrecemos transporte de frio en Chile, transporte de carga en frio y cadena de frio transporte en Chile. Si necesitas como transportar medicamentos en frio o transporte de muestras en frio, contamos con metodologías de transporte en cadena de frio y equipamiento adecuado. También realizamos transporte en frio desde Santiago hacia Arica, transporte en frio Temuco y otras rutas. Para empresas que requieren transporte y bodegaje en frio o transporte de alimentos en la cadena de frio, ofrecemos soluciones completas con impacto del transporte en la cadena de frio minimizado gracias a controles estrictos.
              </p>
              <ul class="text-slate-600 space-y-2 text-sm">
                <li class="flex items-start gap-2">
                  <span class="text-teal-600 font-bold mt-0.5">1.</span>
                  <span>Equipo especializado con vehículos equipados con sistemas de refrigeración adecuados y estándares de calidad.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-teal-600 font-bold mt-0.5">2.</span>
                  <span>Experiencia comprobada en transporte de mercancías perecederas y mantenimiento de la cadena de frío.</span>
                </li>
              </ul>
            </div>
            <div class="relative">
              <div class="aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100 ring-4 ring-teal-500/10">
                <iframe
                  src="https://www.youtube.com/embed/YUJKAA-KX7w"
                  title="Transporte en frío - FletesPro"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                  class="w-full h-full"
                />
              </div>
              <p class="text-center text-slate-500 text-sm mt-3 font-medium">Servicio de transporte refrigerado en RM y regiones</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Vehicle Types Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.transporteFrio.vehicleTypes.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.transporteFrio.vehicleTypes.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div
              v-for="(vehicle, idx) in vehicleTypes"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="vehicle.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ vehicle.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ vehicle.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Specialized Services Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.transporteFrio.specializedServices.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.transporteFrio.specializedServices.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div
              v-for="(service, idx) in specializedServices"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="service.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ service.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Temperature Types Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.transporteFrio.temperatures.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.transporteFrio.temperatures.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(temp, idx) in temperaturas"
              :key="idx"
              class="p-10 rounded-[2.5rem] border-2 border-slate-100 bg-white hover:border-teal-600 hover:shadow-2xl hover:shadow-teal-100/40 transition-all group"
            >
              <div class="text-5xl font-black text-teal-600 mb-4">{{ temp.temperature }}</div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ temp.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ temp.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Types Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.transporteFrio.products.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.transporteFrio.products.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(producto, idx) in productos"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="producto.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ producto.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ producto.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.transporteFrio.services.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.transporteFrio.services.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(service, idx) in servicios"
              :key="idx"
              class="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
            >
              <div class="text-5xl font-black text-teal-600 mb-4">{{ idx + 1 }}</div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ service.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium mb-6">{{ service.description }}</p>
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

      <!-- Companies Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.transporteFrio.companies.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.transporteFrio.companies.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="(info, idx) in companiesInfo"
                :key="idx"
                class="p-8 rounded-2xl border border-slate-100 bg-white text-center hover:shadow-xl transition-all"
              >
                <p class="text-slate-700 font-medium text-lg">{{ info }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Coverage Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.transporteFrio.coverage.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.transporteFrio.coverage.subtitle') }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div
              v-for="(zona, idx) in zonas"
              :key="idx"
              class="p-8 rounded-[2.5rem] border border-slate-200 bg-white text-center hover:border-teal-600 hover:shadow-xl transition-all"
            >
              <div class="text-3xl font-black text-teal-600 mb-4">{{ zona.icon }}</div>
              <h3 class="text-xl font-black text-slate-900 mb-2 tracking-tight">{{ zona.title }}</h3>
              <p class="text-slate-500 text-sm font-medium">{{ zona.description }}</p>
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
              {{ $t('pages.transporteFrio.cta.title') }}
            </h2>
            <p class="text-xl text-slate-300 mb-12 font-medium">
              {{ $t('pages.transporteFrio.cta.subtitle') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                @click="scrollToCalc"
                class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                {{ $t('pages.transporteFrio.cta.button1') }}
              </button>
              <button
                @click="scrollToCalc"
                class="bg-white hover:bg-slate-100 text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                {{ $t('pages.transporteFrio.cta.button2') }}
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
              {{ $t('pages.transporteFrio.faqs.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.transporteFrio.faqs.subtitle') }}
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

// SEO Meta Tags (siempre español: Chile + Google; el cuerpo sigue según locale del usuario)
const siteUrl = 'https://fletespro.cl'
const currentUrl = `${siteUrl}/transporte-frio`
const defaultImage = `${siteUrl}/og-image.jpg`

const seoTitle = () => t('pages.transporteFrio.seo.title', {}, { locale: 'es' })
const seoDesc = () => t('pages.transporteFrio.seo.description', {}, { locale: 'es' })
const seoKeywords = () => t('pages.transporteFrio.seo.keywords', {}, { locale: 'es' })

useHead(() => ({
  title: seoTitle(),
  meta: [
    { name: 'description', content: seoDesc() },
    { name: 'keywords', content: seoKeywords() },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: seoTitle() },
    { property: 'og:description', content: seoDesc() },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: seoTitle() },
    { name: 'twitter:description', content: seoDesc() },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [
    { rel: 'canonical', href: currentUrl },
    { rel: 'alternate', hreflang: 'es-CL', href: currentUrl },
    { rel: 'alternate', hreflang: 'es', href: currentUrl },
    { rel: 'alternate', hreflang: 'x-default', href: currentUrl }
  ]
}))

// Iconos
const IconTruck = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const IconBox = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const IconSnowflake = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' })
])

const IconPackage = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const IconFood = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
])

const IconPill = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' })
])

const IconFlower = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' })
])

const IconFish = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const IconWarehouse = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
])

const IconZap = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
])

// Vehicle Types
const vehicleTypes = computed(() => [
  {
    icon: IconTruck,
    title: t('pages.transporteFrio.vehicleTypes.vehicle1.title'),
    description: t('pages.transporteFrio.vehicleTypes.vehicle1.description')
  },
  {
    icon: IconSnowflake,
    title: t('pages.transporteFrio.vehicleTypes.vehicle2.title'),
    description: t('pages.transporteFrio.vehicleTypes.vehicle2.description')
  },
  {
    icon: IconTruck,
    title: t('pages.transporteFrio.vehicleTypes.vehicle3.title'),
    description: t('pages.transporteFrio.vehicleTypes.vehicle3.description')
  },
  {
    icon: IconBox,
    title: t('pages.transporteFrio.vehicleTypes.vehicle4.title'),
    description: t('pages.transporteFrio.vehicleTypes.vehicle4.description')
  }
])

// Specialized Services
const specializedServices = computed(() => [
  {
    icon: IconPackage,
    title: t('pages.transporteFrio.specializedServices.service1.title'),
    description: t('pages.transporteFrio.specializedServices.service1.description')
  },
  {
    icon: IconBox,
    title: t('pages.transporteFrio.specializedServices.service2.title'),
    description: t('pages.transporteFrio.specializedServices.service2.description')
  },
  {
    icon: IconTruck,
    title: t('pages.transporteFrio.specializedServices.service3.title'),
    description: t('pages.transporteFrio.specializedServices.service3.description')
  },
  {
    icon: IconZap,
    title: t('pages.transporteFrio.specializedServices.service4.title'),
    description: t('pages.transporteFrio.specializedServices.service4.description')
  }
])

// Temperaturas
const temperaturas = computed(() => [
  {
    temperature: t('pages.transporteFrio.temperatures.range1.temperature'),
    title: t('pages.transporteFrio.temperatures.range1.title'),
    description: t('pages.transporteFrio.temperatures.range1.description')
  },
  {
    temperature: t('pages.transporteFrio.temperatures.range2.temperature'),
    title: t('pages.transporteFrio.temperatures.range2.title'),
    description: t('pages.transporteFrio.temperatures.range2.description')
  },
  {
    temperature: t('pages.transporteFrio.temperatures.range3.temperature'),
    title: t('pages.transporteFrio.temperatures.range3.title'),
    description: t('pages.transporteFrio.temperatures.range3.description')
  }
])

// Productos
const productos = computed(() => [
  {
    icon: IconFood,
    title: t('pages.transporteFrio.products.product1.title'),
    description: t('pages.transporteFrio.products.product1.description')
  },
  {
    icon: IconTruck,
    title: t('pages.transporteFrio.products.product2.title'),
    description: t('pages.transporteFrio.products.product2.description')
  },
  {
    icon: IconPill,
    title: t('pages.transporteFrio.products.product3.title'),
    description: t('pages.transporteFrio.products.product3.description')
  },
  {
    icon: IconFood,
    title: t('pages.transporteFrio.products.product4.title'),
    description: t('pages.transporteFrio.products.product4.description')
  },
  {
    icon: IconFlower,
    title: t('pages.transporteFrio.products.product5.title'),
    description: t('pages.transporteFrio.products.product5.description')
  },
  {
    icon: IconFood,
    title: t('pages.transporteFrio.products.product6.title'),
    description: t('pages.transporteFrio.products.product6.description')
  }
])

// Servicios
const servicios = computed(() => [
  {
    title: t('pages.transporteFrio.services.service1.title'),
    description: t('pages.transporteFrio.services.service1.description'),
    features: [
      t('pages.transporteFrio.services.service1.feature1'),
      t('pages.transporteFrio.services.service1.feature2'),
      t('pages.transporteFrio.services.service1.feature3'),
      t('pages.transporteFrio.services.service1.feature4')
    ]
  },
  {
    title: t('pages.transporteFrio.services.service2.title'),
    description: t('pages.transporteFrio.services.service2.description'),
    features: [
      t('pages.transporteFrio.services.service2.feature1'),
      t('pages.transporteFrio.services.service2.feature2'),
      t('pages.transporteFrio.services.service2.feature3'),
      t('pages.transporteFrio.services.service2.feature4')
    ]
  },
  {
    title: t('pages.transporteFrio.services.service3.title'),
    description: t('pages.transporteFrio.services.service3.description'),
    features: [
      t('pages.transporteFrio.services.service3.feature1'),
      t('pages.transporteFrio.services.service3.feature2'),
      t('pages.transporteFrio.services.service3.feature3'),
      t('pages.transporteFrio.services.service3.feature4')
    ]
  },
  {
    title: t('pages.transporteFrio.services.service4.title'),
    description: t('pages.transporteFrio.services.service4.description'),
    features: [
      t('pages.transporteFrio.services.service4.feature1'),
      t('pages.transporteFrio.services.service4.feature2'),
      t('pages.transporteFrio.services.service4.feature3'),
      t('pages.transporteFrio.services.service4.feature4')
    ]
  }
])

// Companies Info
const companiesInfo = computed(() => [
  t('pages.transporteFrio.companies.info1'),
  t('pages.transporteFrio.companies.info2'),
  t('pages.transporteFrio.companies.info3'),
  t('pages.transporteFrio.companies.info4'),
  t('pages.transporteFrio.companies.info5')
])

// Zonas
const zonas = computed(() => [
  {
    icon: '📍',
    title: t('pages.transporteFrio.coverage.coverage1.title'),
    description: t('pages.transporteFrio.coverage.coverage1.description')
  },
  {
    icon: '🚚',
    title: t('pages.transporteFrio.coverage.coverage2.title'),
    description: t('pages.transporteFrio.coverage.coverage2.description')
  },
  {
    icon: '🌍',
    title: t('pages.transporteFrio.coverage.coverage3.title'),
    description: t('pages.transporteFrio.coverage.coverage3.description')
  },
  {
    icon: '✈️',
    title: t('pages.transporteFrio.coverage.coverage4.title'),
    description: t('pages.transporteFrio.coverage.coverage4.description')
  }
])

// FAQs
const faqs = computed(() => [
  {
    question: t('pages.transporteFrio.faqs.faq1.question'),
    answer: t('pages.transporteFrio.faqs.faq1.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq2.question'),
    answer: t('pages.transporteFrio.faqs.faq2.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq3.question'),
    answer: t('pages.transporteFrio.faqs.faq3.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq4.question'),
    answer: t('pages.transporteFrio.faqs.faq4.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq5.question'),
    answer: t('pages.transporteFrio.faqs.faq5.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq6.question'),
    answer: t('pages.transporteFrio.faqs.faq6.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq7.question'),
    answer: t('pages.transporteFrio.faqs.faq7.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq8.question'),
    answer: t('pages.transporteFrio.faqs.faq8.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq9.question'),
    answer: t('pages.transporteFrio.faqs.faq9.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq10.question'),
    answer: t('pages.transporteFrio.faqs.faq10.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq11.question'),
    answer: t('pages.transporteFrio.faqs.faq11.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq12.question'),
    answer: t('pages.transporteFrio.faqs.faq12.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq13.question'),
    answer: t('pages.transporteFrio.faqs.faq13.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq14.question'),
    answer: t('pages.transporteFrio.faqs.faq14.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq15.question'),
    answer: t('pages.transporteFrio.faqs.faq15.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq16.question'),
    answer: t('pages.transporteFrio.faqs.faq16.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq17.question'),
    answer: t('pages.transporteFrio.faqs.faq17.answer'),
    open: false
  },
  {
    question: t('pages.transporteFrio.faqs.faq18.question'),
    answer: t('pages.transporteFrio.faqs.faq18.answer'),
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
