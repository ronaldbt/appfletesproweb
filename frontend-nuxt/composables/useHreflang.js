export const useHreflang = () => {
  const { locale, locales } = useI18n()
  const route = useRoute()
  const siteUrl = 'https://portespro.es'
  
  const getAlternateLinks = () => {
    const links = []
    const currentPath = route.path
    
    // Obtener la ruta base sin el locale
    const pathWithoutLocale = currentPath.replace(/^\/(es|en|sv|ru)/, '') || '/'
    
    locales.value.forEach((loc) => {
      const localePath = loc.code === 'es' ? pathWithoutLocale : `/${loc.code}${pathWithoutLocale}`
      const fullUrl = `${siteUrl}${localePath === '/' ? '' : localePath}`
      
      links.push({
        rel: 'alternate',
        hreflang: loc.iso || loc.code,
        href: fullUrl
      })
      
      // Agregar x-default para el idioma por defecto
      if (loc.code === 'es') {
        links.push({
          rel: 'alternate',
          hreflang: 'x-default',
          href: fullUrl
        })
      }
    })
    
    return links
  }
  
  return {
    getAlternateLinks
  }
}

