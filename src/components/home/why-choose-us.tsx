"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Award, 
  Coins, 
  Leaf, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";
import { useState } from "react";

export function WhyChooseUsSection() {
  const [bottomImg, setBottomImg] = useState(
    "https://images.unsplash.com/photo-1512290903671-17adc81702d0?auto=format&fit=crop&w=800&q=90"
  );

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-transparent border-t border-[#F2ECE5]/70">
      {/* Pure CSS Keyframes for Staggered Orbital Float, Shimmer Glaze, and Breathing Glow */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orbitalFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-orbital-float {
          animation: orbitalFloat 6s ease-in-out infinite;
        }
        .animate-orbital-float:hover {
          animation-play-state: paused;
        }

        @keyframes glossShimmer {
          0% {
            transform: translateX(-150%) rotate(25deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          45%, 100% {
            transform: translateX(250%) rotate(25deg);
            opacity: 0;
          }
        }
        .shimmer-glaze {
          position: absolute;
          top: -60%;
          bottom: -60%;
          left: 0;
          width: 70%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0) 20%,
            rgba(255, 255, 255, 0.45) 50%,
            rgba(255, 255, 255, 0) 80%,
            transparent 100%
          );
          animation: glossShimmer 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          pointer-events: none;
          z-index: 15;
        }

        @keyframes sparklePulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.85;
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
          }
          50% {
            transform: scale(1.18) rotate(10deg);
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(74, 30, 36, 0.5));
          }
        }
        .animate-sparkle-pulse {
          animation: sparklePulse 3.5s ease-in-out infinite;
        }

        @keyframes buttonBreathe {
          0%, 100% {
            box-shadow: 0 4px 14px 0 rgba(74, 30, 36, 0.25);
          }
          50% {
            box-shadow: 0 6px 22px 2px rgba(74, 30, 36, 0.4);
          }
        }
        .animate-button-breathe {
          animation: buttonBreathe 4s ease-in-out infinite;
        }
      ` }} />

      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-[#4A1E24]/3 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
        {/* ================= DESKTOP LAYOUT (Exact Canvas Matching) ================= */}
        <div className="relative w-full max-w-5xl mx-auto h-[680px] lg:h-[720px] hidden md:flex items-center justify-center">
          {/* 1. Center Content */}
          <div className="z-10 text-center max-w-xs px-2 flex flex-col items-center">
            {/* Sparkle Decoration Accent */}
            <div className="relative inline-block mb-1">
              <span className="absolute -top-3.5 -right-5 text-[#4A1E24] animate-sparkle-pulse pointer-events-none">
                <Sparkles className="size-4.5" />
              </span>
              <h2 className="font-heading font-serif text-3xl lg:text-[2.2rem] font-medium tracking-tight text-[#241815] leading-snug">
                Why Choose Our Products?
              </h2>
            </div>

            <p className="mt-2.5 text-xs text-[#7A6B66] leading-relaxed max-w-[240px]">
              Various reasons why you should buy our products to increase your beauty to the maximum
            </p>

            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-1.5 bg-[#4A1E24] text-white text-xs px-6 py-2.5 rounded-full hover:bg-[#38151A] hover:scale-105 active:scale-95 transition-all duration-300 font-medium group animate-button-breathe"
            >
              <span>Learn More</span>
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 2. Six Surrounding Fixed Floating Elements with Staggered Delays */}

          {/* [Top Left]: Best Price Squircle Card */}
          <div 
            style={{ animationDelay: "0s" }} 
            className="animate-orbital-float absolute top-4 left-[20%] w-44 h-48 z-20"
          >
            <div className="relative w-full h-full rounded-[32px] bg-[#D7C7DE]/40 backdrop-blur-md border border-[#4A1E24]/10 p-4 flex flex-col justify-center items-center text-center shadow-[0_12px_30px_rgba(180,150,190,0.2)] hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 cursor-pointer overflow-hidden group">
              {/* Shimmer glaze */}
              <div className="shimmer-glaze" style={{ animationDelay: "0s" }} />

              {/* Corner Glint Sparkle */}
              <div className="absolute top-3 right-3 text-white/90 animate-sparkle-pulse pointer-events-none">
                <Sparkles className="size-3.5 fill-white/80 text-white" />
              </div>

              <div className="size-9 rounded-full bg-white/70 text-[#4A1E24] flex items-center justify-center mb-2.5 shadow-xs transition-transform duration-300 group-hover:scale-110">
                <Coins className="size-4.5" />
              </div>
              <h4 className="font-heading font-serif text-base font-semibold text-[#241815]">
                Best Price
              </h4>
              <p className="text-[11px] leading-tight text-[#241815]/70 mt-1.5 px-1">
                Affordable luxury with honest clinical value
              </p>
            </div>
          </div>

          {/* [Top Right]: Portrait Model Arch Image (High-Resolution Crisp) */}
          <div 
            style={{ animationDelay: "0.8s" }} 
            className="animate-orbital-float absolute top-6 right-[20%] w-40 h-52 z-20"
          >
            <div className="relative w-full h-full rounded-t-full rounded-b-3xl overflow-hidden shadow-lg border-2 border-white/80 bg-[#FAF6F0] hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 group">
              {/* Shimmer glaze */}
              <div className="shimmer-glaze" style={{ animationDelay: "2.5s" }} />

              {/* Hand-drawn sketch sparkle above arch */}
              <div className="absolute -top-1 left-2 text-[#4A1E24] animate-sparkle-pulse pointer-events-none z-20">
                <Sparkles className="size-4 text-[#4A1E24]" />
              </div>

              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=90"
                alt="Skincare serum application"
                fill
                unoptimized
                sizes="160px"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
              />
            </div>
          </div>

          {/* [Middle Left]: Guaranteed Burgundy Pill (Expanded w-56 md:w-64 min-h-[90px]) */}
          <div 
            style={{ animationDelay: "1.6s" }} 
            className="animate-orbital-float absolute top-1/2 -translate-y-1/2 left-4 w-56 md:w-64 min-h-[90px] z-20"
          >
            <div className="relative w-full h-full rounded-2xl bg-[#4A1E24] text-white p-4 flex items-center gap-3 shadow-[0_15px_35px_rgba(74,30,36,0.25)] border border-white/10 hover:bg-[#38151A] hover:-translate-y-1.5 hover:scale-[1.03] transition-all duration-300 cursor-pointer group">
              <div className="size-9 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheck className="size-4.5" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <h4 className="font-heading font-serif text-base font-semibold leading-tight text-white">
                  Guaranteed
                </h4>
                <p className="text-[11px] leading-snug text-white/80 mt-1">
                  100% genuine formulas & proven visible efficacy
                </p>
              </div>
            </div>
          </div>

          {/* [Middle Right]: Best Quality Burgundy Pill (Expanded w-56 md:w-64 min-h-[90px]) */}
          <div 
            style={{ animationDelay: "0.4s" }} 
            className="animate-orbital-float absolute top-1/2 -translate-y-1/2 right-4 w-56 md:w-64 min-h-[90px] z-20"
          >
            <div className="relative w-full h-full rounded-2xl bg-[#4A1E24] text-white p-4 flex items-center gap-3 shadow-[0_15px_35px_rgba(74,30,36,0.25)] border border-white/10 hover:bg-[#38151A] hover:-translate-y-1.5 hover:scale-[1.03] transition-all duration-300 cursor-pointer group">
              {/* Corner Glint Sparkle */}
              <div className="absolute top-2 right-3 text-white/90 animate-sparkle-pulse pointer-events-none">
                <Sparkles className="size-2.5 fill-white text-white" />
              </div>

              <div className="size-9 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Award className="size-4.5" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <h4 className="font-heading font-serif text-base font-semibold leading-tight text-white">
                  Best Quality
                </h4>
                <p className="text-[11px] leading-snug text-white/80 mt-1">
                  Certified grade-A pure botanical extracts
                </p>
              </div>
            </div>
          </div>

          {/* [Bottom Left]: Lifestyle Circular Photo (High-Resolution Crisp) */}
          <div 
            style={{ animationDelay: "1.2s" }} 
            className="animate-orbital-float absolute bottom-6 left-[18%] w-48 h-48 z-20"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-xl border-4 border-white/90 ring-1 ring-[#4A1E24]/10 bg-[#FAF6F0] hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 group">
              <Image
                src={bottomImg}
                alt="Skincare lifestyle routine"
                fill
                unoptimized
                sizes="192px"
                onError={() => setBottomImg("/hero-portrait.jpg")}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />
            </div>
          </div>

          {/* [Bottom Right]: Eco - Friendly Light Squircle Card */}
          <div 
            style={{ animationDelay: "2.0s" }} 
            className="animate-orbital-float absolute bottom-4 right-[18%] w-44 h-44 z-20"
          >
            <div className="relative w-full h-full rounded-[32px] bg-white/80 backdrop-blur-md border border-[#F2ECE5] p-4 flex flex-col justify-center items-center text-center shadow-[0_12px_30px_rgba(74,30,36,0.06)] hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 cursor-pointer overflow-hidden group">
              {/* Shimmer glaze */}
              <div className="shimmer-glaze" style={{ animationDelay: "4.5s" }} />

              <div className="size-9 rounded-full bg-[#4A1E24]/10 text-[#4A1E24] flex items-center justify-center mb-2.5 transition-transform duration-300 group-hover:scale-110">
                <Leaf className="size-4.5" />
              </div>
              <h4 className="font-heading font-serif text-base font-semibold text-[#241815]">
                Eco - Friendly
              </h4>
              <p className="text-[11px] leading-tight text-[#7A6B66] mt-1.5 px-1">
                100% recyclable amber glass & clean packaging
              </p>
            </div>
          </div>
        </div>

        {/* ================= MOBILE & TABLET LAYOUT (< md) ================= */}
        <div className="md:hidden flex flex-col items-center">
          {/* Header */}
          <div className="text-center max-w-sm mx-auto mb-8 px-4 flex flex-col items-center">
            <div className="relative inline-block mb-1">
              <span className="absolute -top-3.5 -right-5 text-[#4A1E24] animate-sparkle-pulse">
                <Sparkles className="size-4" />
              </span>
              <h2 className="font-heading font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#241815]">
                Why Choose Our Products?
              </h2>
            </div>
            <p className="mt-2 text-xs text-[#7A6B66] leading-relaxed">
              Various reasons why you should buy our products to increase your beauty to the maximum
            </p>
            <Link
              href="/about"
              className="mt-3.5 inline-flex items-center gap-1.5 bg-[#4A1E24] hover:bg-[#38151A] text-white text-xs px-6 py-2.5 rounded-full transition-all shadow-md font-medium"
            >
              <span>Learn More</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* 6 Grid Items */}
          <div className="grid grid-cols-2 gap-3.5 w-full max-w-lg mx-auto">
            {/* 1. Best Price */}
            <div className="relative rounded-[28px] bg-[#D7C7DE]/40 border border-[#4A1E24]/10 p-4 flex flex-col justify-center items-center text-center shadow-xs min-h-[150px] overflow-hidden">
              <div className="shimmer-glaze" style={{ animationDelay: "0s" }} />
              <div className="size-8 rounded-full bg-white/70 text-[#4A1E24] flex items-center justify-center mb-2 shadow-xs">
                <Coins className="size-4" />
              </div>
              <h4 className="font-heading font-serif text-sm font-semibold text-[#241815]">
                Best Price
              </h4>
              <p className="text-[10px] leading-tight text-[#241815]/70 mt-1">
                Affordable luxury value
              </p>
            </div>

            {/* 2. Top Right Image */}
            <div className="relative rounded-t-full rounded-b-3xl overflow-hidden shadow-xs border border-white/60 bg-[#FAF6F0] min-h-[150px]">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=90"
                alt="Skincare serum application"
                fill
                unoptimized
                sizes="180px"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* 3. Guaranteed */}
            <div className="w-full rounded-2xl bg-[#4A1E24] hover:bg-[#38151A] text-white p-3.5 flex items-center gap-2.5 shadow-md min-h-[90px] transition-colors duration-300">
              <div className="size-8 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="size-4" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <h4 className="font-heading font-serif text-sm font-semibold leading-tight text-white">
                  Guaranteed
                </h4>
                <p className="text-[10px] leading-tight text-white/80 mt-0.5">
                  100% genuine results
                </p>
              </div>
            </div>

            {/* 4. Best Quality */}
            <div className="w-full rounded-2xl bg-[#4A1E24] hover:bg-[#38151A] text-white p-3.5 flex items-center gap-2.5 shadow-md min-h-[90px] transition-colors duration-300">
              <div className="size-8 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0">
                <Award className="size-4" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <h4 className="font-heading font-serif text-sm font-semibold leading-tight text-white">
                  Best Quality
                </h4>
                <p className="text-[10px] leading-tight text-white/80 mt-0.5">
                  Certified botanicals
                </p>
              </div>
            </div>

            {/* 5. Bottom Left Image */}
            <div className="relative rounded-full overflow-hidden shadow-xs border-2 border-white/80 bg-[#FAF6F0] aspect-square w-36 h-36 mx-auto">
              <Image
                src={bottomImg}
                alt="Skincare lifestyle routine"
                fill
                unoptimized
                sizes="144px"
                onError={() => setBottomImg("/hero-portrait.jpg")}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 6. Eco - Friendly */}
            <div className="relative rounded-[28px] bg-white/80 backdrop-blur-sm border border-[#F2ECE5] p-4 flex flex-col justify-center items-center text-center shadow-xs min-h-[150px] overflow-hidden">
              <div className="shimmer-glaze" style={{ animationDelay: "3s" }} />
              <div className="size-8 rounded-full bg-[#4A1E24]/10 text-[#4A1E24] flex items-center justify-center mb-2">
                <Leaf className="size-4" />
              </div>
              <h4 className="font-heading font-serif text-sm font-semibold text-[#241815]">
                Eco - Friendly
              </h4>
              <p className="text-[10px] leading-tight text-[#7A6B66] mt-1">
                100% recyclable glass
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
