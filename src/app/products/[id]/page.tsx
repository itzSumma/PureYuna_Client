"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Heart,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { productService } from "@/services/product.service";
import type { Product } from "@/types/product";
import { useToastStore } from "@/stores/toastStore";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  
  // Unwrap Next.js 15 dynamic parameters promise
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  React.useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProductById(id);
        if (!data) {
          setError("Product not found.");
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to retrieve product details. The server might be unavailable.");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const handleIncrement = () => {
    if (product && quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    showToast(`Added ${quantity} × ${product.name} to cart!`, "success");
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    if (isWishlisted) {
      setIsWishlisted(false);
      showToast(`Removed from wishlist.`, "info");
    } else {
      setIsWishlisted(true);
      showToast(`Saved to wishlist!`, "success");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          <Skeleton className="aspect-[4/5] w-full rounded-t-[20rem] rounded-b-[2rem]" />
          <div className="space-y-6">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <span className="text-5xl">🌿</span>
        <h2 className="mt-4 font-heading text-3xl font-medium text-cocoa">
          Product Details Unavailable
        </h2>
        <p className="mt-2 text-sm text-charcoal/70">
          {error || "We couldn't locate the skincare product you were looking for."}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="default" onClick={() => router.push("/products")}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const isOrganic = product.productType === "ORGANIC";

  return (
    <div className="relative min-h-screen py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back link */}
        <Link
          href={`/products?productType=${product.productType}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-cocoa/60 hover:text-terracotta transition-colors duration-200 mb-8 cursor-pointer"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back to {isOrganic ? "Organic Care" : "Precision Formulated"}
        </Link>

        {/* 2-Column Product Layout */}
        <div className="grid gap-12 lg:grid-cols-[45fr_55fr] lg:gap-16 items-start">
          
          {/* LEFT: Product Image framed in Asymmetric Arch Mask */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0">
            <div
              className={cn(
                "relative aspect-[4/5] w-full overflow-hidden rounded-t-[20rem] rounded-b-[2.5rem] shadow-[0_20px_50px_rgba(58,40,32,0.1)] border",
                isOrganic ? "border-taupe/40 bg-cream" : "border-formulated-surface/40 bg-formulated-bg"
              )}
            >
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="absolute inset-0 h-full w-full object-cover"
                priority
              />
            </div>
            
            {/* Ambient branding indicator */}
            <div className="absolute -left-3 bottom-6 rounded-full border border-white/20 bg-white/95 px-4 py-2 shadow-sm backdrop-blur-xs flex items-center gap-2">
              <span className={cn("size-2 rounded-full", isOrganic ? "bg-terracotta" : "bg-formulated-primary")} />
              <span className="text-[0.62rem] font-bold tracking-widest text-cocoa uppercase">
                {isOrganic ? "🌿 100% Organic" : "🧪 Formulated"}
              </span>
            </div>
          </div>

          {/* RIGHT: Detailed Content Panel (Theme Aligned) */}
          <div
            className={cn(
              "rounded-3xl border p-8 sm:p-10 shadow-[0_15px_30px_rgba(58,40,32,0.04)]",
              isOrganic
                ? "border-taupe/40 bg-cream"
                : "border-formulated-surface/40 bg-formulated-bg"
            )}
          >
            {/* Category / Collection */}
            <span className="text-[0.68rem] font-bold tracking-[0.24em] text-cocoa/40 uppercase block">
              {product.category?.name || "PureYuna Collection"}
            </span>

            {/* Product Title */}
            <h1 className="mt-3 font-heading text-4xl font-medium tracking-tight text-cocoa sm:text-5xl leading-tight">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-terracotta">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                USD (Tax included)
              </span>
            </div>

            {/* Badges Container */}
            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="rounded-full bg-white/90 border border-taupe px-3 py-1 text-xs font-semibold text-cocoa/75 uppercase">
                {product.skinType.toLowerCase()} Skin
              </span>
              <span className="rounded-full bg-white/90 border border-taupe px-3 py-1 text-xs font-semibold text-cocoa/75 uppercase">
                Audience: {product.targetAudience}
              </span>
            </div>

            {/* Product Description */}
            <div className="mt-7 border-t border-taupe/40 pt-6">
              <h3 className="text-xs font-bold tracking-widest text-cocoa/60 uppercase">
                About the formula
              </h3>
              <p className="mt-2.5 text-base leading-relaxed text-charcoal/80">
                {product.description}
              </p>
            </div>

            {/* Dynamic Features List Aligned to Theme */}
            <div className="mt-7 border-t border-taupe/40 pt-6">
              {isOrganic ? (
                // 🌿 Organic Botanical Accents
                <div className="space-y-3.5">
                  <h3 className="text-xs font-bold tracking-widest text-terracotta uppercase flex items-center gap-1.5">
                    <span>🌿</span> Botanical Standards
                  </h3>
                  <ul className="grid gap-2 sm:grid-cols-2 text-sm text-cocoa/80">
                    <li className="flex items-center gap-2">
                      <span className="grid size-5 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      Vegan formulas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="grid size-5 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      Cruelty-free certified
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="grid size-5 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      No synthetic colorants
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="grid size-5 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      100% bio-sourced extracts
                    </li>
                  </ul>
                </div>
              ) : (
                // 🧪 Formulated Scientific Accents
                <div className="space-y-3.5">
                  <h3 className="text-xs font-bold tracking-widest text-formulated-primary uppercase flex items-center gap-1.5">
                    <Sparkles className="size-3.5" /> Clinical Focus
                  </h3>
                  <div className="rounded-xl bg-formulated-bg/80 border border-formulated-surface/60 p-4 space-y-2 text-sm text-formulated-text/80">
                    <p>
                      <strong>Active Actives Profile:</strong> Precision blended with clinically validated skin support agents matching target profile.
                    </p>
                    <p className="text-xs text-cocoa/60 italic">
                      Concentration optimized for high efficacy without skin barrier disruption. pH balanced.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Interaction Row (Add to Cart / Stock) */}
            <div className="mt-8 border-t border-taupe/40 pt-7 space-y-6">
              
              {/* Stock Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-cocoa/60">Stock Status</span>
                {product.stock <= 0 ? (
                  <span className="text-sm font-semibold text-destructive uppercase tracking-wider">
                    Out of stock
                  </span>
                ) : product.stock <= 5 ? (
                  <span className="text-sm font-semibold text-amber-500 uppercase tracking-wider">
                    Only {product.stock} left in stock!
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
                    In Stock ({product.stock} units)
                  </span>
                )}
              </div>

              {/* Controls */}
              {product.stock > 0 && (
                <div className="flex flex-wrap items-center gap-4">
                  {/* Quantity Counter Selector */}
                  <div className="flex items-center rounded-lg border border-taupe bg-white/50 h-12">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="grid size-12 cursor-pointer place-items-center text-cocoa/60 hover:text-cocoa disabled:opacity-30"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-cocoa">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      disabled={quantity >= product.stock}
                      className="grid size-12 cursor-pointer place-items-center text-cocoa/60 hover:text-cocoa disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={cn(
                      "flex-1 h-12 rounded-lg px-8 text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2",
                      isOrganic
                        ? "bg-gradient-to-br from-terracotta to-ochre text-cream hover:-translate-y-0.5 hover:shadow-md"
                        : "bg-formulated-primary text-formulated-bg hover:bg-formulated-accent hover:-translate-y-0.5 hover:shadow-md"
                    )}
                  >
                    <ShoppingBag className="size-4" />
                    Add to Cart
                  </button>

                  {/* Wishlist Heart Icon */}
                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    className={cn(
                      "grid size-12 cursor-pointer place-items-center rounded-lg border border-taupe bg-white/50 text-cocoa/60 transition-all duration-200 hover:text-terracotta hover:bg-white hover:scale-102",
                      isWishlisted && "text-red-500 bg-white"
                    )}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className="size-5" fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
