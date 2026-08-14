"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles, CheckCircle2 } from "lucide-react";
import { FALLBACK_PACKAGES, FallbackPackage } from "@/constants/fallback-data";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Button } from "@/components/ui/button";

export default function PackagesPage() {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const handleAddSetToCart = (pkg: FallbackPackage, e: React.MouseEvent) => {
    e.preventDefault();
    pkg.products.forEach((product) => {
      addItem(product);
    });
    showToast(`Added all items from ${pkg.name} to cart!`, "success");
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
          Curated Rituals
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-medium tracking-tight text-cocoa">
          Ready-Made Routines
        </h1>
        <p className="text-charcoal/70 leading-relaxed font-light">
          Unlock maximum potency and seamless product synergy with our expert-curated skincare packages, complete with built-in bundle discounts.
        </p>
      </header>

      {/* Packages Grid */}
      <div className="grid gap-12 lg:grid-cols-3">
        {FALLBACK_PACKAGES.map((pkg) => {
          return (
            <div
              key={pkg.id}
              className="group relative flex flex-col rounded-3xl border border-taupe/40 bg-cream overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_rgba(58,40,32,0.08)] hover:-translate-y-1"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-taupe/20 p-2">
                <Link
                  href={`/packages/${pkg.id}`}
                  className="relative block h-full w-full overflow-hidden rounded-2xl shadow-sm"
                >
                  <ImageWithFallback
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                  />
                </Link>

                {/* Bundle Discount Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="rounded-full bg-terracotta px-3 py-1 text-[0.62rem] font-bold tracking-widest text-cream uppercase shadow-sm flex items-center gap-1">
                    <Sparkles className="size-3" />
                    Save ${(pkg.originalPrice - pkg.price).toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-[0.62rem] font-semibold tracking-[0.2em] text-terracotta uppercase">
                    {pkg.products.length}-Step System
                  </span>
                  <Link href={`/packages/${pkg.id}`} className="block group/title">
                    <h3 className="font-heading text-2xl font-medium text-cocoa leading-tight group-hover/title:text-terracotta transition-colors duration-200">
                      {pkg.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-charcoal/70 leading-relaxed line-clamp-3">
                    {pkg.description}
                  </p>
                </div>

                {/* Items Included */}
                <div className="space-y-2 pt-2 border-t border-taupe/20">
                  <span className="text-[0.58rem] font-bold tracking-widest text-cocoa/40 uppercase">
                    Includes
                  </span>
                  <ul className="space-y-1.5">
                    {pkg.products.map((prod) => (
                      <li key={prod.id} className="flex items-center gap-2 text-xs text-charcoal/80">
                        <CheckCircle2 className="size-3.5 text-terracotta shrink-0" />
                        <span className="truncate">{prod.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and Cart Action */}
                <div className="mt-auto pt-4 flex items-center justify-between gap-4 border-t border-taupe/20">
                  <div className="flex flex-col">
                    <span className="text-[0.58rem] text-muted-foreground uppercase tracking-widest leading-none">
                      Bundle Price
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xl font-bold text-terracotta">
                        ${pkg.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-charcoal/40 line-through">
                        ${pkg.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-1/2">
                    <button
                      type="button"
                      onClick={(e) => handleAddSetToCart(pkg, e)}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-terracotta text-cream px-3 py-2 text-xs font-semibold hover:bg-ochre transition-colors active:scale-95 cursor-pointer w-full"
                    >
                      <ShoppingBag className="size-3.5" />
                      Add Set
                    </button>
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="text-[0.62rem] font-bold text-center tracking-wider text-cocoa hover:text-terracotta uppercase flex items-center justify-center gap-1"
                    >
                      Details
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
