<template>
  <section class="py-16 md:py-20 bg-white border-t border-slate-100" aria-label="Servicios y comunas FletesPro">
    <div class="container mx-auto px-4 max-w-5xl space-y-8">
      <!-- A: Mudanzas por comuna -->
      <div class="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Mudanzas por comuna en Santiago
        </h2>
        <p class="text-slate-600 leading-relaxed mb-6">
          Cobertura en toda la Región Metropolitana con página y precios dedicados por comuna.
        </p>
        <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 list-none p-0 m-0">
          <li v-for="link in mudanzasComunas" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="block px-3.5 py-2.5 rounded-xl bg-slate-50 text-teal-700 font-bold text-sm hover:bg-teal-50 hover:border-teal-200 border border-transparent transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- B: Bodegaje -->
      <div class="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Bodegaje y guardamuebles
        </h2>
        <p class="text-slate-600 leading-relaxed mb-6">
          ¿Necesitas guardar tus cosas? Ofrecemos <strong class="text-slate-800">bodegaje y guardamuebles</strong> con
          bodegas climatizadas y seguras, y acceso 24 horas, en las principales comunas de la RM.
        </p>
        <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 list-none p-0 m-0">
          <li v-for="link in bodegajeLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="block px-3.5 py-2.5 rounded-xl bg-slate-50 text-teal-700 font-bold text-sm hover:bg-teal-50 border border-transparent hover:border-teal-200 transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- CTA 1 (cada 2 widgets) -->
      <div class="rounded-2xl bg-teal-600 px-6 py-8 md:px-10 text-center text-white shadow-lg shadow-teal-600/20">
        <p class="text-lg md:text-xl font-black mb-2 tracking-tight">¿Mudanza o bodegaje? Cotiza en minutos</p>
        <p class="text-teal-50 text-sm md:text-base mb-6 max-w-xl mx-auto">
          Usa la calculadora online o escríbenos por WhatsApp. Presupuesto gratis.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <a
            href="#hero-calculator"
            class="inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-colors"
            @click.prevent="scrollToCalc"
          >
            Ir a la calculadora
          </a>
          <a
            href="https://wa.me/56979796841"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 border-2 border-white/80 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <!-- C: Última milla -->
      <div class="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Última milla y logística de entrega
        </h2>
        <p class="text-slate-600 leading-relaxed mb-4">
          <strong class="text-slate-800">Última milla</strong> para ecommerce, alimentación y farmacia, con entrega el
          mismo día y servicio express en toda la Región Metropolitana.
        </p>
        <NuxtLink to="/ultima-milla" class="inline-block text-teal-700 font-bold hover:underline">
          Ver servicio de última milla →
        </NuxtLink>
      </div>

      <!-- D: Especialidades -->
      <div class="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Transporte de objetos de alto valor
        </h2>
        <p class="text-slate-600 leading-relaxed mb-6">
          Traslado especializado con embalaje profesional para objetos delicados y valiosos.
        </p>
        <ul class="grid sm:grid-cols-2 gap-2 list-none p-0 m-0">
          <li v-for="link in especialidades" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="block px-3.5 py-2.5 rounded-xl bg-slate-50 text-teal-700 font-bold text-sm hover:bg-teal-50 border border-transparent hover:border-teal-200 transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- CTA 2 -->
      <div class="rounded-2xl bg-slate-900 px-6 py-8 md:px-10 text-center text-white">
        <p class="text-lg md:text-xl font-black mb-2 tracking-tight">Logística express u objetos delicados</p>
        <p class="text-slate-300 text-sm md:text-base mb-6 max-w-xl mx-auto">
          Coordinamos última milla, piano, obras de arte y embalaje profesional.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <NuxtLink
            to="/ultima-milla"
            class="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-teal-400 transition-colors"
          >
            Última milla
          </NuxtLink>
          <NuxtLink
            to="/embalajes"
            class="inline-flex items-center gap-2 border-2 border-slate-500 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:border-teal-400 hover:text-teal-300 transition-colors"
          >
            Embalajes
          </NuxtLink>
        </div>
      </div>

      <!-- E: Urgentes y segmentos -->
      <div class="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
        <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tight">
          Mudanzas urgentes y por tipo de cliente
        </h2>
        <p class="text-slate-600 leading-relaxed mb-6">
          <strong class="text-slate-800">Mudanzas urgentes</strong> de mismo día cuando lo necesitas, para
          particulares y empresas en toda la Región Metropolitana.
        </p>
        <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 list-none p-0 m-0">
          <li v-for="link in segmentos" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="block px-3.5 py-2.5 rounded-xl bg-slate-50 text-teal-700 font-bold text-sm hover:bg-teal-50 border border-transparent hover:border-teal-200 transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const mudanzasComunas = [
  { to: '/mudanzas-santiago', label: 'Mudanzas Santiago' },
  { to: '/mudanzas-las-condes', label: 'Mudanzas Las Condes' },
  { to: '/mudanzas-providencia', label: 'Mudanzas Providencia' },
  { to: '/mudanzas-nunoa', label: 'Mudanzas Ñuñoa' },
  { to: '/mudanzas-lo-barnechea', label: 'Mudanzas Lo Barnechea' },
  { to: '/mudanzas-la-reina', label: 'Mudanzas La Reina' },
  { to: '/mudanzas-colina', label: 'Mudanzas Colina' },
  { to: '/mudanzas-chicureo', label: 'Mudanzas Chicureo' },
  { to: '/mudanzas-san-miguel', label: 'Mudanzas San Miguel' },
  { to: '/mudanzas-huechuraba', label: 'Mudanzas Huechuraba' },
  { to: '/mudanzas-la-cisterna', label: 'Mudanzas La Cisterna' }
]

const bodegajeLinks = [
  { to: '/bodegaje', label: 'Bodegaje — calculadora y precios' },
  { to: '/bodegaje/las-condes', label: 'Bodegaje Las Condes' },
  { to: '/bodegaje/providencia', label: 'Bodegaje Providencia' },
  { to: '/bodegaje/vitacura', label: 'Bodegaje Vitacura' },
  { to: '/bodegaje/nunoa', label: 'Bodegaje Ñuñoa' },
  { to: '/bodegaje/santiago-centro', label: 'Bodegaje Santiago Centro' }
]

const especialidades = [
  { to: '/fletes-piano', label: 'Mudanzas de piano' },
  { to: '/fletes-obras-de-arte', label: 'Transporte de obras de arte' },
  { to: '/fletes-antiguedades', label: 'Mudanzas de antigüedades' },
  { to: '/embalajes', label: 'Embalaje de frágiles' }
]

const segmentos = [
  { to: '/mudanzas/urgentes', label: 'Mudanzas urgentes' },
  { to: '/mudanzas/particulares', label: 'Mudanzas particulares' },
  { to: '/mudanzas/empresas', label: 'Mudanzas de empresas' },
  { to: '/fletes-para-oficinas', label: 'Fletes para oficinas' },
  { to: '/fletes-construccion', label: 'Fletes para constructoras' }
]

function scrollToCalc () {
  if (import.meta.client) {
    document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
