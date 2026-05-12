<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />
    <!-- Hero Section with Calculator -->
    <section id="bodegaje-calculator" class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
      <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
          <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
            {{ $t('pages.guardamuebles.hero.badge') }}
          </span>
          <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
            {{ $t('pages.guardamuebles.hero.title') }}
          </h1>
          <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
            {{ $t('pages.guardamuebles.hero.subtitle') }}
          </p>
        </div>

        <div class="animate-slide-up">
          <GuardamueblesCalculator />
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const scrollToCalc = () => {
  if (process.client) {
    document.getElementById('bodegaje-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const siteUrl = 'https://fletespro.cl'
const currentUrl = `${siteUrl}/bodegaje`
const defaultImage = `${siteUrl}/og-image.jpg`

useHead(() => ({
  title: `${t('pages.guardamuebles.hero.title')} | FletesPro`,
  meta: [
    { name: 'description', content: t('pages.guardamuebles.description') },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: `${t('pages.guardamuebles.hero.title')} | FletesPro` },
    { property: 'og:description', content: t('pages.guardamuebles.description') },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: `${t('pages.guardamuebles.hero.title')} | FletesPro` },
    { name: 'twitter:description', content: t('pages.guardamuebles.description') },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [{ rel: 'canonical', href: currentUrl }]
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
