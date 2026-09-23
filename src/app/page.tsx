import { CollectionShowcase } from "@/components/home/collection-showcase";
import { CustomerReviewsSection } from "@/components/home/customer-reviews-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroSection } from "@/components/home/hero-section";
import { PureRoutineSection } from "@/components/home/pure-routine-section";
import { SkinDiscoverySection } from "@/components/home/skin-discovery-section";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. The Collection */}
      <CollectionShowcase />

      {/* 3. Best Sellers (Dynamic) */}
      <FeaturedProducts />

      {/* 4. Skin Discovery */}
      <SkinDiscoverySection />

      {/* 5. The Pure Routine / Ingredients */}
      <PureRoutineSection />

      {/* 6. Customer Reviews */}
      <CustomerReviewsSection />
    </>
  );
}