import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileCode,
  FolderArchive,
  MonitorSmartphone,
  ShieldCheck,
  Zap,
  Lock,
  Sparkles,
  ShoppingBag,
  Code2,
  Key,
  Terminal,
  Cpu,
  AlertCircle,
} from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import { CheckoutApiError, createOrder } from "@/services/api";
import { LaserBorder } from "@/components/ui/LaserBorder";
import { DecryptedText } from "@/components/ui/DecryptedText";
import { formatProductPrice, productDisplayCode } from "@/utils/format";

const CATEGORY_STYLES: Record<
  string,
  { badge: string; icon: React.ReactNode }
> = {
  "SECURITY & PRIVACY": {
    badge: "border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66]",
    icon: <ShieldCheck className="h-4 w-4 text-[#00FF66]" />,
  },
  "DEVOPS & CLOUD": {
    badge: "border-[#0099FF]/30 bg-[#0099FF]/10 text-[#0099FF]",
    icon: <Code2 className="h-4 w-4 text-[#0099FF]" />,
  },
  "WEB3 & CRYPTO": {
    badge: "border-[#C084FC]/30 bg-[#C084FC]/10 text-[#C084FC]",
    icon: <Key className="h-4 w-4 text-[#C084FC]" />,
  },
  "SECURITY AUDITING": {
    badge: "border-[#FFB800]/30 bg-[#FFB800]/10 text-[#FFB800]",
    icon: <Terminal className="h-4 w-4 text-[#FFB800]" />,
  },
};

const GUARANTEE_PODS = [
  {
    icon: Zap,
    title: "Instant Download Access",
    desc: "Archive package unlocked within 5 seconds of blockchain confirmation.",
  },
  {
    icon: Lock,
    title: "Zero KYC & Data Retention",
    desc: "Strict zero-logging architecture. No personal identity verification.",
  },
  {
    icon: ShieldCheck,
    title: "SHA-256 Integrity Verified",
    desc: "Cryptographically signed checksums to prevent any payload tampering.",
  },
];

function ProductNotFound({ id }: { id: string }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full p-8 rounded-2xl border border-[#222222] bg-[#0A0A0A]/90 backdrop-blur-md text-center space-y-5 shadow-2xl">
        <div className="h-16 w-16 rounded-2xl bg-[#FF3333]/10 border border-[#FF3333]/30 mx-auto flex items-center justify-center text-[#FF4444]">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-white">Asset Not Found</h2>
          <p className="text-xs text-[#808080] leading-relaxed">
            The requested digital asset{" "}
            <code className="text-[#00FF66] font-mono">{id}</code> does not exist
            or has been retired from the catalog.
          </p>
        </div>
        <Link
          to="/browse"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-mono text-xs font-bold bg-[#00FF66] text-black hover:bg-[#00FF66]/90 transition-all shadow-[0_0_20px_rgba(0,255,102,0.25)]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>RETURN TO CATALOG</span>
        </Link>
      </div>
    </div>
  );
}

export function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { products, loading } = useProducts()
  const { user } = useAuth()

  const [activeTab, setActiveTab] = React.useState<
    "overview" | "files" | "specs"
  >("overview")
  const [purchasePending, setPurchasePending] = React.useState(false)
  const [purchaseError, setPurchaseError] = React.useState<string | null>(null)

  const product = React.useMemo(
    () => products.find((item) => item.id === productId),
    [products, productId]
  )

  const handlePurchase = async () => {
    if (!user) {
      navigate("/login")
      return
    }
    if (!product) {
      return
    }
    setPurchaseError(null)
    setPurchasePending(true)
    try {
      const { orderId } = await createOrder(product.id)
      navigate(`/checkout/${orderId}`)
    } catch (caught) {
      if (caught instanceof CheckoutApiError && caught.code === "PAYMENT_BACKEND_PENDING") {
        setPurchaseError("PAYMENT_BACKEND_PENDING — checkout functions arrive in Step 9.")
      } else {
        setPurchaseError("Unable to start checkout. Please try again.")
      }
    } finally {
      setPurchasePending(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[85vh] bg-[#030303] text-[#EDEDED] py-12 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8 animate-pulse font-sans">
        <div className="h-6 w-36 bg-[#1A1A1A] rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-10 w-3/4 bg-[#1A1A1A] rounded-xl" />
            <div className="h-24 w-full bg-[#141414] rounded-xl" />
            <div className="h-64 w-full bg-[#141414] rounded-2xl" />
          </div>
          <div className="lg:col-span-4">
            <div className="h-96 w-full bg-[#1A1A1A] rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return <ProductNotFound id={productId ?? ""} />
  }

  const categoryStyle =
    CATEGORY_STYLES[product.category] ?? {
      badge: "border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66]",
      icon: <ShoppingBag className="h-4 w-4 text-[#00FF66]" />,
    }

  return (
    <div className="min-h-[85vh] bg-[#030303] text-[#EDEDED] relative overflow-hidden py-8 sm:py-14 font-sans">
      {/* Dynamic Background Ambience & Quantum Aurora */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #1E1E1E 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-32 w-[600px] h-[500px] bg-[#00FF66]/15 rounded-full blur-[160px]"
        />
        <div className="absolute bottom-10 right-0 w-[500px] h-[400px] bg-[#0099FF]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#222222] bg-[#0A0A0A]/80 hover:bg-[#141414] text-[#A3A3A3] hover:text-[#00FF66] transition-all text-xs font-mono group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO CATALOG</span>
          </Link>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#737373]">
            <span>CATALOG</span>
            <span>/</span>
            <span className="text-[#00FF66]">
              {productDisplayCode(product)}
            </span>
          </div>
        </div>

        {/* Dual-Column Spatial Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (7 cols): Asset Intelligence & Deep Specification Deck */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Header: Code, Category, and Scramble Title */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono font-bold border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66] shadow-[0_0_12px_rgba(0,255,102,0.15)]">
                  {productDisplayCode(product)}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${categoryStyle.badge}`}
                >
                  {categoryStyle.icon}
                  <span>{product.category}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono text-[#0099FF] bg-[#0099FF]/10 border border-[#0099FF]/20">
                  <FolderArchive className="h-3 w-3" />
                  <span>{product.fileSize ?? "DIGITAL ARCHIVE"}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse" />
                  <span>SHA-256 VERIFIED</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight font-sans">
                <DecryptedText
                  text={product.name}
                  speed={20}
                  maxIterations={6}
                />
              </h1>

              <p className="text-base sm:text-lg text-[#D4D4D4] leading-relaxed max-w-3xl font-sans">
                {product.description}
              </p>
            </div>

            {/* Interactive Tabbed Specification Deck */}
            <div className="rounded-2xl border border-[#222222] bg-[#0A0A0A]/90 backdrop-blur-md overflow-hidden shadow-2xl">
              {/* Tab Switcher */}
              <div className="flex items-center border-b border-[#1E1E1E] bg-[#080808] p-1.5 gap-1.5 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === "overview"
                      ? "bg-[#181818] text-[#00FF66] border border-[#00FF66]/30 shadow-[0_0_12px_rgba(0,255,102,0.15)]"
                      : "text-[#737373] hover:text-white hover:bg-[#111111]"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>OVERVIEW & VALUE</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("files")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === "files"
                      ? "bg-[#181818] text-[#0099FF] border border-[#0099FF]/30 shadow-[0_0_12px_rgba(0,153,255,0.15)]"
                      : "text-[#737373] hover:text-white hover:bg-[#111111]"
                  }`}
                >
                  <FileCode className="h-3.5 w-3.5" />
                  <span>PACKAGE MANIFEST & FILES</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("specs")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === "specs"
                      ? "bg-[#181818] text-[#C084FC] border border-[#C084FC]/30 shadow-[0_0_12px_rgba(192,132,252,0.15)]"
                      : "text-[#737373] hover:text-white hover:bg-[#111111]"
                  }`}
                >
                  <MonitorSmartphone className="h-3.5 w-3.5" />
                  <span>SYSTEM SPECS & PLATFORMS</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {activeTab === "overview" && (
                    <motion.div
                      key="overview-tab"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="space-y-3">
                        <h3 className="text-xs font-mono font-bold text-[#00FF66] uppercase tracking-wider">
                          WHAT IS INCLUDED IN THIS SUITE
                        </h3>
                        <div className="grid grid-cols-1 gap-3 pt-1">
                          {product.features?.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-start gap-3 p-3.5 rounded-xl border border-[#1A1A1A] bg-[#0E0E0E] hover:border-[#00FF66]/30 transition-colors"
                            >
                              <div className="h-6 w-6 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] shrink-0 mt-0.5">
                                <Check className="h-3.5 w-3.5" />
                              </div>
                              <span className="text-sm text-[#E5E5E5] leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Commercial Entitlement Callout */}
                      <div className="p-4 rounded-xl border border-[#1E1E1E] bg-[#0D0D0D] flex items-start gap-3.5">
                        <div className="h-8 w-8 rounded-lg bg-[#0099FF]/10 border border-[#0099FF]/20 flex items-center justify-center text-[#0099FF] shrink-0 mt-0.5">
                          <Cpu className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-white uppercase font-mono">
                            COMMERCIAL UNLIMITED ENTITLEMENT
                          </h4>
                          <p className="text-xs text-[#888888] leading-relaxed">
                            Includes perpetual rights for personal and commercial
                            infrastructure. No seat limits, no recurring SaaS
                            licensing, and zero telemetry pinging.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "files" && (
                    <motion.div
                      key="files-tab"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between border-b border-[#1E1E1E] pb-3 text-xs font-mono">
                        <span className="text-[#888888] uppercase">
                          ARCHIVE DELIVERABLES (
                          {product.files?.length ?? 0} ITEMS)
                        </span>
                        <span className="text-[#0099FF] font-bold">
                          {product.fileSize ?? "ZIP FORMAT"}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {product.files?.map((file) => (
                          <div
                            key={file.name}
                            className="p-3.5 rounded-xl border border-[#1A1A1A] bg-[#080808] hover:border-[#0099FF]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="h-8 w-8 rounded-lg bg-[#0099FF]/10 border border-[#0099FF]/20 flex items-center justify-center text-[#0099FF] shrink-0">
                                <FileCode className="h-4 w-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="font-mono text-xs font-bold text-[#00FF66] truncate block">
                                  {file.name}
                                </span>
                                <span className="text-xs text-[#808080]">
                                  {file.desc}
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141414] text-[#737373] border border-[#222222] self-start sm:self-auto shrink-0">
                              SIGNED
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "specs" && (
                    <motion.div
                      key="specs-tab"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {/* Platforms */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-[#C084FC] uppercase tracking-wider">
                          SUPPORTED PLATFORMS & RUNTIMES
                        </h4>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {product.platforms?.map((platform) => (
                            <div
                              key={platform}
                              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0E0E0E] border border-[#222222] text-xs font-mono text-white"
                            >
                              <MonitorSmartphone className="h-3.5 w-3.5 text-[#C084FC]" />
                              <span>{platform}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Mode & Security Protocol */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl border border-[#1A1A1A] bg-[#0E0E0E] space-y-1">
                          <span className="text-[10px] font-mono text-[#737373] uppercase tracking-wider">
                            DISTRIBUTION METHOD
                          </span>
                          <p className="text-sm font-bold text-white font-mono">
                            Instant Cryptographic Cloud Dispatch
                          </p>
                          <p className="text-xs text-[#808080]">
                            Direct browser download and permanent account archive
                            access.
                          </p>
                        </div>

                        <div className="p-4 rounded-xl border border-[#1A1A1A] bg-[#0E0E0E] space-y-1">
                          <span className="text-[10px] font-mono text-[#737373] uppercase tracking-wider">
                            SECURITY STATUS
                          </span>
                          <p className="text-sm font-bold text-[#00FF66] font-mono">
                            Verified Clean & Unobfuscated
                          </p>
                          <p className="text-xs text-[#808080]">
                            Full raw source scripts provided with zero binary
                            black boxes.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 3 Trust & Reassurance Pods */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {GUARANTEE_PODS.map((pod) => {
                const Icon = pod.icon;
                return (
                  <div
                    key={pod.title}
                    className="p-4 rounded-xl border border-[#1E1E1E] bg-[#080808]/80 backdrop-blur-sm space-y-2 hover:border-[#00FF66]/30 transition-all"
                  >
                    <div className="h-8 w-8 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white font-sans">
                        {pod.title}
                      </h4>
                      <p className="text-[11px] text-[#808080] leading-relaxed">
                        {pod.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (5 cols): Sticky Luxury Purchase Citadel */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-6">
            <LaserBorder
              speed="10s"
              laserColor="#00FF66"
              secondaryColor="rgba(0, 180, 255, 0.4)"
              glowIntensity="vibrant"
              className="shadow-[0_0_50px_rgba(0,255,102,0.15)]"
              innerClassName="bg-[#090909] p-6 sm:p-7 rounded-2xl space-y-6 font-sans"
            >
              {/* Citadel Header */}
              <div className="space-y-1.5 pb-4 border-b border-[#1A1A1A]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#00FF66] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/20">
                    256-BIT ENCRYPTED
                  </span>
                  <span className="text-[10px] font-mono text-[#525252]">
                    PRIVATE_ACQUISITION
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] font-mono text-[#808080] uppercase tracking-wider block">
                    PRICE SETTLEMENT
                  </span>
                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-3xl sm:text-4xl font-black text-[#00FF66] font-mono tracking-tight">
                      {formatProductPrice(product)}
                    </span>
                    <span className="text-xs font-mono text-[#A3A3A3]">
                      FIXED RATE
                    </span>
                  </div>
                </div>
              </div>

              {/* Supported Settlement Rails */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#737373] uppercase tracking-wider block">
                  ACCEPTED CRYPTOCURRENCY RAILS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["USDT", "BTC", "ETH", "SOL"].map((coin) => (
                    <span
                      key={coin}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#141414] text-white border border-[#222222]"
                    >
                      {coin}
                    </span>
                  ))}
                </div>
              </div>

              {/* Purchase Action Button */}
              <div className="space-y-3 pt-1">
                {purchaseError && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-[#FFB800]/30 bg-[#FFB800]/10 p-3 text-xs text-[#FFC84D] font-mono">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{purchaseError}</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handlePurchase}
                  disabled={purchasePending}
                  className="relative w-full py-4 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black bg-[#00FF66] hover:bg-[#00FF66]/90 transition-all duration-300 shadow-[0_0_30px_rgba(0,255,102,0.35)] hover:shadow-[0_0_40px_rgba(0,255,102,0.5)] cursor-pointer flex items-center justify-center gap-2 overflow-hidden group disabled:opacity-50"
                >
                  {/* Continuous traveling shimmer sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  <span>
                    {purchasePending
                      ? "INITIALIZING CHECKOUT..."
                      : user
                        ? "PURCHASE ASSET NOW"
                        : "SIGN IN TO PURCHASE"}
                  </span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-center text-[#737373] font-sans">
                  {user
                    ? "Instant automated delivery to your account upon blockchain confirmation."
                    : "Create a free account or sign in to complete anonymous checkout."}
                </p>
              </div>

              {/* Specification Summary Matrix */}
              <div className="pt-4 border-t border-[#181818] space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between text-[#888888]">
                  <span>DELIVERABLE FORMAT</span>
                  <span className="text-white font-bold">
                    {product.fileSize ?? "DIGITAL"} .ZIP
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#888888]">
                  <span>LICENSE TYPE</span>
                  <span className="text-white font-bold">
                    PERPETUAL LIFETIME
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#888888]">
                  <span>DELIVERY SPEED</span>
                  <span className="text-[#00FF66] font-bold">
                    &lt; 5 SECONDS
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#888888]">
                  <span>DOWNLOAD LIMITS</span>
                  <span className="text-white font-bold">UNLIMITED</span>
                </div>
              </div>

              {/* Security & Concierge Seal */}
              <div className="p-3.5 rounded-xl border border-[#1E1E1E] bg-[#050505] space-y-1.5 text-[11px] text-[#737373]">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ShieldCheck className="h-4 w-4 text-[#00FF66] shrink-0" />
                  <span>Verified Cryptographic Settlement</span>
                </div>
                <p className="leading-relaxed pl-6">
                  Protected by 256-bit TLS encryption with zero tracking and
                  24/7 dedicated support.
                </p>
              </div>
            </LaserBorder>
          </div>
        </div>
      </div>
    </div>
  );
}