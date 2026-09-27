import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { CheckoutApiError, createActivationOrder } from '@/services/api'
import { formatActivationFee } from '@/config/pricing'

/**
 * Global banner shown to signed-in users whose account is still
 * pending_payment, prompting the compulsory $28 activation fee.
 */
export function ActivationBanner() {
  const navigate = useNavigate()
  const { user, profile } = useAuth()

  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const show = Boolean(user && profile && profile.accountStatus === 'pending_payment')
  if (!show) {
    return null
  }

  const handleActivate = async () => {
    setError(null)
    setPending(true)
    try {
      const { orderId } = await createActivationOrder()
      navigate(`/checkout/${orderId}`)
    } catch (caught) {
      if (caught instanceof CheckoutApiError && caught.code === 'PAYMENT_BACKEND_PENDING') {
        setError('PAYMENT_BACKEND_PENDING — activation checkout arrives in Step 9.')
      } else {
        setError('Unable to start activation. Please try again.')
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="relative z-40 border-b border-[#FFB800]/30 bg-[#1A1400]/95 font-mono text-xs">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-8 lg:px-12 py-2">
        <div className="flex items-center gap-2 text-[#FFC84D]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFB800] animate-pulse" />
          <span>
            ACCOUNT_PENDING — pay the {formatActivationFee()} activation fee to unlock
            your account.
          </span>
        </div>
        <div className="flex items-center gap-2">
          {error && <span className="text-[10px] text-[#FFC84D]">{error}</span>}
          <button
            type="button"
            onClick={handleActivate}
            disabled={pending}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#00FF66] hover:bg-[#00E55C] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black transition-all disabled:opacity-50 cursor-pointer"
          >
            <Zap className="h-3 w-3" />
            {pending ? 'INITIALIZING...' : '[ ACTIVATE ]'}
          </button>
        </div>
      </div>
    </div>
  )
}