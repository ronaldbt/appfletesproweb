<template>
  <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-teal-600 to-slate-900 p-4 md:p-6 text-white">
      <h2 class="text-xl md:text-2xl font-black mb-1 tracking-tighter">{{ $t('components.guardamueblesCalculator.title') }}</h2>
      <p class="text-sm text-teal-100">{{ $t('components.guardamueblesCalculator.subtitle') }}</p>
    </div>

    <div
      v-if="volumeHintBanner"
      class="px-4 py-3 bg-amber-50 border-b border-amber-200/80 text-center"
      role="status"
    >
      <p class="text-xs md:text-sm font-bold text-amber-950 leading-snug">{{ volumeHintBanner }}</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
      <!-- Left Panel: Selección de Objetos -->
      <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        <!-- Categorías con Acordeón -->
        <div v-for="category in categories" :key="category.name" class="border border-slate-200 rounded-lg overflow-hidden">
          <button
            @click="toggleCategory(category.name)"
            class="w-full px-3 py-2 flex items-center justify-between bg-slate-50 hover:bg-teal-50 transition-all"
          >
            <div class="flex items-center gap-2">
              <component :is="category.icon" class="w-4 h-4 text-teal-600" />
              <span class="font-black text-slate-900 text-xs">{{ category.name }}</span>
              <span class="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded-full">
                {{ getCategoryCount(category.name) }}
              </span>
            </div>
            <svg
              :class="['w-4 h-4 text-slate-400 transition-transform', openCategories[category.name] ? 'rotate-180' : '']"
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
            <div v-if="openCategories[category.name]" class="p-2 space-y-1.5 bg-white">
              <div
                v-for="item in category.items"
                :key="item.id"
                class="flex items-center justify-between p-1.5 bg-slate-50 rounded-md hover:bg-teal-50 transition-all"
              >
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-slate-900 text-[11px] truncate">{{ item.name }}</p>
                  <p class="text-[10px] text-slate-500">{{ item.volume }} m³</p>
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

        <!-- Servicios Adicionales (Compacto) -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <button
            @click="toggleCategory('servicios')"
            class="w-full px-3 py-2 flex items-center justify-between bg-slate-50 hover:bg-teal-50 transition-all"
          >
            <span class="font-black text-slate-900 text-xs">{{ $t('components.guardamueblesCalculator.additionalServices') }}</span>
            <svg
              :class="['w-4 h-4 text-slate-400 transition-transform', openCategories['servicios'] ? 'rotate-180' : '']"
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
            <div v-if="openCategories['servicios']" class="p-2 space-y-1.5 bg-white">
              <label
                v-for="service in additionalServices"
                :key="service.id"
                class="flex items-center justify-between p-1.5 bg-slate-50 rounded-md hover:bg-teal-50 transition-all cursor-pointer"
              >
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-slate-900 text-[11px]">{{ service.name }}</p>
                  <p class="text-[10px] text-slate-500">{{ formatCLP(service.price) }}/mes</p>
                </div>
                <input
                  type="checkbox"
                  v-model="service.selected"
                  class="w-3.5 h-3.5 text-teal-600 rounded focus:ring-teal-500 ml-2"
                />
              </label>
            </div>
          </Transition>
        </div>

        <!-- Duración (Compacto) -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <button
            @click="toggleCategory('duracion')"
            class="w-full px-3 py-2 flex items-center justify-between bg-slate-50 hover:bg-teal-50 transition-all"
          >
            <span class="font-black text-slate-900 text-xs">{{ $t('components.guardamueblesCalculator.duration') }}</span>
            <span class="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded-full">
              {{ getDurationLabel() }}
            </span>
          </button>
          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-screen"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 max-h-screen"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="openCategories['duracion']" class="p-2 space-y-1.5 bg-white">
              <label
                v-for="duration in durations"
                :key="duration.months"
                class="flex items-center justify-between p-1.5 bg-slate-50 rounded-md hover:bg-teal-50 transition-all cursor-pointer"
                :class="{ 'ring-2 ring-teal-600 bg-teal-50': selectedDuration === duration.months }"
              >
                <div class="flex-1">
                  <p class="font-bold text-slate-900 text-[11px]">{{ duration.label }}</p>
                  <p class="text-[10px] text-slate-500" v-if="duration.discount">
                    -{{ duration.discount }}%
                  </p>
                </div>
                <input
                  type="radio"
                  :value="duration.months"
                  v-model="selectedDuration"
                  class="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
                />
              </label>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Right Panel: Resumen y Cálculo (Compacto) -->
      <div class="lg:sticky lg:top-6 h-fit">
        <div class="bg-slate-900 rounded-2xl p-4 md:p-6 text-white space-y-4">
          <h3 class="text-lg md:text-xl font-black mb-2">{{ $t('components.guardamueblesCalculator.calculationSummary') }}</h3>
          
          <!-- Volumen Total -->
          <div class="bg-slate-800 rounded-xl p-3">
            <div class="flex justify-between items-center mb-1">
              <span class="text-slate-300 text-xs font-medium">{{ $t('components.guardamueblesCalculator.totalVolume') }}</span>
              <span class="text-xl font-black text-teal-400">{{ totalVolume.toFixed(2) }} m³</span>
            </div>
            <div class="text-[10px] text-slate-400 space-y-0.5">
              <p>{{ $t('components.guardamueblesCalculator.objects') }}: {{ rawVolume.toFixed(2) }} m³</p>
              <p>{{ $t('components.guardamueblesCalculator.stacking') }}: +{{ (rawVolume * 0.15).toFixed(2) }} m³</p>
              <p v-if="needsMinimum" class="text-yellow-400">
                ⚠️ {{ $t('components.guardamueblesCalculator.minimum') }}
              </p>
            </div>
          </div>

          <!-- Contenedores -->
          <div v-if="containersNeeded > 0" class="bg-slate-800 rounded-xl p-3">
            <p class="text-[10px] text-slate-300 mb-0.5">{{ $t('components.guardamueblesCalculator.containers') }}</p>
            <p class="text-lg font-black text-teal-400">{{ containersNeeded }} unidades</p>
            <p class="text-[10px] text-slate-400 mt-0.5">
              ({{ containerSize }} m³ {{ $t('components.guardamueblesCalculator.perUnit') }})
            </p>
          </div>

          <!-- Desglose de Precios -->
          <div class="space-y-1.5 border-t border-slate-700 pt-3">
            <div class="flex justify-between text-xs">
              <span class="text-slate-300">{{ $t('components.guardamueblesCalculator.basePrice') }}</span>
              <span class="font-bold">{{ formatCLP(basePrice) }}</span>
            </div>

            <div v-if="insurancePrice > 0" class="flex justify-between text-xs">
              <span class="text-slate-300">{{ $t('components.guardamueblesCalculator.insurance') }}</span>
              <span class="font-bold">{{ formatCLP(insurancePrice) }}</span>
            </div>

            <div v-for="service in selectedAdditionalServices" :key="service.id" class="flex justify-between text-xs">
              <span class="text-slate-300">{{ service.name }}</span>
              <span class="font-bold">{{ formatCLP(service.price) }}</span>
            </div>

            <div v-if="discount > 0" class="flex justify-between text-xs text-teal-400">
              <span>{{ $t('components.guardamueblesCalculator.discount') }} ({{ discount }}%)</span>
              <span class="font-bold">-{{ formatCLP(discountAmount) }}</span>
            </div>

            <div class="border-t border-slate-700 pt-2 mt-2">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-bold">{{ $t('components.guardamueblesCalculator.monthly') }}</span>
                <span class="text-xl font-black text-teal-400">{{ formatCLP(monthlyPrice) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[10px] text-slate-400">Total ({{ selectedDuration }} meses)</span>
                <span class="text-lg font-black text-white">{{ formatCLP(totalPrice) }}</span>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <button
            @click="requestQuote"
            class="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all transform hover:scale-105 mt-3"
          >
            {{ $t('components.guardamueblesCalculator.requestQuote') }}
          </button>

          <p class="text-[10px] text-slate-400 text-center">
            {{ $t('components.guardamueblesCalculator.estimatedPriceNote') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  /** número = referencia m³; 'help' = mensaje para quien necesita ayuda */
  volumeHint: {
    type: [Number, String],
    default: null
  }
})

const volumeHintBanner = computed(() => {
  if (props.volumeHint === 'help') {
    return t('components.guardamueblesCalculator.volumeHintHelp')
  }
  if (typeof props.volumeHint === 'number' && !Number.isNaN(props.volumeHint)) {
    return t('components.guardamueblesCalculator.volumeHintM3', { n: props.volumeHint })
  }
  return ''
})

// Estado
const items = ref({})
const selectedDuration = ref(3)
const pricePerM3 = ref(6500) // Precio base Santiago: $6.500 CLP/m³
const openCategories = ref({
  'Salón y Comedor': false,
  'Dormitorio': false,
  'Electrodomésticos': false,
  'Cajas y Varios': false,
  'servicios': false,
  'duracion': false
})

// Servicios adicionales (precios en CLP)
const additionalServices = ref([
  {
    id: 'climatizado',
    name: 'Climatizado',
    description: 'Control temperatura',
    price: 15000,
    selected: false
  },
  {
    id: 'seguro-premium',
    name: 'Seguro Premium',
    description: 'Cobertura ampliada',
    price: 20000,
    selected: false
  },
  {
    id: 'acceso-24h',
    name: 'Acceso 24h',
    description: 'Acceso ilimitado',
    price: 5000,
    selected: false
  },
  {
    id: 'inventariado',
    name: 'Inventariado',
    description: 'Listado detallado',
    price: 50000,
    selected: false
  }
])

// Duraciones con descuentos
const durations = [
  { months: 1, label: '1 mes', discount: 0 },
  { months: 3, label: '3 meses', discount: 0 },
  { months: 6, label: '6 meses', discount: 5 },
  { months: 12, label: '12 meses', discount: 10 },
  { months: 24, label: '24 meses', discount: 15 }
]

// Inventario completo de objetos
const categories = [
  {
    name: 'Salón y Comedor',
    icon: () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
    ]),
    items: [
      { id: 'sofa-3plazas', name: 'Sofá 3 plazas', volume: 2.5 },
      { id: 'sofa-2plazas', name: 'Sofá 2 plazas', volume: 1.5 },
      { id: 'sillon', name: 'Sillón / Butaca', volume: 0.8 },
      { id: 'mesa-comedor', name: 'Mesa de comedor', volume: 1.2 },
      { id: 'silla-comedor', name: 'Silla de comedor', volume: 0.2 },
      { id: 'mueble-tv', name: 'Mueble TV (grande)', volume: 1.0 },
      { id: 'mesa-centro', name: 'Mesa de centro', volume: 0.4 }
    ]
  },
  {
    name: 'Dormitorio',
    icon: () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' })
    ]),
    items: [
      { id: 'cama-matrimonio', name: 'Cama Matrimonio (completa)', volume: 2.0 },
      { id: 'cama-individual', name: 'Cama Individual (completa)', volume: 1.2 },
      { id: 'mesita-noche', name: 'Mesita de noche', volume: 0.15 },
      { id: 'comoda', name: 'Cómoda / Sinfonier', volume: 0.8 },
      { id: 'armario-2puertas', name: 'Armario 2 puertas', volume: 1.5 }
    ]
  },
  {
    name: 'Electrodomésticos',
    icon: () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' })
    ]),
    items: [
      { id: 'frigorifico-combi', name: 'Frigorífico Combi', volume: 1.2 },
      { id: 'frigorifico-americano', name: 'Frigorífico Americano', volume: 2.2 },
      { id: 'lavadora', name: 'Lavadora / Lavavajillas', volume: 0.5 },
      { id: 'microondas', name: 'Microondas', volume: 0.1 }
    ]
  },
  {
    name: 'Cajas y Varios',
    icon: () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
    ]),
    items: [
      { id: 'caja-pequena', name: 'Caja Pequeña (Libros)', volume: 0.04 },
      { id: 'caja-mediana', name: 'Caja Mediana (Estándar)', volume: 0.07 },
      { id: 'caja-grande', name: 'Caja Grande (Varios)', volume: 0.1 },
      { id: 'caja-armario', name: 'Caja Armario (Ropa colgada)', volume: 0.4 },
      { id: 'bicicleta', name: 'Bicicleta', volume: 0.5 },
      { id: 'maleta-grande', name: 'Maleta grande', volume: 0.15 }
    ]
  }
]

// Funciones
const toggleCategory = (categoryName) => {
  openCategories.value[categoryName] = !openCategories.value[categoryName]
}

const getCategoryCount = (categoryName) => {
  const category = categories.find(c => c.name === categoryName)
  if (!category) return 0
  return category.items.reduce((sum, item) => sum + getItemCount(item.id), 0)
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

const getDurationLabel = () => {
  const duration = durations.find(d => d.months === selectedDuration.value)
  return duration ? duration.label : '3 meses'
}

// Cálculos
const rawVolume = computed(() => {
  let total = 0
  categories.forEach(category => {
    category.items.forEach(item => {
      const count = getItemCount(item.id)
      total += count * item.volume
    })
  })
  return total
})

const MIN_VOLUME_M3 = 1

const totalVolume = computed(() => {
  // Factor de apilamiento: +15%
  let volume = rawVolume.value * 1.15

  if (volume < MIN_VOLUME_M3) {
    volume = MIN_VOLUME_M3
  }

  return volume
})

const needsMinimum = computed(() => {
  const stacked = rawVolume.value * 1.15
  return stacked > 0 && stacked < MIN_VOLUME_M3
})

const finalVolume = computed(() => {
  return totalVolume.value
})

const containerSize = 7 // Contenedores de 7 m³
const containersNeeded = computed(() => {
  return Math.ceil(finalVolume.value / containerSize)
})

const basePrice = computed(() => {
  return finalVolume.value * pricePerM3.value
})

const insurancePrice = computed(() => {
  // Seguro aproximado: $1.000 CLP por m³
  return finalVolume.value * 1000
})

const selectedAdditionalServices = computed(() => {
  return additionalServices.value.filter(s => s.selected)
})

const additionalServicesPrice = computed(() => {
  return selectedAdditionalServices.value.reduce((sum, service) => sum + service.price, 0)
})

const discount = computed(() => {
  const duration = durations.find(d => d.months === selectedDuration.value)
  return duration ? duration.discount : 0
})

const subtotal = computed(() => {
  return basePrice.value + insurancePrice.value + additionalServicesPrice.value
})

const discountAmount = computed(() => {
  return subtotal.value * (discount.value / 100)
})

const monthlyPrice = computed(() => {
  return subtotal.value - discountAmount.value
})

const totalPrice = computed(() => {
  return monthlyPrice.value * selectedDuration.value
})

function formatCLP (value) {
  return '$' + Math.round(value).toLocaleString('es-CL') + ' CLP'
}

const requestQuote = () => {
  alert(`Presupuesto solicitado:\n\nVolumen: ${finalVolume.value.toFixed(2)} m³\nPrecio mensual: ${formatCLP(monthlyPrice.value)}\nDuración: ${selectedDuration.value} meses\nTotal: ${formatCLP(totalPrice.value)}`)
}
</script>

<style scoped>
/* Scrollbar personalizado */
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
