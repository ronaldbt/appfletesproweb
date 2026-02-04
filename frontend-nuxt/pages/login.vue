<template>
  <div class="min-h-screen bg-white text-gray-900 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-extrabold text-green-700">Bienvenido a FletesPro</h1>
        <p class="text-sm text-gray-600 mt-1">Ingresa para continuar</p>
      </div>

      <form @submit.prevent="iniciarSesion" class="space-y-4 bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          required
          class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          required
          class="w-full p-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          class="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700 transition"
        >
          Entrar
        </button>
      </form>

      <NuxtLink to="/register" class="block text-center mt-4 text-sm text-green-700 hover:underline">
        ¿No tienes cuenta? Regístrate aquí
      </NuxtLink>
    </div>
  </div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from '#app'
  import { apiUrl, API_ENDPOINTS } from '../config/api.js'
  
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  
  async function iniciarSesion() {
    if (!email.value || !password.value) {
      alert('Por favor, completa todos los campos')
      return
    }

    const res = await fetch(apiUrl(API_ENDPOINTS.LOGIN), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
  
    const data = await res.json()
    if (data.usuario) {
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
      
      // Redireccionar según tipo de usuario
      if (data.usuario.tipo === 'admin') {
        router.push('/dashboard-admin')
      } else if (data.usuario.tipo === 'conductor') {
        router.push('/dashboard-conductor')
      } else {
        router.push('/dashboard-cliente')
      }
    } else {
      alert(data.error || 'Error al iniciar sesión')
    }
  }
  </script>
  
  <style scoped>
  /* Puedes agregar estilos adicionales aquí si quieres */
  </style>