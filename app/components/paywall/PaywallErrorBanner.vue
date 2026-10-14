<script setup lang="ts">
import { AlertCircle, RefreshCw, X } from 'lucide-vue-next'

defineProps<{
  error: string | null
}>()

const emit = defineEmits<{
  (e: 'retry'): void
  (e: 'dismiss'): void
}>()
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="error"
      class="mx-5 mb-3 p-3.5 rounded-2xl bg-rose-50 border border-rose-200/90 text-rose-800 text-xs shadow-sm flex items-start gap-2.5 select-none"
    >
      <AlertCircle class="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />

      <div class="flex-1 text-left">
        <p class="font-bold text-rose-900 leading-tight">
          Что-то пошло не так
        </p>
        <p class="text-[11px] text-rose-700 mt-0.5 leading-snug">
          {{ error }}
        </p>

        <div class="mt-2 flex items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-1 font-bold text-rose-800 hover:text-rose-950 underline text-[11px]"
            @click="emit('retry')"
          >
            <RefreshCw class="w-3 h-3" />
            <span>Повторить попытку</span>
          </button>
        </div>
      </div>

      <button
        type="button"
        class="text-rose-400 hover:text-rose-600 p-0.5 rounded-full"
        @click="emit('dismiss')"
      >
        <X class="w-3.5 h-3.5" />
      </button>
    </div>
  </Transition>
</template>
