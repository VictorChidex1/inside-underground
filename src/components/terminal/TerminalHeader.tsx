import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TerminalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  path?: string
  title?: string
  showTime?: boolean
  statusText?: string
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  actions?: React.ReactNode
}

export function TerminalHeader({
  path = 'user@inside-underground:~',
  title,
  showTime = true,
  statusText = 'SECURE',
  onClose,
  onMinimize,
  onMaximize,
  actions,
  className,
  ...props
}: TerminalHeaderProps) {
  const [timeStr, setTimeStr] = React.useState('')

  React.useEffect(() => {
    if (!showTime) return

    const updateTime = () => {
      const now = new Date()
      const day = now.toLocaleDateString('en-US', { weekday: 'short' })
      const dayNum = now.getDate()
      const month = now.toLocaleDateString('en-US', { month: 'short' })
      const hours = String(now.getHours()).padStart(2, '0')
      const mins = String(now.getMinutes()).padStart(2, '0')
      const secs = String(now.getSeconds()).padStart(2, '0')
      setTimeStr(`${day} ${dayNum} ${month} ${hours}:${mins}:${secs}`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [showTime])

  const fullDisplayTitle = title ? `${path} — ${title}` : path

  return (
    <header
      className={cn(
        'flex items-center justify-between border-b border-[#1E1E1E] bg-[#0A0A0A] px-3.5 py-2 font-mono text-xs text-[#808080] select-none',
        className
      )}
      {...props}
    >
      {/* Left: macOS Traffic Lights */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5" aria-label="macOS Window Controls">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close window"
            className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-[#FF5F56] transition-opacity hover:opacity-80 focus:outline-none"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-[#4D0000] font-bold leading-none select-none">
              ×
            </span>
          </button>
          <button
            type="button"
            onClick={onMinimize}
            aria-label="Minimize window"
            className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-[#FFBD2E] transition-opacity hover:opacity-80 focus:outline-none"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-[#4D3300] font-bold leading-none select-none">
              −
            </span>
          </button>
          <button
            type="button"
            onClick={onMaximize}
            aria-label="Maximize window"
            className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-[#27C93F] transition-opacity hover:opacity-80 focus:outline-none"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-[#00330B] font-bold leading-none select-none">
              +
            </span>
          </button>
        </div>

        {/* Path / Title in desktop */}
        <div className="hidden sm:flex items-center gap-1.5 ml-2 text-xs font-medium text-[#EDEDED]">
          <span className="truncate max-w-[280px] lg:max-w-[450px]">
            {fullDisplayTitle}
          </span>
        </div>
      </div>

      {/* Center: Path on mobile */}
      <div className="sm:hidden text-[11px] font-medium text-[#EDEDED] truncate max-w-[170px]">
        {path}
      </div>

      {/* Right: Timestamp & Status badge / actions */}
      <div className="flex items-center gap-3">
        {actions}
        {showTime && timeStr && (
          <span className="hidden md:inline-block text-[11px] text-[#525252]">
            {timeStr}
          </span>
        )}
        {statusText && (
          <div className="flex items-center gap-1 text-[10px] text-[#00FF66] bg-[#00FF66]/10 px-1.5 py-0.5 rounded border border-[#00FF66]/20">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse-subtle" />
            <span>{statusText}</span>
          </div>
        )}
      </div>
    </header>
  )
}
