/** Entidad de marca FletesPro (CL) ↔ PortesPro (ES) para schema.org sameAs y E-E-A-T. */
export const FLETESPRO_CL_URL = 'https://fletespro.cl'
export const PORTESPRO_ES_URL = 'https://portespro.es'

export const FOUNDER_NAME = 'Ronald Bravo'
export const FOUNDER_JOB_TITLE = 'Fundador y coordinador de operaciones'
export const FOUNDER_PHOTO_PATH = '/equipo/ronald-bravo.webp'
export const FOUNDER_PROFILE_PATH = '/empresa-fletes-santiago'

export function founderPhotoUrl (siteUrl = FLETESPRO_CL_URL) {
  return `${String(siteUrl).replace(/\/$/, '')}${FOUNDER_PHOTO_PATH}`
}

export function founderProfileUrl (siteUrl = FLETESPRO_CL_URL) {
  return `${String(siteUrl).replace(/\/$/, '')}${FOUNDER_PROFILE_PATH}`
}

/** sameAs en sitio Chile: hermana España (+ perfiles sociales si se añaden). */
export function fletesProSameAs () {
  return [PORTESPRO_ES_URL]
}

/** sameAs en sitio España: hermana Chile. */
export function portesProSameAs () {
  return [
    FLETESPRO_CL_URL,
    `${FLETESPRO_CL_URL}${FOUNDER_PROFILE_PATH}`
  ]
}

export function fletesProFounderSchema (siteUrl = FLETESPRO_CL_URL) {
  const base = String(siteUrl).replace(/\/$/, '')
  return {
    '@type': 'Person',
    '@id': `${base}/#founder-ronald-bravo`,
    name: FOUNDER_NAME,
    jobTitle: FOUNDER_JOB_TITLE,
    url: founderProfileUrl(base),
    image: founderPhotoUrl(base),
    worksFor: {
      '@type': 'Organization',
      '@id': `${base}/#fletespro`,
      name: 'FletesPro',
      url: base
    },
    description: 'Ingeniero informático, fundador de FletesPro y coordinador operativo en Santiago'
  }
}
