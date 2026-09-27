import * as React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Code2,
  Key,
  Terminal,
  ShoppingBag,
  Zap,
  Lock,
  SearchX,
} from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import {
  ProductFilters,
  type ProductSortKey,
} from "@/components/products/ProductFilters";
import { ProductTable } from "@/components/products/ProductTable";
import {
  ProductCard3D,
  type ProductCardData,
} from "@/components/marketing/ProductCard3D";
import { DecryptedText } from "@/components/ui/DecryptedText";
import type { Product } from "@/types";

const PRODUCT_ICONS: Record<string, React.ReactNode> = {
  "SEC-01": <ShieldCheck className="h-5 w-5 text-[#00FF66]" />,
  "OPS-02": <Code2 className="h-5 w-5 text-[#0099FF]" />,
  "CRY-03": <Key className="h-5 w-5 text-[#C084FC]" />,
  "AUD-04": <Terminal className="h-5 w-5 text-[#FFB800]" />,
};

function getProductIcon(category: string, code?: string): React.ReactNode {
  if (code && PRODUCT_ICONS[code]) return PRODUCT_ICONS[code];
  const cat = category.toUpperCase();
  if (cat.includes("SECURITY"))
    return <ShieldCheck className="h-5 w-5 text-[#00FF66]" />;
  if (cat.includes("CLOUD") || cat.includes("DEVOPS"))
    return <Code2 className="h-5 w-5 text-[#0099FF]" />;
  if (cat.includes("CRYPTO") || cat.includes("WEB3"))
    return <Key className="h-5 w-5 text-[#C084FC]" />;
  if (cat.includes("AUDIT"))
    return <Terminal className="h-5 w-5 text-[#FFB800]" />;
  return <ShoppingBag className="h-5 w-5 text-[#00FF66]" />;
}

function toCardData(product: Product): ProductCardData {
  return {
    id: product.id,
    code: product.code ?? product.id,
    title: product.name,
    category: product.category,
    price: product.price.toFixed(2),
    currency: product.currency,
    fileSize: product.fileSize ?? "DIGITAL",
    description: product.description,
    features: product.features ?? [],
    files: product.files ?? [],
    platforms: product.platforms ?? [],
    icon: getProductIcon(product.category, product.code),
    status: product.status,
  };
}

const TRUST_METRICS = [
  {
    icon: Zap,
    title: "Instant Download Delivery",
    subtitle: "Unlocked in < 5s after payment",
  },
  {
    icon: Lock,
    title: "Zero KYC & Data Retention",
    subtitle: "Strict zero-logging privacy",
  },
  {
    icon: ShieldCheck,
    title: "SHA-256 Verified Assets",
    subtitle: "Cryptographically signed files",
  },
];

export function BrowsePage() {
  const navigate = useNavigate();
  const { products, loading } = useProducts();

  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("all");
  const [sort, setSort] = React.useState<ProductSortKey>("name");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  // Grid spotlight coordinates
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const categories = React.useMemo(
    () =>
      Array.from(new Set(products.map((product) => product.category))).sort(),
    [products]
  );

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const filtered = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    const list = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.code ?? "").toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      const matchesCategory =
        category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    });

    return [...list].sort((a, b) => {
      if (sort === "price-asc") {
        return a.price - b.price;
      }
      if (sort === "price-desc") {
        return b.price - a.price;
      }
      return a.name.localeCompare(b.name);
    });
  }, [products, search, category, sort]);

  const handleInspect = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("name");
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="min-h-[85vh] bg-[#030303] text-[#EDEDED] relative overflow-hidden py-10 sm:py-16 font-sans"
    >
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
          className="absolute top-1/6 -left-32 w-[600px] h-[500px] bg-[#00FF66]/15 rounded-full blur-[160px]"
        />
        <div className="absolute bottom-10 right-0 w-[500px] h-[400px] bg-[#0099FF]/10 rounded-full blur-[140px]" />

        {/* Global Interactive Cursor Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(800px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0, 255, 102, 0.06), transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[#1A1A1A]">
          <div className="space-y-3 max-w-3xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66] text-xs font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="font-bold tracking-wider uppercase text-[11px]">
                CURATED DIGITAL ASSETS & INTELLIGENCE
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight font-sans">
              <DecryptedText
                text="BROWSE PRODUCT CATALOG"
                speed={25}
                maxIterations={8}
              />
            </h1>

            {/* Plain-English Reassurance Subtitle */}
            <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed max-w-2xl">
              Production-ready developer blueprints, security kits, and cloud
              infrastructure. Delivered via instant, encrypted cryptocurrency
              settlement with lifetime perpetual ownership.
            </p>
          </div>

          {/* Live Catalog Telemetry Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#090909] border border-[#222222] font-mono text-xs shadow-inner">
              <span className="h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="text-white font-bold">{filtered.length}</span>
              <span className="text-[#737373]">
                {filtered.length === 1 ? "ASSET ONLINE" : "ASSETS ONLINE"}
              </span>
            </div>
          </div>
        </div>

        {/* Trust & Guarantee Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
          {TRUST_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.title}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-[#1C1C1C] bg-[#080808]/80 backdrop-blur-sm"
              >
                <div className="h-8 w-8 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/20 flex items-center justify-center text-[#00FF66] shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-white font-sans truncate">
                    {metric.title}
                  </h4>
                  <p className="text-[11px] text-[#737373] truncate">
                    {metric.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter & Search Suite */}
        <div className="pt-2">
          <ProductFilters
            search={search}
            onSearchChange={setSearch}
            category={category}
            categories={categories}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
            categoryCounts={categoryCounts}
            totalCount={products.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* Main Content Area */}
        <div className="pt-2">
          {loading ? (
            /* Luxury Skeleton Loader */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#1E1E1E] bg-[#0A0A0A] p-6 space-y-4 animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-20 bg-[#1A1A1A] rounded" />
                    <div className="h-4 w-16 bg-[#1A1A1A] rounded-full" />
                  </div>
                  <div className="h-6 w-3/4 bg-[#1A1A1A] rounded" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-[#141414] rounded" />
                    <div className="h-3 w-5/6 bg-[#141414] rounded" />
                  </div>
                  <div className="h-10 w-full bg-[#181818] rounded-xl pt-4" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* Empty State */
            <div className="rounded-2xl border border-[#222222] bg-[#0A0A0A]/80 backdrop-blur-md p-12 text-center space-y-4 font-sans max-w-xl mx-auto">
              <div className="h-14 w-14 rounded-2xl bg-[#141414] border border-[#262626] mx-auto flex items-center justify-center text-[#737373]">
                <SearchX className="h-7 w-7 text-[#FFB800]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white">
                  No Digital Assets Found
                </h3>
                <p className="text-xs sm:text-sm text-[#808080] leading-relaxed">
                  No products matched &ldquo;{search}&rdquo; in the selected
                  category.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-[#00FF66] text-black shadow-[0_0_20px_rgba(0,255,102,0.25)] hover:bg-[#00FF66]/90 transition-all cursor-pointer"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : viewMode === "grid" ? (
            /* 3D Holographic Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filtered.map((product) => (
                <ProductCard3D
                  key={product.id}
                  product={toCardData(product)}
                  onInspect={handleInspect}
                />
              ))}
            </div>
          ) : (
            /* Precision Matrix List View */
            <ProductTable
              products={filtered}
              onResetFilters={handleResetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
}