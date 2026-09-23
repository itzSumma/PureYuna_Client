"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { ProductCard } from "@/components/products/product-card";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
          limit: 4,
          sort: ProductSort.NEWEST,
        });

        if (isMounted && response?.data) {
          // Normalize fallback rating and single image URL safety
          const normalized = response.data.slice(0, 4).map((p) => ({
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
    addItem(product);
    showToast(`Added ${product.name} to cart!`, "success");
  };

  const handleToggleWishlist = async (product: Product, event: React.MouseEvent) => {
    event.preventDefault();
    const isWishlisted = wishlistIds.includes(product.id);
    await toggleWishlist(product);
    if (isWishlisted) {
      showToast("Removed from wishlist.", "info");
    } else {
      showToast("Added to wishlist!", "success");
    }
  };

  return (
    <section className="relative overflow-hidden bg-cream py-12 sm:py-16 lg:py-20 border-t border-golden-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 sm:pb-10">
            <div>
              <p className="flex items-center gap-2.5 text-xs font-bold tracking-[0.24em] text-caramel uppercase">
                <Sparkles className="size-3.5 text-caramel" />
                Curated Favorites
              </p>
              <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-deep-brown sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Best Sellers
              </h2>
              <p className="mt-3 text-base text-deep-brown/80 max-w-xl leading-relaxed">
                Our most celebrated, precision-crafted skincare essentials — loved by our community for visible, luminous results.
              </p>
            </div>

            <Button
              variant="outline"
              size="default"
              nativeButton={false}
              render={<Link href="/products" />}
              className="group self-start md:self-auto gap-2 border-2 border-caramel/70 text-caramel hover:border-caramel hover:bg-caramel/5 rounded-lg px-5 font-semibold text-sm cursor-pointer shadow-xs transition-colors duration-500 ease-in-out"
            >
              View All Products
              <ArrowRight className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </Button>
          </div>
        </Reveal>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-2xl border border-golden-border bg-[#FAF5F0] p-3 space-y-4"
              >
                <Skeleton className="aspect-[4/5] w-full rounded-xl bg-golden-border/40" />
                <Skeleton className="h-4 w-1/3 rounded-md bg-golden-border/40" />
                <Skeleton className="h-5 w-3/4 rounded-md bg-golden-border/40" />
                <div className="mt-auto pt-3 flex justify-between items-center border-t border-golden-border/40">
                  <Skeleton className="h-4 w-12 rounded-md bg-golden-border/40" />
                  <Skeleton className="h-8 w-20 rounded-md bg-golden-border/40" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.08} className="h-full">
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlistIds.includes(product.id)}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
