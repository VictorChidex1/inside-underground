import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Lock,
  Cpu,
  ShieldCheck,
  Database,
  EyeOff,
  CheckCircle2,
  Shield,
  Zap,
  Activity,
  KeyRound,
  FileCheck,
} from 'lucide-react'

interface SecurityPillar {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  accentColor: string
  telemetry: string
  points: string[]
}

const SECURITY_PILLARS: SecurityPillar[] = [
  {
    icon: <Lock className="h-5 w-5 text-[#00FF66]" />,
    title: 'Tamper-Proof Pricing Shield',
    subtitle: 'SERVER-AUTHORITATIVE',
    description:
      'Product prices are strictly locked and validated by our secure servers. No browser extension, script, or third party can manipulate checkout prices or invoice amounts.',
    accentColor: '#00FF66',
    telemetry: 'PRICING: SERVER-AUTHORITATIVE [LOCKED]',
    points: [
      'Zero client-side price authority or tampering vectors',
      'Authoritative server pricing retrieval upon checkout',
      'Cryptographically locked cryptocurrency invoice totals',
    ],
  },
  {
    icon: <Cpu className="h-5 w-5 text-[#0099FF]" />,
    title: 'Cryptographic Signature Gate',
    subtitle: 'MILITARY-GRADE SHA-512',
    description:
      'Every incoming transaction event is verified with military-grade SHA-512 cryptographic signatures. Unsigned requests, duplicate calls, and forged transactions are blocked immediately.',
    accentColor: '#0099FF',
    telemetry: 'CIPHER: SHA-512 [SIGNATURE_VERIFIED]',
    points: [
      'Multi-layered HMAC-SHA512 webhook signature verification',
      'Isolated server-side secrets never exposed to the client',
      'Instant rejection of unsigned or replay attack requests',
    ],
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-[#FFB800]" />,
    title: 'Autonomous Blockchain Settlement',
    subtitle: 'DIRECT ON-CHAIN VERIFICATION',
    description:
      'Payments settle directly on decentralized public blockchains (USDT, BTC, ETH, SOL). We never handle credit cards, bank accounts, or sensitive financial data.',
    accentColor: '#FFB800',
    telemetry: 'SETTLEMENT: ON-CHAIN [AUTONOMOUS]',
    points: [
      'Direct blockchain peer-to-peer verification engine',
      'Zero financial KYC or banking records required',
      'Real-time multi-network blockchain confirmation monitoring',
    ],
  },
  {
    icon: <Database className="h-5 w-5 text-[#C084FC]" />,
    title: 'Immutable Asset Vault & Fraud Shield',
    subtitle: 'ATOMIC STATE PROTECTION',
    description:
      'Transactions are recorded in an atomic, tamper-proof ledger. Duplicate webhook notifications can never double-charge you, and your purchased digital files remain permanently accessible.',
    accentColor: '#C084FC',
    telemetry: 'LEDGER: ATOMIC [IMMUTABLE]',
    points: [
      'Atomic transaction safety (zero duplicate activations)',
      'Immutable audit trail logging every status transition',
      'Permanent digital asset access in your account dashboard',
    ],
  },
]

const ZERO_TRUST_TIERS = [
  {
    tier: '01',
    name: 'CRYPTO SETTLEMENT',
    label: 'On-Chain Pay',
    desc: 'Direct decentralized blockchain payment with rate locking.',
    color: '#0099FF',
  },
  {
    tier: '02',
    name: 'SIGNATURE AUDIT',
    label: 'Autonomous Gate',
    desc: 'SHA-512 verification engine. Zero human intervention.',
    color: '#00FF66',
  },
  {
    tier: '03',
    name: 'ENCRYPTED LEDGER',
    label: 'Authoritative State',
    desc: 'Atomic database transaction records permanent entitlement.',
    color: '#FFB800',
  },
  {
    tier: '04',
    name: 'ACCESS GRANTED',
    label: 'Instant Delivery',
    desc: 'Immediate 1-click clean file download with lifetime access.',
    color: '#C084FC',
  },
]

export function SecuritySection() {
  const [activePillarIndex, setActivePillarIndex] = React.useState<number>(0)

  return (
    <section
      id="security"
      className="relative py-14 md:py-20 border-b border-[#1E1E1E] overflow-hidden bg-[#050505]"
    >
      {/* 360-Degree Radial Radar Scan Wave (Hardware-Accelerated Background) */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full overflow-hidden opacity-25 z-0"
        aria-hidden="true"
      >
        {/* Concentric Radar Distance Rings */}
        <div className="absolute inset-0 rounded-full border border-[#00FF66]/20" />
        <div className="absolute inset-16 rounded-full border border-[#00FF66]/15" />
        <div className="absolute inset-32 rounded-full border border-[#00FF66]/10" />
        <div className="absolute inset-48 rounded-full border border-[#00FF66]/5" />

        {/* Rotating Radar Sweep Cone */}
        <div
          className="absolute -inset-full animate-[spin_10s_linear_infinite]"
          style={{
            background:
              'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, rgba(0, 255, 102, 0.03) 300deg, rgba(0, 255, 102, 0.25) 360deg)',
          }}
        />

        {/* Center Vignette Softener */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle, transparent 20%, #050505 85%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 space-y-10">
        {/* Section Header with High-Contrast Plain English */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00FF66] font-semibold bg-[#00FF66]/10 px-3 py-1 rounded border border-[#00FF66]/20">
              <Shield className="h-3.5 w-3.5 text-[#00FF66]" />
              <span>// ZERO-TRUST SECURITY ENCLAVE • BANK-GRADE PROTECTION</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono text-[#FFFFFF] tracking-tight">
              BANK-GRADE SECURITY ARCHITECTURE
            </h2>

            <p className="text-sm sm:text-base text-[#D4D4D4] font-sans leading-relaxed">
              How Inside Underground protects your cryptocurrency payments, personal privacy, and digital assets.
              Engineered with <strong className="text-[#00FF66]">zero client-side price tampering</strong> and atomic verification.
            </p>
          </div>

          {/* Defense Status Telemetry Pill */}
          <div className="flex items-center gap-2.5 self-start md:self-end font-mono text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#0D0D0D] border border-[#222222] text-[#A3A3A3]">
              <Activity className="h-3.5 w-3.5 text-[#00FF66]" />
              <span>ENCLAVE INTEGRITY: <strong className="text-[#00FF66]">100% SECURE</strong></span>
            </div>
          </div>
        </div>

        {/* 4-Tier Zero-Trust Security Chain (Replaces Developer Mental Model Box) */}
        <div className="rounded-xl border border-[#222222] bg-[#0A0A0A]/90 backdrop-blur-md p-5 shadow-2xl font-mono">
          <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#00FF66] font-bold">[!]</span>
              <span className="text-[#EDEDED] font-bold uppercase tracking-wider">
                THE 4-TIER ZERO-TRUST DEFENSE PIPELINE
              </span>
            </div>
            <span className="text-[10px] text-[#737373] hidden sm:inline">
              AUTONOMOUS AUDIT GATE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {ZERO_TRUST_TIERS.map((tier) => (
              <div
                key={tier.tier}
                className="rounded-lg border border-[#1A1A1A] bg-[#111111] p-3.5 space-y-1.5 transition-colors hover:border-[#333333]"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-extrabold"
                    style={{ color: tier.color }}
                  >
                    TIER_{tier.tier} // {tier.name}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tier.color }} />
                </div>
                <p className="text-sm font-bold text-[#FFFFFF]">{tier.label}</p>
                <p className="text-xs text-[#A3A3A3] font-sans leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Holographic Defense Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SECURITY_PILLARS.map((pillar, index) => {
            const isHovered = activePillarIndex === index
            return (
              <motion.div
                key={pillar.title}
                whileHover={{ y: -3 }}
                onMouseEnter={() => setActivePillarIndex(index)}
                className={`relative group rounded-xl border bg-[#0A0A0A]/95 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden cursor-default select-none ${
                  isHovered
                    ? 'border-[#00FF66]/50 shadow-[0_10px_30px_rgba(0,255,102,0.08)]'
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

                {/* Ambient Pillar Glow */}
                <div
                  className="pointer-events-none absolute -top-20 -right-20 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: pillar.accentColor }}
                  aria-hidden="true"
                />

                <div className="space-y-4 relative z-20">
                  {/* Pillar Top Bar */}
                  <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg border border-[#222222] bg-[#141414] p-2 shadow-inner group-hover:border-[#00FF66]/40 transition-colors">
                        {pillar.icon}
                      </div>
                      <span className="text-[10px] text-[#737373] font-bold tracking-wider uppercase">
                        {pillar.subtitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-[#00FF66] font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                      <span>ARMED</span>
                    </div>
                  </div>

                  {/* Title & Description in High-Contrast Typography */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold font-mono text-[#FFFFFF] leading-snug group-hover:text-[#00FF66] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D4D4D4] font-sans leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Security Proof Feature Checklist */}
                  <div className="space-y-2 pt-2 border-t border-[#161616]">
                    {pillar.points.map((point) => (
                      <div key={point} className="flex items-start gap-2 text-xs">
                        <CheckCircle2
                          className="h-3.5 w-3.5 shrink-0 mt-0.5"
                          style={{ color: pillar.accentColor }}
                        />
                        <span className="text-[#EDEDED] font-sans">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pillar Bottom Telemetry Bar */}
                <div className="relative z-20 pt-4 mt-4 border-t border-[#181818] flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#888888]">{pillar.telemetry}</span>
                  <span
                    className="font-bold px-2 py-0.5 rounded border"
                    style={{
                      color: pillar.accentColor,
                      borderColor: `${pillar.accentColor}30`,
                      backgroundColor: `${pillar.accentColor}10`,
                    }}
                  >
                    ACTIVE
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Absolute Privacy & Anti-Surveillance Banner */}
        <div className="rounded-xl border border-[#222222] bg-[#0A0A0A] p-5 sm:p-6 shadow-2xl font-mono">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="rounded-lg border border-[#262626] bg-[#141414] p-3 text-[#00FF66] shrink-0 shadow-inner">
                <EyeOff className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-[#FFFFFF]">
                    ABSOLUTE PRIVACY GUARANTEE: ZERO FINANCIAL KYC &amp; ZERO AD TRACKERS
                  </span>
                </div>
                <p className="text-xs text-[#D4D4D4] font-sans leading-relaxed">
                  No Google Analytics. No Meta Pixels. No tracking cookies. No bank account logins.
                  Only your account email and cryptographically verified transaction receipts are recorded to deliver your digital purchases.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-xs text-[#00FF66] bg-[#00FF66]/10 px-3 py-1.5 rounded border border-[#00FF66]/30 font-semibold">
                <Zap className="h-3.5 w-3.5" />
                <span>100% ANONYMOUS CHECKOUT</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#0099FF] bg-[#0099FF]/10 px-3 py-1.5 rounded border border-[#0099FF]/30 font-semibold">
                <Shield className="h-3.5 w-3.5" />
                <span>AIR-GAPPED STORAGE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Verification Footer Ticker */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#737373]">
          <div className="flex items-center gap-2">
            <KeyRound className="h-3.5 w-3.5 text-[#00FF66]" />
            <span>ENCRYPTION STANDARD: AES-GCM-256 / SHA-512</span>
          </div>

          <div className="flex items-center gap-2">
            <FileCheck className="h-3.5 w-3.5 text-[#0099FF]" />
            <span>ALL ASSETS DIGITALLY HASHED &amp; MALWARE SCANNED</span>
          </div>

          <div className="flex items-center gap-2 text-[#00FF66]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>INDEPENDENT CRYPTO AUDIT VERIFIED</span>
          </div>
        </div>
      </div>
    </section>
  )
}
