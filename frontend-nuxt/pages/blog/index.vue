<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />

      <!-- Hero Section -->
      <section class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              Blog de Fletes y Mudanzas
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              Blog FletesPro
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              Guías, consejos e información sobre fletes, mudanzas y servicios de transporte en Santiago y Regiones
            </p>
          </div>
        </div>
      </section>

      <!-- Blog Posts Grid -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div v-if="pending" class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            <p class="mt-4 text-slate-500">Cargando artículos...</p>
          </div>

          <div v-else-if="error" class="text-center py-20">
            <p class="text-red-600">Error al cargar los artículos</p>
          </div>

          <div v-else-if="posts && posts.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <article
              v-for="post in posts"
              :key="post._path || post.path || post.title"
              class="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <NuxtLink 
                :to="`/blog/${getBlogSlug(post)}`" 
                class="block"
              >
                <div class="aspect-video bg-slate-100 overflow-hidden">
                  <img
                    v-if="post.image"
                    :src="post.image"
                    :alt="post.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    v-else
                    class="w-full h-full bg-gradient-to-br from-teal-600 to-slate-900 flex items-center justify-center"
                  >
                    <svg class="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                </div>

                <div class="p-6">
                  <div class="flex items-center gap-3 mb-3">
                    <time :datetime="post.date" class="text-xs font-black text-teal-600 uppercase tracking-wider">
                      {{ formatDate(post.date) }}
                    </time>
                    <span v-if="post.category" class="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {{ post.category }}
                    </span>
                  </div>

                  <h2 class="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-teal-600 transition-colors">
                    {{ post.title }}
                  </h2>

                  <p v-if="post.description" class="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {{ post.description }}
                  </p>

                  <div class="flex items-center justify-between">
                    <span class="text-sm font-bold text-teal-600 group-hover:text-teal-700 transition-colors">
                      Leer más →
                    </span>
                    <span class="text-xs text-slate-400">
                      Por {{ post.author || 'Ronald Bravo' }} · FletesPro
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </article>
          </div>

          <div v-else class="text-center py-20">
            <p class="text-slate-500">No hay artículos disponibles</p>
          </div>
        </div>
      </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const lang = ref('es')

const { data: postsData, pending, error } = await useAsyncData('blog-posts', async () => {
  try {
    const allContent = await queryCollection('content').all()
    // Filtrar solo los posts del blog y ordenar por fecha
    if (allContent && Array.isArray(allContent)) {
      const blogPosts = allContent
        .filter(item => {
          const path = item._path || item.path || ''
          return path.startsWith('/blog/') && path !== '/blog/'
        })
        .sort((a, b) => {
          const dateA = new Date(a.date || 0)
          const dateB = new Date(b.date || 0)
          return dateB - dateA
        })
      return blogPosts
    }
    return []
  } catch (err) {
    console.error('Error fetching blog posts:', err)
    return []
  }
})

const posts = computed(() => postsData.value || [])

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Función para obtener el slug del artículo desde su path (formato: slug.md sin fecha)
const getBlogSlug = (post) => {
  if (!post) return ''
  const path = post._path || post.path || post.id || ''
  if (!path) return ''
  if (path.startsWith('/blog/')) return path.replace('/blog/', '')
  const pathParts = path.split('/')
  return pathParts[pathParts.length - 1] || path.replace(/^\/blog/, '')
}

// SEO Meta Tags
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || 'https://fletespro.cl').replace(/\/$/, '')
const currentUrl = `${siteUrl}/blog`
const defaultImage = `${siteUrl}/og-image.jpg`

useHead({
  title: 'Blog de Fletes y Mudanzas | Guías y Consejos | FletesPro',
  meta: [
    {
      name: 'description',
      content: 'Blog de FletesPro con guías, consejos e información sobre fletes, mudanzas y servicios de transporte en Santiago y Regiones. Fletes baratos y económicos.'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: 'Blog de Fletes y Mudanzas | FletesPro' },
    { property: 'og:description', content: 'Guías, consejos e información sobre fletes y mudanzas en Santiago y Regiones' },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_CL' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: 'Blog de Fletes y Mudanzas | FletesPro' },
    { name: 'twitter:description', content: 'Guías y consejos sobre fletes y mudanzas en Chile' },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [
    { rel: 'canonical', href: currentUrl }
  ]
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

