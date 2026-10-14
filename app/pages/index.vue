<script setup lang="ts">
import { onMounted } from 'vue'
import { Sparkles, CheckCircle2 } from 'lucide-vue-next'
import { usePaywall } from '~/composables/usePaywall'
import DeviceFrame from '~/components/paywall/DeviceFrame.vue'
import PaywallHeader from '~/components/paywall/PaywallHeader.vue'
import PaywallHero from '~/components/paywall/PaywallHero.vue'
import PaywallFeatures from '~/components/paywall/PaywallFeatures.vue'
import OfferCard from '~/components/paywall/OfferCard.vue'
import PaywallCta from '~/components/paywall/PaywallCta.vue'
import PaywallFooter from '~/components/paywall/PaywallFooter.vue'
import PaywallSuccessModal from '~/components/paywall/PaywallSuccessModal.vue'
import PaywallErrorBanner from '~/components/paywall/PaywallErrorBanner.vue'

const {
  offers,
  selectedOfferId,
  isLoadingOffers,
  isPurchasing,
  isRestoring,
  error,
  lastPurchase,
  isSuccessModalOpen,
  restoreToast,
  simulateApiError,
  ctaButtonText,
  ctaSubtext,
  initDeviceId,
  fetchOffers,
  selectOffer,
  purchase,
  restorePurchases,
  closeSuccessModal,
  clearError,
} = usePaywall()

onMounted(() => {
  initDeviceId()
  fetchOffers()
})

const handleClose = () => {
  if (confirm('Вы уверены, что хотите закрыть экран предложения? Вы можете вернуться к нему в любой момент.')) {
    // In native webview, communicates via window.webkit / JSBridge or closes modal
    alert('Экран закрыт. В нативном приложении здесь вызывается bridge.close()')
  }
}

const toggleErrorSimulation = () => {
  simulateApiError.value = !simulateApiError.value
  fetchOffers()
}

const handleLegal = (type: 'terms' | 'privacy') => {
  alert(
    type === 'terms'
      ? 'Условия подписки: оплата списывается с выбранного платёжного метода (СБП, банковская карта или баланс аккаунта) при подтверждении покупки. Подписка автоматически продлевается, если автопродление не отключено в настройках.'
      : 'Политика конфиденциальности: Мы не передаем персональные данные третьим лицам и строго соблюдаем требования COPPA и 152-ФЗ для защиты детской аудитории.'
  )
}
</script>

<template>
  <DeviceFrame>
    <main class="flex-1 flex flex-col justify-between bg-gradient-to-b from-purple-50/70 via-white to-slate-50 relative pb-2">
      <!-- Top Section -->
      <div>
        <PaywallHeader
          :simulate-error="simulateApiError"
          @close="handleClose"
          @toggle-error-sim="toggleErrorSimulation"
        />

        <PaywallHero />

        <PaywallFeatures />
      </div>

      <!-- Bottom / Interactive Purchase Section -->
      <div class="mt-1">
        <!-- Error Banner (if error exists) -->
        <PaywallErrorBanner
          :error="error"
          @retry="fetchOffers"
          @dismiss="clearError"
        />

        <!-- Offers Selection Section -->
        <div class="px-5 space-y-2.5">
          <!-- Skeleton Loader while fetching offers -->
          <template v-if="isLoadingOffers">
            <div
              v-for="i in 2"
              :key="i"
              class="h-20 rounded-2xl bg-slate-200/70 animate-pulse flex items-center justify-between p-4"
            >
              <div class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-slate-300" />
                <div class="space-y-2">
                  <div class="w-28 h-4 rounded bg-slate-300" />
                  <div class="w-16 h-3 rounded bg-slate-300" />
                </div>
              </div>
              <div class="w-20 h-5 rounded bg-slate-300" />
            </div>
          </template>

          <!-- Actual Offers -->
          <template v-else>
            <OfferCard
              v-for="offer in offers"
              :key="offer.id"
              :offer="offer"
              :is-selected="selectedOfferId === offer.id"
              @select="selectOffer"
            />
          </template>
        </div>

        <!-- Primary CTA Button -->
        <PaywallCta
          :button-text="ctaButtonText"
          :subtext="ctaSubtext"
          :is-loading="isPurchasing"
          :disabled="isLoadingOffers"
          @click="purchase"
        />

        <!-- Footer links & Restore Purchases -->
        <PaywallFooter
          :is-restoring="isRestoring"
          @restore="restorePurchases"
          @open-legal="handleLegal"
        />
      </div>

      <!-- Success Celebration Modal -->
      <PaywallSuccessModal
        :is-open="isSuccessModalOpen"
        :purchase="lastPurchase"
        @close="closeSuccessModal"
      />

      <!-- Restore Purchases Toast -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-3"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-3"
      >
        <div
          v-if="restoreToast"
          class="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-[340px] w-full px-4 py-3 rounded-2xl text-xs font-bold shadow-xl border z-50 flex items-center gap-2 select-none"
          :class="restoreToast.success ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-white border-slate-700'"
        >
          <CheckCircle2 v-if="restoreToast.success" class="w-4 h-4 shrink-0" />
          <Sparkles v-else class="w-4 h-4 shrink-0 text-amber-400" />
          <span>{{ restoreToast.message }}</span>
        </div>
      </Transition>
    </main>
  </DeviceFrame>
</template>
