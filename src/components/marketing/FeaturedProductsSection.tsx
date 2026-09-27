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
import { PRODUCTS } from '@/data/products'

export interface FeaturedProductsSectionProps {
  onBrowseClick?: () => void
  onProductClick?: (productId: string) => void
}

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  'SEC-01': <ShieldCheck className="h-5 w-5" />,
  'OPS-02': <Code2 className="h-5 w-5 text-[#0099FF]" />,
  'CRY-03': <Key className="h-5 w-5 text-[#C084FC]" />,
  'AUD-04': <Terminal className="h-5 w-5 text-[#FFB800]" />,
}

const UPGRADED_PRODUCTS: ProductCardData[] = PRODUCTS.map((product) => ({
  id: product.id,
  code: product.code ?? product.id,
  title: product.name,
  category: product.category,
  price: product.price.toFixed(2),
  currency: product.currency,
  fileSize: product.fileSize ?? 'DIGITAL',
  description: product.description,
  features: product.features ?? [],
  files: product.files ?? [],
  platforms: product.platforms ?? [],
  icon: PRODUCT_ICONS[product.code ?? product.id] ?? <Terminal className="h-5 w-5" />,
  status: product.status,
}))

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
