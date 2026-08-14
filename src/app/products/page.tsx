"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useMemo } from "react";

import { FilterSidebar } from "@/components/products/filter-sidebar";
import { FilterDrawer } from "@/components/products/filter-drawer";
import { ProductsHeader } from "@/components/products/products-header";
import { ProductsGrid } from "@/components/products/products-grid";
import { useToastStore } from "@/stores/toastStore";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { getApiErrorMessage } from "@/lib/errors";
import { productService } from "@/services/product.service";
import type { Category, Product, ProductQueryParams } from "@/types/product";
import { ProductSort, ProductType, SkinType } from "@/types/product";

function ProductsDiscoveryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showToast = useToastStore((state) => state.showToast);

  // Stores
  const wishlistIds = useWishlistStore((state) => state.productIds);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  // States
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Read URL State
  const activeProductType = (searchParams.get("productType") as ProductType) || ProductType.ORGANIC;
  const isOrganic = activeProductType === ProductType.ORGANIC;
  const activeCategory = searchParams.get("category") || "";
  const activeSkinType = searchParams.get("skinType") || "";
  const activeSort = searchParams.get("sort") || "";
  const activeSearch = searchParams.get("search") || "";
  const activePage = Number(searchParams.get("page")) || 1;

  const [searchText, setSearchText] = useState(activeSearch);
  const [retryTrigger, setRetryTrigger] = useState(0);

  // Sync sorting input
  const [sortBy, setSortBy] = useState(activeSort || "recommended");
  useEffect(() => {
    setSortBy(activeSort || "recommended");
  }, [activeSort]);

  // Sync search input
  useEffect(() => {
    setSearchText(activeSearch);
  }, [activeSearch]);

  // Fetch categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await productService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    loadCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const params: ProductQueryParams = {
          productType: activeProductType,
          page: activePage,
          limit: 8,
        };
        if (activeCategory) params.category = activeCategory;
        if (activeSkinType) params.skinType = activeSkinType as SkinType;
        if (activeSort) {
          if (activeSort === "price-asc") {
            params.sort = "price-low" as ProductSort;
          } else if (activeSort === "price-desc") {
            params.sort = "price-high" as ProductSort;
          } else if (activeSort === "newest") {
            params.sort = "newest" as ProductSort;
          }
        }
        if (activeSearch) params.search = activeSearch;

        const response = await productService.getProducts(params);
        setProducts(response.data);
        if (response.meta) {
          setTotalPages(response.meta.totalPages);
          setTotalProducts(response.meta.total);
        }
      } catch (err) {
        setError(getApiErrorMessage(err, "Failed to load products."));
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [activeProductType, activeCategory, activeSkinType, activeSort, activeSearch, activePage, retryTrigger]);

  const updateUrlParams = (newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    if (!newParams.page) {
      params.set("page", "1");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleTabChange = (type: ProductType) => {
    router.push(`${pathname}?productType=${type}`);
  };

  const handleCategoryChange = (val: string) => {
    updateUrlParams({ category: val === "ALL" ? "" : val });
  };

  const handleSkinTypeChange = (val: string) => {
    updateUrlParams({ skinType: val === "ALL" ? "" : val });
  };

  const handleSortChange = (val: string) => {
    updateUrlParams({ sort: val === "DEFAULT" ? "" : val });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams({ search: searchText });
  };

  const handleResetFilters = () => {
    setSearchText("");
    router.push(`${pathname}?productType=${activeProductType}`);
    showToast("Filters cleared.", "info");
  };

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
      showToast("Saved to wishlist!", "success");
    }
  };

  const hasActiveFilters = Boolean(activeCategory || activeSkinType || (activeSort && activeSort !== "recommended") || activeSearch);

  const filteredProducts = products;

  const processedProducts = useMemo(() => {
    let list = [...filteredProducts];

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        list.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'newest':
        list.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'recommended':
      default:
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return list;
  }, [filteredProducts, sortBy]);

  return (
    <div className="relative min-h-screen py-10">
      <ProductsHeader />

      {/* Tabs Switcher */}
      <div className="mx-auto max-w-6xl px-4 mt-12 sm:px-6 lg:px-8">
        <div className="flex justify-center border-b border-taupe/60">
          <nav className="flex gap-10" aria-label="Product lines">
            <button
              type="button"
              onClick={() => handleTabChange(ProductType.ORGANIC)}
              className={`flex items-center gap-2 pb-5 text-xl font-medium tracking-wide transition-all border-b-2 cursor-pointer ${
                isOrganic
                  ? "border-terracotta text-terracotta font-semibold"
                  : "border-transparent text-cocoa/50 hover:text-cocoa"
              }`}
            >
              🌿 Organic Care
            </button>
            <button
              type="button"
              onClick={() => handleTabChange(ProductType.FORMULATED)}
              className={`flex items-center gap-2 pb-5 text-xl font-medium tracking-wide transition-all border-b-2 cursor-pointer ${
                !isOrganic
                  ? "border-formulated-primary text-formulated-primary font-semibold"
                  : "border-transparent text-cocoa/50 hover:text-cocoa"
              }`}
            >
              🧪 Precision Formulated
            </button>
          </nav>
        </div>
      </div>

      {/* Grid and Filters */}
      <div className="mx-auto max-w-6xl px-4 mt-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <FilterSidebar
            hasActiveFilters={hasActiveFilters}
            handleResetFilters={handleResetFilters}
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearchSubmit={handleSearchSubmit}
            categories={categories}
            activeCategory={activeCategory}
            handleCategoryChange={handleCategoryChange}
            activeSkinType={activeSkinType}
            handleSkinTypeChange={handleSkinTypeChange}
            sortBy={sortBy}
            setSortBy={handleSortChange}
            isOrganic={isOrganic}
          />

          <main className="space-y-8">
            <FilterDrawer
              hasActiveFilters={hasActiveFilters}
              handleResetFilters={handleResetFilters}
              searchText={searchText}
              setSearchText={setSearchText}
              handleSearchSubmit={handleSearchSubmit}
              categories={categories}
              activeCategory={activeCategory}
              handleCategoryChange={handleCategoryChange}
              activeSkinType={activeSkinType}
              handleSkinTypeChange={handleSkinTypeChange}
              isOrganic={isOrganic}
              sortBy={sortBy}
              setSortBy={handleSortChange}
            />

            <ProductsGrid
              loading={loading}
              error={error}
              products={processedProducts}
              wishlistIds={wishlistIds}
              handleAddToCart={handleAddToCart}
              handleToggleWishlist={handleToggleWishlist}
              activePage={activePage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              updateUrlParams={updateUrlParams}
              handleResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
              retryLoading={() => setRetryTrigger((val) => val + 1)}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 text-center text-cocoa">
          <p className="font-heading text-2xl font-medium animate-pulse">Loading Discovery Canvas...</p>
        </div>
      }
    >
      <Suspense fallback={null}>
        <ProductsDiscoveryContent />
      </Suspense>
    </Suspense>
  );
}
