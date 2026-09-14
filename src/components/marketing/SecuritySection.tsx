import { ShieldAlert, CheckCircle2, Lock, Cpu, Database, EyeOff } from 'lucide-react'
import { TerminalPanel } from '@/components/terminal/TerminalPanel'
import { Badge } from '@/components/ui/badge'

const ARCHITECTURE_PILLARS = [
  {
    icon: <Lock className="h-4 w-4 text-[#00FF66]" />,
    title: 'Zero Client-Side Price Authority',
    detail: 'The browser is never trusted for pricing or checkout amounts. The backend retrieves the authoritative price directly from Firestore.',
  },
  {
    icon: <Cpu className="h-4 w-4 text-[#0099FF]" />,
    title: 'HMAC-SHA512 Signature Gate',
    detail: 'Every incoming webhook is cryptographically checked against x-nowpayments-sig using server-side secrets. Unsigned calls are rejected immediately.',
  },
  {
    icon: <ShieldAlert className="h-4 w-4 text-[#FFB800]" />,
    title: 'Independent Payment Verification',
    detail: 'Cloud Functions verify payment status directly with the NOWPayments API before activating accounts or creating entitlements.',
  },
  {
    icon: <Database className="h-4 w-4 text-[#C084FC]" />,
    title: 'Idempotency & Audit Trail',
    detail: 'Atomic Firestore transactions ensure duplicate webhooks never activate an account twice. Every status transition is logged to paymentEvents.',
  },
]

export function SecuritySection() {
  return (
    <section id="security" className="py-12 md:py-16 border-b border-[#1E1E1E]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 font-mono">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <span className="text-[#00FF66] font-bold">&gt;</span>
            <span>guest@insideunderground.com:~/security# ./audit-enclave.sh</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#EDEDED] tracking-tight">
            SECURITY & TRUST ARCHITECTURE
          </h2>
          <p className="text-xs text-[#808080]">
            How Inside Underground enforces cryptographic verification and serverless state integrity.
          </p>
        </div>

        {/* The 4-Layer Mental Model Box */}
        <TerminalPanel
          title="CORE_MENTAL_MODEL"
          badge={<Badge variant="default">GOVERNING_RULE</Badge>}
          className="border-[#00FF66]/30 bg-[#003B17]/10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3 space-y-1">
              <span className="text-[10px] text-[#0099FF] block uppercase font-semibold">
                [01] NOWPAYMENTS
              </span>
              <p className="text-sm font-bold text-[#EDEDED]">Tells us WHAT HAPPENED.</p>
              <p className="text-[11px] text-[#737373]">Cryptocurrency network settlement.</p>
            </div>

            <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3 space-y-1">
              <span className="text-[10px] text-[#00FF66] block uppercase font-semibold">
                [02] CLOUD FUNCTIONS
              </span>
              <p className="text-sm font-bold text-[#EDEDED]">Decide WHAT IT MEANS.</p>
              <p className="text-[11px] text-[#737373]">Server-side business validation.</p>
            </div>

            <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3 space-y-1">
              <span className="text-[10px] text-[#FFB800] block uppercase font-semibold">
                [03] CLOUD FIRESTORE
              </span>
              <p className="text-sm font-bold text-[#EDEDED]">Records WHAT WE BELIEVE.</p>
              <p className="text-[11px] text-[#737373]">Authoritative application state.</p>
            </div>

            <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-3 space-y-1">
              <span className="text-[10px] text-[#C084FC] block uppercase font-semibold">
                [04] REACT FRONTEND
              </span>
              <p className="text-sm font-bold text-[#EDEDED]">Displays WHAT USER CAN DO.</p>
              <p className="text-[11px] text-[#737373]">Strictly an interface viewport.</p>
            </div>
          </div>
        </TerminalPanel>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ARCHITECTURE_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-4 space-y-2 hover:border-[#2E2E2E] transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="rounded border border-[#1E1E1E] bg-[#141414] p-1.5">
                  {pillar.icon}
                </div>
                <h3 className="text-xs font-semibold text-[#EDEDED]">{pillar.title}</h3>
              </div>
              <p className="text-xs text-[#808080] leading-relaxed">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy & Anti-Surveillance Banner */}
        <div className="rounded border border-[#1E1E1E] bg-[#080808] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded border border-[#1E1E1E] bg-[#121212] p-2 text-[#00FF66]">
              <EyeOff className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#EDEDED] block">
                ZERO TRACKING & USER PRIVACY PROMISE
              </span>
              <span className="text-[11px] text-[#737373]">
                No Google Analytics. No Facebook Pixels. No tracking cookies.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#00FF66]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>ANONYMOUS_BROWSING</span>
          </div>
        </div>
      </div>
    </section>
  )
}
