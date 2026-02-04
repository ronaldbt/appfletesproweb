<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
        <h2 class="text-2xl font-bold">🚛 Calculadora de Fletes</h2>
        <p class="text-sm opacity-90 mt-1">Calcula el precio y solicita tu flete en minutos</p>
      </div>

      <!-- Mapa -->
      <div ref="map" class="w-full h-[350px]"></div>

      <!-- Formulario -->
      <form @submit.prevent="calcularRuta" class="p-6 space-y-6">
        <!-- Paso 1: Direcciones -->
        <div class="space-y-4">
          <h3 class="text-lg font-bold text-gray-900 flex items-center">
            <span class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">1</span>
            Ingresa las direcciones
          </h3>
          
          <div>
            <label for="origen" class="block text-sm font-medium text-gray-700 mb-2">📍 Dirección de Origen</label>
            <input
              id="origen"
              type="text"
              placeholder="Ej: Av. Providencia 123, Santiago"
              class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label for="destino" class="block text-sm font-medium text-gray-700 mb-2">📦 Dirección de Destino</label>
            <input
              id="destino"
              type="text"
              placeholder="Ej: Av. Libertador 456, Santiago"
              class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <span>Calcular Precio del Flete</span>
          </button>
        </div>

        <!-- Paso 2: Resumen y Formulario Completo (Aparece después de calcular) -->
        <div v-if="distancia && precio" class="space-y-6 border-t border-gray-200 pt-6">
          <!-- Resumen del Cálculo -->
          <div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
            <h3 class="text-lg font-bold text-gray-900 flex items-center mb-4">
              <span class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">✓</span>
              Precio Calculado
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p class="text-sm text-gray-600">Origen:</p>
                <p class="text-gray-900 font-medium">📍 {{ direccionOrigen }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Destino:</p>
                <p class="text-gray-900 font-medium">📦 {{ direccionDestino }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Distancia:</p>
                <p class="text-gray-900 font-medium">📏 {{ distancia.toFixed(2) }} km</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Precio Base:</p>
                <p class="text-green-600 font-bold text-xl">${{ precioBase.toLocaleString() }} CLP</p>
              </div>
            </div>
          </div>

          <!-- Formulario Completo -->
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-gray-900 flex items-center">
              <span class="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">2</span>
              Completa los detalles
            </h3>
            
            <!-- Carga -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">📦 ¿Qué necesitas trasladar?</label>
              <input
                v-model="carga"
                type="text"
                placeholder="Ej: Muebles, cajas, electrodomésticos..."
                required
                class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <!-- Ayudante -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">👥 ¿Necesitas ayudante?</label>
              <div class="flex space-x-4">
                <label class="flex-1 cursor-pointer">
                  <input type="radio" v-model="ayudante" value="no" class="sr-only peer">
                  <div class="border-2 border-gray-300 rounded-lg p-3 text-center peer-checked:border-green-600 peer-checked:bg-green-50 transition-all">
                    <p class="font-semibold text-gray-900">No</p>
                    <p class="text-sm text-gray-500">Sin costo adicional</p>
                  </div>
                </label>
                <label class="flex-1 cursor-pointer">
                  <input type="radio" v-model="ayudante" value="sí" class="sr-only peer">
                  <div class="border-2 border-gray-300 rounded-lg p-3 text-center peer-checked:border-green-600 peer-checked:bg-green-50 transition-all">
                    <p class="font-semibold text-gray-900">Sí</p>
                    <p class="text-sm text-green-600 font-medium">+$10,000</p>
                  </div>
                </label>
              </div>
            </div>

            <!-- Fecha Programada -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">📅 ¿Para cuándo necesitas el flete?</label>
              <div class="grid grid-cols-2 gap-3 mb-3">
                <button type="button" @click="setFechaRapida('hoy')" 
                        class="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all">
                  Hoy
                </button>
                <button type="button" @click="setFechaRapida('mañana')" 
                        class="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all">
                  Mañana
                </button>
              </div>
              <input
                v-model="fechaProgramada"
                type="datetime-local"
                :min="fechaMinima"
                required
                class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <!-- Datos Personales -->
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
              <h4 class="font-semibold text-gray-900">👤 Tus datos</h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                <input
                  v-model="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                <input
                  v-model="telefono"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email (opcional)</label>
                <input
                  v-model="email"
                  type="email"
                  placeholder="tu@email.com"
                  class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <!-- Resumen Final con Precio -->
            <div class="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm opacity-90">Precio Total</p>
                  <p class="text-4xl font-bold">${{ precioFinal.toLocaleString() }} CLP</p>
                  <p class="text-sm opacity-75 mt-1">
                    {{ ayudante === 'sí' ? 'Incluye ayudante (+$10,000)' : 'Sin ayudante' }}
                  </p>
                </div>
                <svg class="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>

            <!-- Botón de Confirmación -->
            <button
              type="button"
              @click="enviarReserva"
              :disabled="enviando"
              class="w-full bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg v-if="enviando" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ enviando ? 'Enviando...' : '🚚 Confirmar y Solicitar Flete' }}</span>
            </button>

            <p class="text-xs text-gray-500 text-center">
              Al confirmar, tu solicitud será enviada a conductores verificados de FletesPro
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>




<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from '#app'

const router = useRouter()

const nombre = ref('')
const telefono = ref('')
const email = ref('')
const carga = ref('')
const ayudante = ref('no')
const fechaProgramada = ref('')
const enviando = ref(false)

const distancia = ref(null)
const precio = ref(null)
const direccionOrigen = ref('')
const direccionDestino = ref('')
const map = ref(null)

const origenPlace = ref(null)
const destinoPlace = ref(null)

// Backend URL (hardcoded para evitar problemas de SSR)
const backendURL = 'https://api.portespro.es'

// Computed para precio base y final
const precioBase = computed(() => Math.round(precio.value || 0))
const precioFinal = computed(() => {
  let total = precioBase.value
  if (ayudante.value === 'sí') {
    total += 10000
  }
  return Math.round(total)
})

// Fecha mínima (ahora)
const fechaMinima = computed(() => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 16)
})

let directionsService
let directionsRenderer

onMounted(() => {
  // API Key de Google Maps (hardcoded por ahora)
  const apiKey = encodeURIComponent('AIzaSyD6_IKXikaZ2YFx5R8yKVpFPUe_S6WOKJI')

  if (window.google && window.google.maps) {
    initMap()
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
    initMap()
  }

  googleScript.onerror = () => {
    console.error('❌ Error al cargar Google Maps API.')
    // Mostrar mensaje de error más amigable
    alert('Error al cargar Google Maps. Por favor verifica la configuración de la API key.')
  }

  document.head.appendChild(googleScript)
})

function initMap() {
  const chileBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-56.0, -75.0),
    new google.maps.LatLng(-17.5, -66.0)
  )

  const mapInstance = new google.maps.Map(map.value, {
    center: { lat: -33.45, lng: -70.645 },
    zoom: 10
  })

  directionsRenderer = new google.maps.DirectionsRenderer({ map: mapInstance })
  directionsService = new google.maps.DirectionsService()

  const inputOrigen = document.getElementById('origen')
  const inputDestino = document.getElementById('destino')

  const autocompleteOrigen = new google.maps.places.Autocomplete(inputOrigen, {
    bounds: chileBounds,
    strictBounds: true
  })

  const autocompleteDestino = new google.maps.places.Autocomplete(inputDestino, {
    bounds: chileBounds,
    strictBounds: true
  })

  autocompleteOrigen.addListener('place_changed', () => {
    origenPlace.value = autocompleteOrigen.getPlace()
  })

  autocompleteDestino.addListener('place_changed', () => {
    destinoPlace.value = autocompleteDestino.getPlace()
  })
}

// Función para establecer fechas rápidas
function setFechaRapida(opcion) {
  const ahora = new Date()
  
  if (opcion === 'hoy') {
    ahora.setHours(ahora.getHours() + 2) // 2 horas desde ahora
  } else if (opcion === 'mañana') {
    ahora.setDate(ahora.getDate() + 1)
    ahora.setHours(9, 0, 0, 0) // Mañana a las 9 AM
  }
  
  // Formatear para datetime-local
  ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset())
  fechaProgramada.value = ahora.toISOString().slice(0, 16)
}

function calcularRuta() {
  if (!origenPlace.value || !destinoPlace.value) {
    alert('Por favor, selecciona direcciones válidas desde las sugerencias.')
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

      const leg = result.routes[0].legs[0]
      distancia.value = leg.distance.value / 1000
      if (distancia.value <= 100) {
        precio.value = 15000 + distancia.value * 1300;
       } else {
      precio.value = distancia.value * 900; 
       }

      direccionOrigen.value = leg.start_address
      direccionDestino.value = leg.end_address
    } else {
      alert('No fue posible calcular la ruta.')
    }
  })
}

async function enviarReserva() {
  // Validaciones
  if (!nombre.value || !telefono.value) {
    alert('Por favor, completa tu nombre y teléfono.')
    return
  }
  
  if (!carga.value) {
    alert('Por favor, indica qué necesitas trasladar.')
    return
  }
  
  if (!fechaProgramada.value) {
    alert('Por favor, selecciona una fecha para el flete.')
    return
  }

  enviando.value = true

  // 📦 Crear cuerpo del POST usando el mismo formato que AdminFletes
  const body = {
    origen: direccionOrigen.value,
    destino: direccionDestino.value,
    carga: carga.value,
    ayudante: ayudante.value === 'sí',
    precio: Math.round(precioFinal.value), // Redondear a entero
    nota: `Distancia: ${distancia.value.toFixed(2)} km | Email: ${email.value || 'No proporcionado'}`,
    clienteNombre: nombre.value,
    clienteTelefono: telefono.value,
    programadoPara: fechaProgramada.value,
    creadoPor: 'cliente_web'
  }

  console.log('📦 [FleteCalculator] Enviando flete a conductores:', body)

  try {
    // Usar la misma ruta que AdminFletes
    const res = await fetch('https://api.fletespro.cl/api/admin/fletes/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const data = await res.json()
    console.log('✅ [FleteCalculator] Respuesta del servidor:', data)

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Error al enviar el flete')
    }

    // ✅ Solicitud enviada exitosamente
    console.log(`✅ Flete creado con ID: ${data.fleteId}`)
    
    // Guardar info en localStorage
    localStorage.setItem('ultimo_flete_id', data.fleteId)
    localStorage.setItem('ultimo_flete_nombre', nombre.value)
    
    // Mostrar mensaje de éxito
    alert(`✅ ¡Solicitud enviada exitosamente!
    
📦 ID del Flete: ${data.fleteId}
🚛 Tu flete ha sido enviado a todos los conductores disponibles
📱 Un conductor te contactará pronto por WhatsApp al ${telefono.value}
    
¡Gracias por usar FletesPro!`)
    
    // Limpiar formulario
    resetFormulario()
  } catch (error) {
    console.error('❌ [FleteCalculator] Error al enviar reserva:', error)
    alert('❌ Hubo un error al procesar tu solicitud. Por favor intenta nuevamente.')
  } finally {
    enviando.value = false
  }
}

// Función para resetear el formulario
function resetFormulario() {
  nombre.value = ''
  telefono.value = ''
  email.value = ''
  carga.value = ''
  ayudante.value = 'no'
  fechaProgramada.value = ''
  distancia.value = null
  precio.value = null
  direccionOrigen.value = ''
  direccionDestino.value = ''
  
  // Limpiar inputs de direcciones
  const inputOrigen = document.getElementById('origen')
  const inputDestino = document.getElementById('destino')
  if (inputOrigen) inputOrigen.value = ''
  if (inputDestino) inputDestino.value = ''
}


</script>

  
  <style scoped>
  </style>
  