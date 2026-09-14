import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TerminalCursorProps extends React.HTMLAttributes<HTMLSpanElement> {
  shape?: 'block' | 'underscore' | 'bar'
  color?: string
}

export function TerminalCursor({
  shape = 'block',
  color = '#00FF66',
  className,
  ...props
}: TerminalCursorProps) {
  const shapeClass =
    shape === 'block'
      ? 'inline-block w-2 h-3.5 align-middle ml-0.5'
      : shape === 'underscore'
      ? 'inline-block w-2 h-0.5 align-baseline ml-0.5 mb-0.5'
      : 'inline-block w-0.5 h-3.5 align-middle ml-0.5'

  return (
    <span
      className={cn('animate-cursor-blink select-none', shapeClass, className)}
      style={{ backgroundColor: color }}
      aria-hidden="true"
      {...props}
    />
  )
}
