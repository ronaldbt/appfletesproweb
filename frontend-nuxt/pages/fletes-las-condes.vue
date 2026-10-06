<template>
  <FletesComunaLayout
    :hero="content.hero"
    variant="las-condes"
    hero-title-class-override="text-3xl sm:text-4xl md:text-[2.15rem] lg:text-[2.35rem] leading-snug tracking-tight text-center"
    hero-intro-class-override="text-sm md:text-base text-slate-600 max-w-3xl mx-auto text-center"
    hero-content-max-width-class="max-w-5xl mx-auto text-center"
  >
    <!-- Precios + tabla -->
    <section id="precios-fletes" class="py-16 md:py-20 bg-white border-t border-slate-100">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-amber-500 w-fit">
          {{ content.precios.h2 }}
        </h2>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.precios.intro }}</p>
        <p class="text-slate-600 leading-relaxed mb-6">{{ content.precios.p1 }}</p>

        <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-6">
          <table class="w-full text-sm md:text-base min-w-[520px]">
            <thead>
              <tr class="bg-amber-600 text-white text-left">
                <th class="px-4 py-3.5 font-bold">Servicio</th>
                <th class="px-4 py-3.5 font-bold">Vehículo</th>
                <th class="px-4 py-3.5 font-bold">Precio referencial</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in content.precios.tabla"
                :key="i"
                class="border-t border-slate-100"
                :class="i % 2 === 1 ? 'bg-slate-50/80' : 'bg-white'"
              >
                <td class="px-4 py-3.5 text-slate-800 font-medium">{{ row.servicio }}</td>
                <td class="px-4 py-3.5 text-slate-600">{{ row.vehiculo }}</td>
                <td class="px-4 py-3.5 font-black text-amber-700 whitespace-nowrap">{{ row.precio }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm text-slate-500 leading-relaxed mb-8">*{{ content.precios.tablaNota }}</p>

        <h3 class="text-xl font-bold text-slate-800 mt-8 mb-2">{{ content.precios.h3Valores }}</h3>
        <p class="text-slate-600 leading-relaxed">{{ content.precios.p2 }}</p>
        <p class="mt-6 text-slate-600 text-sm">
          ¿Quieres el valor exacto? Usa la
          <button type="button" class="text-amber-700 font-bold underline underline-offset-2" @click="scrollToCalc">calculadora</button>
          o pide un presupuesto gratis por
          <a href="https://wa.me/56979796841" target="_blank" rel="noopener noreferrer" class="text-amber-700 font-bold underline underline-offset-2">WhatsApp</a>.
        </p>
      </div>
    </section>

    <!-- Mini fletes + urgentes -->
    <section id="mini-fletes" class="py-16 md:py-20 bg-amber-50/40">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-amber-500 w-fit">
          {{ content.miniFletes.h2 }}
        </h2>
        <p class="text-slate-600 leading-relaxed mb-8">{{ content.miniFletes.p1 }}</p>

        <div id="fletes-urgentes" class="bg-white rounded-r-2xl border-l-4 border-amber-500 p-6 pl-6 shadow-sm">
          <h3 class="text-xl font-black text-slate-900 mb-2">{{ content.urgentes.h3 }}</h3>
          <p class="text-slate-600 leading-relaxed mb-4">{{ content.urgentes.p1 }}</p>
          <div class="flex flex-wrap gap-3">
            <a
              href="https://wa.me/56979796841"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-amber-700 transition-colors"
            >
              WhatsApp express
            </a>
            <NuxtLink
              to="/mudanzas/urgentes"
              class="inline-flex items-center gap-2 border-2 border-amber-600 text-amber-700 px-5 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-amber-50 transition-colors"
            >
              Mudanzas urgentes
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Rutas con enlaces internos -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-amber-500 w-fit">
          {{ content.rutas.h2 }}
        </h2>
        <p class="text-slate-600 leading-relaxed mb-6">{{ content.rutas.intro }}</p>
        <ul class="grid md:grid-cols-2 gap-3 mb-6">
          <li
            v-for="(item, i) in content.rutas.items"
            :key="i"
            class="flex items-center gap-2 text-slate-700 font-medium"
          >
            <span class="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <NuxtLink :to="item.to" class="text-amber-800 hover:text-amber-600 hover:underline underline-offset-2">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
        <p class="text-slate-600 leading-relaxed">{{ content.rutas.pCostas }}</p>
      </div>
    </section>

    <!-- Servicios -->
    <section class="py-16 md:py-20 bg-slate-50">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-amber-500 w-fit">
          {{ content.servicios.h2 }}
        </h2>
        <p class="text-slate-600 leading-relaxed mb-8">{{ content.servicios.intro }}</p>
        <div class="space-y-6">
          <article
            v-for="(item, i) in content.servicios.items"
            :key="i"
            class="bg-white rounded-r-2xl border-l-4 border-amber-500 p-6 pl-6"
          >
            <h3 class="text-xl font-black text-slate-900 mb-2">{{ item.h3 }}</h3>
            <p class="text-slate-600 leading-relaxed">
              {{ item.text }}
              <a v-if="i === 2" href="#mini-fletes" class="text-amber-700 font-bold underline underline-offset-2 ml-1">Ir a mini fletes →</a>
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Mudanzas / comuna -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-amber-500 w-fit">
          {{ content.mudanzas.h2 }}
        </h2>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.mudanzas.intro }}</p>
        <p class="text-slate-600 leading-relaxed">
          {{ content.mudanzas.p }}
          Para mudanzas completas de casa u oficina, visita
          <NuxtLink to="/mudanzas-las-condes" class="text-amber-700 font-bold underline underline-offset-2">mudanzas en Las Condes</NuxtLink>
          o el hub de
          <NuxtLink to="/fletes-santiago" class="text-amber-700 font-bold underline underline-offset-2">fletes Santiago</NuxtLink>.
        </p>
      </div>
    </section>

    <!-- Enlazado interno -->
    <section class="py-16 md:py-20 bg-amber-50/40">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-8 pb-3 border-b-4 border-amber-500 w-fit">
          {{ content.enlaces.h2 }}
        </h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <NuxtLink
            v-for="(link, i) in content.enlaces.items"
            :key="i"
            :to="link.to"
            class="group flex flex-col gap-1 p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 transition-all"
          >
            <span class="text-lg font-black text-slate-900 group-hover:text-amber-800">{{ link.label }}</span>
            <span class="text-sm text-slate-600">{{ link.text }}</span>
            <span class="text-sm font-bold text-amber-700 mt-2">Ver →</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Ventajas -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 pb-3 border-b-4 border-amber-500 w-fit">
          {{ content.h2Ventajas }}
        </h2>
        <ol class="space-y-4 list-none pl-0">
          <li
            v-for="(v, i) in content.ventajas"
            :key="i"
            class="flex gap-4 text-slate-600 leading-relaxed"
          >
            <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-lg">{{ i + 1 }}</span>
            <span>{{ v }}</span>
          </li>
        </ol>
        <p class="mt-10 text-slate-600 leading-relaxed font-medium">{{ content.cierre }}</p>
        <div class="mt-10 flex flex-wrap gap-4">
          <a href="https://wa.me/56979796841" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-amber-700 transition-colors">Contactar por WhatsApp</a>
          <button type="button" class="inline-flex items-center gap-2 border-2 border-amber-600 text-amber-700 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-amber-50 transition-colors" @click="scrollToCalc">Cotizar con la calculadora</button>
        </div>
      </div>
    </section>

    <!-- FAQs -->
    <section class="py-16 md:py-20 bg-slate-50 border-t border-slate-100" id="faqs">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 pb-3 border-b-4 border-amber-500 w-fit">
          Preguntas frecuentes: fletes Las Condes
        </h2>
        <ul class="space-y-6">
          <li v-for="(faq, i) in content.faqs" :key="i" class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 class="text-lg font-bold text-slate-900 mb-2">{{ faq.question }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ faq.answer }}</p>
          </li>
        </ul>
      </div>
    </section>
  </FletesComunaLayout>
</template>

<script setup>
import { computed } from 'vue'
import content from '~/data/comunas/las-condes.js'
import {
  FLETESPRO_CL_URL,
  FLETESPRO_CL_EMAIL,
  FLETESPRO_CL_PHONE,
  fletesProSameAs,
  fletesProFounderSchema
} from '~/config/brandEntity.js'
import { useFletesProReviews } from '~/composables/useFletesProReviews.js'
import { enrichLocalBusinessWithReviews } from '~/utils/fletesProReviewsSchema.js'

const siteUrl = FLETESPRO_CL_URL
const currentUrl = `${siteUrl}/fletes-las-condes`
const logoUrl = `${siteUrl}/og-image.jpg`
const waUrl = `https://wa.me/${FLETESPRO_CL_PHONE.replace('+', '')}`
const { allReviews } = useFletesProReviews()

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${currentUrl}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Fletes Santiago', item: `${siteUrl}/fletes-santiago` },
    { '@type': 'ListItem', position: 3, name: 'Fletes Las Condes', item: currentUrl }
  ]
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: `${siteUrl}/`,
  name: 'FletesPro',
  publisher: { '@id': `${siteUrl}/#organization` },
  inLanguage: 'es-CL'
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${currentUrl}#webpage`,
  url: currentUrl,
  name: content.meta.title,
  description: content.meta.description,
  inLanguage: 'es-CL',
  isPartOf: { '@id': `${siteUrl}/#website` },
  about: { '@id': `${currentUrl}#service` },
  breadcrumb: { '@id': `${currentUrl}#breadcrumb` },
  mainEntity: { '@id': `${currentUrl}#service` },
  dateModified: '2026-08-16'
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'FletesPro',
  url: `${siteUrl}/`,
  logo: logoUrl,
  email: FLETESPRO_CL_EMAIL,
  telephone: FLETESPRO_CL_PHONE,
  sameAs: [waUrl, ...fletesProSameAs()]
}

const founderSchema = {
  '@context': 'https://schema.org',
  ...fletesProFounderSchema(siteUrl)
}

const movingCompanyBase = {
  '@context': 'https://schema.org',
  '@type': 'MovingCompany',
  '@id': `${siteUrl}/#business`,
  name: 'FletesPro',
  image: logoUrl,
  url: currentUrl,
  telephone: FLETESPRO_CL_PHONE,
  email: FLETESPRO_CL_EMAIL,
  priceRange: '$$',
  description: 'Fletes en Las Condes desde $28.000: camioneta, furgón y mini fletes para muebles, electrodomésticos y pocos bultos. Retiros en tiendas y salida el mismo día.',
  areaServed: {
    '@type': 'City',
    name: 'Las Condes',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: 'Región Metropolitana de Santiago, Chile'
    }
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Las Condes',
    addressLocality: 'Las Condes',
    addressRegion: 'RM',
    addressCountry: 'CL'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -33.4103,
    longitude: -70.5680
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '08:00',
    closes: '21:00'
  },
  sameAs: [waUrl, ...fletesProSameAs(), `${siteUrl}/empresa-fletes-santiago`],
  founder: { '@id': `${siteUrl}/#founder-ronald-bravo` },
  parentOrganization: { '@id': `${siteUrl}/#organization` },
  knowsAbout: [
    'Fletes en Las Condes',
    'Mini fletes Las Condes',
    'Flete camioneta',
    'Retiros Sodimac Easy Parque Arauco',
    'Fletes express mismo día'
  ],
  hasOfferCatalog: { '@id': `${currentUrl}#offer-catalog` }
}

const movingCompanySchema = computed(() =>
  enrichLocalBusinessWithReviews(movingCompanyBase, allReviews.value)
)

const offerCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  '@id': `${currentUrl}#offer-catalog`,
  name: 'Precios de fletes en Las Condes 2026',
  itemListElement: content.precios.tabla.map((row, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Offer',
      name: row.servicio,
      description: `${row.servicio}. Vehículo: ${row.vehiculo}. ${row.precio}`,
      priceCurrency: 'CLP',
      availability: 'https://schema.org/InStock',
      url: currentUrl,
      seller: { '@id': `${siteUrl}/#business` }
    }
  }))
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${currentUrl}#service`,
  serviceType: 'Fletes en Las Condes',
  name: 'Fletes Las Condes',
  provider: { '@id': `${siteUrl}/#business` },
  areaServed: 'Las Condes, Región Metropolitana, Chile',
  description: 'Servicio de fletes en Las Condes: camioneta, furgón y mini fletes para muebles, electrodomésticos, cajas y compras, con carga y descarga, salida el mismo día y rutas a toda la RM y regiones.',
  url: currentUrl,
  image: logoUrl,
  offers: {
    '@type': 'Offer',
    priceCurrency: 'CLP',
    price: '28000',
    description: 'Fletes en Las Condes desde $28.000 (hasta 2 m³). Calculadora online y presupuesto gratis.',
    url: currentUrl,
    availability: 'https://schema.org/InStock'
  },
  hasOfferCatalog: { '@id': `${currentUrl}#offer-catalog` }
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${currentUrl}#howto`,
  name: 'Cómo cotizar un flete en Las Condes',
  description: 'Pasos para cotizar mini flete, camioneta o furgón en Las Condes.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Indica origen y destino',
      text: 'Usa la calculadora con direcciones en Las Condes u otras comunas.'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Describe la carga',
      text: 'Mini flete (pocos bultos), muebles/electrodomésticos o carga grande.'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Confirma por WhatsApp',
      text: 'Escríbenos al +56 9 7979 6841. Presupuesto gratis; express el mismo día según agenda.'
    }
  ]
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${currentUrl}#faq`,
  mainEntity: content.faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer }
  }))
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${currentUrl}#product`,
  name: 'Fletes en Las Condes',
  description: content.meta.description,
  image: logoUrl,
  brand: { '@type': 'Brand', name: 'FletesPro' },
  category: 'Fletes / Mini fletes',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'CLP',
    lowPrice: '28000',
    highPrice: '400000',
    offerCount: String(content.precios.tabla.length),
    availability: 'https://schema.org/InStock',
    url: currentUrl
  }
}

useHead(() => ({
  title: content.meta.title,
  titleTemplate: '%s',
  meta: [
    { name: 'description', content: content.meta.description },
    { name: 'keywords', content: content.meta.keywords },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: content.meta.title },
    { property: 'og:description', content: content.meta.description.slice(0, 200) },
    { property: 'og:image', content: logoUrl },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: content.meta.title },
    { name: 'twitter:description', content: content.meta.description.slice(0, 200) }
  ],
  link: [{ rel: 'canonical', href: currentUrl }],
  script: [
    { key: 'ld-org-flc', type: 'application/ld+json', innerHTML: JSON.stringify(organizationSchema) },
    { key: 'ld-website-flc', type: 'application/ld+json', innerHTML: JSON.stringify(websiteSchema) },
    { key: 'ld-webpage-flc', type: 'application/ld+json', innerHTML: JSON.stringify(webPageSchema) },
    { key: 'ld-founder-flc', type: 'application/ld+json', innerHTML: JSON.stringify(founderSchema) },
    { key: 'ld-business-flc', type: 'application/ld+json', innerHTML: JSON.stringify(movingCompanySchema.value) },
    { key: 'ld-service-flc', type: 'application/ld+json', innerHTML: JSON.stringify(serviceSchema) },
    { key: 'ld-offers-flc', type: 'application/ld+json', innerHTML: JSON.stringify(offerCatalogSchema) },
    { key: 'ld-product-flc', type: 'application/ld+json', innerHTML: JSON.stringify(productSchema) },
    { key: 'ld-howto-flc', type: 'application/ld+json', innerHTML: JSON.stringify(howToSchema) },
    { key: 'ld-faq-flc', type: 'application/ld+json', innerHTML: JSON.stringify(faqSchema) },
    { key: 'ld-breadcrumb-flc', type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbSchema) }
  ]
}))

const scrollToCalc = () => {
  if (import.meta.client) document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
