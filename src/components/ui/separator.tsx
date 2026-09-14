import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  label?: string
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      label,
      ...props
    },
    ref
  ) => {
    if (label && orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          role={decorative ? 'none' : 'separator'}
          aria-orientation={orientation}
          className={cn('flex items-center gap-2 my-3 text-[10px] text-[#525252] font-mono select-none', className)}
          {...props}
        >
          <div className="h-[1px] flex-1 bg-[#1E1E1E]" />
          <span className="text-[#737373] tracking-wider uppercase font-semibold">{label}</span>
          <div className="h-[1px] flex-1 bg-[#1E1E1E]" />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={orientation}
        className={cn(
          'shrink-0 bg-[#1E1E1E]',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = 'Separator'

export { Separator }
