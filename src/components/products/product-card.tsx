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
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border transition-all duration-300",
        isOrganic
          ? "border-taupe/40 bg-cream hover:shadow-[0_15px_30px_rgba(58,40,32,0.08)] hover:-translate-y-1"
          : "border-formulated-surface/40 bg-formulated-bg hover:shadow-[0_15px_30px_rgba(142,93,32,0.06)] hover:-translate-y-1"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image Frame (Asymmetric Arch Mask) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[1.5rem] rounded-b-[0.75rem] bg-taupe/20 p-2">
        <Link
          href={`/products/${product.id}`}
          className="relative block h-full w-full overflow-hidden rounded-t-full rounded-b-[0.5rem] shadow-sm"
        >
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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
            "absolute top-4 right-4 z-10 grid size-9 cursor-pointer place-items-center rounded-full border border-white/20 bg-white/90 shadow-sm backdrop-blur-xs transition-all duration-300 hover:scale-105 active:scale-95",
            isWishlisted
              ? "text-red-500 bg-white"
              : "text-cocoa/60 hover:text-terracotta"
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
              "rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold tracking-widest uppercase shadow-sm backdrop-blur-xs",
              isOrganic
                ? "bg-cream/90 text-terracotta border border-terracotta/20"
                : "bg-formulated-bg/95 text-formulated-primary border border-formulated-primary/20"
            )}
          >
            {isOrganic ? "🌿 Organic" : "🧪 Formulated"}
          </span>

          {/* Skin Type Badge */}
          <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[0.58rem] font-medium tracking-wider text-cocoa/70 uppercase backdrop-blur-xs w-fit">
            {product.skinType.toLowerCase()}
          </span>
        </div>

        {/* Stock Warning Badge */}
        {product.stock <= 0 ? (
          <div className="absolute inset-0 grid place-items-center bg-black/40 rounded-t-full rounded-b-[0.5rem] backdrop-blur-[1px]">
            <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold tracking-wider text-destructive uppercase shadow-md">
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
        <span className="text-[0.62rem] font-semibold tracking-[0.2em] text-cocoa/40 uppercase">
          {product.category?.name || "Skincare"}
        </span>

        {/* Product Title */}
        <Link href={`/products/${product.id}`} className="group/title mt-1.5">
          <h3
            className={cn(
              "font-heading text-lg font-medium leading-snug tracking-tight text-balance group-hover/title:text-terracotta transition-colors duration-200 line-clamp-1",
              isOrganic ? "text-cocoa" : "text-formulated-text"
            )}
          >
            {product.name}
          </h3>
        </Link>

        {/* Description Snippet */}
        <p className="mt-2 text-xs leading-relaxed text-charcoal/60 line-clamp-2">
          {product.description}
        </p>

        {/* Card Footer: Price & Add Button */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-2 border-t border-taupe/20">
          <div className="flex flex-col">
            <span className="text-[0.6rem] text-muted-foreground uppercase tracking-widest leading-none">
              Price
            </span>
            <span className="mt-1 text-base font-bold text-terracotta">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={(e) => onAddToCart?.(product, e)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
              isOrganic
                ? "bg-terracotta text-cream hover:bg-ochre active:scale-95"
                : "bg-formulated-primary text-formulated-bg hover:bg-formulated-accent active:scale-95"
            )}
            aria-label="Add to cart"
          >
            <ShoppingBag className="size-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
