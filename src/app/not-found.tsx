"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-[#FAF5EF] px-6 text-center text-[#3A2820]">
      {/* Decorative Arch Background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
        <div className="w-[30rem] h-[45rem] rounded-t-full border-[8px] border-[#3A2820]" />
      </div>

      <div className="relative max-w-md mx-auto space-y-8">
        {/* Editorial Indicator */}
        <span className="text-[0.68rem] font-bold tracking-[0.3em] text-[#B86B4B] uppercase block">
          🌿 Error 404 · Sanctuary
        </span>

        {/* Asymmetric Framed Illustration */}
        <div className="relative mx-auto w-32 h-44 rounded-t-full rounded-b-2xl bg-gradient-to-br from-[#B86B4B]/10 to-[#3A2820]/10 border border-[#B86B4B]/20 flex items-center justify-center shadow-xs">
          <span className="text-4xl filter saturate-75">🌿</span>
        </div>

        <div className="space-y-3">
          <h1 className="font-heading text-4xl font-light tracking-tight text-[#3A2820] sm:text-5xl">
            Path Lost in Sanctuary
          </h1>
          <p className="text-sm leading-relaxed text-[#3A2820]/75 max-w-xs mx-auto">
            The skincare secret or botanical formula you are seeking does not reside at this location. Let us guide you back.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            variant="outline"
            className="border-[#3A2820]/25 text-[#3A2820] h-12 px-6 text-xs font-semibold cursor-pointer"
            render={<Link href="/" />}
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Home
          </Button>

          <Button
            variant="default"
            className="bg-[#B86B4B] hover:bg-[#A35939] text-[#FAF5EF] h-12 px-6 text-xs font-semibold cursor-pointer"
            render={<Link href="/products" />}
          >
            Explore Formulas
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
