import * as React from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TerminalCommandProps extends React.HTMLAttributes<HTMLDivElement> {
  command: string
  copyable?: boolean
  prefix?: string
}

export function TerminalCommand({
  command,
  copyable = true,
  prefix = '$',
  className,
  ...props
}: TerminalCommandProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    if (!copyable) return
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback if clipboard fails
    }
  }

  return (
    <div
      className={cn(
        'group flex items-center justify-between gap-2 rounded border border-[#1E1E1E] bg-[#0A0A0A] px-3 py-1.5 font-mono text-xs text-[#EDEDED] transition-colors hover:border-[#2E2E2E]',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 overflow-x-auto select-text scrollbar-none">
        <span className="text-[#00FF66] font-semibold select-none">{prefix}</span>
        <code className="text-[#EDEDED]">{command}</code>
      </div>
      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 p-1 text-[#525252] transition-colors hover:text-[#00FF66] focus:outline-none"
          title={copied ? 'Copied' : 'Copy command'}
          aria-label="Copy command"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-[#00FF66]" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      )}
    </div>
  )
}
