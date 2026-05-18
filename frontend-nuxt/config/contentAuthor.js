/** Autoría editorial (blog) y marca editorial (E-E-A-T). */
export const BLOG_AUTHOR_NAME = 'Ronald Bravo'
export const BLOG_PUBLISHER_NAME = 'FletesPro'
export const BLOG_AUTHOR_PROFILE_PATH = '/empresa-fletes-santiago'

export function blogAuthorProfileUrl (siteUrl = 'https://fletespro.cl') {
  return `${siteUrl}${BLOG_AUTHOR_PROFILE_PATH}`
}
