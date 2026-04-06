<template>
  <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-teal-600 to-slate-900 p-4 md:p-6 text-white">
      <h2 class="text-xl md:text-2xl font-black mb-1 tracking-tighter">{{ $t('components.ultimaMillaCalculator.title') }}</h2>
      <p class="text-sm text-teal-100">{{ $t('components.ultimaMillaCalculator.subtitle') }}</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
      <!-- Left Panel: Formulario y Lista de Puntos -->
      <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        <!-- Tipo de Envío - Peso -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.shipmentType') }}</span>
          </div>
          <div class="p-4 bg-white space-y-3">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p class="font-bold text-slate-900 text-sm">{{ $t('components.ultimaMillaCalculator.packageSmall') }}</p>
            </div>
            
            <!-- Slider de Peso -->
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-500 font-medium">0 kg</span>
                <span class="text-base font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-lg">{{ packageWeight }} kg</span>
                <span class="text-xs text-slate-500 font-medium">20 kg</span>
              </div>
              <div class="relative">
                <input
                  type="range"
                  v-model.number="packageWeight"
                  min="0"
                  max="20"
                  step="0.5"
                  class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  :style="{ '--value': `${(packageWeight / 20) * 100}%` }"
                />
              </div>
              <p class="text-[10px] text-slate-500 text-center">{{ $t('components.ultimaMillaCalculator.weightNote') }}</p>
            </div>
          </div>
        </div>

        <!-- Agregar Nuevo Punto -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.addDeliveryPoint') }}</span>
          </div>
          <div class="p-3 bg-white space-y-3">
            <input
              :id="`direccion-${points.length}`"
              type="text"
              v-model="newPointAddress"
              :placeholder="$t('components.ultimaMillaCalculator.addressPlaceholder')"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 font-medium text-sm"
            />
            <button
              @click="addPoint"
              :disabled="!newPointAddress || points.length >= 20"
              class="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-bold text-sm transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ $t('components.ultimaMillaCalculator.addPoint') }}
            </button>
            <p v-if="points.length < 5" class="text-xs text-amber-600 font-medium">
              {{ $t('components.ultimaMillaCalculator.minPoints') }}
            </p>
            <p v-else-if="points.length >= 5 && points.length < 20" class="text-xs text-slate-500">
              {{ points.length }} {{ $t('components.ultimaMillaCalculator.pointsAdded') }}
            </p>
          </div>
        </div>

        <!-- Lista de Puntos -->
        <div class="border border-slate-200 rounded-lg overflow-hidden max-h-[300px] overflow-y-auto">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.deliveryPoints') }} ({{ points.length }})</span>
          </div>
          <div class="p-2 space-y-2 bg-white">
            <div
              v-for="(point, index) in points"
              :key="point.id"
              class="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 hover:border-teal-300 transition-all group"
            >
              <div class="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-black">
                {{ index + 1 }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-900 truncate">{{ point.address }}</p>
                <p class="text-[10px] text-slate-500">{{ $t('components.ultimaMillaCalculator.pointPrice') }}: $3.500 CLP</p>
              </div>
              <button
                @click="removePoint(point.id)"
                class="flex-shrink-0 p-1 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <div v-if="points.length === 0" class="text-center py-8 text-slate-400">
              <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p class="text-xs font-medium">{{ $t('components.ultimaMillaCalculator.noPoints') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel: Mapa y Resumen -->
      <div class="lg:sticky lg:top-6 h-fit space-y-4">
        <!-- Mapa -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.routeMap') }}</span>
          </div>
          <div class="relative aspect-[3/2] bg-slate-900 rounded-lg overflow-hidden">
            <div ref="mapContainer" class="w-full h-full"></div>
            <div v-if="points.length > 0" class="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white font-black z-10">
              {{ $t('components.ultimaMillaCalculator.totalPoints') }}: {{ points.length }}
            </div>
          </div>
        </div>

        <!-- Resumen de Cálculo -->
        <div class="bg-slate-900 rounded-2xl p-4 md:p-6 text-white">
          <h3 class="text-lg md:text-xl font-black mb-4">{{ $t('components.ultimaMillaCalculator.calculationSummary') }}</h3>
          
          <div class="space-y-3">
            <!-- Detalle de Precios -->
            <div class="bg-slate-800 rounded-xl p-4 space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-slate-300 text-sm font-medium">{{ $t('components.ultimaMillaCalculator.totalPoints') }}</span>
                <span class="text-xl font-black text-teal-400">{{ points.length }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-300 text-sm font-medium">{{ $t('components.ultimaMillaCalculator.pricePerDelivery') }}</span>
                <span class="text-lg font-bold text-white">$3.500 CLP</span>
              </div>
              <div class="border-t border-slate-700 pt-2 mt-2">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-bold">{{ $t('components.ultimaMillaCalculator.totalPrice') }}</span>
                  <span class="text-3xl font-black text-teal-400">{{ formatCLP(totalPrice) }}</span>
                </div>
                <p class="text-xs text-slate-400 mt-1">
                  {{ $t('components.ultimaMillaCalculator.priceBreakdown') }}
                </p>
              </div>
            </div>

            <!-- CTA -->
            <button
              @click="requestQuote"
              :disabled="points.length < 5"
              class="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl transition-all transform hover:scale-105 disabled:hover:scale-100 mt-4"
            >
              {{ $t('components.ultimaMillaCalculator.requestQuote') }}
            </button>

            <p class="text-xs text-slate-400 text-center">
              * {{ $t('components.ultimaMillaCalculator.minimumPointsNote') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRuntimeConfig } from '#app'

const { t } = useI18n()
const config = useRuntimeConfig()

const mapContainer = ref(null)
const newPointAddress = ref('')
const points = ref([])
const packageWeight = ref(5) // Peso por defecto: 5 kg
let pointCounter = 0

let mapInstance = null
let directionsService = null
let directionsRenderer = null
let markers = []
let autocompleteInstances = []

// Precio por envío en Chile (CLP)
const PRICE_PER_DELIVERY = 3500
const MIN_POINTS = 5

function formatCLP (value) {
  return '$' + Math.round(value).toLocaleString('es-CL') + ' CLP'
}

const totalPrice = computed(() => {
  return points.value.length * PRICE_PER_DELIVERY
})

// Función para inicializar el mapa
function initMap() {
  if (!mapContainer.value || !process.client) return

  const apiKey = encodeURIComponent(config.public.googleMapsApiKey || 'AIzaSyD6_IKXikaZ2YFx5R8yKVpFPUe_S6WOKJI')

  if (window.google && window.google.maps) {
    createMap()
    return
  }

  if (document.getElementById('google-maps-script-ultima-milla')) {
    return
  }

  const googleScript = document.createElement('script')
  googleScript.id = 'google-maps-script-ultima-milla'
  googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
  googleScript.async = true
  googleScript.defer = true

  googleScript.onload = () => {
    console.log('✅ Google Maps API cargada correctamente (Última Milla)')
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

  // Centro en Santiago, Chile por defecto
  const santiagoCenter = { lat: -33.4489, lng: -70.6693 }

  mapInstance = new google.maps.Map(mapContainer.value, {
    center: santiagoCenter,
    zoom: 11
  })

  directionsService = new google.maps.DirectionsService()
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: mapInstance,
    suppressMarkers: true, // Usaremos marcadores personalizados
    polylineOptions: {
      strokeColor: '#14b8a6',
      strokeWeight: 4,
      strokeOpacity: 0.8
    }
  })

  // Inicializar autocomplete cuando se agregan puntos
  initAutocomplete()
  updateMap()
}

// Inicializar autocomplete para el input de nueva dirección
function initAutocomplete() {
  nextTick(() => {
    const inputId = `direccion-${points.value.length}`
    const input = document.getElementById(inputId)
    if (!input || !window.google || !window.google.maps) return

    // Eliminar autocomplete anterior si existe
    const existingIndex = autocompleteInstances.findIndex(ac => ac.inputId === inputId)
    if (existingIndex >= 0) {
      autocompleteInstances[existingIndex].autocomplete = null
      autocompleteInstances.splice(existingIndex, 1)
    }

    const santiagoBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.68, -70.85),
      new google.maps.LatLng(-33.2, -70.45)
    )

    const autocomplete = new google.maps.places.Autocomplete(input, {
      bounds: santiagoBounds,
      componentRestrictions: { country: 'cl' }
    })

    autocompleteInstances.push({ inputId, autocomplete })
  })
}

// Agregar punto
async function addPoint() {
  if (!newPointAddress.value.trim() || points.value.length >= 20) return

  // Usar Places API para geocodificar la dirección
  if (!window.google || !window.google.maps) {
    alert('Por favor espera a que se cargue el mapa')
    return
  }

  const geocoder = new google.maps.Geocoder()
  geocoder.geocode({ address: newPointAddress.value, region: 'es' }, (results, status) => {
    if (status === 'OK' && results[0]) {
      const place = results[0]
      const newPoint = {
        id: pointCounter++,
        address: place.formatted_address || newPointAddress.value,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        },
        placeId: place.place_id
      }

      points.value.push(newPoint)
      newPointAddress.value = ''
      updateMap()
      initAutocomplete()
    } else {
      alert('No se pudo encontrar la dirección. Por favor, intenta con una dirección más específica.')
    }
  })
}

// Eliminar punto
function removePoint(id) {
  const index = points.value.findIndex(p => p.id === id)
  if (index >= 0) {
    points.value.splice(index, 1)
    updateMap()
  }
}

// Actualizar mapa con todos los puntos
function updateMap() {
  if (!mapInstance || !directionsRenderer || points.value.length === 0) {
    // Limpiar marcadores
    markers.forEach(marker => marker.setMap(null))
    markers = []
    return
  }

  // Limpiar marcadores anteriores
  markers.forEach(marker => marker.setMap(null))
  markers = []

  if (points.value.length === 1) {
    // Si solo hay un punto, mostrar marcador
    const point = points.value[0]
    const marker = new google.maps.Marker({
      position: point.location,
      map: mapInstance,
      label: {
        text: '1',
        color: 'white',
        fontSize: '12px',
        fontWeight: 'bold'
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#14b8a6',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2
      },
      title: point.address
    })
    markers.push(marker)
    mapInstance.setCenter(point.location)
    mapInstance.setZoom(13)
  } else if (points.value.length >= 2) {
    // Si hay 2 o más puntos, calcular ruta
    const origin = points.value[0]
    const destination = points.value[points.value.length - 1]
    const waypoints = points.value.slice(1, -1).map(p => ({
      location: { placeId: p.placeId },
      stopover: true
    }))

    // Crear marcadores personalizados
    points.value.forEach((point, index) => {
      const marker = new google.maps.Marker({
        position: point.location,
        map: mapInstance,
        label: {
          text: String(index + 1),
          color: 'white',
          fontSize: '12px',
          fontWeight: 'bold'
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: index === 0 ? '#14b8a6' : index === points.value.length - 1 ? '#ef4444' : '#f59e0b',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        },
        title: `${index + 1}. ${point.address}`
      })
      markers.push(marker)
    })

    // Calcular ruta optimizada
    const request = {
      origin: { placeId: origin.placeId },
      destination: { placeId: destination.placeId },
      waypoints: waypoints,
      optimizeWaypoints: true, // Optimizar orden de puntos
      travelMode: 'DRIVING'
    }

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result)
        
        // Ajustar zoom para ver toda la ruta
        const bounds = new google.maps.LatLngBounds()
        result.routes[0].legs.forEach(leg => {
          bounds.extend(leg.start_location)
          bounds.extend(leg.end_location)
        })
        mapInstance.fitBounds(bounds)
      } else {
        console.error('Error al calcular la ruta:', status)
        // Si falla, al menos mostrar los marcadores
        const bounds = new google.maps.LatLngBounds()
        points.value.forEach(point => {
          bounds.extend(point.location)
        })
        mapInstance.fitBounds(bounds)
      }
    })
  }
}

function requestQuote() {
  if (points.value.length < MIN_POINTS) {
    alert(`Debes agregar al menos ${MIN_POINTS} puntos de entrega`)
    return
  }

  const quote = {
    points: points.value.length,
    pricePerDelivery: PRICE_PER_DELIVERY,
    totalPrice: totalPrice.value
  }

  alert(`Presupuesto de última milla solicitado:\n\nPuntos de entrega: ${quote.points}\nPrecio por envío: ${formatCLP(quote.pricePerDelivery)}\nPrecio total: ${formatCLP(quote.totalPrice)}`)
}

// Inicializar el mapa cuando el componente se monte
onMounted(() => {
  initMap()
  initAutocomplete()
})

// Watch para actualizar autocomplete cuando cambia el número de puntos
watch(() => points.value.length, () => {
  nextTick(() => {
    initAutocomplete()
  })
})
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

/* Estilos para el slider de peso */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #14b8a6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 6px rgba(20, 184, 166, 0.4);
  transition: all 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  background: #0d9488;
  transform: scale(1.1);
  box-shadow: 0 3px 8px rgba(20, 184, 166, 0.6);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #14b8a6;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 6px rgba(20, 184, 166, 0.4);
  transition: all 0.2s;
}

.slider::-moz-range-thumb:hover {
  background: #0d9488;
  transform: scale(1.1);
  box-shadow: 0 3px 8px rgba(20, 184, 166, 0.6);
}

.slider::-webkit-slider-runnable-track {
  height: 8px;
  background: linear-gradient(to right, #14b8a6 0%, #14b8a6 var(--value, 25%), #cbd5e1 var(--value, 25%));
  border-radius: 4px;
}

.slider::-moz-range-track {
  height: 8px;
  background: #cbd5e1;
  border-radius: 4px;
}

.slider::-moz-range-progress {
  height: 8px;
  background: #14b8a6;
  border-radius: 4px;
}
</style>
