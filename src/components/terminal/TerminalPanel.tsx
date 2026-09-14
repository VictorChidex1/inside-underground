import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TerminalPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  badge?: React.ReactNode
  actions?: React.ReactNode
  variant?: 'default' | 'surface' | 'subtle'
}

export function TerminalPanel({
  title,
  badge,
  actions,
  variant = 'default',
  children,
  className,
  ...props
}: TerminalPanelProps) {
  const bgClass =
    variant === 'surface'
      ? 'bg-[#0D0D0D]'
      : variant === 'subtle'
      ? 'bg-[#080808]'
      : 'bg-[#0A0A0A]'

  return (
    <section
      className={cn(
        'rounded border border-[#1E1E1E] font-mono shadow-sm transition-colors hover:border-[#2E2E2E]',
        bgClass,
        className
      )}
      {...props}
    >
      {(title || badge || actions) && (
        <div className="flex items-center justify-between border-b border-[#1E1E1E]/70 px-3.5 py-2 text-xs">
          <div className="flex items-center gap-2">
            {title && (
              <span className="font-semibold tracking-tight text-[#EDEDED]">
                <span className="text-[#00FF66] mr-1">[</span>
                {title}
                <span className="text-[#00FF66] ml-1">]</span>
              </span>
            )}
            {badge}
          </div>
          {actions && <div className="flex items-center gap-1.5">{actions}</div>}
        </div>
      )}
      <div className="p-3.5">{children}</div>
    </section>
  )
}
