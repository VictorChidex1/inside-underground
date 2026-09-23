import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  Zap,
  Mail,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react'
import { DecryptedText } from '@/components/ui/DecryptedText'

export interface FooterProps {
  onNavigate?: (path: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = React.useState('')
  const [subscribed, setSubscribed] = React.useState(false)

  const handleNav = (target: string) => {
    if (target.startsWith('#')) {
      const element = document.getElementById(target.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (onNavigate) {
      onNavigate(target)
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.includes('@')) return
    setSubscribed(true)
    setTimeout(() => {
      setNewsletterEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }, 600)
  }

  return (
    <footer className="relative bg-[#040404] border-t border-[#1A1A1A] overflow-hidden text-sm font-sans">
      {/* 1. The Quantum Horizon Traveling Laser Divider */}
      <div className="absolute top-0 inset-x-0 h-[2px] overflow-hidden pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF66]/20 to-transparent" />
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#00FF66] to-transparent shadow-[0_0_20px_#00FF66]"
        />
      </div>

      {/* 2. Ambient Aurora & Stardust Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E1E1E 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-t from-[#00FF66]/8 via-transparent to-transparent rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 pt-16 pb-12 space-y-12">
        {/* Main 4-Column Navigation Citadel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand Identity & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded border border-[#1E1E1E] bg-[#050505] overflow-hidden p-1 shadow-[0_0_15px_rgba(0,255,102,0.2)]">
                <img
                  src="/assets/inside-underground-logo.png"
                  alt="Inside Underground Logo"
                  className="h-full w-full object-contain rounded-sm"
                />
              </div>
              <div className="space-y-0.5">
                <span className="font-mono text-sm font-bold text-white tracking-wider block">
                  <DecryptedText text="INSIDE_UNDERGROUND" speed={30} maxIterations={6} />
                </span>
                <span className="font-mono text-[10px] text-[#737373] tracking-widest uppercase block">
                  DECENTRALIZED DIGITAL ASSETS
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed max-w-sm">
              The premier private marketplace for elite digital tools, automation scripts, and verified intelligence. 100% private, instant cryptocurrency settlement, and perpetual lifetime ownership.
            </p>

            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-[#1E1E1E] bg-[#0A0A0A]/90 font-mono text-[11px] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF66] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF66]" />
              </span>
              <span className="text-[#EDEDED] font-semibold">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Column 2: Marketplace Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
              <span className="text-[#00FF66]">&gt;</span> MARKETPLACE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8E8E8E]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('/browse')}
                  className="hover:text-[#00FF66] hover:translate-x-1 transition-all flex items-center gap-1.5 text-left"
                >
                  <span>All Products</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('#featured')}
                  className="hover:text-[#00FF66] hover:translate-x-1 transition-all flex items-center gap-1.5 text-left"
                >
                  <span>Featured Releases</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('#how-it-works')}
                  className="hover:text-[#00FF66] hover:translate-x-1 transition-all flex items-center gap-1.5 text-left"
                >
                  <span>How It Works</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('#security')}
                  className="hover:text-[#00FF66] hover:translate-x-1 transition-all flex items-center gap-1.5 text-left"
                >
                  <span>Security & Trust</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('#about')}
                  className="hover:text-[#00FF66] hover:translate-x-1 transition-all flex items-center gap-1.5 text-left"
                >
                  <span>About Inside Underground</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Support (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
              <span className="text-[#00FF66]">&gt;</span> CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8E8E8E]">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('#faq')}
                  className="hover:text-[#00FF66] hover:translate-x-1 transition-all flex items-center gap-1.5 text-left"
                >
                  <span>Frequently Asked Questions</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('#contact')}
                  className="hover:text-[#00FF66] hover:translate-x-1 transition-all flex items-center gap-1.5 text-left"
                >
                  <span>24/7 Concierge Desk</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('#contact')}
                  className="hover:text-[#00FF66] hover:translate-x-1 transition-all flex items-center gap-1.5 text-left"
                >
                  <span>Order Recovery Assistance</span>
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@insideunderground.com"
                  className="hover:text-[#00FF66] hover:translate-x-1 transition-all flex items-center gap-1.5 text-left font-mono text-[11px] text-[#A3A3A3]"
                >
                  <Mail className="h-3 w-3 text-[#00FF66]" />
                  <span>support@insideunderground.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Alpha Dispatch Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="space-y-1">
              <h4 className="font-mono text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-[#00FF66]" />
                <span>ALPHA DISPATCH</span>
              </h4>
              <p className="text-xs text-[#737373] leading-relaxed">
                Receive confidential catalog updates and private product drops. Zero marketing spam.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full pl-3 pr-9 py-2.5 text-xs bg-[#0A0A0A] border border-[#222222] rounded-xl text-[#EDEDED] placeholder-[#555555] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all font-sans"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to Alpha Dispatch"
                  className="absolute inset-y-1 right-1 px-2.5 rounded-lg bg-[#00FF66] hover:bg-[#00E55C] text-black transition-all flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(0,255,102,0.3)]"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="p-2 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 text-[11px] text-[#00FF66] flex items-center gap-1.5 font-mono"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>✓ SUBSCRIBED TO ENCRYPTED DISPATCH</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* 3. Bottom Legal & Telemetry Bar */}
        <div className="pt-8 border-t border-[#181818] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666666]">
          {/* Copyright */}
          <div>
            <span>&copy; {new Date().getFullYear()} Inside Underground. All rights reserved.</span>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-[#888888]">
              <Lock className="h-3 w-3 text-[#00FF66]" />
              <span>256-BIT TLS ENCRYPTED</span>
            </span>
            <span className="text-[#333333]">•</span>
            <span className="flex items-center gap-1.5 text-[#888888]">
              <ShieldCheck className="h-3 w-3 text-[#00FF66]" />
              <span>ZERO DATA RETENTION</span>
            </span>
            <span className="text-[#333333]">•</span>
            <span className="flex items-center gap-1.5 text-[#00FF66]">
              <Zap className="h-3 w-3" />
              <span>INSTANT CLOUD SETTLEMENT</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
