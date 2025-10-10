// Composables/useSidebar.js
import { ref } from 'vue'

// Estado global del sidebar
const sidebarRef = ref(null)
const reservasCount = ref(0)

export function useSidebar() {
  const setSidebarRef = (ref) => {
    sidebarRef.value = ref
  }

  const updateReservasCount = async () => {
    if (sidebarRef.value && typeof sidebarRef.value.loadReservasCount === 'function') {
      await sidebarRef.value.loadReservasCount()
    }
  }

  const setReservasCount = (count) => {
    reservasCount.value = count
  }

  return {
    sidebarRef,
    reservasCount,
    setSidebarRef,
    updateReservasCount,
    setReservasCount
  }
}
