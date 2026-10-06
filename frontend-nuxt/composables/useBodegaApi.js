/**
 * Helpers API Bodega (admin + portal cliente).
 */
import { API_BASE_URL, apiUrl, API_ENDPOINTS } from '../config/api.js'

export function bodegaMediaUrl (path) {
  if (!path) return ''
  if (path.startsWith('http') || path.startsWith('data:')) return path
  return `${API_BASE_URL}${path}`
}

export function getStoredUsuario () {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('usuario')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function formatCLP (amount) {
  return Number(amount || 0).toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  })
}

async function parseJson (res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Error HTTP ${res.status}`)
  return data
}

export async function adminBodegaFetch (endpoint, options = {}) {
  const res = await fetch(apiUrl(endpoint), {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  })
  return parseJson(res)
}

export async function clienteBodegaFetch (endpoint, options = {}) {
  const usuario = getStoredUsuario()
  if (!usuario?.id) throw new Error('Sesión no válida')
  const sep = endpoint.includes('?') ? '&' : '?'
  const url = `${apiUrl(endpoint)}${sep}usuario_id=${usuario.id}`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': String(usuario.id),
      ...(options.headers || {})
    },
    ...options
  })
  return parseJson(res)
}

export { API_ENDPOINTS, apiUrl, API_BASE_URL }
