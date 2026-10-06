<template>
  <!-- Sidebar lateral (solo desktop) -->
  <div class="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white text-slate-900 border-r border-slate-200 z-50 transform transition-transform duration-300 lg:translate-x-0 shadow-xl"
       :class="{ '-translate-x-full lg:translate-x-0': !isOpen, 'translate-x-0': isOpen }">
    
    <!-- Header del Sidebar -->
    <div class="p-4 border-b border-slate-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg shadow-teal-500/30">
            {{ userInitials }}
          </div>
          <div>
            <p class="text-sm font-bold text-slate-900">{{ userName }}</p>
            <p class="text-xs text-slate-500 capitalize">{{ userRole }}</p>
          </div>
        </div>
        <button @click="toggleSidebar" class="lg:hidden text-slate-500 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Navegación -->
    <nav class="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-8.5rem)]">
      <template v-for="item in menuItems" :key="item.path">
        <!-- Ítem con submenú -->
        <div v-if="item.children?.length" class="space-y-0.5">
          <button
            type="button"
            class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200 font-medium"
            :class="{ 'bg-teal-50 text-teal-800 border border-teal-200': isGroupActive(item) }"
            @click="toggleGroup(item.path)"
          >
            <span v-html="item.icon" class="w-5 h-5 text-teal-600 shrink-0"></span>
            <span class="text-sm flex-1 text-left">{{ item.name }}</span>
            <svg
              class="w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0"
              :class="{ 'rotate-180': isGroupOpen(item.path) }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-show="isGroupOpen(item.path)" class="ml-3 pl-3 border-l border-slate-200 space-y-0.5">
            <NuxtLink
              v-for="child in item.children"
              :key="child.path"
              :to="child.path"
              class="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors text-sm"
              :class="{ 'bg-teal-50 text-teal-800 font-semibold': isExactActive(child.path) }"
            >
              <span v-if="child.icon" v-html="child.icon" class="w-4 h-4 text-teal-600 shrink-0"></span>
              <span>{{ child.name }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Ítem simple -->
        <NuxtLink
          v-else
          :to="item.path"
          class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200 font-medium"
          :class="{ 'bg-teal-50 text-teal-800 border border-teal-200': isExactActive(item.path) }"
        >
          <span v-html="item.icon" class="w-5 h-5 text-teal-600"></span>
          <span class="text-sm">{{ item.name }}</span>
          <span v-if="item.badge" class="ml-auto bg-teal-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {{ item.badge }}
          </span>
        </NuxtLink>
      </template>
    </nav>

    <!-- Footer del Sidebar -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50/50">
      <button 
        @click="logout"
        class="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 font-medium"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        <span class="text-sm">Cerrar Sesión</span>
      </button>
    </div>
  </div>

  <!-- Overlay para móvil (cuando se usa sidebar lateral) -->
  <div v-if="isOpen" 
       @click="closeSidebar"
       class="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm">
  </div>

  <!-- Barra inferior móvil -->
  <nav class="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden items-stretch overflow-x-auto bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] safe-area-pb scrollbar-hide">
    <NuxtLink
      v-for="item in mobileMenuItems"
      :key="item.path"
      :to="item.path"
      class="relative flex flex-col items-center justify-center flex-shrink-0 min-w-[56px] max-w-[72px] py-2 px-1 text-slate-600 hover:text-teal-600 hover:bg-teal-50/50 transition-colors"
      :class="{ 'text-teal-700 bg-teal-50 border-t-2 border-teal-500': isMobileActive(item) }"
    >
      <span v-html="item.icon" class="w-6 h-6 text-current flex-shrink-0 mb-0.5 [&>svg]:w-6 [&>svg]:h-6"></span>
      <span class="text-[10px] font-semibold truncate w-full text-center">{{ item.name }}</span>
      <span v-if="item.badge" class="absolute top-0.5 right-1/4 bg-teal-600 text-white text-[10px] min-w-[14px] h-[14px] rounded-full flex items-center justify-center font-bold">{{ item.badge }}</span>
    </NuxtLink>
    <button
      @click="logout"
      class="flex flex-col items-center justify-center flex-shrink-0 min-w-[56px] py-2 px-1 text-slate-600 hover:text-red-600 hover:bg-red-50/50 transition-colors"
      title="Cerrar sesión"
    >
      <svg class="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
      </svg>
      <span class="text-[10px] font-semibold">Salir</span>
    </button>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from '#app'
import { getMenuItems, updateMenuBadges } from '../config/sidebarConfig.js'
import { useSidebar } from '../composables/useSidebar.js'

const { reservasCount: globalReservasCount } = useSidebar()

const router = useRouter()
const route = useRoute()
const isOpen = ref(false)
const openGroups = ref({})

onMounted(() => {
  if (window.innerWidth >= 1024) {
    isOpen.value = true
  }
})

const props = defineProps({
  userRole: {
    type: String,
    required: true
  }
})

const userData = ref(null)

const userName = computed(() => {
  return userData.value?.nombre || 'Usuario'
})

const userInitials = computed(() => {
  const name = userName.value
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
})

const menuItems = computed(() => {
  const baseMenu = getMenuItems(props.userRole)

  if (props.userRole === 'conductor') {
    const badges = {
      '/conductor/reservas': globalReservasCount.value > 0 ? globalReservasCount.value.toString() : null
    }
    return updateMenuBadges(props.userRole, badges)
  }

  return baseMenu
})

/** En móvil solo ítems de primer nivel (los submenús se navegan desde el hub). */
const mobileMenuItems = computed(() => menuItems.value)

function isExactActive (path) {
  return route.path === path
}

function isGroupActive (item) {
  if (route.path === item.path) return true
  return (item.children || []).some(child => route.path === child.path || route.path.startsWith(child.path + '/'))
}

function isMobileActive (item) {
  if (item.children?.length) {
    return isGroupActive(item)
  }
  return isExactActive(item.path)
}

function isGroupOpen (path) {
  return !!openGroups.value[path]
}

function toggleGroup (path) {
  openGroups.value = {
    ...openGroups.value,
    [path]: !openGroups.value[path]
  }
}

function syncOpenGroupsFromRoute () {
  for (const item of menuItems.value) {
    if (item.children?.length && isGroupActive(item)) {
      openGroups.value = { ...openGroups.value, [item.path]: true }
    }
  }
}

watch(() => route.path, syncOpenGroupsFromRoute, { immediate: true })

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

const loadReservasCount = async () => {
  if (props.userRole !== 'conductor' || !userData.value) return

  try {
    const response = await fetch(`https://api.fletespro.cl/api/conductor/reservas/${userData.value.id}`)
    const data = await response.json()

    if (Array.isArray(data)) {
      globalReservasCount.value = data.length
    }
  } catch (error) {
    console.error('❌ [Sidebar] Error al cargar número de reservas:', error)
    globalReservasCount.value = 0
  }
}

onMounted(async () => {
  const storedUser = localStorage.getItem('usuario')
  if (storedUser) {
    userData.value = JSON.parse(storedUser)

    if (props.userRole === 'conductor') {
      await loadReservasCount()
    }
  }
})

defineExpose({
  toggleSidebar,
  closeSidebar,
  loadReservasCount
})
</script>
