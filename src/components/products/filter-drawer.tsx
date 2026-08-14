import React from "react";
import { ChevronDown, Filter, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { INPUT_UNDERLINE } from "@/constants/design-tokens";
import { Category, ProductSort, SkinType } from "@/types/product";

interface FilterDrawerProps {
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
  isOrganic: boolean;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export function FilterDrawer({
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
  isOrganic,
  sortBy,
  setSortBy,
}: FilterDrawerProps) {
  return (
    <div className="flex items-center justify-between border-b border-golden-border/40 pb-4 lg:hidden">
      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 cursor-pointer border-golden-border text-deep-brown hover:bg-deep-brown/5"
            >
              <Filter className="size-4" />
              Filters
            </Button>
          }
        />
        <SheetContent side="left" className="w-80 bg-champagne text-deep-brown border-r border-golden-border">
          <SheetHeader className="border-b border-golden-border/40 pb-4 text-left">
            <SheetTitle className="font-heading text-2xl font-medium text-deep-brown flex items-center gap-2">
              <SlidersHorizontal className="size-5" />
              Filters
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 py-6 overflow-y-auto max-h-[80vh] px-1">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="space-y-2">
              <Label className="text-[0.62rem] font-bold tracking-widest text-deep-brown/80 uppercase">
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
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-deep-brown/60">
                  <Search className="size-4" />
                </button>
              </div>
            </form>

            {/* Mobile Category */}
            <div className="space-y-3">
              <Label className="text-[0.62rem] font-bold tracking-widest text-deep-brown/80 uppercase">
                Category
              </Label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCategoryChange("ALL")}
                  className={`text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
                    !activeCategory
                      ? "bg-[#FFF9EE] text-[#4A3420] font-semibold border border-golden-border"
                      : "text-deep-brown/95 hover:bg-deep-brown/5"
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
                        ? "bg-[#FFF9EE] text-[#4A3420] font-semibold border border-golden-border"
                        : "text-deep-brown/95 hover:bg-deep-brown/5"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Skin Type */}
            <div className="space-y-3">
              <Label className="text-[0.62rem] font-bold tracking-widest text-deep-brown/80 uppercase">
                Skin Type
              </Label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleSkinTypeChange("ALL")}
                  className={`text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
                    !activeSkinType
                      ? "bg-[#FFF9EE] text-[#4A3420] font-semibold border border-golden-border"
                      : "text-deep-brown/95 hover:bg-deep-brown/5"
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
                        ? "bg-[#FFF9EE] text-[#4A3420] font-semibold border border-golden-border"
                        : "text-deep-brown/95 hover:bg-deep-brown/5"
                    }`}
                  >
                    {type.charAt(0) + type.slice(1).toLowerCase()} Skin
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Reset */}
            {hasActiveFilters && (
              <Button
                onClick={handleResetFilters}
                variant="outline"
                className="w-full mt-4 flex items-center justify-center gap-2 border-caramel text-caramel cursor-pointer hover:bg-caramel/5"
              >
                <RotateCcw className="size-4" />
                Clear All Filters
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Sort Dropdown */}
      <div className="relative min-w-[140px]">
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
    </div>
  );
}
