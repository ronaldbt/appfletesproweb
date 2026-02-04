<template>
  <footer class="bg-slate-950 text-white py-20">
    <div class="container mx-auto px-4">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
        <!-- Company Info -->
        <div class="lg:col-span-2 space-y-6">
          <div class="flex items-center gap-2">
            <div class="bg-teal-600 p-2 rounded-lg">
              <svg class="text-white w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-2xl font-black tracking-tighter">
              FLETES<span class="text-teal-400">PRO</span>.cl
            </span>
          </div>
          <p class="text-slate-400 leading-relaxed text-sm">
            {{ $t('footer.description') }}
          </p>
          <div class="flex gap-4">
            <a href="#" class="bg-slate-900 p-2 rounded-full hover:bg-teal-600 transition-all shadow-lg" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="bg-slate-900 p-2 rounded-full hover:bg-teal-600 transition-all shadow-lg" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Servicios -->
        <div>
          <h4 class="text-lg font-black mb-6 uppercase tracking-widest text-teal-500">{{ $t('footer.services') }}</h4>
          <ul class="space-y-3 text-slate-400">
            <li>
              <NuxtLink to="/mudanzas" class="hover:text-teal-400 transition-colors text-sm">
                {{ $t('nav.mudanzas') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/mudanzas/particulares" class="hover:text-teal-400 transition-colors text-sm">
                {{ $t('nav.mudanzasParticulares') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/mudanzas/empresas" class="hover:text-teal-400 transition-colors text-sm">
                {{ $t('nav.mudanzasEmpresas') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/mudanzas/oficinas" class="hover:text-teal-400 transition-colors text-sm">
                {{ $t('nav.mudanzasOficinas') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/mudanzas/internacionales" class="hover:text-teal-400 transition-colors text-sm">
                {{ $t('nav.mudanzasInternacionales') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/mudanzas/urgentes" class="hover:text-teal-400 transition-colors text-sm">
                {{ $t('nav.mudanzasUrgentes') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/embalajes" class="hover:text-teal-400 transition-colors text-sm">
                {{ $t('nav.embalajes') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/guardamuebles" class="hover:text-teal-400 transition-colors text-sm">
                {{ $t('nav.guardamuebles') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/transporte-frio" class="hover:text-teal-400 transition-colors text-sm">
                {{ $t('nav.transporteFrio') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/ultima-milla" class="hover:text-teal-400 transition-colors text-sm">
                {{ $t('nav.ultimaMilla') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="hover:text-teal-400 transition-colors text-sm">
                {{ $t('common.blog') }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Comunas RM -->
        <div>
          <h4 class="text-lg font-black mb-6 uppercase tracking-widest text-teal-500">Comunas RM</h4>
          <ul class="space-y-3 text-slate-400">
            <li v-for="comuna in comunasRM" :key="comuna.slug">
              <NuxtLink :to="`/fletes-${comuna.slug}`" class="hover:text-teal-400 transition-colors text-sm">
                Fletes {{ comuna.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Servicios Especializados -->
        <div>
          <h4 class="text-lg font-black mb-6 uppercase tracking-widest text-teal-500">Especialidades</h4>
          <ul class="space-y-3 text-slate-400">
            <li>
              <NuxtLink to="/mudanzas/piano" class="hover:text-teal-400 transition-colors text-sm">
                Mudanzas Piano
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/mudanzas/antiguedades" class="hover:text-teal-400 transition-colors text-sm">
                Mudanzas Antigüedades
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/mudanzas/obras-arte" class="hover:text-teal-400 transition-colors text-sm">
                Mudanzas Obras de Arte
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/embalajes" class="hover:text-teal-400 transition-colors text-sm">
                Embalaje Frágiles
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/guardamuebles" class="hover:text-teal-400 transition-colors text-sm">
                Bodegaje Climatizado
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/transporte-frio" class="hover:text-teal-400 transition-colors text-sm">
                Transporte Refrigerado
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/ultima-milla" class="hover:text-teal-400 transition-colors text-sm">
                Última Milla Ecommerce
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/ultima-milla" class="hover:text-teal-400 transition-colors text-sm">
                Última Milla Alimentación
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/ultima-milla" class="hover:text-teal-400 transition-colors text-sm">
                Última Milla Farmacia
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contacto -->
        <div>
          <h4 class="text-lg font-black mb-6 uppercase tracking-widest text-teal-500">Contacto</h4>
          <ul class="space-y-4 text-slate-400">
            <li class="flex items-start gap-3">
              <svg class="text-teal-500 w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p class="font-bold text-white text-sm">{{ $t('common.phone') }}</p>
                <a href="tel:+56979796841" class="hover:text-teal-400 transition-colors">+56 9 7979 6841</a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="text-teal-500 w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p class="font-bold text-white text-sm">{{ $t('common.email') }}</p>
                <a href="mailto:hola@portespro.es" class="hover:text-teal-400 transition-colors">hola@portespro.es</a>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <svg class="text-teal-500 w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="font-bold text-white text-sm">{{ $t('common.address') }}</p>
                <p class="text-sm">Providencia, Santiago<br />Región Metropolitana, Chile</p>
              </div>
            </li>
            <li>
              <NuxtLink to="/contacto" class="hover:text-teal-400 transition-colors text-sm">
                Contacto
              </NuxtLink>
            </li>
            <li class="pt-2">
              <NuxtLink
                to="/"
                class="bg-teal-600 text-white w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-teal-700 transition-all transform hover:scale-[1.02] block text-center"
              >
                {{ $t('common.cta') }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- SEO Text Section -->
      <div class="border-t border-slate-900 pt-12 mb-12">
        <div class="grid md:grid-cols-2 gap-8 text-slate-400 text-sm leading-relaxed">
          <div>
            <h5 class="text-white font-black mb-4 uppercase tracking-widest text-xs">Fletes y Mudanzas en Santiago y Región Metropolitana</h5>
            <p>
              FletesPro es una empresa de fletes y mudanzas en Santiago y Región Metropolitana. Ofrecemos fletes baratos, mudanzas económicas y mudanzas rápidas para particulares y empresas. Servicios: mudanzas particulares, mudanzas empresas, mudanzas oficinas, mudanzas internacionales y mudanzas urgentes. También embalajes profesionales, bodegaje Santiago, arriendo de bodegas Región Metropolitana, transporte en frío y última milla logística.
            </p>
          </div>
          <div>
            <h5 class="text-white font-black mb-4 uppercase tracking-widest text-xs">Servicios de Logística y Transporte</h5>
            <p>
              Además de mudanzas, ofrecemos embalajes para mudanza con materiales profesionales: cajas cartón, papel burbuja y film plástico. Nuestro bodegaje incluye bodegas climatizadas, bodegas seguras y espacios de almacenamiento con acceso 24 horas. Para productos perecederos: transporte refrigerado, transporte frío y logística de cadena de frío en Santiago y Chile. Última milla para ecommerce, alimentación y farmacia con entrega mismo día y express.
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-xs text-slate-600">
          © 2026 FletesPro - {{ $t('footer.description') }}. {{ $t('footer.allRightsReserved') }}
        </p>
        <div class="flex flex-wrap gap-6 text-xs text-slate-600">
          <NuxtLink to="/contacto" class="hover:text-teal-400 transition-colors">Contacto</NuxtLink>
          <NuxtLink to="/blog" class="hover:text-teal-400 transition-colors">Blog</NuxtLink>
          <NuxtLink to="/legal" class="hover:text-teal-400 transition-colors">{{ $t('footer.legal') }}</NuxtLink>
          <NuxtLink to="/privacidad" class="hover:text-teal-400 transition-colors">{{ $t('footer.privacy') }}</NuxtLink>
          <NuxtLink to="/cookies" class="hover:text-teal-400 transition-colors">{{ $t('footer.cookies') }}</NuxtLink>
          <NuxtLink to="/terminos" class="hover:text-teal-400 transition-colors">{{ $t('footer.terms') }}</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { comunasRM } from '~/config/comunasRM'
</script>
