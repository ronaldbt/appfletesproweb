<template>
  <div class="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-4">
    <h1 class="text-3xl font-extrabold mb-6 text-green-700">Crear tu cuenta</h1>

    <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Tarjeta Cliente -->
      <div :class="['rounded-xl border p-6 shadow-sm transition-all', tipo === 'cliente' ? 'border-green-500 ring-2 ring-green-300 bg-green-50' : 'border-gray-200 bg-gray-50']">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Cliente</h2>
          <button @click="tipo = 'cliente'" class="text-sm px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">Elegir</button>
        </div>
        <p class="text-sm text-gray-600 mb-4">Publica fletes y gestiona tus reservas.</p>

        <form v-if="tipo === 'cliente'" @submit.prevent="registrarse" class="space-y-3">
          <input v-model="nombre" type="text" placeholder="Nombre completo" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input v-model="email" type="email" placeholder="Correo electrónico" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input v-model="telefono" type="tel" placeholder="Teléfono (opcional)" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input v-model="password" type="password" placeholder="Contraseña" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
          <button type="submit" class="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700">Crear cuenta de Cliente</button>
        </form>
      </div>

      <!-- Tarjeta Conductor -->
      <div :class="['rounded-xl border p-6 shadow-sm transition-all', tipo === 'conductor' ? 'border-green-500 ring-2 ring-green-300 bg-green-50' : 'border-gray-200 bg-gray-50']">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Conductor</h2>
          <button @click="tipo = 'conductor'" class="text-sm px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700">Elegir</button>
        </div>
        <p class="text-sm text-gray-600 mb-4">Recibe solicitudes de fletes y gestiona tus viajes.</p>

        <form v-if="tipo === 'conductor'" @submit.prevent="registrarse" class="space-y-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input v-model="nombre" type="text" placeholder="Nombre completo *" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input v-model="rut" type="text" placeholder="RUT *" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input v-model="email" type="email" placeholder="Correo electrónico *" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input v-model="telefono" type="tel" placeholder="Teléfono WhatsApp *" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input v-model="vehiculo_placa" type="text" placeholder="Patente (Placa)" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            <select v-model="vehiculo_tipo" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Tipo de vehículo</option>
              <option value="camioneta">Camioneta</option>
              <option value="camion_3_4">Camión 3/4</option>
              <option value="camion_grande">Camión grande</option>
              <option value="camion_frio">Camión con frío</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
              <option value="otro">Otro</option>
            </select>
            <input v-model="direccion" type="text" placeholder="Dirección" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 md:col-span-2" />
            <input v-model="password" type="password" placeholder="Contraseña *" class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 md:col-span-2" />
          </div>
          <button type="submit" class="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700">Crear cuenta de Conductor</button>
        </form>
      </div>
    </div>

    <router-link to="/login" class="mt-6 text-sm text-green-700 hover:underline">
      ¿Ya tienes cuenta? Inicia sesión
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { API_BASE_URL } from '../config/api.js'

const router = useRouter()
const tipo = ref('cliente')

// Campos comunes
const nombre = ref('')
const email = ref('')
const telefono = ref('')
const password = ref('')

// Campos conductor
const rut = ref('')
const vehiculo_placa = ref('')
const vehiculo_tipo = ref('')
const direccion = ref('')

async function registrarse() {
  const payload = {
    nombre: nombre.value,
    email: email.value,
    telefono: telefono.value,
    password: password.value,
    tipo: tipo.value
  }
  if (tipo.value === 'conductor') {
    Object.assign(payload, {
      rut: rut.value,
      vehiculo_placa: vehiculo_placa.value,
      vehiculo_tipo: vehiculo_tipo.value,
      direccion: direccion.value
    })
  }

  const res = await fetch(`${API_BASE_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  const data = await res.json()
  if (!res.ok) {
    alert(data.error || 'Error al registrar')
    return
  }

  // Auto-login para mejorar UX si es conductor
  if (tipo.value === 'conductor') {
    const resLogin = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value || undefined, telefono: telefono.value || undefined, password: password.value })
    })
    const dataLogin = await resLogin.json()
    if (resLogin.ok && dataLogin.usuario) {
      try { localStorage.setItem('usuario', JSON.stringify(dataLogin.usuario)) } catch {}
      router.push('/dashboard-conductor')
      return
    }
  }

  // Cliente o fallback
  alert('✅ Registro exitoso, ahora inicia sesión')
  router.push('/login')
}
</script>

<style scoped>
</style>
