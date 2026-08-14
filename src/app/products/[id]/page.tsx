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
  Star,
} from "lucide-react";

import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { productService } from "@/services/product.service";
import type { Product } from "@/types/product";
import { useToastStore } from "@/stores/toastStore";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useAuthStore } from "@/stores/authStore";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  
  // Unwrap Next.js 15 dynamic parameters promise
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  // Stores
  const addItem = useCartStore((state) => state.addItem);
  const wishlistIds = useWishlistStore((state) => state.productIds);
  const toggleWishlistStore = useWishlistStore((state) => state.toggleWishlist);
  const { user, isAuthenticated } = useAuthStore();

  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState(1);

  // Gallery Active Image Thumbnail index state
  const [activeImgIndex, setActiveImgIndex] = React.useState(0);

  // Tabs state
  const [activeTab, setActiveTab] = React.useState<"formula" | "benefits" | "ingredients">("formula");

  // Reviews state
  const [reviews, setReviews] = React.useState([
    {
      id: "rev-1",
      userName: "Aria Montgomery",
      rating: 5,
      comment: "Absolutely divine! My skin feels incredibly nourished and the scent is so soothing. Highly recommend this botanical masterpiece.",
      date: "August 02, 2026",
    },
    {
      id: "rev-2",
      userName: "Liam Thorne",
      rating: 4,
      comment: "Saw a noticeable improvement in skin texture within a week. Not greasy at all. Love the minimalist design packaging too.",
      date: "July 28, 2026",
    },
  ]);

  // Review Form state
  const [formRating, setFormRating] = React.useState(5);
  const [formComment, setFormComment] = React.useState("");

  const isWishlisted = product ? wishlistIds.includes(product.id) : false;

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
    addItem(product, quantity);
    showToast(`Added ${quantity} × ${product.name} to cart!`, "success");
  };

  const handleToggleWishlist = async () => {
    if (!product) return;
    await toggleWishlistStore(product);
    if (isWishlisted) {
      showToast(`Removed from wishlist.`, "info");
    } else {
      showToast(`Saved to wishlist!`, "success");
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !isAuthenticated || !user) return;
    if (!formComment.trim()) {
      showToast("Please write a comment for your review.", "error");
      return;
    }
    const newReview = {
      id: `rev-${Math.random().toString(36).slice(2, 11)}`,
      userName: user.name,
      rating: formRating,
      comment: formComment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
    };
    setReviews((prev) => [newReview, ...prev]);
    setFormComment("");
    setFormRating(5);
    showToast("Thank you! Your review has been submitted successfully.", "success");
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
          
          {/* LEFT: Product Image framed in Asymmetric Arch Mask & Gallery thumbnails */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0 flex flex-col gap-4">
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
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-all duration-300",
                  activeImgIndex === 1 && "brightness-105 saturate-110",
                  activeImgIndex === 2 && "sepia-[0.1] contrast-[0.98]"
                )}
                priority
              />
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="flex justify-center gap-3 mt-2">
              {[
                { label: "Overview", style: "" },
                { label: "Close Up", style: "brightness-105 saturate-110" },
                { label: "Texture", style: "sepia-[0.1] contrast-[0.98]" }
              ].map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImgIndex(idx)}
                  className={cn(
                    "relative size-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-white",
                    activeImgIndex === idx
                      ? isOrganic
                        ? "border-terracotta scale-105"
                        : "border-formulated-primary scale-105"
                      : "border-taupe/40 opacity-70 hover:opacity-100"
                  )}
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className={cn("object-cover", thumb.style)}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/40 text-white text-[0.5rem] font-bold text-center py-0.5 uppercase tracking-wider">
                    {thumb.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Ambient branding indicator */}
            <div className="relative mt-2 mx-auto rounded-full border border-white/20 bg-white/95 px-4 py-2 shadow-sm backdrop-blur-xs flex items-center gap-2 w-fit">
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

            {/* Tabs System */}
            <div className="mt-8 border-t border-taupe/40 pt-6">
              <div className="flex border-b border-taupe/30 mb-5">
                {[
                  { id: "formula", label: "About The Formula" },
                  { id: "benefits", label: "Key Benefits" },
                  { id: "ingredients", label: "Ingredients" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "pb-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 mr-6 cursor-pointer",
                      activeTab === tab.id
                        ? isOrganic
                          ? "border-terracotta text-terracotta"
                          : "border-formulated-primary text-formulated-primary"
                        : "border-transparent text-cocoa/40 hover:text-cocoa/70"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "formula" && (
                <div className="text-sm leading-relaxed text-charcoal/80 space-y-4">
                  <p>{product.description}</p>
                </div>
              )}

              {activeTab === "benefits" && (
                <div className="space-y-4">
                  {isOrganic ? (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold tracking-widest text-terracotta uppercase">Botanical Care Profile</h4>
                      <ul className="grid gap-2 sm:grid-cols-2 text-xs text-cocoa/80">
                        <li className="flex items-center gap-2">
                          <Check className="size-3.5 text-terracotta" /> Vegan & Eco-Conscious
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="size-3.5 text-terracotta" /> Cruelty-free certified
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="size-3.5 text-terracotta" /> No synthetic dyes
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="size-3.5 text-terracotta" /> Bio-active nourishment
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold tracking-widest text-formulated-primary uppercase">Clinical Focus</h4>
                      <p className="text-xs text-cocoa/80 leading-normal">
                        Precision blended with active dermatologist-approved agents. Non-comedogenic, pH balanced, and optimized to protect the natural skin barrier.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "ingredients" && (
                <div className="text-xs leading-relaxed text-cocoa/75 italic">
                  {isOrganic ? (
                    <p>
                      Organic Lavender Extract, Cold-Pressed Rosehip Seed Oil, Aloe Barbadensis Leaf Juice, Chamomile Flower Distillate, Organic Jojoba Oil, Vegetable Glycerin, Tocopherol (Vitamin E).
                    </p>
                  ) : (
                    <p>
                      Purified Water, Niacinamide (Vitamin B3), Sodium Hyaluronate (Hyaluronic Acid), Salicylic Acid (BHA), Centella Asiatica Extract, Ceramide NP, Panthenol, Phenoxyethanol, Ethylhexylglycerin.
                    </p>
                  )}
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

        {/* BOTTOM: Reviews Section */}
        <div className="mt-16 border-t border-taupe/40 pt-10">
          <h2 className="font-heading text-2xl font-medium text-cocoa mb-8">
            Customer Sanctuary Reviews
          </h2>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-sm text-cocoa/50 italic">No reviews yet for this product. Be the first to share your sanctuary experience!</p>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="bg-[#E0A58E] border border-[#C58068] p-5 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#3A2820]">{rev.userName}</span>
                      <span className="text-[0.68rem] text-[#3A2820]/80">{rev.date}</span>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-0.5 text-[#3A2820]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-3.5"
                          fill={i < rev.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[#4A3528] leading-relaxed pt-1">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Review Submission Form */}
            <div className="bg-[#D4937A] border border-[#C58068] rounded-2xl p-6 h-fit space-y-4">
              <h3 className="text-sm font-bold tracking-wider text-[#3A2820] uppercase">Write a Review</h3>
              {isAuthenticated ? (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <span className="text-[0.62rem] font-bold tracking-widest text-[#3A2820]/80 uppercase block">Rating</span>
                    <div className="flex gap-1.5 text-[#3A2820]">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setFormRating(val)}
                          className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
                          aria-label={`Rate ${val} stars`}
                        >
                          <Star
                            className="size-5"
                            fill={val <= formRating ? "currentColor" : "none"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment input */}
                  <div className="space-y-1">
                    <span className="text-[0.62rem] font-bold tracking-widest text-[#3A2820]/80 uppercase block">Your Comment</span>
                    <textarea
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      placeholder="Share your experience with the sanctuary formula..."
                      rows={4}
                      className="w-full text-xs p-3 rounded-lg border border-[#C58068] bg-[#FAF5EF]/90 text-[#3A2820] focus-visible:ring-0 focus-visible:border-[#3A2820]/50 outline-none resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full text-xs font-semibold cursor-pointer">
                    Submit Experience
                  </Button>
                </form>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-[#3A2820]/80 leading-relaxed">
                    Only registered sanctuary members can submit reviews.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-semibold border-[#C58068] text-[#3A2820] cursor-pointer"
                    render={<Link href={`/login?next=/products/${product.id}`} />}
                  >
                    Login to Review
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
