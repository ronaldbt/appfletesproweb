<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />

      <div v-if="pending" class="container mx-auto px-4 py-20 text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        <p class="mt-4 text-slate-500">Cargando artículo...</p>
      </div>

      <div v-else-if="error || !page" class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-4xl font-black text-slate-900 mb-4">Artículo no encontrado</h1>
        <NuxtLink to="/blog" class="text-teal-600 hover:text-teal-700 font-bold">
          Volver al blog →
        </NuxtLink>
      </div>

      <article v-else>
        <!-- Hero Section -->
        <section class="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-slate-50">
          <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
          
          <div class="container mx-auto px-4 relative z-10">
            <div class="max-w-2xl mx-auto">
              <div class="flex items-center gap-3 mb-6">
                <NuxtLink to="/blog" class="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver al blog
                </NuxtLink>
              </div>

              <div class="flex items-center gap-3 mb-6">
                <time :datetime="page.date" class="text-xs font-black text-teal-600 uppercase tracking-wider">
                  {{ formatDate(page.date) }}
                </time>
                <span v-if="page.category" class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {{ page.category }}
                </span>
                <span v-if="page.author" class="text-xs text-slate-400">
                  Por {{ page.author }}
                </span>
              </div>

              <h1 class="text-4xl md:text-5xl font-black text-slate-950 leading-[1.1] tracking-tighter mb-6">
                {{ page.title }}
              </h1>

              <p v-if="page.description" class="text-lg text-slate-600 leading-relaxed mb-8">
                {{ page.description }}
              </p>

              <div v-if="page.image" class="aspect-video rounded-2xl overflow-hidden mb-8">
                <img :src="page.image" :alt="page.title" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <!-- Calculadora de fletes (solo artículo cuánto se cobra) - arriba de la tabla de contenidos -->
        <section v-if="route.params.slug === 'cuanto-se-cobra-por-un-flete-en-chile'" class="py-8 bg-white border-b border-slate-100">
          <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto">
              <PortesCalculator :is-hero="false" />
            </div>
          </div>
        </section>

        <!-- Video YouTube (solo artículo transporte en frío) - arriba de la tabla de contenidos -->
        <section v-if="route.params.slug === 'transporte-en-frio-con-amplia-experiencia'" class="py-8 bg-white border-b border-slate-100">
          <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto">
              <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Video: Transporte en frío FletesPro
              </h2>
              <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/YUJKAA-KX7w"
                  title="Transporte en frío FletesPro"
                  class="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- Tabla de contenidos - visible al inicio del contenido -->
        <section v-if="tocLinks.length" class="py-8 bg-white border-b border-slate-100">
          <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto">
              <BlogTableOfContents :links="tocLinks" />
            </div>
          </div>
        </section>

        <!-- Content Section -->
        <section class="py-16 bg-white">
          <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto prose prose-slate prose-lg">
              <ContentRenderer :value="page" />
            </div>
          </div>
        </section>

        <!-- Mapa - Providencia, Santiago, Chile -->
        <section class="py-16 bg-slate-50">
          <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto">
              <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                Ubicación - Providencia, Santiago
              </h2>
              <p class="text-slate-600 mb-6">
                Estamos ubicados en Providencia, Santiago de Chile. Contáctanos para coordinar tu flete o mudanza.
              </p>
              <div class="rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.627149317148!2d-70.6506!3d-33.4372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a80dd51f6b%3A0x5c1f29a82a0c78db!2sProvidencia%2C%20Santiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1706832000"
                  width="100%"
                  height="100%"
                  style="border:0; min-height: 400px;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Ubicación FletesPro - Providencia, Santiago"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-slate-900 text-white">
          <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto text-center">
              <h2 class="text-3xl md:text-4xl font-black mb-4">
                ¿Necesitas Fletes o Mudanzas?
              </h2>
              <p class="text-xl text-slate-300 mb-8">
                Contacta con FletesPro para obtener un presupuesto gratis y sin compromiso
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink
                  to="/contacto"
                  class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
                >
                  Solicitar Presupuesto
                </NuxtLink>
                <NuxtLink
                  to="/"
                  class="bg-white hover:bg-slate-100 text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
                >
                  Ver Servicios
                </NuxtLink>
              </div>
            </div>
          </div>
        </section>
      </article>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const lang = ref('es')
const route = useRoute()

const { data: page, pending, error } = await useAsyncData(`blog-${route.params.slug}`, () => 
  queryCollection('content').path(`/blog/${route.params.slug}`).first()
)

// TOC para todos los artículos: frontmatter (toc/headings) o extracción automática del body
const tocLinks = useArticleToc(page)

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO Meta Tags
const siteUrl = 'https://fletespro.cl'
const currentUrl = computed(() => page.value ? `${siteUrl}${page.value._path}` : `${siteUrl}/blog`)
const defaultImage = computed(() => page.value?.image ? `${siteUrl}${page.value.image}` : `${siteUrl}/og-image.jpg`)

// Article Schema
const articleSchema = computed(() => {
  if (!page.value) return null
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.value.title,
    description: page.value.description || page.value.title,
    image: defaultImage.value,
    datePublished: page.value.date,
    dateModified: page.value.date,
    author: {
      '@type': 'Organization',
      name: page.value.author || 'FletesPro',
      url: siteUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'FletesPro',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl.value
    },
    articleSection: page.value.category || 'Guías',
    keywords: page.value.tags ? page.value.tags.join(', ') : 'fletes, mudanzas, Santiago, regiones Chile'
  }
})

// Breadcrumb Schema
const breadcrumbSchema = computed(() => {
  if (!page.value) return null
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.value.title,
        item: currentUrl.value
      }
    ]
  }
})

useHead(() => {
  if (!page.value) return {}

  const keywords = page.value.tags ? page.value.tags.join(', ') : 'fletes, mudanzas, Santiago, regiones Chile, fletes baratos, blog fletes'
  const articleTags = page.value.tags || []

  return {
    title: `${page.value.title} | Blog FletesPro`,
    meta: [
      { name: 'x-app-version', content: 'blog-2026-02-02-video' },
      {
        name: 'description',
        content: page.value.description || page.value.title
      },
      {
        name: 'keywords',
        content: keywords
      },
      {
        name: 'author',
        content: page.value.author || 'FletesPro'
      },
      {
        name: 'publisher',
        content: 'FletesPro'
      },
      // Open Graph
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: currentUrl.value },
      { property: 'og:title', content: page.value.title },
      { property: 'og:description', content: page.value.description || page.value.title },
      { property: 'og:image', content: defaultImage.value },
      { property: 'og:site_name', content: 'FletesPro' },
      { property: 'og:locale', content: 'es_CL' },
      { property: 'article:published_time', content: page.value.date },
      { property: 'article:modified_time', content: page.value.date },
      { property: 'article:author', content: page.value.author || 'FletesPro' },
      { property: 'article:section', content: page.value.category || 'Guías' },
      ...articleTags.map(tag => ({ property: 'article:tag', content: tag })),
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: currentUrl.value },
      { name: 'twitter:title', content: page.value.title },
      { name: 'twitter:description', content: page.value.description || page.value.title },
      { name: 'twitter:image', content: defaultImage.value }
    ],
    link: [
      { rel: 'canonical', href: currentUrl.value }
    ],
    script: [
      ...(articleSchema.value ? [{
        type: 'application/ld+json',
        children: JSON.stringify(articleSchema.value)
      }] : []),
      ...(breadcrumbSchema.value ? [{
        type: 'application/ld+json',
        children: JSON.stringify(breadcrumbSchema.value)
      }] : [])
    ]
  }
})
</script>

<style>
.prose {
  @apply text-slate-700;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  @apply text-slate-900 font-black;
}

.prose h2 {
  @apply text-2xl md:text-3xl mt-12 mb-6 scroll-mt-24;
}

.prose h3 {
  @apply text-xl md:text-2xl mt-8 mb-4;
}

.prose p {
  @apply leading-relaxed mb-6 text-base;
}

.prose ul,
.prose ol {
  @apply mb-6 space-y-2;
}

.prose li {
  @apply leading-relaxed;
}

.prose strong {
  @apply font-black text-slate-900;
}

.prose a {
  @apply text-teal-600 hover:text-teal-700 font-bold underline;
}
</style>

