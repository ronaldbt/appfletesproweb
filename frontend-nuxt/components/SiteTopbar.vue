<template>
  <div class="site-topbar bg-slate-900 text-white">
    <div class="marquee-viewport md:hidden h-full overflow-hidden">
      <div class="marquee-track">
        <div
          v-for="copy in 2"
          :key="copy"
          class="marquee-group"
          :aria-hidden="copy === 2 ? 'true' : undefined"
        >
          <NuxtLink
            :to="cotizarTo"
            class="font-semibold text-white"
            :tabindex="copy === 2 ? -1 : undefined"
            @click="track('topbar_cotizar')"
          >
            {{ $t('topbar.quote') }} · {{ $t('topbar.price') }}
          </NuxtLink>
          <span class="text-slate-600" aria-hidden="true">|</span>
          <p class="inline-flex items-center gap-1.5 font-medium text-slate-100">
            <svg class="shrink-0" width="18" height="12" viewBox="0 0 30 20" aria-hidden="true" focusable="false">
              <rect width="30" height="20" fill="#d52b1e" />
              <rect width="30" height="10" fill="#ffffff" />
              <rect width="10" height="10" fill="#0039a6" />
              <polygon fill="#ffffff" points="5,1.6 6.05,4.55 9.15,4.55 6.64,6.38 7.6,9.35 5,7.55 2.4,9.35 3.36,6.38 0.85,4.55 3.95,4.55" />
            </svg>
            <span>{{ $t('topbar.trust') }}</span>
          </p>
          <span class="text-slate-600" aria-hidden="true">|</span>
          <a
            :href="waHref"
            target="_blank"
            rel="noopener noreferrer"
            class="font-bold text-[#7DFFB3]"
            :tabindex="copy === 2 ? -1 : undefined"
            @click="track('topbar_whatsapp')"
          >
            WhatsApp
          </a>
          <a
            :href="telHref"
            class="font-bold text-white"
            :tabindex="copy === 2 ? -1 : undefined"
            @click="track('topbar_phone')"
          >
            {{ phoneDisplay }}
          </a>
          <span class="text-slate-600" aria-hidden="true">|</span>
          <NuxtLink
            :to="localePath('/fletes-santiago')"
            class="font-semibold text-white"
            :tabindex="copy === 2 ? -1 : undefined"
          >
            {{ $t('topbar.santiago') }}
          </NuxtLink>
          <span class="text-slate-600" aria-hidden="true">|</span>
          <div class="inline-flex items-center gap-1 font-black tracking-widest">
            <button
              v-for="(lang, index) in locales"
              :key="`${copy}-${lang.code}`"
              type="button"
              class="hover:text-white"
              :class="locale === lang.code ? 'text-white' : 'text-slate-400'"
              :tabindex="copy === 2 ? -1 : undefined"
              @click="switchLanguage(lang.code)"
            >
              <span v-if="index > 0" class="text-slate-600 font-normal mr-1">|</span>{{ languageMap[lang.code] || lang.code.toUpperCase() }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="h-full px-4 hidden md:flex items-center justify-center gap-x-3 text-[11px] leading-none whitespace-nowrap overflow-x-auto">
      <NuxtLink
        :to="cotizarTo"
        class="font-semibold text-white hover:text-teal-300"
        @click="track('topbar_cotizar')"
      >
        {{ $t('topbar.quote') }} · {{ $t('topbar.price') }}
      </NuxtLink>
      <span class="text-slate-600" aria-hidden="true">|</span>
      <p class="inline-flex items-center gap-1.5 font-medium text-slate-100">
        <svg class="shrink-0" width="18" height="12" viewBox="0 0 30 20" aria-hidden="true" focusable="false">
          <rect width="30" height="20" fill="#d52b1e" />
          <rect width="30" height="10" fill="#ffffff" />
          <rect width="10" height="10" fill="#0039a6" />
          <polygon fill="#ffffff" points="5,1.6 6.05,4.55 9.15,4.55 6.64,6.38 7.6,9.35 5,7.55 2.4,9.35 3.36,6.38 0.85,4.55 3.95,4.55" />
        </svg>
        <span>{{ $t('topbar.trust') }}</span>
      </p>
      <span class="text-slate-600" aria-hidden="true">|</span>
      <a
        :href="waHref"
        target="_blank"
        rel="noopener noreferrer"
        class="font-bold text-[#7DFFB3] hover:text-white"
        @click="track('topbar_whatsapp')"
      >
        WhatsApp
      </a>
      <a
        :href="telHref"
        class="font-bold text-white hover:text-teal-300"
        @click="track('topbar_phone')"
      >
        {{ phoneDisplay }}
      </a>
      <span class="text-slate-600" aria-hidden="true">|</span>
      <NuxtLink
        :to="localePath('/fletes-santiago')"
        class="font-semibold text-white hover:text-teal-300"
      >
        {{ $t('topbar.santiago') }}
      </NuxtLink>
      <span class="text-slate-600" aria-hidden="true">|</span>
      <div class="inline-flex items-center gap-1 font-black tracking-widest">
        <button
          v-for="(lang, index) in locales"
          :key="`d-${lang.code}`"
          type="button"
          class="hover:text-white"
          :class="locale === lang.code ? 'text-white' : 'text-slate-400'"
          @click="switchLanguage(lang.code)"
        >
          <span v-if="index > 0" class="text-slate-600 font-normal mr-1">|</span>{{ languageMap[lang.code] || lang.code.toUpperCase() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FLETESPRO_CL_PHONE_DISPLAY, FLETESPRO_CL_WHATSAPP } from '~/config/brandEntity'

const { t, locale, locales } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const phoneDisplay = FLETESPRO_CL_PHONE_DISPLAY
const telHref = `tel:+${FLETESPRO_CL_WHATSAPP}`
const waHref = computed(() => `https://wa.me/${FLETESPRO_CL_WHATSAPP}?text=${encodeURIComponent(t('topbar.waMessage'))}`)
const cotizarTo = computed(() => `${localePath('/')}#hero-calculator`)

const languageMap = { es: 'ES', en: 'EN' }

function track (name) {
  if (!import.meta.client) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: name,
    event_category: 'topbar',
    page_path: route.path
  })
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, {
      event_category: 'topbar',
      page_path: route.path
    })
  }
}

function switchLanguage (langCode) {
  const localeCodes = ['es', 'en']
  const pathSegments = route.path.split('/').filter(Boolean)
  const pathWithoutLocale = localeCodes.includes(pathSegments[0])
    ? `/${pathSegments.slice(1).join('/')}`
    : route.path
  const targetPath = !pathWithoutLocale || pathWithoutLocale === '/' ? '/' : pathWithoutLocale
  const newPath = langCode === 'es'
    ? targetPath
    : `/${langCode}${targetPath === '/' ? '' : targetPath}`
  navigateTo(newPath)
}
</script>

<style scoped>
.site-topbar {
  height: 36px;
  min-height: 36px;
  max-height: 36px;
}

.marquee-track {
  display: flex;
  width: max-content;
  height: 100%;
  align-items: center;
  animation: topbar-marquee 28s linear infinite;
}

.marquee-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 100%;
  padding-right: 0.75rem;
  font-size: 11px;
  line-height: 1;
  white-space: nowrap;
}

.marquee-viewport:active .marquee-track {
  animation-play-state: paused;
}

@keyframes topbar-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
  .marquee-group:last-child {
    display: none;
  }
  .marquee-viewport {
    overflow-x: auto;
  }
}
</style>
