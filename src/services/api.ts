import { httpsCallable } from 'firebase/functions'
import { functions } from './firebase'
import type { CreateInvoiceResponse, CreateOrderResponse } from '@/types'

export class CheckoutApiError extends Error {
  readonly code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'CheckoutApiError'
    this.code = code
  }
}

const BACKEND_PENDING_CODES = new Set([
  'functions/not-found',
  'functions/unavailable',
  'internal',
])

function toCheckoutError(error: unknown): CheckoutApiError {
  const code = (error as { code?: string }).code ?? 'unknown'
  if (BACKEND_PENDING_CODES.has(code)) {
    return new CheckoutApiError(
      'PAYMENT_BACKEND_PENDING',
      'The payment backend is not deployed yet (Step 9). Please try again later.'
    )
  }
  return new CheckoutApiError(code, 'Checkout request failed. Please try again.')
}

/**
 * Creates the account-activation order (server sets the $28 fee). The
 * callable itself is implemented in Step 9.
 */
export async function createActivationOrder(): Promise<CreateOrderResponse> {
  const callable = httpsCallable<Record<string, never>, CreateOrderResponse>(
    functions,
    'createActivationOrder'
  )
  try {
    const result = await callable({})
    return result.data
  } catch (error) {
    throw toCheckoutError(error)
  }
}

/**
 * Creates a per-product order (server derives the authoritative price). The
 * callable itself is implemented in Step 9.
 */
export async function createOrder(productId: string): Promise<CreateOrderResponse> {
  const callable = httpsCallable<{ productId: string }, CreateOrderResponse>(
    functions,
    'createOrder'
  )
  try {
    const result = await callable({ productId })
    return result.data
  } catch (error) {
    throw toCheckoutError(error)
  }
}

/**
 * Creates a NOWPayments hosted invoice for an order and returns its URL. The
 * callable itself is implemented in Step 9.
 */
export async function createInvoice(orderId: string): Promise<CreateInvoiceResponse> {
  const callable = httpsCallable<{ orderId: string }, CreateInvoiceResponse>(
    functions,
    'createInvoice'
  )
  try {
    const result = await callable({ orderId })
    return result.data
  } catch (error) {
    throw toCheckoutError(error)
  }
}