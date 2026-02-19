<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-8">
    <h1 class="text-2xl font-black text-slate-900 tracking-tight mb-6">Crear tu cuenta</h1>

    <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Tarjeta Cliente -->
      <div @click="tipo = 'cliente'" :class="['rounded-2xl border-2 p-6 shadow-xl transition-all cursor-pointer', tipo === 'cliente' ? 'border-teal-500 ring-2 ring-teal-200 bg-white shadow-teal-500/10' : 'border-slate-200 bg-white hover:border-slate-300']">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-black text-slate-900">Cliente</h2>
        </div>
        <p class="text-sm text-slate-500 mb-4">Publica fletes y gestiona tus reservas.</p>

        <form @focusin="tipo = 'cliente'" @submit.prevent="registrarse('cliente')" class="space-y-3">
          <input v-model="clienteNombre" type="text" placeholder="Nombre completo" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white" />
          <input v-model="clienteEmail" type="email" placeholder="Correo electrónico" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white" />
          <input v-model="clienteTelefono" type="tel" placeholder="Teléfono (opcional)" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white" />
          <input v-model="clientePassword" type="password" placeholder="Contraseña" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white" />
          <button type="submit" class="w-full bg-teal-600 text-white p-3.5 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-teal-700 shadow-lg shadow-teal-500/30">Crear cuenta de Cliente</button>
        </form>
      </div>

      <!-- Tarjeta Conductor -->
      <div @click="tipo = 'conductor'" :class="['rounded-2xl border-2 p-6 shadow-xl transition-all cursor-pointer', tipo === 'conductor' ? 'border-teal-500 ring-2 ring-teal-200 bg-white shadow-teal-500/10' : 'border-slate-200 bg-white hover:border-slate-300']">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-black text-slate-900">Conductor</h2>
        </div>
        <p class="text-sm text-slate-500 mb-4">Recibe solicitudes de fletes y gestiona tus viajes.</p>

        <form @focusin="tipo = 'conductor'" @submit.prevent="registrarse('conductor')" class="space-y-3">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input v-model="conductorNombre" type="text" placeholder="Nombre completo *" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white" />
            <input v-model="conductorRut" type="text" placeholder="RUT *" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white" />
            <input v-model="conductorEmail" type="email" placeholder="Correo electrónico *" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white" />
            <input v-model="conductorTelefono" type="tel" placeholder="Teléfono WhatsApp *" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white" />
            <input v-model="conductorVehiculoPlaca" type="text" placeholder="Patente (Placa)" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white" />
            <select v-model="conductorVehiculoTipo" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white">
              <option value="">Tipo de vehículo</option>
              <option value="camioneta">Camioneta</option>
              <option value="camion_3_4">Camión 3/4</option>
              <option value="camion_grande">Camión grande</option>
              <option value="camion_frio">Camión con frío</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
              <option value="otro">Otro</option>
            </select>
            <input v-model="conductorDireccion" type="text" placeholder="Dirección" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white md:col-span-2" />
            <input v-model="conductorPassword" type="password" placeholder="Contraseña *" class="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white md:col-span-2" />
          </div>
          <button type="submit" class="w-full bg-teal-600 text-white p-3.5 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-teal-700 shadow-lg shadow-teal-500/30">Crear cuenta de Conductor</button>
        </form>
      </div>
    </div>

    <NuxtLink to="/login" class="mt-6 text-sm font-bold text-teal-600 hover:text-teal-700">
      ¿Ya tienes cuenta? Inicia sesión
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from '#app'
import { API_BASE_URL } from '../config/api.js'

const router = useRouter()
const tipo = ref('cliente')

// Campos cliente
const clienteNombre = ref('')
const clienteEmail = ref('')
const clienteTelefono = ref('')
const clientePassword = ref('')

// Campos conductor
const conductorNombre = ref('')
const conductorEmail = ref('')
const conductorTelefono = ref('')
const conductorPassword = ref('')
const conductorRut = ref('')
const conductorVehiculoPlaca = ref('')
const conductorVehiculoTipo = ref('')
const conductorDireccion = ref('')

async function registrarse(tipoSubmit) {
  tipo.value = tipoSubmit
  
  let payload = {}
  
  if (tipo.value === 'cliente') {
    payload = {
      nombre: clienteNombre.value,
      email: clienteEmail.value,
      telefono: clienteTelefono.value,
      password: clientePassword.value,
      tipo: 'cliente'
    }
  } else if (tipo.value === 'conductor') {
    payload = {
      nombre: conductorNombre.value,
      email: conductorEmail.value,
      telefono: conductorTelefono.value,
      password: conductorPassword.value,
      tipo: 'conductor',
      rut: conductorRut.value,
      vehiculo_placa: conductorVehiculoPlaca.value,
      vehiculo_tipo: conductorVehiculoTipo.value,
      direccion: conductorDireccion.value
    }
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
      body: JSON.stringify({ email: conductorEmail.value || undefined, telefono: conductorTelefono.value || undefined, password: conductorPassword.value })
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
