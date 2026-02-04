// https://nuxt.com/docs/api/configuration/nuxt-config
import { comunasRM } from './config/comunasRM.js'

const rutasFletesComunas = comunasRM.map(c => `/fletes-${c.slug}`)

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  // SSR para mejor SEO
  ssr: true,
  
  // Blog y páginas fletes por comuna: pre-renderizadas (estáticas)
  routeRules: {
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    ...Object.fromEntries(rutasFletesComunas.map(r => [r, { prerender: true }]))
  },
  
  // Nitro: prerender índice blog + cada artículo + todas las URLs /fletes-{comuna}
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/blog', ...rutasFletesComunas],
      failOnError: false
    }
  },
  
  // Nuxt Content: ids en headings (rehype-slug) + TOC automático
  // rehype-slug: añade id a h2, h3 para que los enlaces #section funcionen
  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 2 },
        rehypePlugins: {
          'rehype-slug': {}
        }
      }
    }
  },
  
  // Módulos
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],
  
  // Configuración i18n
  i18n: {
    locales: [
      { code: 'es', iso: 'es-ES', file: 'es.json', name: 'Español' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' }
    ],
    lazy: false,
    langDir: 'locales',
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    compilation: {
      strictMessage: false,
      escapeHtml: false
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    }
  },
  
  // Runtime config para variables de entorno públicas
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyD6_IKXikaZ2YFx5R8yKVpFPUe_S6WOKJI'
    }
  },
  
  // Configuración de SEO
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s - FletesPro',
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo-portespro.png' },
        { rel: 'shortcut icon', type: 'image/png', href: '/logo-portespro.png' },
        { rel: 'apple-touch-icon', href: '/logo-portespro.png' }
      ],
      meta: [
        { name: 'description', content: 'FletesPro - Fletes y mudanzas en Santiago y regiones de Chile. Cotiza tu flete online. Presupuesto gratis.' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'FletesPro' },
        { name: 'language', content: 'Spanish' },
        { name: 'geo.region', content: 'CL-RM' },
        { name: 'geo.placename', content: 'Santiago' },
        { name: 'geo.position', content: '-33.4372;-70.6506' },
        { name: 'ICBM', content: '-33.4372, -70.6506' }
      ]
    }
  },
  
  // Configuración de Sitemap
  sitemap: {
    hostname: 'https://app.fletespro.cl',
    gzip: true,
    exclude: [
      '/dashboard-admin/**',
      '/dashboard-cliente/**',
      '/dashboard-conductor/**',
      '/login',
      '/register',
      '/cliente/**',
      '/conductor/**',
      '/test',
      '/no-disponible',
      '/api/**'
    ],
    routes: async () => {
      try {
        const fs = await import('fs').then(m => m.promises)
        const path = await import('path')
        const cwd = process.cwd()
        const blogDir = path.join(cwd, 'content', 'blog')
        const blogFiles = await fs.readdir(blogDir)
        const blogSlugs = blogFiles
          .filter(f => f.endsWith('.md'))
          .map(f => f.replace('.md', ''))
        const blogRoutes = blogSlugs.map(slug => `/blog/${slug}`)
        const { comunasRM } = await import('./config/comunasRM.js')
        const comunaRoutes = comunasRM.map(c => `/fletes-${c.slug}`)
        return [...blogRoutes, ...comunaRoutes]
      } catch {
        return []
      }
    },
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    }
  }
})
