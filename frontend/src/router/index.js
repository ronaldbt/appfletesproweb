// ✅ src/router/index.js actualizado
import { createRouter, createWebHistory } from 'vue-router'

// Vistas principales
import HomeView from '../views/HomeView.vue'
import GraciasView from '../views/GraciasView.vue'
import NoDisponibleView from '../views/NoDisponibleView.vue'
import LoginView from '../views/Login.vue'
import RegisterView from '../views/Register.vue'
import DashboardClienteView from '../views/cliente/DashboardCliente.vue'
import DashboardConductorView from '../views/conductor/DashboardConductor.vue'
import DashboardAdminView from '../views/admin/DashboardAdmin.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Vistas de Admin
import AdminUsuarios from '../views/admin/AdminUsuarios.vue'
import AdminReservas from '../views/admin/AdminReservas.vue'
import AdminFletes from '../views/admin/AdminFletes.vue'
import AdminConductores from '../views/admin/AdminConductores.vue'
import AdminPagos from '../views/admin/AdminPagos.vue'
import AdminConfiguracion from '../views/admin/AdminConfiguracion.vue'
import AdminCotizacion from '../views/admin/AdminCotizacion.vue'

// Vistas de Cliente
import ClienteReservas from '../views/cliente/ClienteReservas.vue'
import ClientePerfil from '../views/cliente/ClientePerfil.vue'

// Vistas de Conductor
import ConductorRutas from '../views/conductor/ConductorRutas.vue'
import ConductorReservas from '../views/conductor/ConductorReservas.vue'
import ConductorPerfil from '../views/conductor/ConductorPerfil.vue'
import ConductorHistorial from '../views/conductor/ConductorHistorial.vue'

// Vistas de Cliente adicionales
import ClientePagos from '../views/cliente/ClientePagos.vue'

const routes = [
  // Rutas públicas (sin autenticación requerida)
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: false, publicOnly: true }
  },
  {
    path: '/gracias',
    name: 'Gracias',
    component: GraciasView,
    meta: { requiresAuth: false }
  },
  {
    path: '/no-disponible',
    name: 'NoDisponible',
    component: NoDisponibleView,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false, publicOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresAuth: false, publicOnly: true }
  },
  
  // Rutas de Cliente (protegidas)
  {
    path: '/dashboard-cliente',
    name: 'DashboardCliente',
    component: DashboardClienteView,
    meta: { requiresAuth: true, roles: ['cliente'] }
  },
  {
    path: '/cliente/reservas',
    name: 'ClienteReservas',
    component: ClienteReservas,
    meta: { requiresAuth: true, roles: ['cliente'] }
  },
  {
    path: '/cliente/perfil',
    name: 'ClientePerfil',
    component: ClientePerfil,
    meta: { requiresAuth: true, roles: ['cliente'] }
  },
  {
    path: '/cliente/pagos',
    name: 'ClientePagos',
    component: ClientePagos,
    meta: { requiresAuth: true, roles: ['cliente'] }
  },
  
  // Rutas de Conductor (protegidas)
  {
    path: '/dashboard-conductor',
    name: 'DashboardConductor',
    component: DashboardConductorView,
    meta: { requiresAuth: true, roles: ['conductor'] }
  },
  {
    path: '/conductor/rutas',
    name: 'ConductorRutas',
    component: ConductorRutas,
    meta: { requiresAuth: true, roles: ['conductor'] }
  },
  {
    path: '/conductor/reservas',
    name: 'ConductorReservas',
    component: ConductorReservas,
    meta: { requiresAuth: true, roles: ['conductor'] }
  },
  {
    path: '/conductor/perfil',
    name: 'ConductorPerfil',
    component: ConductorPerfil,
    meta: { requiresAuth: true, roles: ['conductor'] }
  },
  {
    path: '/conductor/historial',
    name: 'ConductorHistorial',
    component: ConductorHistorial,
    meta: { requiresAuth: true, roles: ['conductor'] }
  },
  
  // Rutas de Admin (protegidas)
  {
    path: '/dashboard-admin',
    name: 'DashboardAdmin',
    component: AdminLayout,
    meta: { requiresAuth: true, roles: ['admin'] },
    children: [
      { 
        path: '', 
        name: 'DashboardAdminHome', 
        component: DashboardAdminView,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      { 
        path: 'usuarios', 
        name: 'AdminUsuarios', 
        component: AdminUsuarios,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      { 
        path: 'reservas', 
        name: 'AdminReservas', 
        component: AdminReservas,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      { 
        path: 'cotizacion', 
        name: 'AdminCotizacion', 
        component: AdminCotizacion,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      { 
        path: 'fletes', 
        name: 'AdminFletes', 
        component: AdminFletes,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      { 
        path: 'conductores', 
        name: 'AdminConductores', 
        component: AdminConductores,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      { 
        path: 'pagos', 
        name: 'AdminPagos', 
        component: AdminPagos,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      { 
        path: 'configuracion', 
        name: 'AdminConfiguracion', 
        component: AdminConfiguracion,
        meta: { requiresAuth: true, roles: ['admin'] }
      }
    ]
  },
  
  // Redirecciones antiguas a nuevo layout
  { path: '/admin/usuarios', redirect: { name: 'AdminUsuarios' } },
  { path: '/admin/reservas', redirect: { name: 'AdminReservas' } },
  { path: '/admin/fletes', redirect: { name: 'AdminFletes' } },
  { path: '/admin/conductores', redirect: { name: 'AdminConductores' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard - Sistema completo de protección de rutas
router.beforeEach((to, from, next) => {
  // Obtener usuario del localStorage
  let usuario = null
  try {
    const userData = localStorage.getItem('usuario')
    usuario = userData ? JSON.parse(userData) : null
  } catch (e) {
    usuario = null
  }

  // Verificar si la ruta requiere autenticación
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const publicOnly = to.matched.some(record => record.meta.publicOnly)
  const allowedRoles = to.meta.roles || []

  // Función helper para obtener el dashboard según el rol
  const getDashboardByRole = (role) => {
    switch(role) {
      case 'admin': return '/dashboard-admin'
      case 'conductor': return '/dashboard-conductor'
      case 'cliente': return '/dashboard-cliente'
      default: return '/login'
    }
  }

  // CASO 1: Ruta pública solo para usuarios NO logueados (login, register, home)
  if (publicOnly && usuario) {
    const dashboard = getDashboardByRole(usuario.tipo)
    return next(dashboard)
  }

  // CASO 2: Ruta protegida - requiere autenticación
  if (requiresAuth) {
    // Usuario no está logueado
    if (!usuario) {
      return next('/login')
    }

    // Usuario logueado pero sin el rol correcto
    if (allowedRoles.length > 0 && !allowedRoles.includes(usuario.tipo)) {
      const dashboard = getDashboardByRole(usuario.tipo)
      return next(dashboard)
    }
  }

  // CASO 3: Permitir navegación normal
  next()
})

export default router