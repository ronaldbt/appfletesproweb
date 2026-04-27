import { addTestimonio } from '../utils/testimoniosStorage'

function clampStr(s: unknown, max: number): string {
  if (typeof s !== 'string') return ''
  return s.trim().slice(0, max)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    stars?: number
    comment?: string
    name?: string
    roleLabel?: string
  }>(event)

  const stars = Number(body?.stars)
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    throw createError({ statusCode: 400, statusMessage: 'Estrellas inválidas (1–5)' })
  }

  const comment = clampStr(body?.comment, 2000)
  if (comment.length < 4) {
    throw createError({ statusCode: 400, statusMessage: 'El comentario es demasiado corto' })
  }

  const name = clampStr(body?.name, 80)
  if (name.length < 2) {
    throw createError({ statusCode: 400, statusMessage: 'Indica tu nombre' })
  }

  const roleLabel = clampStr(body?.roleLabel, 120)

  const row = await addTestimonio({ stars, comment, name, roleLabel })
  return { ok: true, item: row }
})
