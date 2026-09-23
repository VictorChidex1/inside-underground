import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Clock,
  Send,
  Package,
  CreditCard,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Headphones,
  Radio,
} from 'lucide-react'
import { LaserBorder } from '@/components/ui/LaserBorder'
import { DecryptedText } from '@/components/ui/DecryptedText'

type InquiryType = 'order' | 'payment' | 'general'

interface InquiryCategory {
  id: InquiryType
  label: string
  icon: React.ElementType
  placeholderSubject: string
}

const INQUIRY_CATEGORIES: InquiryCategory[] = [
  {
    id: 'order',
    label: 'Order & Access',
    icon: Package,
    placeholderSubject: '[Order & Access Assistance]',
  },
  {
    id: 'payment',
    label: 'Payment Help',
    icon: CreditCard,
    placeholderSubject: '[Payment Reconciliation Query]',
  },
  {
    id: 'general',
    label: 'General Inquiry',
    icon: MessageSquare,
    placeholderSubject: '[General Customer Inquiry]',
  },
]

export function ContactSection() {
  const [copied, setCopied] = React.useState(false)
  const [inquiryType, setInquiryType] = React.useState<InquiryType>('order')
  const [userEmail, setUserEmail] = React.useState('')
  const [orderId, setOrderId] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const supportEmail = 'support@insideunderground.com'

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(supportEmail)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const activeCat = INQUIRY_CATEGORIES.find((c) => c.id === inquiryType)
    const subject = `${activeCat?.placeholderSubject || '[Inside Underground Inquiry]'} ${
      orderId ? `- Order: ${orderId}` : ''
    }`

    const formattedBody = [
      `--- INSIDE UNDERGROUND SUPPORT DISPATCH ---`,
      `Inquiry Type: ${activeCat?.label}`,
      userEmail ? `Customer Email: ${userEmail}` : '',
      orderId ? `Order Reference: ${orderId}` : '',
      `Message:`,
      message || '(No additional message provided)',
      `-------------------------------------------`,
    ]
      .filter(Boolean)
      .join('\n\n')

    // Automatically copy formatted draft to clipboard so the user never loses it
    try {
      await navigator.clipboard.writeText(formattedBody)
      setStatusMessage('Inquiry copied to clipboard! Opening your email client...')
    } catch {
      setStatusMessage('Opening your email client...')
    }

    // Launch mailto
    const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(formattedBody)}`

    setTimeout(() => {
      window.location.href = mailtoUrl
      setIsSubmitting(false)
      setTimeout(() => setStatusMessage(null), 5000)
    }, 400)
  }

  return (
    <section id="contact" className="relative py-16 md:py-24 border-b border-[#1E1E1E] bg-[#030303] overflow-hidden">
      {/* Background Ambience & Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E1E1E 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-[#00FF66]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 space-y-10 font-mono">
        {/* Header Block with Telemetry Node */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-[#737373]">
              <span className="text-[#00FF66] font-bold">&gt;</span>
              <span>guest@insideunderground.com:~/support# ./contact-operator.sh</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66] text-[10px]">
                <Sparkles className="h-2.5 w-2.5" />
                24/7 CONCIERGE
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#EDEDED] tracking-tight uppercase flex items-center gap-3">
              <DecryptedText text="SUPPORT & CUSTOMER CONCIERGE" speed={30} maxIterations={8} />
            </h2>

            <p className="text-xs sm:text-sm text-[#A3A3A3] font-sans leading-relaxed max-w-2xl">
              We are here to help. Reach our dedicated team anytime for order reconciliation, instant digital access assistance, or product inquiries.
            </p>
          </div>

          {/* Holographic Quantum Signal Beacon */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-[#1E1E1E] bg-[#080808]/90 backdrop-blur-md shrink-0 shadow-lg">
            <div className="relative flex items-center justify-center h-8 w-8 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66]">
              <Radio className="h-4 w-4 text-[#00FF66]" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#00FF66] animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#00FF66]" />
            </div>
            <div className="space-y-0.5 text-[11px]">
              <div className="flex items-center gap-2 font-bold text-[#EDEDED]">
                <span>GLOBAL DESK</span>
                <span className="text-[#00FF66] text-[10px] px-1.5 py-0.2 rounded bg-[#00FF66]/15 font-mono">
                  ONLINE
                </span>
              </div>
              <p className="text-[10px] text-[#737373] font-sans">
                Avg Response: <span className="text-[#EDEDED] font-semibold">&lt; 2 Hours</span>
              </p>
            </div>
          </div>
        </div>

        {/* Dual-Deck Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Deck (7 cols): Interactive Message Dispatcher Form */}
          <div className="lg:col-span-7 rounded-2xl border border-[#1E1E1E] bg-[#080808]/95 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A1A1A]">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66]">
                  <Headphones className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#EDEDED] font-sans">
                    Send a Direct Inquiry
                  </h3>
                  <p className="text-[11px] text-[#737373] font-sans">
                    Pick your topic below for expedited concierge dispatch.
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-[#525252] hidden sm:inline">
                TRANSMISSION GATEWAY
              </span>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5 font-sans">
              {/* Category Selector Pills */}
              <div className="space-y-2">
                <label className="text-xs font-bold font-mono text-[#737373] uppercase tracking-wider block">
                  Select Inquiry Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {INQUIRY_CATEGORIES.map((cat) => {
                    const isSelected = inquiryType === cat.id
                    const Icon = cat.icon
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setInquiryType(cat.id)}
                        className={`p-2.5 sm:p-3 rounded-xl border text-xs font-medium transition-all duration-200 flex flex-col sm:flex-row items-center justify-center gap-2 text-center ${
                          isSelected
                            ? 'border-[#00FF66] bg-[#00FF66]/10 text-[#00FF66] shadow-[0_0_15px_rgba(0,255,102,0.15)] font-bold'
                            : 'border-[#1E1E1E] bg-[#0D0D0D] text-[#888888] hover:text-[#EDEDED] hover:border-[#2E2E2E]'
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${isSelected ? 'text-[#00FF66]' : 'text-[#737373]'}`} />
                        <span className="text-[11px] sm:text-xs truncate">{cat.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Email & Order ID Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono text-[#737373] uppercase tracking-wider block">
                    Your Email Address <span className="text-[#00FF66]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="w-full px-3.5 py-2.5 text-xs font-sans bg-[#0D0D0D] border border-[#1E1E1E] rounded-xl text-[#EDEDED] placeholder-[#555555] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold font-mono text-[#737373] uppercase tracking-wider block">
                    Order ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. ord_8f92a1 or invoice link"
                    className="w-full px-3.5 py-2.5 text-xs font-sans bg-[#0D0D0D] border border-[#1E1E1E] rounded-xl text-[#EDEDED] placeholder-[#555555] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all"
                  />
                </div>
              </div>

              {/* Message Box */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold font-mono text-[#737373] uppercase tracking-wider block">
                  How Can We Assist You? <span className="text-[#00FF66]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry, order question, or request here..."
                  className="w-full px-3.5 py-2.5 text-xs font-sans bg-[#0D0D0D] border border-[#1E1E1E] rounded-xl text-[#EDEDED] placeholder-[#555555] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Feedback Alert */}
              <AnimatePresence>
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="p-3 rounded-xl border border-[#00FF66]/30 bg-[#00FF66]/10 text-xs text-[#00FF66] flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#00FF66] hover:bg-[#00E55C] text-black font-mono font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,255,102,0.25)] hover:shadow-[0_0_35px_rgba(0,255,102,0.4)] disabled:opacity-50 group cursor-pointer"
              >
                <span>{isSubmitting ? 'PREPARING TRANSMISSION...' : 'TRANSMIT INQUIRY DIRECTLY'}</span>
                <Send className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] text-[#737373] text-center font-sans">
                Automatically formats your inquiry and launches your email client with zero missed details.
              </p>
            </form>
          </div>

          {/* Right Deck (5 cols): Direct Channels & Concierge Guarantees */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 1: Official Support Address (Framed in LaserBorder) */}
            <LaserBorder
              speed="10s"
              laserColor="#00FF66"
              secondaryColor="rgba(0, 153, 255, 0.4)"
              glowIntensity="vibrant"
              className="shadow-[0_0_35px_rgba(0,255,102,0.12)]"
              innerClassName="bg-[#090909] p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#00FF66] tracking-wider uppercase font-bold px-2 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/30">
                  PRIMARY CONCIERGE DESK
                </span>
                <span className="text-[10px] font-mono text-[#737373]">
                  DIRECT EMAIL
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs text-[#737373] font-sans">
                  Need to write to us directly from your preferred email app?
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#222222] bg-[#050505] p-3.5">
                  <div className="flex items-center gap-2.5 truncate">
                    <Mail className="h-4 w-4 text-[#00FF66] shrink-0" />
                    <span className="text-xs sm:text-sm font-mono font-bold text-white select-all truncate">
                      {supportEmail}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg border border-[#222222] bg-[#111111] hover:bg-[#1A1A1A] text-[#737373] hover:text-[#00FF66] hover:border-[#00FF66]/40 transition-all shrink-0 cursor-pointer"
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

              <div className="pt-1">
                <a
                  href={`mailto:${supportEmail}?subject=[Inside%20Underground%20Inquiry]`}
                  className="w-full py-2.5 px-4 rounded-lg border border-[#00FF66]/40 bg-[#00FF66]/10 hover:bg-[#00FF66] text-[#00FF66] hover:text-black font-mono text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>LAUNCH DEFAULT EMAIL</span>
                  <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </LaserBorder>

            {/* Card 2: Rapid Response Guarantee */}
            <div className="rounded-xl border border-[#1E1E1E] bg-[#080808]/90 p-5 space-y-2.5 hover:border-[#2E2E2E] transition-all">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-[#0099FF]/10 border border-[#0099FF]/30 flex items-center justify-center text-[#0099FF]">
                  <Clock className="h-4 w-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#EDEDED] font-sans">
                  Rapid Response Guarantee
                </h4>
              </div>
              <p className="text-xs text-[#A3A3A3] font-sans leading-relaxed">
                Automated purchases and digital files deliver immediately 24/7. For customer inquiries and order assistance, our dedicated human support team responds to every email within <span className="text-[#EDEDED] font-semibold">2 to 4 hours</span>.
              </p>
            </div>

            {/* Card 3: 100% Zero-Risk Security Covenant */}
            <div className="rounded-xl border border-[#1E1E1E] bg-[#080808]/90 p-5 space-y-2.5 hover:border-[#2E2E2E] transition-all">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-center text-[#00FF66]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#EDEDED] font-sans">
                  Safe & Effortless Order Recovery
                </h4>
              </div>
              <p className="text-xs text-[#A3A3A3] font-sans leading-relaxed">
                If you ever need an order confirmed or re-sent, simply share your registered email or Order ID. <span className="text-[#00FF66] font-semibold">We will never ask for your passwords, private keys, or seed phrases.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
