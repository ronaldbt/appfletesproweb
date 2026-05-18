<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />

    <!-- Hero -->
    <section class="relative pt-4 pb-16 md:pb-20 overflow-hidden bg-slate-50">
      <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
      <div class="container mx-auto px-4 relative z-10 max-w-4xl">
        <span class="inline-block bg-white text-teal-700 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm border border-slate-200">
          Empresa de Fletes Santiago · Historia
        </span>
        <h1 class="text-4xl md:text-6xl font-black text-slate-950 leading-[0.95] tracking-tighter mb-6">
          Empresa de Fletes en Santiago: quiénes somos
        </h1>
        <p class="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
          FletesPro nació en Santiago tras la pandemia, combinando tecnología y servicio personalizado. Hoy somos una empresa de logística integral con precio transparente, calculadora online y cobertura en toda la RM.
        </p>
      </div>
    </section>

    <!-- Historia principal + imagen -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <div class="grid md:grid-cols-5 gap-10 items-start">
          <div class="md:col-span-3 space-y-6 text-slate-600 leading-relaxed font-medium">
            <h2 class="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              De una camioneta a una empresa de fletes en Santiago
            </h2>
            <p>
              Soy <strong>Ronald Bravo</strong>, fundador de FletesPro. Regresé a Chile después de la pandemia con un título de ingeniería informática y sin un trabajo estable. Como en casa había una camioneta sin mayor uso, decidí inscribirme en algunas plataformas de fletes para generar un ingreso extra mientras encontraba algo en mi área.
            </p>
            <p>
              Lo que empezó como un par de viajes al mes se fue convirtiendo, casi sin darme cuenta, en mi actividad principal. Cada flete era una conversación, una persona con una necesidad concreta y un presupuesto real.
            </p>
          </div>
          <figure class="md:col-span-2 rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
            <img
              src="/ejemplo-flete-sencillo.webp"
              alt="Camión FletesPro en servicio de flete en Santiago, Región Metropolitana"
              width="600"
              height="400"
              class="w-full h-auto object-cover"
              loading="eager"
            />
          </figure>
        </div>
      </div>
    </section>

    <!-- Problema + fórmula -->
    <section class="py-16 bg-slate-50">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">
          El problema que queríamos resolver
        </h2>
        <p class="text-slate-600 leading-relaxed font-medium mb-4">
          Me di cuenta de algo que me molestaba del sector: los precios eran opacos, arbitrarios, y dependían demasiado de con quién te tocara hablar ese día. Nadie te decía el precio antes de llegar. Nadie tenía una fórmula clara.
        </p>
        <p class="text-slate-600 leading-relaxed font-medium mb-8">
          Ahí fue donde entró mi formación. Combiné lo que sé de tecnología y posicionamiento web con lo que estaba aprendiendo del negocio en terreno, y construí una calculadora de precios transparente con una fórmula clara:
        </p>
        <div class="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl">
          <p class="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-3">Fórmula de cotización</p>
          <p class="text-lg md:text-xl font-black leading-snug">
            Precio = distancia (km) × tarifa + volumen (m³) + ayudantes
          </p>
          <p class="text-sm text-slate-400 mt-4 font-medium">
            Sin letra chica. El precio que ves antes de llamar es el precio que pagas.
          </p>
        </div>
      </div>
    </section>

    <!-- Crecimiento -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">
          Cómo creció FletesPro
        </h2>
        <p class="text-slate-600 leading-relaxed font-medium mb-6">
          De a poco, una camioneta se convirtieron en varios camiones. Sumamos:
        </p>
        <ul class="space-y-4 mb-8">
          <li
            v-for="(item, i) in growthItems"
            :key="i"
            class="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100"
          >
            <span class="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-black text-sm">{{ i + 1 }}</span>
            <span class="text-slate-700 font-medium leading-relaxed">{{ item }}</span>
          </li>
        </ul>
        <p class="text-slate-600 leading-relaxed font-medium">
          Hoy FletesPro es una empresa de logística integral consolidada en Santiago y con presencia en España, construida desde adentro del oficio, con tecnología propia y un compromiso que no cambia: que sepas exactamente cuánto vas a pagar antes de que lleguemos a tu puerta.
        </p>
      </div>
    </section>

    <!-- Números -->
    <section class="py-14 bg-teal-600 text-white">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-2xl font-black text-center mb-10 tracking-tight">Números que nos respaldan</h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(stat, i) in stats"
            :key="i"
            class="text-center p-4 rounded-2xl bg-white/10 border border-white/20"
          >
            <p class="text-3xl md:text-4xl font-black tracking-tighter mb-1">{{ stat.value }}</p>
            <p class="text-[10px] font-black uppercase tracking-widest text-teal-100">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Chile y España -->
    <section class="py-16 md:py-20 bg-slate-50">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">
          Empresa de logística integral con presencia en Chile y España
        </h2>
        <p class="text-slate-600 leading-relaxed font-medium mb-4">
          Hoy FletesPro es una empresa de logística integral con operaciones en dos países. En Chile bajo el dominio
          <NuxtLink to="/" class="text-teal-600 font-semibold hover:underline">fletespro.cl</NuxtLink>, cubriendo
          <NuxtLink to="/fletes-santiago" class="text-teal-600 font-semibold hover:underline">fletes</NuxtLink>,
          <NuxtLink to="/mudanzas/particulares" class="text-teal-600 font-semibold hover:underline">mudanzas</NuxtLink>,
          <NuxtLink to="/transporte-frio" class="text-teal-600 font-semibold hover:underline">transporte en frío</NuxtLink>,
          <NuxtLink to="/bodegaje" class="text-teal-600 font-semibold hover:underline">bodegaje</NuxtLink> y
          <NuxtLink to="/ultima-milla" class="text-teal-600 font-semibold hover:underline">última milla</NuxtLink>.
          En España a través de
          <a href="https://portespro.es" target="_blank" rel="noopener noreferrer" class="text-teal-600 font-semibold hover:underline">PortesPro.es</a>,
          empresa hermana que aplica el mismo modelo de precio transparente y calculadora online para el mercado español.
        </p>
        <p class="text-slate-600 leading-relaxed font-medium">
          Dos países, una misma filosofía: tecnología al servicio de la logística, con precio claro desde el primer clic.
        </p>
      </div>
    </section>

    <!-- Promesa + CTA -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 max-w-4xl text-center">
        <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight">Nuestra promesa</h2>
        <p class="text-slate-600 leading-relaxed font-medium mb-4 max-w-2xl mx-auto">
          No somos un call center ni una plataforma que subcontrata sin control. Somos la empresa que llega a tu puerta, que embala tus cosas con cuidado y que te da el precio antes de empezar. Eso es lo que nos diferencia de los demás fletes en Santiago.
        </p>
        <p class="text-slate-600 font-medium mb-10">
          ¿Quieres cotizar con nosotros? Usa la calculadora online o escríbenos por WhatsApp al
          <a href="https://wa.me/56979796841" class="text-teal-600 font-bold hover:underline">+56 9 7979 6841</a>.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/fletes-santiago#hero-calculator"
            class="inline-flex items-center justify-center bg-slate-900 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-colors"
          >
            Cotizar flete online
          </NuxtLink>
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-colors"
          >
            Ver todos nuestros servicios
          </NuxtLink>
        </div>
      </div>
    </section>

    <FletesLocalAuthority
      :title="'Equipo en terreno en Santiago'"
      :manager-name="FOUNDER_NAME"
      :manager-role="`${FOUNDER_JOB_TITLE} — FletesPro`"
      :manager-photo-src="FOUNDER_PHOTO_PATH"
      :history="'Ronald coordina los fletes y mudanzas en la RM: asignación de vehículos, horarios y seguimiento con clientes. Es el contacto operativo cuando cotizas por la web o WhatsApp.'"
      image-src="/equipo/ronald-bravo.webp"
      image-alt="Ronald Bravo, fundador de FletesPro, en operación de fletes en Santiago"
    />
    <PortesTestimonials />
  </div>
</template>

<script setup>
import {
  FOUNDER_NAME,
  FOUNDER_JOB_TITLE,
  FOUNDER_PHOTO_PATH,
  fletesProFounderSchema,
  fletesProSameAs
} from '~/config/brandEntity.js'

const siteUrl = 'https://fletespro.cl'
const currentUrl = `${siteUrl}/empresa-fletes-santiago`

const pageTitle = 'Empresa de Fletes en Santiago | Quiénes Somos | FletesPro'
const pageDescription =
  'FletesPro nació en Santiago tras la pandemia combinando tecnología y servicio personalizado. Empresa de fletes con precio transparente, calculadora online y cobertura en toda la RM. Conoce nuestra historia.'

const growthItems = [
  'Vehículos con transporte en frío para productos perecederos, alimentos y medicamentos',
  'Bodegas para última milla para ecommerce y tiendas online',
  'Cobertura completa en las 52 comunas de la Región Metropolitana y rutas a regiones'
]

const stats = [
  { value: '4.000+', label: 'Mudanzas y fletes completados' },
  { value: '6 años', label: 'De experiencia en el sector' },
  { value: '52', label: 'Comunas RM cubiertas' },
  { value: '100%', label: 'Zonas comprometidas' }
]

const movingCompanySchema = {
  '@context': 'https://schema.org',
  '@type': 'MovingCompany',
  '@id': `${siteUrl}/#fletespro`,
  name: 'FletesPro',
  url: siteUrl,
  logo: `${siteUrl}/logo-portespro.png`,
  image: `${siteUrl}/ejemplo-flete-sencillo.webp`,
  foundingDate: '2021',
  description:
    'Empresa de logística integral con presencia en Chile y España. Fletes, mudanzas, transporte en frío, bodegaje y última milla en Santiago y la RM. Precio transparente con calculadora online.',
  founder: fletesProFounderSchema(siteUrl),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Providencia',
    addressRegion: 'Región Metropolitana',
    addressCountry: 'CL'
  },
  telephone: '+56-9-7979-6841',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Región Metropolitana de Santiago'
  },
  sameAs: fletesProSameAs()
}

const founderPersonSchema = {
  '@context': 'https://schema.org',
  ...fletesProFounderSchema(siteUrl)
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Empresa de fletes Santiago', item: currentUrl }
  ]
}

const { withReviewsOnLocalBusiness } = useFletesProReviews()
const companyWithReviews = computed(() => withReviewsOnLocalBusiness({ ...movingCompanySchema }))

useHead(computed(() => ({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: `${siteUrl}/ejemplo-flete-sencillo.webp` },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription }
  ],
  link: [{ rel: 'canonical', href: currentUrl }],
  script: [
    { key: 'company-empresa-santiago', type: 'application/ld+json', innerHTML: JSON.stringify(companyWithReviews.value) },
    { key: 'founder-empresa-santiago', type: 'application/ld+json', innerHTML: JSON.stringify(founderPersonSchema) },
    { key: 'breadcrumb-empresa-santiago', type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbSchema) }
  ]
})))
</script>
