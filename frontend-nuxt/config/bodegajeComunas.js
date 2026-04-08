/**
 * Landings /bodegaje/[slug] y enlaces cruzados desde /fletes-*.
 * fletePaths: rutas sin prefijo /en (i18n); en inglés son /en/fletes-...
 */
export const bodegajeComunasLanding = [
  { slug: 'las-condes', comunaLabel: 'Las Condes', fletePaths: ['/fletes-las-condes'] },
  { slug: 'providencia', comunaLabel: 'Providencia', fletePaths: ['/fletes-providencia'] },
  { slug: 'vitacura', comunaLabel: 'Vitacura', fletePaths: ['/fletes-vitacura'] },
  { slug: 'nunoa', comunaLabel: 'Ñuñoa', fletePaths: ['/fletes-en-nunoa'] },
  { slug: 'lo-barnechea', comunaLabel: 'Lo Barnechea', fletePaths: ['/fletes-lo-barnechea'] },
  { slug: 'maipu', comunaLabel: 'Maipú', fletePaths: ['/fletes-maipu', '/fletes-en-maipu'] },
  { slug: 'la-florida', comunaLabel: 'La Florida', fletePaths: ['/fletes-la-florida'] },
  { slug: 'san-miguel', comunaLabel: 'San Miguel', fletePaths: ['/fletes-san-miguel'] },
  { slug: 'puente-alto', comunaLabel: 'Puente Alto', fletePaths: ['/fletes-puente-alto'] },
  {
    slug: 'santiago-centro',
    comunaLabel: 'Santiago Centro',
    fletePaths: [
      '/fletes-estacion-central',
      '/fletes-santiago',
      '/fletes-independencia',
      '/fletes-quinta-normal',
      '/fletes-recoleta',
      '/fletes-cerrillos',
      '/fletes-lo-prado',
      '/fletes-renca'
    ]
  }
]

/** path normalizado → slug bodegaje o null */
const fletePathToBodegajeSlug = new Map()
for (const row of bodegajeComunasLanding) {
  for (const p of row.fletePaths) {
    fletePathToBodegajeSlug.set(p, row.slug)
  }
}

export function normalizeRoutePathForLocale (path) {
  if (!path) {
    return '/'
  }
  if (path === '/en') {
    return '/'
  }
  if (path.startsWith('/en/')) {
    return `/${path.slice(4)}`
  }
  return path
}

export function getBodegajeSlugForFletePath (path) {
  const n = normalizeRoutePathForLocale(path)
  return fletePathToBodegajeSlug.get(n) || null
}

export function getBodegajeComunaBySlug (slug) {
  return bodegajeComunasLanding.find(c => c.slug === slug) || null
}

export const bodegajePrerenderSlugs = bodegajeComunasLanding.map(c => c.slug)

export default bodegajeComunasLanding
