import { ArrowRight, UserPlus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalCursor } from '@/components/terminal/TerminalCursor'

export interface CtaSectionProps {
  onRegisterClick?: () => void
  onBrowseClick?: () => void
}

export function CtaSection({ onRegisterClick, onBrowseClick }: CtaSectionProps) {
  return (
    <section id="cta" className="py-14 md:py-20">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="rounded-lg border border-[#00FF66]/40 bg-[#070707] p-6 sm:p-10 font-mono shadow-[0_0_30px_rgba(0,255,102,0.05)] space-y-6 text-center">
          {/* Prompt */}
          <div className="inline-block text-left border border-[#1E1E1E] bg-[#0A0A0A] px-3.5 py-1.5 rounded">
            <TerminalPrompt
              user="guest"
              host="insideunderground.com"
              path="~"
              command="./join-marketplace.sh --create-account"
            />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#EDEDED] tracking-tight">
              ACCESS VERIFIED DIGITAL ASSETS
            </h2>
            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              Create your account in seconds. Settle transactions privately with cryptocurrency via NOWPayments.
              Zero surveillance, instant entitlement verification, and perpetual access to your purchased tools.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="default"
              size="lg"
              onClick={onRegisterClick}
              className="gap-2 text-xs"
            >
              <UserPlus className="h-4 w-4" />
              <span>REGISTER ACCOUNT</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onBrowseClick}
              className="gap-2 text-xs"
            >
              <ShoppingBag className="h-4 w-4 text-[#00FF66]" />
              <span>BROWSE ALL PRODUCTS</span>
            </Button>
          </div>

          <div className="pt-2 text-[11px] text-[#525252] flex items-center justify-center gap-1">
            <span>TERMINAL STATUS: READY</span>
            <TerminalCursor shape="block" />
          </div>
        </div>
      </div>
    </section>
  )
}
