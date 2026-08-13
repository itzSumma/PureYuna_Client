import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/types/product";

interface ProductsGridProps {
  loading: boolean;
  error: string | null;
  products: Product[];
  wishlistIds: string[];
  handleAddToCart: (product: Product, event: React.MouseEvent) => void;
  handleToggleWishlist: (product: Product, event: React.MouseEvent) => void;
  activePage: number;
  totalPages: number;
  totalProducts: number;
  updateUrlParams: (newParams: Record<string, string | null>) => void;
  handleResetFilters: () => void;
  hasActiveFilters: boolean;
  retryLoading: () => void;
}

export function ProductsGrid({
  loading,
  error,
  products,
  wishlistIds,
  handleAddToCart,
  handleToggleWishlist,
  activePage,
  totalPages,
  totalProducts,
  updateUrlParams,
  handleResetFilters,
  hasActiveFilters,
  retryLoading,
}: ProductsGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-2xl border border-taupe/40 bg-cream p-4 space-y-4 animate-pulse"
          >
            <Skeleton className="aspect-[4/5] w-full rounded-t-full rounded-b-lg" />
            <Skeleton className="h-4 w-1/4 rounded-md" />
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center">
        <h3 className="text-lg font-semibold text-red-800">Connection Error</h3>
        <p className="mt-2 text-sm text-red-600">{error}</p>
        <Button
          onClick={retryLoading}
          variant="outline"
          className="mt-4 border-red-300 text-red-800 hover:bg-red-50 cursor-pointer"
        >
          Retry Loading
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-taupe/40 bg-cream/40 px-6 py-16 text-center shadow-xs">
        <span className="text-4xl" role="img" aria-label="leaf">
          🍃
        </span>
        <h3 className="mt-4 font-heading text-2xl font-medium text-cocoa">
          No products found
        </h3>
        <p className="mt-2 text-sm text-charcoal/70 max-w-[40ch] mx-auto">
          We couldn't find any products matching your active filters. Try refining your selections or reset filters.
        </p>
        {hasActiveFilters && (
          <Button
            onClick={handleResetFilters}
            variant="default"
            className="mt-6 font-medium cursor-pointer"
          >
            Reset Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* PRODUCTS GRID LIST */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(product.id)}
          />
        ))}
      </div>

      {/* PAGINATION PANEL */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-taupe/40 pt-6">
          <span className="text-xs text-muted-foreground font-medium">
            Showing Page <strong className="text-cocoa">{activePage}</strong> of{" "}
            <strong className="text-cocoa">{totalPages}</strong> ({totalProducts} items)
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer border-taupe text-cocoa disabled:opacity-40"
              disabled={activePage <= 1}
              onClick={() => updateUrlParams({ page: String(activePage - 1) })}
            >
              <ArrowLeft className="size-4 mr-1.5" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer border-taupe text-cocoa disabled:opacity-40"
              disabled={activePage >= totalPages}
              onClick={() => updateUrlParams({ page: String(activePage + 1) })}
            >
              Next
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
