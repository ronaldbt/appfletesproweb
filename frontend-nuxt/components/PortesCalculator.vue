<template>
  <div :class="`max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row transition-all duration-700 ${isHero ? 'ring-[10px] ring-slate-200/40' : ''}`">
    <!-- Left Panel -->
    <div class="lg:w-2/3 p-4 md:p-6 bg-white">
      <div class="flex gap-2 mb-6 overflow-x-auto pb-3 scrollbar-hide">
        <button
          v-for="s in [1, 2, 3]"
          :key="s"
          @click="step = s"
          :class="step === s ? 'bg-slate-900 text-white shadow-xl scale-105' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'"
          class="flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-xl font-bold transition-all duration-300 text-sm"
        >
          <span :class="step === s ? 'border-teal-500' : 'border-slate-300'" class="w-6 h-6 rounded-full text-[10px] flex items-center justify-center border-2">{{ s }}</span>
          {{ s === 1 ? $t('calculator.step1') : s === 2 ? $t('calculator.step2') : $t('calculator.step3') }}
        </button>
      </div>

      <Transition
        mode="out-in"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-x-8"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-8"
      >
        <!-- Step 1: Route Selection -->
        <div v-if="step === 1" key="step1" class="space-y-5">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <label for="origen" class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <svg class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ $t('calculator.origin') }}
              </label>
              <input
                id="origen"
                ref="origenInput"
                v-model="origin"
                type="text"
                :placeholder="$t('calculator.originPlaceholder')"
                class="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-bold text-slate-900 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm text-sm"
              />
            </div>
            <div class="space-y-3">
              <label for="destino" class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <svg class="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ $t('calculator.destination') }}
              </label>
              <input
                id="destino"
                ref="destinoInput"
                v-model="destination"
                type="text"
                :placeholder="$t('calculator.destinationPlaceholder')"
                class="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3 font-bold text-slate-900 focus:border-teal-500 focus:bg-white outline-none transition-all shadow-sm text-sm"
              />
            </div>
          </div>

          <div class="relative aspect-[3/2] bg-slate-900 rounded-3xl overflow-hidden group border border-slate-800 shadow-inner">
            <div ref="mapContainer" class="w-full h-full"></div>
            <div v-if="origin && destination" class="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[9px] text-white font-black tracking-widest uppercase z-10 max-w-[calc(100%-2rem)] truncate">
              {{ $t('calculator.optimizedLogistics') }}: {{ origin.split(',')[0] }} ➔ {{ destination.split(',')[0] }}
            </div>
          </div>

          <button 
            @click="step = 2"
            class="w-full bg-slate-900 text-white py-3.5 rounded-xl font-black text-sm shadow-2xl flex items-center justify-center gap-3 hover:bg-teal-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {{ $t('calculator.configureLoad') }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        <!-- Step 2: Inventory -->
        <div v-else-if="step === 2" key="step2" class="space-y-5">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-xl font-black text-slate-900">{{ $t('calculator.digitalInventory') }}</h3>
            <span class="text-[9px] font-black text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg uppercase tracking-widest">{{ $t('calculator.technicalPrecision') }}</span>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              v-for="preset in presets"
              :key="preset.key"
              @click="addItem(preset)"
              class="p-4 bg-slate-50 border-2 border-slate-100 rounded-xl hover:border-teal-500 hover:bg-white hover:shadow-xl transition-all text-left flex flex-col gap-2 group hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              <svg class="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span class="font-bold text-[11px] text-slate-700 leading-tight tracking-tight">{{ preset.name }}</span>
            </button>
          </div>

          <div class="bg-slate-50 rounded-2xl p-4 h-[180px] overflow-y-auto space-y-2 border border-slate-200 shadow-inner custom-scrollbar">
            <div v-if="items.length === 0" class="h-full flex flex-col items-center justify-center text-slate-300 gap-4 opacity-40">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p class="font-black text-xs uppercase tracking-widest">{{ $t('calculator.selectBelongings') }}</p>
            </div>
            <TransitionGroup
              v-else
              name="list"
              tag="div"
              class="space-y-3"
            >
              <div
                v-for="item in items"
                :key="item.id"
                class="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-slate-100 group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <p class="font-black text-slate-900 text-xs">{{ item.name }}</p>
                    <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{{ item.volume }}m³</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div class="flex items-center bg-slate-100 rounded-xl border border-slate-200 px-1">
                    <button @click="updateQuantity(item.id, -1)" class="p-1.5 hover:text-teal-600 transition-colors">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span class="px-2 font-black text-xs w-6 text-center text-slate-900">{{ item.quantity }}</span>
                    <button @click="updateQuantity(item.id, 1)" class="p-1.5 hover:text-teal-600 transition-colors">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <button @click="updateQuantity(item.id, -999)" class="text-slate-300 hover:text-red-500 transition-all p-1.5">
                    <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </TransitionGroup>
          </div>

          <div class="flex gap-3">
            <button @click="step = 1" class="px-6 bg-slate-100 text-slate-600 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-colors">
              {{ $t('calculator.back') }}
            </button>
            <button 
              @click="step = 3"
              :disabled="items.length === 0"
              :class="items.length > 0 ? 'bg-slate-900 text-white shadow-slate-200 hover:bg-teal-600' : 'bg-slate-200 text-slate-400 cursor-not-allowed'"
              class="flex-grow py-2.5 rounded-xl font-black text-sm shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {{ $t('calculator.finishQuote') }}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Step 3: Final -->
        <div v-else-if="step === 3" key="step3" class="text-center py-5">
          <div class="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-teal-100 animate-check-in">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-2xl font-black text-slate-900 mb-2 tracking-tighter">{{ $t('calculator.quoteFinished') }}</h3>
          <p class="text-slate-500 text-xs mb-6 font-medium tracking-tight">{{ $t('calculator.artisanalCareGuaranteed') }}</p>
          
          <div class="bg-slate-950 p-8 rounded-3xl max-w-xs mx-auto shadow-2xl relative overflow-hidden group border border-slate-800 hover:scale-[1.02] transition-transform">
            <div class="absolute top-0 right-0 p-5">
              <svg class="text-teal-500/20 w-8 h-8 group-hover:text-teal-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <p class="text-[9px] font-black text-teal-500 uppercase tracking-[0.4em] mb-3">{{ $t('calculator.totalEstimatedPortesPro') }}</p>
            <div class="flex items-center justify-center gap-1">
              <span class="text-5xl font-black text-white tracking-tighter animate-price-in">{{ calculation.priceFormatted || calculation.price }}</span>
              <span class="text-xl font-bold text-teal-500">CLP</span>
            </div>
            <div class="mt-6 pt-5 border-t border-slate-800 flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
              <span>REG. METROPOLITANA</span>
              <span>FLETESPRO</span>
            </div>
          </div>

          <div class="mt-8 space-y-3">
            <button class="w-full bg-teal-600 text-white py-4 rounded-2xl font-black text-lg shadow-2xl shadow-teal-500/30 hover:bg-teal-500 transition-all hover:scale-[1.05] active:scale-[0.95]">
              {{ $t('calculator.reserveMove') }}
            </button>
            <p class="text-[9px] text-slate-400 font-black uppercase tracking-widest">{{ $t('calculator.immediateConfirmation') }}</p>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Right Panel (Summary) -->
    <div class="lg:w-1/3 bg-slate-950 p-5 md:p-8 text-white flex flex-col justify-between border-l border-slate-900 relative">
      <div class="absolute top-0 right-0 w-48 h-48 bg-teal-600/10 rounded-full blur-[80px] -z-10" />
      
      <div class="space-y-8">
        <div class="flex items-center justify-between border-b border-slate-900 pb-5">
          <h4 class="text-base font-black text-white tracking-tight">{{ $t('calculator.executiveSummary') }}</h4>
          <div class="flex gap-2">
            <div class="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            <div class="w-2 h-2 bg-teal-500 rounded-full animate-pulse" style="animation-delay: 0.5s" />
          </div>
        </div>
        
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 shadow-xl group">
              <svg class="text-teal-400 w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p class="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{{ $t('calculator.routePlanning') }}</p>
              <p class="font-black text-base leading-none text-white">{{ origin }} <span class="text-teal-500 px-2">➔</span> {{ destination }}</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 shadow-xl">
              <svg class="text-teal-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <p class="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{{ $t('calculator.loadEstimation') }}</p>
              <p class="font-black text-lg leading-none text-white">{{ calculation.totalVolume.toFixed(2) }} m³</p>
            </div>
          </div>

            <div class="p-6 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-xl">
            <p class="text-teal-500 text-[9px] font-black uppercase tracking-[0.3em] mb-6 text-center">{{ $t('calculator.attentionProtocol') }}</p>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="l in ['ES', 'EN']" :key="l" class="flex flex-col items-center gap-2">
                <span class="text-xs font-black bg-slate-900 w-full text-center py-2.5 rounded-xl border border-slate-800 text-slate-300">
                  {{ l }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 bg-white/[0.05] p-6 rounded-3xl border border-white/5 space-y-2.5 shadow-2xl">
        <div class="flex justify-between items-center">
          <span class="text-slate-500 font-black text-[9px] uppercase tracking-widest">{{ $t('calculator.price') }}</span>
          <span class="text-3xl font-black text-white tracking-tighter">{{ calculation.priceFormatted || calculation.price }} CLP</span>
        </div>
        <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
          <div class="h-full w-1/4 bg-teal-500/60 shadow-[0_0_15px_rgba(20,184,166,0.5)] animate-progress" />
        </div>
        <p class="text-[8px] text-slate-600 font-black text-center pt-2 tracking-[0.3em] uppercase">Santiago • Región Metropolitana</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRuntimeConfig } from '#app'

const props = defineProps({
  isHero: {
    type: Boolean,
    default: false
  }
})

const { t, locale, locales, loadLocaleMessages, setLocale } = useI18n()

const config = useRuntimeConfig()

const step = ref(1)
const origin = ref('')
const destination = ref('')
const items = ref([])
const mapContainer = ref(null)
const origenInput = ref(null)
const destinoInput = ref(null)

const origenPlace = ref(null)
const destinoPlace = ref(null)
const distancia = ref(null)
const precio = ref(null)

let mapInstance = null
let directionsService = null
let directionsRenderer = null
let autocompleteOrigen = null
let autocompleteDestino = null

const presets = computed(() => [
  { name: t('calculator.presets.smallBox'), category: t('calculator.categories.small'), volume: 0.1, key: 'smallBox' },
  { name: t('calculator.presets.largeBox'), category: t('calculator.categories.medium'), volume: 0.3, key: 'largeBox' },
  { name: t('calculator.presets.sofa3Seats'), category: t('calculator.categories.large'), volume: 2.5, key: 'sofa3Seats' },
  { name: t('calculator.presets.refrigerator'), category: t('calculator.categories.large'), volume: 1.5, key: 'refrigerator' },
  { name: t('calculator.presets.washingMachine'), category: t('calculator.categories.medium'), volume: 0.8, key: 'washingMachine' },
  { name: t('calculator.presets.doubleBed'), category: t('calculator.categories.special'), volume: 3.0, key: 'doubleBed' },
  { name: t('calculator.presets.diningTable'), category: t('calculator.categories.medium'), volume: 1.2, key: 'diningTable' },
  { name: t('calculator.presets.chair'), category: t('calculator.categories.small'), volume: 0.2, key: 'chair' },
])

const addItem = (preset) => {
  const existing = items.value.find(i => i.key === preset.key)
  if (existing) {
    existing.quantity++
  } else {
    items.value.push({ ...preset, id: Math.random().toString(), quantity: 1 })
  }
}

const updateQuantity = (id, delta) => {
  const item = items.value.find(i => i.id === id)
  if (item) {
    item.quantity = Math.max(0, item.quantity + delta)
    if (item.quantity === 0) {
      items.value = items.value.filter(i => i.id !== id)
    }
  }
}

// Fórmula Chile: RM hasta 50 km = $20.000 + (km × $2.000); más de 50 km (regiones) = km × $900
const BASE_RM_CLP = 20000
const POR_KM_RM_CLP = 2000
const POR_KM_REGIONES_CLP = 900
const LIMITE_KM_RM = 50

function calcPrecioFromDistancia(km) {
  if (!km || km <= 0) return 0
  if (km <= LIMITE_KM_RM) {
    return Math.round(BASE_RM_CLP + km * POR_KM_RM_CLP)
  }
  return Math.round(km * POR_KM_REGIONES_CLP)
}

const calculation = computed(() => {
  const totalVolume = items.value.reduce((acc, item) => acc + (item.volume * item.quantity), 0)
  let calculatedPrice = 0
  if (precio.value !== null && precio.value > 0) {
    calculatedPrice = precio.value
  } else if (distancia.value !== null && distancia.value > 0) {
    calculatedPrice = calcPrecioFromDistancia(distancia.value)
    precio.value = calculatedPrice
  }
  return {
    totalVolume,
    price: Math.round(calculatedPrice),
    priceFormatted: calculatedPrice > 0 ? `$${Math.round(calculatedPrice).toLocaleString('es-CL')}` : '0',
    itemCount: items.value.reduce((acc, i) => acc + i.quantity, 0),
    distancia: distancia.value
  }
})

// Función para inicializar el mapa (simplificada como FleteCalculator)
function initMap() {
  if (!mapContainer.value || !process.client) return

  const apiKey = encodeURIComponent(config.public.googleMapsApiKey || 'AIzaSyD6_IKXikaZ2YFx5R8yKVpFPUe_S6WOKJI')

  if (window.google && window.google.maps) {
    createMap()
    return
  }

  if (document.getElementById('google-maps-script')) {
    return
  }

  const googleScript = document.createElement('script')
  googleScript.id = 'google-maps-script'
  googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
  googleScript.async = true
  googleScript.defer = true

  googleScript.onload = () => {
    console.log('✅ Google Maps API cargada correctamente')
    createMap()
  }

  googleScript.onerror = () => {
    console.error('❌ Error al cargar Google Maps API')
  }

  document.head.appendChild(googleScript)
}

// Crear el mapa
function createMap() {
  if (!mapContainer.value || !window.google || !window.google.maps) {
    return
  }

  // Centro en Región Metropolitana, Chile (Santiago)
  const santiagoCenter = { lat: -33.4489, lng: -70.6693 }

  mapInstance = new google.maps.Map(mapContainer.value, {
    center: santiagoCenter,
    zoom: 10
  })

  directionsService = new google.maps.DirectionsService()
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: mapInstance,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: '#14b8a6',
      strokeWeight: 4,
      strokeOpacity: 0.8
    },
    markerOptions: {
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: '#14b8a6',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2
      }
    }
  })

  // Inicializar autocomplete directamente (como en FleteCalculator)
  const inputOrigen = document.getElementById('origen')
  const inputDestino = document.getElementById('destino')

  if (inputOrigen && inputDestino) {
    // Bounds Chile (para permitir RM y rutas a regiones; si distancia > 50 km se aplica tarifa regiones)
    const chileBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-56, -76),
      new google.maps.LatLng(-17, -66)
    )

    autocompleteOrigen = new google.maps.places.Autocomplete(inputOrigen, {
      bounds: chileBounds,
      componentRestrictions: { country: 'cl' }
    })

    autocompleteDestino = new google.maps.places.Autocomplete(inputDestino, {
      bounds: chileBounds,
      componentRestrictions: { country: 'cl' }
    })

    autocompleteOrigen.addListener('place_changed', () => {
      origenPlace.value = autocompleteOrigen.getPlace()
      if (origenPlace.value && origenPlace.value.formatted_address) {
        origin.value = origenPlace.value.formatted_address
        calculateRoute()
      }
    })

    autocompleteDestino.addListener('place_changed', () => {
      destinoPlace.value = autocompleteDestino.getPlace()
      if (destinoPlace.value && destinoPlace.value.formatted_address) {
        destination.value = destinoPlace.value.formatted_address
        calculateRoute()
      }
    })
  }
}


// Calcular y mostrar la ruta
function calculateRoute() {
  if (!directionsService || !directionsRenderer || !origenPlace.value || !destinoPlace.value) {
    return
  }

  const request = {
    origin: { placeId: origenPlace.value.place_id },
    destination: { placeId: destinoPlace.value.place_id },
    travelMode: 'DRIVING'
  }

  directionsService.route(request, (result, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(result)
      
      // Calcular distancia y precio usando la fórmula en CLP (Chile)
      const leg = result.routes[0].legs[0]
      distancia.value = leg.distance.value / 1000 // Convertir metros a kilómetros
      
      // Hasta 50 km: $20.000 + (km × $1.600); más de 50 km: km × $900 (regiones)
      precio.value = calcPrecioFromDistancia(distancia.value)
      
      console.log('📊 Precio calculado:', {
        distancia: distancia.value,
        precio: precio.value
      })
      
      // Ajustar el zoom para que se vea toda la ruta
      const bounds = new google.maps.LatLngBounds()
      result.routes[0].legs.forEach(leg => {
        bounds.extend(leg.start_location)
        bounds.extend(leg.end_location)
      })
      mapInstance.fitBounds(bounds)
    } else {
      console.error('Error al calcular la ruta:', status)
    }
  })
}

// Inicializar el mapa cuando el componente se monte
// Con lazy: false, las traducciones están disponibles desde el inicio
onMounted(() => {
  const testKey = 'calculator.step1'
  const testTranslation = t(testKey)
  console.log('🟢 [PortesCalculator] Componente montado, traducción test:', testTranslation)
  const nuxtApp = useNuxtApp()
  console.log('🟢 [PortesCalculator] Mensajes disponibles:', nuxtApp.$i18n?.messages?.value?.[locale.value] ? Object.keys(nuxtApp.$i18n.messages.value[locale.value]) : 'no messages')
  
  if (process.client) {
    initMap()
  }
})
</script>

<style scoped>
@keyframes zoom {
  0%, 100% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
}

@keyframes truck-move {
  0%, 100% {
    left: 10%;
  }
  50% {
    left: 85%;
  }
}

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(300%);
  }
}

@keyframes check-in {
  0% {
    transform: rotate(-20deg) scale(0.5);
    opacity: 0;
  }
  100% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
}

@keyframes price-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-zoom {
  animation: zoom 15s infinite ease-in-out;
}

.animate-truck-move {
  animation: truck-move 6s infinite ease-in-out;
}

.animate-progress {
  animation: progress 5s infinite linear;
}

.animate-check-in {
  animation: check-in 0.5s ease-out;
}

.animate-price-in {
  animation: price-in 0.5s ease-out;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>


