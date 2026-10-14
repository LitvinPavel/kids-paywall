<script setup lang="ts">
import { X, Sparkles, Bug } from 'lucide-vue-next'

defineProps<{
  simulateError?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'toggleErrorSim'): void
}>()
</script>

<template>
  <header class="flex items-center justify-between px-5 pt-3 pb-2 select-none relative z-10">
    <!-- Close button (standard webview pattern) -->
    <button
      type="button"
      class="w-9 h-9 rounded-full bg-black/5 active:bg-black/10 flex items-center justify-center transition-colors focus:outline-none"
      aria-label="Закрыть"
      @click="emit('close')"
    >
      <X class="w-5 h-5 text-gray-500" />
    </button>

    <!-- Center Badge -->
    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-kid-yellow-light border border-kid-yellow/40">
      <Sparkles class="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse-gentle" />
      <span class="text-xs font-black tracking-wider text-amber-800 uppercase">Premium Pass</span>
    </div>

    <!-- Dev / Demo toggle for testing error state -->
    <button
      type="button"
      class="w-9 h-9 rounded-full flex items-center justify-center transition-colors focus:outline-none"
      :class="simulateError ? 'bg-rose-100 text-rose-600 ring-2 ring-rose-400' : 'bg-black/5 text-gray-400 hover:text-gray-600'"
      title="Тест состояния ошибки (Dev Mode)"
      @click="emit('toggleErrorSim')"
    >
      <Bug class="w-4 h-4" />
    </button>
  </header>
</template>
