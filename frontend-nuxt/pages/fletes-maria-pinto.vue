<template>
  <FletesComunaLayout :hero="content.hero">
    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">{{ content.h2Ventajas }}</h2>
          <p class="text-slate-600 leading-relaxed mb-10 font-medium">¿Qué nos distingue? Razones para elegir nuestro servicio de fletes y mudanzas en la comuna:</p>
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
  </FletesComunaLayout>
</template>

<script setup>
import content from '~/data/comunas/maria-pinto.js'

const siteUrl = 'https://fletespro.cl'
const routeSlug = 'maria-pinto'

useHead({
  title: content.meta.title,
  meta: [
    { name: 'description', content: content.meta.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}/fletes-${routeSlug}` },
    { property: 'og:title', content: content.meta.title },
    { property: 'og:description', content: (content.meta.description || '').slice(0, 160) },
    { property: 'og:image', content: `${siteUrl}/og-image.jpg` },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: content.meta.title },
    { name: 'twitter:description', content: (content.meta.description || '').slice(0, 160) }
  ],
  link: [{ rel: 'canonical', href: `${siteUrl}/fletes-${routeSlug}` }]
})

const scrollToCalc = () => {
  if (process.client) document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
