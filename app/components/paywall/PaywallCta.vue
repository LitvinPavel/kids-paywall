<script setup lang="ts">
import { Loader2, ArrowRight } from 'lucide-vue-next'

defineProps<{
  buttonText: string
  subtext: string
  isLoading: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div class="px-5 pt-3 pb-2 select-none">
    <!-- Main CTA Button -->
    <button
      type="button"
      :disabled="isLoading || disabled"
      class="w-full h-14 rounded-2xl font-black text-base sm:text-lg text-white shadow-cta-glow flex items-center justify-center gap-2 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:to-green-600 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
      @click="emit('click')"
    >
      <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
      <template v-else>
        <span>{{ buttonText }}</span>
        <ArrowRight class="w-5 h-5 stroke-[2.5]" />
      </template>
    </button>

    <!-- Subtext reassurance for parents -->
    <p class="text-[11px] text-center text-slate-500 font-medium mt-2 leading-tight">
      {{ subtext }}
    </p>
  </div>
</template>
