<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <Breadcrumbs />

      <!-- Hero Section -->
      <section class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              Contacta con Nosotros
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              Contacto
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              Solicita presupuesto gratis para mudanzas baratas, mudanzas económicas y servicio de mudanza en Santiago y Región Metropolitana
            </p>
          </div>
        </div>
      </section>

      <!-- Formulario de contacto (redirige a WhatsApp) -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-3xl font-black text-slate-900 mb-2 text-center">Escríbenos por WhatsApp</h2>
            <p class="text-slate-500 text-center mb-10">Completa el formulario y se abrirá WhatsApp con tu mensaje. Te respondemos a la brevedad.</p>
            <form @submit.prevent="enviarWhatsApp" class="bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-6">
              <label class="block">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre</span>
                <input v-model="form.nombre" type="text" required placeholder="Tu nombre" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none" />
              </label>
              <label class="block">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Teléfono (WhatsApp)</span>
                <input v-model="form.telefono" type="tel" required placeholder="+56 9 1234 5678" class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none" />
              </label>
              <label class="block">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Mensaje</span>
                <textarea v-model="form.mensaje" rows="4" required placeholder="Cuéntanos qué necesitas: flete, mudanza, presupuesto..." class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none resize-none"></textarea>
              </label>
              <button type="submit" class="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Abrir WhatsApp y enviar
              </button>
            </form>
            <p class="text-center text-slate-500 text-sm mt-6">También nos puedes llamar: <a href="tel:+56979796841" class="text-teal-600 font-bold hover:underline">+56 9 7979 6841</a></p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.05] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
              ¿Necesitas Presupuesto?
            </h2>
            <p class="text-xl text-slate-300 mb-12 font-medium">
              Escríbenos por WhatsApp y te respondemos al instante con una cotización
            </p>
            <a
              :href="whatsappUrl('Hola, quiero solicitar un presupuesto. Me gustaría recibir más información.')"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <!-- SEO Content Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto prose prose-slate max-w-none">
            <h2 class="text-3xl font-black text-slate-900 mb-6">Contacta con FletesPro - Empresa de Mudanzas Profesionales</h2>
            <div class="text-slate-600 leading-relaxed space-y-4">
              <p>FletesPro es una empresa de mudanzas profesionales especializada en mudanzas baratas, mudanzas económicas y servicio de mudanza en Santiago y Región Metropolitana. Ofrecemos presupuesto mudanza gratis y cotizar mudanza online para particulares y empresas.</p>
              <p>Nuestro servicio de mudanza incluye mudanzas particulares, mudanzas empresas, mudanzas oficinas, mudanzas internacionales y mudanzas urgentes. También proporcionamos embalajes profesionales, guardamuebles y transporte en frío.</p>
              <p>Contacta con nuestra empresa de mudanzas para obtener un presupuesto mudanza personalizado. Ofrecemos mudanzas baratas, mudanzas económicas y servicio de mudanza con la máxima calidad. Solicita presupuesto mudanza gratis sin compromiso.</p>
            </div>
          </div>
        </div>
      </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const lang = ref('es')
const WHATSAPP_NUMERO = '56979796841'

const form = ref({
  nombre: '',
  telefono: '',
  mensaje: ''
})

function whatsappUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(text)}`
}

function enviarWhatsApp() {
  const msg = `*Contacto FletesPro*\nNombre: ${form.value.nombre}\nTeléfono: ${form.value.telefono}\n\nMensaje:\n${form.value.mensaje}`
  window.open(whatsappUrl(msg), '_blank', 'noopener')
}

// SEO Meta Tags
const siteUrl = 'https://fletespro.cl'
const currentUrl = `${siteUrl}/contacto`
const defaultImage = `${siteUrl}/og-image.jpg`

useHead({
  title: 'Contacto - Mudanzas Santiago | Presupuesto Gratis | FletesPro',
  meta: [
    {
      name: 'description',
      content: 'Contacta con FletesPro para mudanzas baratas, mudanzas económicas y servicio de mudanza en Santiago. Solicita presupuesto gratis y cotiza tu mudanza online.'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: 'Contacto - Mudanzas Baratas Santiago | FletesPro' },
    { property: 'og:description', content: 'Contacta con FletesPro para mudanzas baratas, mudanzas económicas y servicio de mudanza en Santiago. Solicita presupuesto gratis y cotiza tu mudanza online.' },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'FletesPro' },
    { property: 'og:locale', content: 'es_ES' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: 'Contacto - Mudanzas Baratas Santiago | FletesPro' },
    { name: 'twitter:description', content: 'Contacta con FletesPro para mudanzas baratas, mudanzas económicas y servicio de mudanza en Santiago.' },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [
    { rel: 'canonical', href: currentUrl }
  ]
})
</script>

