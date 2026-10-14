<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

defineProps<{
  isRestoring?: boolean
}>()

const emit = defineEmits<{
  (e: 'restore'): void
  (e: 'openLegal', type: 'terms' | 'privacy'): void
}>()
</script>

<template>
  <footer class="px-5 py-2.5 text-center select-none">
    <!-- Compact Restore purchases link -->
    <button
      type="button"
      :disabled="isRestoring"
      class="inline-flex items-center gap-1.5 text-xs font-bold text-kid-purple hover:text-kid-purple-dark active:opacity-75 transition-colors py-1 px-3 rounded-full hover:bg-kid-purple-light/50"
      @click="emit('restore')"
    >
      <Loader2 v-if="isRestoring" class="w-3.5 h-3.5 animate-spin" />
      <span>Восстановить покупки</span>
    </button>

    <!-- Legal and info links -->
    <div class="flex items-center justify-center gap-3 text-[10px] text-slate-400 font-medium mt-1">
      <button
        type="button"
        class="hover:underline hover:text-slate-600 transition-colors"
        @click="emit('openLegal', 'terms')"
      >
        Условия использования
      </button>
      <span>•</span>
      <button
        type="button"
        class="hover:underline hover:text-slate-600 transition-colors"
        @click="emit('openLegal', 'privacy')"
      >
        Конфиденциальность
      </button>
    </div>
  </footer>
</template>
