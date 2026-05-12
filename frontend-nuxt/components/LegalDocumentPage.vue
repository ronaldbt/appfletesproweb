<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />

    <section class="relative pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden bg-slate-50">
      <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
      <div class="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm border border-slate-200">
          {{ t(`pages.${i18nRoot}.badge`) }}
        </span>
        <h1 class="text-4xl md:text-6xl font-black text-slate-950 leading-tight tracking-tighter mb-4">
          {{ t(`pages.${i18nRoot}.h1`) }}
        </h1>
        <p class="text-sm text-slate-500 font-medium">
          {{ t(`pages.${i18nRoot}.updated`) }}
        </p>
      </div>
    </section>

    <section class="py-12 md:py-16 bg-white">
      <div class="container mx-auto px-4 max-w-3xl">
        <p class="text-slate-600 leading-relaxed font-medium mb-10 border-l-4 border-teal-500 pl-4">
          {{ t(`pages.${i18nRoot}.disclaimer`) }}
        </p>
        <article class="space-y-10 text-slate-700 leading-relaxed">
          <div v-for="(section, idx) in sections" :key="idx">
            <h2 class="text-xl md:text-2xl font-black text-slate-900 mb-3 tracking-tight">
              {{ section.title }}
            </h2>
            <p v-for="(para, pIdx) in section.paragraphs" :key="pIdx" class="font-medium mb-4 last:mb-0">
              {{ para }}
            </p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  i18nRoot: {
    type: String,
    required: true
  },
  canonicalPath: {
    type: String,
    required: true
  }
})

const { t, tm, locale } = useI18n()
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://fletespro.cl').replace(/\/$/, '')

const currentUrl = computed(() => `${siteUrl}${props.canonicalPath}`)
const defaultImage = `${siteUrl}/og-image.jpg`

const sections = computed(() => {
  const raw = tm(`pages.${props.i18nRoot}.sections`)
  if (!Array.isArray(raw)) return []
  return raw.map((s) => ({
    title: typeof s.title === 'string' ? s.title : '',
    paragraphs: Array.isArray(s.paragraphs) ? s.paragraphs.filter(p => typeof p === 'string') : []
  }))
})

useHead(computed(() => ({
  title: t(`pages.${props.i18nRoot}.seo.title`),
  meta: [
    { name: 'description', content: t(`pages.${props.i18nRoot}.seo.description`) },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl.value },
    { property: 'og:title', content: t(`pages.${props.i18nRoot}.seo.ogTitle`) },
    { property: 'og:description', content: t(`pages.${props.i18nRoot}.seo.ogDescription`) },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: locale.value === 'en' ? 'en_US' : 'es_CL' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl.value },
    { name: 'twitter:title', content: t(`pages.${props.i18nRoot}.seo.ogTitle`) },
    { name: 'twitter:description', content: t(`pages.${props.i18nRoot}.seo.ogDescription`) },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [
    { rel: 'canonical', href: currentUrl.value }
  ]
})))
</script>
