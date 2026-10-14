<script setup lang="ts">
import { Gamepad2, ShieldCheck, WifiOff } from 'lucide-vue-next'

const features = [
  {
    icon: Gamepad2,
    title: 'Все 500+ развивающих игр',
    desc: 'Пазлы, математика, логика, рисование и слова',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    icon: ShieldCheck,
    title: '100% безопасная среда',
    desc: 'Никакой рекламы и случайных ссылок для малышей',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: WifiOff,
    title: 'Работает без интернета',
    desc: 'Идеально в дорогу, в машине, поезде и самолёте',
    color: 'bg-amber-100 text-amber-700',
  },
]
</script>

<template>
  <div class="px-5 py-2 space-y-2 select-none">
    <div
      v-for="(item, idx) in features"
      :key="idx"
      class="flex items-center gap-3 p-2.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/60 transition-all hover:bg-white"
    >
      <div
        class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        :class="item.color"
      >
        <component :is="item.icon" class="w-5 h-5" />
      </div>
      <div class="text-left leading-tight">
        <h2 class="text-xs sm:text-[13px] font-extrabold text-slate-800">
          {{ item.title }}
        </h2>
        <p class="text-[11px] text-slate-500 font-medium mt-0.5">
          {{ item.desc }}
        </p>
      </div>
    </div>
  </div>
</template>
