<script setup lang="ts">
import { ref } from 'vue'
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-vue-next'

const isFrameEnabled = ref(true)
const currentTime = ref('09:41')

// Update time occasionally for realism
if (import.meta.client) {
  const updateTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  updateTime()
  setInterval(updateTime, 30000)
}
</script>

<template>
  <div class="min-h-screen bg-slate-900/90 text-slate-800 flex flex-col items-center justify-center p-0 md:p-6 transition-colors selection:bg-indigo-100">
    <!-- Desktop Mode Switcher Bar -->
    <div class="hidden md:flex items-center gap-2 mb-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs select-none">
      <span class="text-white/70 font-semibold mr-1">Предпросмотр:</span>
      <button
        type="button"
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all"
        :class="isFrameEnabled ? 'bg-white text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'"
        @click="isFrameEnabled = true"
      >
        <Smartphone class="w-3.5 h-3.5" />
        <span>iPhone (390px)</span>
      </button>
      <button
        type="button"
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all"
        :class="!isFrameEnabled ? 'bg-white text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'"
        @click="isFrameEnabled = false"
      >
        <Monitor class="w-3.5 h-3.5" />
        <span>Mobile Fullscreen</span>
      </button>
    </div>

    <!-- Phone Frame Container -->
    <div
      class="w-full transition-all duration-300 relative"
      :class="[
        isFrameEnabled
          ? 'md:max-w-[390px] md:h-[844px] md:rounded-[48px] md:ring-[12px] md:ring-slate-800 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] md:border-4 md:border-slate-700/60 overflow-hidden bg-slate-50 flex flex-col'
          : 'max-w-md min-h-screen bg-slate-50 flex flex-col shadow-2xl'
      ]"
    >
      <!-- Simulated iOS Status Bar (visible inside phone frame) -->
      <div
        v-if="isFrameEnabled"
        class="hidden md:flex items-center justify-between px-7 pt-3 pb-1 select-none text-[13px] font-bold text-slate-900 shrink-0 relative z-20"
      >
        <span>{{ currentTime }}</span>

        <!-- Dynamic Island / Notch -->
        <div class="w-24 h-6 bg-black rounded-full mx-auto -mt-1 flex items-center justify-end pr-2 space-x-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
        </div>

        <div class="flex items-center gap-1.5 text-slate-800">
          <Signal class="w-3.5 h-3.5 stroke-[2.5]" />
          <Wifi class="w-3.5 h-3.5 stroke-[2.5]" />
          <Battery class="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>

      <!-- Main Screen Content Slot -->
      <div class="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
        <slot />
      </div>

      <!-- Simulated iOS Home Indicator -->
      <div
        v-if="isFrameEnabled"
        class="hidden md:flex justify-center pb-2 pt-1 shrink-0 bg-transparent"
      >
        <div class="w-32 h-1 bg-slate-300 rounded-full" />
      </div>
    </div>
  </div>
</template>
