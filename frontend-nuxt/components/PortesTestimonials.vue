<template>
  <section id="testimonios" class="py-24 bg-slate-50 overflow-hidden">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-extrabold text-slate-900 text-center mb-12">{{ $t('components.testimonials.title') }}</h2>

      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div
          v-for="(t, i) in testimonials"
          :key="'s-' + i"
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

      <div v-if="userItems.length" class="mb-16">
        <h3 class="text-2xl font-black text-slate-900 text-center mb-8">{{ $t('components.testimonials.sectionUserTitle') }}</h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="u in userItems"
            :key="u.id"
            class="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 relative"
          >
            <div class="flex gap-0.5 mb-3">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                class="w-5 h-5 pointer-events-none"
                :class="star <= u.stars ? 'text-teal-400' : 'text-slate-200'"
                aria-hidden="true"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </button>
            </div>
            <p class="text-slate-600 text-sm mb-4 leading-relaxed">"{{ u.comment }}"</p>
            <p class="font-bold text-slate-900">{{ u.name }}</p>
            <p v-if="u.roleLabel" class="text-xs text-teal-600 font-bold uppercase tracking-wide mt-0.5">{{ u.roleLabel }}</p>
          </div>
        </div>
      </div>

      <div class="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
        <h3 class="text-xl font-black text-slate-900 text-center mb-2">{{ $t('components.testimonials.leaveCommentTitle') }}</h3>
        <p class="text-sm text-slate-500 text-center mb-6">{{ $t('components.testimonials.leaveCommentHint') }}</p>

        <div v-if="sentOk" class="rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-center font-bold py-4 px-4 text-sm">
          {{ $t('components.testimonials.thankYou') }}
        </div>

        <form v-else class="space-y-5" @submit.prevent="submitComment">
          <div>
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{{ $t('components.testimonials.starsLabel') }}</p>
            <div class="flex gap-1 justify-center">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                class="p-1 rounded-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-teal-500"
                :aria-pressed="formStars >= star"
                :aria-label="`${star} estrellas`"
                @click="formStars = star"
              >
                <svg
                  class="w-9 h-9"
                  :class="formStars >= star ? 'fill-teal-400 text-teal-400' : 'fill-slate-200 text-slate-200'"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            </div>
          </div>

          <label class="block">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ $t('components.testimonials.yourName') }}</span>
            <input
              v-model="formName"
              type="text"
              maxlength="80"
              required
              class="mt-1 w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-medium focus:border-teal-500 focus:bg-white outline-none"
            />
          </label>

          <label class="block">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ $t('components.testimonials.yourService') }}</span>
            <input
              v-model="formRole"
              type="text"
              maxlength="120"
              :placeholder="$t('components.testimonials.yourServicePlaceholder')"
              class="mt-1 w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-medium focus:border-teal-500 focus:bg-white outline-none"
            />
          </label>

          <label class="block">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ $t('components.testimonials.commentLabel') }}</span>
            <textarea
              v-model="formComment"
              required
              rows="4"
              maxlength="2000"
              :placeholder="$t('components.testimonials.commentPlaceholder')"
              class="mt-1 w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-medium focus:border-teal-500 focus:bg-white outline-none resize-y min-h-[100px]"
            />
          </label>

          <p v-if="formError" class="text-sm text-red-600 font-medium text-center">{{ formError }}</p>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg shadow-teal-500/30 transition-colors"
          >
            {{ submitting ? $t('components.testimonials.submitting') : $t('components.testimonials.submit') }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const { t, locale } = useI18n()

const userItems = ref([])
const formStars = ref(5)
const formName = ref('')
const formRole = ref('')
const formComment = ref('')
const submitting = ref(false)
const sentOk = ref(false)
const formError = ref('')

async function loadUserTestimonials() {
  try {
    const res = await fetch('/api/testimonios')
    const data = await res.json()
    if (data?.items && Array.isArray(data.items)) {
      userItems.value = data.items
    }
  } catch {
    userItems.value = []
  }
}

onMounted(() => {
  loadUserTestimonials()
})

watch(locale, () => {
  loadUserTestimonials()
})

const testimonials = computed(() => [
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
])

async function submitComment() {
  formError.value = ''
  if (formStars.value < 1 || formStars.value > 5) {
    formError.value = t('components.testimonials.errorSend')
    return
  }
  submitting.value = true
  try {
    const res = await fetch('/api/testimonios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stars: formStars.value,
        name: formName.value,
        roleLabel: formRole.value,
        comment: formComment.value
      })
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      formError.value = data?.statusMessage || data?.message || t('components.testimonials.errorSend')
      return
    }
    sentOk.value = true
    formName.value = ''
    formRole.value = ''
    formComment.value = ''
    formStars.value = 5
    await loadUserTestimonials()
  } catch {
    formError.value = t('components.testimonials.errorSend')
  } finally {
    submitting.value = false
  }
}
</script>
