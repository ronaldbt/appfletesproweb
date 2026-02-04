<template>
  <nav v-if="linksWithIds.length > 0" class="bg-slate-50 rounded-2xl p-6 mb-12 border border-slate-100">
    <h2 class="text-lg font-black text-slate-900 mb-4 uppercase tracking-wider">
      Tabla de contenidos
    </h2>
    <ol class="space-y-2 list-decimal list-inside">
      <li
        v-for="(link, index) in linksWithIds"
        :key="index"
        class="text-slate-600 hover:text-teal-600 transition-colors"
      >
        <NuxtLink
          :to="`#${link.id}`"
          class="font-medium hover:underline"
        >
          {{ link.title }}
        </NuxtLink>
      </li>
      <li class="text-slate-600 hover:text-teal-600 transition-colors">
        <NuxtLink to="/contacto" class="font-medium hover:underline">
          Contacto
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const props = defineProps({
  links: {
    type: Array,
    default: () => []
  }
})

// Función para generar id desde título (slug) - debe coincidir con Nuxt Content
function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const linksWithIds = computed(() => 
  props.links.map(link => {
    const title = typeof link === 'string' ? link : link.title
    const id = (typeof link === 'object' && link.id) ? link.id : slugify(title)
    return { title, id }
  })
)
</script>
