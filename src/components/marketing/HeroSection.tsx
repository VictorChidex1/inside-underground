import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Shield,
  Zap,
  Lock,
  Cpu,
  ShoppingBag,
  Activity,
  Terminal,
  CheckCircle2,
  Play,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalCursor } from '@/components/terminal/TerminalCursor'

export interface HeroSectionProps {
  onBrowseClick?: () => void
  onHowItWorksClick?: () => void
  onRegisterClick?: () => void
}

interface TelemetryLog {
  id: string
  time: string
  event: string
  detail: string
  status: 'SETTLED' | 'VERIFIED' | 'DISPATCH' | 'OK'
}

const INITIAL_LOGS: TelemetryLog[] = [
  {
    id: '1',
    time: '18:14:02',
    event: 'TX_SETTLED',
    detail: 'PRD-01 (WireGuard Bundle) ➔ 45.00 USDT [0x8f...e2a]',
    status: 'SETTLED',
  },
  {
    id: '2',
    time: '18:11:45',
    event: 'SIG_VERIFY',
    detail: 'HMAC-SHA512 signature authentic [nowpayments_ipn]',
    status: 'VERIFIED',
  },
  {
    id: '3',
    time: '18:08:19',
    event: 'DISPATCH',
    detail: 'PRD-02 (Multi-Cloud Terraform) ➔ Instant Unlock',
    status: 'DISPATCH',
  },
  {
    id: '4',
    time: '18:04:50',
    event: 'ATOMIC_TX',
    detail: 'State transition validated [order_id: #9941]',
    status: 'OK',
  },
  {
    id: '5',
    time: '17:59:12',
    event: 'TX_SETTLED',
    detail: 'PRD-03 (Key Custody Architecture) ➔ 59.00 USDT',
    status: 'SETTLED',
  },
]

export function HeroSection({
  onBrowseClick,
  onHowItWorksClick,
  onRegisterClick,
}: HeroSectionProps) {
  const [activeTab, setActiveTab] = React.useState<'ledger' | 'enclave' | 'verify'>('ledger')
  const [commandEcho, setCommandEcho] = React.useState<string>('select_action')
  const [isAuditing, setIsAuditing] = React.useState<boolean>(false)
  const [auditStep, setAuditStep] = React.useState<number>(0)
  const [logs, setLogs] = React.useState<TelemetryLog[]>(INITIAL_LOGS)

  // Listen for keyboard quick actions (1/B, 2/H, 3/R)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is focused on an input element
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      if (e.key === '1' || e.key === 'b' || e.key === 'B') {
        e.preventDefault()
        setCommandEcho('select_action [1] browse_products')
        onBrowseClick?.()
      } else if (e.key === '2' || e.key === 'h' || e.key === 'H') {
        e.preventDefault()
        setCommandEcho('select_action [2] how_it_works')
        onHowItWorksClick?.()
      } else if (e.key === '3' || e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        setCommandEcho('select_action [3] register_account')
        onRegisterClick?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBrowseClick, onHowItWorksClick, onRegisterClick])

  // Periodic simulated live telemetry tick to give the terminal subtle life
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeStr = now.toTimeString().split(' ')[0]
      const events: Array<Omit<TelemetryLog, 'id' | 'time'>> = [
        {
          event: 'TX_SETTLED',
          detail: 'PRD-04 (Serverless Microservice) ➔ 39.00 USDT',
          status: 'SETTLED',
        },
        {
          event: 'SIG_VERIFY',
          detail: 'HMAC-SHA512 verified [nowpayments_engine]',
          status: 'VERIFIED',
        },
        {
          event: 'DISPATCH',
          detail: 'PRD-01 (WireGuard Kit) ➔ Instant cryptographic delivery',
          status: 'DISPATCH',
        },
        {
          event: 'ENCLAVE_PULSE',
          detail: 'All cluster nodes healthy. Latency 12ms [OK]',
          status: 'OK',
        },
      ]

      const randomEvent = events[Math.floor(Math.random() * events.length)]
      const newLog: TelemetryLog = {
        id: Date.now().toString(),
        time: timeStr,
        ...randomEvent,
      }

      setLogs((prev) => [newLog, ...prev.slice(0, 5)])
    }, 9000)

    return () => clearInterval(interval)
  }, [])

  // Run simulated integrity audit on the verify tab
  const handleRunAudit = () => {
    if (isAuditing) return
    setIsAuditing(true)
    setAuditStep(1)

    setTimeout(() => setAuditStep(2), 700)
    setTimeout(() => setAuditStep(3), 1400)
    setTimeout(() => setAuditStep(4), 2100)
    setTimeout(() => {
      setIsAuditing(false)
    }, 2800)
  }

  const handleAction = (actionName: string, actionFn?: () => void) => {
    setCommandEcho(`select_action ${actionName}`)
    actionFn?.()
  }

  return (
    <section id="hero" className="relative py-8 md:py-16 border-b border-[#1E1E1E] overflow-hidden">
      {/* Ambient background glow for visual depth (without gaudy cyberpunk noise) */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,102,0.4) 0%, rgba(0,153,255,0.15) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="w-full px-4 sm:px-8 lg:px-12">
        {/* Terminal Window Frame */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-lg border border-[#1E1E1E] bg-[#070707] shadow-2xl overflow-hidden transition-colors hover:border-[#2A2A2A]"
        >
          {/* macOS Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-[#1E1E1E] bg-[#0A0A0A]/95 backdrop-blur-sm px-4 py-2.5 font-mono text-xs select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 group cursor-default" aria-label="macOS Window Controls">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56] inline-flex items-center justify-center text-[8px] text-black/0 group-hover:text-black/80 font-bold transition-colors leading-none">
                  ×
                </span>
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E] inline-flex items-center justify-center text-[8px] text-black/0 group-hover:text-black/80 font-bold transition-colors leading-none">
                  −
                </span>
                <span className="h-3 w-3 rounded-full bg-[#27C93F] inline-flex items-center justify-center text-[8px] text-black/0 group-hover:text-black/80 font-bold transition-colors leading-none">
                  +
                </span>
              </div>
              <span className="text-[#808080] ml-2 hidden sm:inline">
                guest@insideunderground.com:~ — Session #001
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#737373]">
                <Activity className="h-3 w-3 text-[#00FF66]" />
                <span>LATENCY: 12ms</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse-subtle" />
                <span className="font-semibold tracking-wider">ENCLAVE_ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Terminal Window Content - Split-Pane Architecture */}
          <div className="p-6 sm:p-8 lg:p-10 font-mono">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* LEFT COLUMN: Mission & Command Portal (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                {/* Boot command prompt */}
                <div className="space-y-1">
                  <TerminalPrompt
                    user="guest"
                    host="insideunderground.com"
                    path="~"
                    command="./welcome.sh --mode=public"
                  />
                </div>

                {/* Authority Headline & Monospace Branding */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#00FF66] text-xs sm:text-sm font-bold tracking-widest uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66]" />
                    <span>// ENCLAVE_BOOT: READY // ZERO_TRUST_v1.0.8</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#EDEDED] leading-tight font-mono">
                    INSIDE UNDERGROUND
                  </h1>
                  <p className="text-sm sm:text-base text-[#00FF66] font-medium tracking-wide">
                    // SOVEREIGN DIGITAL PRODUCTS &amp; ARCHITECTURE ENCLAVE
                  </p>
                </div>

                {/* Value Proposition Description */}
                <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed max-w-xl">
                  Direct, cryptographically verified acquisition of production security kits,
                  multi-cloud infrastructure, and developer systems.
                  Settle seamlessly via cryptocurrency with zero surveillance cookies,
                  immutable server-side pricing, and instant entitlement.
                </p>

                {/* Technical Protocol Status Bar */}
                <div className="flex flex-wrap items-center gap-3 py-2.5 border-y border-[#1E1E1E] text-[11px] text-[#737373]">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5 text-[#00FF66]" />
                    <span>ARCHITECTURE: ZERO-ATTACK ENCLAVE</span>
                  </div>
                  <span className="text-[#333333]">|</span>
                  <div className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-[#FFB800]" />
                    <span>SETTLEMENT: CRYPTO-NATIVE</span>
                  </div>
                  <span className="text-[#333333]">|</span>
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-[#0099FF]" />
                    <span>SIGNATURE: HMAC-SHA512</span>
                  </div>
                </div>

                {/* Command-Style CTA Actions */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => handleAction('[1] browse_products', onBrowseClick)}
                      className="gap-2 text-xs relative group cursor-pointer"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>[1] BROWSE PRODUCTS</span>
                      <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-black/40 text-[10px] rounded text-black font-semibold border border-black/20">
                        B
                      </kbd>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleAction('[2] how_it_works', onHowItWorksClick)}
                      className="gap-2 text-xs cursor-pointer hover:border-[#0099FF] hover:text-[#0099FF]"
                    >
                      <span>[2] HOW IT WORKS</span>
                      <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-[#1A1A1A] text-[10px] rounded text-[#808080] border border-[#2E2E2E]">
                        H
                      </kbd>
                    </Button>

                    <Button
                      variant="command"
                      size="lg"
                      onClick={() => handleAction('[3] register_account', onRegisterClick)}
                      className="gap-2 text-xs cursor-pointer"
                    >
                      <span>[3] REGISTER ACCOUNT</span>
                      <kbd className="hidden sm:inline-block px-1.5 py-0.2 bg-[#1A1A1A] text-[10px] rounded text-[#808080] border border-[#2E2E2E]">
                        R
                      </kbd>
                    </Button>
                  </div>

                  {/* Active Terminal Feedback Line */}
                  <div className="flex items-center gap-1.5 text-xs text-[#525252] pt-1">
                    <span className="text-[#00FF66]/70">guest@insideunderground.com:~$</span>
                    <span className="text-[#EDEDED] font-semibold">{commandEcho}</span>
                    <TerminalCursor shape="block" />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Live Telemetry & Enclave Monitor (5 Cols) */}
              <div className="lg:col-span-5">
                <div className="rounded-lg border border-[#1E1E1E] bg-[#0A0A0A] overflow-hidden shadow-inner">
                  {/* Telemetry Header & Tab Navigation */}
                  <div className="flex items-center justify-between border-b border-[#1E1E1E] bg-[#0D0D0D] px-3 py-2 text-xs select-none">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setActiveTab('ledger')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          activeTab === 'ledger'
                            ? 'bg-[#1A1A1A] text-[#00FF66] border border-[#00FF66]/30'
                            : 'text-[#808080] hover:text-[#EDEDED]'
                        }`}
                      >
                        <Terminal className="h-3 w-3" />
                        <span>ledger.log</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('enclave')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          activeTab === 'enclave'
                            ? 'bg-[#1A1A1A] text-[#0099FF] border border-[#0099FF]/30'
                            : 'text-[#808080] hover:text-[#EDEDED]'
                        }`}
                      >
                        <Shield className="h-3 w-3" />
                        <span>enclave.stat</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('verify')}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                          activeTab === 'verify'
                            ? 'bg-[#1A1A1A] text-[#FFB800] border border-[#FFB800]/30'
                            : 'text-[#808080] hover:text-[#EDEDED]'
                        }`}
                      >
                        <Activity className="h-3 w-3" />
                        <span>verify.sh</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-[#00FF66] font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-ping" />
                      <span className="hidden sm:inline">LIVE</span>
                    </div>
                  </div>

                  {/* Tab Body: Live Content */}
                  <div className="p-4 min-h-[280px] flex flex-col justify-between text-xs">
                    <AnimatePresence mode="wait">
                      {activeTab === 'ledger' && (
                        <motion.div
                          key="ledger"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-2.5"
                        >
                          <div className="flex items-center justify-between text-[10px] text-[#737373] border-b border-[#1E1E1E] pb-1.5">
                            <span>TIMESTAMP // ACTION</span>
                            <span>PAYLOAD</span>
                          </div>

                          <div className="space-y-2 font-mono">
                            {logs.map((log) => (
                              <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-col gap-0.5 text-[11px] leading-relaxed border-b border-[#141414] pb-1.5 last:border-none"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[#525252] text-[10px]">{log.time}</span>
                                    <span
                                      className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                                        log.status === 'SETTLED'
                                          ? 'bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20'
                                          : log.status === 'VERIFIED'
                                          ? 'bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/20'
                                          : log.status === 'DISPATCH'
                                          ? 'bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20'
                                          : 'bg-[#C084FC]/10 text-[#C084FC] border border-[#C084FC]/20'
                                      }`}
                                    >
                                      {log.event}
                                    </span>
                                  </div>
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66]/60" />
                                </div>
                                <span className="text-[#A3A3A3] text-[11px] truncate">{log.detail}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'enclave' && (
                        <motion.div
                          key="enclave"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3 font-mono"
                        >
                          <div className="text-[11px] text-[#0099FF] font-semibold flex items-center gap-1.5">
                            <Shield className="h-3.5 w-3.5" />
                            <span>// ENCLAVE SPECIFICATION MANIFEST</span>
                          </div>

                          <div className="space-y-2 text-[11px]">
                            <div className="flex justify-between p-2 rounded bg-[#070707] border border-[#1E1E1E]">
                              <span className="text-[#808080]">RUNTIME_INTEGRITY</span>
                              <span className="text-[#00FF66] font-bold">100% ISOLATED</span>
                            </div>
                            <div className="flex justify-between p-2 rounded bg-[#070707] border border-[#1E1E1E]">
                              <span className="text-[#808080]">SETTLEMENT_RAILS</span>
                              <span className="text-[#EDEDED]">USDT / BTC / ETH / SOL</span>
                            </div>
                            <div className="flex justify-between p-2 rounded bg-[#070707] border border-[#1E1E1E]">
                              <span className="text-[#808080]">ATTACK_SURFACE</span>
                              <span className="text-[#00FF66]">ZERO UNMANAGED SERVERS</span>
                            </div>
                            <div className="flex justify-between p-2 rounded bg-[#070707] border border-[#1E1E1E]">
                              <span className="text-[#808080]">COOKIE_SURVEILLANCE</span>
                              <span className="text-[#00FF66]">0% (ZERO TRACKING)</span>
                            </div>
                            <div className="flex justify-between p-2 rounded bg-[#070707] border border-[#1E1E1E]">
                              <span className="text-[#808080]">DELIVERY_LATENCY</span>
                              <span className="text-[#FFB800]">SUB-SECOND ENTITLEMENT</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'verify' && (
                        <motion.div
                          key="verify"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3 font-mono"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-[#FFB800] font-semibold flex items-center gap-1.5">
                              <Terminal className="h-3.5 w-3.5" />
                              <span>// INTERACTIVE PROTOCOL AUDIT</span>
                            </span>
                            <button
                              type="button"
                              onClick={handleRunAudit}
                              disabled={isAuditing}
                              className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#FFB800]/10 hover:bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/30 text-[10px] cursor-pointer disabled:opacity-50"
                            >
                              {isAuditing ? (
                                <RotateCcw className="h-3 w-3 animate-spin" />
                              ) : (
                                <Play className="h-3 w-3" />
                              )}
                              <span>{isAuditing ? 'AUDITING...' : 'RUN AUDIT'}</span>
                            </button>
                          </div>

                          <div className="space-y-2 text-[11px] bg-[#070707] p-3 rounded border border-[#1E1E1E]">
                            <div className="text-[#808080] text-[10px]">
                              $ ./audit-enclave-integrity.sh --check-all
                            </div>

                            <div className="space-y-1.5 pt-1">
                              <div
                                className={`flex items-center gap-2 transition-opacity ${
                                  auditStep >= 1 ? 'opacity-100 text-[#00FF66]' : 'opacity-30 text-[#808080]'
                                }`}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>[01] HMAC-SHA512 Signature Authenticity</span>
                              </div>

                              <div
                                className={`flex items-center gap-2 transition-opacity ${
                                  auditStep >= 2 ? 'opacity-100 text-[#00FF66]' : 'opacity-30 text-[#808080]'
                                }`}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>[02] Server-Side Price Immutability Enforced</span>
                              </div>

                              <div
                                className={`flex items-center gap-2 transition-opacity ${
                                  auditStep >= 3 ? 'opacity-100 text-[#00FF66]' : 'opacity-30 text-[#808080]'
                                }`}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>[03] Atomic Ledger State Guard Active</span>
                              </div>

                              <div
                                className={`flex items-center gap-2 transition-opacity ${
                                  auditStep >= 4 ? 'opacity-100 text-[#00FF66]' : 'opacity-30 text-[#808080]'
                                }`}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span className="font-bold">STATUS: 100% SECURE ENCLAVE</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Stream summary bar */}
                    <div className="mt-3 pt-2.5 border-t border-[#1E1E1E] flex items-center justify-between text-[10px] text-[#525252]">
                      <span>PROTOCOL: CRYPTOGRAPHIC_GATEWAY</span>
                      <span className="text-[#00FF66]">ALL_NODES_HEALTHY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TMUX-Style Docked Status Bar (Unified Terminal Architecture) */}
          <div className="border-t border-[#1E1E1E] bg-[#0A0A0A] px-4 sm:px-8 py-3 font-mono">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="group rounded border border-[#1E1E1E]/80 bg-[#070707] p-2.5 hover:border-[#00FF66]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#00FF66] font-semibold mb-0.5 text-[11px]">
                  <Shield className="h-3 w-3" />
                  <span>ZERO-ATTACK ENCLAVE</span>
                </div>
                <p className="text-[10px] text-[#737373] leading-tight">
                  Micro-isolated serverless runtimes with zero persistent server attack surface.
                </p>
              </div>

              <div className="group rounded border border-[#1E1E1E]/80 bg-[#070707] p-2.5 hover:border-[#0099FF]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#0099FF] font-semibold mb-0.5 text-[11px]">
                  <Lock className="h-3 w-3" />
                  <span>CRYPTOGRAPHIC IPN</span>
                </div>
                <p className="text-[10px] text-[#737373] leading-tight">
                  Independent HMAC-SHA512 verification before state transition.
                </p>
              </div>

              <div className="group rounded border border-[#1E1E1E]/80 bg-[#070707] p-2.5 hover:border-[#FFB800]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#FFB800] font-semibold mb-0.5 text-[11px]">
                  <Zap className="h-3 w-3" />
                  <span>AUTONOMOUS SETTLEMENT</span>
                </div>
                <p className="text-[10px] text-[#737373] leading-tight">
                  Close browser safely after payment. Verification finalizes autonomously.
                </p>
              </div>

              <div className="group rounded border border-[#1E1E1E]/80 bg-[#070707] p-2.5 hover:border-[#C084FC]/40 transition-colors">
                <div className="flex items-center gap-2 text-[#C084FC] font-semibold mb-0.5 text-[11px]">
                  <Cpu className="h-3 w-3" />
                  <span>ACID ATOMIC LEDGER</span>
                </div>
                <p className="text-[10px] text-[#737373] leading-tight">
                  Atomic transactional isolation guarantees zero double-entitlements.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
