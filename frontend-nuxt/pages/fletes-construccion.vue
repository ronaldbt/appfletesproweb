<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />
    <section id="hero-calculator" class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
      <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
          <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
            Fletes para constructoras
          </span>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-slate-950 leading-tight tracking-tighter mb-8">
            Fletes para constructoras en la Región Metropolitana
          </h1>
          <p class="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium">
            Fletes de materiales de construcción, compras a pedido, arriendo de equipos y transporte de materiales. Servicio integral para constructoras en Santiago y toda la RM.
          </p>
          <p class="mt-4 text-base text-slate-500 max-w-2xl mx-auto">
            Realizamos fletes materiales construcción y fletes para construcción con precios claros. Cotiza por WhatsApp o con la calculadora.
          </p>
        </div>
        <div class="animate-slide-up">
          <PortesCalculator :is-hero="true" />
        </div>
      </div>
    </section>

    <!-- Servicios para constructoras -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
            Servicios para constructoras
          </h2>
          <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Soluciones de fletes y logística para empresas constructoras en la Región Metropolitana
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2">
            <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">Flete de materiales de construcción</h3>
            <p class="text-slate-600 leading-relaxed font-medium">
              Fletes materiales construcción y fletes de materiales de construcción en Santiago y RM. Transporte de cemento, áridos, fierros, tabiquería y más. Flete material construcción Av. Matta y toda la RM.
            </p>
          </div>
          <div class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2">
            <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">Compras a pedido (personal shopper)</h3>
            <p class="text-slate-600 leading-relaxed font-medium">
              Vamos a distintas tiendas y compramos por usted. Servicio personal shopper para constructoras: materiales, ferretería, sanitarios, revestimientos. Coordinamos retiro y entrega en obra.
            </p>
          </div>
          <div class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2">
            <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">Arriendo de equipos</h3>
            <p class="text-slate-600 leading-relaxed font-medium">
              Arriendo fletes construcción y precio arriendo fletes construcción. Camión para fletes 20 toneladas construcción y costo arriendo. Coordinamos equipos según necesidad de su obra.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Rutas y cobertura -->
    <section class="py-24 bg-slate-50">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6">Fletes de materiales a regiones</h2>
        <p class="text-slate-600 leading-relaxed mb-4">
          Realizamos flete de materiales construcción de Santiago a San Felipe y a otras regiones. Permiso para efectuar fletes transporte de materiales de construcción. Fletes para construcción en toda la Región Metropolitana.
        </p>
        <p class="text-slate-600 leading-relaxed">
          Contáctanos por WhatsApp para cotizar flete de materiales construcción o fletes materiales construcción según origen, destino y volumen.
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24 bg-white">
      <div class="container mx-auto px-4 max-w-4xl text-center">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4">¿Constructoras o empresas de obra?</h2>
        <p class="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Fletes de materiales de construcción, compras a pedido, arriendo de equipos. Cotiza sin compromiso.
        </p>
        <a
          href="https://wa.me/56979796841?text=Hola,%20necesito%20cotizar%20fletes%20para%20constructora"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg transition-all hover:scale-105"
        >
          Cotizar por WhatsApp
        </a>
      </div>
    </section>

    <PortesStats />
    <PortesTestimonials />
  </div>
</template>

<script setup>
const siteUrl = 'https://fletespro.cl'
const currentUrl = `${siteUrl}/fletes-construccion`

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Fletes para Constructoras', item: currentUrl }
  ]
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Fletes para constructoras y transporte de materiales de construcción',
  name: 'Fletes para Constructoras',
  description: 'Fletes de materiales de construcción, compras a pedido para constructoras, arriendo de equipos. Servicio integral en la Región Metropolitana.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'FletesPro',
    url: siteUrl,
    telephone: '+56-9-7979-6841'
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Región Metropolitana'
  }
}

useHead({
  title: 'Fletes para Constructoras | Fletes materiales construcción | FletesPro',
  meta: [
    { name: 'description', content: 'Fletes para constructoras en la Región Metropolitana. Fletes de materiales de construcción, compras a pedido, arriendo de equipos. Personal shopper para constructoras. Cotiza por WhatsApp.' },
    { name: 'keywords', content: 'flete de materiales construccion, fletes materiales construccion, fletes de materiales de construccion, arriendo fletes construccion, camion para fletes 20 toneladas construccion, flete de materiales construccion de santiago a san felipe, flete material construccion av matta, fletes para construccion, permiso para efectuar fletes transporte de materiales de construccion, precio arriendo fletes construccion' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: 'Fletes para Constructoras | FletesPro' },
    { property: 'og:description', content: 'Fletes de materiales de construcción, compras a pedido y arriendo de equipos para constructoras en la RM.' },
    { property: 'og:image', content: `${siteUrl}/og-image.jpg` },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Fletes para Constructoras | FletesPro' },
    { name: 'twitter:description', content: 'Fletes de materiales de construcción, compras a pedido y arriendo de equipos para constructoras.' }
  ],
  link: [{ rel: 'canonical', href: currentUrl }],
  script: [
    { type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema) },
    { type: 'application/ld+json', children: JSON.stringify(serviceSchema) }
  ]
})
</script>
