<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <PortesNavbar @get-quote="scrollToCalc" />
    <PortesLanguageSwitcher :current-lang="lang" @lang-change="lang = $event" />

    <main class="flex-grow">
      <Breadcrumbs />
      <!-- Hero + Calculadora (estructura base igual en todas) -->
      <section id="hero-calculator" class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              Fletes {{ comunaName }}
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              Fletes en {{ comunaName }}
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              {{ contenido?.intro }}
            </p>
          </div>
          <div class="animate-slide-up">
            <PortesCalculator :is-hero="true" />
          </div>
        </div>
      </section>

      <!-- Ventajas de tomar nuestro servicio (contenido único por comuna, como fletespro.cl) -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">
              Ventajas de tomar nuestro servicio
            </h2>
            <p class="text-slate-600 leading-relaxed mb-10 font-medium">
              ¿Qué nos distingue? Razones para elegir nuestro servicio de fletes y mudanzas en {{ comunaName }}:
            </p>
            <ol class="space-y-5 list-none pl-0">
              <li
                v-for="(ventaja, i) in contenido?.ventajas"
                :key="i"
                class="flex gap-4 text-slate-600 leading-relaxed font-medium"
              >
                <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-lg">
                  {{ i + 1 }}
                </span>
                <span>{{ ventaja }}</span>
              </li>
            </ol>
            <p class="mt-10 text-slate-600 leading-relaxed font-medium">
              {{ contenido?.cierre }}
            </p>
            <div class="mt-10 flex flex-wrap gap-4">
              <a
                href="https://wa.me/56979796841"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-teal-700 transition-colors"
              >
                Contactar por WhatsApp
              </a>
              <button
                type="button"
                @click="scrollToCalc"
                class="inline-flex items-center gap-2 border-2 border-teal-600 text-teal-600 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-teal-50 transition-colors"
              >
                Cotizar con la calculadora
              </button>
            </div>
          </div>
        </div>
      </section>

      <PortesStats />
      <PortesTestimonials />
    </main>

    <PortesFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { comunasRM } from '~/config/comunasRM'
import { getContenidoComuna } from '~/data/contenidoComunas.js'

const route = useRoute()
const { t } = useI18n()
const lang = ref('es')

const comunaSlug = computed(() => route.params.comuna || '')
const comuna = computed(() => comunasRM.find(c => c.slug === comunaSlug.value))
const comunaName = computed(() => comuna.value?.name || comunaSlug.value)

const contenido = ref(null)
onMounted(() => {
  contenido.value = getContenidoComuna(comunaSlug.value) || {
    intro: `Servicio de fletes y mudanzas en ${comunaName.value}. Cotiza con la calculadora o por WhatsApp. Presupuesto gratis.`,
    ventajas: [
      `Cobertura en ${comunaName.value} y toda la RM.`,
      'Precios competitivos y transparentes.',
      'Flota y equipo adecuados.',
      'Servicio personalizado.',
      'Experiencia y confiabilidad.',
      'Contacto directo por WhatsApp o calculadora.'
    ],
    cierre: `Contáctanos para fletes y mudanzas en ${comunaName.value}. Presupuesto gratis.`
  }
})

definePageMeta({
  validate: (route) => {
    const s = route.params.comuna
    return typeof s === 'string' && comunasRM.some(c => c.slug === s)
  }
})

const scrollToCalc = () => {
  if (process.client) {
    document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const siteUrl = 'https://app.fletespro.cl'
const currentUrl = computed(() => `${siteUrl}/fletes-${comunaSlug.value}`)
const defaultImage = `${siteUrl}/og-image.jpg`

useHead(computed(() => ({
  title: `Fletes ${comunaName.value} | Fletes y mudanzas | FletesPro`,
  meta: [
    { name: 'description', content: `Fletes en ${comunaName.value}. Fletes y mudanzas en la Región Metropolitana. Cotiza online. Presupuesto gratis. FletesPro.` },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl.value },
    { property: 'og:title', content: `Fletes ${comunaName.value} | FletesPro` },
    { property: 'og:description', content: contenido.value?.intro?.slice(0, 160) || `Fletes y mudanzas en ${comunaName.value}. Presupuesto gratis.` },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl.value },
    { name: 'twitter:title', content: `Fletes ${comunaName.value} | FletesPro` },
    { name: 'twitter:description', content: contenido.value?.intro?.slice(0, 160) || `Fletes y mudanzas en ${comunaName.value}. FletesPro.` },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [
    { rel: 'canonical', href: currentUrl.value }
  ]
})))
</script>
