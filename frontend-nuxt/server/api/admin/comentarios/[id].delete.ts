import { deleteTestimonio } from '../../../utils/testimoniosStorage'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Falta id' })
  }
  const ok = await deleteTestimonio(id)
  if (!ok) {
    throw createError({ statusCode: 404, statusMessage: 'No encontrado' })
  }
  return { ok: true }
})
