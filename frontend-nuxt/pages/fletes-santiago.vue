<template>
  <FletesComunaLayout :hero="content.hero">
    <!-- Precios Fletes Santiago 2026 -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-3xl font-black text-slate-900 mb-2">{{ content.precios.h2 }}</h2>
        <p class="text-slate-600 mb-6">{{ content.precios.intro }}</p>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 class="text-xl font-black text-slate-900 mb-3">Fletes Región Metropolitana</h3>
            <p class="text-slate-600 text-sm">{{ content.precios.rm }}</p>
          </div>
          <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 class="text-xl font-black text-slate-900 mb-3">Fletes Santiago a regiones</h3>
            <p class="text-slate-600 text-sm">{{ content.precios.regiones }}</p>
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
  </FletesComunaLayout>
</template>

<script setup>
import content from '~/data/comunas/santiago.js'

const siteUrl = 'https://fletespro.cl'

useHead({
  title: content.meta.title,
  meta: [
    { name: 'description', content: content.meta.description },
    { name: 'keywords', content: content.meta.keywords },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}/fletes-santiago` },
    { property: 'og:title', content: content.meta.title },
    { property: 'og:description', content: content.meta.description.slice(0, 160) },
    { property: 'og:image', content: `${siteUrl}/og-image.jpg` },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: content.meta.title },
    { name: 'twitter:description', content: content.meta.description.slice(0, 160) }
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/fletes-santiago` }]
})

const scrollToCalc = () => {
  if (process.client) document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
