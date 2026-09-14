import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefixText, ...props }, ref) => {
    if (prefixText) {
      return (
        <div className="relative flex items-center w-full">
          <span className="absolute left-2.5 text-xs text-[#00FF66] select-none pointer-events-none font-mono font-medium">
            {prefixText}
          </span>
          <input
            type={type}
            className={cn(
              'flex h-8 w-full rounded border border-[#1E1E1E] bg-[#080808] pl-7 pr-3 py-1 text-xs text-[#EDEDED] font-mono shadow-sm transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-[#525252] focus-visible:outline-none focus-visible:border-[#00FF66] focus-visible:ring-1 focus-visible:ring-[#00FF66] disabled:cursor-not-allowed disabled:opacity-40',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-8 w-full rounded border border-[#1E1E1E] bg-[#080808] px-3 py-1 text-xs text-[#EDEDED] font-mono shadow-sm transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-[#525252] focus-visible:outline-none focus-visible:border-[#00FF66] focus-visible:ring-1 focus-visible:ring-[#00FF66] disabled:cursor-not-allowed disabled:opacity-40',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
