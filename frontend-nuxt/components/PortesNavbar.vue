<template>
  <nav :class="`fixed w-full z-[70] transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-6'}`">
    <div class="container mx-auto px-4 md:px-6 flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="bg-white p-2 rounded-xl group-hover:bg-teal-50 border-2 border-slate-200 group-hover:border-teal-600 transition-all duration-300 transform group-hover:rotate-12 shadow-lg flex items-center justify-center">
          <img 
            src="/logo-portespro.png" 
            alt="FletesPro Logo" 
            class="w-12 h-12 object-contain"
            loading="eager"
          />
        </div>
        <span class="text-2xl font-black tracking-tighter text-slate-900">
          FLETES<span class="text-teal-600">PRO</span>.cl
        </span>
      </NuxtLink>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-4">
        <!-- Mudanzas Dropdown -->
        <div class="relative group">
          <button 
            class="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-all relative flex items-center gap-1 cursor-pointer"
          >
            {{ $t('nav.mudanzas') }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          class="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-all relative group"
        >
          {{ $t('nav.embalajes') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <!-- Guardamuebles -->
        <NuxtLink 
          to="/guardamuebles"
          class="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-all relative group"
        >
          {{ $t('nav.guardamuebles') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <!-- Transporte en Frío -->
        <NuxtLink 
          to="/transporte-frio"
          class="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-all relative group"
        >
          {{ $t('nav.transporteFrio') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <!-- Última Milla -->
        <NuxtLink 
          to="/ultima-milla"
          class="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-all relative group"
        >
          {{ $t('nav.ultimaMilla') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <!-- Fletes Construcción -->
        <NuxtLink 
          to="/fletes-construccion"
          class="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-all relative group"
        >
          {{ $t('nav.fletesConstruccion') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <!-- Blog -->
        <NuxtLink 
          to="/blog"
          class="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-all relative group"
        >
          {{ $t('common.blog') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <!-- Comunas RM Dropdown -->
        <div class="relative group">
          <button 
            class="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-all relative flex items-center gap-1"
          >
            Comunas RM
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          class="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-all relative group"
        >
          {{ $t('nav.contacto') }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </NuxtLink>

        <NuxtLink 
          to="/login"
          class="px-4 py-2 rounded-xl border-2 border-teal-600 text-teal-600 font-bold hover:bg-teal-50 transition-all"
        >
          {{ $t('nav.login') }}
        </NuxtLink>
      </div>

      <!-- Mobile Toggle -->
      <button class="md:hidden p-2 rounded-xl bg-slate-100 text-slate-900" @click="isOpen = !isOpen">
        <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-screen"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-screen"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isOpen" class="md:hidden bg-white border-b absolute top-full w-full px-6 py-8 shadow-2xl overflow-hidden">
        <div class="flex flex-col gap-4">
          <div class="text-slate-900 font-black text-lg uppercase tracking-tighter mb-2">
            {{ $t('nav.mudanzas') }}
          </div>
          <NuxtLink to="/mudanzas-santiago" @click="isOpen = false" class="text-teal-700 font-bold text-base pl-4 hover:text-teal-600 transition-all">
            Mudanzas Santiago
          </NuxtLink>
          <NuxtLink v-for="comuna in mudanzasComunas" :key="comuna.slug" :to="`/mudanzas-${comuna.slug}`" @click="isOpen = false" class="text-slate-600 font-bold text-base pl-4 hover:text-teal-600 transition-all">
            Mudanzas {{ comuna.name }}
          </NuxtLink>
          <NuxtLink to="/embalajes" @click="isOpen = false" class="text-slate-900 font-black text-lg uppercase tracking-tighter">
            Embalajes
          </NuxtLink>
          <NuxtLink to="/guardamuebles" @click="isOpen = false" class="text-slate-900 font-black text-lg uppercase tracking-tighter">
            {{ $t('nav.guardamuebles') }}
          </NuxtLink>
          <NuxtLink to="/transporte-frio" @click="isOpen = false" class="text-slate-900 font-black text-lg uppercase tracking-tighter">
            Transporte Frío
          </NuxtLink>
          <NuxtLink to="/ultima-milla" @click="isOpen = false" class="text-slate-900 font-black text-lg uppercase tracking-tighter">
            {{ $t('nav.ultimaMilla') }}
          </NuxtLink>
          <NuxtLink to="/fletes-construccion" @click="isOpen = false" class="text-slate-900 font-black text-lg uppercase tracking-tighter">
            {{ $t('nav.fletesConstruccion') }}
          </NuxtLink>
          <NuxtLink to="/blog" @click="isOpen = false" class="text-slate-900 font-black text-lg uppercase tracking-tighter">
            Blog
          </NuxtLink>
          <NuxtLink to="/contacto" @click="isOpen = false" class="text-slate-900 font-black text-lg uppercase tracking-tighter">
            Contacto
          </NuxtLink>
          <div class="h-px bg-slate-100" />
          <NuxtLink 
            to="/login"
            @click="isOpen = false"
            class="border-2 border-teal-600 text-teal-600 py-3 rounded-xl font-bold text-center"
          >
            {{ $t('nav.login') }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { comunasRM } from '~/config/comunasRM'
import { mudanzasComunas } from '~/config/mudanzasComunas'

defineEmits(['get-quote'])

const scrolled = ref(false)
const isOpen = ref(false)

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



