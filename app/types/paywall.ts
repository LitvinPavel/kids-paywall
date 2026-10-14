export interface Offer {
  id: string
  name: string
  badge?: string
  trialDays?: number
  price: number
  currency: string
  period: 'year' | 'month'
  pricePeriodText: string
  monthlyEquivalentText?: string
  billingSubtext: string
  popular?: boolean
  features: string[]
}

export interface PurchaseRequest {
  offerId: string
  deviceId: string
}

export interface PurchaseRecord {
  id: number | string
  offer_id: string
  device_id: string
  created_at: string
  price: number
  currency: string
  status: string
}

export interface PurchaseResponse {
  success: boolean
  message: string
  purchase?: PurchaseRecord
  error?: string
}

export interface RestoreResponse {
  success: boolean
  hasPurchases: boolean
  purchases: PurchaseRecord[]
  message: string
}
