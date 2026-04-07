// https://nuxt.com/docs/api/configuration/nuxt-config
import { comunasRM } from './config/comunasRM.js'
import { beasties } from 'vite-plugin-beasties'

const rutasFletesComunas = comunasRM.map(c => `/fletes-${c.slug}`)

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  // SSR para mejor SEO
  ssr: true,
  
  // Critical CSS inlining: reduce render-blocking, mejora LCP
  vite: {
    plugins: [
      beasties({
        options: {
          preload: 'swap',
          pruneSource: true,
          inlineThreshold: 25000,
          minimumExternalSize: 1000
        }
      })
    ]
  },
  
  // Blog y páginas fletes por comuna: pre-renderizadas (estáticas)
  // Redirecciones 301: URLs antiguas de WordPress (fletespro.cl) → Nuxt (/blog/...)
  routeRules: {
    '/logo-portespro.png': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    '/blog': { prerender: true },
    '/blog/**': { prerender: true },
    '/cuanto-se-cobra-por-un-flete-en-chile': { redirect: { to: '/blog/cuanto-se-cobra-por-un-flete-en-chile', statusCode: 301 } },
    '/cuanto-se-cobra-por-un-flete-en-chile/': { redirect: { to: '/blog/cuanto-se-cobra-por-un-flete-en-chile', statusCode: 301 } },
    '/expertos-en-embalaje': { redirect: { to: '/blog/expertos-en-embalaje', statusCode: 301 } },
    '/expertos-en-embalaje/': { redirect: { to: '/blog/expertos-en-embalaje', statusCode: 301 } },
    '/fletes-baratos': { redirect: { to: '/blog/fletes-baratos', statusCode: 301 } },
    '/fletes-baratos/': { redirect: { to: '/blog/fletes-baratos', statusCode: 301 } },
    '/transporte-en-frio-con-amplia-experiencia': { redirect: { to: '/blog/transporte-en-frio-con-amplia-experiencia', statusCode: 301 } },
    '/transporte-en-frio-con-amplia-experiencia/': { redirect: { to: '/blog/transporte-en-frio-con-amplia-experiencia', statusCode: 301 } },
    '/transporte-en-frio': { redirect: { to: '/blog/transporte-en-frio-con-amplia-experiencia', statusCode: 301 } },
    '/transporte-en-frio/': { redirect: { to: '/blog/transporte-en-frio-con-amplia-experiencia', statusCode: 301 } },
    '/las-15-mejores-empresas-de-logistica-para-ecommerce-en-chile-en-2026': { redirect: { to: '/blog/las-15-mejores-empresas-de-logistica-para-ecommerce-en-chile-en-2026', statusCode: 301 } },
    '/las-15-mejores-empresas-de-logistica-para-ecommerce-en-chile-en-2026/': { redirect: { to: '/blog/las-15-mejores-empresas-de-logistica-para-ecommerce-en-chile-en-2026', statusCode: 301 } },
    '/las-15-mejores-empresas-de-logistica-para-ecommerce-en-chile-en-2024': { redirect: { to: '/blog/las-15-mejores-empresas-de-logistica-para-ecommerce-en-chile-en-2026', statusCode: 301 } },
    '/las-15-mejores-empresas-de-logistica-para-ecommerce-en-chile-en-2024/': { redirect: { to: '/blog/las-15-mejores-empresas-de-logistica-para-ecommerce-en-chile-en-2026', statusCode: 301 } },
    '/fletes-la-reina': { redirect: { to: '/fletes-en-la-reina', statusCode: 301 } },
    '/fletes-la-reina/': { redirect: { to: '/fletes-en-la-reina', statusCode: 301 } },
    '/fletes-chicureo': { redirect: { to: '/fletes-en-chicureo', statusCode: 301 } },
    '/fletes-chicureo/': { redirect: { to: '/fletes-en-chicureo', statusCode: 301 } },
    '/fletes-nunoa': { redirect: { to: '/fletes-en-nunoa', statusCode: 301 } },
    '/fletes-nunoa/': { redirect: { to: '/fletes-en-nunoa', statusCode: 301 } },
    // Transporte frío: solo versión en español (evita /en/ indexada con contenido incorrecto)
    '/en/transporte-frio': { redirect: { to: '/transporte-frio', statusCode: 301 } },
    '/en/transporte-frio/': { redirect: { to: '/transporte-frio', statusCode: 301 } },
    '/en/transporte-en-frio-santiago': { redirect: { to: '/transporte-en-frio-santiago', statusCode: 301 } },
    '/en/transporte-en-frio-santiago/': { redirect: { to: '/transporte-en-frio-santiago', statusCode: 301 } },
    // Prefijo /en/ duplicado (crawler / enlaces mal resueltos)
    '/en/en/transporte-frio': { redirect: { to: '/transporte-frio', statusCode: 301 } },
    '/en/en/transporte-frio/': { redirect: { to: '/transporte-frio', statusCode: 301 } },
    '/en/en/transporte-en-frio-santiago': { redirect: { to: '/transporte-en-frio-santiago', statusCode: 301 } },
    '/en/en/transporte-en-frio-santiago/': { redirect: { to: '/transporte-en-frio-santiago', statusCode: 301 } },
    '/guardamuebles': { redirect: { to: '/bodegaje', statusCode: 301 } },
    '/guardamuebles/': { redirect: { to: '/bodegaje', statusCode: 301 } },
    '/en/guardamuebles': { redirect: { to: '/en/bodegaje', statusCode: 301 } },
    '/en/guardamuebles/': { redirect: { to: '/en/bodegaje', statusCode: 301 } },
    ...Object.fromEntries(rutasFletesComunas.map(r => [r, { prerender: true }]))
  },
  
  // Nitro: prerender índice blog + cada artículo + todas las URLs /fletes-{comuna}
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog', ...rutasFletesComunas, '/fletes-talca', '/mudanzas-vitacura', '/bodegaje'],
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
    '@nuxtjs/sitemap',
    '@nuxt/image'
  ],
  
  // i18n: lazy en false — evita fallos de hidratación / mensajes no listos en SSR
  i18n: {
    baseUrl: 'https://fletespro.cl',
    seo: false,
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
    // Desactivado: evita redirigir /transporte-frio → /en/transporte-frio (navegador en inglés / Googlebot)
    // y que el índice priorice inglés. El español es el idioma por defecto sin prefijo (/ruta).
    detectBrowserLanguage: false
  },
  
  // Runtime config para variables de entorno públicas
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyD6_IKXikaZ2YFx5R8yKVpFPUe_S6WOKJI'
    }
  },
  
  // Configuración de SEO y performance
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s - FletesPro',
      // Critical CSS inline: LCP hero sin esperar entry.css
      style: [
        {
          textContent: '#hero-calculator h1{font-size:clamp(2.5rem,8vw,6rem);font-weight:900;color:#020617;line-height:.9;letter-spacing:-.05em;margin-bottom:2rem}#hero-calculator .container{width:100%;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}.text-5xl{font-size:3rem}.md\\:text-8xl{font-size:6rem}@media(min-width:768px){#hero-calculator .container{max-width:72rem;padding-left:1.5rem;padding-right:1.5rem}}'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo-portespro.png' },
        { rel: 'shortcut icon', type: 'image/png', href: '/logo-portespro.png' },
        { rel: 'apple-touch-icon', href: '/logo-portespro.png' }
        // Preconnects removidos (maps deferred, fonts no usados) - Lighthouse: máx 4, solo orígenes críticos
      ],
      meta: [
        { name: 'description', content: 'Fletes Santiago económicos desde $27.000. Cotización online instantánea, calculadora de precios, mudanzas y transporte en RM. Servicio 24/7. WhatsApp +56979796841.' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'FletesPro' },
        { name: 'publisher', content: 'FletesPro' },
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
    hostname: 'https://fletespro.cl',
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
