<template>
  <nav :class="`w-full transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-2' : 'bg-white py-2'}`">
    <div ref="barra" class="container mx-auto px-4 md:px-6 flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="bg-white p-1.5 rounded-lg group-hover:bg-teal-50 border-2 border-slate-200 group-hover:border-teal-600 transition-all duration-300 transform group-hover:rotate-12 shadow-lg flex items-center justify-center">
          <NuxtImg 
            src="/logo-portespro.png" 
            alt="FletesPro Logo" 
            width="36"
            height="36"
            format="webp"
            class="w-9 h-9 object-contain"
            loading="eager"
            fetchpriority="high"
          />
        </div>
        <span class="text-xl font-black tracking-tight text-slate-900">
          FLETES<span class="text-teal-600">PRO</span>.cl
        </span>
      </NuxtLink>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-2">
        <!-- Mudanzas Dropdown -->
        <div class="relative group">
          <button 
            class="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-teal-600 transition-all relative flex items-center gap-0.5 cursor-pointer whitespace-nowrap"
          >
            {{ $t('nav.mudanzas') }}
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="absolute top-full left-0 mt-2 w-64 max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-100 overflow-hidden z-50">
            <NuxtLink to="/mudanzas-santiago" class="block px-6 py-4 text-sm font-bold text-teal-700 hover:bg-teal-50 hover:text-teal-600 transition-all border-b border-slate-100">
              Mudanzas Santiago
            </NuxtLink>
            <NuxtLink v-for="comuna in mudanzasComunas" :key="comuna.slug" :to="`/mudanzas-${comuna.slug}`" class="block px-6 py-4 text-sm font-bold text-slate-700 hover:bg-teal-50 hover:text-teal-600 transition-all">
              Mudanzas {{ comuna.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Embalajes -->
        <NuxtLink 
          to="/embalajes"
          class="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-teal-600 transition-all relative group whitespace-nowrap"
        >
          {{ $t('nav.embalajes') }}
          <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <!-- Bodegaje Dropdown -->
        <div class="relative group">
          <button
            type="button"
            class="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-teal-600 transition-all relative flex items-center gap-0.5 cursor-pointer whitespace-nowrap"
          >
            {{ $t('nav.guardamuebles') }}
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="absolute top-full left-0 mt-2 w-64 max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-100 overflow-hidden z-50">
            <NuxtLink to="/bodegaje" class="block px-6 py-4 text-sm font-bold text-teal-700 hover:bg-teal-50 hover:text-teal-600 transition-all border-b border-slate-100">
              {{ $t('nav.bodegajeHub') }}
            </NuxtLink>
            <NuxtLink
              v-for="row in bodegajeComunasLanding"
              :key="row.slug"
              :to="`/bodegaje/${row.slug}`"
              class="block px-6 py-4 text-sm font-bold text-slate-700 hover:bg-teal-50 hover:text-teal-600 transition-all"
            >
              {{ $t('nav.bodegajeComuna', { comuna: row.comunaLabel }) }}
            </NuxtLink>
          </div>
        </div>

        <!-- Transporte en Frío -->
        <NuxtLink 
          to="/transporte-frio"
          class="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-teal-600 transition-all relative group whitespace-nowrap"
        >
          {{ $t('nav.transporteFrio') }}
          <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <!-- Última Milla -->
        <NuxtLink 
          to="/ultima-milla"
          class="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-teal-600 transition-all relative group whitespace-nowrap"
        >
          {{ $t('nav.ultimaMilla') }}
          <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <!-- Fletes Construcción -->
        <NuxtLink 
          to="/fletes-construccion"
          class="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-teal-600 transition-all relative group whitespace-nowrap"
        >
          {{ $t('nav.fletesConstruccion') }}
          <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <!-- Blog -->
        <NuxtLink 
          to="/blog"
          class="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-teal-600 transition-all relative group whitespace-nowrap"
        >
          {{ $t('common.blog') }}
          <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <!-- Comunas RM Dropdown -->
        <div class="relative group">
          <button 
            class="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-teal-600 transition-all relative flex items-center gap-0.5 whitespace-nowrap"
          >
            Comunas RM
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="absolute top-full left-0 mt-2 w-64 max-h-[70vh] overflow-y-auto bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-100 overflow-hidden z-50">
            <NuxtLink v-for="comuna in comunasRM" :key="comuna.slug" :to="`/fletes-${comuna.slug}`" class="block px-6 py-4 text-sm font-bold text-slate-700 hover:bg-teal-50 hover:text-teal-600 transition-all">
              Fletes {{ comuna.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Contacto -->
        <NuxtLink 
          to="/contacto"
          class="text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-teal-600 transition-all relative group whitespace-nowrap"
        >
          {{ $t('nav.contacto') }}
          <span class="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <NuxtLink 
          to="/login"
          class="px-3 py-1.5 text-xs font-bold rounded-lg border-2 border-teal-600 text-teal-600 hover:bg-teal-50 transition-all"
        >
          {{ $t('nav.login') }}
        </NuxtLink>
      </div>

      <!-- Mobile Toggle -->
      <button type="button" class="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-900" :aria-expanded="isOpen" aria-controls="menu-movil" aria-label="Abrir menú" @click="isOpen = !isOpen">
        <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Menú móvil: los enlaces van en el HTML aunque esté cerrado, para que se puedan rastrear. -->
    <div
      id="menu-movil"
      class="md:hidden fixed inset-x-0 bottom-0 z-[80]"
      :class="isOpen ? '' : 'hidden'"
      :style="{ top: menuTop + 'px' }"
    >
      <button type="button" class="absolute inset-0 bg-slate-900/45" aria-label="Cerrar menú" @click="cerrarMenu" />
      <div class="absolute left-2.5 right-2.5 top-2 bottom-2.5 flex flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <div class="flex items-center justify-between gap-3 px-4 pt-4 pb-2">
          <NuxtLink to="/" class="flex items-center gap-2 min-w-0" @click="cerrarMenu">
            <img src="/logo-portespro.png" alt="" width="36" height="36" class="h-9 w-9 object-contain" />
            <span class="text-lg font-black tracking-tight text-slate-900 truncate">FLETES<span class="text-teal-600">PRO</span></span>
          </NuxtLink>
          <button type="button" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700" aria-label="Cerrar menú" @click="cerrarMenu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto overscroll-contain px-4 pb-3 touch-pan-y">
          <p class="px-1 pb-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Cotiza tu flete</p>
          <div class="grid grid-cols-2 gap-2.5">
            <NuxtLink to="/fletes-santiago" class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm" @click="cerrarMenu">
              <img src="/ejemplo-flete-sencillo.webp" alt="Flete en Santiago con camión" width="320" height="180" class="h-24 w-full object-cover" />
              <div class="p-2.5">
                <p class="text-[13px] font-black leading-tight text-slate-900">FLETES EN SANTIAGO</p>
                <div class="mt-2 flex items-center justify-between gap-1">
                  <span class="text-xs text-slate-500">Desde $28.000</span>
                  <span class="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-slate-900" aria-hidden="true">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </div>
            </NuxtLink>
            <NuxtLink to="/mudanzas-santiago" class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm" @click="cerrarMenu">
              <div class="flex h-24 w-full items-center justify-center bg-gradient-to-br from-teal-600 to-teal-800" aria-hidden="true">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M3 7h13v8H3zM16 10h3l2 3v2h-5zM7 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
              </div>
              <div class="p-2.5">
                <p class="text-[13px] font-black leading-tight text-slate-900">MUDANZAS</p>
                <div class="mt-2 flex items-center justify-between gap-1">
                  <span class="text-xs text-slate-500">Desde $40.000</span>
                  <span class="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-slate-900" aria-hidden="true">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <div class="mt-4 space-y-1">
            <NuxtLink v-for="item in serviciosMenu" :key="item.to" :to="item.to" class="flex items-center gap-3 rounded-2xl px-1 py-2" @click="cerrarMenu">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-teal-700" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="item.icon" /></svg>
              </span>
              <span class="min-w-0">
                <span class="block text-sm font-black text-slate-900">{{ item.titulo }}</span>
                <span class="block text-xs text-slate-500">{{ item.sub }}</span>
              </span>
            </NuxtLink>
          </div>

          <div class="mt-2 border-t border-slate-100 pt-2">
            <button type="button" class="flex w-full items-center gap-3 rounded-2xl px-1 py-2 text-left" :aria-expanded="abierto === 'mudanzas'" @click="toggleSeccion('mudanzas')">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-teal-700" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>
              </span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-black text-slate-900">{{ $t('nav.mudanzas') }}</span>
                <span class="block text-xs text-slate-500">Santiago y comunas</span>
              </span>
              <svg class="w-4 h-4 text-slate-400 transition-transform" :class="abierto === 'mudanzas' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-show="abierto === 'mudanzas'" class="mb-2 ml-12 flex flex-col">
              <NuxtLink to="/mudanzas-santiago" class="rounded-xl px-3 py-2 text-sm font-bold text-teal-700" @click="cerrarMenu">Mudanzas Santiago</NuxtLink>
              <NuxtLink v-for="comuna in mudanzasComunas" :key="comuna.slug" :to="`/mudanzas-${comuna.slug}`" class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600" @click="cerrarMenu">Mudanzas {{ comuna.name }}</NuxtLink>
            </div>

            <button type="button" class="flex w-full items-center gap-3 rounded-2xl px-1 py-2 text-left" :aria-expanded="abierto === 'bodegaje'" @click="toggleSeccion('bodegaje')">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-teal-700" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 7h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 7l2-3h12l2 3M9 12h6" /></svg>
              </span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-black text-slate-900">{{ $t('nav.guardamuebles') }}</span>
                <span class="block text-xs text-slate-500">Guardamuebles por comuna</span>
              </span>
              <svg class="w-4 h-4 text-slate-400 transition-transform" :class="abierto === 'bodegaje' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-show="abierto === 'bodegaje'" class="mb-2 ml-12 flex flex-col">
              <NuxtLink to="/bodegaje" class="rounded-xl px-3 py-2 text-sm font-bold text-teal-700" @click="cerrarMenu">{{ $t('nav.bodegajeHub') }}</NuxtLink>
              <NuxtLink v-for="row in bodegajeComunasLanding" :key="row.slug" :to="`/bodegaje/${row.slug}`" class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600" @click="cerrarMenu">{{ $t('nav.bodegajeComuna', { comuna: row.comunaLabel }) }}</NuxtLink>
            </div>

            <button type="button" class="flex w-full items-center gap-3 rounded-2xl px-1 py-2 text-left" :aria-expanded="abierto === 'comunas'" @click="toggleSeccion('comunas')">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-teal-700" aria-hidden="true">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z" /><circle cx="12" cy="10" r="2.2" /></svg>
              </span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-black text-slate-900">Comunas RM</span>
                <span class="block text-xs text-slate-500">Fletes por comuna</span>
              </span>
              <svg class="w-4 h-4 text-slate-400 transition-transform" :class="abierto === 'comunas' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div v-show="abierto === 'comunas'" class="mb-2 ml-12 flex flex-col">
              <NuxtLink v-for="comuna in comunasRM" :key="comuna.slug" :to="`/fletes-${comuna.slug}`" class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600" @click="cerrarMenu">Fletes {{ comuna.name }}</NuxtLink>
            </div>
          </div>
        </div>

        <div class="shrink-0 border-t border-slate-100 bg-white px-4 py-3">
          <NuxtLink to="/#hero-calculator" class="flex items-center justify-center gap-2 rounded-2xl bg-teal-600 py-3.5 text-sm font-black text-white shadow-lg shadow-teal-600/25" @click="cerrarMenu">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3M4 11h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" /></svg>
            Cotizar ahora
          </NuxtLink>
          <a :href="waHref" target="_blank" rel="noopener noreferrer" class="mt-2 flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 py-3 text-sm font-black text-slate-800">
            <svg class="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 11.5A8.5 8.5 0 0 1 7.1 18.6L4 20l1.5-3A8.5 8.5 0 1 1 20 11.5zm-8.5 6.6c1.3 0 2.5-.3 3.6-1l.3-.2 2.1.6-.6-2 .2-.3a6.6 6.6 0 1 0-5.6 3zm3.6-4.9c-.2-.1-1.1-.6-1.3-.6s-.3-.1-.5.2-.5.6-.7.8-.2.2-.4.1a5.4 5.4 0 0 1-1.6-1 6 6 0 0 1-1.1-1.4c-.1-.2 0-.3.1-.5l.3-.4.1-.2a.4.4 0 0 0 0-.4c0-.1-.5-1.2-.7-1.6s-.3-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.5 2.5 0 0 0-.8 1.9 4.4 4.4 0 0 0 .9 2.3 10 10 0 0 0 3.8 3.3 4.3 4.3 0 0 0 2.6.6 2.2 2.2 0 0 0 1.5-1 1.8 1.8 0 0 0 .1-1.1c-.1-.1-.2-.1-.4-.2z" /></svg>
            Hablar por WhatsApp
          </a>
          <p class="mt-2 text-center text-[11px] text-slate-500">
            <a :href="telHref" class="font-bold text-slate-700">{{ phoneDisplay }}</a>
            <span aria-hidden="true"> · </span>
            Santiago, Chile
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import { comunasRM } from '~/config/comunasRM'
import { mudanzasComunas } from '~/config/mudanzasComunas'
import { bodegajeComunasLanding } from '~/config/bodegajeComunas.js'
import { FLETESPRO_CL_PHONE_DISPLAY, FLETESPRO_CL_PHONE, FLETESPRO_CL_WHATSAPP } from '~/config/brandEntity'

defineEmits(['get-quote'])

const { t } = useI18n()
const phoneDisplay = FLETESPRO_CL_PHONE_DISPLAY
const telHref = `tel:${FLETESPRO_CL_PHONE}`
const waHref = computed(() => `https://wa.me/${FLETESPRO_CL_WHATSAPP}?text=${encodeURIComponent(t('topbar.waMessage'))}`)

const serviciosMenu = [
  { to: '/embalajes', titulo: 'Embalajes', sub: 'Cajas, protección y armado', icon: 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8' },
  { to: '/transporte-frio', titulo: 'Transporte frío', sub: 'Carga refrigerada', icon: 'M12 2v20M4.9 6.5l14.2 11M4.9 17.5l14.2-11' },
  { to: '/ultima-milla', titulo: 'Última milla', sub: 'Entregas en la ciudad', icon: 'M3 7h11v8H3zM14 10h4l3 3v2h-7zM6 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' },
  { to: '/fletes-construccion', titulo: 'Fletes construcción', sub: 'Materiales y escombros', icon: 'M4 20h16M6 20V9l6-5 6 5v11M10 20v-5h4v5' },
  { to: '/blog', titulo: 'Blog', sub: 'Guías y precios', icon: 'M5 4h11a2 2 0 012 2v14H7a2 2 0 01-2-2V4zM5 4a2 2 0 00-2 2v12' },
  { to: '/contacto', titulo: 'Contacto', sub: 'Escríbenos o llámanos', icon: 'M4 6h16v12H4zM4 7l8 6 8-6' },
  { to: '/login', titulo: 'Ingresar', sub: 'Clientes y conductores', icon: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0' }
]

const scrolled = ref(false)
const isOpen = ref(false)
const abierto = ref(null)
const barra = ref(null)
const menuTop = ref(72)
let scrollBloqueado = 0

function toggleSeccion (id) {
  abierto.value = abierto.value === id ? null : id
}

function actualizarTope () {
  const el = barra.value
  if (!el) return
  menuTop.value = Math.ceil(el.getBoundingClientRect().bottom)
}

function cerrarMenu () {
  isOpen.value = false
}

function bloquearFondo (open) {
  if (!import.meta.client) return
  const body = document.body
  if (open) {
    scrollBloqueado = window.scrollY
    actualizarTope()
    body.style.position = 'fixed'
    body.style.top = `-${scrollBloqueado}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
  } else {
    body.style.position = ''
    body.style.top = ''
    body.style.left = ''
    body.style.right = ''
    body.style.width = ''
    body.style.overflow = ''
    window.scrollTo(0, scrollBloqueado)
    abierto.value = null
  }
}

watch(isOpen, (open) => {
  bloquearFondo(open)
})

onBeforeUnmount(() => {
  if (isOpen.value) bloquearFondo(false)
})

onMounted(() => {
  if (process.client) {
    const handleScroll = () => {
      scrolled.value = window.scrollY > 20
    }
    window.addEventListener('scroll', handleScroll)
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  }
})
</script>



