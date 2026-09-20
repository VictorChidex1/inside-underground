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
  CheckCircle2,
  Package,
  CreditCard,
  Check,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt'
import { TerminalCursor } from '@/components/terminal/TerminalCursor'

export interface HeroSectionProps {
  onBrowseClick?: () => void
  onHowItWorksClick?: () => void
  onRegisterClick?: () => void
}

interface FeaturedProductPreview {
  id: string
  code: string
  name: string
  category: string
  price: string
  crypto: string
  description: string
  features: string[]
}

const FEATURED_ITEMS: FeaturedProductPreview[] = [
  {
    id: 'prd-01',
    code: 'PRD-01',
    name: 'Zero-Trace WireGuard & VPN Infrastructure Bundle',
    category: 'SECURITY & PRIVACY',
    price: '$45 USDT',
    crypto: 'USDT • BTC • ETH • SOL',
    description: 'Production-ready private VPN deployment with automated kill-switch and zero-leak DNS.',
    features: [
      '1-Click automated server deployment scripts',
      'Hardened client configs for macOS, iOS, Android & Linux',
      'Zero-logging verified network architecture',
      'Lifetime file access & architecture updates',
    ],
  },
  {
    id: 'prd-02',
    code: 'PRD-02',
    name: 'Production Multi-Cloud Terraform Kit',
    category: 'DEVOPS & CLOUD',
    price: '$89 USDT',
    crypto: 'USDT • BTC • ETH • SOL',
    description: 'Modular Terraform templates for zero-trust AWS, GCP, and Cloudflare infrastructure.',
    features: [
      'Multi-region VPC peering & isolated subnet blueprints',
      'Automated IAM least-privilege security policies',
      'Production-tested Kubernetes (EKS/GKE) clusters',
      'Includes ready-to-run GitHub Actions CI/CD pipelines',
    ],
  },
  {
    id: 'prd-03',
    code: 'PRD-03',
    name: 'Decentralized Key Custody & Cold Backup Architecture',
    category: 'WEB3 & CRYPTO',
    price: '$59 USDT',
    crypto: 'USDT • BTC • ETH • SOL',
    description: 'Shamir secret sharing scripts and physical cold-storage recovery protocol blueprints.',
    features: [
      'Open-source 3-of-5 threshold Shamir splitting tools',
      'Air-gapped offline signing machine build manual',
      'Emergency inheritance & cryptographic contingency plan',
      'Verified zero-telemetry and offline executable scripts',
    ],
  },
]

export function HeroSection({
  onBrowseClick,
  onHowItWorksClick,
  onRegisterClick,
}: HeroSectionProps) {
  const [activeTab, setActiveTab] = React.useState<'product' | 'howToBuy' | 'trust'>('product')
  const [selectedProductIndex, setSelectedProductIndex] = React.useState<number>(0)
  const [commandEcho, setCommandEcho] = React.useState<string>('select_action')

  const activeProduct = FEATURED_ITEMS[selectedProductIndex]

  // Listen for keyboard quick actions (1/B, 2/H, 3/R)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is focused on an input element
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      if (e.key === '1' || e.key === 'b' || e.key === 'B') {
        e.preventDefault()
        setCommandEcho('select_action [1] explore_products')
        onBrowseClick?.()
      } else if (e.key === '2' || e.key === 'h' || e.key === 'H') {
        e.preventDefault()
        setCommandEcho('select_action [2] how_to_buy')
        onHowItWorksClick?.()
      } else if (e.key === '3' || e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        setCommandEcho('select_action [3] create_account')
        onRegisterClick?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBrowseClick, onHowItWorksClick, onRegisterClick])

  const handleAction = (actionName: string, actionFn?: () => void) => {
    setCommandEcho(`select_action ${actionName}`)
    actionFn?.()
  }

  return (
    <section id="hero" className="relative py-8 md:py-16 border-b border-[#1E1E1E] overflow-hidden">
      {/* Ambient background glow for visual depth */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full blur-[140px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,102,0.35) 0%, rgba(0,153,255,0.18) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="w-full px-4 sm:px-8 lg:px-12">
        {/* Main Terminal Window Frame */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-lg border border-[#262626] bg-[#070707] shadow-2xl overflow-hidden transition-colors hover:border-[#383838]"
        >
          {/* macOS Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-[#1E1E1E] bg-[#0C0C0C]/95 backdrop-blur-sm px-4 py-2.5 font-mono text-xs select-none">
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
              <span className="text-[#A3A3A3] ml-2 hidden sm:inline font-medium">
                guest@insideunderground.com:~ — Marketplace Terminal
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#A3A3A3]">
                <Activity className="h-3.5 w-3.5 text-[#00FF66]" />
                <span className="font-medium text-[#D4D4D4]">STATUS: ALL SYSTEMS OPERATIONAL</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#00FF66] bg-[#00FF66]/10 px-2.5 py-0.5 rounded border border-[#00FF66]/30">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse-subtle" />
                <span className="font-semibold tracking-wider">STORE_ONLINE</span>
              </div>
            </div>
          </div>

          {/* Terminal Window Content - Split-Pane Architecture */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* LEFT COLUMN: Human-First Mission & Clear Navigation (7 Cols) */}
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

                {/* Main Headline & Subtitle */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-[#00FF66] text-xs sm:text-sm font-mono font-bold tracking-wider uppercase bg-[#00FF66]/10 px-3 py-1 rounded border border-[#00FF66]/20">
                    <span className="h-2 w-2 rounded-full bg-[#00FF66]" />
                    <span>VERIFIED DIGITAL PRODUCTS // INSTANT CRYPTO CHECKOUT</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#FFFFFF] leading-tight font-mono">
                    INSIDE UNDERGROUND
                  </h1>

                  <p className="text-base sm:text-lg text-[#00FF66] font-mono font-semibold tracking-wide">
                    // The Private Marketplace for Premium Digital Products
                  </p>
                </div>

                {/* Value Proposition Description - High Contrast, Legible Typography */}
                <p className="text-sm sm:text-base text-[#EDEDED] leading-relaxed max-w-xl font-sans font-normal">
                  Buy verified developer tools, production security kits, and cloud infrastructure templates.
                  Pay privately with cryptocurrency—<strong className="text-[#FFFFFF] font-semibold">zero tracking cookies</strong>,
                  no personal information required, and <strong className="text-[#00FF66] font-semibold">instant file download</strong>.
                </p>

                {/* 3 Core Guarantee Badges - Clear, High-Contrast Plain English */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-2 font-mono text-xs">
                  <div className="flex items-center gap-2 p-2 rounded bg-[#121212] border border-[#262626] text-[#EDEDED]">
                    <Shield className="h-4 w-4 text-[#00FF66] shrink-0" />
                    <span className="font-semibold text-[11px]">100% PRIVATE &amp; NO COOKIES</span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded bg-[#121212] border border-[#262626] text-[#EDEDED]">
                    <Zap className="h-4 w-4 text-[#FFB800] shrink-0" />
                    <span className="font-semibold text-[11px]">INSTANT FILE DOWNLOAD</span>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded bg-[#121212] border border-[#262626] text-[#EDEDED]">
                    <Lock className="h-4 w-4 text-[#0099FF] shrink-0" />
                    <span className="font-semibold text-[11px]">PAY WITH CRYPTO (USDT/BTC)</span>
                  </div>
                </div>

                {/* Command-Style CTA Actions - Welcoming and Clear */}
                <div className="space-y-3 pt-2 font-mono">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => handleAction('[1] explore_products', onBrowseClick)}
                      className="gap-2 text-xs font-bold relative group cursor-pointer shadow-lg shadow-[#00FF66]/10 px-5 py-3"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>[1] EXPLORE PRODUCTS</span>
                      <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-black/30 text-[10px] rounded text-black font-extrabold border border-black/20">
                        B
                      </kbd>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleAction('[2] how_to_buy', onHowItWorksClick)}
                      className="gap-2 text-xs font-semibold cursor-pointer border-[#333333] hover:border-[#0099FF] hover:text-[#0099FF] text-[#EDEDED] px-5 py-3"
                    >
                      <span>[2] HOW TO BUY &amp; PAY</span>
                      <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-[#1A1A1A] text-[10px] rounded text-[#A3A3A3] border border-[#2E2E2E]">
                        H
                      </kbd>
                    </Button>

                    <Button
                      variant="command"
                      size="lg"
                      onClick={() => handleAction('[3] create_account', onRegisterClick)}
                      className="gap-2 text-xs font-semibold cursor-pointer text-[#EDEDED] hover:text-white px-5 py-3"
                    >
                      <span>[3] CREATE ACCOUNT</span>
                      <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-[#1A1A1A] text-[10px] rounded text-[#A3A3A3] border border-[#2E2E2E]">
                        R
                      </kbd>
                    </Button>
                  </div>

                  {/* Active Terminal Feedback Line */}
                  <div className="flex items-center gap-1.5 text-xs text-[#737373] pt-1">
                    <span className="text-[#00FF66] font-medium">guest@insideunderground.com:~$</span>
                    <span className="text-[#FFFFFF] font-bold">{commandEcho}</span>
                    <TerminalCursor shape="block" />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Product Showcase & How to Buy (5 Cols) */}
              <div className="lg:col-span-5 font-mono">
                <div className="rounded-lg border border-[#2A2A2A] bg-[#0B0B0B] overflow-hidden shadow-2xl">
                  {/* Tabs Header */}
                  <div className="flex items-center justify-between border-b border-[#1E1E1E] bg-[#111111] px-3 py-2 text-xs select-none">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setActiveTab('product')}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                          activeTab === 'product'
                            ? 'bg-[#1C1C1C] text-[#00FF66] border border-[#00FF66]/40'
                            : 'text-[#888888] hover:text-[#FFFFFF]'
                        }`}
                      >
                        <Package className="h-3.5 w-3.5" />
                        <span>featured-item.sh</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('howToBuy')}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                          activeTab === 'howToBuy'
                            ? 'bg-[#1C1C1C] text-[#0099FF] border border-[#0099FF]/40'
                            : 'text-[#888888] hover:text-[#FFFFFF]'
                        }`}
                      >
                        <CreditCard className="h-3.5 w-3.5" />
                        <span>how-to-buy.txt</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('trust')}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                          activeTab === 'trust'
                            ? 'bg-[#1C1C1C] text-[#FFB800] border border-[#FFB800]/40'
                            : 'text-[#888888] hover:text-[#FFFFFF]'
                        }`}
                      >
                        <Shield className="h-3.5 w-3.5" />
                        <span>why-trust-us.md</span>
                      </button>
                    </div>

                    <span className="text-[10px] text-[#00FF66] font-bold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                      PREVIEW
                    </span>
                  </div>

                  {/* Tab Body */}
                  <div className="p-4 sm:p-5 min-h-[320px] flex flex-col justify-between text-xs">
                    <AnimatePresence mode="wait">
                      {/* TAB 1: Interactive Featured Product Card */}
                      {activeTab === 'product' && (
                        <motion.div
                          key="product"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4"
                        >
                          {/* Product Selector Mini Pills */}
                          <div className="flex items-center gap-1.5 border-b border-[#1E1E1E] pb-2 text-[10px]">
                            <span className="text-[#888888] pr-1 font-semibold">SELECT ITEM:</span>
                            {FEATURED_ITEMS.map((item, idx) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedProductIndex(idx)}
                                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                                  selectedProductIndex === idx
                                    ? 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40 font-bold'
                                    : 'text-[#777777] hover:text-[#DDDDDD] bg-[#141414]'
                                }`}
                              >
                                {item.code}
                              </button>
                            ))}
                          </div>

                          {/* Selected Product Details */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] px-2 py-0.5 rounded bg-[#0099FF]/10 text-[#0099FF] border border-[#0099FF]/30 font-bold">
                                {activeProduct.category}
                              </span>
                              <div className="text-right">
                                <span className="text-lg font-bold text-[#00FF66]">
                                  {activeProduct.price}
                                </span>
                              </div>
                            </div>

                            <h3 className="text-sm sm:text-base font-bold text-[#FFFFFF] leading-snug">
                              {activeProduct.name}
                            </h3>

                            <p className="text-xs text-[#D4D4D4] font-sans leading-relaxed">
                              {activeProduct.description}
                            </p>
                          </div>

                          {/* Features Included List */}
                          <div className="space-y-1.5 pt-1 text-[11px] text-[#EDEDED]">
                            <span className="text-[10px] text-[#888888] font-semibold tracking-wider uppercase block">
                              WHAT IS INCLUDED IN THIS DOWNLOAD:
                            </span>
                            {activeProduct.features.map((feat) => (
                              <div key={feat} className="flex items-start gap-2">
                                <Check className="h-3.5 w-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                                <span className="text-[#EDEDED] font-sans text-xs">{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Action Button inside Card */}
                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={onBrowseClick}
                              className="w-full justify-between text-xs font-semibold cursor-pointer border-[#00FF66]/40 text-[#00FF66] hover:bg-[#00FF66]/10"
                            >
                              <span>[ VIEW PRODUCT DETAILS &amp; BUY ]</span>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      )}

                      {/* TAB 2: Simple 3-Step How To Buy Walkthrough */}
                      {activeTab === 'howToBuy' && (
                        <motion.div
                          key="howToBuy"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3.5"
                        >
                          <div className="text-[11px] text-[#0099FF] font-bold flex items-center gap-1.5">
                            <CreditCard className="h-3.5 w-3.5" />
                            <span>// SIMPLE 3-STEP CHECKOUT GUIDE</span>
                          </div>

                          <div className="space-y-2.5">
                            <div className="p-2.5 rounded bg-[#121212] border border-[#222222] space-y-1">
                              <div className="flex items-center gap-2 text-xs font-bold text-[#FFFFFF]">
                                <span className="h-5 w-5 rounded-full bg-[#00FF66]/20 text-[#00FF66] flex items-center justify-center text-[10px]">
                                  1
                                </span>
                                <span>Choose Your Digital Product</span>
                              </div>
                              <p className="text-xs text-[#D4D4D4] font-sans pl-7 leading-relaxed">
                                Select from our verified collection of developer templates, security kits, or cloud architectures.
                              </p>
                            </div>

                            <div className="p-2.5 rounded bg-[#121212] border border-[#222222] space-y-1">
                              <div className="flex items-center gap-2 text-xs font-bold text-[#FFFFFF]">
                                <span className="h-5 w-5 rounded-full bg-[#0099FF]/20 text-[#0099FF] flex items-center justify-center text-[10px]">
                                  2
                                </span>
                                <span>Pay Privately with Crypto</span>
                              </div>
                              <p className="text-xs text-[#D4D4D4] font-sans pl-7 leading-relaxed">
                                Settle instantly using USDT, Bitcoin, Ethereum, or Solana. No credit card, no identity verification required.
                              </p>
                            </div>

                            <div className="p-2.5 rounded bg-[#121212] border border-[#222222] space-y-1">
                              <div className="flex items-center gap-2 text-xs font-bold text-[#FFFFFF]">
                                <span className="h-5 w-5 rounded-full bg-[#FFB800]/20 text-[#FFB800] flex items-center justify-center text-[10px]">
                                  3
                                </span>
                                <span>Immediate Download Access</span>
                              </div>
                              <p className="text-xs text-[#D4D4D4] font-sans pl-7 leading-relaxed">
                                Your files unlock instantly the moment your transaction is confirmed. Close your tab anytime—your order is securely recorded.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* TAB 3: Why Trust Us (Plain English Guarantees) */}
                      {activeTab === 'trust' && (
                        <motion.div
                          key="trust"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3.5"
                        >
                          <div className="text-[11px] text-[#FFB800] font-bold flex items-center gap-1.5">
                            <Shield className="h-3.5 w-3.5" />
                            <span>// OUR CUSTOMER TRUST GUARANTEES</span>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="p-3 rounded bg-[#121212] border border-[#222222] flex items-start gap-2.5">
                              <CheckCircle2 className="h-4 w-4 text-[#00FF66] shrink-0 mt-0.5" />
                              <div className="space-y-0.5">
                                <span className="font-bold text-[#FFFFFF] block">Zero Tracking or Analytics</span>
                                <span className="text-xs text-[#D4D4D4] font-sans block leading-relaxed">
                                  We do not use tracking cookies, Facebook pixels, or Google Analytics. Your browsing and purchases are completely private.
                                </span>
                              </div>
                            </div>

                            <div className="p-3 rounded bg-[#121212] border border-[#222222] flex items-start gap-2.5">
                              <CheckCircle2 className="h-4 w-4 text-[#0099FF] shrink-0 mt-0.5" />
                              <div className="space-y-0.5">
                                <span className="font-bold text-[#FFFFFF] block">Safe From Connection Drops</span>
                                <span className="text-xs text-[#D4D4D4] font-sans block leading-relaxed">
                                  If your computer turns off, battery dies, or browser closes while paying, our server validates your payment autonomously so you never lose your purchase.
                                </span>
                              </div>
                            </div>

                            <div className="p-3 rounded bg-[#121212] border border-[#222222] flex items-start gap-2.5">
                              <CheckCircle2 className="h-4 w-4 text-[#FFB800] shrink-0 mt-0.5" />
                              <div className="space-y-0.5">
                                <span className="font-bold text-[#FFFFFF] block">Verified Production Quality</span>
                                <span className="text-xs text-[#D4D4D4] font-sans block leading-relaxed">
                                  Every script, template, and guide in our store has been tested on real production servers by senior engineers.
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Stream summary footer inside card */}
                    <div className="mt-3 pt-2.5 border-t border-[#1E1E1E] flex items-center justify-between text-[11px] text-[#888888]">
                      <span>PAYMENTS: USDT • BTC • ETH • SOL</span>
                      <span className="text-[#00FF66] font-semibold">100% AUTOMATED DELIVERY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TMUX-Style Docked Status Bar - High Contrast Plain English */}
          <div className="border-t border-[#1E1E1E] bg-[#0A0A0A] px-4 sm:px-8 py-3.5 font-mono">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="group rounded border border-[#222222] bg-[#111111] p-3 hover:border-[#00FF66]/50 transition-colors">
                <div className="flex items-center gap-2 text-[#00FF66] font-bold mb-1 text-[11px]">
                  <Shield className="h-3.5 w-3.5" />
                  <span>01 // 100% PRIVATE</span>
                </div>
                <p className="text-[11px] text-[#D4D4D4] font-sans leading-tight">
                  No tracking cookies, no advertising surveillance, and no personal KYC needed.
                </p>
              </div>

              <div className="group rounded border border-[#222222] bg-[#111111] p-3 hover:border-[#0099FF]/50 transition-colors">
                <div className="flex items-center gap-2 text-[#0099FF] font-bold mb-1 text-[11px]">
                  <Zap className="h-3.5 w-3.5" />
                  <span>02 // INSTANT DELIVERY</span>
                </div>
                <p className="text-[11px] text-[#D4D4D4] font-sans leading-tight">
                  Automated digital unlock the moment your crypto transaction confirms.
                </p>
              </div>

              <div className="group rounded border border-[#222222] bg-[#111111] p-3 hover:border-[#FFB800]/50 transition-colors">
                <div className="flex items-center gap-2 text-[#FFB800] font-bold mb-1 text-[11px]">
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>03 // SAFE CRYPTO PAY</span>
                </div>
                <p className="text-[11px] text-[#D4D4D4] font-sans leading-tight">
                  Settle securely with USDT, Bitcoin, Ethereum, or Solana with full invoice security.
                </p>
              </div>

              <div className="group rounded border border-[#222222] bg-[#111111] p-3 hover:border-[#C084FC]/50 transition-colors">
                <div className="flex items-center gap-2 text-[#C084FC] font-bold mb-1 text-[11px]">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>04 // VERIFIED CLEAN CODE</span>
                </div>
                <p className="text-[11px] text-[#D4D4D4] font-sans leading-tight">
                  Production-tested configurations, documentation, and zero-leak blueprints.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
