import * as React from 'react'
import { Mail, Copy, Check, ExternalLink, ShieldCheck, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TerminalPanel } from '@/components/terminal/TerminalPanel'
import { Badge } from '@/components/ui/badge'

export function ContactSection() {
  const [copied, setCopied] = React.useState(false)
  const supportEmail = 'support@insideunderground.com'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(supportEmail)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback if clipboard fails
    }
  }

  return (
    <section id="contact" className="py-12 md:py-16 border-b border-[#1E1E1E]">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-8 font-mono">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#737373]">
            <span className="text-[#00FF66] font-bold">&gt;</span>
            <span>guest@insideunderground.com:~/support# ./contact-operator.sh</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#EDEDED] tracking-tight">
            SUPPORT & OPERATOR DESK
          </h2>
          <p className="text-xs text-[#808080]">
            Direct communication line for order reconciliation, product queries, and cryptographic verification assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main Contact Card */}
          <TerminalPanel
            title="OFFICIAL_SUPPORT_DISPATCH"
            badge={<Badge variant="default">ONLINE</Badge>}
            className="space-y-4"
          >
            <div className="space-y-2">
              <span className="text-[10px] text-[#737373] uppercase tracking-wider block">
                PRIMARY SUPPORT ADDRESS
              </span>
              <div className="flex items-center justify-between gap-3 rounded border border-[#1E1E1E] bg-[#070707] p-3">
                <div className="flex items-center gap-2.5 truncate">
                  <Mail className="h-4 w-4 text-[#00FF66] shrink-0" />
                  <span className="text-xs font-semibold text-[#EDEDED] select-text truncate">
                    {supportEmail}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="rounded p-1 text-[#737373] hover:text-[#00FF66] transition-colors focus:outline-none"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-[#00FF66]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="default"
                size="sm"
                className="w-full gap-2"
                onClick={() => {
                  window.location.href = `mailto:${supportEmail}?subject=[Inside%20Underground%20Inquiry]`
                }}
              >
                <span>OPEN EMAIL CLIENT</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </div>
          </TerminalPanel>

          {/* SLA & Telemetry Details */}
          <div className="space-y-3">
            <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#EDEDED]">
                <Clock className="h-3.5 w-3.5 text-[#0099FF]" />
                <span>SUPPORT SLA & AVAILABILITY</span>
              </div>
              <p className="text-xs text-[#808080] leading-relaxed">
                Automated payment and blockchain verification run continuously 24/7.
                Human operator responses to email inquiries typically occur within 2 to 4 hours.
              </p>
            </div>

            <div className="rounded border border-[#1E1E1E] bg-[#0A0A0A] p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#EDEDED]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#00FF66]" />
                <span>PAYMENT RECONCILIATION PROTOCOL</span>
              </div>
              <p className="text-xs text-[#808080] leading-relaxed">
                When contacting support regarding an order, please include your Order ID or the NOWPayments invoice link.
                Never send private keys or seed phrases—our team will never request them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
