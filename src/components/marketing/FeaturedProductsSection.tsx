import { ArrowRight, ShoppingBag, ShieldCheck, Download, Code2, Key, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TerminalPanel } from '@/components/terminal/TerminalPanel'
import { TerminalStatus } from '@/components/terminal/TerminalStatus'

export interface FeaturedProduct {
  id: string
  code: string
  title: string
  category: string
  price: string
  currency: string
  deliveryType: string
  description: string
  icon: React.ReactNode
  status: string
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 'prd-01',
    code: 'SEC-01',
    title: 'Zero-Trace WireGuard & VPN Infrastructure',
    category: 'Security',
    price: '45.00',
    currency: 'USDT',
    deliveryType: 'Instant Config + Script',
    description: 'Production-hardened WireGuard VPN configuration with automated rotation and zero-logging architecture.',
    icon: <ShieldCheck className="h-4 w-4 text-[#00FF66]" />,
    status: 'active',
  },
  {
    id: 'prd-02',
    code: 'OPS-02',
    title: 'Production Multi-Cloud Terraform Kit',
    category: 'DevOps',
    price: '89.00',
    currency: 'USDT',
    deliveryType: 'Terraform Modules',
    description: 'Declarative, production-ready Terraform modules for serverless architectures with automated IAM least-privilege.',
    icon: <Code2 className="h-4 w-4 text-[#0099FF]" />,
    status: 'active',
  },
  {
    id: 'prd-03',
    code: 'CRY-03',
    title: 'Decentralized Key Custody Architecture',
    category: 'Web3',
    price: '59.00',
    currency: 'USDT',
    deliveryType: 'Protocol Spec + SDK',
    description: 'Multi-party computation (MPC) cold-storage schema and recovery protocols for sensitive cryptographic keys.',
    icon: <Key className="h-4 w-4 text-[#C084FC]" />,
    status: 'active',
  },
  {
    id: 'prd-04',
    code: 'SEC-04',
    title: 'Serverless API Pentesting & Audit Suite',
    category: 'Auditing',
    price: '49.00',
    currency: 'USDT',
    deliveryType: 'CLI Suite + Checklist',
    description: 'Automated vulnerability scanner targeting Firebase security rules, webhook forgery, and token replay attacks.',
    icon: <Terminal className="h-4 w-4 text-[#FFB800]" />,
    status: 'active',
  },
]

export interface FeaturedProductsSectionProps {
  onBrowseClick?: () => void
  onProductClick?: (productId: string) => void
}

export function FeaturedProductsSection({
  onBrowseClick,
  onProductClick,
}: FeaturedProductsSectionProps) {
  return (
    <section id="featured" className="py-12 md:py-16 border-b border-[#1E1E1E]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#737373]">
              <span className="text-[#00FF66] font-bold">&gt;</span>
              <span>guest@insideunderground.com:~/browse# ls -la ./featured</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-mono text-[#EDEDED] tracking-tight">
              FEATURED DIGITAL ASSETS
            </h2>
            <p className="text-xs font-mono text-[#808080]">
              Verified technical assets with cryptographic pricing authority and instant digital delivery.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onBrowseClick}
            className="self-start sm:self-center text-xs"
          >
            <ShoppingBag className="mr-1.5 h-3.5 w-3.5 text-[#00FF66]" />
            <span>VIEW ALL PRODUCTS &gt;</span>
          </Button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURED_PRODUCTS.map((product) => (
            <TerminalPanel
              key={product.id}
              title={product.code}
              badge={
                <Badge
                  variant={
                    product.category === 'Security'
                      ? 'default'
                      : product.category === 'DevOps'
                      ? 'info'
                      : product.category === 'Web3'
                      ? 'purple'
                      : 'warning'
                  }
                  className="text-[10px]"
                >
                  {product.category}
                </Badge>
              }
              actions={<TerminalStatus status={product.status} label="AVAILABLE" />}
              className="flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="rounded border border-[#1E1E1E] bg-[#121212] p-2 shrink-0">
                    {product.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-semibold text-[#EDEDED] leading-snug">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-[#737373]">
                      <Download className="h-3 w-3" />
                      <span>{product.deliveryType}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#1E1E1E]/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#737373] block uppercase">AUTHORITATIVE PRICE</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold text-[#00FF66]">{product.price}</span>
                    <span className="text-xs text-[#808080]">{product.currency}</span>
                  </div>
                </div>

                <Button
                  variant="default"
                  size="xs"
                  onClick={() => onProductClick?.(product.id)}
                  className="gap-1.5"
                >
                  <span>INSPECT ASSET</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </TerminalPanel>
          ))}
        </div>
      </div>
    </section>
  )
}
