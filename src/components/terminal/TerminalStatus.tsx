import * as React from 'react'
import { cn } from '@/lib/utils'

export type TerminalStatusType =
  | 'active'
  | 'finished'
  | 'completed'
  | 'paid'
  | 'pending_payment'
  | 'waiting'
  | 'confirming'
  | 'payment_processing'
  | 'partially_paid'
  | 'sending'
  | 'verifying'
  | 'failed'
  | 'payment_failed'
  | 'cancelled'
  | 'expired'
  | 'suspended'
  | 'disabled'
  | 'refunded'
  | 'idle'
  | 'live'

export interface TerminalStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  status: TerminalStatusType | string
  label?: string
  pulse?: boolean
  showDot?: boolean
}

export function TerminalStatus({
  status,
  label,
  pulse = true,
  showDot = true,
  className,
  ...props
}: TerminalStatusProps) {
  const normalized = status.toLowerCase()

  // Determine semantic color mappings
  let dotColor = '#00FF66'
  let textColor = 'text-[#00FF66]'
  let borderColor = 'border-[#00FF66]/30'
  let bgColor = 'bg-[#003B17]/40'

  if (
    ['active', 'finished', 'completed', 'paid', 'live'].includes(normalized)
  ) {
    dotColor = '#00FF66'
    textColor = 'text-[#00FF66]'
    borderColor = 'border-[#00FF66]/30'
    bgColor = 'bg-[#003B17]/40'
  } else if (
    [
      'pending_payment',
      'waiting',
      'confirming',
      'payment_processing',
      'partially_paid',
    ].includes(normalized)
  ) {
    dotColor = '#FFB800'
    textColor = 'text-[#FFB800]'
    borderColor = 'border-[#FFB800]/30'
    bgColor = 'bg-[#3D2C00]/40'
  } else if (
    [
      'failed',
      'payment_failed',
      'cancelled',
      'expired',
      'suspended',
      'disabled',
    ].includes(normalized)
  ) {
    dotColor = '#FF3333'
    textColor = 'text-[#FF3333]'
    borderColor = 'border-[#FF3333]/30'
    bgColor = 'bg-[#400A0A]/40'
  } else if (['sending', 'verifying', 'info'].includes(normalized)) {
    dotColor = '#0099FF'
    textColor = 'text-[#0099FF]'
    borderColor = 'border-[#0099FF]/30'
    bgColor = 'bg-[#00294D]/40'
  } else if (['refunded'].includes(normalized)) {
    dotColor = '#A855F7'
    textColor = 'text-[#C084FC]'
    borderColor = 'border-[#A855F7]/30'
    bgColor = 'bg-[#320E54]/40'
  } else {
    dotColor = '#808080'
    textColor = 'text-[#808080]'
    borderColor = 'border-[#1E1E1E]'
    bgColor = 'bg-[#141414]'
  }

  const displayLabel = label ?? status.toUpperCase()

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-mono font-medium border select-none',
        borderColor,
        bgColor,
        textColor,
        className
      )}
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            'inline-block h-1.5 w-1.5 rounded-full',
            pulse && 'animate-pulse-subtle'
          )}
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      )}
      <span>{displayLabel}</span>
    </div>
  )
}
