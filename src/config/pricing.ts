export const ACTIVATION_FEE_AMOUNT = 28

export const ACTIVATION_FEE_CURRENCY = 'USD'

export const DORMANT_ACCOUNT_GRACE_DAYS = 7

/**
 * Sentinel productId used on activation orders (no physical product). The
 * backend (Step 9) creates activation orders with this marker; checkout uses
 * it to render the account-activation summary.
 */
export const ACTIVATION_ORDER_PRODUCT_ID = '__activation__'

export const ACTIVATION_ORDER_LABEL = 'ACCOUNT_ACTIVATION'

export function formatActivationFee(): string {
  return `${ACTIVATION_FEE_AMOUNT.toFixed(2)} ${ACTIVATION_FEE_CURRENCY}`
}