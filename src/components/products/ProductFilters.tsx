import * as React from "react";
import {
  Search,
  X,
  LayoutGrid,
  List,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ProductSortKey = "name" | "price-asc" | "price-desc";

export interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  categories: string[];
  onCategoryChange: (value: string) => void;
  sort: ProductSortKey;
  onSortChange: (value: ProductSortKey) => void;
  categoryCounts?: Record<string, number>;
  totalCount?: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function ProductFilters({
  search,
  onSearchChange,
  category,
  categories,
  onCategoryChange,
  sort,
  onSortChange,
  categoryCounts = {},
  totalCount = 0,
  viewMode,
  onViewModeChange,
}: ProductFiltersProps) {
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Keyboard shortcut (press '/' or 'cmd+k' to focus search)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "/" || (e.metaKey && e.key === "k")) && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="space-y-4 font-sans">
      {/* Search Bar & Primary Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Modern Glassmorphic Search Input */}
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#737373] group-focus-within:text-[#00FF66] transition-colors">
            <Search className="h-4 w-4" />
          </div>

          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search digital tools, security suites, cloud blueprints..."
            aria-label="Search catalog"
            className="w-full pl-10 pr-20 py-3 text-xs sm:text-sm bg-[#080808]/90 border border-[#222222] rounded-xl text-white placeholder-[#525252] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all backdrop-blur-md shadow-inner"
          />

          <div className="absolute inset-y-0 right-3 flex items-center gap-1.5">
            {search ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="p-1 rounded-md text-[#737373] hover:text-white transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[#525252] bg-[#141414] border border-[#262626] rounded">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Right Action Suite: Sort & View Mode Switcher */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          {/* Custom Styled Sort Dropdown */}
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#737373]">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#00FF66]" />
            </div>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as ProductSortKey)}
              aria-label="Sort products"
              className="pl-8 pr-7 py-3 text-xs font-mono font-semibold bg-[#0A0A0A] border border-[#222222] rounded-xl text-[#EDEDED] focus:outline-none focus:border-[#00FF66] focus:ring-1 focus:ring-[#00FF66] transition-all cursor-pointer appearance-none shadow-sm hover:border-[#333333]"
            >
              <option value="name">SORT: NAME (A–Z)</option>
              <option value="price-asc">SORT: PRICE (LOW–HIGH)</option>
              <option value="price-desc">SORT: PRICE (HIGH–LOW)</option>
            </select>
            <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-[#666666]">
              <span className="text-[10px]">▼</span>
            </div>
          </div>

          {/* View Mode Toggle (Grid vs List) */}
          <div className="flex items-center p-1 rounded-xl bg-[#0A0A0A] border border-[#222222]">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              className={cn(
                "p-2 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5",
                viewMode === "grid"
                  ? "bg-[#00FF66]/15 text-[#00FF66] border border-[#00FF66]/30 shadow-[0_0_12px_rgba(0,255,102,0.2)]"
                  : "text-[#737373] hover:text-[#EDEDED]"
              )}
              title="3D Holographic Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden md:inline text-[11px] font-bold">GRID</span>
            </button>

            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              className={cn(
                "p-2 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5",
                viewMode === "list"
                  ? "bg-[#00FF66]/15 text-[#00FF66] border border-[#00FF66]/30 shadow-[0_0_12px_rgba(0,255,102,0.2)]"
                  : "text-[#737373] hover:text-[#EDEDED]"
              )}
              title="Precision Matrix List View"
            >
              <List className="h-4 w-4" />
              <span className="hidden md:inline text-[11px] font-bold">LIST</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Category Filter Pills Dock */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={cn(
            "relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border",
            category === "all"
              ? "text-[#00FF66] border-[#00FF66]/40 bg-[#00FF66]/10 shadow-[0_0_15px_rgba(0,255,102,0.15)]"
              : "text-[#808080] border-[#222222] bg-[#0A0A0A]/80 hover:text-white hover:border-[#333333]"
          )}
        >
          <span>ALL ASSETS</span>
          <span
            className={cn(
              "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
              category === "all"
                ? "bg-[#00FF66]/20 text-[#00FF66]"
                : "bg-[#181818] text-[#737373]"
            )}
          >
            {totalCount}
          </span>
        </button>

        {categories.map((cat) => {
          const count = categoryCounts[cat] ?? 0;
          const isSelected = category === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={cn(
                "relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border",
                isSelected
                  ? "text-[#00FF66] border-[#00FF66]/40 bg-[#00FF66]/10 shadow-[0_0_15px_rgba(0,255,102,0.15)]"
                  : "text-[#808080] border-[#222222] bg-[#0A0A0A]/80 hover:text-white hover:border-[#333333]"
              )}
            >
              <span>{cat}</span>
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px] font-bold",
                  isSelected
                    ? "bg-[#00FF66]/20 text-[#00FF66]"
                    : "bg-[#181818] text-[#737373]"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}