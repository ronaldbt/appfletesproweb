<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />
    <section id="bodegaje-calculator" class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
      <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-10 md:mb-14 animate-fade-in max-w-4xl mx-auto">
          <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
            {{ $t('pages.guardamuebles.hero.badge') }}
          </span>
          <h1 class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-950 leading-[0.95] tracking-tighter mb-6 md:mb-8">
            {{ h1Title }}
          </h1>
          <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
            {{ heroSubtitle }}
          </p>
        </div>

        <BodegajeVolumePicker @select-volume="onVolumeSelect" />

        <div class="animate-slide-up">
          <GuardamueblesCalculator :volume-hint="volumeHint" />
        </div>
      </div>
    </section>

    <BodegajePageSections @scroll-to-calculator="scrollToCalc" />

    <PortesStats />
    <PortesTestimonials />

    <div class="fixed top-0 left-0 w-full h-full -z-40 pointer-events-none opacity-30 overflow-hidden">
      <div class="absolute top-1/4 -right-1/4 w-[700px] h-[700px] bg-teal-200/20 rounded-full blur-[180px] animate-float-1" />
      <div class="absolute bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-slate-300/40 rounded-full blur-[180px] animate-float-2" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getBodegajeComunaBySlug } from '~/config/bodegajeComunas.js'

const route = useRoute()
const { t, locale } = useI18n()

const meta = getBodegajeComunaBySlug(route.params.slug)
if (!meta) {
  throw createError({ statusCode: 404, statusMessage: 'Página no encontrada' })
}

const comunaLabel = meta.comunaLabel
const h1Title = computed(() => t('pages.guardamuebles.comuna.h1', { comuna: comunaLabel }))
const heroSubtitle = computed(() => t('pages.guardamuebles.comuna.subtitle', { comuna: comunaLabel }))

const volumeHint = ref(null)

function onVolumeSelect (m3) {
  volumeHint.value = m3 === null ? 'help' : m3
}

const scrollToCalc = () => {
  if (process.client) {
    document.getElementById('bodegaje-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const siteUrl = 'https://fletespro.cl'
const pathEs = `/bodegaje/${meta.slug}`
const canonicalPath = computed(() => (locale.value === 'en' ? `/en${pathEs}` : pathEs))
const currentUrl = computed(() => `${siteUrl}${canonicalPath.value}`)
const defaultImage = `${siteUrl}/og-image.jpg`
const pageTitle = computed(() => `${h1Title.value} | ${t('pages.guardamuebles.hero.title')} | FletesPro`)
const pageDesc = computed(() => t('pages.guardamuebles.comuna.metaDescription', { comuna: comunaLabel }))

useHead(() => ({
  title: pageTitle.value,
  meta: [
    { name: 'description', content: pageDesc.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl.value },
    { property: 'og:title', content: pageTitle.value },
    { property: 'og:description', content: pageDesc.value },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: locale.value === 'en' ? 'en_US' : 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl.value },
    { name: 'twitter:title', content: pageTitle.value },
    { name: 'twitter:description', content: pageDesc.value },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [{ rel: 'canonical', href: currentUrl.value }]
}))
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes float-1 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(80px, -40px); }
  66% { transform: translate(-40px, 80px); }
}
@keyframes float-2 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-60px, 100px); }
  66% { transform: translate(100px, -60px); }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fade-in 1s ease-out; }
.animate-slide-up { animation: slide-up 0.8s ease-out 0.3s both; }
.animate-float-1 { animation: float-1 25s infinite linear; }
.animate-float-2 { animation: float-2 30s infinite linear; }
</style>
