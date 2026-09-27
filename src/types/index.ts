import type { Timestamp } from 'firebase/firestore'

// ─── Users ───────────────────────────────────────────────────────────────

export type UserRole = 'customer' | 'admin'

export type AccountStatus =
  | 'pending_payment'
  | 'active'
  | 'suspended'
  | 'disabled'

export interface UserProfile {
  uid: string
  email: string
  username: string
  role: UserRole
  accountStatus: AccountStatus
  createdAt: Timestamp
  updatedAt: Timestamp
  activatedAt?: Timestamp
}

// ─── Products ────────────────────────────────────────────────────────────

export type ProductStatus = 'active' | 'inactive'

export interface ProductFileItem {
  name: string
  desc: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  category: string
  price: number
  currency: string
  status: ProductStatus
  deliveryType: string
  code?: string
  fileSize?: string
  features?: string[]
  files?: ProductFileItem[]
  platforms?: string[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ─── Orders ──────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending_payment'
  | 'payment_processing'
  | 'paid'
  | 'payment_underpaid'
  | 'payment_failed'
  | 'payment_expired'
  | 'refunded'
  | 'cancelled'

export interface Order {
  id: string
  userId: string
  productId: string
  amount: number
  currency: string
  status: OrderStatus
  createdAt: Timestamp
  updatedAt: Timestamp
  paidAt?: Timestamp
}

export interface CreateOrderResponse {
  orderId: string
}

export interface CreateInvoiceResponse {
  invoiceUrl: string
}

// ─── Payments ────────────────────────────────────────────────────────────

export type NowPaymentsProvider =
  | 'waiting'
  | 'confirming'
  | 'confirmed'
  | 'sending'
  | 'partially_paid'
  | 'finished'
  | 'failed'
  | 'refunded'
  | 'expired'

export type InternalPaymentStatus =
  | 'waiting'
  | 'processing'
  | 'completed'
  | 'underpaid'
  | 'failed'
  | 'expired'
  | 'refunded'

export interface Payment {
  id: string
  userId: string
  orderId: string
  provider: 'nowpayments'
  nowpaymentsPaymentId?: string
  nowpaymentsInvoiceId?: string
  providerStatus: NowPaymentsProvider | string
  internalStatus: InternalPaymentStatus | string
  priceAmount: number
  priceCurrency: string
  payCurrency?: string
  payAmount?: number
  actuallyPaid?: number
  payAddress?: string
  parentPaymentId?: string
  outcomeAmount?: number
  outcomeCurrency?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  completedAt?: Timestamp
}

// ─── Payment Events (audit trail) ────────────────────────────────────────

export interface PaymentEvent {
  id: string
  paymentId: string
  orderId: string
  userId: string
  provider: 'nowpayments'
  providerStatus: string
  previousProviderStatus?: string
  internalStatus: string
  eventType: 'payment_status_changed'
  signatureValid: boolean
  receivedAt: Timestamp
  processedAt?: Timestamp
  processingResult?: string
  payload: Record<string, unknown>
}

// ─── Entitlements ────────────────────────────────────────────────────────

export type EntitlementStatus = 'active' | 'revoked' | 'expired'

export interface Entitlement {
  id: string
  userId: string
  productId: string
  orderId: string
  status: EntitlementStatus
  grantedAt: Timestamp
  expiresAt?: Timestamp
}