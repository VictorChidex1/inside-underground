import * as React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  Package,
  EyeOff,
  Cpu,
  Zap,
  CheckCircle2,
  Terminal,
  Shield,
  Clock,
  Infinity as InfinityIcon,
  Activity,
} from 'lucide-react'

interface ValuePillar {
  icon: React.ReactNode
  title: string
  tag: string
  description: string
  guarantee: string
  accentColor: string
  telemetry: string
}

const VALUE_PILLARS: ValuePillar[] = [
  {
    icon: <Package className="h-5 w-5 text-[#00FF66]" />,
    title: 'True Digital Ownership',
    tag: 'NO SUBSCRIPTIONS',
    description:
      'No recurring monthly fees, forced memberships, or surprise renewals. Buy the asset once, download the raw .ZIP files, and own them permanently.',
    guarantee: 'Lifetime file access & architecture updates',
    accentColor: '#00FF66',
    telemetry: 'LICENSE: PERPETUAL_OWNERSHIP',
  },
  {
    icon: <EyeOff className="h-5 w-5 text-[#0099FF]" />,
    title: 'Zero Ad Surveillance',
    tag: 'ABSOLUTE PRIVACY',
    description:
      'No tracking cookies, no Google Analytics, no Meta pixels, and no financial KYC. Your browsing and purchases are private and untracked.',
    guarantee: 'No credit card or banking records stored',
    accentColor: '#0099FF',
    telemetry: 'SURVEILLANCE: ZERO_TRACKERS',
  },
  {
    icon: <Cpu className="h-5 w-5 text-[#FFB800]" />,
    title: 'Production-Tested Quality',
    tag: 'VERIFIED BLUEPRINTS',
    description:
      'Every script, Terraform template, and security blueprint has been deployed and stress-tested on real production environments by senior engineers.',
    guarantee: 'Cryptographic SHA-256 integrity checksums',
    accentColor: '#FFB800',
    telemetry: 'QUALITY: 100%_AUDITED',
  },
  {
    icon: <Zap className="h-5 w-5 text-[#C084FC]" />,
    title: 'Autonomous 24/7 Delivery',
    tag: 'INSTANT ACCESS',
    description:
      'Powered by autonomous blockchain settlement nodes. Your digital entitlements unlock in seconds without waiting for manual human approval.',
    guarantee: 'Immediate automated download unlock',
    accentColor: '#C084FC',
    telemetry: 'DELIVERY: BLOCKCHAIN_AUTOMATED',
  },
]

function ValueCard({ pillar }: { pillar: ValuePillar }) {
  const cardRef = React.useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 240, damping: 25 })
  const mouseYSpring = useSpring(y, { stiffness: 240, damping: 25 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div style={{ perspective: 800 }} className="relative group rounded-xl p-[1px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full flex flex-col justify-between rounded-xl border border-[#222222] bg-[#0A0A0A]/95 backdrop-blur-md p-5 shadow-xl transition-all duration-300 hover:border-[#00FF66]/50 group-hover:shadow-[0_10px_30px_rgba(0,255,102,0.06)] overflow-hidden cursor-default select-none"
      >
        {/* Optical Targeting Corner HUD Brackets */}
        <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
          <span className="absolute top-1.5 left-1.5 h-2 w-2 border-t-2 border-l-2 border-[#00FF66]/40 rounded-tl-sm group-hover:border-[#00FF66] transition-colors" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 border-t-2 border-r-2 border-[#00FF66]/40 rounded-tr-sm group-hover:border-[#00FF66] transition-colors" />
          <span className="absolute bottom-1.5 left-1.5 h-2 w-2 border-b-2 border-l-2 border-[#00FF66]/40 rounded-bl-sm group-hover:border-[#00FF66] transition-colors" />
          <span className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b-2 border-r-2 border-[#00FF66]/40 rounded-br-sm group-hover:border-[#00FF66] transition-colors" />
        </div>

        {/* Ambient Hover Glow */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: pillar.accentColor }}
          aria-hidden="true"
        />

        <div className="space-y-3 relative z-20">
          {/* Card Top: Icon & Tag */}
          <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2.5">
            <div className="rounded-lg border border-[#222222] bg-[#141414] p-2 shadow-inner group-hover:border-[#00FF66]/40 transition-colors">
              {pillar.icon}
            </div>
            <span
              className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold border"
              style={{
                color: pillar.accentColor,
                borderColor: `${pillar.accentColor}30`,
                backgroundColor: `${pillar.accentColor}10`,
              }}
            >
              {pillar.tag}
            </span>
          </div>

          {/* Title & Description */}
          <div className="space-y-1">
            <h3 className="text-base font-bold font-mono text-[#FFFFFF] leading-snug group-hover:text-[#00FF66] transition-colors">
              {pillar.title}
            </h3>
            <p className="text-xs text-[#D4D4D4] font-sans leading-relaxed">
              {pillar.description}
            </p>
          </div>

          {/* Guarantee Point */}
          <div className="pt-1 flex items-start gap-1.5 text-xs text-[#EDEDED] font-sans">
            <CheckCircle2
              className="h-3.5 w-3.5 shrink-0 mt-0.5"
              style={{ color: pillar.accentColor }}
            />
            <span>{pillar.guarantee}</span>
          </div>
        </div>

        {/* Bottom Telemetry Bar */}
        <div className="relative z-20 pt-3 mt-3 border-t border-[#181818] flex items-center justify-between font-mono text-[10px] text-[#737373]">
          <span>{pillar.telemetry}</span>
          <span className="text-[#00FF66] font-semibold">VERIFIED</span>
        </div>
      </motion.div>
    </div>
  )
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-14 md:py-20 border-b border-[#1E1E1E] overflow-hidden bg-[#060606]"
    >
      {/* Background Holographic Core Reactor (360° Conic Wave on GPU Compositor Thread) */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full overflow-hidden opacity-20 z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full border border-[#00FF66]/20" />
        <div className="absolute inset-20 rounded-full border border-[#0099FF]/15" />
        <div className="absolute inset-40 rounded-full border border-[#FFB800]/10" />

        <div
          className="absolute -inset-full animate-[spin_12s_linear_infinite]"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, rgba(0, 153, 255, 0.05) 300deg, rgba(0, 255, 102, 0.25) 360deg)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle, transparent 25%, #060606 85%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 space-y-10">
        {/* Section Header with High-Contrast Plain English */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00FF66] font-semibold bg-[#00FF66]/10 px-3 py-1 rounded border border-[#00FF66]/20">
              <Terminal className="h-3.5 w-3.5 text-[#00FF66]" />
              <span>// PLATFORM MANIFESTO • ZERO-COMPROMISE DIGITAL ASSET STORE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono text-[#FFFFFF] tracking-tight">
              ABOUT INSIDE UNDERGROUND
            </h2>

            <p className="text-sm sm:text-base text-[#D4D4D4] font-sans leading-relaxed">
              Why we built a private, subscription-free marketplace for verified developer tools,
              cloud infrastructure templates, and cybersecurity architectures.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-end font-mono text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#0D0D0D] border border-[#222222] text-[#A3A3A3]">
              <Activity className="h-3.5 w-3.5 text-[#00FF66]" />
              <span>PLATFORM STATUS: <strong className="text-[#00FF66]">AUTONOMOUS_ONLINE</strong></span>
            </div>
          </div>
        </div>

        {/* Dual-Pane Layout: Left Manifesto Window + Right 4 Value Tablets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT PANE: The Architectural Manifesto Window (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full rounded-xl border border-[#262626] bg-[#0A0A0A]/95 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col justify-between font-mono">
              {/* macOS Window Titlebar */}
              <div className="flex items-center justify-between border-b border-[#1E1E1E] bg-[#0C0C0C] px-4 py-2.5 text-xs select-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5" aria-label="macOS Controls">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] inline-block" />
                  </div>
                  <span className="text-[#888888] text-[11px] ml-1.5 hidden sm:inline">
                    insideunderground:~# cat ./manifesto.md
                  </span>
                </div>
                <span className="text-[10px] text-[#00FF66] font-bold px-2 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/30">
                  INDEPENDENT
                </span>
              </div>

              {/* Manifesto Body Copy */}
              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[11px] text-[#0099FF] font-bold uppercase tracking-wider block">
                    OUR CORE CONVICTION
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#FFFFFF] leading-snug">
                    Built for Privacy, Speed, and True Ownership
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#D4D4D4] font-sans leading-relaxed">
                  Most modern software marketplaces force you into recurring monthly subscriptions,
                  harvest your personal data with intrusive marketing trackers, and lock you into proprietary platforms.
                </p>

                <p className="text-xs sm:text-sm text-[#D4D4D4] font-sans leading-relaxed">
                  We engineered Inside Underground to deliver the exact opposite:
                  <strong className="text-[#FFFFFF]"> buy verified production code once, pay privately with cryptocurrency, and own your files forever</strong>.
                  No tracking cookies. No corporate surveillance.
                </p>

                <p className="text-xs text-[#A3A3A3] font-sans leading-relaxed pt-1">
                  Our macOS Terminal aesthetic represents our philosophy: fast, keyboard-first, distraction-free,
                  and built with respect for the user's intelligence and privacy.
                </p>
              </div>

              {/* 4 Live Metric Telemetry Counters */}
              <div className="border-t border-[#1E1E1E] bg-[#070707] p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2 rounded bg-[#0D0D0D] border border-[#1A1A1A]">
                    <span className="text-base font-extrabold text-[#00FF66] block">0</span>
                    <span className="text-[9px] text-[#888888] font-bold uppercase block">
                      TRACKING COOKIES
                    </span>
                  </div>

                  <div className="p-2 rounded bg-[#0D0D0D] border border-[#1A1A1A]">
                    <span className="text-base font-extrabold text-[#0099FF] block">100%</span>
                    <span className="text-[9px] text-[#888888] font-bold uppercase block">
                      TESTED CODE
                    </span>
                  </div>

                  <div className="p-2 rounded bg-[#0D0D0D] border border-[#1A1A1A]">
                    <span className="text-base font-extrabold text-[#FFB800] block">&lt;45s</span>
                    <span className="text-[9px] text-[#888888] font-bold uppercase block">
                      DELIVERY SPEED
                    </span>
                  </div>

                  <div className="p-2 rounded bg-[#0D0D0D] border border-[#1A1A1A]">
                    <span className="text-base font-extrabold text-[#C084FC] block">
                      <InfinityIcon className="h-4 w-4 inline-block mb-0.5" />
                    </span>
                    <span className="text-[9px] text-[#888888] font-bold uppercase block">
                      LIFETIME ACCESS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANE: 4 3D Floating Glass Value Tablets (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUE_PILLARS.map((pillar) => (
              <ValueCard key={pillar.title} pillar={pillar} />
            ))}
          </div>
        </div>

        {/* Bottom Platform Guarantee Strip */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#737373]">
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-[#00FF66]" />
            <span>VERIFIED MALWARE-FREE &amp; ZERO TELEMETRY IN ALL DELIVERABLES</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-[#0099FF]" />
            <span>INSTANT ON-CHAIN CONFIRMATION 24/7/365</span>
          </div>
        </div>
      </div>
    </section>
  )
}
