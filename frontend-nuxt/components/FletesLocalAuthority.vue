<template>
  <section class="py-16 md:py-20 bg-white border-t border-slate-100" aria-labelledby="local-authority-heading">
    <div class="container mx-auto px-4 max-w-5xl">
      <div class="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <figure class="order-2 md:order-1 rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-50">
          <img
            :src="imageSrc"
            :alt="imageAlt"
            width="800"
            height="533"
            class="w-full h-auto object-cover"
            loading="lazy"
          />
          <figcaption class="sr-only">{{ imageAlt }}</figcaption>
        </figure>
        <div class="order-1 md:order-2">
          <p class="text-[10px] font-black uppercase tracking-[0.25em] text-teal-600 mb-3">{{ eyebrow }}</p>
          <h2 id="local-authority-heading" class="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">
            {{ title }}
          </h2>
          <div class="flex items-start gap-4 mb-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div class="w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-teal-100 bg-teal-600 shadow-sm">
              <img
                v-if="showManagerPhoto"
                :src="managerPhotoSrcResolved"
                :alt="`${managerName}, ${managerRole}`"
                width="64"
                height="64"
                class="w-full h-full object-cover"
                loading="lazy"
                @error="photoLoadFailed = true"
              />
              <div
                v-else
                class="w-full h-full text-white flex items-center justify-center font-black text-lg"
                aria-hidden="true"
              >
                {{ managerInitials }}
              </div>
            </div>
            <div>
              <p class="font-black text-slate-900">{{ managerName }}</p>
              <p class="text-sm text-teal-700 font-bold">{{ managerRole }}</p>
            </div>
          </div>
          <p class="text-slate-600 leading-relaxed font-medium">{{ history }}</p>
          <p v-if="extra" class="mt-4 text-slate-600 leading-relaxed text-sm">{{ extra }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  managerName: { type: String, default: '' },
  managerRole: { type: String, default: '' },
  history: { type: String, default: '' },
  extra: { type: String, default: '' },
  imageSrc: { type: String, default: '/ejemplo-flete-sencillo.webp' },
  imageAlt: { type: String, default: '' },
  managerPhotoSrc: { type: String, default: '' }
})

const { t } = useI18n()

const photoLoadFailed = ref(false)

const title = computed(() => props.title || t('components.localAuthority.title'))
const eyebrow = computed(() => props.eyebrow || t('components.localAuthority.eyebrow'))
const managerName = computed(() => props.managerName || t('components.localAuthority.managerName'))
const managerRole = computed(() => props.managerRole || t('components.localAuthority.managerRole'))
const history = computed(() => props.history || t('components.localAuthority.history'))
const imageAlt = computed(() => props.imageAlt || t('components.localAuthority.imageAlt'))

const managerPhotoSrcResolved = computed(() => props.managerPhotoSrc || '')

const showManagerPhoto = computed(
  () => Boolean(managerPhotoSrcResolved.value) && !photoLoadFailed.value
)

const managerInitials = computed(() => {
  const parts = managerName.value.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  return (parts[0]?.[0] || 'F').toUpperCase()
})
</script>
