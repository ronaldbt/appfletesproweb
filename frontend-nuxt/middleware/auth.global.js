/**
 * Middleware de autenticación global.
 * Protege /dashboard-admin/*, /dashboard-conductor, /conductor/*, /dashboard-cliente, /cliente/*
 * Solo se puede acceder estando logueado y con el tipo de usuario correcto.
 */
export default defineNuxtRouteMiddleware((to) => {
  // Solo ejecutar en el cliente (localStorage solo existe en el navegador)
  if (typeof window === 'undefined') return

  const path = to.path

  // Rutas públicas: no requieren login
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/contacto',
    '/gracias',
    '/reservar',
    '/no-disponible',
    '/test'
  ]
  const isPublic = publicPaths.includes(path) ||
    path.startsWith('/blog') ||
    path.startsWith('/mudanzas') ||
    path.startsWith('/fletes-') ||
    path.startsWith('/comunas-rm') ||
    path === '/transporte-frio' ||
    path === '/ultima-milla' ||
    path === '/embalajes' ||
    path === '/bodegaje' ||
    path === '/fletes-construccion'

  if (isPublic) return

  let requiredRole = null
  if (path.startsWith('/dashboard-admin') || path === '/dashboard-admin') {
    requiredRole = 'admin'
  } else if (path.startsWith('/dashboard-conductor') || path === '/dashboard-conductor' || path.startsWith('/conductor/')) {
    requiredRole = 'conductor'
  } else if (path.startsWith('/dashboard-cliente') || path === '/dashboard-cliente' || path.startsWith('/cliente/')) {
    requiredRole = 'cliente'
  }

  if (!requiredRole) return

  let usuario = null
  try {
    const raw = typeof window !== 'undefined' && window.localStorage ? window.localStorage.getItem('usuario') : null
    if (raw) usuario = JSON.parse(raw)
  } catch (_) {}

  if (!usuario || !usuario.tipo) {
    return navigateTo({
      path: '/login',
      query: { redirect: path }
    })
  }

  if (usuario.tipo !== requiredRole) {
    // Usuario logueado pero con rol distinto: redirigir a su dashboard
    if (usuario.tipo === 'admin') return navigateTo('/dashboard-admin')
    if (usuario.tipo === 'conductor') return navigateTo('/dashboard-conductor')
    if (usuario.tipo === 'cliente') return navigateTo('/dashboard-cliente')
    return navigateTo('/login')
  }
})
