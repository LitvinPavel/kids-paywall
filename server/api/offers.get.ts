import type { Offer } from '~/types/paywall'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Simulation mode for testing UI error states
  if (query.simulateError === 'true') {
    throw createError({
      statusCode: 500,
      statusMessage: 'Служба тарифов временно недоступна. Попробуйте обновить страницу.',
    })
  }

  // Artificial small delay for realistic loading skeleton demo
  if (query.delay) {
    await new Promise((resolve) => setTimeout(resolve, Number(query.delay)))
  }

  const offers: Offer[] = [
    {
      id: 'annual_trial',
      name: 'Годовой доступ',
      badge: 'ВЫГОДА 65%',
      trialDays: 3,
      price: 1990,
      currency: '₽',
      period: 'year',
      pricePeriodText: '1 990 ₽ / год',
      monthlyEquivalentText: 'всего 165 ₽ / мес',
      billingSubtext: '3 дня бесплатно, далее 1 990 ₽ в год',
      popular: true,
      features: [
        '3 дня бесплатного пробного периода',
        'Полный каталог из 500+ развивающих игр',
        'Без рекламы и случайных кликов',
        'Офлайн режим (работает в самолёте и авто)',
      ],
    },
    {
      id: 'monthly',
      name: 'Месячный доступ',
      trialDays: 0,
      price: 499,
      currency: '₽',
      period: 'month',
      pricePeriodText: '499 ₽ / мес',
      billingSubtext: 'Списание ежемесячно. Отмена в любой момент',
      popular: false,
      features: [
        'Полный доступ ко всем играм',
        'Без рекламы',
        'Доступ на всех устройствах семьи',
      ],
    },
  ]

  return {
    success: true,
    offers,
    timestamp: new Date().toISOString(),
  }
})
