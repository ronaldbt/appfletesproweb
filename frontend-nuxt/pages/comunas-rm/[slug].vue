<template>
  <div />
</template>

<script setup>
/**
 * Redirección 301: /comunas-rm/:slug → /fletes-:slug
 * Las URLs de fletes por comuna son ahora /fletes-las-condes, etc.
 */
const route = useRoute()
const slug = route.params.slug
if (slug && typeof slug === 'string') {
  await navigateTo(`/fletes-${slug}`, { redirectCode: 301 })
}
</script>
