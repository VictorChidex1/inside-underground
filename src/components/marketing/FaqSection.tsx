import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  ShieldCheck,
  CheckCircle2,
  Code,
  Terminal,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { LaserBorder } from '@/components/ui/LaserBorder'
import { DecryptedText } from '@/components/ui/DecryptedText'

type FaqCategory = 'all' | 'payments' | 'access' | 'privacy'

interface FaqItem {
  id: string
  num: string
  category: 'payments' | 'access' | 'privacy'
  categoryLabel: string
  question: string
  takeaway: string
  answer: string
  highlights: string[]
  supportedAssets?: string[]
  techSpec: string
}

const FAQ_CATEGORIES: { id: FaqCategory; label: string; count: number }[] = [
  { id: 'all', label: 'ALL QUESTIONS', count: 6 },
  { id: 'payments', label: 'PAYMENTS & CRYPTO', count: 3 },
  { id: 'access', label: 'INSTANT ACCESS', count: 2 },
  { id: 'privacy', label: 'PRIVACY & TRUST', count: 1 },
]

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-01',
    num: '01',
    category: 'payments',
    categoryLabel: 'PAYMENTS & CRYPTO',
    question: 'What payment methods can I use to complete checkout?',
    takeaway: 'We accept major cryptocurrencies with instant checkout and zero credit card requirements.',
    answer:
      'We process all transactions via a secure, decentralized cryptocurrency checkout. You can pay with your favorite personal or exchange wallet using USDT (Tether on TRC-20, ERC-20, and Solana networks), Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and Litecoin (LTC). Simply select your preferred asset on the checkout screen and send the exact amount displayed.',
    highlights: [
      'Zero personal banking or credit card details required',
      'Pick between ultra-low fee networks (TRC-20, Solana, LTC) or Bitcoin/Ethereum',
      'Live exchange rate guaranteed during your checkout window',
    ],
    supportedAssets: ['USDT (TRC-20)', 'USDT (ERC-20)', 'USDT (Solana)', 'BTC', 'ETH', 'SOL', 'LTC'],
    techSpec:
      'Settlement executed via decentralized merchant gateway. Transaction routes through real-time exchange rate locking with multi-signature verification.',
  },
  {
    id: 'faq-02',
    num: '02',
    category: 'access',
    categoryLabel: 'INSTANT ACCESS',
    question: 'How quickly do I get access to my digital purchase?',
    takeaway: 'Instant automated access in 1 to 3 minutes upon blockchain network confirmation.',
    answer:
      'Access is unlocked automatically the moment the blockchain network registers your payment. Fast networks like USDT on TRC-20 or Solana confirm in as little as 60 to 180 seconds. You never have to wait hours for manual admin approvals or email vouchers—your personal dashboard updates immediately.',
    highlights: [
      'Automated 24/7 delivery with zero human delay or manual intervention',
      'High-throughput chains (TRC-20, Solana) confirm in 1 to 3 minutes',
      'Instant download links and entitlements activate immediately on your account',
    ],
    techSpec:
      'Autonomous cloud verification nodes independently validate cryptographically signed transaction payloads (HMAC-SHA512) before issuing instant entitlement tokens.',
  },
  {
    id: 'faq-03',
    num: '03',
    category: 'access',
    categoryLabel: 'INSTANT ACCESS',
    question: 'Can I safely close my browser or shut down my device while waiting?',
    takeaway: 'Yes, 100% safe. Payment verification runs entirely in the cloud.',
    answer:
      'Yes, you can safely close your browser tab, turn off your phone, or disconnect your internet. Our backend payment monitoring runs autonomously in the cloud and does not rely on your computer being open. Whenever you return and log into insideunderground.com, your digital access will already be active and ready.',
    highlights: [
      'Cloud-autonomous monitoring—no need to keep tabs or computers open',
      'Entitlements automatically bind to your registered email account',
      'Resume or check your order status from any device at any time',
    ],
    techSpec:
      'Decoupled background webhook architecture: Payment verification runs in an isolated cloud cluster independent of client WebSocket or browser session state.',
  },
  {
    id: 'faq-04',
    num: '04',
    category: 'payments',
    categoryLabel: 'PAYMENTS & CRYPTO',
    question: 'How does my account get activated after registration?',
    takeaway: 'A seamless 2-step automated flow: Register your email, then complete payment.',
    answer:
      'When you register, your account is immediately initialized in a secure state. As soon as your cryptocurrency payment is received and confirmed on the blockchain, our backend verification engine instantly upgrades your account status to "Active". Your digital downloads, files, and product updates become immediately accessible in your personal portal.',
    highlights: [
      'Instant account creation with just your email and password',
      'Direct automated transition from pending to active upon payment confirmation',
      'Zero risk of tampering—account status is secured on our private transactional ledger',
    ],
    techSpec:
      'Role-based access state machine: Account transitions from pending_payment to active via an isolated, atomic ledger transaction with strict client-side write rejection.',
  },
  {
    id: 'faq-05',
    num: '05',
    category: 'payments',
    categoryLabel: 'PAYMENTS & CRYPTO',
    question: 'What happens if an exchange network fee causes an underpayment?',
    takeaway: 'Your funds are never lost. Partial payments are safely held and reconciled.',
    answer:
      "Don't worry—your money is never lost. Some exchanges deduct a small withdrawal fee from the total sent. If this happens and slightly less crypto arrives, our system places the order in a protected \"partially paid\" state. Simply email support@insideunderground.com with your Order ID, and our dispatch team will immediately reconcile it or help you top up the missing pennies.",
    highlights: [
      'Funds are securely preserved in your order reserve ledger',
      'No automated order cancellation or loss of partial transfers',
      'Fast human support reconciliation via support@insideunderground.com',
    ],
    techSpec:
      'Multi-tiered payment threshold detector: Orders below target amount are flagged as partially_paid and held in a deterministic vault state until reconciled.',
  },
  {
    id: 'faq-06',
    num: '06',
    category: 'privacy',
    categoryLabel: 'PRIVACY & TRUST',
    question: 'Do you track my browsing activity, location, or personal information?',
    takeaway: 'Strict zero-tracking policy. No marketing pixels, no third-party telemetry.',
    answer:
      'Never. We believe in total digital sovereignty. We do not load Google Tag Manager, Meta pixels, cross-site trackers, or invasive analytics scripts. The only information we maintain is your login email and cryptographically verified transaction receipts necessary to deliver your digital purchases.',
    highlights: [
      'Zero third-party trackers, marketing cookies, or ad networks loaded',
      'No browser fingerprinting or telemetry surveillance',
      'Minimalist data footprint: Only your email and order receipts are stored',
    ],
    techSpec:
      'Zero-knowledge telemetry stance: Strict Content Security Policy (CSP) blocking external telemetry endpoints. Database stores only necessary cryptographic order hashes.',
  },
]

export function FaqSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<FaqCategory>('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [activeId, setActiveId] = React.useState<string | null>('faq-01')
  const [showTechSpec, setShowTechSpec] = React.useState<Record<string, boolean>>({})

  const toggleFaq = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id))
  }

  const toggleTechSpec = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setShowTechSpec((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Filter items based on active category and search query
  const filteredItems = React.useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory

      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesSearch =
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.takeaway.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        (item.supportedAssets &&
          item.supportedAssets.some((asset) => asset.toLowerCase().includes(query)))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <section id="faq" className="relative py-16 md:py-24 border-b border-[#1E1E1E] bg-[#030303] overflow-hidden">
      {/* Background Ambience & Glow Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E1E1E 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00FF66]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 space-y-10 font-mono">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-[#737373]">
              <span className="text-[#00FF66] font-bold">&gt;</span>
              <span>guest@insideunderground.com:~/faq# ./show-questions.sh</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66] text-[10px]">
                <Sparkles className="h-2.5 w-2.5" />
                PLAIN ENGLISH GUIDE
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#EDEDED] tracking-tight uppercase flex items-center gap-3">
              <DecryptedText text="FREQUENTLY ASKED QUESTIONS" speed={30} maxIterations={8} />
            </h2>

            <p className="text-xs sm:text-sm text-[#A3A3A3] font-sans leading-relaxed max-w-2xl">
              Everything you need to know about payments, instant digital delivery, and our zero-tracking privacy policy. No confusing developer jargon—just straightforward answers.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-2 text-xs text-[#737373] shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1E1E1E] bg-[#0A0A0A]/80 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="text-[#EDEDED] font-semibold">AUTOMATED SYSTEM</span>
              <span className="text-[#00FF66] font-bold">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Interactive Controls Bar: Category Tabs & Live Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {FAQ_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? 'text-[#000000] font-bold shadow-[0_0_20px_rgba(0,255,102,0.35)]'
                      : 'text-[#888888] hover:text-[#EDEDED] bg-[#0A0A0A] border border-[#1E1E1E] hover:border-[#2E2E2E]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="faqCategoryPill"
                      className="absolute inset-0 rounded-lg bg-[#00FF66]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-black/20 text-black font-mono'
                        : 'bg-[#181818] text-[#737373] font-mono'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full lg:w-72">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#555555]">
              <Search className="h-3.5 w-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-8 py-2 text-xs font-mono bg-[#0A0A0A] border border-[#1E1E1E] rounded-lg text-[#EDEDED] placeholder-[#555555] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-2.5 flex items-center text-[#737373] hover:text-[#EDEDED]"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="rounded-xl border border-[#1E1E1E] bg-[#070707] p-8 text-center space-y-3">
              <HelpCircle className="h-8 w-8 text-[#555555] mx-auto" />
              <p className="text-sm text-[#A3A3A3] font-sans">
                No questions matching &ldquo;<span className="text-[#00FF66] font-mono">{searchQuery}</span>&rdquo; in this category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="text-xs text-[#00FF66] hover:underline font-mono"
              >
                Reset filters & show all questions
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = activeId === item.id
              const isTechOpen = Boolean(showTechSpec[item.id])

              const cardContent = (
                <div className="w-full">
                  {/* Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(item.id)}
                    className="w-full flex items-start sm:items-center justify-between p-4 sm:p-5 text-left focus:outline-none transition-colors group"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 pr-4">
                      {/* Monospace Question ID */}
                      <span className="font-mono text-xs font-bold text-[#00FF66] shrink-0 mt-0.5 sm:mt-0 px-2 py-1 rounded bg-[#00FF66]/10 border border-[#00FF66]/20">
                        {item.num}
                      </span>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#737373]">
                            {item.categoryLabel}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-[#EDEDED] group-hover:text-white transition-colors tracking-tight font-sans">
                          {item.question}
                        </h3>
                      </div>
                    </div>

                    {/* Animated Chevron / Indicator */}
                    <div
                      className={`shrink-0 ml-2 p-2 rounded-lg border transition-all duration-300 ${
                        isOpen
                          ? 'border-[#00FF66] bg-[#00FF66]/10 text-[#00FF66] rotate-180'
                          : 'border-[#1E1E1E] bg-[#0D0D0D] text-[#737373] group-hover:border-[#2E2E2E] group-hover:text-[#EDEDED]'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {/* Expandable Answer Drawer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-[#1E1E1E]/70 space-y-4">
                          {/* Quick Takeaway Banner */}
                          <div className="flex items-start sm:items-center gap-2.5 p-3 rounded-lg border border-[#00FF66]/30 bg-[#00FF66]/5 text-xs text-[#EDEDED] font-sans font-medium">
                            <span className="text-[#00FF66] font-mono font-bold shrink-0 text-[11px] px-1.5 py-0.5 rounded bg-[#00FF66]/15">
                              KEY TAKEAWAY
                            </span>
                            <span>{item.takeaway}</span>
                          </div>

                          {/* Plain-English Detailed Answer */}
                          <p className="text-xs sm:text-sm text-[#D4D4D4] font-sans leading-relaxed">
                            {item.answer}
                          </p>

                          {/* Bullet Highlights */}
                          {item.highlights && item.highlights.length > 0 && (
                            <div className="space-y-2 pt-1">
                              {item.highlights.map((highlight, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs font-sans text-[#A3A3A3]">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00FF66] shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Supported Crypto Pill Grid (For Payment Question) */}
                          {item.supportedAssets && (
                            <div className="pt-2 space-y-1.5">
                              <span className="text-[10px] uppercase font-mono text-[#737373] tracking-wider">
                                Supported Settlement Assets:
                              </span>
                              <div className="flex flex-wrap items-center gap-1.5">
                                {item.supportedAssets.map((asset) => (
                                  <span
                                    key={asset}
                                    className="px-2 py-1 rounded bg-[#121212] border border-[#222222] text-[#00FF66] font-mono text-[11px] font-medium"
                                  >
                                    {asset}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Technical Spec Drawer Toggle */}
                          <div className="pt-3 border-t border-[#181818] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={(e) => toggleTechSpec(item.id, e)}
                              className="text-[11px] font-mono text-[#737373] hover:text-[#00FF66] flex items-center gap-1.5 transition-colors self-start"
                            >
                              <Code className="h-3 w-3" />
                              <span>{isTechOpen ? '[- Hide Technical Spec]' : '[+ View Cryptographic Spec]'}</span>
                            </button>

                            <span className="text-[10px] font-mono text-[#525252]">
                              STATUS: VERIFIED SECURE
                            </span>
                          </div>

                          {/* Expanded Tech Spec Box */}
                          {isTechOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="p-3 rounded-lg border border-[#1E1E1E] bg-[#050505] font-mono text-[11px] text-[#888888] space-y-1.5"
                            >
                              <div className="flex items-center gap-2 text-[#00FF66] text-[10px]">
                                <Terminal className="h-3 w-3" />
                                <span>SYSTEM ARCHITECTURE PROTOCOL:</span>
                              </div>
                              <p className="leading-relaxed text-[#A3A3A3] pl-2 border-l border-[#00FF66]/30">
                                {item.techSpec}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )

              // When open, wrap in LaserBorder for breathtaking rotating perimeter glow
              if (isOpen) {
                return (
                  <LaserBorder
                    key={item.id}
                    speed="10s"
                    laserColor="#00FF66"
                    secondaryColor="rgba(0, 204, 255, 0.4)"
                    glowIntensity="vibrant"
                    className="shadow-[0_0_35px_rgba(0,255,102,0.12)]"
                    innerClassName="bg-[#090909]"
                  >
                    {cardContent}
                  </LaserBorder>
                )
              }

              // When closed, render sleek high-contrast dark card
              return (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#1E1E1E] bg-[#080808]/90 hover:bg-[#0C0C0C] hover:border-[#2E2E2E] transition-all duration-300"
                >
                  {cardContent}
                </div>
              )
            })
          )}
        </div>

        {/* Need More Assistance / Direct Support Desk Banner */}
        <div className="rounded-xl border border-[#1E1E1E] bg-gradient-to-r from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A] p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-center text-[#00FF66] shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs sm:text-sm font-bold text-[#EDEDED] font-sans">
                Still have an unanswered technical question?
              </h4>
              <p className="text-[11px] sm:text-xs text-[#737373] font-sans">
                Our cryptographic support desk is on standby 24/7 for order reconciliations and inquiries.
              </p>
            </div>
          </div>

          <a
            href="mailto:support@insideunderground.com"
            className="w-full md:w-auto px-4 py-2.5 rounded-lg border border-[#00FF66]/40 bg-[#00FF66]/10 hover:bg-[#00FF66] text-[#00FF66] hover:text-black font-mono text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group shadow-[0_0_15px_rgba(0,255,102,0.15)]"
          >
            <span>support@insideunderground.com</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
