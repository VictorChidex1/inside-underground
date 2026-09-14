import * as React from 'react'
import { Terminal, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TerminalSidebar, type SidebarNavItem } from '@/components/navigation/TerminalSidebar'
import { TerminalNavbar } from '@/components/navigation/TerminalNavbar'
import { TerminalHeader } from '@/components/terminal/TerminalHeader'

export interface TerminalAppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: 'authenticated' | 'public'
  activeNavId?: string
  activePath?: string
  onNavigate?: (path: string, item?: SidebarNavItem) => void
  userEmail?: string
  accountStatus?: string
  currentPathDisplay?: string
  currentTitle?: string
}

export function TerminalAppShell({
  mode = 'authenticated',
  activeNavId = 'browse',
  activePath = '/browse',
  onNavigate,
  userEmail = 'operator@underground.net',
  accountStatus = 'ACTIVE',
  currentPathDisplay,
  currentTitle,
  children,
  className,
  ...props
}: TerminalAppShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false)

  const handleSidebarNav = (item: SidebarNavItem) => {
    onNavigate?.(item.path, item)
    setMobileSidebarOpen(false)
  }

  if (mode === 'public') {
    return (
      <div
        className={cn(
          'flex min-h-screen flex-col bg-[#050505] text-[#EDEDED] font-mono selection:bg-[#00FF66] selection:text-black',
          className
        )}
        {...props}
      >
        <TerminalNavbar
          activePath={activePath}
          onNavigate={(path) => onNavigate?.(path)}
          isAuthenticated={false}
        />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#1E1E1E] bg-[#070707] py-6 px-4 font-mono text-xs text-[#525252]">
          <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[#00FF66] font-bold">&gt;</span>
              <span className="text-[#EDEDED]">INSIDE_UNDERGROUND</span>
              <span>// SERVERLESS CRYPTO MARKETPLACE</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>NODE: FIREBASE_FUNCTIONS</span>
              <span>VAULT: NOWPAYMENTS_IPN</span>
              <span className="text-[#00FF66]">ALL_SYSTEMS_OPERATIONAL</span>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  // Authenticated Shell
  return (
    <div
      className={cn(
        'flex h-screen w-full overflow-hidden bg-[#050505] text-[#EDEDED] font-mono selection:bg-[#00FF66] selection:text-black',
        className
      )}
      {...props}
    >
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <TerminalSidebar
          activeId={activeNavId}
          onNavigate={handleSidebarNav}
          userEmail={userEmail}
          accountStatus={accountStatus}
        />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-50 flex w-72 flex-col bg-[#070707] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E1E1E] p-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#00FF66]">
                <Terminal className="h-4 w-4" />
                <span>TERMINAL_MENU</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="rounded p-1 text-[#737373] hover:text-[#EDEDED]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <TerminalSidebar
                className="w-full border-r-0"
                activeId={activeNavId}
                onNavigate={handleSidebarNav}
                userEmail={userEmail}
                accountStatus={accountStatus}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Terminal Workspace */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header: On mobile, include hamburger button */}
        <TerminalHeader
          path={currentPathDisplay ?? `user@inside-underground:~/${activeNavId}`}
          title={currentTitle}
          actions={
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden rounded border border-[#1E1E1E] bg-[#141414] p-1 text-[#EDEDED] hover:text-[#00FF66] focus:outline-none"
              aria-label="Open sidebar"
            >
              <Menu className="h-3.5 w-3.5" />
            </button>
          }
        />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#050505]">
          {children}
        </main>

        {/* Terminal Workspace Status Bar */}
        <div className="border-t border-[#1E1E1E] bg-[#070707] px-4 py-1.5 text-[11px] text-[#525252] flex items-center justify-between select-none">
          <div className="flex items-center gap-3">
            <span className="text-[#00FF66] font-semibold">&gt; _</span>
            <span className="hidden sm:inline">STATE: SYNCHRONIZED</span>
            <span>AUTH: FIREBASE</span>
          </div>
          <div className="flex items-center gap-3">
            <span>FIRESTORE: CONNECTED</span>
            <span className="text-[#00FF66]">SESSION: ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
