// Configuración de API para Nuxt
// Backend = api.fletespro.cl (Express). Frontend = fletespro.cl (esta app Nuxt).

const isBrowser = typeof window !== 'undefined'
const host = isBrowser ? window.location.hostname : ''
const isFletesProProduction = isBrowser && (host === 'fletespro.cl' || host === 'www.fletespro.cl' || host === 'app.fletespro.cl' || host.endsWith('.fletespro.cl'))
const API_BASE_URL = host === 'portespro.es'
  ? 'https://api.portespro.es'
  : (isFletesProProduction ? 'https://api.fletespro.cl' : (host ? `${typeof window !== 'undefined' ? window.location.protocol : 'http:'}//${host}:3002` : 'http://localhost:3002'))

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
  ADMIN_BACKEND_CLEAR_CACHE: '/api/admin/backend/clear-whatsapp-cache',
  ADMIN_BODEGA_STATS: '/api/admin/bodega/stats',
  ADMIN_BODEGA_BODEGAS: '/api/admin/bodega/bodegas',
  ADMIN_BODEGA_USUARIOS: '/api/admin/bodega/usuarios',
  ADMIN_BODEGA_CONTRATOS: '/api/admin/bodega/contratos',
  ADMIN_BODEGA_ITEMS: '/api/admin/bodega/items',
  ADMIN_BODEGA_CUOTAS: '/api/admin/bodega/cuotas',
  BODEGA_MI_RESUMEN: '/api/bodega/mi/resumen',
  BODEGA_MI_ITEMS: '/api/bodega/mi/items',
  BODEGA_MI_PAGOS: '/api/bodega/mi/pagos',
  BODEGA_MI_CONTRATO: '/api/bodega/mi/contrato',
  BODEGA_MI_PERFIL: '/api/bodega/mi/perfil'
}

export const apiUrl = (endpoint) => buildApiUrl(endpoint)

console.log(`[API] Base URL: ${API_BASE_URL}`)

export { API_BASE_URL }
export default { API_BASE_URL, API_ENDPOINTS, apiUrl }