<template>
  <a 
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-50 group"
    :class="{ 'animate-float-up': !isHovered, 'animate-float-down': isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Botón principal con colores teal/slate -->
    <div class="bg-gradient-to-br from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white rounded-2xl shadow-[0_20px_50px_rgba(13,148,136,0.4)] hover:shadow-[0_25px_60px_rgba(13,148,136,0.6)] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center px-5 py-3.5 space-x-3 border-2 border-teal-400/30 hover:border-teal-300/50 relative overflow-hidden">
      <!-- Efecto de brillo animado en el fondo -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <!-- Indicador de estado online -->
      <div class="relative">
        <span class="absolute -top-0.5 -right-0.5 w-3 h-3 bg-teal-300 rounded-full border-2 border-white shadow-[0_0_8px_#14b8a6] animate-pulse"></span>
        <span class="absolute -top-0.5 -right-0.5 w-3 h-3 bg-teal-300 rounded-full animate-ping opacity-75"></span>
      </div>
      
      <!-- Texto "Asistente en línea" -->
      <span class="font-bold text-sm whitespace-nowrap relative z-10">{{ assistantText }}</span>
      
      <!-- Ícono de WhatsApp con animación -->
      <div class="relative z-10">
        <svg 
          class="w-7 h-7 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        
        <!-- Pulso de animación alrededor del ícono -->
        <span class="absolute inset-0 rounded-full bg-teal-400/50 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </div>
      
      <!-- Tooltip mejorado -->
      <div class="absolute bottom-full right-0 mb-3 w-max px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0 shadow-xl border border-slate-700">
        {{ tooltipText }}
        <!-- Flecha del tooltip -->
        <div class="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  </a>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const { t, locale } = useI18n()
const { $i18n } = useNuxtApp()
const isHovered = ref(false)

// Textos traducidos usando computed para reactividad
const assistantText = computed(() => {
  // Forzar reactividad usando locale.value
  const currentLocale = locale.value
  const messages = $i18n?.messages?.value?.[currentLocale]
  
  // Intentar obtener la traducción directamente del objeto messages
  if (messages?.common?.onlineAssistant) {
    return messages.common.onlineAssistant
  }
  
  // Intentar usando t()
  const translation = t('common.onlineAssistant')
  
  // Si devuelve la clave, usar fallback
  if (translation === 'common.onlineAssistant' || !translation) {
    return currentLocale === 'es' ? 'Asistente en línea' :
           currentLocale === 'en' ? 'Online Assistant' :
           currentLocale === 'sv' ? 'Online Assistent' :
           currentLocale === 'ru' ? 'Онлайн-помощник' : 'Asistente en línea'
  }
  
  return translation
})

const tooltipText = computed(() => {
  // Forzar reactividad usando locale.value
  const currentLocale = locale.value
  const messages = $i18n?.messages?.value?.[currentLocale]
  
  // Intentar obtener la traducción directamente del objeto messages
  if (messages?.common?.onlineAssistantTooltip) {
    return messages.common.onlineAssistantTooltip
  }
  
  // Intentar usando t()
  const translation = t('common.onlineAssistantTooltip')
  
  // Si devuelve la clave, usar fallback
  if (translation === 'common.onlineAssistantTooltip' || !translation) {
    return currentLocale === 'es' ? '¿Necesitas ayuda? Escríbenos por WhatsApp' :
           currentLocale === 'en' ? 'Need help? Write to us on WhatsApp' :
           currentLocale === 'sv' ? 'Behöver du hjälp? Skriv till oss på WhatsApp' :
           currentLocale === 'ru' ? 'Нужна помощь? Напишите нам в WhatsApp' : '¿Necesitas ayuda? Escríbenos por WhatsApp'
  }
  
  return translation
})

// Número de WhatsApp para soporte con mensaje traducido
const whatsappUrl = computed(() => {
  // Forzar reactividad usando locale.value
  const currentLocale = locale.value
  const message = tooltipText.value
  return `https://wa.me/56979796841?text=${encodeURIComponent(message)}`
})

// Watch locale changes para reactividad
watch(locale, () => {
  // El computed se recalculará automáticamente cuando cambie el locale
}, { immediate: true })
</script>

<style scoped>
/* Animación de flotación hacia arriba */
@keyframes float-up {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

/* Animación de flotación hacia abajo (más sutil cuando está hover) */
@keyframes float-down {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

.animate-float-up {
  animation: float-up 4s ease-in-out infinite;
}

.animate-float-down {
  animation: float-down 3s ease-in-out infinite;
}

/* Animación de pulso mejorada */
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Asegurar que las animaciones funcionen suavemente */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
