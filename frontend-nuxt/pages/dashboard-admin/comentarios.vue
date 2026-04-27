<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-black text-slate-900">{{ $t('components.testimonials.adminTitle') }}</h1>
      <p class="text-slate-500 text-sm mt-1">{{ $t('components.testimonials.adminSubtitle') }}</p>
    </div>

    <div v-if="loadError" class="rounded-xl border border-red-200 bg-red-50 text-red-800 p-4 text-sm font-medium">
      {{ $t('components.testimonials.adminLoadError') }}
    </div>

    <div v-else-if="!items.length" class="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500 font-medium">
      {{ $t('components.testimonials.adminEmpty') }}
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="row in items"
        :key="row.id"
        class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
      >
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <div class="flex gap-0.5">
              <span v-for="s in 5" :key="s" class="text-lg leading-none" :class="s <= row.stars ? 'text-teal-500' : 'text-slate-200'">★</span>
            </div>
            <span class="text-xs text-slate-400 font-mono">{{ formatDate(row.createdAt) }}</span>
          </div>
          <p class="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap break-words">"{{ row.comment }}"</p>
          <p class="mt-3 font-bold text-slate-900">{{ row.name }}</p>
          <p v-if="row.roleLabel" class="text-xs text-teal-600 font-bold uppercase tracking-wide">{{ row.roleLabel }}</p>
          <p class="text-[10px] text-slate-400 mt-2 font-mono truncate" :title="row.id">id: {{ row.id }}</p>
        </div>
        <button
          type="button"
          class="shrink-0 px-4 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 text-sm font-black uppercase tracking-wide hover:bg-red-100 transition-colors disabled:opacity-50"
          :disabled="deletingId === row.id"
          @click="remove(row.id)"
        >
          {{ deletingId === row.id ? '…' : $t('components.testimonials.adminDelete') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

definePageMeta({ layout: 'admin' })

const { t } = useI18n()

const items = ref([])
const loadError = ref(false)
const deletingId = ref(null)

function formatDate(iso) {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    return d.toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' })
  } catch {
    return iso
  }
}

async function load() {
  loadError.value = false
  try {
    const res = await fetch('/api/admin/comentarios')
    const data = await res.json()
    if (!res.ok || !data?.items) {
      loadError.value = true
      return
    }
    items.value = data.items
  } catch {
    loadError.value = true
  }
}

async function remove(id) {
  if (!id || !confirm(t('components.testimonials.adminConfirmDelete'))) return
  deletingId.value = id
  try {
    const res = await fetch(`/api/admin/comentarios/${encodeURIComponent(id)}`, { method: 'DELETE' })
    if (!res.ok) {
      alert(t('components.testimonials.adminDeleteError'))
      return
    }
    items.value = items.value.filter((r) => r.id !== id)
  } catch {
    alert(t('components.testimonials.adminDeleteError'))
  } finally {
    deletingId.value = null
  }
}

onMounted(load)
</script>
