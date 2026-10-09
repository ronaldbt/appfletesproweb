<template>
  <FletesComunaLayout
    :hero="content.hero"
    hero-title-class-override="text-xl sm:text-2xl md:text-[1.75rem] lg:text-[1.875rem] leading-snug tracking-tight"
    hero-intro-class-override="text-sm md:text-base text-slate-500 max-w-2xl mx-auto"
    hero-content-max-width-class="max-w-5xl mx-auto"
  >
    <!-- Precios + tabla -->
    <section id="precios-mudanzas" class="py-16 md:py-20 bg-white border-t border-slate-100">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-teal-500 w-fit">{{ content.precios.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.precios.intro }}</p>
        <p class="text-slate-600 leading-relaxed mb-6">{{ content.precios.p1 }}</p>

        <div class="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm mb-6">
          <table class="w-full text-sm md:text-base min-w-[520px]">
            <thead>
              <tr class="bg-teal-600 text-white text-left">
                <th class="px-4 py-3.5 font-bold">Tipo de mudanza</th>
                <th class="px-4 py-3.5 font-bold">Vehículo y equipo</th>
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
                <td class="px-4 py-3.5 text-slate-800 font-medium">{{ row.tipo }}</td>
                <td class="px-4 py-3.5 text-slate-600">{{ row.equipo }}</td>
                <td class="px-4 py-3.5 font-black text-teal-700 whitespace-nowrap">{{ row.precio }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm text-slate-500 leading-relaxed mb-8">*{{ content.precios.tablaNota }}</p>

        <h3 class="text-xl font-bold text-slate-800 mt-8 mb-2">{{ content.precios.h3Valores }}</h3>
        <p class="text-slate-600 leading-relaxed">{{ content.precios.p2 }}</p>
        <p v-if="content.precios.p3" class="text-slate-600 leading-relaxed mt-4">{{ content.precios.p3 }}</p>
        <p class="mt-6 text-slate-600 text-sm">
          ¿Quieres el valor exacto? Usa la
          <button type="button" class="text-teal-700 font-bold underline underline-offset-2" @click="scrollToCalc">calculadora</button>
          o pide un presupuesto gratis por
          <a href="https://wa.me/56979796841" target="_blank" rel="noopener noreferrer" class="text-teal-700 font-bold underline underline-offset-2">WhatsApp</a>.
        </p>
      </div>
    </section>

    <!-- Mudanzas baratas -->
    <section id="mudanzas-baratas" class="py-16 md:py-20 bg-teal-50/30">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-teal-500 w-fit">{{ content.baratas.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.baratas.p1 }}</p>
        <p class="text-slate-600 leading-relaxed">{{ content.baratas.p2 }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <button type="button" class="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-teal-700 transition-colors" @click="scrollToCalc">
            Cotizar mudanza barata
          </button>
          <a href="https://wa.me/56979796841" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 border-2 border-teal-600 text-teal-700 px-5 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-teal-50 transition-colors">
            WhatsApp
          </a>
        </div>
      </div>
    </section>

    <!-- Tipos de servicio (cards) -->
    <section class="py-16 md:py-20 bg-white border-t border-slate-100">
      <div class="container mx-auto px-4 max-w-5xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-8 pb-3 border-b-4 border-teal-500 w-fit">{{ content.tiposServicio.h2 }}</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <template v-for="(card, i) in content.tiposServicio.items" :key="i">
            <a
              v-if="card.to.startsWith('#')"
              :href="card.to"
              class="group flex flex-col gap-2 p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/10 transition-all"
            >
              <h3 class="text-lg font-black text-slate-900 group-hover:text-teal-800">{{ card.title }}</h3>
              <p class="text-sm text-slate-600 leading-relaxed flex-1">{{ card.text }}</p>
              <span class="text-sm font-bold text-teal-700 mt-1">{{ card.cta }} →</span>
            </a>
            <NuxtLink
              v-else
              :to="card.to"
              class="group flex flex-col gap-2 p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-400 hover:shadow-lg hover:shadow-teal-500/10 transition-all"
            >
              <h3 class="text-lg font-black text-slate-900 group-hover:text-teal-800">{{ card.title }}</h3>
              <p class="text-sm text-slate-600 leading-relaxed flex-1">{{ card.text }}</p>
              <span class="text-sm font-bold text-teal-700 mt-1">{{ card.cta }} →</span>
            </NuxtLink>
          </template>
        </div>
      </div>
    </section>

    <!-- Rutas -->
    <section id="rutas-mudanzas" class="py-16 md:py-20 bg-teal-50/30">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-teal-500 w-fit">{{ content.rutas.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-4">{{ content.rutas.intro }}</p>
        <p v-if="content.rutas.pCentro" class="text-slate-600 leading-relaxed mb-6">{{ content.rutas.pCentro }}</p>
        <ul class="grid md:grid-cols-2 gap-3 mb-6">
          <li v-for="(item, i) in content.rutas.items" :key="i" class="flex items-center gap-2 text-slate-700 font-medium">
            <span class="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
            {{ item }}
          </li>
        </ul>
        <p class="text-slate-600 leading-relaxed">{{ content.rutas.pExtra }}</p>
      </div>
    </section>

    <!-- Servicios -->
    <section class="py-16 md:py-20 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-teal-500 w-fit">{{ content.servicios.h2 }}</h2>
        <p class="text-slate-600 leading-relaxed mb-8">{{ content.servicios.intro }}</p>
        <div class="space-y-6">
          <article v-for="(item, i) in content.servicios.items" :key="i" class="bg-teal-50/50 rounded-r-2xl border-l-4 border-teal-500 p-6 pl-6">
            <h3 class="text-xl font-black text-slate-900 mb-2">{{ item.h3 }}</h3>
            <p class="text-slate-600 leading-relaxed">{{ item.text }}</p>
          </article>
        </div>
        <p v-if="content.servicios.pTransporte" class="mt-4 text-slate-600 leading-relaxed">{{ content.servicios.pTransporte }}</p>
        <p class="mt-6 text-slate-600 leading-relaxed">{{ content.servicios.pCombustible }}</p>
      </div>
    </section>

    <!-- Ventajas -->
    <section class="py-16 md:py-20 bg-teal-50/30">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 pb-3 border-b-4 border-teal-500 w-fit">{{ content.h2Ventajas }}</h2>
        <ol class="space-y-4 list-none pl-0">
          <li v-for="(v, i) in content.ventajas" :key="i" class="flex gap-4 text-slate-600 leading-relaxed">
            <span class="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-lg">{{ i + 1 }}</span>
            <span>{{ v }}</span>
          </li>
        </ol>
        <p class="mt-10 text-slate-600 leading-relaxed font-medium">{{ content.cierre }}</p>
        <div class="mt-10 flex flex-wrap gap-4">
          <a href="https://wa.me/56979796841" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-teal-700 transition-colors">Contactar por WhatsApp</a>
          <button type="button" class="inline-flex items-center gap-2 border-2 border-teal-600 text-teal-600 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-teal-50 transition-colors" @click="scrollToCalc">Cotizar con la calculadora</button>
        </div>
      </div>
    </section>

    <!-- Comunas -->
    <section class="py-16 md:py-20 bg-white border-t border-slate-100">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-4 pb-3 border-b-4 border-teal-500 w-fit">Mudanzas por comuna</h2>
        <p class="text-slate-600 leading-relaxed mb-8">Servicio de mudanzas en Santiago y en cada comuna de la Región Metropolitana. Cotiza según tu origen y destino.</p>
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <li v-for="comuna in mudanzasComunas" :key="comuna.slug">
            <NuxtLink :to="`/mudanzas-${comuna.slug}`" class="block px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:border-teal-500 hover:bg-teal-50/50 hover:text-teal-700 transition-colors">
              Mudanzas {{ comuna.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- FAQs -->
    <section class="py-16 md:py-20 bg-white" id="faqs">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 mb-6 pb-3 border-b-4 border-teal-500 w-fit">Preguntas frecuentes: mudanzas Santiago</h2>
        <ul class="space-y-6">
          <li v-for="(faq, i) in content.faqs" :key="i" class="bg-slate-50 rounded-2xl p-6 border border-slate-100">
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
import content from '~/data/mudanzas/santiago.js'
import { mudanzasComunas } from '~/config/mudanzasComunas'
import {
  fletesProSameAs,
  fletesProFounderSchema,
  FLETESPRO_CL_URL,
  FOUNDER_NAME
} from '~/config/brandEntity.js'
import { useFletesProReviews } from '~/composables/useFletesProReviews.js'
import { enrichLocalBusinessWithReviews } from '~/utils/fletesProReviewsSchema.js'

const siteUrl = FLETESPRO_CL_URL
const currentUrl = `${siteUrl}/mudanzas-santiago`
const logoUrl = `${siteUrl}/logo-portespro.png`
const waUrl = 'https://wa.me/56979796841'
const { allReviews } = useFletesProReviews()

function parseClpNumbers (precio) {
  const nums = [...String(precio).matchAll(/([\d]{1,3}(?:\.\d{3})+|\d+)/g)]
    .map(m => parseInt(m[1].replace(/\./g, ''), 10))
    .filter(n => !Number.isNaN(n) && n >= 1000)
  return {
    low: nums[0] || 40000,
    high: nums[1] || nums[0] || 400000
  }
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${currentUrl}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Mudanzas Santiago', item: currentUrl }
  ]
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'FletesPro',
  description: 'Fletes y mudanzas en Santiago y Región Metropolitana',
  publisher: { '@id': `${siteUrl}/#fletespro` },
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
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: logoUrl
  },
  breadcrumb: { '@id': `${currentUrl}#breadcrumb` },
  mainEntity: { '@id': `${currentUrl}#service` },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '#precios-mudanzas h2', '#faqs h3']
  },
  dateModified: '2026-08-15'
}

const founderSchema = {
  '@context': 'https://schema.org',
  ...fletesProFounderSchema(siteUrl)
}

const movingCompanyBase = {
  '@context': 'https://schema.org',
  '@type': ['MovingCompany', 'LocalBusiness', 'Organization'],
  '@id': `${siteUrl}/#fletespro`,
  name: 'FletesPro',
  alternateName: ['Fletes Pro', 'FletesPro.cl'],
  legalName: 'FletesPro',
  image: [logoUrl],
  logo: logoUrl,
  url: siteUrl,
  mainEntityOfPage: currentUrl,
  telephone: '+56 9 7979 6841',
  email: 'contacto@fletespro.cl',
  priceRange: '$$',
  currenciesAccepted: 'CLP',
  paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
  description: 'Empresa de mudanzas y fletes en Santiago y Región Metropolitana. Mudanzas de casas, departamentos y oficinas, embalaje, bodegaje y traslados a regiones.',
  slogan: 'Mudanzas baratas y profesionales en Santiago',
  foundingDate: '2020',
  founder: { '@id': `${siteUrl}/#founder-ronald-bravo` },
  employee: {
    '@type': 'Person',
    name: FOUNDER_NAME,
    jobTitle: 'Fundador y coordinador de operaciones'
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Santiago',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Región Metropolitana de Santiago'
      }
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Región Metropolitana de Santiago, Chile'
    },
    { '@type': 'Country', name: 'Chile' }
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Providencia',
    addressLocality: 'Santiago',
    addressRegion: 'RM',
    postalCode: '7500000',
    addressCountry: 'CL'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -33.4372,
    longitude: -70.6506
  },
  hasMap: 'https://www.google.com/maps/search/?api=1&query=-33.4372,-70.6506',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '21:00'
    }
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+56 9 7979 6841',
      contactType: 'customer service',
      areaServed: 'CL',
      availableLanguage: ['Spanish', 'es'],
      contactOption: 'TollFree'
    },
    {
      '@type': 'ContactPoint',
      url: waUrl,
      contactType: 'sales',
      areaServed: 'CL',
      availableLanguage: ['Spanish', 'es']
    }
  ],
  sameAs: [...fletesProSameAs(), waUrl, `${siteUrl}/empresa-fletes-santiago`],
  knowsAbout: [
    'Mudanzas en Santiago',
    'Mudanzas baratas',
    'Fletes Región Metropolitana',
    'Embalaje profesional',
    'Salvoconducto de mudanza',
    'Mudanzas a regiones',
    'Mudanzas de oficinas'
  ],
  makesOffer: { '@id': `${currentUrl}#offer-catalog` },
  hasOfferCatalog: { '@id': `${currentUrl}#offer-catalog` }
}

const movingCompanySchema = computed(() =>
  enrichLocalBusinessWithReviews(movingCompanyBase, allReviews.value)
)

const priceOffers = content.precios.tabla.map((row, index) => {
  const { low, high } = parseClpNumbers(row.precio)
  const isRange = low !== high && /–|-/.test(row.precio)
  return {
    '@type': 'Offer',
    '@id': `${currentUrl}#offer-${index + 1}`,
    name: row.tipo,
    description: `${row.tipo}. Equipo: ${row.equipo}. Precio referencial: ${row.precio}`,
    category: row.equipo,
    priceCurrency: 'CLP',
    ...(isRange
      ? {
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'CLP',
            minPrice: low,
            maxPrice: high
          }
        }
      : { price: String(low) }),
    availability: 'https://schema.org/InStock',
    url: currentUrl,
    seller: { '@id': `${siteUrl}/#fletespro` },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Región Metropolitana de Santiago'
    }
  }
})

const offerCatalogSchema = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  '@id': `${currentUrl}#offer-catalog`,
  name: 'Precios de mudanzas en Santiago 2026',
  description: content.precios.intro,
  itemListElement: priceOffers.map((offer, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: offer
  }))
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${currentUrl}#service`,
  serviceType: 'Mudanzas en Santiago',
  name: 'Mudanzas Santiago',
  alternateName: [
    'Mudanzas en Santiago',
    'Empresa de mudanzas Santiago',
    'Mudanzas baratas Santiago'
  ],
  description: 'Servicio de mudanzas de casas, departamentos y oficinas en Santiago y toda la Región Metropolitana, con embalaje, ayudantes y traslados a regiones.',
  provider: { '@id': `${siteUrl}/#fletespro` },
  brand: { '@id': `${siteUrl}/#fletespro` },
  url: currentUrl,
  image: logoUrl,
  category: 'MovingCompany',
  audience: {
    '@type': 'Audience',
    audienceType: 'Particulares y empresas en Santiago'
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Santiago'
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Región Metropolitana, Chile'
    }
  ],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: currentUrl,
    serviceSmsNumber: '+56 9 7979 6841',
    servicePhone: '+56 9 7979 6841'
  },
  termsOfService: `${siteUrl}/terminos`,
  offers: {
    '@type': 'AggregateOffer',
    '@id': `${currentUrl}#aggregate-offer`,
    priceCurrency: 'CLP',
    lowPrice: '40000',
    highPrice: '400000',
    offerCount: String(content.precios.tabla.length),
    url: currentUrl,
    availability: 'https://schema.org/InStock',
    description: 'Mudanzas en Santiago desde $40.000. Presupuesto gratis y calculadora online.',
    offers: priceOffers
  },
  hasOfferCatalog: { '@id': `${currentUrl}#offer-catalog` }
}

const serviceTypesItemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${currentUrl}#tipos-servicio`,
  name: 'Tipos de mudanza en Santiago',
  numberOfItems: content.tiposServicio.items.length,
  itemListElement: content.tiposServicio.items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.title,
    description: item.text,
    url: item.to.startsWith('http')
      ? item.to
      : item.to.startsWith('#')
        ? `${currentUrl}${item.to}`
        : `${siteUrl}${item.to}`
  }))
}

const comunasItemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${currentUrl}#comunas`,
  name: 'Mudanzas por comuna en la Región Metropolitana',
  numberOfItems: mudanzasComunas.length,
  itemListElement: mudanzasComunas.map((comuna, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `Mudanzas ${comuna.name}`,
    url: `${siteUrl}/mudanzas-${comuna.slug}`,
    item: {
      '@type': 'Service',
      name: `Mudanzas en ${comuna.name}`,
      provider: { '@id': `${siteUrl}/#fletespro` },
      areaServed: {
        '@type': 'City',
        name: comuna.name
      }
    }
  }))
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${currentUrl}#howto-cotizar`,
  name: 'Cómo cotizar una mudanza en Santiago con FletesPro',
  description: 'Pasos para obtener el precio de tu mudanza en Santiago con la calculadora online o WhatsApp.',
  totalTime: 'PT5M',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'CLP',
    value: '0'
  },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Indica origen y destino',
      text: 'En la calculadora de esta página elige la comuna o dirección de origen y destino de tu mudanza en Santiago o la RM.'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Describe la carga',
      text: 'Selecciona el tipo de vivienda o volumen aproximado (departamento, casa, mini mudanza) y si necesitas peonetas o embalaje.'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Revisa el precio referencial',
      text: 'Obtén un valor al instante. Compáralo con la tabla de precios referenciales de mudanzas en Santiago 2026.'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Confirma por WhatsApp',
      text: 'Escríbenos al +56 9 7979 6841 para agendar fecha, salvoconducto y detalles finales. Presupuesto gratis.'
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
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

const productServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${currentUrl}#product`,
  name: 'Mudanzas en Santiago',
  description: content.meta.description,
  image: logoUrl,
  brand: {
    '@type': 'Brand',
    name: 'FletesPro'
  },
  category: 'Mudanzas / Mudanza residencial',
  sku: 'mudanzas-santiago',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'CLP',
    lowPrice: '40000',
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
    { key: 'ld-breadcrumb', type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema) },
    { key: 'ld-website', type: 'application/ld+json', children: JSON.stringify(websiteSchema) },
    { key: 'ld-webpage', type: 'application/ld+json', children: JSON.stringify(webPageSchema) },
    { key: 'ld-founder', type: 'application/ld+json', children: JSON.stringify(founderSchema) },
    { key: 'ld-moving-company', type: 'application/ld+json', children: JSON.stringify(movingCompanySchema.value) },
    { key: 'ld-service', type: 'application/ld+json', children: JSON.stringify(serviceSchema) },
    { key: 'ld-offer-catalog', type: 'application/ld+json', children: JSON.stringify(offerCatalogSchema) },
    { key: 'ld-product', type: 'application/ld+json', children: JSON.stringify(productServiceSchema) },
    { key: 'ld-tipos', type: 'application/ld+json', children: JSON.stringify(serviceTypesItemList) },
    { key: 'ld-comunas', type: 'application/ld+json', children: JSON.stringify(comunasItemList) },
    { key: 'ld-howto', type: 'application/ld+json', children: JSON.stringify(howToSchema) },
    { key: 'ld-faq', type: 'application/ld+json', children: JSON.stringify(faqSchema) }
  ]
}))

const scrollToCalc = () => {
  if (import.meta.client) document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
