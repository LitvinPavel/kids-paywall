import { getDb } from '../utils/db'
import type { PurchaseRequest, PurchaseResponse } from '~/types/paywall'

const OFFER_PRICES: Record<string, { price: number; currency: string; name: string }> = {
  annual_trial: { price: 1990, currency: 'RUB', name: 'Годовой доступ' },
  monthly: { price: 499, currency: 'RUB', name: 'Месячный доступ' },
}

export default defineEventHandler(async (event): Promise<PurchaseResponse> => {
  const body = await readBody<PurchaseRequest>(event)

  if (!body || !body.offerId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Параметр offerId обязателен',
    })
  }

  // Check for test simulation of failure
  if (body.offerId === 'simulate_error') {
    throw createError({
      statusCode: 402,
      statusMessage: 'Ошибка оплаты: недостаточно средств на карте',
    })
  }

  const offerInfo = OFFER_PRICES[body.offerId] || { price: 0, currency: 'RUB', name: 'Пользовательский тариф' }
  const deviceId = body.deviceId || `device_${Math.random().toString(36).substring(2, 10)}`
  const createdAt = new Date().toISOString()

  try {
    const db = getDb()

    // Ensure database table is ready
    await db.execute(`
      CREATE TABLE IF NOT EXISTS purchases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        offer_id TEXT NOT NULL,
        device_id TEXT NOT NULL,
        price REAL NOT NULL,
        currency TEXT NOT NULL DEFAULT 'RUB',
        status TEXT NOT NULL DEFAULT 'completed',
        created_at TEXT NOT NULL
      );
    `)

    const result = await db.execute({
      sql: `
        INSERT INTO purchases (offer_id, device_id, price, currency, status, created_at)
        VALUES (?, ?, ?, ?, 'completed', ?)
      `,
      args: [body.offerId, deviceId, offerInfo.price, offerInfo.currency, createdAt],
    })

    const insertedId = result.lastInsertRowid !== undefined ? Number(result.lastInsertRowid) : 1

    return {
      success: true,
      message: 'Покупка успешно завершена! Доступ ко всем играм открыт.',
      purchase: {
        id: insertedId,
        offer_id: body.offerId,
        device_id: deviceId,
        price: offerInfo.price,
        currency: offerInfo.currency,
        status: 'completed',
        created_at: createdAt,
      },
    }
  } catch (err: any) {
    console.error('Purchase storage error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: `Ошибка сохранения покупки в базе данных: ${err.message || 'Внутренняя ошибка'}`,
    })
  }
})
