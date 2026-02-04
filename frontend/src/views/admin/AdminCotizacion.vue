<template>
  <div id="cotizacion-container" class="cotizacion-wrapper">
    <!-- Barra de acciones (solo visible en pantalla) -->
    <div class="action-bar print:hidden">
      <button
        type="button"
        @click="resetFormulario"
        class="btn-secondary"
      >
        Limpiar cotización
      </button>
      <button
        type="button"
        @click="imprimirPDF"
        class="btn-primary"
      >
        Exportar a PDF / Imprimir
      </button>
    </div>

    <!-- Contenedor principal de la cotización -->
    <div class="cotizacion-content">
      <!-- Encabezado -->
      <header class="cotizacion-header">
        <div class="header-left">
          <h1 class="logo-text">FletesPro</h1>
        </div>
        <div class="header-right">
          <h2 class="titulo-cotizacion">COTIZACIÓN</h2>
          <p class="numero-cotizacion">{{ numeroCotizacion }}</p>
        </div>
      </header>

      <!-- Información del cliente y servicio -->
      <section class="info-section">
        <div class="info-grid">
          <div class="info-block">
            <h3 class="info-title">Cliente</h3>
            <input
              v-model="form.clienteNombre"
              class="info-input"
              placeholder="Nombre o Empresa"
            />
            <div class="info-row mt-2">
              <input
                v-model="form.clienteRut"
                class="info-input flex-1"
                placeholder="RUT / ID"
              />
              <input
                v-model="form.clienteTelefono"
                class="info-input flex-1 ml-2"
                placeholder="+56 9 XXXX XXXX"
              />
            </div>
            <input
              v-model="form.clienteEmail"
              type="email"
              class="info-input mt-2"
              placeholder="Correo electrónico"
            />
          </div>
          <div class="info-block">
            <h3 class="info-title">Servicio</h3>
            <input
              v-model="form.origen"
              class="info-input"
              placeholder="Origen"
            />
            <input
              v-model="form.destino"
              class="info-input mt-2"
              placeholder="Destino"
            />
            <div class="info-row mt-2">
              <input
                v-model="form.fechaServicio"
                type="date"
                class="info-input flex-1"
              />
              <input
                v-model="form.tipoVehiculo"
                class="info-input flex-1 ml-2"
                placeholder="Tipo de vehículo"
              />
            </div>
            <textarea
              v-model="form.nota"
              rows="2"
              class="info-input mt-2"
              placeholder="Notas / Detalles adicionales"
            ></textarea>
          </div>
        </div>
      </section>

      <!-- Tabla de ítems -->
      <section class="items-section">
        <div class="table-wrapper">
          <table class="items-table">
            <thead>
              <tr>
                <th class="col-item">Ítem</th>
                <th class="col-desc">Descripción</th>
                <th class="col-cant">Cant.</th>
                <th class="col-precio">P. Unit.</th>
                <th class="col-total">Total</th>
                <th class="col-actions print:hidden"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id">
                <td class="col-item">{{ index + 1 }}</td>
                <td class="col-desc">
                  <textarea
                    v-model="item.descripcion"
                    class="table-textarea"
                    placeholder="Descripción del servicio"
                    rows="1"
                    @input="autoResizeTextarea"
                  ></textarea>
                  <!-- Versión para impresión que muestra el texto completo -->
                  <div class="table-textarea-print">{{ item.descripcion }}</div>
                </td>
                <td class="col-cant">
                  <input
                    v-model.number="item.cantidad"
                    type="number"
                    min="1"
                    class="table-input text-right"
                  />
                </td>
                <td class="col-precio">
                  <input
                    v-model.number="item.precio"
                    type="number"
                    min="0"
                    class="table-input text-right"
                  />
                </td>
                <td class="col-total text-right font-semibold">
                  {{ (item.cantidad * item.precio || 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }) }}
                </td>
                <td class="col-actions print:hidden">
                  <button
                    type="button"
                    @click="eliminarItem(index)"
                    class="btn-remove"
                  >
                    ×
                  </button>
                </td>
              </tr>
              <tr v-if="!items.length">
                <td colspan="6" class="text-center py-4 text-gray-400">
                  Agrega ítems para construir la cotización
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Botón agregar ítem (solo visible en pantalla) -->
        <div class="print:hidden mt-3">
          <button
            type="button"
            @click="agregarItem"
            class="btn-add-item"
          >
            + Agregar ítem
          </button>
        </div>
      </section>

      <!-- Totales y condiciones -->
      <section class="totals-section">
        <div class="totals-grid">
          <div class="totals-left">
            <div class="conditions-block">
              <div class="condition-row">
                <span class="condition-label">Validez:</span>
                <input
                  v-model="form.validez"
                  class="condition-input"
                  placeholder="Válida por 5 días"
                />
              </div>
            </div>
            <p class="disclaimer">
              Esta cotización es informativa y puede variar según disponibilidad de conductores y condiciones de acceso.
            </p>
          </div>
          <div class="totals-right">
            <div class="totals-box">
              <div class="total-row">
                <span>Subtotal</span>
                <span class="total-value">
                  {{ subtotal.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }) }}
                </span>
              </div>
              <div class="total-row">
                <span>Descuento</span>
                <input
                  v-model.number="descuento"
                  type="number"
                  min="0"
                  class="total-input"
                  placeholder="$0"
                />
              </div>
              <div class="total-row">
                <span>Impuestos</span>
                <span class="total-value">$0</span>
              </div>
              <div class="total-row">
                <span>Envío</span>
                <span class="total-value">$0</span>
              </div>
              <div class="total-row total-final">
                <span>Total</span>
                <span class="total-final-value">
                  {{ total.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, onMounted } from 'vue'

const form = reactive({
  clienteNombre: '',
  clienteRut: '',
  clienteTelefono: '',
  clienteEmail: '',
  origen: '',
  destino: '',
  fechaServicio: '',
  tipoVehiculo: '',
  nota: '',
  validez: 'Válida por 5 días'
})

const items = ref([
  { id: 1, descripcion: 'Servicio de transporte', cantidad: 1, precio: 0 }
])

const descuento = ref(0)

const numeroCotizacion = computed(() => {
  const d = new Date()
  const year = d.getFullYear()
  const num = Math.floor(Math.random() * 100000)
  return `COT-${year}-${num}`
})

const subtotal = computed(() => {
  return items.value.reduce((acc, item) => {
    const totalItem = (Number(item.cantidad) || 0) * (Number(item.precio) || 0)
    return acc + totalItem
  }, 0)
})

const total = computed(() => {
  const desc = Number(descuento.value) || 0
  return Math.max(subtotal.value - desc, 0)
})

function agregarItem() {
  const nextId = (items.value[items.value.length - 1]?.id || 0) + 1
  items.value.push({
    id: nextId,
    descripcion: '',
    cantidad: 1,
    precio: 0
  })
}

function eliminarItem(index) {
  items.value.splice(index, 1)
}

function autoResizeTextarea(event) {
  const textarea = event.target
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}

function imprimirPDF() {
  // Cambiar el título temporalmente para que no aparezca en el PDF
  const originalTitle = document.title
  document.title = 'Cotización FletesPro'
  window.print()
  // Restaurar el título después de un breve delay
  setTimeout(() => {
    document.title = originalTitle
  }, 100)
}

function resetFormulario() {
  form.clienteNombre = ''
  form.clienteRut = ''
  form.clienteTelefono = ''
  form.clienteEmail = ''
  form.origen = ''
  form.destino = ''
  form.fechaServicio = ''
  form.tipoVehiculo = ''
  form.nota = ''
  form.validez = 'Válida por 5 días'
  items.value = [
    { id: 1, descripcion: 'Servicio de transporte', cantidad: 1, precio: 0 }
  ]
  descuento.value = 0
}
</script>

<style scoped>
/* Estilos generales */
.cotizacion-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: white;
}

.action-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background: #10b981;
  color: white;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

.btn-primary:hover {
  background: #059669;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
  transform: translateY(-1px);
}

.btn-secondary {
  background: white;
  color: #374151;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 500;
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #10b981;
}

/* Encabezado */
.cotizacion-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding: 24px 28px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

.logo-text {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.titulo-cotizacion {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
  text-align: right;
}

.numero-cotizacion {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-align: right;
  font-family: monospace;
}

/* Información del cliente y servicio */
.info-section {
  margin-bottom: 32px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.info-block {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.info-title {
  font-size: 15px;
  font-weight: 600;
  color: #10b981;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid #10b981;
}

.info-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  color: #1f2937;
  background: #f9fafb;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;
}

.info-input:focus {
  border-color: #10b981;
  background: white;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.info-row {
  display: flex;
  align-items: center;
}

.ml-2 {
  margin-left: 8px;
}

.mt-2 {
  margin-top: 8px;
}

.mt-3 {
  margin-top: 12px;
}

/* Tabla de ítems */
.items-section {
  margin-bottom: 32px;
  padding: 24px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

.items-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.items-table thead {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.items-table th {
  padding: 14px 12px;
  text-align: left;
  font-weight: 600;
  color: white;
  border-bottom: 2px solid #059669;
  font-size: 13px;
}

.items-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: top;
}

.items-table td.col-desc {
  vertical-align: top;
  padding: 8px;
}

.items-table tbody tr:hover {
  background: #f9fafb;
}

.col-item {
  width: 50px;
  text-align: center;
}

.col-desc {
  min-width: 300px;
}

.col-cant {
  width: 100px;
}

.col-precio {
  width: 140px;
}

.col-total {
  width: 140px;
}

.col-actions {
  width: 50px;
}

.table-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 13px;
  color: #1f2937;
  background: transparent;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;
}

.table-input:focus {
  border-color: #10b981;
  background: #f0fdf4;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
}

.table-textarea {
  width: 100%;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 13px;
  color: #1f2937;
  background: transparent;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;
  resize: none;
  overflow: hidden;
  line-height: 1.5;
  vertical-align: top;
}

.table-textarea:focus {
  border-color: #10b981;
  background: #f0fdf4;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
}

.table-textarea::placeholder {
  color: #9ca3af;
}

/* Versión del textarea para impresión (oculta en pantalla) */
.table-textarea-print {
  display: none;
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.font-semibold {
  font-weight: 600;
}

.py-4 {
  padding-top: 16px;
  padding-bottom: 16px;
}

.text-gray-400 {
  color: #9ca3af;
}

.btn-remove {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;
}

.btn-remove:hover {
  background: #fee2e2;
}

.btn-add-item {
  background: #10b981;
  color: white;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.25);
}

.btn-add-item:hover {
  background: #059669;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.35);
  transform: translateY(-2px);
}

/* Totales y condiciones */
.totals-section {
  margin-top: 32px;
  padding: 24px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.totals-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 32px;
}

.conditions-block {
  margin-bottom: 16px;
  padding: 20px;
  background: #f0fdf4;
  border-left: 4px solid #10b981;
  border-radius: 10px;
}

.condition-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.condition-label {
  font-size: 14px;
  font-weight: 600;
  color: #059669;
  min-width: 100px;
}

.condition-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 13px;
  color: #1f2937;
  background: white;
  outline: none;
  font-family: inherit;
  transition: all 0.2s;
}

.condition-input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.disclaimer {
  font-size: 11px;
  color: #6b7280;
  margin-top: 16px;
  line-height: 1.5;
  font-style: italic;
}

.totals-box {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 2px solid #10b981;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.15);
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 13px;
  color: #374151;
}

.total-row:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}

.total-input {
  width: 120px;
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  text-align: right;
  font-size: 13px;
  background: white;
  outline: none;
  font-family: inherit;
  transition: all 0.2s;
}

.total-input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
}

.total-value {
  font-weight: 500;
  color: #1f2937;
}

.total-final {
  margin-top: 12px;
  padding-top: 16px;
  border-top: 3px solid #10b981;
  font-weight: 700;
  background: white;
  padding: 16px;
  border-radius: 10px;
  margin-left: -24px;
  margin-right: -24px;
  margin-bottom: -24px;
}

.total-final-value {
  font-size: 24px;
  font-weight: 700;
  color: #10b981;
}

  /* Estilos de impresión - CRÍTICOS para que funcione el PDF */
@media print {
  @page {
    size: A4;
    margin: 15mm;
    /* Eliminar encabezados y pies de página del navegador */
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 15mm;
    margin-right: 15mm;
  }

  /* Ocultar cualquier elemento que muestre URL o título del navegador */
  body::before,
  body::after {
    display: none !important;
    content: none !important;
  }

  /* Asegurar que no aparezcan encabezados del navegador */
  @page {
    @top-center {
      content: none !important;
    }
    @bottom-center {
      content: none !important;
    }
  }

  /* Asegurar que el body y html sean visibles */
  html, body {
    background: white !important;
    color: black !important;
    width: 100% !important;
    height: auto !important;
    overflow: visible !important;
  }

  /* Ocultar elementos de la UI */
  .print\:hidden {
    display: none !important;
  }

  /* Asegurar que el contenedor principal sea visible */
  #cotizacion-container,
  .cotizacion-wrapper {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    background: white !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
  }

  .cotizacion-content {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    page-break-inside: avoid;
  }

  .cotizacion-header {
    page-break-after: avoid;
    display: flex !important;
    visibility: visible !important;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
    border-radius: 8px !important;
  }

  .info-section {
    display: block !important;
    visibility: visible !important;
  }

  .items-section {
    page-break-inside: avoid;
    display: block !important;
    visibility: visible !important;
  }

  .totals-section {
    page-break-before: avoid;
    display: block !important;
    visibility: visible !important;
  }

  /* Hacer que los inputs se vean como texto en PDF */
  .info-input,
  .table-input,
  .table-textarea,
  .condition-input,
  .total-input {
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
    appearance: none !important;
    -webkit-appearance: none !important;
    -moz-appearance: textfield !important;
    display: inline-block !important;
    visibility: visible !important;
    color: #1f2937 !important;
    resize: none !important;
    height: auto !important;
    min-height: auto !important;
  }

  .table-input:focus,
  .table-textarea:focus,
  .info-input:focus,
  .condition-input:focus,
  .total-input:focus {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .table-textarea {
    display: none !important;
  }

  /* Mostrar la versión de impresión del textarea */
  .table-textarea-print {
    display: block !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
    overflow: visible !important;
    width: 100% !important;
    line-height: 1.5 !important;
    color: #1f2937 !important;
    padding: 0 !important;
    margin: 0 !important;
    font-size: 13px !important;
    font-family: inherit !important;
  }

  /* Asegurar que la celda de descripción permita el contenido completo */
  .items-table td.col-desc {
    height: auto !important;
    vertical-align: top !important;
    padding: 8px !important;
    white-space: normal !important;
  }

  /* Permitir que las filas se expandan según el contenido */
  .items-table tr {
    height: auto !important;
  }

  /* Estilos de tabla para impresión */
  .items-table {
    border: 1px solid #1f2937 !important;
    display: table !important;
    visibility: visible !important;
    width: 100% !important;
  }

  .items-table thead {
    display: table-header-group !important;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  }

  .items-table th {
    color: white !important;
  }

  .items-table tbody {
    display: table-row-group !important;
  }

  .items-table th {
    background: #f3f4f6 !important;
    border-bottom: 2px solid #1f2937 !important;
    display: table-cell !important;
    visibility: visible !important;
  }

  .items-table td {
    border-bottom: 1px solid #e5e7eb !important;
    display: table-cell !important;
    visibility: visible !important;
    height: auto !important;
    vertical-align: top !important;
  }

  .items-table tr {
    display: table-row !important;
    visibility: visible !important;
  }

  .totals-box {
    border: 2px solid #10b981 !important;
    background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%) !important;
    display: block !important;
    visibility: visible !important;
  }

  .total-final-value {
    color: #10b981 !important;
  }

  /* Asegurar que todos los textos sean visibles */
  h1, h2, h3, p, span, div {
    color: #1f2937 !important;
    visibility: visible !important;
  }
}
</style>
