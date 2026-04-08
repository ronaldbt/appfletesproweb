<template>
  <section
    v-if="to && comunaLabel"
    class="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white border-t border-teal-500/20"
  >
    <div class="container mx-auto px-4 max-w-4xl">
      <div class="rounded-[2rem] border border-teal-500/30 bg-white/[0.04] backdrop-blur-sm p-8 md:p-12 shadow-2xl shadow-teal-900/20">
        <h2 class="text-2xl md:text-3xl font-black tracking-tight mb-4 text-white">
          {{ $t('components.fletesBodegajeCta.title') }}
        </h2>
        <p class="text-lg text-slate-300 font-medium leading-relaxed mb-8">
          {{ $t('components.fletesBodegajeCta.body', { comuna: comunaLabel }) }}
        </p>
        <NuxtLink
          :to="to"
          class="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm uppercase tracking-widest px-8 py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-500/25"
        >
          {{ $t('components.fletesBodegajeCta.button') }}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  comunaLabel: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
})
</script>
