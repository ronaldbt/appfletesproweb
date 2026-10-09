const SPANISH_ONLY = ['/transporte-frio', '/transporte-en-frio-santiago']

export const useHreflang = () => {
  const route = useRoute()
  const siteUrl = 'https://fletespro.cl'

  const getAlternateLinks = () => {
    const links = []
    const pathWithoutLocale = route.path.replace(/^\/(es|en|sv|ru)/, '') || '/'
    const basePath = pathWithoutLocale === '' ? '/' : pathWithoutLocale
    const spanishUrl = `${siteUrl}${basePath === '/' ? '' : basePath}`
    const spanishOnly = SPANISH_ONLY.some((path) => basePath === path || basePath.startsWith(`${path}/`))

    links.push({ rel: 'alternate', hreflang: 'es-CL', href: spanishUrl, key: 'hreflang-es-CL' })
    links.push({ rel: 'alternate', hreflang: 'x-default', href: spanishUrl, key: 'hreflang-x-default' })

    if (!spanishOnly) {
      const enPath = `/en${basePath === '/' ? '' : basePath}`
      links.push({
        rel: 'alternate',
        hreflang: 'en',
        href: `${siteUrl}${enPath}`,
        key: 'hreflang-en'
      })
    }

    return links
  }
  
  return {
    getAlternateLinks
  }
}

