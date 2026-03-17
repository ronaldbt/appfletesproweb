<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />
      <!-- Hero Section with Integrated Calculator -->
      <section id="hero-calculator" class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              {{ $t('pages.index.heroTag') }}
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              {{ $t('pages.index.title') }}
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              {{ $t('pages.index.subtitle') }}
            </p>
            <p class="mt-6 text-base text-slate-600 max-w-2xl mx-auto">
              Desde pequeños fletes y mudanzas hasta envíos para ecommerce. Servicio en la RM y a regiones. ¿Estás planeando fletes o mudanzas? Para la capital tenemos una <NuxtLink to="/fletes-santiago" class="text-teal-600 font-semibold hover:underline">página dedicada</NuxtLink>. WhatsApp +56 9 7979 6841.
            </p>
          </div>

          <!-- Cómo usar (compacto) -->
          <section class="max-w-2xl mx-auto mb-8 px-4 py-3 md:px-5 md:py-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h2 class="text-sm font-black text-slate-700 uppercase tracking-wider mb-3">Cómo cotizar tu flete o mudanza – Calculadora para saber el precio</h2>
            <ol class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-600 text-sm">
              <li class="flex gap-2 items-start">
                <span class="flex-shrink-0 w-5 h-5 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-xs">1</span>
                <span>Para la RM: calculadora aquí o <NuxtLink to="/fletes-santiago" class="text-teal-600 font-semibold hover:underline">página Fletes Santiago</NuxtLink>.</span>
              </li>
              <li class="flex gap-2 items-start">
                <span class="flex-shrink-0 w-5 h-5 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-xs">2</span>
                <span>WhatsApp <a href="https://wa.me/56979796841" target="_blank" rel="noopener" class="text-teal-600 font-semibold hover:underline">+56 9 7979 6841</a>.</span>
              </li>
              <li class="flex gap-2 items-start">
                <span class="flex-shrink-0 w-5 h-5 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold text-xs">3</span>
                <span><strong class="text-slate-800">Flete de Santiago a regiones</strong>: <NuxtLink to="/blog/cuanto-se-cobra-por-un-flete-en-chile" class="text-teal-600 font-semibold hover:underline">clic aquí</NuxtLink>.</span>
              </li>
            </ol>
          </section>

          <h2 class="text-2xl md:text-3xl font-black text-slate-900 mb-6 text-center">Calculadora de cotización (flete o mudanza)</h2>
          <div class="animate-slide-up">
            <PortesCalculator :is-hero="true" />
          </div>
        </div>
      </section>

      <!-- Enlace a Fletes Santiago (página principal Santiago) -->
      <section class="py-10 bg-white">
        <div class="container mx-auto px-4 max-w-3xl text-center">
          <p class="text-slate-600 leading-relaxed mb-4">
            ¿Buscas precios y cotización para <strong>fletes en la Región Metropolitana</strong>? En nuestra página dedicada tienes calculadora, tarifas actualizadas y cobertura por comuna.
          </p>
          <NuxtLink to="/fletes-santiago" class="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all">
            Ver Fletes Santiago →
          </NuxtLink>
        </div>
      </section>

      <!-- Stats Section -->
      <PortesStats />

      <!-- Services Types Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ serviceTypesTitle || $t('pages.index.servicesTypes.title') || 'Tipos de Mudanzas y Servicios' }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ serviceTypesSubtitle || $t('pages.index.servicesTypes.subtitle') || 'Servicios completos de mudanzas y fletes para particulares y empresas en Santiago y regiones' }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div
              v-for="(service, idx) in serviceTypes"
              :key="idx"
              class="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="service.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ service.title }}</h3>
              <p class="text-slate-600 leading-relaxed font-medium mb-6">{{ service.description }}</p>
              <ul class="space-y-3">
                <li v-for="(feature, i) in service.features" :key="i" class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-slate-600 font-medium text-sm">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div class="bg-slate-100 py-24">
         <PortesFeatures />
      </div>

      <!-- Empresa de mudanzas y fletes -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4 max-w-4xl">
          <h2 class="text-3xl font-black text-slate-900 mb-6">Empresa de mudanzas y fletes: servicios confiables y económicos</h2>
          <p class="text-slate-600 leading-relaxed mb-4">
            Si estás buscando una compañía de mudanzas y fletes confiable y económica, estás en el lugar indicado. En nuestra empresa ofrecemos una amplia gama de servicios para satisfacer tus necesidades de mudanza y transporte. Contamos con camiones de mudanza de diferentes tamaños, que se adaptan a cualquier tipo de traslado, ya sea grande o pequeño.
          </p>
          <p class="text-slate-600 leading-relaxed mb-4">
            Nuestra empresa de mudanza se destaca por ofrecer camiones de mudanza baratos sin comprometer la calidad del servicio. Sabemos lo importante que es para ti cuidar tus pertenencias durante el proceso de mudanza, por lo que nuestro equipo de expertos embala y protege tus objetos con sumo cuidado. Además, ofrecemos opciones de embalaje y transporte especializado para artículos frágiles, garantizando que lleguen en perfectas condiciones a su destino.
          </p>
          <p class="text-slate-600 leading-relaxed mb-4">
            Trabajamos con profesionalismo y eficiencia para garantizar que tu mudanza se realice de manera fluida y sin contratiempos. Nuestra empresa de mudanza cerca de ti te brinda la comodidad de contar con un servicio local y rápido. También trabajamos en estrecha colaboración con empresas de mudanzas cercanas, lo que nos permite ofrecerte opciones adicionales si es necesario.
          </p>
          <p class="text-slate-600 leading-relaxed mb-4">
            Además de nuestros servicios de mudanza, ofrecemos soluciones de fletes: ya sea que necesites enviar un paquete pequeño o transportar mercancía a gran escala, nuestros camiones de flete están disponibles. Para la capital, consulta nuestra <NuxtLink to="/fletes-santiago" class="text-teal-600 font-semibold hover:underline">página dedicada</NuxtLink>. Servicios de fletes que ofrecemos:
          </p>
          <ul class="list-disc list-inside text-slate-600 space-y-2 mb-4">
            <li><strong>Fletes en compras</strong></li>
            <li><strong>Flete de carga</strong></li>
            <li><strong>Flete contra entrega</strong></li>
            <li><strong>Flete de mercancía</strong></li>
          </ul>
          <p class="text-slate-600 leading-relaxed">
            Asegurando una variedad de opciones para adaptarnos a tus requerimientos específicos.
          </p>
        </div>
      </section>

      <!-- Fletes para constructoras -->
      <section class="py-20 bg-slate-50">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <h2 class="text-2xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Fletes para constructoras en la Región Metropolitana
              </h2>
              <p class="text-slate-600 leading-relaxed mb-4">
                ¿Tienes una constructora y necesitas transporte de materiales, compras a pedido o arriendo de equipos? Ofrecemos un servicio tipo personal shopper para constructoras: vamos a distintas tiendas, compramos por usted, retiramos materiales y los llevamos hasta su obra. También arrendamos equipos y realizamos fletes de materiales de construcción en toda la RM.
              </p>
              <ul class="text-slate-600 space-y-2 text-sm mb-4">
                <li class="flex items-start gap-2">
                  <span class="text-teal-600 font-bold mt-0.5">•</span>
                  <span><strong>Compras a pedido</strong>: vamos a Sodimac, Easy, Homecenter y más, compramos por usted y entregamos en obra.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-teal-600 font-bold mt-0.5">•</span>
                  <span><strong>Flete de materiales de construcción</strong>: cemento, áridos, fierros, tabiquería y más.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-teal-600 font-bold mt-0.5">•</span>
                  <span><strong>Arriendo de equipos</strong> y transporte de maquinaria a obra.</span>
                </li>
              </ul>
              <NuxtLink
                to="/fletes-construccion"
                class="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105"
              >
                Ver servicio fletes para constructoras →
              </NuxtLink>
            </div>
            <div class="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-lg">
              <h3 class="text-xl font-black text-slate-900 mb-4">¿Qué incluye?</h3>
              <ul class="space-y-3 text-slate-600">
                <li class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  Personal shopper / compras a pedido
                </li>
                <li class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  Flete de materiales de construcción
                </li>
                <li class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  Arriendo de equipos y maquinaria
                </li>
                <li class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  Entrega en obra en toda la RM
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Fletes RM y regiones (resumen + enlace a fletes-santiago) -->
      <section class="py-20 bg-slate-50">
        <div class="container mx-auto px-4 max-w-4xl">
          <h2 class="text-3xl font-black text-slate-900 mb-6">Fletes en la RM y a regiones</h2>
          <p class="text-slate-600 leading-relaxed mb-4">
            Realizamos fletes en la Región Metropolitana y fletes a regiones (Valparaíso, La Serena, Concepción, Temuco, Puerto Montt y más). Servicio disponible las 24 horas cuando lo necesites. Cubrimos Santiago Centro, Providencia, Las Condes, Maipú y todas las comunas de la RM.
          </p>
          <p class="text-slate-600 leading-relaxed mb-6">
            Para precios, calculadora y toda la información detallada de <strong>fletes en Santiago</strong>, tarifas actualizadas y preguntas frecuentes, visita nuestra página dedicada.
          </p>
          <NuxtLink to="/fletes-santiago" class="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all">
            Ver Fletes Santiago: precios y cotización →
          </NuxtLink>
        </div>
      </section>

      <!-- Process Section -->
      <PortesProcess />
      
      <PortesQualityCommitment />

      <!-- Transporte en frío: garantizando la seguridad + video (mismo diseño que página transporte-frio) -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <h2 class="text-2xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Transporte en frío: garantizando la seguridad de tus productos perecederos
              </h2>
              <p class="text-slate-600 leading-relaxed mb-4">
                El transporte en frío es fundamental si necesitas trasladar productos perecederos, como alimentos o medicamentos, que requieren condiciones de temperatura controlada. Tenemos el más confiable transporte refrigerado a tu servicio a precios muy competitivos.
              </p>
              <ul class="text-slate-600 space-y-2 text-sm mb-4">
                <li class="flex items-start gap-2">
                  <span class="text-teal-600 font-bold mt-0.5">1.</span>
                  <span>Equipo especializado con vehículos equipados con sistemas de refrigeración adecuados y estándares de calidad.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-teal-600 font-bold mt-0.5">2.</span>
                  <span>Experiencia comprobada en transporte de mercancías perecederas y mantenimiento de la cadena de frío.</span>
                </li>
              </ul>
              <NuxtLink to="/transporte-frio" class="text-teal-600 font-bold hover:underline inline-block">Ver servicio de transporte en frío →</NuxtLink>
            </div>
            <div class="relative">
              <div class="aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-100 ring-4 ring-teal-500/10">
                <iframe
                  src="https://www.youtube.com/embed/YUJKAA-KX7w"
                  title="Transporte en frío - FletesPro"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="w-full h-full"
                />
              </div>
              <p class="text-center text-slate-500 text-sm mt-3 font-medium">Servicio de transporte refrigerado en RM y regiones</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Embalaje -->
      <section class="py-20 bg-slate-50">
        <div class="container mx-auto px-4 max-w-4xl">
          <h2 class="text-3xl font-black text-slate-900 mb-6">Embalaje: protege tus pertenencias durante el traslado</h2>
          <p class="text-slate-600 leading-relaxed mb-4">
            El embalaje adecuado es esencial para proteger tus pertenencias durante un traslado. Algunos consejos para que tus objetos lleguen en perfectas condiciones:
          </p>
          <ul class="list-disc list-inside text-slate-600 space-y-2 mb-4">
            <li><strong>Materiales de embalaje de calidad:</strong> Cajas resistentes, plástico de burbujas, papel de embalaje y cinta adhesiva de calidad protegen tus objetos de golpes y movimientos bruscos durante el transporte.</li>
            <li><strong>Etiqueta tus cajas:</strong> Etiqueta cada caja con una descripción clara de su contenido y la habitación a la que pertenece. Facilita el desembalaje y te ayuda a mantener tus pertenencias organizadas.</li>
          </ul>
          <p class="text-slate-600 leading-relaxed mb-4">
            Encontrar fletes y mudanzas económicos no tiene por qué ser una tarea complicada. En nuestra empresa nos preocupamos por tu satisfacción y comodidad. Ofrecemos servicios adicionales como transporte y embalaje. Si necesitas trasladarte dentro o fuera de la ciudad, nuestro servicio de traslado «in out» está diseñado para facilitar tu reubicación.
          </p>
          <NuxtLink to="/embalajes" class="text-teal-600 font-bold hover:underline">Ver servicio de embalaje →</NuxtLink>
        </div>
      </section>
      
      <PortesTestimonials />

      <!-- CTA final mudanzas, fletes, acarreos -->
      <section class="py-16 bg-teal-600">
        <div class="container mx-auto px-4 max-w-3xl text-center text-white">
          <p class="text-xl font-medium mb-4">
            No importa si necesitas mudanzas, fletes, acarreos o traslados: nuestra empresa se encargará de que tus pertenencias lleguen a su destino de manera segura y puntual. Contáctanos para más información o consulta nuestra <NuxtLink to="/fletes-santiago" class="underline hover:no-underline font-semibold">página de fletes en la capital</NuxtLink>.
          </p>
          <p class="text-white/90 text-sm mb-6">
            <NuxtLink to="/fletes-santiago" class="underline hover:no-underline font-semibold">Ver página Fletes Santiago →</NuxtLink>
          </p>
          <a href="https://wa.me/56979796841" target="_blank" rel="noopener" class="inline-block bg-white text-teal-700 px-10 py-4 rounded-2xl font-black hover:bg-slate-100 transition-all">
            WhatsApp +56 9 7979 6841
          </a>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.index.pricing.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.index.pricing.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="grid md:grid-cols-2 gap-8 mb-12">
              <div
                v-for="(price, idx) in pricingInfo"
                :key="idx"
                class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
              >
                <h3 class="text-xl font-black text-slate-900 mb-4">{{ price.title }}</h3>
                <p class="text-slate-600 leading-relaxed font-medium">{{ price.description }}</p>
              </div>
            </div>
            <div class="text-center">
              <p class="text-slate-600 font-medium mb-6">{{ $t('pages.index.pricing.ctaText') }}</p>
              <NuxtLink
                to="#hero-calculator"
                @click="scrollToCalc"
                class="inline-block bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                {{ $t('pages.index.pricing.ctaButton') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Blog reciente (widget) -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div class="text-center sm:text-left">
              <h4 class="text-2xl md:text-3xl font-black text-slate-900 mb-2 tracking-tighter">
                Artículos sobre fletes y mudanzas
              </h4>
              <p class="text-slate-500 font-medium">Artículos recientes sobre fletes, mudanzas y logística</p>
            </div>
            <NuxtLink
              to="/blog"
              class="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-black text-sm uppercase tracking-widest shrink-0"
            >
              Ver más
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </NuxtLink>
          </div>
          <div class="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin">
            <div class="flex gap-6 min-w-max md:min-w-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
              <template v-if="recentPosts.length">
                <NuxtLink
                  v-for="post in recentPosts"
                  :key="getBlogSlug(post)"
                  :to="`/blog/${getBlogSlug(post)}`"
                  class="group flex-shrink-0 w-[280px] md:w-auto bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all hover:-translate-y-1"
                >
                  <div class="p-6">
                    <p v-if="post.date" class="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">{{ formatBlogDate(post.date) }}</p>
                    <h3 class="text-lg font-black text-slate-900 mb-2 line-clamp-2 group-hover:text-teal-600 transition-colors">{{ post.title || 'Sin título' }}</h3>
                    <p v-if="post.description" class="text-slate-600 text-sm line-clamp-2">{{ post.description }}</p>
                    <span class="inline-block mt-3 text-sm font-bold text-teal-600 group-hover:underline">Leer más →</span>
                  </div>
                </NuxtLink>
              </template>
              <p v-else class="text-slate-500 col-span-full text-center py-8">No hay entradas recientes.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQs Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.index.faqs.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.index.faqs.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto space-y-6">
            <div
              v-for="(faq, idx) in faqs"
              :key="idx"
              class="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"
            >
              <button
                @click="toggleFaq(idx)"
                class="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-100 transition-all"
              >
                <h3 class="text-lg font-black text-slate-900 pr-8">{{ faq.question }}</h3>
                <svg
                  :class="['w-6 h-6 text-teal-600 transition-transform flex-shrink-0', faq.open ? 'rotate-180' : '']"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-screen"
                leave-active-class="transition-all duration-300"
                leave-from-class="opacity-100 max-h-screen"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="faq.open" class="px-8 pb-6">
                  <p class="text-slate-600 leading-relaxed font-medium">{{ faq.answer }}</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>

<script setup>
import { computed, ref, h, watch, onMounted } from 'vue'

// ⚠️ LOG INMEDIATO - Debe aparecer siempre
console.log('🔥🔥🔥 [INDEX.VUE] Script setup INICIADO')

const { locale, locales, t } = useI18n()
const route = useRoute()
const { $i18n } = useNuxtApp()

// Console log inicial para debugging - EJECUTAR INMEDIATAMENTE
console.log('🔵🔵🔵 [INDEX.VUE] Script setup ejecutado')
console.log('🔵 [Index] Locale actual:', locale.value)
console.log('🔵 [Index] i18n disponible:', $i18n ? 'Sí' : 'No')

// Verificar traducciones inmediatamente
if ($i18n?.messages?.value) {
  console.log('🔵 [Index] Mensajes disponibles:', Object.keys($i18n.messages.value))
  if ($i18n.messages.value[locale.value]) {
    console.log('🔵 [Index] Mensajes para locale:', Object.keys($i18n.messages.value[locale.value]))
    if ($i18n.messages.value[locale.value].pages) {
      console.log('🔵 [Index] Páginas disponibles:', Object.keys($i18n.messages.value[locale.value].pages))
      if ($i18n.messages.value[locale.value].pages.index) {
        console.log('✅ [Index] pages.index ENCONTRADO!')
        console.log('✅ [Index] Keys en pages.index:', Object.keys($i18n.messages.value[locale.value].pages.index))
      } else {
        console.error('❌ [Index] pages.index NO ENCONTRADO')
      }
    } else {
      console.error('❌ [Index] pages NO ENCONTRADO')
    }
  } else {
    console.error('❌ [Index] Mensajes para locale', locale.value, 'NO ENCONTRADOS')
  }
} else {
  console.error('❌ [Index] NO HAY MENSAJES DISPONIBLES')
}

// Console log inicial para debugging
onMounted(() => {
  console.log('🔵🔵🔵 [INDEX.VUE] onMounted ejecutado - Verificando traducciones...')
  console.log('🔵 [Index] Componente montado - Verificando traducciones...')
  console.log('🔵 [Index] Locale actual:', locale.value)
  console.log('🔵 [Index] i18n disponible:', $i18n ? 'Sí' : 'No')
  console.log('🔵 [Index] Mensajes disponibles:', $i18n?.messages?.value ? Object.keys($i18n.messages.value) : 'No hay mensajes')
  
  // Verificar estructura de traducciones
  if ($i18n?.messages?.value?.[locale.value]?.pages?.index) {
    console.log('✅ [Index] Estructura pages.index encontrada')
    console.log('✅ [Index] Keys disponibles en pages.index:', Object.keys($i18n.messages.value[locale.value].pages.index))
    
    // Verificar FAQs específicamente
    if ($i18n.messages.value[locale.value].pages.index.faqs) {
      const faqKeys = Object.keys($i18n.messages.value[locale.value].pages.index.faqs).filter(k => k.startsWith('faq'))
      console.log(`✅ [Index] FAQs encontrados: ${faqKeys.length} (${faqKeys.join(', ')})`)
    } else {
      console.error('❌ [Index] NO se encontró pages.index.faqs en las traducciones')
    }
    
    // Verificar servicesTypes
    if ($i18n.messages.value[locale.value].pages.index.servicesTypes) {
      console.log('✅ [Index] servicesTypes encontrado')
    } else {
      console.error('❌ [Index] NO se encontró pages.index.servicesTypes en las traducciones')
    }
    
    // Verificar pricing
    if ($i18n.messages.value[locale.value].pages.index.pricing) {
      console.log('✅ [Index] pricing encontrado')
    } else {
      console.error('❌ [Index] NO se encontró pages.index.pricing en las traducciones')
    }
  } else {
    console.error('❌ [Index] NO se encontró pages.index en las traducciones')
    console.log('🔴 [Index] Estructura completa disponible:', $i18n?.messages?.value?.[locale.value] ? Object.keys($i18n.messages.value[locale.value]) : 'No hay datos')
  }
})

const scrollToCalc = () => {
  if (process.client) {
    document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
}

// Blog reciente para el widget de la landing (encima de FAQs)
const { data: landingBlogData } = await useAsyncData('landing-blog-posts', async () => {
  try {
    const allContent = await queryCollection('content').all()
    if (allContent && Array.isArray(allContent)) {
      return allContent
        .filter(item => {
          const path = item._path || item.path || ''
          return path.startsWith('/blog/') && path !== '/blog/'
        })
        .sort((a, b) => {
          const dateA = new Date(a.date || 0)
          const dateB = new Date(b.date || 0)
          return dateB - dateA
        })
        .slice(0, 4)
    }
    return []
  } catch (err) {
    console.error('Error fetching blog posts for landing:', err)
    return []
  }
})
const recentPosts = computed(() => landingBlogData.value || [])
function getBlogSlug (post) {
  if (!post) return ''
  const path = post._path || post.path || post.id || ''
  if (!path) return ''
  if (path.startsWith('/blog/')) return path.replace('/blog/', '')
  const pathParts = path.split('/')
  return pathParts[pathParts.length - 1] || path.replace(/^\/blog/, '')
}
function formatBlogDate (dateString) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
}

// Estado de apertura de FAQs (ahora tenemos 12 FAQs)
const faqOpenStates = ref(Array(25).fill(false))

// FAQs con traducciones - computed para reactividad al cambio de locale y estado de apertura
const faqs = computed(() => {
  // Forzar reactividad al cambio de locale y estado de apertura
  const currentLocale = locale.value
  const openStates = faqOpenStates.value
  
  // Debug: Verificar que las traducciones estén disponibles
  console.log('🔵🔵🔵 [INDEX.VUE] FAQs COMPUTED EJECUTADO, locale:', currentLocale)
  const testKey = 'pages.index.faqs.faq1.question'
  const testTranslation = t(testKey)
  console.log('🔵 [Index] Test traducción FAQ1:', testKey, '→', testTranslation)
  
  if (process.client) {
    
    // Verificar si el mensaje existe directamente
    if ($i18n?.messages?.value?.[currentLocale]?.pages?.index?.faqs) {
      console.log('🔵 [Index] FAQs encontrados en mensajes:', Object.keys($i18n.messages.value[currentLocale].pages.index.faqs))
    } else {
      console.warn('🔴 [Index] No se encontraron FAQs en messages.pages.index.faqs')
      console.log('🔴 [Index] Estructura disponible:', $i18n?.messages?.value?.[currentLocale]?.pages ? Object.keys($i18n.messages.value[currentLocale].pages) : 'No hay pages')
    }
  }
  
  const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8', 'faq9', 'faq10', 'faq11', 'faq12', 'faq13', 'faq14', 'faq15', 'faq16', 'faq17', 'faq18', 'faq19', 'faq20', 'faq21', 'faq22', 'faq23', 'faq24', 'faq25']
  
  const result = faqKeys.map((key, index) => {
    const questionKey = `pages.index.faqs.${key}.question`
    const answerKey = `pages.index.faqs.${key}.answer`
    let question = t(questionKey)
    let answer = t(answerKey)
    
    // Debug detallado para cada FAQ
    if (process.client && (question === questionKey || answer === answerKey)) {
      console.warn(`🔴 [Index] FAQ ${key} tiene problemas:`)
      console.warn(`  - Question key: ${questionKey}`)
      console.warn(`  - Question result: ${question}`)
      console.warn(`  - Answer key: ${answerKey}`)
      console.warn(`  - Answer result: ${answer}`)
      
      // Intentar acceso directo al objeto
      try {
        const directQuestion = $i18n?.messages?.value?.[currentLocale]?.pages?.index?.faqs?.[key]?.question
        const directAnswer = $i18n?.messages?.value?.[currentLocale]?.pages?.index?.faqs?.[key]?.answer
        console.warn(`  - Acceso directo question:`, directQuestion)
        console.warn(`  - Acceso directo answer:`, directAnswer)
      } catch (e) {
        console.error(`  - Error al acceder directamente:`, e)
      }
    }
    
    // Si la traducción devuelve la misma clave, significa que no existe
    if (question === questionKey) {
      console.error(`❌ [Index] Traducción faltante para pregunta: ${questionKey}`)
      // Intentar obtener del objeto directamente como fallback
      const directQ = $i18n?.messages?.value?.[currentLocale]?.pages?.index?.faqs?.[key]?.question
      if (directQ) {
        console.log(`✅ [Index] Encontrada traducción directa para ${questionKey}:`, directQ)
        question = directQ
      }
    }
    if (answer === answerKey) {
      console.error(`❌ [Index] Traducción faltante para respuesta: ${answerKey}`)
      // Intentar obtener del objeto directamente como fallback
      const directA = $i18n?.messages?.value?.[currentLocale]?.pages?.index?.faqs?.[key]?.answer
      if (directA) {
        console.log(`✅ [Index] Encontrada traducción directa para ${answerKey}:`, directA)
        answer = directA
      }
    }
    
    return {
      question,
      answer,
      open: openStates[index]
    }
  })
  
  return result
})

// Watch locale changes para forzar reactividad
watch(locale, (newLocale) => {
  console.log('🟢 [Index] Locale cambió a:', newLocale)
  console.log('🟢 [Index] Mensajes disponibles para nuevo locale:', $i18n?.messages?.value?.[newLocale] ? Object.keys($i18n.messages.value[newLocale]) : 'No hay mensajes')
  // El computed se recalculará automáticamente
}, { immediate: true })

// Función para alternar el estado de apertura de un FAQ
const toggleFaq = (index) => {
  faqOpenStates.value[index] = !faqOpenStates.value[index]
}

// Service Types para la nueva sección
const IconHome = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
])
const IconBuilding = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
])
const IconGlobe = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])
const IconTruckIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])
const IconBox = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])
const IconArrows = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' })
])

// Títulos de la sección ServiceTypes
const serviceTypesTitle = computed(() => {
  const currentLocale = locale.value
  return $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.title || t('pages.index.servicesTypes.title') || 'Tipos de Mudanzas y Servicios'
})

const serviceTypesSubtitle = computed(() => {
  const currentLocale = locale.value
  return $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.subtitle || t('pages.index.servicesTypes.subtitle') || 'Servicios completos de mudanzas y fletes para particulares y empresas en Santiago y regiones'
})

const serviceTypes = computed(() => {
  const currentLocale = locale.value
  
  // Debug para serviceTypes - EJECUTAR SIEMPRE
  console.log('🔵 [Index] ServiceTypes computed ejecutado, locale:', currentLocale)
  const testKey = 'pages.index.servicesTypes.type1.title'
  const testTranslation = t(testKey)
  console.log('🔵 [Index] Test traducción serviceTypes:', testKey, '→', testTranslation)
  
  // Verificar acceso directo
  const directAccess = $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type1?.title
  console.log('🔵 [Index] Acceso directo serviceTypes type1.title:', directAccess)
  
  if (testTranslation === testKey || !testTranslation) {
    console.error('❌ [Index] ServiceTypes: Traducción faltante o no encontrada')
    console.error('❌ [Index] Estructura disponible:', $i18n?.messages?.value?.[currentLocale]?.pages?.index ? Object.keys($i18n.messages.value[currentLocale].pages.index) : 'No disponible')
  }
  
  return [
    {
      icon: IconHome,
      title: directAccess || t('pages.index.servicesTypes.type1.title') || 'pages.index.servicesTypes.type1.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type1?.description || t('pages.index.servicesTypes.type1.description') || 'pages.index.servicesTypes.type1.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type1?.feature1 || t('pages.index.servicesTypes.type1.feature1') || 'pages.index.servicesTypes.type1.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type1?.feature2 || t('pages.index.servicesTypes.type1.feature2') || 'pages.index.servicesTypes.type1.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type1?.feature3 || t('pages.index.servicesTypes.type1.feature3') || 'pages.index.servicesTypes.type1.feature3'
      ]
    },
    {
      icon: IconBuilding,
      title: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type2?.title || t('pages.index.servicesTypes.type2.title') || 'pages.index.servicesTypes.type2.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type2?.description || t('pages.index.servicesTypes.type2.description') || 'pages.index.servicesTypes.type2.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type2?.feature1 || t('pages.index.servicesTypes.type2.feature1') || 'pages.index.servicesTypes.type2.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type2?.feature2 || t('pages.index.servicesTypes.type2.feature2') || 'pages.index.servicesTypes.type2.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type2?.feature3 || t('pages.index.servicesTypes.type2.feature3') || 'pages.index.servicesTypes.type2.feature3'
      ]
    },
    {
      icon: IconGlobe,
      title: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type3?.title || t('pages.index.servicesTypes.type3.title') || 'pages.index.servicesTypes.type3.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type3?.description || t('pages.index.servicesTypes.type3.description') || 'pages.index.servicesTypes.type3.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type3?.feature1 || t('pages.index.servicesTypes.type3.feature1') || 'pages.index.servicesTypes.type3.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type3?.feature2 || t('pages.index.servicesTypes.type3.feature2') || 'pages.index.servicesTypes.type3.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type3?.feature3 || t('pages.index.servicesTypes.type3.feature3') || 'pages.index.servicesTypes.type3.feature3'
      ]
    },
    {
      icon: IconTruckIcon,
      title: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type4?.title || t('pages.index.servicesTypes.type4.title') || 'pages.index.servicesTypes.type4.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type4?.description || t('pages.index.servicesTypes.type4.description') || 'pages.index.servicesTypes.type4.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type4?.feature1 || t('pages.index.servicesTypes.type4.feature1') || 'pages.index.servicesTypes.type4.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type4?.feature2 || t('pages.index.servicesTypes.type4.feature2') || 'pages.index.servicesTypes.type4.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type4?.feature3 || t('pages.index.servicesTypes.type4.feature3') || 'pages.index.servicesTypes.type4.feature3'
      ]
    },
    {
      icon: IconBox,
      title: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type5?.title || t('pages.index.servicesTypes.type5.title') || 'pages.index.servicesTypes.type5.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type5?.description || t('pages.index.servicesTypes.type5.description') || 'pages.index.servicesTypes.type5.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type5?.feature1 || t('pages.index.servicesTypes.type5.feature1') || 'pages.index.servicesTypes.type5.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type5?.feature2 || t('pages.index.servicesTypes.type5.feature2') || 'pages.index.servicesTypes.type5.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type5?.feature3 || t('pages.index.servicesTypes.type5.feature3') || 'pages.index.servicesTypes.type5.feature3'
      ]
    },
    {
      icon: IconArrows,
      title: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type6?.title || t('pages.index.servicesTypes.type6.title') || 'pages.index.servicesTypes.type6.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type6?.description || t('pages.index.servicesTypes.type6.description') || 'pages.index.servicesTypes.type6.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type6?.feature1 || t('pages.index.servicesTypes.type6.feature1') || 'pages.index.servicesTypes.type6.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type6?.feature2 || t('pages.index.servicesTypes.type6.feature2') || 'pages.index.servicesTypes.type6.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type6?.feature3 || t('pages.index.servicesTypes.type6.feature3') || 'pages.index.servicesTypes.type6.feature3'
      ]
    }
  ]
})

const pricingInfo = computed(() => {
  const currentLocale = locale.value
  
  // Debug para pricingInfo
  if (process.client) {
    console.log('🔵 [Index] PricingInfo computed ejecutado, locale:', currentLocale)
    const testKey = 'pages.index.pricing.price1.title'
    const testTranslation = t(testKey)
    console.log('🔵 [Index] Test traducción pricing:', testKey, '→', testTranslation)
    if (testTranslation === testKey) {
      console.warn('❌ [Index] PricingInfo: Traducción faltante o no encontrada')
    }
  }
  
  return [
    {
      title: t('pages.index.pricing.price1.title'),
      description: t('pages.index.pricing.price1.description')
    },
    {
      title: t('pages.index.pricing.price2.title'),
      description: t('pages.index.pricing.price2.description')
    },
    {
      title: t('pages.index.pricing.price3.title'),
      description: t('pages.index.pricing.price3.description')
    },
    {
      title: t('pages.index.pricing.price4.title'),
      description: t('pages.index.pricing.price4.description')
    }
  ]
})

// SEO Meta Tags
const siteUrl = 'https://fletespro.cl'
const siteName = 'FletesPro'
const defaultImage = `${siteUrl}/og-image.jpg`
const logoUrl = `${siteUrl}/logo.png`

// Obtener path sin locale para canonical (con barra final estandarizada)
const pathWithoutLocale = route.path.replace(/^\/(es|en)/, '') || '/'
const canonicalPath = locale.value === 'es' 
  ? (pathWithoutLocale === '/' ? '/' : pathWithoutLocale)
  : `/${locale.value}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
const canonicalUrl = `${siteUrl}${canonicalPath}`

// Hreflang links
const alternateLinks = computed(() => {
  const links = []
  const pathWithoutLocale = route.path.replace(/^\/(es|en)/, '') || '/'
  
  locales.value.forEach((loc) => {
    const localePath = loc.code === 'es' 
      ? (pathWithoutLocale === '/' ? '/' : pathWithoutLocale)
      : `/${loc.code}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    const fullUrl = `${siteUrl}${localePath}`
    
    links.push({
      rel: 'alternate',
      hreflang: loc.iso || loc.code,
      href: fullUrl
    })
    
    // Agregar x-default para el idioma por defecto
    if (loc.code === 'es') {
      links.push({
        rel: 'alternate',
        hreflang: 'x-default',
        href: fullUrl
      })
    }
  })
  
  return links
})

// Locale mappings para OG (solo español e inglés)
const localeMap = {
  'es': 'es_ES',
  'en': 'en_US'
}

// Titles genéricos (Santiago se potencia en /fletes-santiago)
const pageTitle = computed(() => {
  if (locale.value === 'es') return 'Fletes y Mudanzas | Cotización Online | RM y Regiones | FletesPro'
  return 'Freight and Moving | Online Quote | FletesPro'
})

// Meta descriptions genéricas
const pageDescription = computed(() => {
  if (locale.value === 'es') return 'Fletes y mudanzas en la RM y a regiones. Cotización online y servicio 24/7. Para la capital hay página dedicada. WhatsApp +56979796841'
  return 'Freight and moving in Chile. Online quote. Free estimate. WhatsApp +56 9 7979 6841'
})

// OG Titles y Descriptions
const ogTitle = computed(() => {
  if (locale.value === 'es') return 'Fletes y Mudanzas | Cotización Online | RM y Regiones | FletesPro'
  return 'Freight and Moving | FletesPro'
})

const ogDescription = computed(() => {
  if (locale.value === 'es') return 'Fletes y mudanzas en la RM y a regiones. Cotización online. Página dedicada para la capital. Servicio 24/7. WhatsApp +56979796841.'
  return 'Professional freight and moving in Chile. Online price calculator. Free quote.'
})

// BreadcrumbList Schema
const breadcrumbSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: t('breadcrumbs.home'),
      item: locale.value === 'es' ? siteUrl : `${siteUrl}/${locale.value}`
    }
  ]
}))

// FAQPage Schema
const faqSchema = computed(() => {
  const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8', 'faq9', 'faq10', 'faq11', 'faq12', 'faq13', 'faq14', 'faq15', 'faq16', 'faq17', 'faq18', 'faq19', 'faq20', 'faq21', 'faq22', 'faq23', 'faq24', 'faq25']
  const mainEntity = faqKeys.map((key, index) => ({
    '@type': 'Question',
    name: t(`pages.index.faqs.${key}.question`),
    acceptedAnswer: {
      '@type': 'Answer',
      text: t(`pages.index.faqs.${key}.answer`)
    }
  }))
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity
  }
})

// MovingCompany Schema - FletesPro Chile
const movingCompanySchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'MovingCompany',
  name: 'FletesPro',
  url: siteUrl,
  logo: logoUrl,
  image: defaultImage,
  description: ogDescription.value,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Providencia',
    addressRegion: 'Región Metropolitana',
    addressCountry: 'CL'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '-33.4372',
    longitude: '-70.6506'
  },
  telephone: '+56-9-7979-6841',
  priceRange: '$$',
  areaServed: {
    '@type': 'Country',
    name: 'Chile'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00'
    }
  ]
}))

// Head tags reactivos usando computed
useHead(computed(() => {
  try {
    const currentLocale = locale.value
    const currentPathWithoutLocale = route.path.replace(/^\/(es|en)/, '') || '/'
    const currentCanonicalPath = currentLocale === 'es' 
      ? (currentPathWithoutLocale === '/' ? '/' : currentPathWithoutLocale)
      : `/${currentLocale}${currentPathWithoutLocale === '/' ? '' : currentPathWithoutLocale}`
    const currentCanonicalUrl = `${siteUrl}${currentCanonicalPath}`
    
    // Construir schemas directamente aquí dentro del computed
    const movingCompany = {
      '@context': 'https://schema.org',
      '@type': 'MovingCompany',
      name: 'FletesPro',
      url: siteUrl,
      logo: logoUrl,
      image: defaultImage,
      description: ogDescription.value,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Providencia',
        addressRegion: 'Región Metropolitana',
        addressCountry: 'CL'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '-33.4372',
        longitude: '-70.6506'
      },
      telephone: '+56-9-7979-6841',
      priceRange: '$$',
      areaServed: { '@type': 'Country', name: 'Chile' },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00'
        }
      ]
    }

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('breadcrumbs.home'),
          item: currentLocale === 'es' ? siteUrl : `${siteUrl}/${currentLocale}`
        }
      ]
    }

    const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8', 'faq9', 'faq10', 'faq11', 'faq12', 'faq13', 'faq14', 'faq15', 'faq16', 'faq17', 'faq18', 'faq19', 'faq20', 'faq21', 'faq22', 'faq23', 'faq24', 'faq25']
    const faq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqKeys.map((key) => ({
        '@type': 'Question',
        name: t(`pages.index.faqs.${key}.question`),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t(`pages.index.faqs.${key}.answer`)
        }
      }))
    }
    
    return {
      title: pageTitle.value,
      meta: [
        {
          name: 'description',
          content: pageDescription.value
        },
        {
          name: 'keywords',
          content: currentLocale === 'es' ? 'fletes y mudanzas, mudanzas y fletes, fletes región metropolitana, fletes a regiones, cotizar flete, transporte de carga Chile, mudanzas Santiago, mudanzas RM, fletes baratos, mudanzas económicas, calculadora flete, presupuesto mudanza, servicio de fletes, empresa de mudanzas' :
            'freight and moving Chile, moving and freight, quote freight, cargo transport Chile, affordable freight'
        },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: currentCanonicalUrl },
        { property: 'og:title', content: ogTitle.value },
        { property: 'og:description', content: ogDescription.value },
        { property: 'og:locale', content: localeMap[currentLocale] || 'es_ES' },
        { property: 'og:image', content: defaultImage },
        { property: 'og:site_name', content: siteName },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: currentCanonicalUrl },
        { name: 'twitter:title', content: ogTitle.value },
        { name: 'twitter:description', content: ogDescription.value },
        { name: 'twitter:image', content: defaultImage }
      ],
      link: [
        { rel: 'canonical', href: currentCanonicalUrl },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://www.google-analytics.com' },
        { rel: 'sitemap', type: 'application/xml', title: 'Sitemap', href: '/sitemap.xml' },
        ...alternateLinks.value
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(movingCompany)
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(breadcrumb)
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(faq)
        }
      ]
    }
  } catch (error) {
    console.error('Error generando head tags:', error)
    return {}
  }
}))
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-1 {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(80px, -40px);
  }
  66% {
    transform: translate(-40px, 80px);
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-60px, 100px);
  }
  66% {
    transform: translate(100px, -60px);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out 0.3s both;
}

.animate-float-1 {
  animation: float-1 25s infinite linear;
}

.animate-float-2 {
  animation: float-2 30s infinite linear;
}
</style>
