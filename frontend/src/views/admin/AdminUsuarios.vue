<template>
  <div class="text-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold flex items-center text-green-700">
          <span class="mr-3">👥</span>
          Gestión de Usuarios
        </h1>
        <div class="flex items-center space-x-4">
          <div class="text-sm text-gray-500">
            <span class="font-semibold text-green-700">{{ stats.totalClientes }}</span> clientes • 
            <span class="font-semibold text-green-700">{{ stats.totalConductores }}</span> conductores
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-white border border-gray-200 p-6 rounded-xl mb-6 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <input 
              v-model="filters.busqueda" 
              @input="debouncedSearch"
              placeholder="Nombre, email o teléfono..."
              class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select 
              v-model="filters.tipo" 
              @change="loadUsuarios"
              class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="todos">Todos</option>
              <option value="clientes">Clientes</option>
              <option value="conductores">Conductores</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select 
              v-model="filters.estado" 
              @change="loadUsuarios"
              class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="todos">Todos</option>
              <option value="activos">Activos</option>
              <option value="inactivos">Inactivos</option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              @click="loadUsuarios"
              class="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🔍 Filtrar
            </button>
          </div>
        </div>
      </div>

      <!-- Tabla de usuarios -->
      <div class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Usuario
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contacto
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tipo
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Registro
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="loading" class="bg-white">
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                  <div class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mr-3"></div>
                    Cargando usuarios...
                  </div>
                </td>
              </tr>
              <tr v-else-if="usuarios.length === 0" class="bg-white">
                <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                  No se encontraron usuarios
                </td>
              </tr>
              <tr v-else v-for="usuario in usuarios" :key="usuario.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                         :class="getAvatarClass(usuario.tipo)">
                      {{ getInitials(usuario.nombre) }}
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ usuario.nombre }}</div>
                      <div v-if="usuario.zona" class="text-xs text-gray-500">{{ usuario.zona }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-700">
                    <div v-if="usuario.email" class="flex items-center">
                      <span class="mr-2">📧</span>
                      {{ usuario.email }}
                    </div>
                    <div v-if="usuario.telefono" class="flex items-center mt-1">
                      <span class="mr-2">📱</span>
                      {{ usuario.telefono }}
                    </div>
                    <div v-if="!usuario.email && !usuario.telefono" class="text-gray-400">
                      Sin contacto
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getTipoClass(usuario.tipo)">
                    <span class="mr-1">{{ getTipoIcon(usuario.tipo) }}</span>
                    {{ usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span v-if="usuario.tipo === 'conductor'" 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer"
                        :class="usuario.activo === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                        @click="toggleEstado(usuario)">
                    <span class="mr-1">{{ usuario.activo === 'Activo' ? '✅' : '❌' }}</span>
                    {{ usuario.activo }}
                  </span>
                  <span v-else class="text-sm text-gray-500">-</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {{ usuario.fecha_registro }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button 
                      @click="verDetalles(usuario)"
                      class="text-green-700 hover:text-green-800 transition-colors"
                    >
                      👁️ Ver
                    </button>
                    <button 
                      @click="openEditModal(usuario)"
                      class="text-green-700 hover:text-green-800 transition-colors"
                    >
                      ✏️ Editar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Paginación -->
      <div v-if="pagination.totalPages > 1" class="mt-6 flex items-center justify-between">
        <div class="text-sm text-gray-600">
          Mostrando {{ usuarios.length }} de {{ pagination.totalItems }} usuarios
        </div>
        <div class="flex items-center space-x-2">
          <button 
            @click="changePage(pagination.currentPage - 1)"
            :disabled="!pagination.hasPrev"
            class="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            ← Anterior
          </button>
          
          <div class="flex space-x-1">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="changePage(page)"
              class="px-3 py-2 rounded-lg transition-colors"
              :class="page === pagination.currentPage 
                ? 'bg-green-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="changePage(pagination.currentPage + 1)"
            :disabled="!pagination.hasNext"
            class="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-green-700">
            ✏️ Editar {{ editingUser?.tipo === 'conductor' ? 'Conductor' : 'Usuario' }}
          </h3>
          <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form @submit.prevent="saveUser" class="space-y-4">
          <!-- Datos básicos -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
              <input 
                v-model="editForm.nombre" 
                required 
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input 
                v-model="editForm.email" 
                required 
                type="email"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <input 
                v-model="editForm.telefono" 
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nueva contraseña (opcional)</label>
              <input 
                v-model="editForm.password" 
                type="password"
                placeholder="Mínimo 6 caracteres"
                class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <!-- Campos específicos para conductores -->
          <div v-if="editingUser?.tipo === 'conductor'" class="border-t pt-4">
            <h4 class="text-lg font-medium text-green-700 mb-3">Datos del Conductor</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">RUT</label>
                <input 
                  v-model="editForm.rut" 
                  placeholder="Ej: 12.345.678-9"
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Patente</label>
                <input 
                  v-model="editForm.vehiculo_placa" 
                  placeholder="Ej: ABCD12"
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de vehículo</label>
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
                <label class="block text-sm font-medium text-gray-700 mb-2">Zona</label>
                <input 
                  v-model="editForm.zona" 
                  placeholder="Ej: Santiago Centro"
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                <input 
                  v-model="editForm.direccion" 
                  placeholder="Calle, número, comuna"
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div class="flex items-center">
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
import { ref, computed, onMounted, watch } from 'vue'
import { API_BASE_URL } from '../../config/api.js'

// Estado
const usuarios = ref([])
const loading = ref(false)
const stats = ref({ totalClientes: 0, totalConductores: 0, conductoresActivos: 0 })
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  hasNext: false,
  hasPrev: false
})

// Filtros
const filters = ref({
  busqueda: '',
  tipo: 'todos',
  estado: 'todos'
})

// Modal de edición
const showEditModal = ref(false)
const editingUser = ref(null)
const editLoading = ref(false)
const editMessage = ref('')
const editForm = ref({
  nombre: '',
  email: '',
  telefono: '',
  password: '',
  rut: '',
  vehiculo_placa: '',
  vehiculo_tipo: '',
  direccion: '',
  zona: '',
  activo: true
})

// Computed
const visiblePages = computed(() => {
  const current = pagination.value.currentPage
  const total = pagination.value.totalPages
  const pages = []
  
  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i)
  }
  
  return pages
})

// Métodos
const loadUsuarios = async () => {
  try {
    loading.value = true
    const params = new URLSearchParams({
      page: pagination.value.currentPage,
      limit: pagination.value.itemsPerPage,
      ...filters.value
    })
    
    const response = await fetch(`${API_BASE_URL}/api/admin/usuarios?${params}`)
    const data = await response.json()
    
    usuarios.value = data.usuarios || []
    pagination.value = data.pagination || pagination.value
    
  } catch (error) {
    console.error('❌ Error al cargar usuarios:', error)
    usuarios.value = []
  } finally {
    loading.value = false
  }
}

const loadStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/usuarios/stats`)
    const data = await response.json()
    stats.value = data
  } catch (error) {
    console.error('❌ Error al cargar estadísticas:', error)
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.currentPage = page
    loadUsuarios()
  }
}

const toggleEstado = async (usuario) => {
  if (usuario.tipo !== 'conductor') return
  
  try {
    const nuevoEstado = usuario.activo === 'Activo' ? false : true
    
    const response = await fetch(`${API_BASE_URL}/api/admin/usuarios/${usuario.id}/estado`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activo: nuevoEstado })
    })
    
    if (response.ok) {
      usuario.activo = nuevoEstado ? 'Activo' : 'Inactivo'
      await loadStats() // Actualizar estadísticas
    }
  } catch (error) {
    console.error('❌ Error al cambiar estado:', error)
  }
}

const verDetalles = (usuario) => {
  console.log('Ver detalles:', usuario)
  // TODO: Implementar modal de detalles
}

const editarConductor = (usuario) => {
  openEditModal(usuario)
}

const openEditModal = (usuario) => {
  editingUser.value = usuario
  editForm.value = {
    nombre: usuario.nombre || '',
    email: usuario.email || '',
    telefono: usuario.telefono || '',
    password: '',
    rut: usuario.rut || '',
    vehiculo_placa: usuario.vehiculo_placa || '',
    vehiculo_tipo: usuario.vehiculo_tipo || '',
    direccion: usuario.direccion || '',
    zona: usuario.zona || '',
    activo: usuario.activo === 'Activo'
  }
  editMessage.value = ''
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingUser.value = null
  editForm.value = {
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    rut: '',
    vehiculo_placa: '',
    vehiculo_tipo: '',
    direccion: '',
    zona: '',
    activo: true
  }
  editMessage.value = ''
}

const saveUser = async () => {
  try {
    editLoading.value = true
    editMessage.value = ''
    
    const response = await fetch(`${API_BASE_URL}/api/admin/usuarios/${editingUser.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm.value)
    })
    
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Error al actualizar usuario')
    
    editMessage.value = '✅ Usuario actualizado correctamente'
    
    // Actualizar la lista después de un breve delay
    setTimeout(async () => {
      await loadUsuarios()
      await loadStats()
      closeEditModal()
    }, 1500)
    
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error)
    editMessage.value = `❌ Error: ${error.message}`
  } finally {
    editLoading.value = false
  }
}

// Utilidades
const getInitials = (nombre) => {
  return nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
}

const getAvatarClass = (tipo) => {
  const classes = {
    cliente: 'bg-green-600 text-white',
    conductor: 'bg-green-600 text-white',
    admin: 'bg-purple-600 text-white'
  }
  return classes[tipo] || 'bg-gray-600 text-white'
}

const getTipoClass = (tipo) => {
  const classes = {
    cliente: 'bg-green-100 text-green-800',
    conductor: 'bg-green-100 text-green-800',
    admin: 'bg-purple-100 text-purple-800'
  }
  return classes[tipo] || 'bg-gray-100 text-gray-800'
}

const getTipoIcon = (tipo) => {
  const icons = {
    cliente: '👤',
    conductor: '🚛',
    admin: '👑'
  }
  return icons[tipo] || '❓'
}

// Debounced search
let searchTimeout = null
const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    pagination.value.currentPage = 1
    loadUsuarios()
  }, 500)
}

// Watchers
watch(() => filters.value.tipo, () => {
  pagination.value.currentPage = 1
  loadUsuarios()
})

watch(() => filters.value.estado, () => {
  pagination.value.currentPage = 1
  loadUsuarios()
})

// Lifecycle
onMounted(() => {
  loadUsuarios()
  loadStats()
})
</script>