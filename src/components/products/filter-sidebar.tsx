import React from "react";
import { ChevronDown, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  sortBy: string;
  setSortBy: (val: string) => void;
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
  sortBy,
  setSortBy,
  isOrganic,
}: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block space-y-7 pr-4">
      <div className="flex items-center justify-between border-b border-golden-border/60 pb-3">
        <h2 className="font-heading text-2xl font-medium text-deep-brown flex items-center gap-2">
          <SlidersHorizontal className="size-4.5 text-deep-brown/80" />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-caramel hover:text-caramel/80 cursor-pointer transition-colors"
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
            className="absolute right-0 top-1/2 -translate-y-1/2 text-deep-brown/50 hover:text-deep-brown cursor-pointer animate-none"
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
                  ? "bg-[#C9974E]/15 text-[#C9974E] font-semibold"
                  : "bg-[#8B6230]/15 text-[#8B6230] font-semibold"
                : "text-deep-brown/70 hover:bg-deep-brown/5"
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
                    ? "bg-[#C9974E]/15 text-[#C9974E] font-semibold"
                    : "bg-[#8B6230]/15 text-[#8B6230] font-semibold"
                  : "text-deep-brown/70 hover:bg-deep-brown/5"
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
                  ? "bg-[#C9974E]/15 text-[#C9974E] font-semibold"
                  : "bg-[#8B6230]/15 text-[#8B6230] font-semibold"
                : "text-deep-brown/70 hover:bg-deep-brown/5"
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
                    ? "bg-[#C9974E]/15 text-[#C9974E] font-semibold"
                    : "bg-[#8B6230]/15 text-[#8B6230] font-semibold"
                  : "text-deep-brown/70 hover:bg-deep-brown/5"
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
        <Select value={sortBy} onValueChange={(val) => setSortBy(val || "recommended")}>
          <SelectTrigger className="w-full h-10 border border-golden-border bg-[#FAF5F0] hover:bg-[#FAF5F0]/80 text-[#3D1B22] focus:ring-2 focus:ring-[#8B6230]/40 transition-all cursor-pointer">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-[#FAF5F0] border border-[#EBDCD2]">
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest Arrivals</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
}
