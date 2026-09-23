import { motion } from 'framer-motion'
import {
  ArrowRight,
  UserPlus,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { LaserBorder } from '@/components/ui/LaserBorder'
import { DecryptedText } from '@/components/ui/DecryptedText'

export interface CtaSectionProps {
  onRegisterClick?: () => void
  onBrowseClick?: () => void
}

const VALUE_PILLARS = [
  {
    icon: Zap,
    title: '60-Second Setup',
    description: 'No banking details or credit cards required. Just your email.',
    badge: 'INSTANT',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Surveillance',
    description: 'No trackers, no cookies, no third-party data sharing.',
    badge: '100% PRIVATE',
  },
  {
    icon: Sparkles,
    title: 'Lifetime Ownership',
    description: 'Permanent access to your purchased tools and all future updates.',
    badge: 'UNLIMITED',
  },
]

export function CtaSection({ onRegisterClick, onBrowseClick }: CtaSectionProps) {
  return (
    <section id="cta" className="relative py-20 md:py-28 overflow-hidden bg-[#030303]">
      {/* Background Quantum Singularity Ambient Aura */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle dot matrix */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E1E1E 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Breathing Singularity Glow Core */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#00FF66]/20 via-[#0099FF]/15 to-[#00FF66]/20 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        {/* Main Quantum Citadel framed in LaserBorder */}
        <LaserBorder
          speed="9s"
          laserColor="#00FF66"
          secondaryColor="rgba(0, 204, 255, 0.45)"
          glowIntensity="vibrant"
          className="shadow-[0_0_60px_rgba(0,255,102,0.15)]"
          innerClassName="bg-gradient-to-b from-[#090909] via-[#060606] to-[#0A0A0A] p-6 sm:p-10 md:p-14 text-center space-y-8 rounded-2xl relative overflow-hidden"
        >
          {/* Top Status Header */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-mono">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.15)]">
              <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider uppercase">
                INSTANT ACCESS • ZERO SUBSCRIPTIONS • 100% PRIVATE
              </span>
            </div>
          </div>

          {/* Headline & Plain-English Invitation */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight font-sans">
              <DecryptedText
                text="READY TO UNLOCK ELITE DIGITAL TOOLS?"
                speed={30}
                maxIterations={8}
              />
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#A3A3A3] font-sans leading-relaxed">
              Create your free account in under 60 seconds. Experience instant cryptocurrency checkout, zero personal tracking, and permanent lifetime access to exclusive digital products and updates.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-left">
            {VALUE_PILLARS.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-[#1E1E1E] bg-[#0C0C0C]/80 p-4 space-y-2 hover:border-[#00FF66]/30 transition-all duration-300 group shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-7 w-7 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] group-hover:scale-110 transition-transform">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[9px] font-mono text-[#737373] tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#161616]">
                      {pillar.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#EDEDED] font-sans">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] text-[#737373] font-sans leading-snug mt-0.5">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Primary Action Button with Shimmer & Glow */}
            <button
              type="button"
              onClick={onRegisterClick}
              className="relative group w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00FF66] hover:bg-[#00E55C] text-black font-sans font-black text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(0,255,102,0.35)] hover:shadow-[0_0_55px_rgba(0,255,102,0.55)] cursor-pointer overflow-hidden"
            >
              {/* Animated Light Sweep Shimmer */}
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none opacity-40"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                }}
              />
              <UserPlus className="h-4 w-4 shrink-0" />
              <span>CREATE FREE ACCOUNT</span>
              <ArrowRight className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Action Button */}
            <button
              type="button"
              onClick={onBrowseClick}
              className="w-full sm:w-auto px-7 py-4 rounded-xl border border-[#2A2A2A] bg-[#111111]/90 hover:bg-[#181818] hover:border-[#00FF66]/40 text-[#EDEDED] hover:text-white font-sans font-bold text-sm tracking-wide uppercase transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
            >
              <ShoppingBag className="h-4 w-4 text-[#00FF66] shrink-0" />
              <span>EXPLORE THE COLLECTION</span>
            </button>
          </div>

          {/* Live Telemetry Ribbon */}
          <div className="pt-4 border-t border-[#181818] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-mono text-[#737373]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-[#00FF66]" />
              <span>1,400+ VERIFIED LICENSES ISSUED</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66]" />
              <span>99.98% AUTOMATED SETTLEMENT</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0099FF]" />
              <span>24/7 CLOUD DISPATCH</span>
            </div>
          </div>
        </LaserBorder>
      </div>
    </section>
  )
}
