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
  Share2,
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
import { ProductCard } from "@/components/products/product-card";

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
  const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState(1);

  // Gallery Active Image Thumbnail index state
  const [activeImgIndex, setActiveImgIndex] = React.useState(0);

  // Size / Variant state
  const [selectedSize, setSelectedSize] = React.useState<"30ml" | "50ml" | "100ml">("50ml");

  // Accordion state
  const [openSection, setOpenSection] = React.useState<string | null>("ingredients");

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
    async function loadProductAndRelated() {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProductById(id);
        if (!data) {
          setError("Product not found.");
        } else {
          setProduct(data);
          
          // Fetch related products from the same category
          try {
            const related = await productService.getProducts({
              category: data.categoryId,
              limit: 5,
            });
            if (related && related.data) {
              setRelatedProducts(
                related.data.filter((p) => p.id !== data.id).slice(0, 4)
              );
            }
          } catch (relErr) {
            console.warn("Failed to load related products:", relErr);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to retrieve product details. The server might be unavailable.");
      } finally {
        setLoading(false);
      }
    }
    loadProductAndRelated();
  }, [id]);

  const getCalculatedPrice = () => {
    if (!product) return 0;
    if (selectedSize === "30ml") return product.price * 0.8;
    if (selectedSize === "100ml") return product.price * 1.7;
    return product.price;
  };

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
    const finalProduct = { ...product, price: getCalculatedPrice() };
    addItem(finalProduct, quantity);
    showToast(`Added ${quantity} × ${product.name} (${selectedSize}) to cart!`, "success");
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

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!", "success");
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
      <div className="bg-[#FDF4EE] min-h-screen">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-[#FDF4EE] min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-xl px-4 py-20 text-center">
          <span className="text-5xl">🌿</span>
          <h2 className="mt-4 font-heading text-3xl font-medium text-[#3D1B22]">
            Product Details Unavailable
          </h2>
          <p className="mt-2 text-sm text-[#5A524E]">
            {error || "We couldn't locate the skincare product you were looking for."}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              className="bg-[#4A1E27] hover:bg-[#3D1B22] text-[#FAF5F0]"
              onClick={() => router.push("/products")}
            >
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isOrganic = product.productType === "ORGANIC";

  return (
    <div className="relative min-h-screen bg-[#FDF4EE] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs navigation */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#5A524E] mb-8">
          <Link href="/" className="hover:text-[#4A1E27] transition-colors">
            Home
          </Link>
          <span className="text-[#EBDCD2]">/</span>
          <Link href="/products" className="hover:text-[#4A1E27] transition-colors">
            Products
          </Link>
          <span className="text-[#EBDCD2]">/</span>
          <span className="text-[#4A1E27] font-semibold">
            {product.category?.name || "Skincare"}
          </span>
          <span className="text-[#EBDCD2]">/</span>
          <span className="text-[#5A524E]/60 truncate max-w-[150px]">
            {product.name}
          </span>
        </nav>

        {/* 2-Column Product Layout */}
        <div className="grid gap-12 lg:grid-cols-[45fr_55fr] lg:gap-16 items-start">
          
          {/* LEFT: Product Image framed with clean rounded corners */}
          <div className="relative w-full max-w-md mx-auto lg:mx-0 flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#FAF5F0] border border-[#EBDCD2] shadow-sm">
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
                    "relative size-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-[#FAF5F0]",
                    activeImgIndex === idx
                      ? "border-[#4A1E27] scale-105"
                      : "border-[#EBDCD2] opacity-70 hover:opacity-100"
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

            {/* Badges for attributes */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {isOrganic ? (
                <>
                  <span className="bg-[#FAF5F0] text-[#4A1E27] border border-[#EBDCD2] px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase">
                    🌿 Organic
                  </span>
                  <span className="bg-[#FAF5F0] text-[#4A1E27] border border-[#EBDCD2] px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase">
                    🛡️ Sensitive Skin
                  </span>
                  <span className="bg-[#FAF5F0] text-[#4A1E27] border border-[#EBDCD2] px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase">
                    🐰 Cruelty-Free
                  </span>
                </>
              ) : (
                <>
                  <span className="bg-[#FAF5F0] text-[#4A1E27] border border-[#EBDCD2] px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase">
                    🧪 Clinical Actives
                  </span>
                  <span className="bg-[#FAF5F0] text-[#4A1E27] border border-[#EBDCD2] px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase">
                    ✨ Barrier Support
                  </span>
                  <span className="bg-[#FAF5F0] text-[#4A1E27] border border-[#EBDCD2] px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase">
                    🔬 pH Balanced
                  </span>
                </>
              )}
            </div>
          </div>

          {/* RIGHT: Detailed Content Panel */}
          <div className="bg-[#FAF5F0] border border-[#EBDCD2] rounded-3xl p-8 sm:p-10 shadow-xs">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#4A1E27] uppercase">
                {product.category?.name || "PureYuna Collection"}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-[11px] text-[#5A524E] font-medium">(2 reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3D1B22] leading-tight">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-[#3D1B22]">
                ${getCalculatedPrice().toFixed(2)}
              </span>
              <span className="text-xs text-[#5A524E]/70 font-light">/ {selectedSize}</span>
            </div>

            {/* Short editorial formulation summary */}
            <p className="mt-5 text-sm text-[#5A524E] italic leading-relaxed border-l-2 border-[#4A1E27]/30 pl-4 font-light">
              "{product.description.split(".")[0]}."
            </p>

            {/* Size / Variant Selector */}
            <div className="mt-6 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D1B22] block">
                Select Size
              </span>
              <div className="flex gap-3">
                {(["30ml", "50ml", "100ml"] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-4 py-2 text-xs font-semibold rounded-lg uppercase transition-all duration-200 cursor-pointer",
                      selectedSize === size
                        ? "bg-[#4A1E27] text-[#FAF5F0]"
                        : "bg-[#FAF5F0] text-[#3D1B22] border border-[#EBDCD2]"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Section (Quantity, Add to Cart, Wishlist) */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[#EBDCD2] pt-6">
              <div className="flex items-center rounded-lg border border-[#EBDCD2] bg-[#FAF5F0] h-12">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="grid size-12 cursor-pointer place-items-center text-[#3D1B22] hover:text-[#4A1E27] disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-[#3D1B22]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= product.stock}
                  className="grid size-12 cursor-pointer place-items-center text-[#3D1B22] hover:text-[#4A1E27] disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 h-12 rounded-lg bg-[#4A1E27] hover:bg-[#3D1B22] text-[#FAF5F0] text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-xs disabled:opacity-40"
              >
                <ShoppingBag className="size-4" />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleToggleWishlist}
                className={cn(
                  "grid size-12 cursor-pointer place-items-center rounded-lg border border-[#EBDCD2] bg-[#FAF5F0] text-[#3D1B22] hover:text-[#4A1E27] transition-all duration-200",
                  isWishlisted && "text-red-500 bg-red-50/20"
                )}
                aria-label="Toggle wishlist"
              >
                <Heart className="size-5" fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
              </button>
            </div>

            {/* Share Product action link */}
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleShare}
                className="text-[10px] font-bold uppercase tracking-widest text-[#4A1E27]/70 hover:text-[#4A1E27] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="size-3.5" /> Share Product
              </button>
              
              <span className="text-[10px] text-[#5A524E]/60 uppercase tracking-wider">
                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
              </span>
            </div>

            {/* Custom Interactive Accordion */}
            <div className="mt-8 space-y-3 border-t border-[#EBDCD2] pt-6">
              {/* Section 1 */}
              <div className="border border-[#EBDCD2] rounded-xl overflow-hidden bg-[#FAF5F0] transition-all duration-300">
                <button
                  type="button"
                  onClick={() => setOpenSection(openSection === "ingredients" ? null : "ingredients")}
                  className={cn(
                    "w-full flex items-center justify-between p-4 text-left font-semibold text-[#3D1B22] transition-colors",
                    openSection === "ingredients" ? "bg-[#4A1E27] text-[#FAF5F0]" : "hover:bg-[#4A1E27]/5"
                  )}
                >
                  <span className="text-xs tracking-wider uppercase font-medium">Key Ingredients & Benefits</span>
                  <span className="font-light text-base">{openSection === "ingredients" ? "−" : "+"}</span>
                </button>
                {openSection === "ingredients" && (
                  <div className="p-5 text-xs text-[#5A524E] leading-relaxed font-light bg-[#FAF5F0] border-t border-[#EBDCD2]">
                    {isOrganic ? (
                      <p>Our organic botanical blend contains active Cold-Pressed oils and floral waters that deliver skin-mimicking hydration. Highly compatible with sensitive and compromised skin barriers.</p>
                    ) : (
                      <p>Precision formulated with clinical strength active ingredients (Niacinamide, multi-weight Hyaluronic Acid) and soothing Centella extract to provide targeted rejuvenation without causing redness.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Section 2 */}
              <div className="border border-[#EBDCD2] rounded-xl overflow-hidden bg-[#FAF5F0] transition-all duration-300">
                <button
                  type="button"
                  onClick={() => setOpenSection(openSection === "usage" ? null : "usage")}
                  className={cn(
                    "w-full flex items-center justify-between p-4 text-left font-semibold text-[#3D1B22] transition-colors",
                    openSection === "usage" ? "bg-[#4A1E27] text-[#FAF5F0]" : "hover:bg-[#4A1E27]/5"
                  )}
                >
                  <span className="text-xs tracking-wider uppercase font-medium">How to Use in Your Routine</span>
                  <span className="font-light text-base">{openSection === "usage" ? "−" : "+"}</span>
                </button>
                {openSection === "usage" && (
                  <div className="p-5 text-xs text-[#5A524E] leading-relaxed font-light bg-[#FAF5F0] border-t border-[#EBDCD2]">
                    <p>Gently apply 3-4 drops onto your fingertips and press onto a clean, damp face and neck. Use morning and night. Pair with our Jojoba Barrier moisturizer for optimal protection.</p>
                  </div>
                )}
              </div>

              {/* Section 3 */}
              <div className="border border-[#EBDCD2] rounded-xl overflow-hidden bg-[#FAF5F0] transition-all duration-300">
                <button
                  type="button"
                  onClick={() => setOpenSection(openSection === "sustainability" ? null : "sustainability")}
                  className={cn(
                    "w-full flex items-center justify-between p-4 text-left font-semibold text-[#3D1B22] transition-colors",
                    openSection === "sustainability" ? "bg-[#4A1E27] text-[#FAF5F0]" : "hover:bg-[#4A1E27]/5"
                  )}
                >
                  <span className="text-xs tracking-wider uppercase font-medium">Full Formulation & Sustainability</span>
                  <span className="font-light text-base">{openSection === "sustainability" ? "−" : "+"}</span>
                </button>
                {openSection === "sustainability" && (
                  <div className="p-5 text-xs text-[#5A524E] leading-relaxed font-light bg-[#FAF5F0] border-t border-[#EBDCD2] space-y-4">
                    <div>
                      <span className="font-semibold block mb-1 text-[10px] uppercase tracking-wider text-[#3D1B22]">Ingredients:</span>
                      <p className="italic text-[11px] leading-relaxed text-[#5A524E]/90">
                        {isOrganic
                          ? "Organic Lavender Hydrosol, Cold-Pressed Jojoba Seed Oil, Chamomile Flower Extract, Vegetable Glycerin, Aloe Leaf Juice, Tocopherol (Vitamin E)."
                          : "Purified Water, Niacinamide, Sodium Hyaluronate (Hyaluronic Acid), Ceramide NP, Panthenol (Vitamin B5), Centella Asiatica Extract, Salicylic Acid (BHA)."}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="bg-[#4A1E27]/10 text-[#4A1E27] px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                        ♻️ 100% Recyclable Glass
                      </span>
                      <span className="bg-[#4A1E27]/10 text-[#4A1E27] px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                        🌱 Vegan
                      </span>
                      <span className="bg-[#4A1E27]/10 text-[#4A1E27] px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                        🐰 Cruelty-Free
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM: Reviews Section */}
        <div className="mt-16 border-t border-[#EBDCD2] pt-10">
          <h2 className="font-heading text-2xl font-medium text-[#3D1B22] mb-8">
            Customer Sanctuary Reviews
          </h2>

          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-sm text-[#5A524E] italic">
                  No reviews yet for this product. Be the first to share your sanctuary experience!
                </p>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="bg-[#FAF5F0] border border-[#EBDCD2] p-5 rounded-2xl space-y-3 shadow-xs text-[#3D1B22]">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#3D1B22]">{rev.userName}</span>
                      <span className="text-[10px] text-[#5A524E]/60 uppercase tracking-wider">{rev.date}</span>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-3.5"
                          fill={i < rev.rating ? "currentColor" : "none"}
                          strokeWidth={i < rev.rating ? 0 : 2}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[#5A524E] leading-relaxed pt-1 font-light">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Review Submission Form */}
            <div className="bg-[#FAF5F0] border border-[#EBDCD2] rounded-2xl p-6 h-fit space-y-4 shadow-sm text-[#3D1B22]">
              <h3 className="text-xs font-bold tracking-wider text-[#3D1B22] uppercase">Write a Review</h3>
              {isAuthenticated ? (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold tracking-widest text-[#5A524E] uppercase block">Rating</span>
                    <div className="flex gap-1.5 text-amber-500">
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
                            strokeWidth={val <= formRating ? 0 : 2}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment input */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold tracking-widest text-[#5A524E] uppercase block">Your Comment</span>
                    <textarea
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      placeholder="Share your experience with the sanctuary formula..."
                      rows={4}
                      className="w-full text-xs p-3 rounded-lg border border-[#EBDCD2] bg-[#FAF6F2] text-[#3D1B22] outline-none resize-none focus:border-[#4A1E27] transition-all"
                    />
                  </div>

                  <Button type="submit" className="w-full text-xs font-semibold bg-[#4A1E27] hover:bg-[#3D1B22] text-[#FAF5F0] cursor-pointer">
                    Submit Experience
                  </Button>
                </form>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-[#5A524E] leading-relaxed font-light">
                    Only registered sanctuary members can submit reviews.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-xs font-semibold border-[#4A1E27] text-[#4A1E27] hover:bg-[#4A1E27]/5 cursor-pointer bg-[#FAF5F0]"
                    render={<Link href={`/login?next=/products/${product.id}`} />}
                  >
                    Login to Review
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-[#EBDCD2] pt-12">
            <h3 className="font-heading text-2xl sm:text-3xl font-medium text-[#3D1B22] mb-8 text-center">
              Complete Your Routine
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={(prod, e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem(prod, 1);
                    showToast(`Added ${prod.name} to cart!`, "success");
                  }}
                  onToggleWishlist={async (prod, e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await toggleWishlistStore(prod);
                    showToast(wishlistIds.includes(prod.id) ? "Removed from wishlist." : "Saved to wishlist!", "info");
                  }}
                  isWishlisted={wishlistIds.includes(p.id)}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
