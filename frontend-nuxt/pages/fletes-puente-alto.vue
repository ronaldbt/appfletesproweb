<template>
  <FletesComunaLayout :hero="content.hero">
    <section class="py-16 md:py-20 bg-white border-t border-slate-100">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-teal-500 w-fit">{{ content.precios.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.precios.intro }}</p>
        <p class="text-slate-600 leading-relaxed mb-6">{{ content.precios.p1 }}</p>
        <h3 class="text-xl font-bold text-slate-800 mt-8 mb-2">{{ content.precios.h3Valores }}</h3>
        <p class="text-slate-600 leading-relaxed">{{ content.precios.p2 }}</p>
      </div>
    </section>
    <section class="py-16 md:py-20 bg-teal-50/30">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-teal-500 w-fit">{{ content.rutas.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-6">{{ content.rutas.intro }}</p>
        <ul class="grid md:grid-cols-2 gap-3 mb-6">
          <li v-for="(item, i) in content.rutas.items" :key="i" class="flex items-center gap-2 text-slate-700 font-medium">
            <span class="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
            {{ item }}
          </li>
        </ul>
        <p class="text-slate-600 leading-relaxed">{{ content.rutas.pExtra }}</p>
      </div>
    </section>
    <section class="py-16 md:py-20 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-teal-500 w-fit">{{ content.servicios.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-8">{{ content.servicios.intro }}</p>
        <div class="space-y-6">
          <article v-for="(item, i) in content.servicios.items" :key="i" class="bg-teal-50/50 rounded-r-2xl border-l-4 border-teal-500 p-6 pl-6">
            <h3 class="text-xl font-black text-slate-900 mb-2">{{ item.h3 }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ item.text }}</p>
          </article>
        </div>
        <p class="mt-6 text-slate-600 leading-relaxed">{{ content.servicios.pCombustible }}</p>
      </div>
    </section>
    <section class="py-16 md:py-20 bg-teal-50/30">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 pb-3 border-b-4 border-teal-500 w-fit">{{ content.h2Ventajas }}</h2>
        <ol class="space-y-4 list-none pl-0">
          <li v-for="(v, i) in content.ventajas" :key="i" class="flex gap-4 text-slate-600 leading-relaxed">
            <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-lg">{{ i + 1 }}</span>
            <span>{{ v }}</span>
          </li>
        </ol>
        <p class="mt-10 text-slate-600 leading-relaxed font-medium">{{ content.cierre }}</p>
        <div class="mt-10 flex flex-wrap gap-4">
          <a href="https://wa.me/56979796841" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-teal-700 transition-colors">Contactar por WhatsApp</a>
          <button type="button" @click="scrollToCalc" class="inline-flex items-center gap-2 border-2 border-teal-600 text-teal-600 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-teal-50 transition-colors">Cotizar con la calculadora</button>
        </div>
      </div>
    </section>
    <section class="py-16 md:py-20 bg-white" id="faqs">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 pb-3 border-b-4 border-teal-500 w-fit">Preguntas frecuentes: fletes Puente Alto</h2>
        <ul class="space-y-6">
          <li v-for="(faq, i) in content.faqs" :key="i" class="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 class="text-lg font-bold text-slate-900 mb-2">{{ faq.question }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ faq.answer }}</p>
          </li>
        </ul>
      </div>
    </section>
  </FletesComunaLayout>
</template>

<script setup>
import content from '~/data/comunas/puente-alto.js'

const siteUrl = 'https://fletespro.cl'
const routeSlug = 'puente-alto'
const currentUrl = `${siteUrl}/fletes-${routeSlug}`

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Fletes Puente Alto', item: currentUrl }
  ]
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Fletes y mudanzas en Puente Alto',
  name: 'Fletes Puente Alto',
  description: content.meta.description,
  provider: {
    '@type': 'LocalBusiness',
    name: 'FletesPro',
    url: siteUrl,
    telephone: '+56-9-7979-6841',
    address: { '@type': 'PostalAddress', addressLocality: 'Providencia', addressRegion: 'Región Metropolitana', addressCountry: 'CL' }
  },
  areaServed: { '@type': 'City', name: 'Puente Alto', containedInPlace: { '@type': 'AdministrativeArea', name: 'Región Metropolitana' } }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: content.faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
}

useHead({
  title: content.meta.title,
  meta: [
    { name: 'description', content: content.meta.description },
    { name: 'keywords', content: content.meta.keywords },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: content.meta.title },
    { property: 'og:description', content: content.meta.description.slice(0, 160) },
    { property: 'og:image', content: `${siteUrl}/og-image.jpg` },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: content.meta.title },
    { name: 'twitter:description', content: content.meta.description.slice(0, 160) }
  ],
  link: [{ rel: 'canonical', href: currentUrl }],
  script: [
    { type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema) },
    { type: 'application/ld+json', children: JSON.stringify(serviceSchema) },
    { type: 'application/ld+json', children: JSON.stringify(faqSchema) }
  ]
})

const scrollToCalc = () => {
  if (process.client) document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
