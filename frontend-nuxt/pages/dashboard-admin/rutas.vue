<template>
  <div class="mx-auto max-w-6xl space-y-6">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-2xl font-black tracking-tight text-slate-900">Optimización de rutas</h1>
        <p class="text-sm text-slate-600 mt-1">
          Agrega paradas en la RM, elige <strong>dónde partes ahora</strong> y calcula el mejor orden (Google Maps + matriz de tiempos/distancias).
        </p>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <div class="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex flex-wrap gap-3 items-end">
          <label class="flex-1 min-w-[180px]">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">Criterio</span>
            <select
              v-model="optimizeBy"
              class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-teal-500 focus:outline-none"
            >
              <option value="time">Menor tiempo de manejo (con tráfico si la API lo permite)</option>
              <option value="distance">Menor distancia (km)</option>
            </select>
          </label>
        </div>

        <div class="rounded-xl border border-slate-100 bg-slate-50 p-4 space-y-3">
          <label class="block">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">Nueva dirección</span>
            <input
              ref="addressInputRef"
              v-model="newAddress"
              type="text"
              placeholder="Ej: Padre Mariano 236, Providencia"
              class="mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-500 focus:outline-none"
              :class="placeFromAutocomplete ? 'border-teal-400 ring-1 ring-teal-200' : ''"
              :disabled="mapsLoading || !mapsReady"
              @keydown="onAddressKeydown"
            />
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white shadow shadow-teal-500/30 hover:bg-teal-700 disabled:opacity-50"
              :disabled="!mapsReady"
              @click="addPointFromInput"
            >
              Agregar parada
            </button>
            <button
              type="button"
              class="rounded-xl border-2 border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
              :disabled="!mapsReady || geoLocating"
              @click="addCurrentLocation"
            >
              {{ geoLocating ? 'Ubicación…' : 'Mi ubicación GPS' }}
            </button>
          </div>
          <p class="text-xs text-slate-500">
            Máximo 23 paradas. Escribe y <strong>elige una sugerencia de la lista</strong> (Places); no usamos Geocoding API.
            <span v-if="placeFromAutocomplete" class="block text-teal-700 font-medium mt-1">Listo para agregar esta dirección.</span>
          </p>
        </div>

        <div v-if="points.length === 0" class="text-center py-10 text-slate-400 text-sm">
          Aún no hay paradas. Agrega al menos dos para optimizar.
        </div>

        <ul v-else class="space-y-2">
          <li
            v-for="(p, idx) in points"
            :key="p.id"
            class="flex flex-wrap items-start gap-3 rounded-xl border border-slate-200 bg-white p-3"
          >
            <label class="flex items-center gap-2 shrink-0 cursor-pointer">
              <input v-model.number="startIndex" type="radio" :value="idx" class="text-teal-600 focus:ring-teal-500" />
              <span class="text-xs font-bold text-teal-700 whitespace-nowrap">Partida</span>
            </label>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-900">{{ p.label || p.address }}</p>
              <p class="text-xs text-slate-500 font-mono">{{ p.lat.toFixed(5) }}, {{ p.lng.toFixed(5) }}</p>
            </div>
            <button
              type="button"
              class="text-sm font-bold text-red-600 hover:text-red-700 shrink-0"
              @click="removePoint(idx)"
            >
              Quitar
            </button>
          </li>
        </ul>

        <button
          type="button"
          class="w-full rounded-xl bg-slate-900 py-3 text-sm font-black text-white shadow-lg hover:bg-slate-800 disabled:opacity-50"
          :disabled="points.length < 2 || optimizing || !mapsReady"
          @click="runOptimize"
        >
          {{ optimizing ? 'Calculando matriz y orden…' : 'Calcular mejor orden' }}
        </button>

        <p v-if="errorMsg" class="text-sm text-red-600 font-medium">{{ errorMsg }}</p>
      </div>

      <div class="space-y-4">
        <div
          ref="mapContainerRef"
          class="h-[320px] w-full rounded-2xl border border-slate-200 bg-slate-100 shadow-sm lg:h-[420px]"
        />
        <p v-if="mapsLoading" class="text-sm text-slate-500">Cargando mapa…</p>

        <div v-if="result" class="rounded-2xl border border-teal-200 bg-teal-50/80 p-5 space-y-3">
          <h2 class="text-lg font-black text-teal-900">Orden sugerido</h2>
          <p class="text-sm text-teal-800">
            <span v-if="result.optimizeBy === 'time'">
              Tiempo total estimado: <strong>{{ formatDuration(result.totalSeconds) }}</strong>
            </span>
            <span v-else>
              Distancia total estimada: <strong>{{ formatKm(result.totalMeters) }}</strong>
            </span>
          </p>
          <ol class="list-decimal list-inside space-y-2 text-sm text-slate-800">
            <li v-for="step in result.orderedPoints" :key="step.index + '-' + step.order" class="font-medium">
              {{ step.label }}
            </li>
          </ol>
          <p class="text-xs text-slate-600">
            El trazo en el mapa usa Directions con ese orden (sin reoptimizar waypoints de Google).
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'admin' })

import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import {
  fetchDistanceMatrix,
  optimizeRouteOrder,
  buildOptimizationResult
} from '~/utils/routeOptimizer.js'

const config = useRuntimeConfig()

const mapContainerRef = ref(null)
const addressInputRef = ref(null)
const newAddress = ref('')
const points = ref([])
const startIndex = ref(0)
const optimizeBy = ref('time')
const mapsLoading = ref(true)
const mapsReady = ref(false)
const geoLocating = ref(false)
/** Lugar confirmado por Autocomplete (evita Geocoder / Geocoding API) */
const placeFromAutocomplete = ref(null)
const optimizing = ref(false)
const errorMsg = ref('')
const result = ref(null)

let googleMaps = null
let mapInstance = null
let directionsService = null
let directionsRenderer = null
let autocomplete = null
let stopMarkers = []

function uid () {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function loadGoogleScript (apiKey) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'))
    if (window.google && window.google.maps) {
      googleMaps = window.google.maps
      return resolve()
    }
    const id = 'gmaps-admin-rutas'
    if (document.getElementById(id)) {
      const t = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(t)
          googleMaps = window.google.maps
          resolve()
        }
      }, 80)
      return
    }
    const s = document.createElement('script')
    s.id = id
    s.async = true
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=places`
    s.onload = () => {
      googleMaps = window.google.maps
      resolve()
    }
    s.onerror = () => reject(new Error('No se pudo cargar Google Maps'))
    document.head.appendChild(s)
  })
}

function initMap () {
  if (!mapContainerRef.value || !googleMaps) return
  mapInstance = new googleMaps.Map(mapContainerRef.value, {
    center: { lat: -33.45, lng: -70.65 },
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true
  })
  directionsService = new googleMaps.DirectionsService()
  directionsRenderer = new googleMaps.DirectionsRenderer({
    map: mapInstance,
    suppressMarkers: false,
    polylineOptions: { strokeColor: '#0d9488', strokeWeight: 5 }
  })
}

function bindAutocomplete () {
  const input = addressInputRef.value
  if (!input || !googleMaps) return
  const bounds = new googleMaps.LatLngBounds(
    new googleMaps.LatLng(-33.68, -70.92),
    new googleMaps.LatLng(-33.2, -70.45)
  )
  autocomplete = new googleMaps.places.Autocomplete(input, {
    bounds,
    strictBounds: false,
    componentRestrictions: { country: 'cl' },
    fields: ['formatted_address', 'geometry', 'name', 'place_id']
  })
  googleMaps.event.addListener(autocomplete, 'place_changed', () => {
    const place = autocomplete.getPlace()
    if (!place.geometry || !place.geometry.location) {
      placeFromAutocomplete.value = null
      return
    }
    const loc = place.geometry.location
    const payload = {
      lat: typeof loc.lat === 'function' ? loc.lat() : loc.lat,
      lng: typeof loc.lng === 'function' ? loc.lng() : loc.lng,
      address: place.formatted_address || place.name || newAddress.value.trim() || 'Parada'
    }
    // Evitar que un `input` posterior al elegir sugerencia borre la selección
    nextTick(() => {
      placeFromAutocomplete.value = payload
    })
  })
}

/** Solo limpiar selección cuando el usuario escribe o borra (no en Enter/flechas del desplegable). */
function onAddressKeydown (e) {
  if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Escape' || e.key === 'Tab') {
    return
  }
  if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
    placeFromAutocomplete.value = null
  }
}

function addPointFromInput () {
  if (!googleMaps) return
  errorMsg.value = ''
  if (!newAddress.value.trim() && !placeFromAutocomplete.value) return
  if (placeFromAutocomplete.value) {
    const p = placeFromAutocomplete.value
    points.value.push({
      id: uid(),
      address: p.address,
      label: p.address,
      lat: p.lat,
      lng: p.lng
    })
    newAddress.value = ''
    placeFromAutocomplete.value = null
    if (points.value.length === 1) startIndex.value = 0
    fitBounds()
    return
  }
  errorMsg.value =
    'Debes elegir una dirección de las sugerencias (flecha abajo y clic). Escribir solo el texto y pulsar «Agregar» no basta y no requiere activar Geocoding API en Google Cloud.'
}

function addCurrentLocation () {
  if (!navigator.geolocation) {
    errorMsg.value = 'Tu navegador no permite geolocalización.'
    return
  }
  geoLocating.value = true
  errorMsg.value = ''
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      geoLocating.value = false
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
      points.value.push({
        id: uid(),
        address: 'Mi ubicación (GPS)',
        label: 'Mi ubicación actual',
        lat,
        lng
      })
      startIndex.value = points.value.length - 1
      fitBounds()
    },
    () => {
      geoLocating.value = false
      errorMsg.value = 'No se pudo obtener tu ubicación (permiso denegado o error).'
    },
    { enableHighAccuracy: true, timeout: 12000 }
  )
}

function removePoint (idx) {
  points.value.splice(idx, 1)
  if (startIndex.value >= points.value.length) startIndex.value = Math.max(0, points.value.length - 1)
  if (points.value.length < 2) {
    result.value = null
    if (directionsRenderer) directionsRenderer.setDirections({ routes: [] })
  }
}

function fitBounds () {
  if (!mapInstance || !googleMaps || points.value.length === 0) return
  const b = new googleMaps.LatLngBounds()
  for (const p of points.value) {
    b.extend({ lat: p.lat, lng: p.lng })
  }
  mapInstance.fitBounds(b, 48)
}

function syncStopMarkers () {
  if (!mapInstance || !googleMaps) return
  for (const m of stopMarkers) {
    m.setMap(null)
  }
  stopMarkers = []
  points.value.forEach((p, idx) => {
    const m = new googleMaps.Marker({
      map: mapInstance,
      position: { lat: p.lat, lng: p.lng },
      label: String(idx + 1),
      title: p.label || p.address
    })
    stopMarkers.push(m)
  })
}

function formatDuration (sec) {
  if (sec == null || !Number.isFinite(sec)) return '—'
  const m = Math.round(sec / 60)
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  const r = m % 60
  return r ? `${h} h ${r} min` : `${h} h`
}

function formatKm (meters) {
  if (meters == null || !Number.isFinite(meters)) return '—'
  return `${(meters / 1000).toFixed(1)} km`
}

function drawDirections (ordered) {
  if (!directionsService || !directionsRenderer || !googleMaps || ordered.length < 2) return
  const pts = ordered.map((p) => ({ lat: Number(p.lat), lng: Number(p.lng) }))
  const origin = pts[0]
  const destination = pts[pts.length - 1]
  const waypoints = pts.slice(1, -1).map((p) => ({ location: p, stopover: true }))
  directionsService.route(
    {
      origin,
      destination,
      waypoints,
      travelMode: googleMaps.TravelMode.DRIVING,
      optimizeWaypoints: false,
      region: 'cl'
    },
    (res, status) => {
      if (status === 'OK') directionsRenderer.setDirections(res)
      else errorMsg.value = `No se pudo dibujar la ruta en mapa (${status}). El orden calculado sigue siendo válido.`
    }
  )
}

async function runOptimize () {
  if (points.value.length < 2 || !googleMaps) return
  optimizing.value = true
  errorMsg.value = ''
  result.value = null
  try {
    const pts = points.value.map((p) => ({
      lat: p.lat,
      lng: p.lng,
      label: p.label || p.address,
      address: p.address
    }))
    const byTime = optimizeBy.value === 'time'
    const matrix = await fetchDistanceMatrix(googleMaps, pts, byTime)
    const { path, totalCost } = optimizeRouteOrder(
      matrix,
      startIndex.value,
      pts.length,
      optimizeBy.value
    )
    result.value = buildOptimizationResult(pts, path, totalCost, optimizeBy.value)
    drawDirections(result.value.orderedPoints)
  } catch (e) {
    const msg = e.message || 'Error al optimizar'
    if (/REQUEST_DENIED|not enabled|Routes API|legacy/i.test(msg)) {
      errorMsg.value =
        'Google rechazó la matriz de rutas. En Google Cloud → APIs, activa «Routes API» (y facturación) para la misma clave del mapa. Detalle: ' +
        msg
    } else {
      errorMsg.value = msg
    }
  } finally {
    optimizing.value = false
  }
}

onMounted(async () => {
  const apiKey = config.public.googleMapsApiKey
  if (!apiKey) {
    mapsLoading.value = false
    errorMsg.value = 'Falta NUXT_PUBLIC_GOOGLE_MAPS_API_KEY en el build.'
    return
  }
  try {
    await loadGoogleScript(apiKey)
    mapsLoading.value = false
    mapsReady.value = true
    await new Promise((r) => requestAnimationFrame(r))
    initMap()
    bindAutocomplete()
  } catch (e) {
    mapsLoading.value = false
    errorMsg.value = e.message || 'Error cargando mapas'
  }
})

watch(
  points,
  () => {
    fitBounds()
    syncStopMarkers()
  },
  { deep: true }
)

onUnmounted(() => {
  for (const m of stopMarkers) {
    m.setMap(null)
  }
  stopMarkers = []
  mapInstance = null
  directionsService = null
  directionsRenderer = null
  autocomplete = null
})
</script>
