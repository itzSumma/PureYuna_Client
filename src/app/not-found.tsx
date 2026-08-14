"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-cream px-6 py-12 text-center">
      {/* Decorative Arch Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
        <div className="w-[30rem] h-[45rem] rounded-t-full border-[8px] border-golden-border" />
      </div>

      <div className="relative max-w-md mx-auto bg-white text-deep-brown border border-golden-border rounded-t-[140px] p-10 shadow-lg space-y-8">
        {/* Editorial Indicator */}
        <span className="text-deep-brown/80 tracking-widest text-xs uppercase block font-medium">
          ✨ Error 404 · Sanctuary
        </span>

        {/* Asymmetric Framed Illustration */}
        <div className="relative mx-auto w-32 h-44 rounded-t-full rounded-b-2xl bg-cream/80 border border-golden-border flex items-center justify-center shadow-xs">
          <span className="text-4xl filter saturate-75">🌿</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-deep-brown font-heading text-3xl sm:text-4xl font-normal tracking-tight leading-tight">
            Path Lost in Sanctuary
          </h1>
          <p className="text-deep-brown/85 text-sm max-w-md mx-auto leading-relaxed">
            The skincare secret or botanical formula you are seeking does not reside at this location. Let us guide you back.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="flex items-center justify-center text-deep-brown border border-golden-border hover:bg-deep-brown/5 rounded-xl px-6 py-2.5 transition-all cursor-pointer font-medium"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="flex items-center justify-center bg-caramel text-white hover:bg-caramel/90 font-medium rounded-xl px-6 py-2.5 shadow-sm transition-all cursor-pointer"
          >
            Explore Formulas
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
