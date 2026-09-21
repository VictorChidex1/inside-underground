import * as React from 'react'
import {
  ShoppingBag,
  ShieldCheck,
  Code2,
  Key,
  Terminal,
  ArrowRight,
  Sparkles,
  Lock,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard3D, type ProductCardData } from './ProductCard3D'

export interface FeaturedProductsSectionProps {
  onBrowseClick?: () => void
  onProductClick?: (productId: string) => void
}

const UPGRADED_PRODUCTS: ProductCardData[] = [
  {
    id: 'prd-01',
    code: 'SEC-01',
    title: 'Zero-Trace Private VPN & Secure Network Kit',
    category: 'SECURITY & PRIVACY',
    price: '45.00',
    currency: 'USDT',
    fileSize: '24.8 MB .ZIP',
    description:
      'Set up your own private, unblockable VPN in 5 minutes. Protect your devices with military-grade encryption and zero logging.',
    features: [
      '1-Click automated server deployment scripts',
      'Hardened client configs for macOS, iOS, Android & Windows',
      'Zero-logging architecture with automatic kill-switch',
    ],
    files: [
      { name: '/deploy-wireguard.sh', desc: '1-Click automated server installer' },
      { name: '/client-profiles/', desc: 'Ready-to-import configs for all devices' },
      { name: '/security-hardening.md', desc: 'DNS leak prevention & firewall guide' },
      { name: '/verification.sha256', desc: 'Cryptographic package checksum' },
    ],
    platforms: ['macOS', 'iOS', 'Android', 'Linux', 'Windows'],
    icon: <ShieldCheck className="h-5 w-5" />,
    status: 'active',
  },
  {
    id: 'prd-02',
    code: 'OPS-02',
    title: 'Complete Cloud Infrastructure Blueprint',
    category: 'DEVOPS & CLOUD',
    price: '89.00',
    currency: 'USDT',
    fileSize: '48.2 MB .ZIP',
    description:
      'Deploy production-grade, secure cloud servers and databases with zero guesswork. Pre-configured with automated firewalls and CI/CD.',
    features: [
      'Modular Terraform templates for AWS, GCP & Cloudflare',
      'Automated VPC peering & isolated private subnets',
      'Pre-built GitHub Actions CI/CD deployment pipelines',
    ],
    files: [
      { name: '/terraform/modules/', desc: 'VPC, isolated subnets, IAM, K8s' },
      { name: '/ci-cd/deploy-pipeline.yml', desc: 'Zero-touch deployment automation' },
      { name: '/architecture-diagram.pdf', desc: 'Visual cloud topology map' },
      { name: '/security-baseline.tf', desc: 'Automated firewall & zero-trust rules' },
    ],
    platforms: ['AWS', 'GCP', 'Cloudflare', 'Terraform CLI'],
    icon: <Code2 className="h-5 w-5 text-[#0099FF]" />,
    status: 'active',
  },
  {
    id: 'prd-03',
    code: 'CRY-03',
    title: 'Crypto Cold Storage & Vault Security Protocol',
    category: 'WEB3 & CRYPTO',
    price: '59.00',
    currency: 'USDT',
    fileSize: '18.5 MB .ZIP',
    description:
      'Protect your cryptocurrency private keys and sensitive seed backups from hackers and hardware failure using multi-key vault protocols.',
    features: [
      'Open-source 3-of-5 threshold Shamir secret sharing tools',
      'Air-gapped offline signing machine manual',
      'Emergency inheritance & disaster recovery contingency plan',
    ],
    files: [
      { name: '/shamir-split.py', desc: 'Offline air-gapped key splitter script' },
      { name: '/vault-recovery-protocol.md', desc: 'Step-by-step restoration manual' },
      { name: '/cold-storage-setup.pdf', desc: 'Hardware isolation instructions' },
      { name: '/emergency-contingency.txt', desc: 'Dual-custody executor template' },
    ],
    platforms: ['Python 3', 'Linux', 'macOS', 'Offline Pen-Drive'],
    icon: <Key className="h-5 w-5 text-[#C084FC]" />,
    status: 'active',
  },
  {
    id: 'prd-04',
    code: 'AUD-04',
    title: 'API Security & Vulnerability Scanner Suite',
    category: 'SECURITY AUDITING',
    price: '49.00',
    currency: 'USDT',
    fileSize: '31.4 MB .ZIP',
    description:
      'Automated security scanner to identify API vulnerabilities, unauthorized data leaks, webhook forgery, and authentication flaws.',
    features: [
      'Automated API attack-surface vulnerability scanner',
      '40-Point production security & hardening checklist',
      'Webhook signature replay & forgery detection scripts',
    ],
    files: [
      { name: '/scanner/api-audit-runner.sh', desc: 'Automated CLI vulnerability scanner' },
      { name: '/checklists/40-point-audit.pdf', desc: 'Production security checklist' },
      { name: '/signatures/hmac-suite.js', desc: 'Webhook signature validation tests' },
      { name: '/remediation-guide.md', desc: 'Instant vulnerability fix handbook' },
    ],
    platforms: ['Node.js', 'Bash', 'Docker', 'Curl'],
    icon: <Terminal className="h-5 w-5 text-[#FFB800]" />,
    status: 'active',
  },
]

export function FeaturedProductsSection({
  onBrowseClick,
  onProductClick,
}: FeaturedProductsSectionProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const [spotlightPos, setSpotlightPos] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  // Track global mouse position across the entire grid for the dynamic spotlight border effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section
      id="featured"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-14 md:py-20 border-b border-[#1E1E1E] overflow-hidden"
    >
      {/* Dynamic Global Spotlight Illumination across all cards */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(700px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0, 255, 102, 0.07), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 space-y-8">
        {/* Section Header with High-Contrast Typography & Plain English */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00FF66] font-semibold bg-[#00FF66]/10 px-3 py-1 rounded border border-[#00FF66]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66]" />
              <span>// BROWSE REPOSITORY: 4 PRODUCTION ASSETS ONLINE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono text-[#FFFFFF] tracking-tight">
              FEATURED DIGITAL ASSETS
            </h2>

            <p className="text-sm sm:text-base text-[#D4D4D4] font-sans leading-relaxed">
              Production-ready developer blueprints, security kits, and cloud infrastructure.
              Available for <strong className="text-[#FFFFFF]">instant, anonymous cryptocurrency checkout</strong> with zero tracking.
            </p>
          </div>

          <Button
            variant="outline"
            size="default"
            onClick={onBrowseClick}
            className="self-start md:self-end text-xs font-mono font-bold cursor-pointer border-[#333333] text-[#EDEDED] hover:border-[#00FF66] hover:text-[#00FF66] gap-2 px-4 py-2.5 shadow-md"
          >
            <ShoppingBag className="h-4 w-4 text-[#00FF66]" />
            <span>VIEW COMPLETE REPOSITORY</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* 3D Magnetic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {UPGRADED_PRODUCTS.map((product) => (
            <ProductCard3D
              key={product.id}
              product={product}
              onInspect={onProductClick ?? onBrowseClick}
            />
          ))}
        </div>

        {/* Bottom Trust & Authenticity Ticker */}
        <div className="pt-4 border-t border-[#1A1A1A] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#888888]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#00FF66]" />
            <span>ALL ASSETS DIGITALLY SIGNED &amp; MALWARE-TESTED</span>
          </div>

          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5 text-[#0099FF]" />
            <span>AUTONOMOUS CRYPTO CHECKOUT: USDT • BTC • ETH • SOL</span>
          </div>

          <div className="flex items-center gap-2 text-[#00FF66]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>INSTANT FILE DOWNLOAD</span>
          </div>
        </div>
      </div>
    </section>
  )
}
