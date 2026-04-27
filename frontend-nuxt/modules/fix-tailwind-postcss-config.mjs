import { join } from 'node:path'
import { defineNuxtModule } from '@nuxt/kit'

// Workaround nuxt-modules/tailwindcss#1031 (postcss.mjs + jiti + import.meta en build).
export default defineNuxtModule({
  meta: { name: 'fix-tailwind-postcss-config' },
  setup(_options, nuxt) {
    nuxt.hook('modules:done', () => {
      const postcssOpts =
        nuxt.options.postcss ||
        nuxt.options.build?.postcss?.postcssOptions ||
        nuxt.options.build?.postcss
      const plugins = postcssOpts?.plugins
      const tw = plugins?.tailwindcss
      if (typeof tw === 'string' && tw.includes('tailwind/postcss.mjs')) {
        plugins.tailwindcss = join(nuxt.options.rootDir, 'tailwind.config.js')
      }
    })
  }
})
