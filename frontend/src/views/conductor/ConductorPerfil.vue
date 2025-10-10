<template>
  <div class="min-h-screen bg-white text-gray-900">
    <Sidebar :userRole="'conductor'" ref="sidebar" />
    
    <button @click="toggleSidebar" 
            class="fixed top-4 left-4 z-50 lg:hidden bg-green-600 text-white p-2 rounded-lg shadow-lg">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>

    <div class="lg:ml-64 transition-all duration-300">
      <div class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6 text-green-700">👤 Mi Perfil</h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Información del perfil -->
          <div class="lg:col-span-1">
            <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div class="text-center">
                <div class="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {{ getInitials(perfil.nombre) }}
                </div>
                <h2 class="text-xl font-semibold text-gray-900">{{ perfil.nombre }}</h2>
                <p class="text-gray-500">Conductor</p>
                <div class="mt-4">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        :class="perfil.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    {{ perfil.activo ? 'Activo' : 'Inactivo' }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Estadísticas rápidas -->
            <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">📊 Estadísticas</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600">Fletes completados:</span>
                  <span class="font-semibold">{{ stats.fletesCompletados }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Rating promedio:</span>
                  <span class="font-semibold">{{ stats.ratingPromedio }}/5</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Miembro desde:</span>
                  <span class="font-semibold">{{ formatDate(perfil.fecha_registro) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulario de edición -->
          <div class="lg:col-span-2">
            <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold text-green-700">✏️ Editar Perfil</h3>
                <button @click="toggleEditMode" 
                        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  {{ editMode ? 'Cancelar' : 'Editar' }}
                </button>
              </div>

              <form @submit.prevent="saveProfile" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                    <input 
                      v-model="editForm.nombre" 
                      :disabled="!editMode"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">RUT</label>
                    <input 
                      v-model="editForm.rut" 
                      :disabled="!editMode"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      v-model="editForm.email" 
                      type="email"
                      :disabled="!editMode"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono WhatsApp</label>
                    <input 
                      v-model="editForm.numero" 
                      :disabled="!editMode"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Patente</label>
                    <input 
                      v-model="editForm.vehiculo_placa" 
                      :disabled="!editMode"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de vehículo</label>
                    <select 
                      v-model="editForm.vehiculo_tipo"
                      :disabled="!editMode"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    >
                      <option value="">Seleccionar</option>
                      <option value="camioneta">Camioneta</option>
                      <option value="camion_3_4">Camión 3/4</option>
                      <option value="camion_grande">Camión grande</option>
                      <option value="camion_frio">Camión con frío</option>
                      <option value="auto">Auto</option>
                      <option value="moto">Moto</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Zona</label>
                    <input 
                      v-model="editForm.zona" 
                      :disabled="!editMode"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nueva contraseña</label>
                    <input 
                      v-model="editForm.password" 
                      type="password"
                      :disabled="!editMode"
                      placeholder="Dejar vacío para no cambiar"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                  <input 
                    v-model="editForm.direccion" 
                    :disabled="!editMode"
                    class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                  />
                </div>
              </form>
            </div>

            <!-- Sección de Datos Bancarios -->
            <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-6">
              <div class="flex justify-between items-center mb-6">
                <div>
                  <h3 class="text-xl font-semibold text-green-700">💳 Datos Bancarios</h3>
                  <p class="text-sm text-gray-500 mt-1">Para procesar tus pagos semanalmente</p>
                </div>
              </div>

              <form @submit.prevent="saveProfile" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Banco</label>
                    <select 
                      v-model="editForm.banco" 
                      :disabled="!editMode"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    >
                      <option value="">Seleccionar banco</option>
                      <option value="banco_chile">Banco de Chile</option>
                      <option value="banco_estado">Banco Estado</option>
                      <option value="santander">Santander</option>
                      <option value="bci">BCI</option>
                      <option value="scotiabank">Scotiabank</option>
                      <option value="itau">Itaú</option>
                      <option value="security">Security</option>
                      <option value="falabella">Banco Falabella</option>
                      <option value="ripley">Banco Ripley</option>
                      <option value="consorcio">Consorcio</option>
                      <option value="bice">BICE</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Cuenta</label>
                    <select 
                      v-model="editForm.tipo_cuenta" 
                      :disabled="!editMode"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="cuenta_corriente">Cuenta Corriente</option>
                      <option value="cuenta_vista">Cuenta Vista</option>
                      <option value="cuenta_rut">Cuenta RUT</option>
                      <option value="chequera_electronica">Chequera Electrónica</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Número de Cuenta</label>
                    <input 
                      v-model="editForm.numero_cuenta" 
                      type="text"
                      :disabled="!editMode"
                      placeholder="Ingresa el número de cuenta"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">RUT del Titular</label>
                    <input 
                      v-model="editForm.rut_titular" 
                      type="text"
                      :disabled="!editMode"
                      placeholder="12.345.678-9"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                  
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nombre del Titular</label>
                    <input 
                      v-model="editForm.nombre_titular" 
                      type="text"
                      :disabled="!editMode"
                      placeholder="Nombre completo del titular de la cuenta"
                      class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <!-- Información de pagos -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <p class="text-sm text-blue-800 font-medium">💸 Información de pagos</p>
                      <p class="text-sm text-blue-700 mt-1">
                        Tus ganancias se depositan todos los <strong>miércoles</strong> automáticamente a la cuenta registrada.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div v-if="editMode" class="flex space-x-3">
                  <button 
                    type="submit"
                    :disabled="saving"
                    class="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <span v-if="saving" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    {{ saving ? 'Guardando...' : '💾 Guardar Cambios' }}
                  </button>
                  
                  <button 
                    type="button"
                    @click="cancelEdit"
                    :disabled="saving"
                    class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    ❌ Cancelar
                  </button>
                </div>
              </form>
            </div>

            <!-- Mensaje de estado -->
            <div v-if="message" class="mt-6 p-4 rounded-lg" :class="message.includes('Error') ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'">
              {{ message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { API_BASE_URL } from '../../config/api.js'
import Sidebar from '../../components/Sidebar.vue'

const sidebar = ref(null)
const perfil = ref({
  nombre: '',
  email: '',
  numero: '',
  rut: '',
  vehiculo_placa: '',
  vehiculo_tipo: '',
  direccion: '',
  zona: '',
  activo: true,
  fecha_registro: ''
})
const stats = ref({
  fletesCompletados: 0,
  ratingPromedio: 4.5
})
const editMode = ref(false)
const saving = ref(false)
const message = ref('')
const editForm = ref({
  nombre: '',
  email: '',
  numero: '',
  rut: '',
  vehiculo_placa: '',
  vehiculo_tipo: '',
  direccion: '',
  zona: '',
  password: '',
  // Datos bancarios
  banco: '',
  tipo_cuenta: '',
  numero_cuenta: '',
  rut_titular: '',
  nombre_titular: ''
})

const toggleSidebar = () => {
  if (sidebar.value) {
    sidebar.value.toggleSidebar()
  }
}

// Cargar perfil del conductor
const loadProfile = async () => {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (!usuario) return

    const response = await fetch(`${API_BASE_URL}/api/conductor/perfil/${usuario.id}`)
    const data = await response.json()
    
    if (data.conductor) {
      perfil.value = { ...data.conductor, ...usuario }
      editForm.value = {
        nombre: data.conductor.nombre || usuario.nombre || '',
        email: data.conductor.email || usuario.email || '',
        numero: data.conductor.numero || '',
        rut: data.conductor.rut || '',
        vehiculo_placa: data.conductor.vehiculo_placa || '',
        vehiculo_tipo: data.conductor.vehiculo_tipo || '',
        direccion: data.conductor.direccion || '',
        zona: data.conductor.zona || '',
        password: '',
        // Datos bancarios
        banco: data.conductor.banco || '',
        tipo_cuenta: data.conductor.tipo_cuenta || '',
        numero_cuenta: data.conductor.numero_cuenta || '',
        rut_titular: data.conductor.rut_titular || data.conductor.rut || '',
        nombre_titular: data.conductor.nombre_titular || data.conductor.nombre || ''
      }
    }
    
    if (data.stats) {
      stats.value = data.stats
    }
  } catch (error) {
    console.error('❌ Error al cargar perfil:', error)
    // Usar datos del localStorage como fallback
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (usuario) {
      perfil.value = usuario
      editForm.value = {
        nombre: usuario.nombre || '',
        email: usuario.email || '',
        numero: '',
        rut: '',
        vehiculo_placa: '',
        vehiculo_tipo: '',
        direccion: '',
        zona: '',
        password: '',
        banco: '',
        tipo_cuenta: '',
        numero_cuenta: '',
        rut_titular: '',
        nombre_titular: ''
      }
    }
  }
}

const toggleEditMode = () => {
  editMode.value = !editMode.value
  if (!editMode.value) {
    // Resetear formulario si se cancela
    loadProfile()
  }
  message.value = ''
}

const cancelEdit = () => {
  editMode.value = false
  loadProfile()
  message.value = ''
}

const saveProfile = async () => {
  try {
    saving.value = true
    message.value = ''
    
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (!usuario) return

    const response = await fetch(`${API_BASE_URL}/api/conductor/perfil/${usuario.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm.value)
    })
    
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Error al actualizar perfil')
    
    message.value = '✅ Perfil actualizado correctamente'
    editMode.value = false
    
    // Actualizar localStorage si se cambió el nombre
    if (editForm.value.nombre !== usuario.nombre) {
      usuario.nombre = editForm.value.nombre
      localStorage.setItem('usuario', JSON.stringify(usuario))
    }
    
    await loadProfile()
    
  } catch (error) {
    console.error('❌ Error al guardar perfil:', error)
    message.value = `❌ Error: ${error.message}`
  } finally {
    saving.value = false
  }
}

// Utilidades
const getInitials = (nombre) => {
  if (!nombre) return 'C'
  return nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-CL')
}

onMounted(() => {
  loadProfile()
})
</script>
