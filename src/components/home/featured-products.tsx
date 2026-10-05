"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag, Sparkles } from "lucide-react";

import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Reveal } from "@/components/shared/reveal";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { productService } from "@/services/product.service";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import type { Product } from "@/types/product";
import { ProductSort } from "@/types/product";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlistIds = useWishlistStore((state) => state.productIds);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    let isMounted = true;

    async function loadFeaturedProducts() {
      try {
        setLoading(true);
        const response = await productService.getProducts({
          limit: 3,
          sort: ProductSort.NEWEST,
        });

        if (isMounted && response?.data) {
          const normalized = response.data.slice(0, 3).map((p) => ({
            ...p,
            rating: p.rating ?? 4.9,
            image: p.image || "/product-placeholder.jpg",
          }));
          setProducts(normalized);
        }
      } catch (error) {
        console.error("Failed to load best seller products:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFeaturedProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    addItem(product);
    showToast(`Added ${product.name} to cart!`, "success");
  };

  const handleToggleWishlist = async (product: Product, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const isWishlisted = wishlistIds.includes(product.id);
    await toggleWishlist(product);
    if (isWishlisted) {
      showToast("Removed from wishlist.", "info");
    } else {
      showToast("Added to wishlist!", "success");
    }
  };

  return (
    <section className="relative overflow-hidden bg-transparent pt-20 pb-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 sm:pb-16">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-bold tracking-[0.24em] text-[#4A1E24] uppercase">
                <Sparkles className="size-3.5 text-[#4A1E24]" />
                Best Sellers & Treatments
              </p>
              <h2 className="mt-3.5 font-heading text-3xl font-medium tracking-tight text-[#241815] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                <span className="text-[#4A1E24] font-serif italic">Personalized</span> formulas for healthier,{" "}
                <span className="text-[#4A1E24] font-serif italic">radiant</span> skin
              </h2>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center justify-center self-start md:self-end rounded-full bg-[#4A1E24] hover:bg-[#3D1B22] text-[#FAF6F0] px-7 py-3 text-xs font-bold tracking-widest uppercase shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 whitespace-nowrap cursor-pointer"
            >
              View All Treatments
            </Link>
          </div>
        </Reveal>

        {/* 3-Column Staggered Podium Layout */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-full flex flex-col justify-between rounded-3xl border border-[#EADBCE] bg-white p-5 sm:p-6 space-y-4",
                  idx === 1 &&
                    "md:-translate-y-6 md:scale-[1.03] transition-transform duration-300 z-10 shadow-[0_20px_50px_rgba(74,30,36,0.12)] bg-white border-[#4A1E24]/30"
                )}
              >
                <Skeleton className="h-64 w-full rounded-2xl bg-[#4A1E24]/5" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton className="h-4 w-1/4 rounded-md bg-[#4A1E24]/5" />
                  <Skeleton className="h-4 w-16 rounded-md bg-[#4A1E24]/5" />
                </div>
                <Skeleton className="h-6 w-3/4 rounded-md bg-[#4A1E24]/5" />
                <Skeleton className="h-4 w-full rounded-md bg-[#4A1E24]/5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-8">
            {products.map((product, index) => {
              const isFeatured = index === 1;
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <Reveal key={product.id} delay={index * 0.12} className="h-full flex flex-col">
                  {/* Single Main Card Container with Podium Lift and Hover Depth */}
                  <div
                    className={cn(
                      "group relative h-full flex flex-col justify-between rounded-3xl bg-white border border-[#EADBCE] p-5 sm:p-6 transition-all duration-500 ease-out",
                      isFeatured
                        ? "md:-translate-y-6 md:scale-[1.03] z-10 shadow-[0_20px_50px_rgba(74,30,36,0.12)] border-[#4A1E24]/30 hover:md:-translate-y-8 hover:md:scale-[1.04] hover:shadow-[0_30px_60px_rgba(74,30,36,0.18)]"
                        : "shadow-sm hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(74,30,36,0.12)]"
                    )}
                  >
                    {/* Featured Center Badge */}
                    {isFeatured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4A1E24] px-4 py-1 text-[0.68rem] font-bold tracking-widest text-[#FAF6F0] uppercase shadow-md">
                          <Sparkles className="size-3" />
                          #1 Best Seller
                        </span>
                      </div>
                    )}

                    {/* Fixed Aspect Image Frame with Uniform Padding & Overflow Hidden */}
                    <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-[#FAF6F0] shrink-0">
                      <Link
                        href={`/products/${product.id}`}
                        className="relative block h-full w-full overflow-hidden"
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                          unoptimized={true}
                        />

                        {/* Shimmer Light Reflection Sweep */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"
                        />
                      </Link>

                      {/* Wishlist Button with Heart Pop Animation */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleWishlist(product, e)}
                        className={cn(
                          "absolute top-3.5 right-3.5 z-20 grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 backdrop-blur-md shadow-xs transition-all duration-200 hover:scale-110 active:scale-90",
                          isWishlisted
                            ? "text-red-500 bg-white"
                            : "text-[#7A6B66] hover:text-[#4A1E24]"
                        )}
                        aria-label="Add to wishlist"
                      >
                        <Heart
                          className="size-4 transition-transform duration-200"
                          fill={isWishlisted ? "currentColor" : "none"}
                          strokeWidth={isWishlisted ? 0 : 2}
                        />
                      </button>

                      {/* Hover Quick Add Pill Button (Slide-in Transition) */}
                      <div className="absolute inset-x-4 bottom-4 z-20 transition-all duration-300 ease-out opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0">
                        <button
                          type="button"
                          disabled={product.stock <= 0}
                          onClick={(e) => handleAddToCart(product, e)}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#4A1E24] hover:bg-[#38151A] text-[#FAF6F0] py-3 px-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingBag className="size-3.5" />
                          {product.stock <= 0 ? "Out of Stock" : "Quick Add"}
                        </button>
                      </div>
                    </div>

                    {/* Nested Card Content with padding */}
                    <div className="mt-4 flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold tracking-widest text-[#7A6B66] uppercase">
                            {product.category?.name || "Skincare"}
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-[#4A1E24]">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>

                        <Link href={`/products/${product.id}`} className="group/title mt-2 block">
                          <h3 className="font-heading text-lg sm:text-xl font-medium leading-snug tracking-tight text-[#241815] group-hover/title:text-[#4A1E24] transition-colors duration-300 line-clamp-1">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#7A6B66] line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
