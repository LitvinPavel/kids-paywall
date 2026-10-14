<script setup lang="ts">
import { Check, Sparkles } from 'lucide-vue-next'
import type { Offer } from '~/types/paywall'

const props = defineProps<{
  offer: Offer
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()
</script>

<template>
  <div
    role="radio"
    :aria-checked="isSelected"
    tabindex="0"
    class="relative rounded-2xl p-4 cursor-pointer transition-all duration-200 select-none border-2 outline-none"
    :class="[
      isSelected
        ? 'bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/90 border-kid-purple shadow-card-selected scale-[1.01]'
        : 'bg-white/90 border-slate-200/90 hover:border-slate-300 shadow-sm'
    ]"
    @click="emit('select', offer.id)"
    @keydown.space.prevent="emit('select', offer.id)"
    @keydown.enter.prevent="emit('select', offer.id)"
  >
    <!-- Top badge (e.g. ВЫГОДА 65%) -->
    <div
      v-if="offer.badge"
      class="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-sm flex items-center gap-1"
      :class="isSelected ? 'bg-gradient-to-r from-kid-purple to-indigo-600' : 'bg-slate-700'"
    >
      <Sparkles class="w-2.5 h-2.5 fill-current" />
      <span>{{ offer.badge }}</span>
    </div>

    <div class="flex items-center justify-between gap-3">
      <!-- Left side: Radio indicator and Offer Title -->
      <div class="flex items-center gap-3">
        <!-- Radio Circle -->
        <div
          class="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-all duration-150"
          :class="[
            isSelected
              ? 'border-kid-purple bg-kid-purple text-white ring-4 ring-kid-purple/20'
              : 'border-slate-300 bg-white'
          ]"
        >
          <Check v-if="isSelected" class="w-3.5 h-3.5 stroke-[3]" />
        </div>

        <div class="text-left">
          <div class="flex items-center gap-2">
            <h3 class="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
              {{ offer.name }}
            </h3>
          </div>

          <!-- Highlight trial or billing mode -->
          <div class="mt-0.5">
            <span
              v-if="offer.trialDays && offer.trialDays > 0"
              class="inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded"
            >
              {{ offer.trialDays }} дня бесплатно
            </span>
            <span
              v-else
              class="text-[11px] font-medium text-slate-500"
            >
              Без обязательств
            </span>
          </div>
        </div>
      </div>

      <!-- Right side: Price & Period breakdown -->
      <div class="text-right shrink-0">
        <div class="text-base sm:text-lg font-black text-slate-900 leading-none">
          {{ offer.pricePeriodText }}
        </div>
        <div
          v-if="offer.monthlyEquivalentText"
          class="text-[11px] font-bold text-kid-purple mt-1"
        >
          {{ offer.monthlyEquivalentText }}
        </div>
        <div
          v-else
          class="text-[11px] font-medium text-slate-400 mt-1"
        >
          ежемесячно
        </div>
      </div>
    </div>
  </div>
</template>
