<template>
  <div class="mx-auto max-w-6xl">
    <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Fletes - Admin</h1>

    <section class="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm">
      <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">Nuevo flete</h2>
      <form @submit.prevent="enviar" class="mt-3 space-y-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Origen</span>
            <input v-model="form.origen" required placeholder="Dirección origen"
                   class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Destino</span>
            <input v-model="form.destino" required placeholder="Dirección destino"
                   class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Carga</span>
            <input v-model="form.carga" required placeholder="Descripción de la carga"
                   class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Precio (CLP)</span>
            <input v-model.number="form.precio" type="number" min="0" placeholder="Opcional"
                   class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label class="md:col-span-2 flex items-center gap-2">
            <input type="checkbox" v-model="form.ayudante" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span class="text-sm text-slate-700 dark:text-slate-300">Necesita ayudante</span>
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Cliente</span>
            <input v-model="form.clienteNombre" placeholder="Nombre del cliente"
                   class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Teléfono</span>
            <input v-model="form.clienteTelefono" placeholder="+56912345678"
                   class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label class="flex flex-col gap-1">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Programado para</span>
            <input v-model="form.programadoPara" type="datetime-local"
                   class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
          <label class="md:col-span-2 flex flex-col gap-1">
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Nota</span>
            <input v-model="form.nota" placeholder="Observación opcional"
                   class="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500" />
          </label>
        </div>
        <button :disabled="loading"
                class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed">
          {{ loading ? 'Enviando...' : 'Enviar a conductores' }}
        </button>
        <p v-if="msg" role="status" class="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{{ msg }}</p>
      </form>
    </section>

    <section class="mt-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-100">Fletes enviados</h2>
        <div class="flex items-center gap-2">
          <select v-model="filtroEstado" @change="listar" aria-label="Filtrar por estado"
                  class="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Todos</option>
            <option v-for="e in estados" :key="e" :value="e">{{ e }}</option>
          </select>
          <button @click="listar"
                  class="inline-flex items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-700 px-3 py-2 text-sm font-semibold text-white hover:brightness-110">
            Refrescar
          </button>
        </div>
      </div>

      <div class="mt-3 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700" role="region" aria-label="Tabla de fletes" tabindex="0">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
              <th class="px-3 py-2 text-left font-semibold">ID</th>
              <th class="px-3 py-2 text-left font-semibold">Origen</th>
              <th class="px-3 py-2 text-left font-semibold">Destino</th>
              <th class="px-3 py-2 text-left font-semibold">Carga</th>
              <th class="px-3 py-2 text-left font-semibold">Ayudante</th>
              <th class="px-3 py-2 text-left font-semibold">Precio</th>
              <th class="px-3 py-2 text-left font-semibold">Estado</th>
              <th class="px-3 py-2 text-left font-semibold">Asignado a</th>
              <th class="px-3 py-2 text-left font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="f in fletes" :key="f.id" class="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
              <td class="px-3 py-2 font-mono text-xs text-slate-700 dark:text-slate-300">{{ f.id }}</td>
              <td class="px-3 py-2 text-slate-800 dark:text-slate-100">{{ f.origen }}</td>
              <td class="px-3 py-2 text-slate-800 dark:text-slate-100">{{ f.destino }}</td>
              <td class="px-3 py-2 text-slate-800 dark:text-slate-100">{{ f.carga }}</td>
              <td class="px-3 py-2 text-slate-800 dark:text-slate-100">{{ f.ayudante ? 'Sí' : 'No' }}</td>
              <td class="px-3 py-2 text-slate-800 dark:text-slate-100">{{ f.precio ? f.precio.toLocaleString() : '-' }}</td>
              <td class="px-3 py-2">
                <span :class="badgeClass(f.estado)" class="inline-block rounded-full px-2 py-0.5 text-xs font-bold">
                  {{ f.estado }}
                </span>
              </td>
              <td class="px-3 py-2 font-mono text-xs text-slate-700 dark:text-slate-300">{{ f.conductor_asignado || '-' }}</td>
              <td class="px-3 py-2">
                <div class="flex items-center gap-2">
                  <select v-model="f._nuevoEstado" aria-label="Cambiar estado"
                          class="rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1 text-xs text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500">
                    <option disabled value="">Cambiar estado</option>
                    <option v-for="e in estados" :key="e" :value="e">{{ e }}</option>
                  </select>
                  <button @click="cambiarEstado(f)" :disabled="!f._nuevoEstado"
                          class="inline-flex items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-700 px-2.5 py-1.5 text-xs font-semibold text-white hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed">
                    Guardar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
import { API_BASE_URL } from '../../config/api'

export default {
  name: 'AdminFletes',
  data () {
    return {
      form: { origen: '', destino: '', carga: '', ayudante: false, precio: null, nota: '', clienteNombre: '', clienteTelefono: '', programadoPara: '' },
      loading: false,
      msg: '',
      fletes: [],
      filtroEstado: '',
      estados: ['pendiente','enviado','asignado','en_progreso','completado','cancelado_admin','cancelado_conductor','cancelado_cliente','expirado']
    }
  },
  methods: {
    badgeClass (estado) {
      const base = 'text-slate-900 dark:text-slate-900'
      switch (estado) {
        case 'asignado': return base + ' bg-emerald-300'
        case 'enviado': return base + ' bg-indigo-300'
        case 'en_progreso': return base + ' bg-amber-300'
        case 'completado': return base + ' bg-green-300'
        case 'expirado': return base + ' bg-slate-300'
        default:
          if (String(estado).startsWith('cancelado')) return base + ' bg-rose-300'
          return base + ' bg-slate-200'
      }
    },
    async enviar () {
      try {
        this.loading = true
        this.msg = ''
        const res = await fetch(`${API_BASE_URL}/api/admin/fletes/send`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.form)
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Error al enviar')
        this.msg = `Enviado correctamente. ID: ${data.fleteId}`
        this.form = { origen: '', destino: '', carga: '', ayudante: false, precio: null, nota: '', clienteNombre: '', clienteTelefono: '', programadoPara: '' }
        this.listar()
      } catch (e) { this.msg = `Error: ${e.message}` } finally { this.loading = false }
    },
    async listar () {
      const q = this.filtroEstado ? `?estado=${encodeURIComponent(this.filtroEstado)}` : ''
      const res = await fetch(`${API_BASE_URL}/api/admin/fletes${q}`)
      const data = await res.json()
      this.fletes = Array.isArray(data) ? data.map(x => ({ ...x, _nuevoEstado: '' })) : []
    },
    async cambiarEstado (f) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/admin/fletes/${f.id}/estado`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ estado: f._nuevoEstado })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Error al cambiar estado')
        this.listar()
      } catch (e) { alert(e.message) }
    }
  },
  mounted () { this.listar() }
}
</script>
