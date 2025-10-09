// Configuración de API

// En producción (app.fletespro.cl) apuntar a api.fletespro.cl
const isBrowser = typeof window !== 'undefined'
const host = isBrowser ? window.location.hostname : ''
const API_BASE_URL = host === 'app.fletespro.cl'
  ? 'https://api.fletespro.cl'
  : (host ? `${window.location.protocol}//${host}:3001` : 'http://localhost:3001')

export const buildApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`

export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  FLETES: '/api/fletes',
  FLETES_CLIENTE: '/api/fletes-cliente',
  FLETES_CONDUCTOR: '/api/fletes-conductor',
  PAYMENTS: '/api/payments',
  ADMIN_STATS: '/api/admin/stats',
  ADMIN_ACTIVITY: '/api/admin/activity',
  ADMIN_WHATSAPP_STATUS: '/api/admin/whatsapp/status',
  ADMIN_WHATSAPP_INITIALIZE: '/api/admin/whatsapp/initialize',
  ADMIN_WHATSAPP_DISCONNECT: '/api/admin/whatsapp/disconnect',
  ADMIN_BACKEND_START: '/api/admin/backend/start',
  ADMIN_BACKEND_RESTART: '/api/admin/backend/restart',
  ADMIN_BACKEND_STOP: '/api/admin/backend/stop',
  ADMIN_BACKEND_STATUS: '/api/admin/backend/status',
  ADMIN_BACKEND_LOGS: '/api/admin/backend/logs',
  ADMIN_BACKEND_CLEAR_CACHE: '/api/admin/backend/clear-whatsapp-cache'
}

export const apiUrl = (endpoint) => buildApiUrl(endpoint)

console.log(`[API] Base URL: ${API_BASE_URL}`)

export { API_BASE_URL }
export default { API_BASE_URL, API_ENDPOINTS, apiUrl }