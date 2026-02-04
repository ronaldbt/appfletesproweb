<template>
  <section class="py-24 bg-slate-950 relative overflow-hidden">
    <div class="absolute inset-0 bg-teal-600/5 -skew-y-3 origin-center scale-110" />
    <div class="container mx-auto px-4 relative z-10">
      <div class="grid lg:grid-cols-3 gap-12 items-center">
        
        <div class="lg:col-span-2">
          <h2 class="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
            {{ $t('components.quality.title') }} <br />
            <span class="text-teal-400">{{ $t('components.quality.titleHighlight') }}</span>
          </h2>
          <div class="grid sm:grid-cols-2 gap-8">
            <div class="flex gap-4">
              <div class="bg-teal-500/10 p-3 rounded-xl h-fit">
                <svg class="text-teal-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 class="text-white font-bold mb-2">{{ $t('components.quality.insuranceTitle') }}</h4>
                <p class="text-slate-400 text-sm leading-relaxed">{{ $t('components.quality.insuranceDesc') }}</p>
              </div>
            </div>
            <div class="flex gap-4">
              <div class="bg-teal-500/10 p-3 rounded-xl h-fit">
                <svg class="text-teal-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 class="text-white font-bold mb-2">{{ $t('components.quality.digitalTitle') }}</h4>
                <p class="text-slate-400 text-sm leading-relaxed">{{ $t('components.quality.digitalDesc') }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-12 rounded-[3rem] shadow-2xl relative">
          <svg class="text-teal-600 mb-6 w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 class="text-2xl font-black text-slate-950 mb-4 tracking-tight">{{ $t('components.quality.artisanTitle') }}</h3>
          <p class="text-slate-600 mb-8 font-medium leading-relaxed">
            {{ $t('components.quality.artisanDesc') }}
          </p>
          <button class="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-600 transition-colors">
            {{ $t('components.quality.ctaButton') }}
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
</script>



