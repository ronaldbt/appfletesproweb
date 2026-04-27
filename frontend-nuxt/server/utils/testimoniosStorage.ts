import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'pathe'

export interface TestimonioRow {
  id: string
  stars: number
  comment: string
  name: string
  roleLabel: string
  createdAt: string
}

function dataPath() {
  return join(process.cwd(), '.data', 'testimonios.json')
}

async function ensureDir() {
  await mkdir(dirname(dataPath()), { recursive: true })
}

async function readAll(): Promise<TestimonioRow[]> {
  await ensureDir()
  try {
    const raw = await readFile(dataPath(), 'utf8')
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as TestimonioRow[]) : []
  } catch {
    await writeFile(dataPath(), '[]', 'utf8')
    return []
  }
}

async function writeAll(rows: TestimonioRow[]) {
  await ensureDir()
  await writeFile(dataPath(), JSON.stringify(rows), 'utf8')
}

export async function listTestimonios(): Promise<TestimonioRow[]> {
  const rows = await readAll()
  return rows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function addTestimonio(input: {
  stars: number
  comment: string
  name: string
  roleLabel: string
}): Promise<TestimonioRow> {
  const rows = await readAll()
  const row: TestimonioRow = {
    id: `t_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    stars: input.stars,
    comment: input.comment,
    name: input.name,
    roleLabel: input.roleLabel || '',
    createdAt: new Date().toISOString()
  }
  rows.unshift(row)
  await writeAll(rows)
  return row
}

export async function deleteTestimonio(id: string): Promise<boolean> {
  const rows = await readAll()
  const next = rows.filter((r) => r.id !== id)
  if (next.length === rows.length) return false
  await writeAll(next)
  return true
}
