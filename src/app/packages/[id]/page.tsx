"use client";

import React, { use } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, Sun, Moon, CheckCircle2, ChevronRight } from "lucide-react";
import { FALLBACK_PACKAGES, FallbackPackage } from "@/constants/fallback-data";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Button } from "@/components/ui/button";

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  const id = params.id as string;
  const pkg = FALLBACK_PACKAGES.find((p) => p.id === id);

  if (!pkg) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 space-y-6">
        <span className="text-4xl">🍃</span>
        <h2 className="font-heading text-3xl font-medium text-cocoa">Package Not Found</h2>
        <p className="text-sm text-charcoal/70 max-w-[40ch]">
          The skincare routine package you are looking for does not exist or has been archived.
        </p>
        <Button variant="default" onClick={() => router.push("/packages")} className="cursor-pointer">
          Back to Packages
        </Button>
      </div>
    );
  }

  const handleAddSetToCart = () => {
    pkg.products.forEach((product) => {
      addItem(product);
    });
    showToast(`Added ${pkg.name} set to cart!`, "success");
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Back Button */}
      <Link
        href="/packages"
        className="inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:text-ochre transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Packages
      </Link>

      {/* Package Hero & Overview */}
      <section className="grid gap-12 lg:grid-cols-2 items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-taupe/20 p-2.5 shadow-lg">
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
          <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
            Curated Set
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-medium text-cocoa leading-tight">
            {pkg.name}
          </h1>
          <p className="text-charcoal/80 leading-relaxed font-light">
            {pkg.description}
          </p>

          {/* Pricing Box */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#D4937A] border border-[#C58068] w-fit">
            <div className="flex flex-col">
              <span className="text-[0.58rem] text-[#3A2820]/80 uppercase tracking-widest leading-none">
                Bundle price
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-[#3A2820]">${pkg.price.toFixed(2)}</span>
                <span className="text-sm text-[#4A3528]/60 line-through">${pkg.originalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className="h-10 w-px bg-[#C58068]" />
            <div className="text-xs font-bold text-emerald-950">
              You Save ${(pkg.originalPrice - pkg.price).toFixed(2)}!
            </div>
          </div>

          <Button
            onClick={handleAddSetToCart}
            variant="default"
            className="w-full sm:w-auto h-12 px-8 text-sm font-semibold cursor-pointer flex items-center gap-2"
          >
            <ShoppingBag className="size-4" />
            Add Full Set to Cart
          </Button>
        </div>
      </section>

      {/* Routine Steps (AM/PM Grid) */}
      <section className="space-y-8 border-t border-taupe/60 pt-16">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-3xl font-medium text-cocoa">
            How to Use: The Ritual
          </h2>
          <p className="text-sm text-charcoal/60">
            Follow this AM/PM application sequence to achieve optimal skin synergy and results.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* AM Routine */}
          <div className="bg-[#D4937A] border border-[#C58068] p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#C58068] text-[#8A4A32]">
              <Sun className="size-5" />
              <h3 className="font-heading text-xl font-medium text-[#3A2820]">AM Routine</h3>
            </div>
            <ol className="space-y-4">
              {pkg.steps.am.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-[#4A3528] leading-relaxed font-light">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#F7EDE6]/80 text-[#3A2820] text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* PM Routine */}
          <div className="bg-[#D4937A] border border-[#C58068] p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#C58068] text-[#8A4A32]">
              <Moon className="size-5" />
              <h3 className="font-heading text-xl font-medium text-[#3A2820]">PM Routine</h3>
            </div>
            <ol className="space-y-4">
              {pkg.steps.pm.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-[#4A3528] leading-relaxed font-light">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#F7EDE6]/80 text-[#3A2820] text-xs font-bold">
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
      <section className="space-y-8 border-t border-taupe/60 pt-16">
        <h2 className="font-heading text-2xl font-medium text-cocoa text-center md:text-left">
          Products in this Bundle
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pkg.products.map((product) => {
            const isOrganic = product.productType === "ORGANIC";
            return (
              <div
                key={product.id}
                className="flex flex-col border border-[#C58068] bg-[#D4937A] rounded-2xl p-4 space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-taupe/15">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.58rem] font-bold text-cocoa uppercase shadow-sm">
                    {isOrganic ? "🌿 Organic" : "🧪 Formulated"}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading text-lg font-medium text-[#3A2820] line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#4A3528] line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#C58068] mt-3">
                    <span className="text-sm font-bold text-[#3A2820]">
                      ${product.price.toFixed(2)}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      className="text-xs font-bold text-[#3A2820] hover:text-[#3A2820]/80 uppercase flex items-center gap-0.5"
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
  );
}
