import { Link, useLocation } from 'react-router-dom'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalStatus } from '@/components/terminal/TerminalStatus'
import { Button } from '@/components/ui/button'

export interface PlaceholderPageProps {
  title?: string
  description?: string
  step?: string
}

export function PlaceholderPage({ title, description, step }: PlaceholderPageProps) {
  const location = useLocation()
  const routePath = location.pathname

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-12">
      <TerminalWindow
        path={`user@inside-underground:${routePath}`}
        title={title ?? 'PAGE_NOT_IMPLEMENTED'}
        statusText="PENDING"
      >
        <TerminalPrompt path={routePath} command="cat page_status.txt" />

        <div className="mt-5 space-y-3 text-xs leading-relaxed">
          <p className="text-[#EDEDED]">
            ROUTE_REGISTERED: <span className="text-[#00FF66]">{routePath}</span>
          </p>
          <p className="text-[#A3A3A3]">
            {description ??
              'This page is part of a future implementation step and has not been built yet.'}
          </p>
          {step && (
            <p className="text-[#737373]">
              ETA: <span className="text-[#FFB800]">{step}</span>
            </p>
          )}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <TerminalStatus status="waiting" label="PENDING_IMPLEMENTATION" />
        </div>

        <div className="mt-8 flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link to="/">[ RETURN_HOME ]</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/browse">[ BROWSE ]</Link>
          </Button>
        </div>
      </TerminalWindow>
    </div>
  )
}