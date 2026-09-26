import * as React from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface NavLinkItem {
  id: string
  label: string
  path: string
}

export interface TerminalNavbarProps extends React.HTMLAttributes<HTMLElement> {
  activePath?: string
  onNavigate?: (path: string) => void
  isAuthenticated?: boolean
  onLoginClick?: () => void
  onRegisterClick?: () => void
}

const PUBLIC_NAV_LINKS: NavLinkItem[] = [
  { id: 'home', label: '01/home', path: '/' },
  { id: 'products', label: '02/products', path: '/browse' },
  { id: 'how-it-works', label: '03/how-it-works', path: '/#how-it-works' },
  { id: 'about', label: '04/about', path: '/#about' },
  { id: 'faq', label: '05/faq', path: '/#faq' },
  { id: 'support', label: '06/support', path: '/support' },
]

export function TerminalNavbar({
  activePath = '/',
  onNavigate,
  isAuthenticated = false,
  onLoginClick,
  onRegisterClick,
  className,
  ...props
}: TerminalNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 border-b border-[#1E1E1E] bg-[#070707]/95 backdrop-blur-md font-mono text-xs select-none shadow-md transition-all',
        className
      )}
      {...props}
    >
      <div className="w-full flex h-14 items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Brand */}
        <div
          className="flex items-center gap-2.5 cursor-pointer transition-opacity hover:opacity-85"
          onClick={() => onNavigate?.('/')}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded border border-[#1E1E1E] bg-[#050505] overflow-hidden p-0.5 shadow-sm">
            <img
              src="/assets/inside-underground-logo.png"
              alt="Inside Underground Logo"
              className="h-full w-full object-contain rounded-sm"
            />
          </div>
          <span className="font-semibold tracking-tight text-xs sm:text-sm text-[#EDEDED] truncate max-w-[125px] sm:max-w-none">
            INSIDE_UNDERGROUND
          </span>
          <span className="hidden sm:inline-block text-[10px] text-[#00FF66] bg-[#00FF66]/10 px-1.5 py-0.5 rounded border border-[#00FF66]/20">
            v1.0.0
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {PUBLIC_NAV_LINKS.map((link) => {
            const isActive = activePath === link.path
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate?.(link.path)}
                className={cn(
                  'transition-colors hover:text-[#00FF66] focus:outline-none',
                  isActive ? 'text-[#00FF66] font-medium' : 'text-[#A3A3A3]'
                )}
              >
                {link.label}
              </button>
            )
          })}
        </div>

        {/* Desktop Auth CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate?.('/account')}
            >
              [ DASHBOARD ]
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLoginClick}
                className="text-[#EDEDED] hover:text-[#00FF66]"
              >
                LOGIN
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onRegisterClick}
              >
                REGISTER
              </Button>
            </>
          )}
        </div>

        {/* Mobile Header Suite (Visible directly on mobile without menu click) */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => onNavigate?.('/account')}
              className="px-2.5 py-1.5 rounded-lg border border-[#00FF66]/40 bg-[#00FF66]/10 text-[#00FF66] text-[11px] font-mono font-bold hover:bg-[#00FF66] hover:text-black transition-all"
            >
              DASHBOARD
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={onLoginClick}
                className="px-2 py-1 text-xs font-mono font-bold text-[#EDEDED] hover:text-[#00FF66] transition-colors cursor-pointer"
              >
                LOGIN
              </button>
              <button
                type="button"
                onClick={onRegisterClick}
                className="relative overflow-hidden px-3 py-1.5 rounded-lg bg-[#00FF66] hover:bg-[#00E55C] text-black font-sans font-black text-[11px] tracking-wider uppercase shadow-[0_0_15px_rgba(0,255,102,0.35)] hover:shadow-[0_0_22px_rgba(0,255,102,0.5)] transition-all flex items-center gap-1 group cursor-pointer"
              >
                {/* Traveling light sweep shimmer */}
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none opacity-40"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                  }}
                />
                <span className="relative z-10">REGISTER</span>
              </button>
            </>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-[#222222] bg-[#0C0C0C] p-1.5 text-[#EDEDED] hover:text-[#00FF66] hover:border-[#00FF66]/40 transition-all focus:outline-none cursor-pointer shrink-0 ml-0.5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#1E1E1E] bg-[#0A0A0A] px-4 py-4 space-y-3 md:hidden">
          <div className="text-[10px] uppercase tracking-wider text-[#525252]">
            // NAVIGATION
          </div>
          <div className="flex flex-col space-y-2">
            {PUBLIC_NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  onNavigate?.(link.path)
                  setMobileMenuOpen(false)
                }}
                className="flex items-center justify-between rounded px-2.5 py-2 text-left text-xs text-[#A3A3A3] hover:bg-[#141414] hover:text-[#00FF66]"
              >
                <span>{link.label}</span>
                <span className="text-[#525252]">&gt;</span>
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-[#1E1E1E] flex flex-col gap-2">
            {isAuthenticated ? (
              <Button
                variant="default"
                size="sm"
                className="w-full"
                onClick={() => {
                  onNavigate?.('/account')
                  setMobileMenuOpen(false)
                }}
              >
                GO TO DASHBOARD
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onLoginClick?.()
                    setMobileMenuOpen(false)
                  }}
                >
                  LOGIN
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    onRegisterClick?.()
                    setMobileMenuOpen(false)
                  }}
                >
                  REGISTER
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
