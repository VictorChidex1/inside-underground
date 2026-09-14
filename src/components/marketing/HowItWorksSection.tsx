import { Search, CreditCard, ShieldCheck, Download, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const STEPS = [
  {
    step: '01',
    title: 'SELECT',
    subtitle: 'Browse Catalog',
    description:
      'Choose verified technical assets. Authoritative product pricing is fetched strictly server-side from Firestore—never trusted from the browser.',
    icon: <Search className="h-4 w-4 text-[#00FF66]" />,
    command: '$ select_product --id=PRD-01',
    status: 'PRICING_AUTHORITATIVE',
  },
  {
    step: '02',
    title: 'PAY',
    subtitle: 'NOWPayments Invoice',
    description:
      'Cloud Function generates a single-use hosted checkout invoice. Settle securely in your chosen cryptocurrency (USDT, BTC, ETH, SOL) with real-time rate locking.',
    icon: <CreditCard className="h-4 w-4 text-[#FFB800]" />,
    command: '$ checkout --gateway=nowpayments',
    status: 'SECURE_HOSTED_INVOICE',
  },
  {
    step: '03',
    title: 'VERIFY',
    subtitle: 'Autonomous IPN & Audit',
    description:
      'Cloud Function validates the HMAC-SHA512 IPN signature (x-nowpayments-sig), queries NOWPayments API independently, and executes an atomic Firestore transaction.',
    icon: <ShieldCheck className="h-4 w-4 text-[#0099FF]" />,
    command: '$ verify_ipn --sig=sha512',
    status: 'ATOMIC_TRANSACTION',
  },
  {
    step: '04',
    title: 'ACCESS',
    subtitle: 'Entitlement Granted',
    description:
      'Your digital entitlement is minted, account activated, and product downloads unlocked immediately. Non-blocking: you can safely close your browser during payment.',
    icon: <Download className="h-4 w-4 text-[#C084FC]" />,
    command: '$ entitlement --mint --unlock',
    status: 'ACCESS_UNLOCKED',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 md:py-16 border-b border-[#1E1E1E]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8 font-mono">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <span className="text-[#00FF66] font-bold">&gt;</span>
            <span>guest@insideunderground.com:~/protocol# cat ./payment-lifecycle.md</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#EDEDED] tracking-tight">
            HOW IT WORKS: 4-STEP VERIFICATION PIPELINE
          </h2>
          <p className="text-xs text-[#808080]">
            Autonomous, serverless crypto payment settlement powered by Firebase Cloud Functions and NOWPayments.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((item, index) => (
            <Card
              key={item.step}
              className="relative flex flex-col justify-between border-[#1E1E1E] bg-[#0A0A0A] hover:border-[#2E2E2E]"
            >
              <CardHeader className="p-4 border-b border-[#1E1E1E]/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#00FF66]">
                    {item.step} // {item.title}
                  </span>
                  <div className="rounded border border-[#1E1E1E] bg-[#141414] p-1.5">
                    {item.icon}
                  </div>
                </div>
                <CardTitle className="text-sm font-semibold text-[#EDEDED]">
                  {item.subtitle}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 space-y-3">
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  {item.description}
                </p>

                <div className="rounded border border-[#1E1E1E] bg-[#050505] px-2.5 py-1.5 text-[10px] text-[#737373]">
                  <code>{item.command}</code>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] text-[#525252]">
                  <span>STATE:</span>
                  <span className="text-[#00FF66] font-semibold">{item.status}</span>
                </div>
              </CardContent>

              {/* Connecting arrow for desktop view */}
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-[#2E2E2E]">
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Offline / Non-blocking Guarantee Banner */}
        <div className="rounded border border-[#1E1E1E] bg-[#080808] p-4 text-xs space-y-2">
          <div className="flex items-center gap-2 text-[#FFB800] font-semibold">
            <span>[!] BROWSER RESILIENCE ARCHITECTURE</span>
          </div>
          <p className="text-[#808080] text-xs leading-relaxed">
            The browser redirect to NOWPayments is an interface mechanism only. It is not the authority for payment completion.
            If your connection drops, device battery dies, or browser tab closes, our Firebase Cloud Functions continue processing the payment webhook autonomously.
            Your entitlements will be activated upon your next visit.
          </p>
        </div>
      </div>
    </section>
  )
}
