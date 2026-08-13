import React from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INPUT_UNDERLINE } from "@/constants/design-tokens";
import { Category, ProductSort, SkinType } from "@/types/product";

interface FilterSidebarProps {
  hasActiveFilters: boolean;
  handleResetFilters: () => void;
  searchText: string;
  setSearchText: (val: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  categories: Category[];
  activeCategory: string;
  handleCategoryChange: (id: string) => void;
  activeSkinType: string;
  handleSkinTypeChange: (type: string) => void;
  activeSort: string;
  handleSortChange: (val: string) => void;
  isOrganic: boolean;
}

export function FilterSidebar({
  hasActiveFilters,
  handleResetFilters,
  searchText,
  setSearchText,
  handleSearchSubmit,
  categories,
  activeCategory,
  handleCategoryChange,
  activeSkinType,
  handleSkinTypeChange,
  activeSort,
  handleSortChange,
  isOrganic,
}: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block space-y-7 pr-4">
      <div className="flex items-center justify-between border-b border-taupe/60 pb-3">
        <h2 className="font-heading text-2xl font-medium text-cocoa flex items-center gap-2">
          <SlidersHorizontal className="size-4.5 text-cocoa/80" />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-terracotta hover:text-ochre cursor-pointer transition-colors"
          >
            <RotateCcw className="size-3" />
            Reset
          </button>
        )}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="space-y-2">
        <Label className="text-[0.62rem] font-bold tracking-widest text-muted-foreground uppercase">
          Search
        </Label>
        <div className="relative">
          <Input
            type="text"
            placeholder="Find products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={INPUT_UNDERLINE}
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-cocoa/50 hover:text-cocoa cursor-pointer animate-none"
            aria-label="Submit search"
          >
            <Search className="size-4" />
          </button>
        </div>
      </form>

      {/* Category Filter */}
      <div className="space-y-3">
        <Label className="text-[0.62rem] font-bold tracking-widest text-muted-foreground uppercase">
          Category
        </Label>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleCategoryChange("ALL")}
            className={`text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
              !activeCategory
                ? isOrganic
                  ? "bg-terracotta/10 text-terracotta font-semibold"
                  : "bg-formulated-primary/10 text-formulated-primary font-semibold"
                : "text-charcoal/70 hover:bg-charcoal/5"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? isOrganic
                    ? "bg-terracotta/10 text-terracotta font-semibold"
                    : "bg-formulated-primary/10 text-formulated-primary font-semibold"
                  : "text-charcoal/70 hover:bg-charcoal/5"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Skin Type Filter */}
      <div className="space-y-3">
        <Label className="text-[0.62rem] font-bold tracking-widest text-muted-foreground uppercase">
          Skin Type
        </Label>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleSkinTypeChange("ALL")}
            className={`text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
              !activeSkinType
                ? isOrganic
                  ? "bg-terracotta/10 text-terracotta font-semibold"
                  : "bg-formulated-primary/10 text-formulated-primary font-semibold"
                : "text-charcoal/70 hover:bg-charcoal/5"
            }`}
          >
            All Skin Types
          </button>
          {Object.values(SkinType).map((type) => (
            <button
              key={type}
              onClick={() => handleSkinTypeChange(type)}
              className={`text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
                activeSkinType === type
                  ? isOrganic
                    ? "bg-terracotta/10 text-terracotta font-semibold"
                    : "bg-formulated-primary/10 text-formulated-primary font-semibold"
                  : "text-charcoal/70 hover:bg-charcoal/5"
              }`}
            >
              {type.charAt(0) + type.slice(1).toLowerCase()} Skin
            </button>
          ))}
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-3">
        <Label className="text-[0.62rem] font-bold tracking-widest text-muted-foreground uppercase">
          Sort By
        </Label>
        <select
          value={activeSort || "DEFAULT"}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full h-10 rounded-lg border border-taupe px-3 bg-transparent text-sm text-cocoa focus-visible:ring-0 focus-visible:border-terracotta outline-none cursor-pointer"
        >
          <option value="DEFAULT">Recommended</option>
          <option value={ProductSort.PRICE_LOW}>Price: Low to High</option>
          <option value={ProductSort.PRICE_HIGH}>Price: High to Low</option>
          <option value={ProductSort.NEWEST}>Newest Arrivals</option>
        </select>
      </div>
    </aside>
  );
}
