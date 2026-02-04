<template>
  <div class="fixed left-0 top-0 h-full w-64 bg-white text-gray-900 border-r border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0"
       :class="{ '-translate-x-full lg:translate-x-0': !isOpen, 'translate-x-0': isOpen }">
    
    <!-- Header del Sidebar -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
            <span class="text-sm font-bold">{{ userInitials }}</span>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ userName }}</p>
            <p class="text-xs text-gray-500 capitalize">{{ userRole }}</p>
          </div>
        </div>
        <button @click="toggleSidebar" class="lg:hidden text-gray-500 hover:text-gray-700">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Navegación -->
    <nav class="p-4 space-y-2">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
        :class="{ 'bg-green-100 text-green-800': $route.path === item.path }"
      >
        <span v-html="item.icon" class="w-5 h-5"></span>
        <span class="text-sm font-medium">{{ item.name }}</span>
        <span v-if="item.badge" class="ml-auto bg-green-600 text-white text-xs px-2 py-1 rounded-full">
          {{ item.badge }}
        </span>
      </NuxtLink>
    </nav>

    <!-- Footer del Sidebar -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
      <button 
        @click="logout"
        class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        <span class="text-sm font-medium">Cerrar Sesión</span>
      </button>
    </div>
  </div>

  <!-- Overlay para móvil -->
  <div v-if="isOpen" 
       @click="closeSidebar"
       class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from '#app'
import { getMenuItems, updateMenuBadges } from '../config/sidebarConfig.js'
import { useSidebar } from '../composables/useSidebar.js'

const { sidebarRef, reservasCount: globalReservasCount } = useSidebar()

const router = useRouter()
const isOpen = ref(false)

// Detectar si es desktop y abrir sidebar por defecto
onMounted(() => {
  if (window.innerWidth >= 1024) { // lg breakpoint
    isOpen.value = true
  }
})

// Props
const props = defineProps({
  userRole: {
    type: String,
    required: true
  }
})

// Datos del usuario
const userData = ref(null)

// Computed
const userName = computed(() => {
  return userData.value?.nombre || 'Usuario'
})

const userInitials = computed(() => {
  const name = userName.value
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
})

const menuItems = computed(() => {
  const baseMenu = getMenuItems(props.userRole)
  
  // Si es conductor, actualizar el badge de reservas
  if (props.userRole === 'conductor') {
    const badges = {
      '/conductor/reservas': globalReservasCount.value > 0 ? globalReservasCount.value.toString() : null
    }
    return updateMenuBadges(props.userRole, badges)
  }
  
  return baseMenu
})

// Métodos
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const closeSidebar = () => {
  isOpen.value = false
}

const logout = () => {
  localStorage.removeItem('usuario')
  router.push('/login')
}

// Función para cargar el número de reservas del conductor
const loadReservasCount = async () => {
  if (props.userRole !== 'conductor' || !userData.value) return
  
  try {
    console.log('🔢 [Sidebar] Cargando número de reservas para conductor...')
    const response = await fetch(`https://api.fletespro.cl/api/conductor/reservas/${userData.value.id}`)
    const data = await response.json()
    
    if (Array.isArray(data)) {
      globalReservasCount.value = data.length
      console.log(`🔢 [Sidebar] Reservas encontradas: ${globalReservasCount.value}`)
    }
  } catch (error) {
    console.error('❌ [Sidebar] Error al cargar número de reservas:', error)
    globalReservasCount.value = 0
  }
}

// Cargar datos del usuario al montar
onMounted(async () => {
  const storedUser = localStorage.getItem('usuario')
  if (storedUser) {
    userData.value = JSON.parse(storedUser)
    
    // Si es conductor, cargar el número de reservas
    if (props.userRole === 'conductor') {
      await loadReservasCount()
    }
  }
})

// Exponer métodos para el componente padre
defineExpose({
  toggleSidebar,
  closeSidebar,
  loadReservasCount
})
</script>
