<template>
  <div class="fixed bottom-8 right-8 z-[80] flex flex-col items-end gap-3 pointer-events-none">
    <!-- Tooltip Label -->
    <div class="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black shadow-2xl flex items-center gap-2 border border-slate-800">
      <span class="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-[0_0_8px_#14b8a6]" />
      Hablamos Español, Inglés y Sueco
    </div>

    <!-- Main Floating Button -->
    <button
      class="w-16 h-16 bg-teal-600 text-white rounded-[2.2rem] shadow-[0_25px_60px_rgba(13,148,136,0.4)] flex items-center justify-center border-4 border-white relative group pointer-events-auto hover:scale-115 hover:rotate-12 active:scale-90 transition-all"
      :class="{ 'animate-bounce-slow': !isHovered }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="absolute -inset-1 bg-teal-400/20 blur-xl group-hover:bg-teal-400/40 transition-all rounded-full" />
      
      <svg class="relative z-10 group-hover:scale-0 transition-all duration-300 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <svg class="absolute z-10 scale-0 group-hover:scale-100 transition-all duration-300 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      
      <!-- Sparkle effects on hover -->
      <div class="absolute top-1 right-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-all">
        <svg class="w-3.5 h-3.5 text-teal-200 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
      
      <!-- Notification Dot -->
      <span class="absolute -top-1 -right-1 w-5 h-5 bg-teal-400 rounded-full border-4 border-white shadow-sm" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isHovered = ref(false)
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 5s infinite ease-in-out;
}
</style>



