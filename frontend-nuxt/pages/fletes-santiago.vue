<template>
  <FletesComunaLayout :hero="content.hero">
    <!-- Precio fletes Santiago / estimativo (contenido movido desde home) -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 class="text-3xl font-black text-slate-900 mb-4">{{ content.precioEstimativo.h2 }}</h2>
            <p class="text-slate-600 leading-relaxed mb-6">{{ content.precioEstimativo.p1 }}</p>
            <p class="text-lg font-black text-slate-800 mb-4">{{ content.precioEstimativo.h3 }}</p>
            <p class="text-slate-600 leading-relaxed">{{ content.precioEstimativo.p2 }}</p>
            <p class="text-slate-600 leading-relaxed mt-4">{{ content.precioEstimativo.p3 }}</p>
          </div>
          <figure class="rounded-2xl border border-slate-200 overflow-hidden shadow-lg bg-white">
            <img
              src="/ejemplo-flete-sencillo.webp"
              :alt="content.precioEstimativo.imgAlt"
              width="600"
              height="400"
              class="w-full h-auto object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>

    <!-- Precios Fletes Santiago 2026 -->
    <section class="py-16 bg-slate-50">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-3xl font-black text-slate-900 mb-2">{{ content.precios.h2 }}</h2>
        <p class="text-slate-600 mb-8">{{ content.precios.intro }}</p>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-xl font-black text-slate-900 mb-3">Fletes Región Metropolitana: $28.000 + $2.000/km</h3>
            <p class="text-slate-600 text-sm mb-4">{{ content.precios.rm }}</p>
            <p v-if="content.precios.ejemplosTitulo" class="text-sm font-black text-slate-800 mb-2">{{ content.precios.ejemplosTitulo }}</p>
            <ul v-if="content.precios.ejemplos?.length" class="text-slate-600 text-sm space-y-1">
              <li v-for="(ej, i) in content.precios.ejemplos" :key="i">{{ ej }}</li>
            </ul>
          </div>
          <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-xl font-black text-slate-900 mb-3">Fletes Santiago a regiones: $1500/km</h3>
            <p class="text-slate-600 text-sm mb-4">{{ content.precios.regiones }}</p>
            <p v-if="content.precios.cierreRegiones" class="text-slate-600 text-sm">{{ content.precios.cierreRegiones }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Fletes Santiago centro y comunas -->
    <section class="py-16 bg-slate-50">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-3xl font-black text-slate-900 mb-4">{{ content.centroYComunas.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.centroYComunas.p1 }}</p>
        <p class="text-slate-600 leading-relaxed">{{ content.centroYComunas.p2 }}</p>
      </div>
    </section>

    <!-- Ventajas -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">{{ content.h2Ventajas }}</h2>
          <p class="text-slate-600 leading-relaxed mb-10 font-medium">¿Qué nos distingue? Razones para elegir nuestro servicio de fletes y mudanzas en Santiago:</p>
          <ol class="space-y-5 list-none pl-0">
            <li
              v-for="(v, i) in content.ventajas"
              :key="i"
              class="flex gap-4 text-slate-600 leading-relaxed font-medium"
            >
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
      </div>
    </section>

    <!-- Tipos de fletes -->
    <section class="py-16 bg-slate-50">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-3xl font-black text-slate-900 mb-6">Tipos de fletes que realizamos en Santiago</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(t, i) in content.tipos" :key="i" class="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 class="text-lg font-black text-slate-900 mb-2">{{ t.h3 }}</h3>
            <p class="text-slate-600 text-sm">{{ t.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Camiones y camionetas para fletes en Santiago -->
    <section v-if="content.vehiculosYTipos" class="py-16 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-3xl font-black text-slate-900 mb-4">{{ content.vehiculosYTipos.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.vehiculosYTipos.intro }}</p>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.vehiculosYTipos.p2 }}</p>
        <p class="text-slate-600 leading-relaxed">{{ content.vehiculosYTipos.p3 }}</p>
      </div>
    </section>

    <!-- Presupuesto y tarifa fletes Santiago -->
    <section v-if="content.cotizarYPresupuesto" class="py-16 bg-slate-50">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-3xl font-black text-slate-900 mb-4">{{ content.cotizarYPresupuesto.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.cotizarYPresupuesto.intro }}</p>
        <p class="text-slate-600 leading-relaxed">{{ content.cotizarYPresupuesto.p2 }}</p>
      </div>
    </section>

    <!-- Rutas a regiones -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-3xl font-black text-slate-900 mb-4">{{ content.rutas.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-6">{{ content.rutas.p }}</p>
        <ul class="text-slate-600 space-y-1 columns-2 md:columns-3 gap-x-6">
          <li v-for="(item, i) in content.rutas.items" :key="i">{{ item }}</li>
        </ul>
      </div>
    </section>

    <!-- Fletes Santiago a regiones (contenido movido desde home) -->
    <section class="py-20 bg-slate-50">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-black text-slate-900 mb-6">{{ content.fletesSantiagoRegiones.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.fletesSantiagoRegiones.p1 }}</p>
        <p class="text-slate-600 leading-relaxed mb-3">{{ content.fletesSantiagoRegiones.ciudadesTitulo }}</p>
        <ul class="list-disc list-inside text-slate-600 space-y-1 mb-4 columns-2 md:columns-3 gap-x-6">
          <li v-for="(ciudad, i) in content.fletesSantiagoRegiones.ciudades" :key="i">{{ ciudad }}</li>
        </ul>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.fletesSantiagoRegiones.p2 }}</p>
        <p class="text-slate-600 leading-relaxed">{{ content.fletesSantiagoRegiones.p3 }}</p>
      </div>
    </section>

    <!-- Preguntas frecuentes: fletes Santiago -->
    <section class="py-16 md:py-20 bg-white border-t border-slate-100" id="faqs">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 pb-3 border-b-4 border-teal-500 w-fit">Preguntas frecuentes: fletes Santiago</h2>
        <ul class="space-y-6">
          <li v-for="(faq, i) in content.faqs" :key="i" class="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 class="text-lg font-bold text-slate-900 mb-2">{{ faq.question }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ faq.answer }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Enlaces internos: servicios relacionados -->
    <section class="py-16 md:py-20 bg-slate-50 border-t border-slate-100">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-teal-500 w-fit">Servicios relacionados</h2>
        <p class="text-slate-600 leading-relaxed mb-6">Si además de fletes en Santiago necesitas mudanzas, transporte refrigerado o quieres ver precios por comuna, revisa estas páginas:</p>
        <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li>
            <NuxtLink to="/mudanzas-santiago" class="block px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:border-teal-500 hover:bg-teal-50/50 hover:text-teal-700 transition-colors">
              Mudanzas Santiago
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/transporte-frio" class="block px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:border-teal-500 hover:bg-teal-50/50 hover:text-teal-700 transition-colors">
              Transporte en frío
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/blog" class="block px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:border-teal-500 hover:bg-teal-50/50 hover:text-teal-700 transition-colors">
              Blog
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/fletes-las-condes" class="block px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:border-teal-500 hover:bg-teal-50/50 hover:text-teal-700 transition-colors">
              Fletes Las Condes
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/fletes-maipu" class="block px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:border-teal-500 hover:bg-teal-50/50 hover:text-teal-700 transition-colors">
              Fletes Maipú
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/fletes-providencia" class="block px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:border-teal-500 hover:bg-teal-50/50 hover:text-teal-700 transition-colors">
              Fletes Providencia
            </NuxtLink>
          </li>
        </ul>
        <p class="text-slate-500 text-sm mt-6">
          <NuxtLink to="/" class="text-teal-600 font-semibold hover:underline">Inicio</NuxtLink> · Fletes Santiago
        </p>
      </div>
    </section>
  </FletesComunaLayout>
</template>

<script setup>
import content from '~/data/comunas/santiago.js'

const siteUrl = 'https://fletespro.cl'
const currentUrl = `${siteUrl}/fletes-santiago`

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: content.faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Fletes Santiago', item: currentUrl }
  ]
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Fletes Santiago',
  description: content.meta.description,
  provider: {
    '@type': 'LocalBusiness',
    name: 'FletesPro',
    url: siteUrl,
    telephone: '+56-9-7979-6841',
    areaServed: { '@type': 'City', name: 'Santiago', containedInPlace: { '@type': 'AdministrativeArea', name: 'Región Metropolitana' } }
  },
  areaServed: { '@type': 'City', name: 'Santiago' },
  url: currentUrl
}

useHead({
  title: content.meta.title,
  meta: [
    { name: 'description', content: content.meta.description },
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
    { type: 'application/ld+json', innerHTML: JSON.stringify(faqSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbSchema) },
    { type: 'application/ld+json', innerHTML: JSON.stringify(serviceSchema) }
  ]
})

const scrollToCalc = () => {
  if (process.client) document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
