<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <h1 class="text-3xl font-extrabold text-green-700">⚙️ Configuración</h1>
      <p class="text-gray-600 mt-1">Preferencias del sistema y ajustes generales.</p>
    </div>

    <form class="space-y-6">
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold mb-4">Parámetros de negocio</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Comisión de la plataforma (%)</label>
            <input v-model.number="config.comision" type="number" min="0" max="100" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"/>
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Día de liquidación a conductores</label>
            <select v-model="config.diaLiquidacion" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option>lunes</option>
              <option>martes</option>
              <option>miércoles</option>
              <option>jueves</option>
              <option>viernes</option>
            </select>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold mb-4">Notificaciones</h2>
        <div class="space-y-3">
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="config.notificarAsignacion" class="h-4 w-4 text-emerald-600 border-gray-300 rounded"/>
            <span class="text-sm text-gray-700">Notificar por WhatsApp al asignar flete</span>
          </label>
          <label class="flex items-center gap-3">
            <input type="checkbox" v-model="config.notificarRecordatorio" class="h-4 w-4 text-emerald-600 border-gray-300 rounded"/>
            <span class="text-sm text-gray-700">Enviar recordatorio 24h antes</span>
          </label>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3">
        <button type="button" @click="reset" class="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Restablecer</button>
        <button type="button" @click="guardar" class="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Guardar cambios</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AdminConfiguracion',
  data() {
    return {
      config: {
        comision: 10,
        diaLiquidacion: 'miércoles',
        notificarAsignacion: true,
        notificarRecordatorio: true
      }
    }
  },
  methods: {
    reset() {
      this.config = { comision: 10, diaLiquidacion: 'miércoles', notificarAsignacion: true, notificarRecordatorio: true }
    },
    async guardar() {
      // TODO: Integrar con endpoint real (e.g., /api/admin/config)
      this.$toast?.success?.('Configuración guardada')
    }
  }
}
</script>

<style scoped>
</style>



