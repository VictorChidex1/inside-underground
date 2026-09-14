import {
  ArrowRight,
  Shield,
  Zap,
  Lock,
  Cpu,
  ShoppingBag,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalCursor } from '@/components/terminal/TerminalCursor'

export interface HeroSectionProps {
  onBrowseClick?: () => void
  onHowItWorksClick?: () => void
  onRegisterClick?: () => void
}

export function HeroSection({
  onBrowseClick,
  onHowItWorksClick,
  onRegisterClick,
}: HeroSectionProps) {
  return (
    <section id="hero" className="relative py-12 md:py-20 border-b border-[#1E1E1E]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Terminal Window Frame */}
        <div className="rounded-lg border border-[#1E1E1E] bg-[#070707] shadow-2xl overflow-hidden transition-colors hover:border-[#2E2E2E]">
          {/* Window Header */}
          <div className="flex items-center justify-between border-b border-[#1E1E1E] bg-[#0A0A0A] px-4 py-2.5 font-mono text-xs select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56] inline-block" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F] inline-block" />
              </div>
              <span className="text-[#808080] ml-2 hidden sm:inline">
                guest@insideunderground.com:~ — Session #001
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse-subtle" />
              <span>MAINNET_ONLINE</span>
            </div>
          </div>

          {/* Window Content */}
          <div className="p-6 sm:p-10 font-mono space-y-6">
            {/* Terminal Prompt Command */}
            <div className="space-y-1">
              <TerminalPrompt
                user="guest"
                host="insideunderground.com"
                path="~"
                command="./welcome.sh --mode=public"
              />
            </div>

            {/* ASCII / Monospace Title Banner */}
            <div className="py-2">
              <div className="text-[#00FF66] text-xs sm:text-sm font-bold tracking-widest uppercase">
                // SYSTEM_BOOT: OK // INITIALIZING MARKETPLACE_ENCLAVE
              </div>
              <h1 className="mt-2 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#EDEDED] leading-tight">
                INSIDE UNDERGROUND
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#00FF66] font-medium">
                // SECURE SERVERLESS DIGITAL PRODUCTS MARKETPLACE
              </p>
            </div>

            {/* Value Proposition Description */}
            <p className="max-w-2xl text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
              Access verified digital products through an encrypted, serverless marketplace.
              Settle transactions using cryptocurrency via NOWPayments.
              Zero tracking cookies, immutable server-side pricing, and instant entitlement verification.
            </p>

            {/* Telemetry Status Bar */}
            <div className="flex flex-wrap items-center gap-3 py-2 border-y border-[#1E1E1E]/80 text-[11px] text-[#737373]">
              <div className="flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-[#00FF66]" />
                <span>SERVERLESS: FIREBASE</span>
              </div>
              <span className="text-[#333333]">|</span>
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#FFB800]" />
                <span>GATEWAY: NOWPAYMENTS</span>
              </div>
              <span className="text-[#333333]">|</span>
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#0099FF]" />
                <span>SETTLEMENT: USDT / BTC / ETH</span>
              </div>
            </div>

            {/* Command-Style CTA Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="default"
                size="lg"
                onClick={onBrowseClick}
                className="gap-2 text-xs"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>[1] BROWSE PRODUCTS</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onHowItWorksClick}
                className="gap-2 text-xs"
              >
                <span>[2] HOW IT WORKS</span>
              </Button>
              <Button
                variant="command"
                size="lg"
                onClick={onRegisterClick}
                className="gap-2 text-xs"
              >
                <span>[3] REGISTER ACCOUNT</span>
              </Button>
            </div>

            {/* Prompt with Blinking Cursor */}
            <div className="pt-2 flex items-center text-xs text-[#525252]">
              <span>guest@insideunderground.com:~$ select_action</span>
              <TerminalCursor shape="block" />
            </div>
          </div>
        </div>

        {/* Feature Micro-Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#00FF66] font-semibold mb-1">
              <Shield className="h-3.5 w-3.5" />
              <span>SERVERLESS</span>
            </div>
            <p className="text-[11px] text-[#737373]">
              Cloud Functions backend with zero unmanaged server attack surface.
            </p>
          </div>

          <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#0099FF] font-semibold mb-1">
              <Lock className="h-3.5 w-3.5" />
              <span>VERIFIED IPN</span>
            </div>
            <p className="text-[11px] text-[#737373]">
              Cryptographic HMAC-SHA512 webhook signature verification.
            </p>
          </div>

          <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#FFB800] font-semibold mb-1">
              <Zap className="h-3.5 w-3.5" />
              <span>NON-BLOCKING</span>
            </div>
            <p className="text-[11px] text-[#737373]">
              Close your browser after paying. Verification finalizes autonomously.
            </p>
          </div>

          <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#C084FC] font-semibold mb-1">
              <Cpu className="h-3.5 w-3.5" />
              <span>ATOMIC TX</span>
            </div>
            <p className="text-[11px] text-[#737373]">
              Firestore transactions prevent double activations and race conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
