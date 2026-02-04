<template>
  <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-teal-600 to-slate-900 p-4 md:p-6 text-white">
      <h2 class="text-xl md:text-2xl font-black mb-1 tracking-tighter">{{ $t('components.embalajesCalculator.title') }}</h2>
      <p class="text-sm text-teal-100">{{ $t('components.embalajesCalculator.subtitle') }}</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
      <!-- Left Panel: Selección -->
      <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        <!-- Tipo de Vivienda -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.embalajesCalculator.housingType') }}</span>
          </div>
          <div class="p-2 space-y-1.5 bg-white">
            <label
              v-for="tipo in tiposVivienda"
              :key="tipo.id"
              class="flex items-center justify-between p-1.5 bg-slate-50 rounded-md hover:bg-teal-50 transition-all cursor-pointer"
              :class="{ 'ring-2 ring-teal-600 bg-teal-50': selectedTipo === tipo.id }"
            >
              <div class="flex-1">
                <p class="font-bold text-slate-900 text-[11px]">{{ tipo.name }}</p>
                <p class="text-[10px] text-slate-500">{{ tipo.habitaciones }}</p>
              </div>
              <input
                type="radio"
                :value="tipo.id"
                v-model="selectedTipo"
                class="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>

        <!-- Objetos Especiales -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <button
            @click="toggleCategory('especiales')"
            class="w-full px-3 py-2 flex items-center justify-between bg-slate-50 hover:bg-teal-50 transition-all"
          >
            <span class="font-black text-slate-900 text-xs">{{ $t('components.embalajesCalculator.specialItems') }}</span>
            <svg
              :class="['w-4 h-4 text-slate-400 transition-transform', openCategories['especiales'] ? 'rotate-180' : '']"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-screen"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 max-h-screen"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="openCategories['especiales']" class="p-2 space-y-1.5 bg-white">
              <div
                v-for="item in objetosEspeciales"
                :key="item.id"
                class="flex items-center justify-between p-1.5 bg-slate-50 rounded-md hover:bg-teal-50 transition-all"
              >
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-slate-900 text-[11px] truncate">{{ item.name }}</p>
                  <p class="text-[10px] text-slate-500">+{{ formatCLP(item.precio) }}</p>
                </div>
                <div class="flex items-center gap-1.5 ml-2">
                  <button
                    @click="decreaseItem(item.id)"
                    :disabled="getItemCount(item.id) === 0"
                    class="w-6 h-6 rounded-md bg-slate-200 text-slate-700 font-black text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition-all flex items-center justify-center"
                  >
                    −
                  </button>
                  <span class="w-6 text-center font-black text-slate-900 text-xs">{{ getItemCount(item.id) }}</span>
                  <button
                    @click="increaseItem(item.id)"
                    class="w-6 h-6 rounded-md bg-teal-600 text-white font-black text-xs hover:bg-teal-700 transition-all flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Tipo de Servicio -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.embalajesCalculator.serviceType') }}</span>
          </div>
          <div class="p-2 space-y-1.5 bg-white">
            <label
              v-for="servicio in tiposServicio"
              :key="servicio.id"
              class="flex items-center justify-between p-1.5 bg-slate-50 rounded-md hover:bg-teal-50 transition-all cursor-pointer"
              :class="{ 'ring-2 ring-teal-600 bg-teal-50': selectedServicio === servicio.id }"
            >
              <div class="flex-1">
                <p class="font-bold text-slate-900 text-[11px]">{{ servicio.name }}</p>
                <p class="text-[10px] text-slate-500">{{ servicio.desc }}</p>
              </div>
              <input
                type="radio"
                :value="servicio.id"
                v-model="selectedServicio"
                class="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>
      </div>

      <!-- Right Panel: Resumen y Cálculo -->
      <div class="lg:sticky lg:top-6 h-fit">
        <div class="bg-slate-900 rounded-2xl p-4 md:p-6 text-white space-y-4">
          <h3 class="text-lg md:text-xl font-black mb-2">{{ $t('components.embalajesCalculator.calculationSummary') }}</h3>
          
          <!-- Precio Base -->
          <div class="bg-slate-800 rounded-xl p-3">
            <div class="flex justify-between items-center mb-1">
              <span class="text-slate-300 text-xs font-medium">{{ $t('components.embalajesCalculator.basePrice') }}</span>
              <span class="text-xl font-black text-teal-400">{{ formatCLP(basePrice) }}</span>
            </div>
            <div class="text-[10px] text-slate-400 space-y-0.5">
              <p>{{ getTipoViviendaName() }}: {{ formatCLP(basePrice) }}</p>
            </div>
          </div>

          <!-- Objetos Especiales -->
          <div v-if="extrasPrice > 0" class="bg-slate-800 rounded-xl p-3">
            <p class="text-xs text-slate-300 mb-0.5">{{ $t('components.embalajesCalculator.specialItemsPrice') }}</p>
            <p class="text-lg font-black text-teal-400">{{ formatCLP(extrasPrice) }}</p>
            <div class="text-[10px] text-slate-400 mt-0.5 space-y-0.5">
              <p v-for="extra in selectedExtras" :key="extra.id">
                {{ extra.name }} ({{ extra.count }}): +{{ formatCLP(extra.precio * extra.count) }}
              </p>
            </div>
          </div>

          <!-- Desglose de Precios -->
          <div class="space-y-1.5 border-t border-slate-700 pt-3">
            <div class="flex justify-between text-xs">
              <span class="text-slate-300">{{ $t('components.embalajesCalculator.service') }} {{ getServicioName() }}</span>
              <span class="font-bold">{{ formatCLP(servicioPrice) }}</span>
            </div>

            <div class="border-t border-slate-700 pt-2 mt-2">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-bold">{{ $t('components.embalajesCalculator.totalPrice') }}</span>
                <span class="text-2xl font-black text-teal-400">{{ formatCLP(totalPrice) }}</span>
              </div>
              <p class="text-[10px] text-slate-400 mt-1">
                * Incluye materiales y mano de obra profesional
              </p>
            </div>
          </div>

          <!-- CTA -->
          <button
            @click="requestQuote"
            class="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all transform hover:scale-105 mt-3"
          >
            {{ $t('components.embalajesCalculator.requestQuote') }}
          </button>

          <p class="text-[10px] text-slate-400 text-center">
            * Precio estimado. Presupuesto final tras inspección.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Estado
const items = ref({})
const selectedTipo = ref('estudio')
const selectedServicio = ref('completo')
const openCategories = ref({
  'especiales': false
})

// Tipos de vivienda (precios en CLP)
const tiposVivienda = [
  { id: 'estudio', name: 'Estudio (1 habitación)', habitaciones: '1 hab', precio: 120000 },
  { id: 'piso-pequeño', name: 'Departamento Pequeño', habitaciones: '2 habitaciones', precio: 200000 },
  { id: 'piso-mediano', name: 'Departamento Mediano', habitaciones: '3 habitaciones', precio: 320000 },
  { id: 'piso-grande', name: 'Departamento Grande', habitaciones: '4+ habitaciones', precio: 480000 },
  { id: 'casa', name: 'Casa', habitaciones: '5+ habitaciones', precio: 640000 }
]

// Objetos especiales (precios en CLP)
const objetosEspeciales = [
  { id: 'piano', name: 'Piano', precio: 160000 },
  { id: 'obras-arte', name: 'Obras de Arte', precio: 120000 },
  { id: 'antiguedades', name: 'Antigüedades', precio: 80000 },
  { id: 'electrodomestico-grande', name: 'Electrodoméstico Grande', precio: 40000 },
  { id: 'vitrina', name: 'Vitrina / Mueble Vidrio', precio: 64000 }
]

// Tipos de servicio
const tiposServicio = [
  { id: 'completo', name: 'Embalaje Completo', desc: 'Todo incluido', factor: 1.0 },
  { id: 'parcial', name: 'Embalaje Parcial', desc: 'Solo frágiles', factor: 0.6 }
]

function formatCLP (value) {
  return '$' + Math.round(Number(value)).toLocaleString('es-CL') + ' CLP'
}

// Funciones
const toggleCategory = (categoryName) => {
  openCategories.value[categoryName] = !openCategories.value[categoryName]
}

const getItemCount = (itemId) => {
  return items.value[itemId] || 0
}

const increaseItem = (itemId) => {
  if (!items.value[itemId]) {
    items.value[itemId] = 0
  }
  items.value[itemId]++
}

const decreaseItem = (itemId) => {
  if (items.value[itemId] > 0) {
    items.value[itemId]--
    if (items.value[itemId] === 0) {
      delete items.value[itemId]
    }
  }
}

const getTipoViviendaName = () => {
  const tipo = tiposVivienda.find(t => t.id === selectedTipo.value)
  return tipo ? tipo.name : 'Estudio'
}

const getServicioName = () => {
  const servicio = tiposServicio.find(s => s.id === selectedServicio.value)
  return servicio ? servicio.name : 'Completo'
}

// Cálculos
const basePrice = computed(() => {
  const tipo = tiposVivienda.find(t => t.id === selectedTipo.value)
  return tipo ? tipo.precio : 120000
})

const selectedExtras = computed(() => {
  return objetosEspeciales
    .map(item => ({
      id: item.id,
      name: item.name,
      precio: item.precio,
      count: getItemCount(item.id)
    }))
    .filter(extra => extra.count > 0)
})

const extrasPrice = computed(() => {
  return selectedExtras.value.reduce((sum, extra) => sum + (extra.precio * extra.count), 0)
})

const servicio = computed(() => {
  return tiposServicio.find(s => s.id === selectedServicio.value)
})

const servicioPrice = computed(() => {
  const subtotal = basePrice.value + extrasPrice.value
  return subtotal * (servicio.value ? servicio.value.factor : 1.0)
})

const totalPrice = computed(() => {
  return servicioPrice.value
})

const requestQuote = () => {
  alert(`Presupuesto de embalaje solicitado:\n\nTipo: ${getTipoViviendaName()}\nServicio: ${getServicioName()}\nObjetos especiales: ${selectedExtras.value.length}\nPrecio total: ${formatCLP(totalPrice.value)}`)
}
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #14b8a6;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #0d9488;
}
</style>

