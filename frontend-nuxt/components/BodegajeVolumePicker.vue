<template>
  <section class="mb-10 md:mb-14" aria-labelledby="bodegaje-volume-picker-title">
    <h2
      id="bodegaje-volume-picker-title"
      class="text-center text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-6 md:mb-8 px-2"
    >
      {{ $t('pages.guardamuebles.volumePicker.title') }}
    </h2>

    <div class="relative">
      <div
        class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin px-1 -mx-1 md:mx-0 md:px-0 md:justify-center md:flex-wrap md:overflow-visible"
        style="scrollbar-width: thin;"
      >
        <article
          v-for="opt in volumeOptions"
          :key="opt.m3 === null ? 'help' : opt.m3"
          class="flex-shrink-0 w-[min(100%,260px)] snap-center rounded-2xl border border-slate-200 bg-white p-5 shadow-md hover:shadow-xl hover:border-teal-300 transition-all flex flex-col"
        >
          <template v-if="opt.m3 !== null">
            <h3 class="text-lg font-black text-slate-900 mb-1">
              {{ $t('pages.guardamuebles.volumePicker.volumeTitle', { n: opt.m3 }) }}
            </h3>
            <p class="text-sm text-slate-600 font-medium mb-4 flex-1 leading-snug">
              {{ $t(`pages.guardamuebles.volumePicker.hint${opt.m3}`) }}
            </p>
            <div class="mb-4 h-20 flex items-center justify-center text-slate-400" aria-hidden="true" v-html="opt.iconSvg" />
          </template>
          <template v-else>
            <div class="text-3xl mb-2" aria-hidden="true">🧐</div>
            <h3 class="text-lg font-black text-slate-900 mb-2">
              {{ $t('pages.guardamuebles.volumePicker.helpTitle') }}
            </h3>
            <p class="text-sm text-slate-600 font-medium mb-4 flex-1">
              {{ $t('pages.guardamuebles.volumePicker.helpSubtitle') }}
            </p>
          </template>
          <button
            type="button"
            class="mt-auto w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-black uppercase tracking-widest transition-colors"
            @click="onSelect(opt.m3)"
          >
            {{ $t('pages.guardamuebles.volumePicker.select') }}
          </button>
        </article>
      </div>
    </div>

    <p class="text-center text-xs text-slate-500 mt-2 max-w-2xl mx-auto">
      {{ $t('pages.guardamuebles.volumePicker.note') }}
    </p>
  </section>
</template>

<script setup>
const emit = defineEmits(['select-volume'])

const volumeOptions = [
  {
    m3: 1,
    iconSvg: '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>'
  },
  {
    m3: 3,
    iconSvg: '<svg class="w-20 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>'
  },
  {
    m3: 6,
    iconSvg: '<svg class="w-20 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>'
  },
  {
    m3: 12,
    iconSvg: '<svg class="w-20 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>'
  },
  { m3: null, iconSvg: '' }
]

function onSelect (m3) {
  emit('select-volume', m3)
  if (process.client) {
    requestAnimationFrame(() => {
      document.getElementById('bodegaje-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
}
</script>
