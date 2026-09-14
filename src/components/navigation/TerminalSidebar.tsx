import * as React from 'react'
import {
  Home,
  ShoppingBag,
  Package,
  User,
  CreditCard,
  HelpCircle,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SidebarNavItem {
  id: string
  num: string
  label: string
  path: string
  icon?: React.ReactNode
  badge?: string
}

export interface TerminalSidebarProps extends React.HTMLAttributes<HTMLElement> {
  activeId?: string
  onNavigate?: (item: SidebarNavItem) => void
  userEmail?: string
  accountStatus?: string
  collapsed?: boolean
  onToggleCollapse?: () => void
}

const DEFAULT_NAV_ITEMS: SidebarNavItem[] = [
  { id: 'home', num: '01', label: 'home', path: '/', icon: <Home className="h-3.5 w-3.5" /> },
  { id: 'browse', num: '02', label: 'browse', path: '/browse', icon: <ShoppingBag className="h-3.5 w-3.5" /> },
  { id: 'purchases', num: '03', label: 'my purchases', path: '/account/purchases', icon: <Package className="h-3.5 w-3.5" /> },
  { id: 'account', num: '04', label: 'account', path: '/account', icon: <User className="h-3.5 w-3.5" /> },
  { id: 'payment', num: '05', label: 'payment', path: '/checkout', icon: <CreditCard className="h-3.5 w-3.5" /> },
  { id: 'support', num: '06', label: 'support', path: '/support', icon: <HelpCircle className="h-3.5 w-3.5" /> },
  { id: 'logout', num: '07', label: 'logout', path: '/logout', icon: <LogOut className="h-3.5 w-3.5" /> },
]

export function TerminalSidebar({
  activeId = 'browse',
  onNavigate,
  userEmail = 'operator@underground.net',
  accountStatus = 'ACTIVE',
  className,
  ...props
}: TerminalSidebarProps) {
  return (
    <aside
      className={cn(
        'flex w-64 flex-col border-r border-[#1E1E1E] bg-[#070707] font-mono text-xs select-none h-full',
        className
      )}
      {...props}
    >
      {/* Sidebar Header / Brand */}
      <div className="border-b border-[#1E1E1E] p-4">
        <div className="flex items-center gap-2.5 text-xs font-semibold text-[#EDEDED]">
          <div className="flex h-6 w-6 items-center justify-center rounded border border-[#1E1E1E] bg-[#050505] overflow-hidden p-0.5 shadow-sm shrink-0">
            <img
              src="/assets/inside-underground-logo.png"
              alt="Inside Underground Logo"
              className="h-full w-full object-contain rounded-sm"
            />
          </div>
          <span className="tracking-tight text-sm">INSIDE_UNDERGROUND</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-[#737373]">
          <span>root@marketplace:~#</span>
          <span className="flex items-center gap-1 text-[10px] text-[#00FF66]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse-subtle" />
            LIVE
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-2 pb-2 text-[10px] uppercase tracking-wider text-[#525252]">
          // SYSTEM_DIRECTORY
        </div>
        {DEFAULT_NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id
          const isDestructive = item.id === 'logout'

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate?.(item)}
              className={cn(
                'group flex w-full items-center justify-between rounded px-2.5 py-2 text-xs transition-colors focus:outline-none focus:ring-1 focus:ring-[#00FF66]',
                isActive
                  ? 'bg-[#00FF66]/10 text-[#00FF66] font-medium border border-[#00FF66]/30'
                  : isDestructive
                  ? 'text-[#737373] hover:bg-[#FF3333]/10 hover:text-[#FF3333]'
                  : 'text-[#A3A3A3] hover:bg-[#121212] hover:text-[#EDEDED]'
              )}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={cn(
                    'text-[11px] font-semibold',
                    isActive ? 'text-[#00FF66]' : 'text-[#525252] group-hover:text-[#808080]'
                  )}
                >
                  {item.num}
                </span>
                <span className="capitalize">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {isActive && <span className="text-[#00FF66] text-xs">&gt;</span>}
                {item.icon}
              </div>
            </button>
          )
        })}
      </div>

      {/* User / Telemetry Footer */}
      <div className="border-t border-[#1E1E1E] p-3 space-y-2 bg-[#050505]">
        <div className="flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 truncate max-w-[170px] text-[#A3A3A3]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#00FF66] shrink-0" />
            <span className="truncate">{userEmail}</span>
          </div>
          <span className="text-[10px] text-[#00FF66] bg-[#00FF66]/10 px-1.5 py-0.5 rounded border border-[#00FF66]/20 font-medium">
            {accountStatus}
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#525252] pt-1 border-t border-[#1E1E1E]/50">
          <span>NET: MAINNET</span>
          <span>GATE: CRYPTO</span>
        </div>
      </div>
    </aside>
  )
}
