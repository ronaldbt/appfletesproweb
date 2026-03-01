<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600 text-white mb-4 shadow-lg">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Bienvenido a FletesPro</h1>
        <p class="text-sm text-slate-500 mt-1">Ingresa para continuar</p>
      </div>

      <form @submit.prevent="iniciarSesion" class="space-y-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-xl shadow-slate-200/50">
        <label class="block">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Correo electrónico</span>
          <input
            v-model="email"
            type="email"
            placeholder="tu@email.com"
            required
            class="mt-1 w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
          />
        </label>
        <label class="block">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Contraseña</span>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            class="mt-1 w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
          />
        </label>

        <button
          type="submit"
          class="w-full bg-teal-600 hover:bg-teal-700 text-white p-3.5 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 transition-all"
        >
          Entrar
        </button>
      </form>

      <NuxtLink to="/register" class="block text-center mt-6 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors">
        ¿No tienes cuenta? Regístrate aquí
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from '#app'
import { apiUrl, API_ENDPOINTS } from '../config/api.js'

const email = ref('')
const password = ref('')
const router = useRouter()
const route = useRoute()

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

    const redirect = Array.isArray(route.query.redirect) ? route.query.redirect[0] : route.query.redirect
    if (redirect && typeof redirect === 'string') {
      const path = redirect.startsWith('/') ? redirect : `/${redirect}`
      const allowed = (path.startsWith('/dashboard-admin') && data.usuario.tipo === 'admin') ||
        ((path.startsWith('/dashboard-conductor') || path.startsWith('/conductor/')) && data.usuario.tipo === 'conductor') ||
        ((path.startsWith('/dashboard-cliente') || path.startsWith('/cliente/')) && data.usuario.tipo === 'cliente')
      if (allowed) {
        router.push(path)
        return
      }
    }

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
