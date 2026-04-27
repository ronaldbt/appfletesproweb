import { listTestimonios } from '../utils/testimoniosStorage'

export default defineEventHandler(async () => {
  const rows = await listTestimonios()
  return { ok: true, items: rows }
})
