import * as React from 'react'
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react'

interface FaqItem {
  id: string
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-01',
    question: 'Which cryptocurrencies are supported for checkout?',
    answer:
      'We process payments through NOWPayments, supporting USDT (TRC-20, ERC-20, Solana), Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and Litecoin (LTC). You choose your preferred settlement asset on the hosted checkout page.',
  },
  {
    id: 'faq-02',
    question: 'How fast is digital product access granted?',
    answer:
      'Access is unlocked immediately once NOWPayments marks the payment as finished and our Firebase Cloud Functions independently verify the transaction and validate the HMAC-SHA512 webhook signature. On high-throughput networks (e.g. USDT-TRC20 or Solana), confirmation usually takes 1 to 3 minutes.',
  },
  {
    id: 'faq-03',
    question: 'Can I safely close my browser or turn off my device during checkout?',
    answer:
      'Yes. Payment verification is completely serverless and autonomous. It runs independently in Cloud Functions and does not require your browser tab to stay open. When you log back into insideunderground.com, your account and entitlements will be updated.',
  },
  {
    id: 'faq-04',
    question: 'What is the account activation lifecycle?',
    answer:
      'When you register, your account is initially created with status "pending_payment". Once your cryptocurrency payment is verified and finalized via an atomic Firestore transaction, the backend updates your account status to "active". The frontend is never permitted to set account status directly.',
  },
  {
    id: 'faq-05',
    question: 'What happens if a network fee causes an underpayment?',
    answer:
      'NOWPayments detects partial payments and reports them to our backend, which maps them internally to "partially_paid". If this occurs, access is safely held until resolution. Simply reach out to support@insideunderground.com with your Order ID for prompt reconciliation.',
  },
  {
    id: 'faq-06',
    question: 'Do you track my browsing activity or personal information?',
    answer:
      'No. We adhere to a strict zero-tracking policy. We do not load Google Tag Manager, Meta Pixels, or third-party behavioral trackers. Only your email and cryptographically verified transaction records are maintained in Firestore to deliver your purchases.',
  },
]

export function FaqSection() {
  const [openIds, setOpenIds] = React.useState<Record<string, boolean>>({
    'faq-01': true,
    'faq-02': false,
  })

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <section id="faq" className="py-12 md:py-16 border-b border-[#1E1E1E]">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8 font-mono">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <span className="text-[#00FF66] font-bold">&gt;</span>
            <span>guest@insideunderground.com:~/faq# ./show-questions.sh</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#EDEDED] tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-xs text-[#808080]">
            Everything you need to know about payments, access delivery, and privacy guarantees.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = Boolean(openIds[item.id])

            return (
              <div
                key={item.id}
                className="rounded border border-[#1E1E1E] bg-[#0A0A0A] overflow-hidden transition-colors hover:border-[#2E2E2E]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  className="w-full flex items-center justify-between p-4 text-left font-mono text-xs font-semibold text-[#EDEDED] focus:outline-none focus:bg-[#121212] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="h-4 w-4 text-[#00FF66] shrink-0" />
                    <span>{item.question}</span>
                  </div>
                  <div className="text-[#525252] ml-2 shrink-0">
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4 text-[#00FF66]" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#A3A3A3] leading-relaxed border-t border-[#1E1E1E]/50">
                    <p className="pl-6 border-l border-[#00FF66]/30">{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Need more help notice */}
        <div className="rounded border border-[#1E1E1E] bg-[#070707] p-4 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-[#737373]">
            Have an unanswered technical question regarding crypto payments?
          </span>
          <a
            href="mailto:support@insideunderground.com"
            className="text-[#00FF66] font-semibold hover:underline flex items-center gap-1"
          >
            <span>support@insideunderground.com</span>
            <span>&gt;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
