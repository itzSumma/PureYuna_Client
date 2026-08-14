"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, event: React.MouseEvent) => void;
  onToggleWishlist?: (product: Product, event: React.MouseEvent) => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const isOrganic = product.productType === "ORGANIC";

  return (
    <div
      className="group relative flex h-full flex-col rounded-2xl border border-golden-border bg-[#FAF5F0] hover:shadow-[0_15px_30px_rgba(74,52,32,0.08)] hover:-translate-y-1 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image Frame (Rectangular with subtle rounding) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-2xl bg-taupe/20 p-2">
        <Link
          href={`/products/${product.id}`}
          className="relative block h-full w-full overflow-hidden rounded-xl shadow-sm"
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            unoptimized={true}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"
          />
        </Link>
 
        {/* Floating Heart Button */}
        <button
          type="button"
          onClick={(e) => onToggleWishlist?.(product, e)}
          className={cn(
            "absolute top-4 right-4 z-10 grid size-9 cursor-pointer place-items-center rounded-full border border-white/20 bg-[#FAF5F0]/90 shadow-sm backdrop-blur-xs transition-all duration-300 hover:scale-105 active:scale-95",
            isWishlisted
              ? "text-red-500 bg-[#FAF5F0]"
              : "text-deep-brown/60 hover:text-caramel"
          )}
          aria-label="Add to wishlist"
        >
          <Heart
            className="size-4.5"
            fill={isWishlisted ? "currentColor" : "none"}
            strokeWidth={isWishlisted ? 0 : 2}
          />
        </button>
 
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold tracking-widest uppercase shadow-xs backdrop-blur-sm",
              isOrganic
                ? "bg-ochre/10 text-ochre border border-ochre/20"
                : "bg-caramel/10 text-caramel border border-caramel/20"
            )}
          >
            {isOrganic ? "🌿 Organic" : "🧪 Formulated"}
          </span>
 
          {/* Skin Type Badge */}
          <span className="rounded-full bg-deep-brown/5 text-deep-brown/80 border border-deep-brown/10 px-2.5 py-0.5 text-[0.58rem] font-medium tracking-wider uppercase backdrop-blur-sm w-fit shadow-xs">
            {product.skinType.toLowerCase()}
          </span>
        </div>
 
        {/* Stock Warning Badge */}
        {product.stock <= 0 ? (
          <div className="absolute inset-0 grid place-items-center bg-black/40 rounded-xl backdrop-blur-[1px]">
            <span className="rounded-full bg-[#FAF5F0] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-destructive uppercase shadow-md">
              Out of stock
            </span>
          </div>
        ) : product.stock <= 5 ? (
          <span className="absolute bottom-3 left-3 z-10 rounded-full bg-amber-500/90 px-2 py-0.5 text-[0.58rem] font-bold tracking-wider text-white uppercase shadow-sm">
            Only {product.stock} left
          </span>
        ) : null}
      </div>
 
      {/* Card Details */}
      <div className="flex flex-1 flex-col px-4.5 pt-4 pb-4">
        {/* Category Label */}
        <span className="text-[11px] font-semibold tracking-wider text-deep-brown/70 uppercase">
          {product.category?.name || "Skincare"}
        </span>
 
        {/* Product Title */}
        <Link href={`/products/${product.id}`} className="group/title mt-1.5">
          <h3 className="font-heading text-lg font-normal leading-snug tracking-tight text-balance text-deep-brown group-hover/title:text-caramel transition-colors duration-200 line-clamp-1">
            {product.name}
          </h3>
        </Link>
 
        {/* Description Snippet */}
        <p className="mt-2 text-xs leading-relaxed text-deep-brown/80 line-clamp-2">
          {product.description}
        </p>
 
        {/* Card Footer: Price & Add Button */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-golden-border/60">
          <div className="flex flex-col">
            <span className="text-[0.6rem] text-deep-brown/60 uppercase tracking-widest leading-none">
              Price
            </span>
            <span className="mt-1 text-sm font-semibold text-caramel">
              ${product.price.toFixed(2)}
            </span>
          </div>
 
          <div className="flex items-center gap-2">
            <Link
              href={`/products/${product.id}`}
              className="flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold bg-[#4A1E27] hover:bg-[#3D1B22] text-[#FAF5F0] transition-all duration-200 shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
            >
              View Details
            </Link>
            <button
              type="button"
              disabled={product.stock <= 0}
              onClick={(e) => onAddToCart?.(product, e)}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold bg-caramel hover:bg-caramel/90 text-white transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-sm whitespace-nowrap"
              aria-label="Add to cart"
            >
              <ShoppingBag className="size-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
