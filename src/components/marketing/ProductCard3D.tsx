import * as React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Check,
  FileCode,
  Sparkles,
  FolderArchive,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface ProductFileItem {
  name: string
  desc: string
}

export interface ProductCardData {
  id: string
  code: string
  title: string
  category: string
  price: string
  currency: string
  fileSize: string
  description: string
  features: string[]
  files: ProductFileItem[]
  platforms: string[]
  icon: React.ReactNode
  status: string
}

export interface ProductCard3DProps {
  product: ProductCardData
  onInspect?: (productId: string) => void
}

export function ProductCard3D({ product, onInspect }: ProductCard3DProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [viewMode, setViewMode] = React.useState<'overview' | 'files'>('overview')

  // Mouse position normalized to [-0.5, 0.5]
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Calibrated spring physics for smooth, luxury magnetic feel
  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 25 })
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 25 })

  // 3D Rotation angles
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg'])

  // Dynamic light glare gradient coordinates
  const [mousePos, setMousePos] = React.useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
    setMousePos({ x: (mouseX / width) * 100, y: (mouseY / height) * 100 })
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setMousePos({ x: 50, y: 50 })
  }

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative group rounded-xl p-[1px] transition-all duration-300"
    >
      {/* 3D Magnetic Motion Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full flex flex-col justify-between rounded-xl border border-[#242424] bg-[#0A0A0A] p-5 font-mono shadow-2xl transition-colors duration-300 hover:border-[#00FF66]/50 group-hover:shadow-[0_10px_30px_rgba(0,255,102,0.08)] overflow-hidden select-none"
      >
        {/* Specular Glare Reflection Layer */}
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.08), transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Ambient Corner Glow */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle, #00FF66 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Card Header: Code, Category, & Live Status */}
        <div className="relative z-20 space-y-3">
          <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-2.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#EDEDED] text-xs">
                <span className="text-[#00FF66] mr-0.5">[</span>
                {product.code}
                <span className="text-[#00FF66] ml-0.5">]</span>
              </span>
              <Badge
                variant="outline"
                className="text-[10px] font-semibold border-[#2E2E2E] bg-[#121212] text-[#A3A3A3]"
              >
                {product.category}
              </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/20">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              <span>READY</span>
            </div>
          </div>

          {/* Product Title and Icon */}
          <div className="flex items-start gap-3 pt-1">
            <div className="rounded-lg border border-[#222222] bg-[#141414] p-2.5 shrink-0 text-[#00FF66] group-hover:border-[#00FF66]/40 transition-colors shadow-inner">
              {product.icon}
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#FFFFFF] leading-snug font-mono group-hover:text-[#00FF66] transition-colors">
                {product.title}
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-[#888888]">
                <FolderArchive className="h-3 w-3 text-[#0099FF]" />
                <span className="text-[#A3A3A3] font-semibold">{product.fileSize}</span>
                <span className="text-[#444444]">•</span>
                <span className="text-[#00FF66] text-[10px] font-bold">SHA-256 VERIFIED</span>
              </div>
            </div>
          </div>

          {/* View Mode Switcher: Overview vs Files */}
          <div className="flex items-center gap-1 pt-2">
            <button
              type="button"
              onClick={() => setViewMode('overview')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                viewMode === 'overview'
                  ? 'bg-[#1C1C1C] text-[#00FF66] border border-[#00FF66]/40'
                  : 'text-[#777777] hover:text-[#CCCCCC]'
              }`}
            >
              <Sparkles className="h-3 w-3" />
              <span>OVERVIEW</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('files')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                viewMode === 'files'
                  ? 'bg-[#1C1C1C] text-[#0099FF] border border-[#0099FF]/40'
                  : 'text-[#777777] hover:text-[#CCCCCC]'
              }`}
            >
              <FileCode className="h-3 w-3" />
              <span>FILES &amp; SPECS</span>
            </button>
          </div>

          {/* Dynamic Content Area: Overview vs Files */}
          <div className="min-h-[145px] pt-1">
            {viewMode === 'overview' ? (
              <div className="space-y-3">
                <p className="text-xs text-[#D4D4D4] font-sans leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-1.5 text-[11px] text-[#EDEDED] pt-1">
                  {product.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                      <span className="font-sans text-xs text-[#D4D4D4]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 bg-[#070707] p-2.5 rounded border border-[#1E1E1E]">
                <div className="text-[10px] text-[#888888] font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>INCLUDED DELIVERABLES:</span>
                  <span className="text-[#0099FF]">.ZIP FORMAT</span>
                </div>

                <div className="space-y-1.5 font-mono text-[11px]">
                  {product.files.map((file) => (
                    <div key={file.name} className="flex flex-col text-[11px] leading-tight">
                      <span className="text-[#00FF66] font-semibold">{file.name}</span>
                      <span className="text-[10px] text-[#888888] font-sans pl-2">{file.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-1 border-t border-[#1A1A1A] flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-[#777777]">PLATFORMS:</span>
                  {product.platforms.map((p) => (
                    <span
                      key={p}
                      className="px-1.5 py-0.2 bg-[#141414] text-[#A3A3A3] rounded border border-[#222222]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer: Price & Inspect CTA */}
        <div className="relative z-20 pt-4 mt-4 border-t border-[#1E1E1E] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#888888] block font-semibold tracking-wider uppercase">
              INSTANT CRYPTO CHECKOUT
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-[#00FF66] font-mono">
                ${product.price}
              </span>
              <span className="text-xs font-semibold text-[#EDEDED] font-mono">
                {product.currency}
              </span>
            </div>
            <span className="text-[9px] text-[#666666] block font-mono">
              USDT • BTC • ETH • SOL
            </span>
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={() => onInspect?.(product.id)}
            className="gap-1.5 text-xs font-bold shadow-md cursor-pointer hover:bg-[#00FF66] hover:text-black group/btn"
          >
            <span>INSPECT ASSET</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
