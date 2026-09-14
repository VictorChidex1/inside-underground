import * as React from 'react'
import { cn } from '@/lib/utils'
import { TerminalHeader, type TerminalHeaderProps } from './TerminalHeader'

export interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  path?: string
  title?: string
  statusText?: string
  headerActions?: React.ReactNode
  headerProps?: Partial<TerminalHeaderProps>
  footer?: React.ReactNode
}

export function TerminalWindow({
  path,
  title,
  statusText,
  headerActions,
  headerProps,
  footer,
  children,
  className,
  ...props
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-md border border-[#1E1E1E] bg-[#050505] shadow-2xl overflow-hidden font-mono transition-colors hover:border-[#2E2E2E]',
        className
      )}
      {...props}
    >
      <TerminalHeader
        path={path}
        title={title}
        statusText={statusText}
        actions={headerActions}
        {...headerProps}
      />
      <div className="flex-1 p-4 sm:p-6 overflow-auto">{children}</div>
      {footer && (
        <div className="border-t border-[#1E1E1E] bg-[#0A0A0A] px-4 py-2 text-xs text-[#737373]">
          {footer}
        </div>
      )}
    </div>
  )
}
