<script setup lang="ts">
import { CheckCircle2, Sparkles, PartyPopper } from 'lucide-vue-next'
import type { PurchaseRecord } from '~/types/paywall'

defineProps<{
  isOpen: boolean
  purchase: PurchaseRecord | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm select-none"
    >
      <div
        class="w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl border border-slate-100 transform transition-all animate-bounce-soft"
      >
        <!-- Icon badge -->
        <div class="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <div class="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-30" />
          <div class="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-green-400 rounded-full flex items-center justify-center text-white shadow-lg">
            <CheckCircle2 class="w-10 h-10 stroke-[2.5]" />
          </div>
          <div class="absolute -top-1 -right-1 bg-amber-400 text-amber-900 rounded-full p-1 shadow-sm">
            <PartyPopper class="w-4 h-4" />
          </div>
        </div>

        <h3 class="text-xl font-black text-slate-900 mb-1">
          Ура! Доступ открыт!
        </h3>

        <p class="text-xs text-slate-600 font-semibold mb-5 leading-relaxed">
          Все 500+ развивающих игр теперь полностью разблокированы для вашего малыша!
        </p>

        <!-- Purchase details ticket -->
        <div v-if="purchase" class="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-5 text-left text-xs space-y-2">
          <div class="flex justify-between items-center text-slate-500">
            <span>Тариф:</span>
            <span class="font-bold text-slate-800">
              {{ purchase.offer_id === 'annual_trial' ? 'Годовой (3 дня бесплатно)' : 'Месячный' }}
            </span>
          </div>
          <div class="flex justify-between items-center text-slate-500">
            <span>Номер заказа:</span>
            <span class="font-mono font-bold text-slate-700">№ {{ purchase.id }}</span>
          </div>
          <div class="flex justify-between items-center text-slate-500">
            <span>Сумма:</span>
            <span class="font-bold text-slate-800">{{ purchase.price }} {{ purchase.currency }}</span>
          </div>
          <div class="flex justify-between items-center text-slate-500">
            <span>Подписка:</span>
            <span class="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
              <Sparkles class="w-3 h-3" />
              Активирована
            </span>
          </div>
        </div>

        <!-- Action Button -->
        <button
          type="button"
          class="w-full h-12 bg-kid-purple hover:bg-kid-purple-dark text-white font-extrabold text-base rounded-2xl shadow-lg shadow-kid-purple/30 transition-all active:scale-95"
          @click="emit('close')"
        >
          Начать играть! 🚀
        </button>
      </div>
    </div>
  </Transition>
</template>
