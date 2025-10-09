<template>
  <div class="text-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold flex items-center text-green-700">
          <span class="mr-3">🚛</span>
          Gestión de Conductores
        </h1>
        <div class="text-sm text-gray-500">
          <span class="font-semibold text-green-700">{{ pagination.total }}</span> conductores registrados
        </div>
      </div>

      <!-- Formulario de nuevo conductor -->
      <div class="bg-white border border-gray-200 p-6 rounded-xl mb-6 shadow-sm">
        <h2 class="text-xl font-semibold mb-4 flex items-center text-green-700">
          <span class="mr-2">➕</span>
          Nuevo Conductor
        </h2>
        
        <form @submit.prevent="crear" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input 
                v-model="form.nombre" 
                required 
                placeholder="Ej: Juan Pérez"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                RUT *
              </label>
              <input 
                v-model="form.rut" 
                required 
                placeholder="Ej: 12.345.678-9"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input 
                v-model="form.email" 
                required 
                type="email"
                placeholder="Ej: juan@email.com"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Teléfono WhatsApp *
              </label>
              <input 
                v-model="form.numero" 
                required 
                placeholder="Ej: 56912345678"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Patente (Placa)
              </label>
              <input 
                v-model="form.vehiculo_placa" 
                placeholder="Ej: ABCD12"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tipo de vehículo
              </label>
              <select 
                v-model="form.vehiculo_tipo"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Zona (Opcional)
              </label>
              <input 
                v-model="form.zona" 
                placeholder="Ej: Santiago Centro"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Contraseña inicial (opcional)
              </label>
              <input 
                v-model="form.password" 
                type="password"
                placeholder="Mínimo 6 caracteres"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div class="md:col-span-2 lg:col-span-3">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Dirección (Opcional)
              </label>
              <input 
                v-model="form.direccion" 
                placeholder="Calle, número, comuna"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div class="flex items-end">
              <label class="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  v-model="form.activo" 
                  class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span class="text-sm text-gray-700">Activo</span>
              </label>
            </div>
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button 
              type="submit"
              :disabled="loading"
              class="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              {{ loading ? 'Guardando...' : '➕ Agregar Conductor' }}
            </button>
            
            <button 
              type="button"
              @click="resetForm"
              :disabled="loading"
              class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition-colors"
            >
              🗑️ Limpiar
            </button>
          </div>
          
          <div v-if="msg" class="mt-3 p-3 rounded-lg" :class="msg.includes('Error') ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'">
            {{ msg }}
          </div>
        </form>
      </div>

      <!-- Lista de conductores -->
      <div class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold flex items-center text-green-700">
              <span class="mr-2">📋</span>
              Lista de Conductores
            </h2>
            <button 
              @click="listar"
              class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              🔄 Refrescar
            </button>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Conductor
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contacto
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  RUT
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Patente
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vehículo
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Zona
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contraseña
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="loading" class="bg-white">
                <td colspan="9" class="px-6 py-8 text-center text-gray-500">
                  <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mr-3"></div>
                    Cargando conductores...
                  </div>
                </td>
              </tr>
              <tr v-else-if="items.length === 0" class="bg-white">
                <td colspan="9" class="px-6 py-8 text-center text-gray-500">
                  No hay conductores registrados
                </td>
              </tr>
              <tr v-else v-for="conductor in items" :key="conductor.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      {{ getInitials(conductor.nombre) }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ conductor.nombre }}</div>
                      <div v-if="conductor.email" class="text-xs text-gray-500">{{ conductor.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">
                    <div class="flex items-center">
                      <span class="mr-2">📱</span>
                      {{ conductor.numero }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700 font-mono">
                    {{ conductor.rut || '-' }}
                  </div>
                </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-700 font-mono">
                  {{ conductor.vehiculo_placa || '-' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-700">
                  {{ formatVehiculo(conductor.vehiculo_tipo) }}
                </div>
              </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">
                    {{ conductor.zona || '-' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <input :type="conductor.__showPwd ? 'text' : 'password'" :value="conductor.password_visible || ''" readonly class="w-36 px-2 py-1 bg-white border border-gray-300 rounded text-sm" />
                    <button @click="conductor.__showPwd = !conductor.__showPwd" class="text-gray-600 hover:text-gray-900">👁️</button>
                    <button @click="copiar(conductor.password_visible)" class="text-gray-600 hover:text-gray-900">📋</button>
                    <button @click="generarTemporal(conductor)" class="text-green-600 hover:text-green-700">♻️</button>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="conductor.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                    <span class="mr-1">{{ conductor.activo ? '✅' : '❌' }}</span>
                    {{ conductor.activo ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button 
                      @click="editarConductor(conductor)"
                      class="text-yellow-600 hover:text-yellow-700 transition-colors"
                    >
                      ✏️ Editar
                    </button>
                    <button 
                      @click="abrirCambioPassword(conductor)"
                      class="text-green-600 hover:text-green-700 transition-colors"
                    >
                      🔑 Cambiar contraseña
                    </button>
                    <button 
                      @click="eliminar(conductor)"
                      class="text-red-600 hover:text-red-700 transition-colors"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div class="px-6 py-4 flex items-center justify-between">
          <div class="text-sm text-gray-600">
            Mostrando
            <span class="font-medium">{{ startItem }}</span>
            -
            <span class="font-medium">{{ endItem }}</span>
            de
            <span class="font-medium">{{ pagination.total }}</span>
          </div>
          <div class="flex items-center gap-2">
            <button @click="prevPage" :disabled="pagination.page <= 1 || loading" class="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50">Anterior</button>
            <span class="text-sm text-gray-700">Página {{ pagination.page }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="pagination.page >= totalPages || loading" class="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50">Siguiente</button>
            <select v-model.number="pagination.limit" @change="goFirstPage" class="ml-2 px-2 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-green-700">
            ✏️ Editar Conductor
          </h3>
          <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form @submit.prevent="saveConductor" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input 
                v-model="editForm.nombre" 
                required 
                placeholder="Ej: Juan Pérez"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                RUT *
              </label>
              <input 
                v-model="editForm.rut" 
                required 
                placeholder="Ej: 12.345.678-9"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input 
                v-model="editForm.email" 
                required 
                type="email"
                placeholder="Ej: juan@email.com"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Teléfono WhatsApp *
              </label>
              <input 
                v-model="editForm.numero" 
                required 
                placeholder="Ej: 56912345678"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Patente (Placa)
              </label>
              <input 
                v-model="editForm.vehiculo_placa" 
                placeholder="Ej: ABCD12"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tipo de vehículo
              </label>
              <select 
                v-model="editForm.vehiculo_tipo"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Zona (Opcional)
              </label>
              <input 
                v-model="editForm.zona" 
                placeholder="Ej: Santiago Centro"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nueva contraseña (opcional)
              </label>
              <input 
                v-model="editForm.password" 
                type="password"
                placeholder="Mínimo 6 caracteres"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div class="md:col-span-2 lg:col-span-3">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Dirección (Opcional)
              </label>
              <input 
                v-model="editForm.direccion" 
                placeholder="Calle, número, comuna"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div class="flex items-end">
              <label class="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  v-model="editForm.activo" 
                  class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span class="text-sm text-gray-700">Activo</span>
              </label>
            </div>
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button 
              type="submit"
              :disabled="editLoading"
              class="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <span v-if="editLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              {{ editLoading ? 'Guardando...' : '💾 Guardar Cambios' }}
            </button>
            
            <button 
              type="button"
              @click="closeEditModal"
              :disabled="editLoading"
              class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-medium transition-colors"
            >
              ❌ Cancelar
            </button>
          </div>
          
          <div v-if="editMessage" class="mt-3 p-3 rounded-lg" :class="editMessage.includes('Error') ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'">
            {{ editMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { API_BASE_URL } from '../../config/api.js'

// Estado
const items = ref([])
const loading = ref(false)
const msg = ref('')
const pagination = ref({ page: 1, limit: 20, total: 0 })

// Modal de edición
const showEditModal = ref(false)
const editingConductor = ref(null)
const editLoading = ref(false)
const editMessage = ref('')
const editForm = ref({
  nombre: '',
  rut: '',
  email: '',
  numero: '',
  vehiculo_placa: '',
  vehiculo_tipo: '',
  direccion: '',
  zona: '',
  activo: true,
  password: ''
})

// Formulario
const form = ref({
  nombre: '',
  rut: '',
  email: '',
  numero: '',
  vehiculo_placa: '',
  vehiculo_tipo: '',
  direccion: '',
  zona: '',
  activo: true,
  password: ''
})

// Métodos
const resetForm = () => {
  form.value = {
    nombre: '',
    rut: '',
    email: '',
    numero: '',
    vehiculo_placa: '',
    vehiculo_tipo: '',
    direccion: '',
    zona: '',
    activo: true,
    password: ''
  }
  msg.value = ''
}

const listar = async () => {
  try {
    loading.value = true
    const params = new URLSearchParams({ page: String(pagination.value.page), limit: String(pagination.value.limit) })
    const res = await fetch(`${API_BASE_URL}/api/admin/conductores?${params.toString()}`)
    const data = await res.json()
    if (data && Array.isArray(data.items)) {
      items.value = data.items.map(x => ({ ...x, __showPwd: false }))
      pagination.value.total = Number(data.total || 0)
      pagination.value.page = Number(data.page || 1)
      pagination.value.limit = Number(data.limit || pagination.value.limit)
    } else if (Array.isArray(data)) {
      // compat
      items.value = data.map(x => ({ ...x, __showPwd: false }))
      pagination.value.total = data.length
    } else {
      items.value = []
    }
  } catch (error) {
    console.error('❌ Error al cargar conductores:', error)
    items.value = []
  } finally {
    loading.value = false
  }
}

const crear = async () => {
  try {
    loading.value = true
    msg.value = ''
    
    const res = await fetch(`${API_BASE_URL}/api/admin/conductores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Error al crear conductor')
    
    resetForm()
    msg.value = '✅ Conductor agregado correctamente'
  // Volver a la primera página para ver el nuevo registro
  pagination.value.page = 1
  await listar()
    
  } catch (error) {
    console.error('❌ Error al crear conductor:', error)
    msg.value = `❌ Error: ${error.message}`
  } finally {
    loading.value = false
  }
}

const editarConductor = (conductor) => {
  openEditModal(conductor)
}

const openEditModal = (conductor) => {
  editingConductor.value = conductor
  editForm.value = {
    nombre: conductor.nombre || '',
    rut: conductor.rut || '',
    email: conductor.email || '',
    numero: conductor.numero || '',
    vehiculo_placa: conductor.vehiculo_placa || '',
    vehiculo_tipo: conductor.vehiculo_tipo || '',
    direccion: conductor.direccion || '',
    zona: conductor.zona || '',
    activo: conductor.activo || false,
    password: ''
  }
  editMessage.value = ''
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingConductor.value = null
  editForm.value = {
    nombre: '',
    rut: '',
    email: '',
    numero: '',
    vehiculo_placa: '',
    vehiculo_tipo: '',
    direccion: '',
    zona: '',
    activo: true,
    password: ''
  }
  editMessage.value = ''
}

const saveConductor = async () => {
  try {
    editLoading.value = true
    editMessage.value = ''
    
    const response = await fetch(`${API_BASE_URL}/api/admin/conductores/${editingConductor.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm.value)
    })
    
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Error al actualizar conductor')
    
    editMessage.value = '✅ Conductor actualizado correctamente'
    
    // Actualizar la lista después de un breve delay
    setTimeout(async () => {
      await listar()
      closeEditModal()
    }, 1500)
    
  } catch (error) {
    console.error('❌ Error al actualizar conductor:', error)
    editMessage.value = `❌ Error: ${error.message}`
  } finally {
    editLoading.value = false
  }
}

const abrirCambioPassword = async (conductor) => {
  const nueva = prompt(`Nueva contraseña para ${conductor.nombre} (mínimo 6 caracteres):`)
  if (!nueva || nueva.length < 6) return alert('Contraseña inválida')
  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/conductores/${conductor.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: nueva })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'No se pudo actualizar contraseña')
    alert('✅ Contraseña actualizada')
  } catch (e) {
    alert(`❌ Error: ${e.message}`)
  }
}

const eliminar = async (conductor) => {
  if (!confirm(`¿Estás seguro de eliminar al conductor ${conductor.nombre}?`)) return
  
  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/conductores/${conductor.id}`, {
      method: 'DELETE'
    })
    
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Error al eliminar conductor')
    
    await listar()
    msg.value = '✅ Conductor eliminado correctamente'
    
  } catch (error) {
    console.error('❌ Error al eliminar conductor:', error)
    msg.value = `❌ Error: ${error.message}`
  }
}

const copiar = async (texto) => {
  if (!texto) return
  try { await navigator.clipboard.writeText(texto); alert('Copiado'); } catch {}
}

const generarTemporal = async (conductor) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/admin/conductores/${conductor.id}/reset-password`, { method: 'POST' })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'No se pudo generar')
    conductor.password_visible = data.password_temp
    alert('Nueva contraseña generada')
  } catch (e) {
    alert(`Error: ${e.message}`)
  }
}

// Utilidades
const getInitials = (nombre) => {
  return nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
}

const formatVehiculo = (tipo) => {
  const map = {
    camioneta: 'Camioneta',
    camion_3_4: 'Camión 3/4',
    camion_grande: 'Camión grande',
    camion_frio: 'Camión con frío',
    auto: 'Auto',
    moto: 'Moto',
    otro: 'Otro'
  }
  return map[tipo] || '-'
}

// Lifecycle
onMounted(() => {
  listar()
})

// Paginación helpers
const totalPages = computed(() => Math.max(Math.ceil(pagination.value.total / pagination.value.limit), 1))
const startItem = computed(() => (pagination.value.total === 0 ? 0 : (pagination.value.page - 1) * pagination.value.limit + 1))
const endItem = computed(() => Math.min(pagination.value.page * pagination.value.limit, pagination.value.total))
const nextPage = () => { if (pagination.value.page < totalPages.value) { pagination.value.page += 1; listar() } }
const prevPage = () => { if (pagination.value.page > 1) { pagination.value.page -= 1; listar() } }
const goFirstPage = () => { pagination.value.page = 1; listar() }
</script>