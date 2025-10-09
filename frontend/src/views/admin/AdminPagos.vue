<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-6">
      <h1 class="text-3xl font-extrabold text-green-700">💳 Pagos</h1>
      <p class="text-gray-600 mt-1">Gestiona liquidaciones a conductores y cobros a clientes.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <p class="text-sm text-green-700 font-semibold">Pagos pendientes a conductores</p>
        <p class="text-3xl font-extrabold text-gray-900 mt-2">{{ stats.pagosPendientesConductores }}</p>
      </div>
      <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <p class="text-sm text-green-700 font-semibold">Cobros pendientes a clientes</p>
        <p class="text-3xl font-extrabold text-gray-900 mt-2">{{ stats.cobrosPendientesClientes }}</p>
      </div>
      <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <p class="text-sm text-green-700 font-semibold">Liquidadas este mes</p>
        <p class="text-3xl font-extrabold text-gray-900 mt-2">{{ stats.liquidadasMes }}</p>
      </div>
    </div>

    <div class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 class="text-xl font-semibold">Movimientos recientes</h2>
        <div class="flex items-center gap-2">
          <select v-model="filtro" class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500">
            <option value="todos">Todos</option>
            <option value="pago_conductor">Pago a conductor</option>
            <option value="cobro_cliente">Cobro a cliente</option>
          </select>
          <input v-model="query" type="text" placeholder="Buscar..." class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500" />
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relacionado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
              <th class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="m in movimientosFiltrados" :key="m.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ m.fecha }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span :class="m.tipo === 'pago_conductor' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ m.tipo === 'pago_conductor' ? 'Pago a conductor' : 'Cobro a cliente' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ m.relacionado }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${{ m.monto.toLocaleString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                <button class="px-3 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Ver</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPagos',
  data() {
    return {
      filtro: 'todos',
      query: '',
      stats: {
        pagosPendientesConductores: 0,
        cobrosPendientesClientes: 0,
        liquidadasMes: 0
      },
      movimientos: []
    }
  },
  computed: {
    movimientosFiltrados() {
      return this.movimientos
        .filter(m => this.filtro === 'todos' || m.tipo === this.filtro)
        .filter(m => !this.query || (m.relacionado?.toLowerCase().includes(this.query.toLowerCase())))
    }
  },
  async created() {
    // TODO: Reemplazar por endpoints reales cuando estén listos
    // Simulación mínima para UI
    this.stats = {
      pagosPendientesConductores: 4,
      cobrosPendientesClientes: 2,
      liquidadasMes: 38
    }
    this.movimientos = [
      { id: 1, fecha: '2025-09-20', tipo: 'pago_conductor', relacionado: 'Juan Pérez (CND-123)', monto: 90000 },
      { id: 2, fecha: '2025-09-21', tipo: 'cobro_cliente', relacionado: 'Acme Ltda', monto: 120000 },
      { id: 3, fecha: '2025-09-22', tipo: 'pago_conductor', relacionado: 'María López (KTT-456)', monto: 75000 }
    ]
  }
}
</script>

<style scoped>
</style>



