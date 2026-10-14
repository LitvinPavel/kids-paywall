import { ref, computed } from 'vue'
import confetti from 'canvas-confetti'
import type { Offer, PurchaseRecord, PurchaseResponse, RestoreResponse } from '~/types/paywall'

export function usePaywall() {
  const offers = ref<Offer[]>([])
  const selectedOfferId = ref<string>('annual_trial')
  const isLoadingOffers = ref<boolean>(false)
  const isPurchasing = ref<boolean>(false)
  const isRestoring = ref<boolean>(false)
  const error = ref<string | null>(null)
  const lastPurchase = ref<PurchaseRecord | null>(null)
  const isSuccessModalOpen = ref<boolean>(false)
  const restoreToast = ref<{ message: string; success: boolean } | null>(null)
  const deviceId = ref<string>('')
  const simulateApiError = ref<boolean>(false)

  // Initialize or restore deviceId
  const initDeviceId = () => {
    if (import.meta.client) {
      let id = localStorage.getItem('kids_paywall_device_id')
      if (!id) {
        id = `ios_sim_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`
        localStorage.setItem('kids_paywall_device_id', id)
      }
      deviceId.value = id
    }
  }

  // Selected offer computation
  const selectedOffer = computed(() => {
    return offers.value.find((o) => o.id === selectedOfferId.value) || offers.value[0]
  })

  // Dynamic CTA button text
  const ctaButtonText = computed(() => {
    if (!selectedOffer.value) return 'Продолжить'
    if (selectedOffer.value.trialDays && selectedOffer.value.trialDays > 0) {
      return `Попробовать ${selectedOffer.value.trialDays} дня бесплатно`
    }
    return `Оформить подписку за ${selectedOffer.value.price} ${selectedOffer.value.currency}`
  })

  const ctaSubtext = computed(() => {
    if (!selectedOffer.value) return ''
    if (selectedOffer.value.trialDays && selectedOffer.value.trialDays > 0) {
      return `Затем 1 990 ₽/год (~165 ₽/мес). Отмена в любой момент в 1 клик`
    }
    return 'Без скрытых платежей. Отмена в настройках в любой момент'
  })

  // Fetch offers from server
  const fetchOffers = async () => {
    isLoadingOffers.value = true
    error.value = null
    try {
      const url = simulateApiError.value ? '/api/offers?simulateError=true' : '/api/offers'
      const response = await $fetch<{ success: boolean; offers: Offer[] }>(url)
      offers.value = response.offers
      if (offers.value.length > 0 && !selectedOfferId.value) {
        selectedOfferId.value = offers.value[0].id
      }
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Не удалось загрузить тарифы'
    } finally {
      isLoadingOffers.value = false
    }
  }

  // Select offer
  const selectOffer = (id: string) => {
    selectedOfferId.value = id
  }

  // Trigger celebration confetti
  const triggerConfetti = () => {
    if (typeof confetti === 'function') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6C5CE7', '#FFC048', '#FF6B8B', '#2ED573', '#1E90FF'],
        })
      } catch (e) {
        // Safe fallback if canvas not available
      }
    }
  }

  // Execute purchase
  const purchase = async () => {
    if (!selectedOfferId.value || isPurchasing.value) return

    isPurchasing.value = true
    error.value = null

    try {
      initDeviceId()
      const offerToBuy = simulateApiError.value ? 'simulate_error' : selectedOfferId.value

      const res = await $fetch<PurchaseResponse>('/api/purchase', {
        method: 'POST',
        body: {
          offerId: offerToBuy,
          deviceId: deviceId.value,
        },
      })

      if (res.success && res.purchase) {
        lastPurchase.value = res.purchase
        isSuccessModalOpen.value = true
        triggerConfetti()
      } else {
        error.value = res.message || 'Ошибка оформления покупки'
      }
    } catch (err: any) {
      error.value = err?.data?.statusMessage || err?.message || 'Ошибка связи с платежным сервисом'
    } finally {
      isPurchasing.value = false
    }
  }

  // Restore purchases
  const restorePurchases = async () => {
    if (isRestoring.value) return
    isRestoring.value = true
    restoreToast.value = null

    try {
      initDeviceId()
      const res = await $fetch<RestoreResponse>('/api/restore', {
        method: 'POST',
        body: {
          deviceId: deviceId.value,
        },
      })

      restoreToast.value = {
        message: res.message,
        success: res.hasPurchases,
      }

      if (res.hasPurchases && res.purchases[0]) {
        lastPurchase.value = res.purchases[0]
        triggerConfetti()
      }

      // Auto-hide toast after 4s
      setTimeout(() => {
        restoreToast.value = null
      }, 4000)
    } catch (err: any) {
      restoreToast.value = {
        message: 'Ошибка при восстановлении покупок. Проверьте интернет-соединение.',
        success: false,
      }
    } finally {
      isRestoring.value = false
    }
  }

  const closeSuccessModal = () => {
    isSuccessModalOpen.value = false
  }

  const clearError = () => {
    error.value = null
  }

  return {
    offers,
    selectedOfferId,
    selectedOffer,
    isLoadingOffers,
    isPurchasing,
    isRestoring,
    error,
    lastPurchase,
    isSuccessModalOpen,
    restoreToast,
    deviceId,
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
  }
}
