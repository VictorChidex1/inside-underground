import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TerminalStatus } from '@/components/terminal/TerminalStatus'

export interface AuthShellProps {
  title: string
  path: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function AuthShell({
  title,
  path,
  description,
  children,
  className,
}: AuthShellProps) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10 sm:py-14">
      <Card className={cn('overflow-hidden', className)}>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="font-mono text-sm tracking-tight">{title}</CardTitle>
            <TerminalStatus status="waiting" label="AUTH" showDot={false} pulse={false} />
          </div>
          <div className="font-mono text-[11px] text-[#525252]">{path}</div>
          {description && (
            <CardDescription className="font-mono">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}