import { CollectionShowcase } from "@/components/home/collection-showcase";
import { CustomerReviewsSection } from "@/components/home/customer-reviews-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroSection } from "@/components/home/hero-section";
import { PureRitualSection } from "@/components/home/pure-routine-section";
import { SkinDiscoverySection } from "@/components/home/skin-discovery-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us";

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

      {/* 5. Why Choose Us / Features */}
      <WhyChooseUsSection />

      {/* 6. The Pure Ritual */}
      <PureRitualSection />

      {/* 7. Customer Reviews */}
      <CustomerReviewsSection />
    </>
  );
}