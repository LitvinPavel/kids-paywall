<script setup lang="ts">
import { Star } from 'lucide-vue-next'
</script>

<template>
  <section class="flex flex-col items-center text-center px-5 pt-1 pb-3 select-none">
    <!-- Hero Illustration / Mascot Graphic -->
    <div class="relative w-32 h-28 mb-3 flex items-center justify-center">
      <!-- Glow background -->
      <div class="absolute inset-0 bg-gradient-to-tr from-kid-purple/20 via-kid-yellow/30 to-kid-pink/20 rounded-full blur-xl transform scale-110" />

      <!-- Playful Kids Game Mascot (SVG) -->
      <svg class="w-full h-full relative z-10 drop-shadow-md animate-bounce-soft" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Magic Wand / Star Trail -->
        <path d="M20 70 Q 50 30 90 40" stroke="#FFC048" stroke-width="4" stroke-linecap="round" stroke-dasharray="4 8" opacity="0.7"/>
        <path d="M140 85 Q 110 110 80 100" stroke="#FF6B8B" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 6" opacity="0.6"/>

        <!-- Little Floating Star Left -->
        <g transform="translate(18, 30) scale(0.7) rotate(-15)">
          <polygon points="15,0 19,10 30,12 22,20 24,31 15,25 6,31 8,20 0,12 11,10" fill="#FFC048"/>
          <circle cx="12" cy="14" r="1.5" fill="#2D3436"/>
          <circle cx="18" cy="14" r="1.5" fill="#2D3436"/>
        </g>

        <!-- Main Character: Friendly Baby Bear / Star Mascot -->
        <!-- Ears -->
        <circle cx="55" cy="52" r="16" fill="#F39C12"/>
        <circle cx="55" cy="52" r="9" fill="#FAD7A0"/>
        <circle cx="105" cy="52" r="16" fill="#F39C12"/>
        <circle cx="105" cy="52" r="9" fill="#FAD7A0"/>

        <!-- Head -->
        <circle cx="80" cy="74" r="38" fill="#F5B041"/>

        <!-- Cheeks -->
        <ellipse cx="60" cy="85" rx="7" ry="4" fill="#FF7675" opacity="0.5"/>
        <ellipse cx="100" cy="85" rx="7" ry="4" fill="#FF7675" opacity="0.5"/>

        <!-- Eyes -->
        <ellipse cx="67" cy="72" rx="4" ry="5.5" fill="#2C3E50"/>
        <circle cx="68.5" cy="70" r="1.8" fill="white"/>
        <ellipse cx="93" cy="72" rx="4" ry="5.5" fill="#2C3E50"/>
        <circle cx="94.5" cy="70" r="1.8" fill="white"/>

        <!-- Snout -->
        <ellipse cx="80" cy="83" rx="14" ry="11" fill="#FDEBD0"/>
        <ellipse cx="80" cy="78" rx="5" ry="3.5" fill="#2C3E50"/>
        <path d="M77 82 Q 80 85 83 82" stroke="#2C3E50" stroke-width="2" stroke-linecap="round"/>

        <!-- Golden Crown on Head -->
        <g transform="translate(64, 25)">
          <path d="M0 16 L7 3 L16 11 L25 3 L32 16 Z" fill="#F1C40F" stroke="#D4AC0D" stroke-width="1.5" stroke-linejoin="round"/>
          <circle cx="7" cy="3" r="2.5" fill="#E74C3C"/>
          <circle cx="16" cy="11" r="2.5" fill="#3498DB"/>
          <circle cx="25" cy="3" r="2.5" fill="#2ECC71"/>
        </g>
      </svg>

      <!-- Little Sparkling Accent -->
      <div class="absolute -top-1 -right-2 bg-kid-yellow text-amber-900 rounded-full p-1.5 shadow-sm transform rotate-12">
        <Star class="w-3.5 h-3.5 fill-current" />
      </div>
    </div>

    <!-- Title & Value Headline -->
    <h1 class="text-2xl sm:text-[26px] font-black tracking-tight text-slate-900 leading-tight mb-1.5">
      Открой все игры!
    </h1>

    <p class="text-xs sm:text-sm text-slate-600 font-semibold max-w-[320px] leading-relaxed">
      500+ обучающих заданий, логических игр и пазлов для детей от 2 до 7 лет без рекламы
    </p>
  </section>
</template>
