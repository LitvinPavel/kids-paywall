import { getDb } from '../utils/db'
import type { PurchaseRecord, RestoreResponse } from '~/types/paywall'

export default defineEventHandler(async (event): Promise<RestoreResponse> => {
  const body = await readBody<{ deviceId?: string }>(event)
  const deviceId = body?.deviceId

  if (!deviceId) {
    return {
      success: true,
      hasPurchases: false,
      purchases: [],
      message: 'Идентификатор устройства не передан. Покупок не найдено.',
    }
  }

  try {
    const db = getDb()

    // Ensure table exists
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
      sql: 'SELECT * FROM purchases WHERE device_id = ? ORDER BY id DESC',
      args: [deviceId],
    })

    const rows = (result.rows || []) as unknown as PurchaseRecord[]

    if (rows.length > 0) {
      return {
        success: true,
        hasPurchases: true,
        purchases: rows,
        message: `Восстановлено активных покупок: ${rows.length}. Полный доступ активен!`,
      }
    }

    return {
      success: true,
      hasPurchases: false,
      purchases: [],
      message: 'Активных покупок для этого устройства не найдено. Вы можете оформить новый тариф.',
    }
  } catch (err: any) {
    console.error('Restore error:', err)
    return {
      success: false,
      hasPurchases: false,
      purchases: [],
      message: `Ошибка проверки покупок: ${err.message}`,
    }
  }
})
