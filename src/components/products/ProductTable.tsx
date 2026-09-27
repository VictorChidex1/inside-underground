import * as React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Code2,
  Key,
  Terminal,
  ShoppingBag,
  FolderArchive,
} from "lucide-react";
import { formatProductPrice, productDisplayCode } from "@/utils/format";
import type { Product } from "@/types";

export interface ProductTableProps {
  products: Product[];
  onResetFilters?: () => void;
}

const CATEGORY_STYLES: Record<string, { badge: string; icon: React.ReactNode }> = {
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

export function ProductTable({ products, onResetFilters }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-[#222222] bg-[#0A0A0A]/80 backdrop-blur-md p-10 text-center space-y-4 font-sans">
        <div className="h-12 w-12 rounded-2xl bg-[#141414] border border-[#262626] mx-auto flex items-center justify-center text-[#737373]">
          <ShoppingBag className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">No Assets Match Your Filter</h3>
          <p className="text-xs text-[#808080] max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category pill.
          </p>
        </div>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30 hover:bg-[#00FF66]/20 transition-all cursor-pointer"
          >
            RESET ALL FILTERS
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#222222] bg-[#0A0A0A]/90 backdrop-blur-md shadow-2xl font-sans">
      {/* Desktop Precision Matrix Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-[#1E1E1E] bg-[#080808] text-[11px] font-mono font-bold uppercase tracking-wider text-[#737373]">
              <th className="px-5 py-3.5">CODE</th>
              <th className="px-5 py-3.5">ASSET SPECIFICATION</th>
              <th className="px-5 py-3.5">CATEGORY</th>
              <th className="px-5 py-3.5">COMPATIBILITY</th>
              <th className="px-5 py-3.5 text-right">PRICE (USDT)</th>
              <th className="px-5 py-3.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#151515]">
            {products.map((product) => {
              const style =
                CATEGORY_STYLES[product.category] ?? {
                  badge: "border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66]",
                  icon: <ShoppingBag className="h-4 w-4 text-[#00FF66]" />,
                };

              return (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-[#0F0F0F] group"
                >
                  {/* Code */}
                  <td className="px-5 py-4 whitespace-nowrap font-mono">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66] shadow-[0_0_10px_rgba(0,255,102,0.1)]">
                      {productDisplayCode(product)}
                    </span>
                  </td>

                  {/* Asset Details */}
                  <td className="px-5 py-4 min-w-[280px]">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-xl border border-[#222222] bg-[#141414] flex items-center justify-center shrink-0 group-hover:border-[#00FF66]/40 transition-colors shadow-inner">
                        {style.icon}
                      </div>
                      <div className="space-y-1">
                        <Link
                          to={`/product/${product.id}`}
                          className="text-sm font-bold text-white group-hover:text-[#00FF66] transition-colors leading-snug block font-sans"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-[#808080] line-clamp-1 max-w-md">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4 whitespace-nowrap font-mono">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${style.badge}`}
                    >
                      {product.category}
                    </span>
                  </td>

                  {/* Compatibility & Format */}
                  <td className="px-5 py-4 whitespace-nowrap text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#A3A3A3]">
                        <FolderArchive className="h-3.5 w-3.5 text-[#0099FF]" />
                        <span>{product.fileSize ?? "INSTANT DOWNLOAD"}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.platforms?.slice(0, 3).map((p) => (
                          <span
                            key={p}
                            className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#141414] text-[#808080] border border-[#222222]"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4 whitespace-nowrap text-right font-mono">
                    <div className="text-base font-black text-[#00FF66] tracking-tight">
                      {formatProductPrice(product)}
                    </div>
                    <span className="text-[10px] text-[#666666] block font-mono">
                      USDT • BTC • SOL
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4 whitespace-nowrap text-right">
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#141414] hover:bg-[#00FF66] hover:text-black text-white border border-[#262626] hover:border-[#00FF66] transition-all shadow-sm group/btn"
                    >
                      <span>INSPECT</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View */}
      <div className="divide-y divide-[#1E1E1E] md:hidden">
        {products.map((product) => {
          const style =
            CATEGORY_STYLES[product.category] ?? {
              badge: "border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66]",
              icon: <ShoppingBag className="h-4 w-4 text-[#00FF66]" />,
            };

          return (
            <div
              key={product.id}
              className="p-4 space-y-3.5 hover:bg-[#0E0E0E] transition-colors"
            >
              {/* Header: Code & Category */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66]">
                  {productDisplayCode(product)}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${style.badge}`}
                >
                  {product.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <Link
                  to={`/product/${product.id}`}
                  className="text-base font-bold text-white hover:text-[#00FF66] transition-colors block leading-snug"
                >
                  {product.name}
                </Link>
                <p className="text-xs text-[#888888] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Meta & Price */}
              <div className="flex items-center justify-between pt-2 border-t border-[#181818]">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-[#737373] uppercase tracking-wider block">
                    PRICE
                  </span>
                  <span className="text-lg font-black text-[#00FF66] font-mono">
                    {formatProductPrice(product)}
                  </span>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#00FF66] text-black shadow-[0_0_15px_rgba(0,255,102,0.25)] hover:bg-[#00FF66]/90 transition-all"
                >
                  <span>INSPECT ASSET</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}