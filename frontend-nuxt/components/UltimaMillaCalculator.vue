<template>
  <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
    <div class="bg-gradient-to-r from-teal-600 to-slate-900 p-4 md:p-6 text-white">
      <h2 class="text-xl md:text-2xl font-black mb-1 tracking-tighter">{{ $t('components.ultimaMillaCalculator.title') }}</h2>
      <p class="text-sm text-teal-100">{{ $t('components.ultimaMillaCalculator.subtitle') }}</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
      <div class="space-y-4 max-h-[560px] overflow-y-auto pr-2">
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.shipmentType') }}</span>
          </div>
          <div class="p-4 bg-white space-y-3">
            <div class="grid grid-cols-2 gap-2">
              <button type="button" class="rounded-lg border-2 px-3 py-2 text-xs font-black uppercase tracking-wide" :class="isRefrigerated ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-600'" @click="isRefrigerated = true">Refrigerado</button>
              <button type="button" class="rounded-lg border-2 px-3 py-2 text-xs font-black uppercase tracking-wide" :class="!isRefrigerated ? 'border-teal-600 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-600'" @click="isRefrigerated = false">No refrigerado</button>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-xs text-slate-500 font-medium">0 kg</span>
                <span class="text-base font-black text-teal-600 bg-teal-50 px-3 py-1 rounded-lg">{{ packageWeight }} kg</span>
                <span class="text-xs text-slate-500 font-medium">20 kg</span>
              </div>
              <input type="range" v-model.number="packageWeight" min="0" max="20" step="0.5" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider" :style="{ '--value': `${(packageWeight / 20) * 100}%` }" />
              <p class="text-[10px] text-slate-500 text-center">{{ $t('components.ultimaMillaCalculator.weightNote') }}</p>
              <p class="text-[11px] text-slate-500 text-center">Base por punto: <strong>{{ formatCLP(basePricePerPoint) }}</strong> ({{ isRefrigerated ? 'refrigerado' : 'no refrigerado' }})</p>
            </div>
          </div>
        </div>

        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50"><span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.addDeliveryPoint') }}</span></div>
          <div class="p-3 bg-white space-y-3">
            <input ref="addressInputRef" v-model="newPointAddress" :placeholder="$t('components.ultimaMillaCalculator.addressPlaceholder')" class="w-full px-3 py-2 rounded-lg border-2 border-slate-200 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 font-medium text-sm" :class="selectedPlace ? 'border-teal-400 ring-1 ring-teal-100' : ''" @keydown="onAddressKeydown" />
            <div class="flex gap-2">
              <button @click="addPoint" :disabled="!mapsReady || points.length >= 23" class="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-bold text-sm">{{ $t('components.ultimaMillaCalculator.addPoint') }}</button>
              <button @click="addCurrentLocation" :disabled="!mapsReady || geoLocating" class="px-3 py-2.5 rounded-lg border-2 border-slate-300 text-slate-700 text-sm font-bold disabled:opacity-50">{{ geoLocating ? 'GPS…' : 'Mi ubicación' }}</button>
            </div>
            <p class="text-xs text-slate-500">Selecciona una sugerencia de Google Places antes de agregar (máx. 23).</p>
            <p v-if="errorMsg" class="text-xs text-red-600">{{ errorMsg }}</p>
          </div>
        </div>

        <div class="border border-slate-200 rounded-lg overflow-hidden max-h-[320px] overflow-y-auto">
          <div class="px-3 py-2 bg-slate-50 flex items-center justify-between">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.deliveryPoints') }} ({{ points.length }})</span>
            <span class="text-[10px] text-slate-500">Partida fija: #{{ startIndex + 1 }}</span>
          </div>
          <div class="p-2 space-y-2 bg-white">
            <div v-for="(point, index) in points" :key="point.id" class="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
              <div class="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-black">{{ index + 1 }}</div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-900 truncate">{{ point.address }}</p>
                <p class="text-[10px] text-slate-500">{{ $t('components.ultimaMillaCalculator.pointPrice') }}: {{ formatCLP(pointFinalPrice(point)) }}</p>
              </div>
              <button @click="removePoint(point.id)" class="flex-shrink-0 p-1 text-slate-400 hover:text-red-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
            </div>
            <div v-if="points.length === 0" class="text-center py-8 text-slate-400 text-xs font-medium">{{ $t('components.ultimaMillaCalculator.noPoints') }}</div>
          </div>
        </div>

        <button type="button" class="w-full rounded-xl bg-slate-900 py-3 text-sm font-black text-white disabled:opacity-50" :disabled="points.length < 2 || optimizing || !mapsReady" @click="runOptimize">{{ optimizing ? 'Calculando…' : 'Optimizar ruta (igual que admin)' }}</button>
      </div>

      <div class="lg:sticky lg:top-6 h-fit space-y-4">
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50"><span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.routeMap') }}</span></div>
          <div class="relative aspect-[3/2] bg-slate-900 rounded-lg overflow-hidden">
            <div ref="mapContainer" class="w-full h-full"></div>
            <div v-if="result" class="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white font-black z-10">Ruta optimizada</div>
          </div>
        </div>

        <div class="bg-slate-900 rounded-2xl p-4 md:p-6 text-white">
          <h3 class="text-lg md:text-xl font-black mb-4">{{ $t('components.ultimaMillaCalculator.calculationSummary') }}</h3>
          <div class="space-y-3 bg-slate-800 rounded-xl p-4">
            <div class="flex justify-between items-center"><span class="text-slate-300 text-sm">{{ $t('components.ultimaMillaCalculator.totalPoints') }}</span><span class="text-xl font-black text-teal-400">{{ points.length }}</span></div>
            <div class="flex justify-between items-center"><span class="text-slate-300 text-sm">{{ $t('components.ultimaMillaCalculator.pricePerDelivery') }}</span><span class="text-lg font-bold text-white">{{ formatCLP(avgPricePerPoint) }}</span></div>
            <div class="flex justify-between items-center" v-if="result?.totalSeconds"><span class="text-slate-300 text-sm">Tiempo estimado</span><span class="text-sm font-bold">{{ formatDuration(result.totalSeconds) }}</span></div>
            <div class="border-t border-slate-700 pt-2 mt-2">
              <div class="flex justify-between items-center"><span class="text-sm font-bold">{{ $t('components.ultimaMillaCalculator.totalPrice') }}</span><span class="text-3xl font-black text-teal-400">{{ formatCLP(totalPrice) }}</span></div>
              <p class="text-xs text-slate-400 mt-1">Base: no refrigerado {{ formatCLP(BASE_NON_REFRIGERATED) }} / refrigerado {{ formatCLP(BASE_REFRIGERATED) }} + recargo periferia/comunas alejadas.</p>
            </div>
          </div>
          <button @click="requestQuote" :disabled="points.length < MIN_POINTS" class="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest mt-4">{{ $t('components.ultimaMillaCalculator.requestQuote') }}</button>
          <p class="text-xs text-slate-400 text-center mt-2">* {{ $t('components.ultimaMillaCalculator.minimumPointsNote') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { fetchDistanceMatrix, optimizeRouteOrder, buildOptimizationResult } from '~/utils/routeOptimizer.js'

const config = useRuntimeConfig()
const mapContainer = ref(null)
const addressInputRef = ref(null)
const mapsReady = ref(false)
const geoLocating = ref(false)
const newPointAddress = ref('')
const selectedPlace = ref(null)
const points = ref([])
const packageWeight = ref(5)
const isRefrigerated = ref(false)
const optimizing = ref(false)
const result = ref(null)
const errorMsg = ref('')
const startIndex = ref(0)

const BASE_NON_REFRIGERATED = 5000
const BASE_REFRIGERATED = 7000
const PERIPHERY_SURCHARGE = 1500
const DISTANCE_SURCHARGE_1 = 1000
const DISTANCE_SURCHARGE_2 = 2000
const MIN_POINTS = 5
const SANTIAGO_CENTER = { lat: -33.4489, lng: -70.6693 }

const PERIPHERY_KEYWORDS = [
  'colina', 'chicureo', 'lampa', 'tiltil', 'buin', 'calera de tango', 'paine', 'san bernardo',
  'alhue', 'curacavi', 'maria pinto', 'san pedro', 'el monte', 'isla de maipo', 'padre hurtado',
  'talagante', 'pirque', 'san jose de maipo', 'puente alto'
]

let mapInstance = null
let directionsService = null
let directionsRenderer = null
let autocomplete = null
let stopMarkers = []

const basePricePerPoint = computed(() => (isRefrigerated.value ? BASE_REFRIGERATED : BASE_NON_REFRIGERATED))

function formatCLP(value) { return '$' + Math.round(value || 0).toLocaleString('es-CL') + ' CLP' }
function toRad(v) { return (v * Math.PI) / 180 }
function distanceKm(a, b) {
  const R = 6371
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const aa = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(aa))
}
function isPeripheralByAddress(address) {
  const s = String(address || '').toLowerCase()
  return PERIPHERY_KEYWORDS.some((k) => s.includes(k))
}
function pointSurcharge(point) {
  let plus = 0
  const kmFromCenter = distanceKm(SANTIAGO_CENTER, { lat: point.lat, lng: point.lng })
  if (isPeripheralByAddress(point.address) || kmFromCenter > 23) plus += PERIPHERY_SURCHARGE
  if (kmFromCenter > 30) plus += DISTANCE_SURCHARGE_1
  if (kmFromCenter > 40) plus += DISTANCE_SURCHARGE_2
  return plus
}
function pointFinalPrice(point) { return basePricePerPoint.value + pointSurcharge(point) }

const totalPrice = computed(() => points.value.reduce((acc, p) => acc + pointFinalPrice(p), 0))
const avgPricePerPoint = computed(() => (points.value.length ? totalPrice.value / points.value.length : basePricePerPoint.value))

function formatDuration(sec) {
  if (!sec || !Number.isFinite(sec)) return '—'
  const m = Math.round(sec / 60)
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  const r = m % 60
  return r ? `${h} h ${r} min` : `${h} h`
}

function uid() { return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}` }

function loadGoogleScript(apiKey) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'))
    if (window.google && window.google.maps) return resolve()
    const id = 'google-maps-script-ultima-milla'
    if (document.getElementById(id)) {
      const t = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(t)
          resolve()
        }
      }, 100)
      return
    }
    const s = document.createElement('script')
    s.id = id
    s.async = true
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=places`
    s.onload = resolve
    s.onerror = () => reject(new Error('No se pudo cargar Google Maps'))
    document.head.appendChild(s)
  })
}

function initMap() {
  mapInstance = new google.maps.Map(mapContainer.value, { center: SANTIAGO_CENTER, zoom: 11, mapTypeControl: false, streetViewControl: false })
  directionsService = new google.maps.DirectionsService()
  directionsRenderer = new google.maps.DirectionsRenderer({ map: mapInstance, suppressMarkers: false, polylineOptions: { strokeColor: '#14b8a6', strokeWeight: 4 } })
}

function bindAutocomplete() {
  const input = addressInputRef.value
  if (!input) return
  const bounds = new google.maps.LatLngBounds(new google.maps.LatLng(-33.68, -70.92), new google.maps.LatLng(-33.2, -70.45))
  autocomplete = new google.maps.places.Autocomplete(input, { bounds, strictBounds: false, componentRestrictions: { country: 'cl' }, fields: ['formatted_address', 'geometry', 'name', 'place_id'] })
  google.maps.event.addListener(autocomplete, 'place_changed', () => {
    const place = autocomplete.getPlace()
    if (!place.geometry || !place.geometry.location) {
      selectedPlace.value = null
      return
    }
    const loc = place.geometry.location
    nextTick(() => {
      selectedPlace.value = {
        lat: typeof loc.lat === 'function' ? loc.lat() : loc.lat,
        lng: typeof loc.lng === 'function' ? loc.lng() : loc.lng,
        address: place.formatted_address || place.name || newPointAddress.value.trim() || 'Parada'
      }
    })
  })
}

function onAddressKeydown(e) {
  if (['Enter', 'ArrowDown', 'ArrowUp', 'Escape', 'Tab'].includes(e.key)) return
  if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') selectedPlace.value = null
}

function fitBounds() {
  if (!mapInstance || points.value.length === 0) return
  const b = new google.maps.LatLngBounds()
  points.value.forEach((p) => b.extend({ lat: p.lat, lng: p.lng }))
  mapInstance.fitBounds(b, 48)
}

function syncStopMarkers() {
  if (!mapInstance) return
  stopMarkers.forEach((m) => m.setMap(null))
  stopMarkers = []
  points.value.forEach((p, idx) => {
    const m = new google.maps.Marker({ map: mapInstance, position: { lat: p.lat, lng: p.lng }, label: String(idx + 1), title: p.address })
    stopMarkers.push(m)
  })
}

function addPoint() {
  errorMsg.value = ''
  if (!selectedPlace.value) {
    errorMsg.value = 'Debes elegir una dirección de las sugerencias de Google Places.'
    return
  }
  const p = selectedPlace.value
  points.value.push({ id: uid(), address: p.address, label: p.address, lat: p.lat, lng: p.lng })
  newPointAddress.value = ''
  selectedPlace.value = null
  if (points.value.length === 1) startIndex.value = 0
  fitBounds()
}

function removePoint(id) {
  points.value = points.value.filter((p) => p.id !== id)
  if (startIndex.value >= points.value.length) startIndex.value = Math.max(0, points.value.length - 1)
  if (points.value.length < 2) {
    result.value = null
    if (directionsRenderer) directionsRenderer.setDirections({ routes: [] })
  }
}

function addCurrentLocation() {
  if (!navigator.geolocation) {
    errorMsg.value = 'Tu navegador no permite geolocalización.'
    return
  }
  geoLocating.value = true
  navigator.geolocation.getCurrentPosition((pos) => {
    geoLocating.value = false
    points.value.push({ id: uid(), address: 'Mi ubicación (GPS)', label: 'Mi ubicación actual', lat: pos.coords.latitude, lng: pos.coords.longitude })
    startIndex.value = points.value.length - 1
    fitBounds()
  }, () => {
    geoLocating.value = false
    errorMsg.value = 'No se pudo obtener tu ubicación.'
  }, { enableHighAccuracy: true, timeout: 12000 })
}

function drawDirections(ordered) {
  if (!directionsService || !directionsRenderer || ordered.length < 2) return
  const pts = ordered.map((p) => ({ lat: Number(p.lat), lng: Number(p.lng) }))
  const origin = pts[0]
  const destination = pts[pts.length - 1]
  const waypoints = pts.slice(1, -1).map((p) => ({ location: p, stopover: true }))
  directionsService.route({ origin, destination, waypoints, travelMode: google.maps.TravelMode.DRIVING, optimizeWaypoints: false, region: 'cl' }, (res, status) => {
    if (status === 'OK') directionsRenderer.setDirections(res)
    else errorMsg.value = `No se pudo dibujar la ruta (${status}).`
  })
}

async function runOptimize() {
  if (points.value.length < 2 || !mapsReady.value) return
  optimizing.value = true
  errorMsg.value = ''
  try {
    const pts = points.value.map((p) => ({ lat: p.lat, lng: p.lng, label: p.label || p.address, address: p.address }))
    const matrix = await fetchDistanceMatrix(google.maps, pts, true)
    const { path, totalCost } = optimizeRouteOrder(matrix, startIndex.value, pts.length, 'time')
    result.value = buildOptimizationResult(pts, path, totalCost, 'time')
    drawDirections(result.value.orderedPoints)
  } catch (e) {
    errorMsg.value = e?.message || 'Error al optimizar la ruta.'
  } finally {
    optimizing.value = false
  }
}

function requestQuote() {
  if (points.value.length < MIN_POINTS) {
    alert(`Debes agregar al menos ${MIN_POINTS} puntos de entrega`)
    return
  }
  const lines = [
    'Presupuesto última milla',
    `Tipo: ${isRefrigerated.value ? 'Refrigerado' : 'No refrigerado'}`,
    `Puntos: ${points.value.length}`,
    `Precio promedio por punto: ${formatCLP(avgPricePerPoint.value)}`,
    `Total: ${formatCLP(totalPrice.value)}`
  ]
  if (result.value?.totalSeconds) lines.push(`Tiempo estimado: ${formatDuration(result.value.totalSeconds)}`)
  alert(lines.join('\n'))
}

onMounted(async () => {
  try {
    const apiKey = config.public.googleMapsApiKey
    await loadGoogleScript(apiKey)
    mapsReady.value = true
    initMap()
    bindAutocomplete()
  } catch (e) {
    errorMsg.value = e?.message || 'Error cargando Google Maps'
  }
})

watch(points, () => {
  fitBounds()
  syncStopMarkers()
}, { deep: true })

onUnmounted(() => {
  stopMarkers.forEach((m) => m.setMap(null))
  stopMarkers = []
})
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar { width: 6px; }
.overflow-y-auto::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
.overflow-y-auto::-webkit-scrollbar-thumb { background: #14b8a6; border-radius: 10px; }
.overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #0d9488; }
.slider::-webkit-slider-thumb { appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #14b8a6; cursor: pointer; border: 2px solid #fff; box-shadow: 0 2px 6px rgba(20,184,166,.4); }
.slider::-webkit-slider-runnable-track { height: 8px; background: linear-gradient(to right, #14b8a6 0%, #14b8a6 var(--value, 25%), #cbd5e1 var(--value, 25%)); border-radius: 4px; }
</style>
