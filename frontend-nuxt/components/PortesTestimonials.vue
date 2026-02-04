<template>
  <section id="testimonios" class="py-24 bg-slate-50 overflow-hidden">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-extrabold text-slate-900 text-center mb-16">{{ $t('components.testimonials.title') }}</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(t, i) in testimonials"
          :key="i"
          class="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white relative"
        >
          <div class="flex gap-1 mb-4">
            <svg v-for="j in t.rating" :key="j" class="w-5 h-5 fill-teal-400 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p class="text-slate-600 mb-6 italic leading-relaxed">"{{ t.content }}"</p>
          <div>
            <p class="font-black text-slate-900">{{ t.name }}</p>
            <p class="text-sm text-teal-600 font-bold uppercase tracking-wider">{{ t.role }}</p>
          </div>
          <div class="absolute top-8 right-8 opacity-10">
            <span class="text-6xl font-serif text-teal-900">"</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, watch } from 'vue'

const { t, locale } = useI18n()

console.log('🟢 [PortesTestimonials] Locale actual:', locale.value)
console.log('🟢 [PortesTestimonials] Traducción test:', t('components.testimonials.title'))

// Watch locale changes - con lazy: false, las traducciones están disponibles inmediatamente
watch(locale, (newLocale) => {
  console.log('🟢 [PortesTestimonials] Locale cambió a:', newLocale)
  console.log('🟢 [PortesTestimonials] Test translation después de cambio:', t('components.testimonials.title'))
}, { immediate: true })

const testimonials = computed(() => {
  const currentLocale = locale.value
  console.log('🟢 [PortesTestimonials] Computed recalculando, locale:', currentLocale)
  
  return [
    {
      name: t('components.testimonials.testimonial1.name'),
      role: t('components.testimonials.testimonial1.role'),
      content: t('components.testimonials.testimonial1.content'),
      rating: 5
    },
    {
      name: t('components.testimonials.testimonial2.name'),
      role: t('components.testimonials.testimonial2.role'),
      content: t('components.testimonials.testimonial2.content'),
      rating: 5
    },
    {
      name: t('components.testimonials.testimonial3.name'),
      role: t('components.testimonials.testimonial3.role'),
      content: t('components.testimonials.testimonial3.content'),
      rating: 5
    }
  ]
})
</script>



