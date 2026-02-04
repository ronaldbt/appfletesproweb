<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <PortesNavbar />
    <PortesLanguageSwitcher :current-lang="lang" @lang-change="lang = $event" />

    <main class="flex-grow">
      <Breadcrumbs />

      <!-- Hero Section -->
      <section class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              Contacta con Nosotros
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              Contacto
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              Solicita presupuesto gratis para mudanzas baratas, mudanzas económicas y servicio de mudanza en Santiago y Región Metropolitana
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Information Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <!-- Teléfono -->
            <div class="bg-slate-50 rounded-3xl p-10 text-center border border-slate-100 hover:shadow-xl transition-all">
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 class="text-xl font-black text-slate-900 mb-3">Teléfono</h3>
              <a href="tel:+34600000000" class="text-teal-600 hover:text-teal-700 font-bold text-lg transition-colors">
                +34 600 000 000
              </a>
              <p class="text-slate-500 text-sm mt-2">Llámanos para presupuesto mudanza y cotizar mudanza</p>
            </div>

            <!-- Email -->
            <div class="bg-slate-50 rounded-3xl p-10 text-center border border-slate-100 hover:shadow-xl transition-all">
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-black text-slate-900 mb-3">Email</h3>
              <a href="mailto:contacto@fletespro.cl" class="text-teal-600 hover:text-teal-700 font-bold text-lg transition-colors">
                contacto@fletespro.cl
              </a>
              <p class="text-slate-500 text-sm mt-2">Escríbenos para empresas de mudanzas y servicio de mudanza</p>
            </div>

            <!-- Dirección -->
            <div class="bg-slate-50 rounded-3xl p-10 text-center border border-slate-100 hover:shadow-xl transition-all">
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-black text-slate-900 mb-3">Dirección</h3>
              <p class="text-slate-600 font-medium">
                Providencia, Santiago<br />
                Región Metropolitana, Chile
              </p>
              <p class="text-slate-500 text-sm mt-2">Oficina en Santiago y Región Metropolitana</p>
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
              ¿Necesitas Presupuesto de Mudanza?
            </h2>
            <p class="text-xl text-slate-300 mb-12 font-medium">
              Contacta con nuestra empresa de mudanzas para mudanzas baratas, mudanzas económicas y servicio de mudanza profesional
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/"
                class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                Solicitar Presupuesto
              </NuxtLink>
              <a
                href="tel:+34600000000"
                class="bg-white hover:bg-slate-100 text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- SEO Content Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto prose prose-slate max-w-none">
            <h2 class="text-3xl font-black text-slate-900 mb-6">Contacta con FletesPro - Empresa de Mudanzas Profesionales</h2>
            <div class="text-slate-600 leading-relaxed space-y-4">
              <p>FletesPro es una empresa de mudanzas profesionales especializada en mudanzas baratas, mudanzas económicas y servicio de mudanza en Santiago y Región Metropolitana. Ofrecemos presupuesto mudanza gratis y cotizar mudanza online para particulares y empresas.</p>
              <p>Nuestro servicio de mudanza incluye mudanzas particulares, mudanzas empresas, mudanzas oficinas, mudanzas internacionales y mudanzas urgentes. También proporcionamos embalajes profesionales, guardamuebles y transporte en frío.</p>
              <p>Contacta con nuestra empresa de mudanzas para obtener un presupuesto mudanza personalizado. Ofrecemos mudanzas baratas, mudanzas económicas y servicio de mudanza con la máxima calidad. Solicita presupuesto mudanza gratis sin compromiso.</p>
            </div>
          </div>
        </div>
      </section>

      <PortesFooter />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const lang = ref('es')

// SEO Meta Tags
const siteUrl = 'https://app.fletespro.cl'
const currentUrl = `${siteUrl}/contacto`
const defaultImage = `${siteUrl}/og-image.jpg`

useHead({
  title: 'Contacto - Mudanzas Santiago | Presupuesto Gratis | FletesPro',
  meta: [
    {
      name: 'description',
      content: 'Contacta con FletesPro para mudanzas baratas, mudanzas económicas y servicio de mudanza en Santiago. Solicita presupuesto gratis y cotiza tu mudanza online.'
    },
    {
      name: 'keywords',
      content: 'contacto mudanzas, presupuesto mudanza, cotizar mudanza, empresa de mudanzas, mudanzas baratas, mudanzas económicas, servicio de mudanza, empresas de mudanzas, mudanzas Santiago, mudanzas Región Metropolitana, mudanzas Chile'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: 'Contacto - Mudanzas Baratas Santiago | FletesPro' },
    { property: 'og:description', content: 'Contacta con FletesPro para mudanzas baratas, mudanzas económicas y servicio de mudanza en Santiago. Solicita presupuesto gratis y cotiza tu mudanza online.' },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: 'Contacto - Mudanzas Baratas Santiago | FletesPro' },
    { name: 'twitter:description', content: 'Contacta con FletesPro para mudanzas baratas, mudanzas económicas y servicio de mudanza en Santiago.' },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [
    { rel: 'canonical', href: currentUrl }
  ]
})
</script>

