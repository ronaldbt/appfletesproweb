<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Sidebar -->
    <Sidebar :userRole="'cliente'" ref="sidebar" />
    
    <!-- Botón toggle para móvil -->
    <button @click="toggleSidebar" 
            class="fixed top-4 left-4 z-50 lg:hidden bg-blue-600 text-white p-2 rounded-lg shadow-lg">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <!-- Contenido principal -->
    <div class="lg:ml-64 transition-all duration-300">
      <div class="max-w-4xl mx-auto p-6 text-white">
        <h1 class="text-3xl font-bold mb-6">👤 Mi Perfil</h1>

        <!-- Información del perfil -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <div class="flex items-center mb-6">
            <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold">{{ getInitials(usuario.nombre) }}</span>
            </div>
            <div class="ml-6">
              <h2 class="text-2xl font-bold text-white">{{ usuario.nombre }}</h2>
              <p class="text-gray-400">Cliente FletesPro</p>
              <p class="text-sm text-gray-500">Miembro desde {{ formatDate(usuario.creado_en) }}</p>
            </div>
          </div>

          <!-- Formulario de edición -->
          <form @submit.prevent="updatePerfil" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Nombre Completo</label>
                <input v-model="form.nombre" 
                       type="text"
                       required
                       class="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Email</label>
                <input v-model="form.email" 
                       type="email"
                       required
                       class="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Teléfono</label>
                <input v-model="form.telefono" 
                       type="tel"
                       placeholder="+56 9 1234 5678"
                       class="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Nueva Contraseña</label>
                <input v-model="form.password" 
                       type="password"
                       placeholder="Dejar vacío para mantener actual"
                       class="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" 
                      @click="resetForm"
                      class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition">
                Cancelar
              </button>
              <button type="submit" 
                      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>

        <!-- Configuraciones adicionales -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold mb-4">⚙️ Configuraciones</h3>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-white font-medium">Notificaciones por Email</p>
                <p class="text-sm text-gray-400">Recibir actualizaciones sobre mis reservas</p>
              </div>
              <input type="checkbox" v-model="configuraciones.emailNotifications" 
                     class="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded">
            </div>
            
            <div class="flex justify-between items-center">
              <div>
                <p class="text-white font-medium">Notificaciones WhatsApp</p>
                <p class="text-sm text-gray-400">Recibir mensajes de estado por WhatsApp</p>
              </div>
              <input type="checkbox" v-model="configuraciones.whatsappNotifications" 
                     class="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded">
            </div>
          </div>
          
          <div class="mt-6 pt-4 border-t border-gray-700">
            <button @click="saveConfiguraciones" 
                    class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
              Guardar Configuraciones
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiUrl, API_ENDPOINTS } from '../../config/api.js'
import Sidebar from '../../components/Sidebar.vue'

const sidebar = ref(null)
const usuario = ref({})
const form = ref({
  nombre: '',
  email: '',
  telefono: '',
  password: ''
})

const configuraciones = ref({
  emailNotifications: true,
  whatsappNotifications: false
})

// Métodos
const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
  }
}

const getInitials = (nombre) => {
  return nombre?.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'U'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-CL')
}

const resetForm = () => {
  form.value = {
    nombre: usuario.value.nombre || '',
    email: usuario.value.email || '',
    telefono: usuario.value.telefono || '',
    password: ''
  }
}

const updatePerfil = async () => {
  try {
    const updateData = {
      nombre: form.value.nombre,
      email: form.value.email,
      telefono: form.value.telefono
    }
    
    // Solo incluir password si se proporcionó uno nuevo
    if (form.value.password) {
      updateData.password = form.value.password
    }
    
    const response = await fetch(apiUrl(`/api/usuarios/${usuario.value.id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    })
    
    const data = await response.json()
    
    if (data.success) {
      // Actualizar datos locales
      usuario.value = { ...usuario.value, ...updateData }
      localStorage.setItem('usuario', JSON.stringify(usuario.value))
      alert('Perfil actualizado correctamente')
      form.value.password = '' // Limpiar campo de contraseña
    } else {
      alert(data.error || 'Error al actualizar perfil')
    }
  } catch (error) {
    console.error('Error al actualizar perfil:', error)
    alert('Error al actualizar perfil')
  }
}

const saveConfiguraciones = async () => {
  try {
    const response = await fetch(apiUrl(`/api/usuarios/${usuario.value.id}/configuraciones`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(configuraciones.value)
    })
    
    const data = await response.json()
    
    if (data.success) {
      alert('Configuraciones guardadas correctamente')
    } else {
      alert(data.error || 'Error al guardar configuraciones')
    }
  } catch (error) {
    console.error('Error al guardar configuraciones:', error)
    alert('Error al guardar configuraciones')
  }
}

onMounted(() => {
  const storedUser = localStorage.getItem('usuario')
  if (storedUser) {
    usuario.value = JSON.parse(storedUser)
    resetForm()
  }
})
</script>
