import React from "react";
import { Filter, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  activeSort: string;
  handleSortChange: (val: string) => void;
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
  activeSort,
  handleSortChange,
}: FilterDrawerProps) {
  return (
    <div className="flex items-center justify-between border-b border-taupe/40 pb-4 lg:hidden">
      <Sheet>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 cursor-pointer border-taupe text-cocoa"
            >
              <Filter className="size-4" />
              Filters
            </Button>
          }
        />
        <SheetContent side="left" className="w-80 bg-[#D4937A] text-[#3A2820] border-r border-[#C58068]">
          <SheetHeader className="border-b border-[#C58068] pb-4 text-left">
            <SheetTitle className="font-heading text-2xl font-medium text-[#3A2820] flex items-center gap-2">
              <SlidersHorizontal className="size-5" />
              Filters
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 py-6 overflow-y-auto max-h-[80vh] px-1">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="space-y-2">
              <Label className="text-[0.62rem] font-bold tracking-widest text-[#3A2820]/80 uppercase">
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
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-[#3A2820]/60">
                  <Search className="size-4" />
                </button>
              </div>
            </form>

            {/* Mobile Category */}
            <div className="space-y-3">
              <Label className="text-[0.62rem] font-bold tracking-widest text-[#3A2820]/80 uppercase">
                Category
              </Label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCategoryChange("ALL")}
                  className={`text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
                    !activeCategory
                      ? "bg-[#FAF5EF] text-[#3A2820] font-semibold border border-[#C58068]"
                      : "text-[#4A3528] hover:bg-[#FAF5EF]/10"
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
                        ? "bg-[#FAF5EF] text-[#3A2820] font-semibold border border-[#C58068]"
                        : "text-[#4A3528] hover:bg-[#FAF5EF]/10"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Skin Type */}
            <div className="space-y-3">
              <Label className="text-[0.62rem] font-bold tracking-widest text-[#3A2820]/80 uppercase">
                Skin Type
              </Label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleSkinTypeChange("ALL")}
                  className={`text-left text-sm py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer ${
                    !activeSkinType
                      ? "bg-[#FAF5EF] text-[#3A2820] font-semibold border border-[#C58068]"
                      : "text-[#4A3528] hover:bg-[#FAF5EF]/10"
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
                        ? "bg-[#FAF5EF] text-[#3A2820] font-semibold border border-[#C58068]"
                        : "text-[#4A3528] hover:bg-[#FAF5EF]/10"
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
                className="w-full mt-4 flex items-center justify-center gap-2 border-terracotta text-terracotta cursor-pointer"
              >
                <RotateCcw className="size-4" />
                Clear All Filters
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Sort Dropdown */}
      <select
        value={activeSort || "DEFAULT"}
        onChange={(e) => handleSortChange(e.target.value)}
        className="h-9 rounded-lg border border-taupe px-3 bg-transparent text-xs text-cocoa focus-visible:ring-0 focus-visible:border-terracotta outline-none cursor-pointer"
      >
        <option value="DEFAULT">Recommended</option>
        <option value={ProductSort.PRICE_LOW}>Price: Low to High</option>
        <option value={ProductSort.PRICE_HIGH}>Price: High to Low</option>
        <option value={ProductSort.NEWEST}>Newest</option>
      </select>
    </div>
  );
}
