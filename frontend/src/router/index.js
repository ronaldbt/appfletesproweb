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
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/gracias',
    name: 'Gracias',
    component: GraciasView
  },
  {
    path: '/no-disponible',
    name: 'NoDisponible',
    component: NoDisponibleView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/dashboard-cliente',
    name: 'DashboardCliente',
    component: DashboardClienteView
  },
  {
    path: '/dashboard-conductor',
    name: 'DashboardConductor',
    component: DashboardConductorView
  },
  {
    path: '/dashboard-admin',
    name: 'DashboardAdmin',
    component: AdminLayout,
    children: [
      { path: '', name: 'DashboardAdminHome', component: DashboardAdminView },
      { path: 'usuarios', name: 'AdminUsuarios', component: AdminUsuarios },
      { path: 'reservas', name: 'AdminReservas', component: AdminReservas },
      { path: 'fletes', name: 'AdminFletes', component: AdminFletes },
      { path: 'conductores', name: 'AdminConductores', component: AdminConductores },
      { path: 'pagos', name: 'AdminPagos', component: AdminPagos },
      { path: 'configuracion', name: 'AdminConfiguracion', component: AdminConfiguracion }
    ]
  },
  
  // Redirecciones antiguas a nuevo layout
  { path: '/admin/usuarios', redirect: { name: 'AdminUsuarios' } },
  { path: '/admin/reservas', redirect: { name: 'AdminReservas' } },
  { path: '/admin/fletes', redirect: { name: 'AdminFletes' } },
  { path: '/admin/conductores', redirect: { name: 'AdminConductores' } },
  
  // Rutas de Cliente
  {
    path: '/cliente/reservas',
    name: 'ClienteReservas',
    component: ClienteReservas
  },
  {
    path: '/cliente/perfil',
    name: 'ClientePerfil',
    component: ClientePerfil
  },
  
  // Rutas de Conductor
  {
    path: '/conductor/rutas',
    name: 'ConductorRutas',
    component: ConductorRutas
  },
  {
    path: '/conductor/reservas',
    name: 'ConductorReservas',
    component: ConductorReservas
  },
  {
    path: '/conductor/perfil',
    name: 'ConductorPerfil',
    component: ConductorPerfil
  },
  {
    path: '/conductor/historial',
    name: 'ConductorHistorial',
    component: ConductorHistorial
  },
  
  // Rutas adicionales de Cliente
  {
    path: '/cliente/pagos',
    name: 'ClientePagos',
    component: ClientePagos
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router