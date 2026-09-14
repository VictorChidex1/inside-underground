import * as React from 'react'
import { cn } from '@/lib/utils'
import { TerminalCursor } from './TerminalCursor'

export interface TerminalPromptProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: string
  host?: string
  path?: string
  isRoot?: boolean
  command?: string
  showCursor?: boolean
  promptChar?: string
  userColor?: string
}

export function TerminalPrompt({
  user = 'user',
  host = 'inside-underground',
  path = '~',
  isRoot = false,
  command,
  showCursor = false,
  promptChar,
  className,
  ...props
}: TerminalPromptProps) {
  const symbol = promptChar ?? (isRoot ? '#' : '$')

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-1.5 font-mono text-xs select-none',
        className
      )}
      {...props}
    >
      <span className="text-[#00FF66] font-semibold">{user}@{host}</span>
      <span className="text-[#808080]">:</span>
      <span className="text-[#0099FF]">{path}</span>
      <span className="text-[#EDEDED] font-bold">{symbol}</span>
      {command && (
        <span className="text-[#EDEDED] font-normal tracking-wide pl-1 select-text">
          {command}
        </span>
      )}
      {showCursor && <TerminalCursor shape="block" />}
    </div>
  )
}
