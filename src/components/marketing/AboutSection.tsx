import { Terminal, Shield, Sparkles, Server } from 'lucide-react'
import { TerminalPanel } from '@/components/terminal/TerminalPanel'
import { Badge } from '@/components/ui/badge'

export function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16 border-b border-[#1E1E1E]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 font-mono">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <span className="text-[#00FF66] font-bold">&gt;</span>
            <span>guest@insideunderground.com:~/about# cat ./manifesto.txt</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#EDEDED] tracking-tight">
            ABOUT INSIDE UNDERGROUND
          </h2>
          <p className="text-xs text-[#808080]">
            The technical philosophy and design principles behind the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Manifesto Panel */}
          <TerminalPanel
            title="PLATFORM_MANIFESTO"
            badge={<Badge variant="default">INSIDEUNDERGROUND.COM</Badge>}
            className="space-y-3"
          >
            <p className="text-xs text-[#EDEDED] leading-relaxed">
              Inside Underground is a digital marketplace engineered for developers, security researchers, and privacy-conscious operators.
            </p>
            <p className="text-xs text-[#808080] leading-relaxed">
              Most contemporary web applications are bogged down by megabytes of marketing tracking scripts, forced subscriptions, and opaque legacy server architectures.
              We designed Inside Underground to operate with absolute clarity: clean monospace typography, instantaneous client rendering, and autonomous cryptocurrency settlement.
            </p>
            <p className="text-xs text-[#808080] leading-relaxed">
              Our macOS Terminal visual system is an intentional identity—providing a fast, familiar keyboard-friendly experience while maintaining standard web accessibility and responsiveness.
            </p>
          </TerminalPanel>

          {/* Key Principles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-[#00FF66]">
                <Terminal className="h-4 w-4" />
                <span className="text-xs font-semibold">TERMINAL AESTHETIC</span>
              </div>
              <p className="text-[11px] text-[#737373] leading-relaxed">
                Not a gimmicky cyberpunk toy. A disciplined, minimalist developer interface built with clean typography.
              </p>
            </div>

            <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-[#0099FF]">
                <Server className="h-4 w-4" />
                <span className="text-xs font-semibold">100% SERVERLESS</span>
              </div>
              <p className="text-[11px] text-[#737373] leading-relaxed">
                Eliminates traditional Express VPS servers. Scales on-demand via isolated Google Cloud Functions.
              </p>
            </div>

            <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-[#FFB800]">
                <Shield className="h-4 w-4" />
                <span className="text-xs font-semibold">CRYPTOGRAPHIC TRUST</span>
              </div>
              <p className="text-[11px] text-[#737373] leading-relaxed">
                State transitions rely on cryptographic verification rather than unverified client assertions.
              </p>
            </div>

            <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3.5 space-y-1.5">
              <div className="flex items-center gap-2 text-[#C084FC]">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold">INSTANT ACCESS</span>
              </div>
              <p className="text-[11px] text-[#737373] leading-relaxed">
                Upon confirmed blockchain payment, entitlements activate instantly and can be retrieved from your account anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
