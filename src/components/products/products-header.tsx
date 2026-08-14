import React from "react";

export function ProductsHeader() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-golden/20 via-champagne/30 to-golden/20 px-8 py-16 text-center border border-golden-border/25">
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-caramel font-medium tracking-[0.2em] uppercase text-xs sm:text-sm mb-2 block">
            BOTANICAL PURITY & CLINICAL PRECISION
          </span>
          <h1 className="text-deep-brown font-serif font-normal text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
            Nourish. Restore. Radiate.
          </h1>
          <p className="text-deep-brown/85 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Immerse your skin in mindful rituals. Discover cold-pressed organic botanicals balanced with clinical-grade active formulations, thoughtfully crafted to support your skin’s natural barrier.
          </p>
        </div>
        {/* Subtle background glow */}
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-white/10 blur-2xl" />
      </header>
    </div>
  );
}
