import { listTestimonios } from '../../utils/testimoniosStorage'

/** Lista todos los comentarios (panel admin). Misma protección que el resto del dashboard: solo uso interno. */
export default defineEventHandler(async () => {
  const items = await listTestimonios()
  return { ok: true, items }
})
