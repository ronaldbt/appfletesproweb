<template>
  <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-teal-600 to-slate-900 p-4 md:p-6 text-white">
      <h2 class="text-xl md:text-2xl font-black mb-1 tracking-tighter">{{ $t('components.transporteFrioCalculator.title') }}</h2>
      <p class="text-sm text-teal-100">{{ $t('components.transporteFrioCalculator.subtitle') }}</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
      <!-- Left Panel: Selección -->
      <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        <!-- Rango de Temperatura -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.transporteFrioCalculator.temperatureRange') }}</span>
          </div>
          <div class="p-2 space-y-1.5 bg-white">
            <label
              v-for="temp in temperaturas"
              :key="temp.id"
              class="flex items-center justify-between p-2 bg-slate-50 rounded-lg hover:bg-teal-50 transition-all cursor-pointer"
              :class="{ 'ring-2 ring-teal-600 bg-teal-50': selectedTemperatura === temp.id }"
            >
              <div class="flex-1">
                <p class="font-bold text-slate-900 text-[11px]">{{ temp.name }}</p>
                <p class="text-[10px] text-slate-500">{{ temp.range }}°C</p>
              </div>
              <input
                type="radio"
                :value="temp.id"
                v-model="selectedTemperatura"
                class="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>

        <!-- Tipo de Producto -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.transporteFrioCalculator.productType') }}</span>
          </div>
          <div class="p-2 space-y-1.5 bg-white">
            <label
              v-for="producto in productos"
              :key="producto.id"
              class="flex items-center justify-between p-1.5 bg-slate-50 rounded-md hover:bg-teal-50 transition-all cursor-pointer"
              :class="{ 'ring-2 ring-teal-600 bg-teal-50': selectedProducto === producto.id }"
            >
              <div class="flex-1">
                <p class="font-bold text-slate-900 text-[11px]">{{ producto.name }}</p>
                <p class="text-[10px] text-slate-500">{{ producto.desc }}</p>
              </div>
              <input
                type="radio"
                :value="producto.id"
                v-model="selectedProducto"
                class="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>

        <!-- Distancia -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.transporteFrioCalculator.distance') }}</span>
          </div>
          <div class="p-3 bg-white">
            <input
              type="number"
              v-model.number="distancia"
              min="0"
              step="1"
              :placeholder="$t('components.transporteFrioCalculator.distancePlaceholder')"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 font-medium text-sm"
            />
            <p class="text-[10px] text-slate-500 mt-1">{{ $t('components.transporteFrioCalculator.distanceNote') }}</p>
          </div>
        </div>

        <!-- Tipo de Transporte -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.transporteFrioCalculator.transportType') }}</span>
          </div>
          <div class="p-2 space-y-1.5 bg-white">
            <label
              v-for="tipo in tiposTransporte"
              :key="tipo.id"
              class="flex items-center justify-between p-1.5 bg-slate-50 rounded-md hover:bg-teal-50 transition-all cursor-pointer"
              :class="{ 'ring-2 ring-teal-600 bg-teal-50': selectedTipo === tipo.id }"
            >
              <div class="flex-1">
                <p class="font-bold text-slate-900 text-[11px]">{{ tipo.name }}</p>
                <p class="text-[10px] text-slate-500">{{ tipo.desc }}</p>
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
      </div>

      <!-- Right Panel: Resumen y Cálculo -->
      <div class="lg:sticky lg:top-6 h-fit">
        <div class="bg-slate-900 rounded-2xl p-4 md:p-6 text-white space-y-4">
          <h3 class="text-lg md:text-xl font-black mb-2">{{ $t('components.transporteFrioCalculator.calculationSummary') }}</h3>
          
          <!-- Precio Base -->
          <div class="bg-slate-800 rounded-xl p-3">
            <div class="flex justify-between items-center mb-1">
              <span class="text-slate-300 text-xs font-medium">{{ $t('components.transporteFrioCalculator.basePrice') }}</span>
              <span class="text-xl font-black text-teal-400">{{ formatCLP(basePrice) }}</span>
            </div>
            <div class="text-[10px] text-slate-400 space-y-0.5">
              <p>Distancia: {{ distancia }} km</p>
              <p v-if="distancia > 0">Tarifa: {{ formatCLP(getDistanceRate()) }}</p>
            </div>
          </div>

          <!-- Desglose de Precios -->
          <div class="space-y-1.5 border-t border-slate-700 pt-3">
            <div class="flex justify-between text-xs">
              <span class="text-slate-300">Temperatura ({{ getTemperaturaName() }})</span>
              <span class="font-bold">{{ formatCLP(temperaturaPrice) }}</span>
            </div>

            <div class="flex justify-between text-xs">
              <span class="text-slate-300">{{ $t('components.transporteFrioCalculator.product') }} ({{ getProductoName() }})</span>
              <span class="font-bold">{{ formatCLP(productoPrice) }}</span>
            </div>

            <div class="flex justify-between text-xs">
              <span class="text-slate-300">{{ $t('components.transporteFrioCalculator.type') }} ({{ getTipoName() }})</span>
              <span class="font-bold">{{ formatCLP(tipoPrice) }}</span>
            </div>

            <div class="border-t border-slate-700 pt-2 mt-2">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-bold">{{ $t('components.transporteFrioCalculator.totalPrice') }}</span>
                <span class="text-2xl font-black text-teal-400">{{ formatCLP(totalPrice) }}</span>
              </div>
              <p class="text-[10px] text-slate-400 mt-1">
                {{ $t('components.transporteFrioCalculator.coldChainGuarantee') }}
              </p>
            </div>
          </div>

          <!-- CTA -->
          <button
            @click="requestQuote"
            class="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all transform hover:scale-105 mt-3"
          >
            {{ $t('components.transporteFrioCalculator.requestQuote') }}
          </button>

          <p class="text-[10px] text-slate-400 text-center">
            {{ $t('components.transporteFrioCalculator.estimatedPriceNote') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Estado
const distancia = ref(0)
const selectedTemperatura = ref('congelado')
const selectedProducto = ref('alimentos')
const selectedTipo = ref('local')

// Rangos de temperatura
const temperaturas = [
  { id: 'congelado', name: 'Congelado', range: '-18°C', factor: 1.2 },
  { id: 'refrigerado', name: 'Refrigerado', range: '0-4°C', factor: 1.0 },
  { id: 'farmaceutico', name: 'Farmacéutico', range: '2-8°C', factor: 1.3 }
]

// Tipos de producto
const productos = [
  { id: 'alimentos', name: 'Alimentos Frescos', desc: 'Frutas, verduras, lácteos', factor: 1.0 },
  { id: 'pescado', name: 'Pescado', desc: 'Pescado fresco', factor: 1.2 },
  { id: 'carne', name: 'Carne', desc: 'Carne fresca', factor: 1.1 },
  { id: 'farmaceutico', name: 'Farmacéutico', desc: 'Medicamentos, vacunas', factor: 1.5 },
  { id: 'flores', name: 'Flores', desc: 'Flores frescas', factor: 1.1 },
  { id: 'bebidas', name: 'Bebidas', desc: 'Bebidas frías', factor: 0.9 }
]

// Tipos de transporte (Chile)
const tiposTransporte = [
  { id: 'local', name: 'Local', desc: 'Santiago, Región Metropolitana', factor: 1.0 },
  { id: 'provincial', name: 'Regional', desc: 'Misma región', factor: 1.3 },
  { id: 'nacional', name: 'Nacional', desc: 'Santiago a regiones', factor: 1.8 },
  { id: 'internacional', name: 'Internacional', desc: 'Chile al exterior', factor: 2.5 }
]

// Tarifa base por km en CLP (referencia transporte frío Chile)
function formatCLP (value) {
  return '$' + Math.round(value).toLocaleString('es-CL') + ' CLP'
}

const getDistanceRate = () => {
  if (distancia.value <= 0) return 0
  if (distancia.value <= 5) return 6000
  if (distancia.value <= 10) return 9000
  if (distancia.value <= 20) return 14000
  if (distancia.value <= 30) return 20000
  return 20000 + ((distancia.value - 30) * 400)
}

const getTemperaturaName = () => {
  const temp = temperaturas.find(t => t.id === selectedTemperatura.value)
  return temp ? temp.name : 'Refrigerado'
}

const getProductoName = () => {
  const prod = productos.find(p => p.id === selectedProducto.value)
  return prod ? prod.name : 'Alimentos'
}

const getTipoName = () => {
  const tipo = tiposTransporte.find(t => t.id === selectedTipo.value)
  return tipo ? tipo.name : 'Local'
}

// Cálculos
const basePrice = computed(() => {
  if (distancia.value <= 0) return 0
  return getDistanceRate()
})

const temperatura = computed(() => {
  return temperaturas.find(t => t.id === selectedTemperatura.value) || temperaturas[1]
})

const producto = computed(() => {
  return productos.find(p => p.id === selectedProducto.value) || productos[0]
})

const tipo = computed(() => {
  return tiposTransporte.find(t => t.id === selectedTipo.value) || tiposTransporte[0]
})

const temperaturaPrice = computed(() => {
  return basePrice.value * (temperatura.value.factor - 1.0)
})

const productoPrice = computed(() => {
  return basePrice.value * (producto.value.factor - 1.0)
})

const tipoPrice = computed(() => {
  return basePrice.value * (tipo.value.factor - 1.0)
})

const totalPrice = computed(() => {
  if (distancia.value <= 0) return 0
  return basePrice.value * temperatura.value.factor * producto.value.factor * tipo.value.factor
})

const requestQuote = () => {
  alert(`Presupuesto de transporte en frío solicitado:\n\nTemperatura: ${getTemperaturaName()}\nProducto: ${getProductoName()}\nTipo: ${getTipoName()}\nDistancia: ${distancia.value} km\nPrecio total: ${formatCLP(totalPrice.value)}`)
}
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
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

