import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertCircle, ArrowLeft, CreditCard, RefreshCw, ShieldCheck } from 'lucide-react'
import { useOrder } from '@/hooks/useOrder'
import { useProducts } from '@/hooks/useProducts'
import { CheckoutApiError, createInvoice } from '@/services/api'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalStatus } from '@/components/terminal/TerminalStatus'
import { TerminalPanel } from '@/components/terminal/TerminalPanel'
import {
  ACTIVATION_ORDER_LABEL,
  ACTIVATION_ORDER_PRODUCT_ID,
  formatActivationFee,
} from '@/config/pricing'

function orderStatusLabel(status: string): string {
  switch (status) {
    case 'pending_payment':
      return 'READY'
    case 'payment_processing':
      return 'PROCESSING'
    case 'paid':
      return 'PAID'
    case 'payment_underpaid':
      return 'UNDERPAID'
    case 'payment_failed':
      return 'FAILED'
    case 'payment_expired':
      return 'EXPIRED'
    case 'refunded':
      return 'REFUNDED'
    case 'cancelled':
      return 'CANCELLED'
    default:
      return status.toUpperCase()
  }
}

function CheckoutMetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#1E1E1E] pb-2">
      <span className="text-[#737373] uppercase tracking-wider">{label}</span>
      <div className="text-right">{children}</div>
    </div>
  )
}

export function CheckoutPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const { order, loading, notFound } = useOrder(orderId)
  const { products } = useProducts()

  const [proceeding, setProceeding] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const isActivation = order?.productId === ACTIVATION_ORDER_PRODUCT_ID
  const product = !isActivation
    ? products.find((item) => item.id === order?.productId)
    : undefined

  const title = isActivation
    ? ACTIVATION_ORDER_LABEL
    : product?.name ?? order?.productId ?? 'CHECKOUT'

  const handleProceed = async () => {
    if (!order) {
      return
    }
    setError(null)
    setProceeding(true)
    try {
      const { invoiceUrl } = await createInvoice(order.id)
      window.location.assign(invoiceUrl)
    } catch (caught) {
      if (caught instanceof CheckoutApiError && caught.code === 'PAYMENT_BACKEND_PENDING') {
        setError('PAYMENT_BACKEND_PENDING — invoice generation arrives in Step 9.')
      } else {
        setError('Unable to generate the invoice. Please try again.')
      }
    } finally {
      setProceeding(false)
    }
  }

  if (loading) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <TerminalPanel title="RETRIEVING" className="max-w-2xl mx-auto">
          <p className="font-mono text-xs text-[#737373]">$ fetching_order_manifest...</p>
        </TerminalPanel>
      </div>
    )
  }

  if (notFound || !order) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <TerminalPanel title="ORDER_NOT_FOUND" className="max-w-2xl mx-auto">
          <div className="space-y-4 font-mono text-xs">
            <p className="text-[#FF4444]">
              $ cat order.txt → no such order: {orderId ?? 'undefined'}
            </p>
            <p className="text-[#737373]">
              Orders are created by the payment backend. Checkout functions arrive in Step 9.
            </p>
            <Link
              to="/browse"
              className="inline-flex items-center gap-1.5 text-[#00FF66] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> RETURN_TO_BROWSE
            </Link>
          </div>
        </TerminalPanel>
      </div>
    )
  }

  const amount = `${order.amount.toFixed(2)} ${order.currency}`

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
      <Link
        to="/browse"
        className="inline-flex items-center gap-1.5 mb-6 font-mono text-xs text-[#0099FF] hover:text-[#00FF66] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> BACK_TO_BROWSE
      </Link>

      <TerminalWindow
        path={`user@inside-underground:/checkout/${order.id}`}
        title={title}
        statusText="CHECKOUT"
        className="max-w-2xl mx-auto"
      >
        <TerminalPrompt path={`/checkout/${order.id}`} command="cat payment_session.txt" />

        {/* Payment summary */}
        <div className="mt-5 font-mono text-xs space-y-2">
          <CheckoutMetaRow label="TYPE">
            <span className="text-[#C084FC]">
              {isActivation ? ACTIVATION_ORDER_LABEL : 'PRODUCT_ORDER'}
            </span>
          </CheckoutMetaRow>
          {product && (
            <CheckoutMetaRow label="PRODUCT">
              <span className="text-[#EDEDED] font-semibold">{product.name}</span>
            </CheckoutMetaRow>
          )}
          <CheckoutMetaRow label="AMOUNT">
            <span className="text-[#00FF66] font-bold">
              {isActivation ? formatActivationFee() : amount}
            </span>
          </CheckoutMetaRow>
          <CheckoutMetaRow label="PAYMENT">
            <span className="text-[#EDEDED]">CRYPTO</span>
          </CheckoutMetaRow>
          <CheckoutMetaRow label="PROCESSOR">
            <span className="text-[#EDEDED]">NOWPAYMENTS</span>
          </CheckoutMetaRow>
          <CheckoutMetaRow label="STATUS">
            <TerminalStatus status={order.status} label={orderStatusLabel(order.status)} />
          </CheckoutMetaRow>
        </div>

        {/* Activation note */}
        {isActivation && (
          <div className="mt-5 p-3.5 rounded-xl border border-[#00FF66]/20 bg-[#00FF66]/5 text-xs text-[#A3A3A3] font-sans leading-relaxed">
            <div className="flex items-center gap-2 text-[#00FF66] font-mono text-[11px] uppercase tracking-wider mb-1">
              <ShieldCheck className="h-3.5 w-3.5" /> ACCOUNT_ACTIVATION
            </div>
            Paying this fee activates your account and unlocks access to the marketplace.
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#FFB800]/30 bg-[#FFB800]/10 p-3 text-xs text-[#FFC84D] font-mono">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Proceed */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 border-t border-[#1E1E1E] pt-5">
          <button
            type="button"
            onClick={handleProceed}
            disabled={proceeding}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00FF66] hover:bg-[#00E55C] text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(0,255,102,0.3)] hover:shadow-[0_0_40px_rgba(0,255,102,0.5)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {proceeding ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" /> GENERATING...
              </>
            ) : (
              <>
                <CreditCard className="h-3.5 w-3.5" /> PROCEED TO PAYMENT
              </>
            )}
          </button>
          <p className="text-[10px] font-mono text-[#525252]">
            You will be redirected to the NOWPayments hosted checkout.
          </p>
        </div>
      </TerminalWindow>
    </div>
  )
}