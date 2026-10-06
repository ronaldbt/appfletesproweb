<template>
  <article class="cotizacion-sheet">
    <header class="cotizacion-sheet__header">
      <div class="cotizacion-sheet__brand">
        <h1 class="cotizacion-sheet__logo">FletesPro</h1>
      </div>
      <div class="cotizacion-sheet__meta">
        <h2 class="cotizacion-sheet__title">COTIZACIÓN</h2>
        <p class="cotizacion-sheet__number">{{ numeroCotizacion }}</p>
      </div>
    </header>

    <section class="cotizacion-sheet__info">
      <div class="cotizacion-sheet__info-col">
        <h3 class="cotizacion-sheet__info-title">Cliente</h3>
        <p class="cotizacion-sheet__line cotizacion-sheet__line--strong">{{ form.clienteNombre || '—' }}</p>
        <p class="cotizacion-sheet__line">
          {{ [form.clienteRut, form.clienteTelefono].filter(Boolean).join(' · ') || '—' }}
        </p>
        <p class="cotizacion-sheet__line">{{ form.clienteEmail || '—' }}</p>
      </div>
      <div class="cotizacion-sheet__info-col">
        <h3 class="cotizacion-sheet__info-title">Servicio</h3>
        <p class="cotizacion-sheet__line"><span class="cotizacion-sheet__label">Origen:</span> {{ form.origen || '—' }}</p>
        <p class="cotizacion-sheet__line"><span class="cotizacion-sheet__label">Destino:</span> {{ form.destino || '—' }}</p>
        <p class="cotizacion-sheet__line">
          {{ [fechaServicioLabel, form.tipoVehiculo].filter(Boolean).join(' · ') || '—' }}
        </p>
        <p v-if="form.nota" class="cotizacion-sheet__line cotizacion-sheet__note">{{ form.nota }}</p>
      </div>
    </section>

    <section class="cotizacion-sheet__table-wrap">
      <table class="cotizacion-sheet__table">
        <thead>
          <tr>
            <th>Ítem</th>
            <th>Descripción</th>
            <th class="text-right">Cant.</th>
            <th class="text-right">P. Unit.</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td class="cotizacion-sheet__desc">{{ item.descripcion || '—' }}</td>
            <td class="text-right">{{ item.cantidad }}</td>
            <td class="text-right">{{ formatCLP(item.precio || 0) }}</td>
            <td class="text-right cotizacion-sheet__amount">{{ formatCLP(lineTotal(item)) }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <footer class="cotizacion-sheet__footer">
      <div class="cotizacion-sheet__footer-left">
        <p class="cotizacion-sheet__validez">
          <strong>Validez:</strong> {{ form.validez || '—' }}
        </p>
        <p class="cotizacion-sheet__disclaimer">
          Esta cotización es informativa y puede variar según disponibilidad de conductores y condiciones de acceso.
        </p>
      </div>
      <div class="cotizacion-sheet__totals">
        <div class="cotizacion-sheet__total-row">
          <span>Subtotal</span>
          <span>{{ formatCLP(subtotal) }}</span>
        </div>
        <div class="cotizacion-sheet__total-row cotizacion-sheet__total-row--iva">
          <span>+ 19% IVA</span>
          <span>{{ formatCLP(iva) }}</span>
        </div>
      </div>
    </footer>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  form: { type: Object, required: true },
  items: { type: Array, required: true },
  numeroCotizacion: { type: String, required: true },
  subtotal: { type: Number, required: true },
  iva: { type: Number, required: true }
})

function formatCLP (amount) {
  return Number(amount || 0).toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  })
}

function lineTotal (item) {
  return (Number(item.cantidad) || 0) * (Number(item.precio) || 0)
}

const fechaServicioLabel = computed(() => {
  if (!props.form.fechaServicio) return ''
  try {
    return new Date(`${props.form.fechaServicio}T12:00:00`).toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return props.form.fechaServicio
  }
})
</script>

<style scoped>
.cotizacion-sheet {
  width: 100%;
  max-width: 210mm;
  min-height: 277mm;
  margin: 0 auto;
  padding: 14mm 16mm 16mm;
  background: #fff;
  color: #111827;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 11pt;
  line-height: 1.4;
  box-sizing: border-box;
}

.cotizacion-sheet__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 10mm;
  padding: 6mm 7mm;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 8px;
  color: #fff;
}

.cotizacion-sheet__logo {
  margin: 0;
  font-size: 22pt;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.cotizacion-sheet__meta {
  text-align: right;
}

.cotizacion-sheet__title {
  margin: 0 0 4px;
  font-size: 26pt;
  font-weight: 800;
  line-height: 1;
}

.cotizacion-sheet__number {
  margin: 0;
  font-size: 10pt;
  font-family: ui-monospace, monospace;
  opacity: 0.95;
}

.cotizacion-sheet__info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6mm;
  margin-bottom: 8mm;
}

.cotizacion-sheet__info-col {
  padding: 5mm 6mm;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.cotizacion-sheet__info-title {
  margin: 0 0 4mm;
  padding-bottom: 2mm;
  border-bottom: 2px solid #10b981;
  font-size: 11pt;
  font-weight: 700;
  color: #059669;
}

.cotizacion-sheet__line {
  margin: 0 0 2.5mm;
  font-size: 10pt;
  color: #374151;
}

.cotizacion-sheet__line--strong {
  font-weight: 700;
  color: #111827;
  font-size: 11pt;
}

.cotizacion-sheet__label {
  font-weight: 600;
  color: #111827;
}

.cotizacion-sheet__note {
  margin-top: 3mm;
  padding-top: 3mm;
  border-top: 1px dashed #d1d5db;
  white-space: pre-wrap;
}

.cotizacion-sheet__table-wrap {
  margin-bottom: 8mm;
}

.cotizacion-sheet__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 9.5pt;
}

.cotizacion-sheet__table thead {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
}

.cotizacion-sheet__table th {
  padding: 3mm 2.5mm;
  text-align: left;
  font-weight: 700;
}

.cotizacion-sheet__table td {
  padding: 2.5mm;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
}

.cotizacion-sheet__desc {
  white-space: pre-wrap;
  word-break: break-word;
}

.cotizacion-sheet__amount {
  font-weight: 700;
}

.text-right {
  text-align: right;
}

.cotizacion-sheet__footer {
  display: grid;
  grid-template-columns: 1fr 72mm;
  gap: 6mm;
  align-items: start;
}

.cotizacion-sheet__validez {
  margin: 0 0 3mm;
  padding: 4mm 5mm;
  background: #f0fdf4;
  border-left: 3px solid #10b981;
  border-radius: 4px;
  font-size: 10pt;
}

.cotizacion-sheet__disclaimer {
  margin: 0;
  font-size: 8.5pt;
  font-style: italic;
  color: #6b7280;
  line-height: 1.45;
}

.cotizacion-sheet__totals {
  padding: 5mm 6mm;
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 2px solid #10b981;
  border-radius: 6px;
}

.cotizacion-sheet__total-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 2mm 0;
  font-size: 10pt;
  border-bottom: 1px solid #bbf7d0;
}

.cotizacion-sheet__total-row:last-child {
  border-bottom: none;
}

.cotizacion-sheet__total-row--iva {
  font-weight: 700;
  color: #047857;
}

@media print {
  .cotizacion-sheet {
    max-width: none;
    min-height: auto;
    padding: 0;
    box-shadow: none !important;
  }

  .cotizacion-sheet__header,
  .cotizacion-sheet__table thead,
  .cotizacion-sheet__totals {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
