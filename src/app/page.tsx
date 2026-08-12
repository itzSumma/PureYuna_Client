import { CollectionShowcase } from "@/components/home/collection-showcase";
import { HeroSection } from "@/components/home/hero-section";
import { SkinDiscoverySection } from "@/components/home/skin-discovery-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CollectionShowcase />
      <SkinDiscoverySection />
    </>
  );
}