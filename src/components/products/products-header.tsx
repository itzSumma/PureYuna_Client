import React from "react";

export function ProductsHeader() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#DF8E73]/25 via-[#E89F88]/30 to-[#DF8E73]/25 px-8 py-16 text-center border border-peach/25">
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-[0.62rem] font-bold tracking-[0.24em] text-terracotta uppercase">
            The Collection
          </span>
          <h1 className="mt-3 font-heading text-4xl font-medium tracking-tight text-cocoa sm:text-5xl lg:text-6xl">
            Skincare. Tailored.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-cocoa/75 max-w-[50ch] mx-auto">
            Find formulas suited to your unique skin profiles. Clean, traceably sourced natural products and precision formulations.
          </p>
        </div>
        {/* Subtle background glow */}
        <div className="absolute -right-16 -top-16 size-48 rounded-full bg-white/10 blur-2xl" />
      </header>
    </div>
  );
}
