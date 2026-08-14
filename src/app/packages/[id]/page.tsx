"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, Sun, Moon, CheckCircle2, ChevronRight } from "lucide-react";
import { FALLBACK_PACKAGES, FallbackPackage } from "@/constants/fallback-data";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Button } from "@/components/ui/button";
import { PackageDetailSkeleton } from "@/components/packages/packages-skeleton";

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const id = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [pkg, setPkg] = useState<FallbackPackage | undefined>(undefined);

  useEffect(() => {
    // Simulate loading for loading skeleton verification
    const timer = setTimeout(() => {
      const found = FALLBACK_PACKAGES.find((p) => p.id === id);
      setPkg(found);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddSetToCart = () => {
    if (!pkg) return;
    pkg.products.forEach((product) => {
      addItem(product);
    });
    showToast(`Added ${pkg.name} set to cart!`, "success");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDF4EE] py-12 px-4 sm:px-6 lg:px-8 text-[#3D1B22]">
        <div className="max-w-6xl mx-auto space-y-12">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A1E27]/60 hover:text-[#4A1E27] transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Packages
          </Link>
          <PackageDetailSkeleton />
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-[#FDF4EE] flex flex-col items-center justify-center text-center p-8 space-y-6 text-[#3D1B22]">
        <span className="text-4xl">🍃</span>
        <h2 className="font-heading text-3xl font-medium text-[#3D1B22]">Package Not Found</h2>
        <p className="text-sm text-charcoal/70 max-w-[40ch]">
          The skincare routine package you are looking for does not exist or has been archived.
        </p>
        <Button variant="default" onClick={() => router.push("/packages")} className="cursor-pointer bg-[#4A1E27] hover:bg-[#3D1B22] text-[#FAF5F0]">
          Back to Packages
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF4EE] text-[#3D1B22] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Back Button */}
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A1E27]/60 hover:text-[#4A1E27] transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Packages
        </Link>

        {/* Package Hero & Overview */}
        <section className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[#FAF5F0] p-2.5 shadow-sm border border-[#EBDCD2]/50">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <ImageWithFallback
                src={pkg.image}
                alt={pkg.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold tracking-[0.25em] text-[#4A1E27] uppercase">
              Curated Set
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-medium text-[#3D1B22] leading-tight">
              {pkg.name}
            </h1>
            <p className="text-[#3D1B22]/80 leading-relaxed font-light">
              {pkg.description}
            </p>

            {/* Pricing Box */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#FAF5F0] border border-[#EBDCD2] w-fit shadow-xs">
              <div className="flex flex-col">
                <span className="text-[0.58rem] text-[#3D1B22]/60 uppercase tracking-widest leading-none">
                  Bundle price
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-[#4A1E27]">${pkg.price.toFixed(2)}</span>
                  <span className="text-sm text-[#3D1B22]/40 line-through">${pkg.originalPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="h-10 w-px bg-[#EBDCD2]" />
              <div className="text-xs font-bold text-[#FAF5F0] bg-[#4A1E27] px-3 py-1.5 rounded-lg shadow-sm">
                You Save ${(pkg.originalPrice - pkg.price).toFixed(2)}!
              </div>
            </div>

            <Button
              onClick={handleAddSetToCart}
              variant="default"
              className="w-full sm:w-auto h-12 px-8 text-sm font-semibold cursor-pointer flex items-center justify-center gap-2 bg-[#4A1E27] hover:bg-[#3D1B22] text-[#FAF5F0]"
            >
              <ShoppingBag className="size-4" />
              Add Full Set to Cart
            </Button>
          </div>
        </section>

        {/* Routine Steps (AM/PM Grid) */}
        <section className="space-y-8 border-t border-[#EBDCD2] pt-16">
          <div className="text-center space-y-2">
            <h2 className="font-heading text-3xl font-medium text-[#3D1B22]">
              How to Use: The Ritual
            </h2>
            <p className="text-sm text-[#3D1B22]/60">
              Follow this AM/PM application sequence to achieve optimal skin synergy and results.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* AM Routine */}
            <div className="bg-[#FAF5F0] border border-[#EBDCD2] p-8 rounded-3xl space-y-6 shadow-xs">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#EBDCD2] text-[#3D1B22]">
                <Sun className="size-5 text-[#4A1E27]" />
                <h3 className="font-heading text-xl font-medium text-[#3D1B22]">AM Routine</h3>
              </div>
              <ol className="space-y-4">
                {pkg.steps.am.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-[#3D1B22]/90 leading-relaxed font-light">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#4A1E27] text-[#FAF5F0] text-xs font-bold shadow-xs">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* PM Routine */}
            <div className="bg-[#FAF5F0] border border-[#EBDCD2] p-8 rounded-3xl space-y-6 shadow-xs">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#EBDCD2] text-[#3D1B22]">
                <Moon className="size-5 text-[#4A1E27]" />
                <h3 className="font-heading text-xl font-medium text-[#3D1B22]">PM Routine</h3>
              </div>
              <ol className="space-y-4">
                {pkg.steps.pm.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-[#3D1B22]/90 leading-relaxed font-light">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#4A1E27] text-[#FAF5F0] text-xs font-bold shadow-xs">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Included Products List */}
        <section className="space-y-8 border-t border-[#EBDCD2] pt-16">
          <h2 className="font-heading text-2xl font-medium text-[#3D1B22] text-center md:text-left">
            Products in this Bundle
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pkg.products.map((product) => {
              const isOrganic = product.productType === "ORGANIC";
              return (
                <div
                  key={product.id}
                  className="flex flex-col border border-[#EBDCD2] bg-[#FAF5F0] rounded-2xl p-4 space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#FAF6F2]">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <span className="absolute top-2 left-2 rounded-full bg-[#FAF5F0]/90 px-2 py-0.5 text-[0.58rem] font-bold text-[#3D1B22] uppercase shadow-xs border border-[#EBDCD2]/50">
                      {isOrganic ? "🌿 Organic" : "🧪 Formulated"}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading text-lg font-medium text-[#3D1B22] line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-charcoal/80 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#EBDCD2]/60 mt-3">
                      <span className="text-sm font-bold text-[#3D1B22]">
                        ${product.price.toFixed(2)}
                      </span>
                      <Link
                        href={`/products/${product.id}`}
                        className="text-xs font-bold text-[#4A1E27] hover:text-[#3D1B22] uppercase flex items-center gap-0.5"
                      >
                        View
                        <ChevronRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

