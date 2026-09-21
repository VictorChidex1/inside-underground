import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  CreditCard,
  ShieldCheck,
  Download,
  CheckCircle2,
  Lock,
  Cpu,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react'

export interface HowItWorksSectionProps {
  onBrowseClick?: () => void
}

interface StepData {
  step: string
  code: string
  title: string
  category: string
  summary: string
  details: string[]
  accentColor: string
  icon: React.ReactNode
  commandEcho: string
  metaBadge: string
}

const PIPELINE_STEPS: StepData[] = [
  {
    step: '01',
    code: 'PICK',
    title: 'Choose Your Product',
    category: 'VERIFIED REPOSITORY',
    summary:
      'Browse our curated collection of production security kits, cloud blueprints, and dev tools. Inspect full file manifests before purchase.',
    details: [
      '100% verified, production-tested deliverables',
      'Inspect complete file tree & documentation upfront',
      'Zero subscription lock-in or recurring fees',
    ],
    accentColor: '#00FF66',
    icon: <Search className="h-5 w-5 text-[#00FF66]" />,
    commandEcho: 'item_select --verified --manifest',
    metaBadge: 'CATALOG_READY',
  },
  {
    step: '02',
    code: 'PAY',
    title: 'Pay Privately With Crypto',
    category: 'ANONYMOUS CHECKOUT',
    summary:
      'Settle securely with USDT, Bitcoin, Ethereum, or Solana. No credit cards or bank statements required, and zero advertising trackers.',
    details: [
      'Accepts USDT, BTC, ETH, SOL & more',
      'No financial KYC, no identity documents, no banking records',
      'Real-time crypto rate locking guarantee',
    ],
    accentColor: '#0099FF',
    icon: <CreditCard className="h-5 w-5 text-[#0099FF]" />,
    commandEcho: 'crypto_pay --token=USDT --locked',
    metaBadge: 'PRIVATE_SETTLEMENT',
  },
  {
    step: '03',
    code: 'VERIFY',
    title: 'Autonomous Verification',
    category: 'BLOCKCHAIN AUDIT',
    summary:
      'Our autonomous payment nodes validate your blockchain transaction in seconds. Safe from power loss or dropped connections.',
    details: [
      'Autonomous on-chain transaction monitoring',
      'Safe from device battery death or closed tabs',
      'Zero human intervention or manual approvals',
    ],
    accentColor: '#FFB800',
    icon: <ShieldCheck className="h-5 w-5 text-[#FFB800]" />,
    commandEcho: 'verify_tx --onchain --autonomous',
    metaBadge: 'INSTANT_VALIDATE',
  },
  {
    step: '04',
    code: 'UNLOCK',
    title: 'Instant File Download',
    category: 'LIFETIME ACCESS',
    summary:
      'Your digital download unlocks automatically the second the blockchain confirms. Download your clean .ZIP package immediately.',
    details: [
      'Immediate 1-click clean .ZIP file download',
      'Cryptographic SHA-256 integrity checksums',
      'Lifetime file access & architecture updates',
    ],
    accentColor: '#C084FC',
    icon: <Download className="h-5 w-5 text-[#C084FC]" />,
    commandEcho: 'unlock_package --sha256 --mint',
    metaBadge: 'ACCESS_GRANTED',
  },
]

export function HowItWorksSection({ onBrowseClick }: HowItWorksSectionProps) {
  const [activeStep, setActiveStep] = React.useState<number>(0)

  return (
    <section
      id="how-it-works"
      className="relative py-14 md:py-20 border-b border-[#1E1E1E] overflow-hidden bg-[#060606]"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[150px] opacity-15"
        style={{
          background:
            'radial-gradient(circle, rgba(0,255,102,0.25) 0%, rgba(0,153,255,0.15) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header with High-Contrast Plain English */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00FF66] font-semibold bg-[#00FF66]/10 px-3 py-1 rounded border border-[#00FF66]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              <span>// 4-STEP CHECKOUT PIPELINE • INSTANT ASSET ENTITLEMENTS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono text-[#FFFFFF] tracking-tight">
              HOW TO BUY &amp; DOWNLOAD IN SECONDS
            </h2>

            <p className="text-sm sm:text-base text-[#D4D4D4] font-sans leading-relaxed">
              Fast, simple account setup, no credit card statements, and zero advertising trackers.
              Pay privately with cryptocurrency and receive <strong className="text-[#00FF66]">instant digital file unlock</strong>.
            </p>
          </div>

          {/* Real-Time Pipeline Status Badge */}
          <div className="flex items-center gap-3 self-start md:self-end font-mono text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#111111] border border-[#222222] text-[#A3A3A3]">
              <Cpu className="h-3.5 w-3.5 text-[#00FF66]" />
              <span>DELIVERY NODES: <strong className="text-[#EDEDED]">100% OPERATIONAL</strong></span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* QUANTUM PARTICLE CONDUIT & 4 HOLOGRAPHIC STEP CARDS      */}
        {/* ======================================================== */}
        <div className="relative">
          {/* Desktop Horizontal Quantum Particle Circuit Trace */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] z-0 pointer-events-none">
            {/* Background Trace Track */}
            <div className="w-full h-full bg-[#1A1A1A]" />

            {/* Traveling High-Voltage Photon Laser Pulse */}
            <motion.div
              className="absolute top-0 h-[2px] w-36 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent shadow-[0_0_8px_#00FF66]"
              animate={{
                left: ['-10%', '110%'],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Secondary Cyan Counter-Pulse */}
            <motion.div
              className="absolute top-0 h-[2px] w-24 bg-gradient-to-r from-transparent via-[#0099FF] to-transparent"
              animate={{
                left: ['-10%', '110%'],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 4,
                delay: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* 4 Holographic Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {PIPELINE_STEPS.map((item, index) => {
              const isSelected = activeStep === index
              return (
                <motion.div
                  key={item.step}
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`relative group rounded-xl border bg-[#0A0A0A]/95 backdrop-blur-md p-5 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden cursor-default select-none ${
                    isSelected
                      ? 'border-[#00FF66]/60 shadow-[0_10px_30px_rgba(0,255,102,0.1)]'
                      : 'border-[#222222] hover:border-[#383838]'
                  }`}
                >
                  {/* Optical Targeting Corner HUD Brackets */}
                  <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
                    <span className="absolute top-1.5 left-1.5 h-2 w-2 border-t-2 border-l-2 border-[#00FF66]/40 rounded-tl-sm group-hover:border-[#00FF66] transition-colors" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 border-t-2 border-r-2 border-[#00FF66]/40 rounded-tr-sm group-hover:border-[#00FF66] transition-colors" />
                    <span className="absolute bottom-1.5 left-1.5 h-2 w-2 border-b-2 border-l-2 border-[#00FF66]/40 rounded-bl-sm group-hover:border-[#00FF66] transition-colors" />
                    <span className="absolute bottom-1.5 right-1.5 h-2 w-2 border-b-2 border-r-2 border-[#00FF66]/40 rounded-br-sm group-hover:border-[#00FF66] transition-colors" />
                  </div>

                  {/* Top Ambient Glow on Card Hover */}
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: item.accentColor }}
                    aria-hidden="true"
                  />

                  {/* Step Header: Step Number, Live Pulse, and Icon */}
                  <div className="space-y-3 relative z-20">
                    <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-3 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-0.5 rounded text-[11px] font-extrabold border"
                          style={{
                            color: item.accentColor,
                            borderColor: `${item.accentColor}40`,
                            backgroundColor: `${item.accentColor}15`,
                          }}
                        >
                          STAGE_{item.step}
                        </span>
                        <span className="text-[#666666] font-semibold">//</span>
                        <span className="text-[#A3A3A3] text-[11px] font-bold tracking-wider">
                          {item.code}
                        </span>
                      </div>

                      {/* Icon container with high-contrast accent */}
                      <div className="rounded-lg border border-[#222222] bg-[#141414] p-2 shadow-inner group-hover:border-[#00FF66]/40 transition-colors">
                        {item.icon}
                      </div>
                    </div>

                    {/* Step Title in Crisp White */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-[#737373] uppercase block">
                        {item.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold font-mono text-[#FFFFFF] leading-snug group-hover:text-[#00FF66] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Plain-English Summary Description */}
                    <p className="text-xs text-[#D4D4D4] font-sans leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Feature Micro-Checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-[#161616] text-[11px]">
                      {item.details.map((detail) => (
                        <div key={detail} className="flex items-start gap-2">
                          <CheckCircle2
                            className="h-3.5 w-3.5 shrink-0 mt-0.5"
                            style={{ color: item.accentColor }}
                          />
                          <span className="text-[#CCCCCC] font-sans text-xs">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Technical Command Echo + State Status */}
                  <div className="relative z-20 pt-4 mt-4 border-t border-[#1A1A1A] space-y-2 font-mono text-[10px]">
                    <div className="rounded bg-[#060606] px-2.5 py-1.5 text-[#888888] border border-[#1C1C1C] flex items-center justify-between">
                      <code>$ {item.commandEcho}</code>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                    </div>

                    <div className="flex items-center justify-between text-[#666666]">
                      <span>STAGE_STATE:</span>
                      <span className="font-bold text-[#EDEDED]">{item.metaBadge}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SHIELDED TRANSACTION RESILIENCE GUARANTEE (BOTTOM BANNER) */}
        {/* ======================================================== */}
        <div className="relative rounded-xl border border-[#2E2E2E] bg-[#0A0A0A] p-6 sm:p-7 shadow-2xl overflow-hidden font-mono">
          {/* Left Decorative Gold Accent Line */}
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-[#FFB800] via-[#00FF66] to-[#0099FF]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Col: Guarantee Explanation */}
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-[#FFB800] text-xs font-bold">
                <ShieldAlert className="h-4 w-4 text-[#FFB800] shrink-0" />
                <span>CUSTOMER RESILIENCE GUARANTEE // SAFE FROM CONNECTION DROPS</span>
              </div>

              <h4 className="text-base sm:text-lg font-bold text-[#FFFFFF]">
                Your Payment Is Always Protected—Even If Your Computer Turns Off
              </h4>

              <p className="text-xs sm:text-sm text-[#D4D4D4] font-sans leading-relaxed">
                If your battery dies, Wi-Fi disconnects, or your browser tab accidentally closes while paying,
                <strong className="text-[#FFFFFF]"> you will never lose your purchase</strong>.
                Our autonomous servers monitor the blockchain independently.
                The moment your transaction confirms, your download package is securely unlocked and waiting for you.
              </p>
            </div>

            {/* Right Col: Trust Badges & Action */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:items-end">
              <div className="flex items-center gap-2 text-xs text-[#00FF66] bg-[#00FF66]/10 px-3 py-1.5 rounded border border-[#00FF66]/30">
                <Zap className="h-3.5 w-3.5" />
                <span className="font-semibold">AUTONOMOUS SETTLEMENT</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#0099FF] bg-[#0099FF]/10 px-3 py-1.5 rounded border border-[#0099FF]/30">
                <Lock className="h-3.5 w-3.5" />
                <span className="font-semibold">NO FINANCIAL KYC REQUIRED</span>
              </div>

              {onBrowseClick && (
                <button
                  type="button"
                  onClick={onBrowseClick}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#00FF66] hover:underline pt-1 cursor-pointer"
                >
                  <span>BROWSE DIGITAL PRODUCTS NOW</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Global Security Micro-Ticker */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#737373]">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#00FF66]" />
            <span>AVG CHECKOUT CONFIRMATION: &lt; 45 SECONDS</span>
          </div>

          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-[#0099FF]" />
            <span>ACCEPTED: USDT (TRC-20, ERC-20, SOL) • BTC • ETH • SOL</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#FFB800]" />
            <span>INSTANT MALWARE-FREE GUARANTEE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
