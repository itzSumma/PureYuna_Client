"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Sparkles, CheckCircle2 } from "lucide-react";
import { FALLBACK_PACKAGES, FallbackPackage } from "@/constants/fallback-data";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Button } from "@/components/ui/button";
import { packageService } from "@/services/package.service";
import { PackagesListSkeleton } from "@/components/packages/packages-skeleton";

export default function PackagesPage() {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const [packages, setPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await packageService.getPackages();
        if (data && data.length > 0) {
          setPackages(data);
        } else {
          setPackages(FALLBACK_PACKAGES);
        }
      } catch (err) {
        console.warn("Failed to fetch packages from API, using fallback data:", err);
        setPackages(FALLBACK_PACKAGES);
      } finally {
        setIsLoading(false);
      }
    }
    loadPackages();
  }, []);

  const handleAddSetToCart = (pkg: any, e: React.MouseEvent) => {
    e.preventDefault();
    pkg.products.forEach((product: any) => {
      addItem(product);
    });
    showToast(`Added all items from ${pkg.name} to cart!`, "success");
  };

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#3D1B22] bg-[#FDF4EE]">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-[0.25em] text-[#4A1E27] uppercase">
            Curated Rituals
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-medium tracking-tight text-[#3D1B22]">
            Ready-Made Routines
          </h1>
          <p className="text-charcoal/80 leading-relaxed font-light text-sm">
            Unlock maximum potency and seamless product synergy with our expert-curated skincare packages, complete with built-in bundle discounts.
          </p>
        </header>

        {/* Packages Grid */}
        {isLoading ? (
          <PackagesListSkeleton />
        ) : (
          <div className="grid gap-12 lg:grid-cols-3">
            {packages.map((pkg) => {
              const discount = pkg.originalPrice - pkg.price;
              return (
                <div
                  key={pkg.id}
                  className="group relative flex flex-col rounded-3xl border border-[#EBDCD2] bg-[#FAF5F0] text-[#3D1B22] overflow-hidden transition-all duration-300 hover:bg-[#4A1E27] hover:text-[#FAF5F0] hover:shadow-[0_15px_30px_rgba(74,30,39,0.12)] hover:-translate-y-1"
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
                    {discount > 0 && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="rounded-full bg-[#4A1E27] px-3 py-1 text-[0.62rem] font-bold tracking-widest text-[#FAF5F0] uppercase shadow-sm flex items-center gap-1 group-hover:bg-[#FAF5F0] group-hover:text-[#4A1E27] transition-colors duration-300">
                          <Sparkles className="size-3" />
                          Save ${discount.toFixed(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-6 space-y-6">
                    <div className="space-y-2">
                      <span className="text-[0.62rem] font-semibold tracking-[0.2em] text-[#3D1B22]/70 group-hover:text-[#FAF5F0]/80 uppercase transition-colors duration-300">
                        {pkg.products.length}-Step System
                      </span>
                      <Link href={`/packages/${pkg.id}`} className="block group/title">
                        <h3 className="font-heading text-2xl font-medium text-[#3D1B22] leading-tight group-hover:text-[#FAF5F0] transition-colors duration-300">
                          {pkg.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#3D1B22]/80 group-hover:text-[#FAF5F0]/90 leading-relaxed font-light line-clamp-3 transition-colors duration-300">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Items Included */}
                    <div className="space-y-2 pt-2 border-t border-[#EBDCD2]/60 group-hover:border-[#FAF5F0]/20 transition-colors duration-300">
                      <span className="text-[0.58rem] font-bold tracking-widest text-[#3D1B22]/60 group-hover:text-[#FAF5F0]/70 uppercase transition-colors duration-300">
                        Includes
                      </span>
                      <ul className="space-y-1.5">
                        {pkg.products.slice(0, 3).map((prod: any) => (
                          <li key={prod.id} className="flex items-center gap-2 text-xs text-[#3D1B22]/90 group-hover:text-[#FAF5F0]/90 transition-colors duration-300">
                            <CheckCircle2 className="size-3.5 text-[#4A1E27] shrink-0 group-hover:text-[#FAF5F0] transition-colors duration-300" />
                            <span className="truncate">{prod.name}</span>
                          </li>
                        ))}
                        {pkg.products.length > 3 && (
                          <li className="text-[0.68rem] text-[#3D1B22]/60 group-hover:text-[#FAF5F0]/70 font-semibold uppercase tracking-wider pl-5">
                            + {pkg.products.length - 3} More Formula(s)
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Price and Cart Action */}
                    <div className="mt-auto pt-4 flex items-center justify-between gap-4 border-t border-[#EBDCD2]/60 group-hover:border-[#FAF5F0]/20 transition-colors duration-300">
                      <div className="flex flex-col">
                        <span className="text-[0.58rem] text-[#3D1B22]/60 group-hover:text-[#FAF5F0]/70 uppercase tracking-widest leading-none transition-colors duration-300">
                          Bundle Price
                        </span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-xl font-bold text-[#4A1E27] group-hover:text-[#FAF5F0] transition-colors duration-300">
                            ${pkg.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-[#3D1B22]/50 group-hover:text-[#FAF5F0]/60 line-through transition-colors duration-300">
                            ${pkg.originalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 w-1/2">
                        <button
                          type="button"
                          onClick={(e) => handleAddSetToCart(pkg, e)}
                          className="flex items-center justify-center gap-1.5 rounded-lg bg-[#4A1E27] text-[#FAF5F0] px-3 py-2 text-xs font-semibold hover:bg-[#3D1B22] transition-all duration-300 group-hover:bg-[#FAF5F0] group-hover:text-[#4A1E27] active:scale-95 cursor-pointer w-full"
                        >
                          <ShoppingBag className="size-3.5" />
                          Add Set
                        </button>
                        <Link
                          href={`/packages/${pkg.id}`}
                          className="text-[0.62rem] font-bold text-center tracking-wider text-[#4A1E27] hover:text-[#4A1E27]/80 group-hover:text-[#FAF5F0] group-hover:hover:text-[#FAF5F0]/80 uppercase flex items-center justify-center gap-1 transition-colors duration-300"
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
        )}
      </div>
    </div>
  );
}

