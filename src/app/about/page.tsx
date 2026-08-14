import React from "react";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Sparkles, Leaf, Recycle, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "About Our Sanctuary | PureYuna",
  description:
    "Rooted in Nature, Perfected by Science. Explore PureYuna's brand philosophy, our commitment to sustainability, and our clean skincare promise.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20">
      {/* Hero Header */}
      <header className="text-center space-y-6 max-w-3xl mx-auto">
        <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
          Our Sanctuary
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-cocoa">
          Rooted in Nature.<br />Perfected by Science.
        </h1>
        <p className="text-lg text-charcoal/80 leading-relaxed font-light">
          At PureYuna, we believe that skincare shouldn't force you to choose between the pure, nourishing power of botanicals and the proven results of clinical-grade actives.
        </p>
      </header>

      {/* Editorial Image & Philosophy */}
      <section className="grid gap-12 lg:grid-cols-2 items-center">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-2xl bg-taupe/20 p-2.5">
          <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-xl shadow-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop"
              alt="Skincare application and pure botanicals"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="font-heading text-3xl font-medium text-cocoa leading-tight">
            The PureYuna Philosophy
          </h2>
          <div className="space-y-6 text-charcoal/80 leading-relaxed font-light">
            <p>
              Our journey began with a simple quest: to formulate products that respect the skin's biological barrier while delivering visible, transformative changes.
            </p>
            <p>
              By combining high-potency organic botanical extracts (like soothing Camellia, nourishing Blue Tansy, and nutrient-dense Jojoba) with clean, scientifically-proven active compounds (such as multi-weight Hyaluronic Acids, Niacinamide, and bio-identical Ceramides), we create dual-benefit routines.
            </p>
            <p>
              Every drops is balanced for pH, meticulously tested for compatibility on sensitive skin types, and crafted to transform your daily routine into a mindful, therapeutic ritual.
            </p>
          </div>

          <div className="flex gap-4 items-center p-5 rounded-2xl bg-cream border border-taupe/40">
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-terracotta/10 text-terracotta">
              <Sparkles className="size-5.5" />
            </div>
            <div>
              <h4 className="font-semibold text-cocoa text-sm">Balanced Synergy</h4>
              <p className="text-xs text-charcoal/70 mt-0.5">
                Maximum efficacy with zero irritation, designed for clinical results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Promises */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-heading text-3xl font-medium text-cocoa">
            Our Purity & Sustainability Promise
          </h2>
          <p className="text-sm text-charcoal/70">
            We hold ourselves to the highest ethical standards, from soil to bottle.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-cream/50 border border-taupe/35 p-8 rounded-3xl space-y-5 hover:bg-cream transition-colors duration-300">
            <div className="grid size-12 place-items-center rounded-2xl bg-terracotta/10 text-terracotta">
              <Leaf className="size-6" />
            </div>
            <h3 className="font-heading text-xl font-medium text-cocoa">
              Ethical Sourcing
            </h3>
            <p className="text-sm text-charcoal/80 leading-relaxed font-light">
              We partner exclusively with certified organic farms that practice fair trade, biodiversity conservation, and crop rotation to harvest pure botanical ingredients.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-cream/50 border border-taupe/35 p-8 rounded-3xl space-y-5 hover:bg-cream transition-colors duration-300">
            <div className="grid size-12 place-items-center rounded-2xl bg-terracotta/10 text-terracotta">
              <Recycle className="size-6" />
            </div>
            <h3 className="font-heading text-xl font-medium text-cocoa">
              Recyclable Glass
            </h3>
            <p className="text-sm text-charcoal/80 leading-relaxed font-light">
              Our packaging is crafted from 90% recyclable glass and soy-based inks. We minimize single-use plastics to reduce our ecological footprint on the earth.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-cream/50 border border-taupe/35 p-8 rounded-3xl space-y-5 hover:bg-cream transition-colors duration-300">
            <div className="grid size-12 place-items-center rounded-2xl bg-terracotta/10 text-terracotta">
              <HeartHandshake className="size-6" />
            </div>
            <h3 className="font-heading text-xl font-medium text-cocoa">
              100% Cruelty-Free
            </h3>
            <p className="text-sm text-charcoal/80 leading-relaxed font-light">
              We never test on animals at any stage of product development. All formulations are certified vegan, hypoallergenic, and free from harmful parabens or synthetic fragrances.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Statement Section */}
      <section className="bg-cream border border-taupe/50 rounded-3xl p-8 md:p-12 grid gap-10 md:grid-cols-[1fr_2fr] items-center">
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-md">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
            alt="Yuna Cho, Founder of PureYuna"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 300px, 100vw"
          />
        </div>
        <div className="space-y-6">
          <span className="text-[0.62rem] font-bold tracking-widest text-terracotta uppercase">
            A Note from the Founder
          </span>
          <blockquote className="font-heading text-xl sm:text-2xl italic text-cocoa leading-relaxed">
            "Skin is our largest organ, and it deserves respect, not harsh chemicals. I created PureYuna to bring back luxury and wellness into our daily self-care rituals while delivering clinic-proven radiance."
          </blockquote>
          <div className="pt-2">
            <h5 className="font-semibold text-cocoa text-base">Yuna Cho</h5>
            <p className="text-xs text-charcoal/60 mt-0.5">Founder & Lead Formulator, PureYuna</p>
          </div>
        </div>
      </section>
    </div>
  );
}
