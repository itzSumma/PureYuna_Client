"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Droplets, 
  Sparkles, 
  Smile, 
  Layers, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DiagnosticMetric {
  id: string;
  title: string;
  value: string;
  percentage: number;
  icon: typeof Sparkles;
  description: string;
  href: string;
  delay: string;
}

const leftMetrics: DiagnosticMetric[] = [
  {
    id: "oily",
    title: "OILY & SHINY",
    value: "Balanced & Shine-Free",
    percentage: 80,
    icon: Droplets,
    description: "Clarifying balance for shine-free confidence",
    href: "/products?skinType=oily",
    delay: "0s",
  },
  {
    id: "dry",
    title: "DRY & FLAKY",
    value: "Deep Moisture",
    percentage: 85,
    icon: Sparkles,
    description: "Nourishing replenishment for lasting hydration",
    href: "/products?skinType=dry",
    delay: "0.8s",
  },
  {
    id: "combination",
    title: "COMBINATION",
    value: "Dual Zone Care",
    percentage: 90,
    icon: Layers,
    description: "Targeted harmony for T-zone and dry zones",
    href: "/products?skinType=combination",
    delay: "1.6s",
  },
];

const rightMetrics: DiagnosticMetric[] = [
  {
    id: "normal",
    title: "NORMAL / BALANCED",
    value: "Perfect Harmony",
    percentage: 95,
    icon: Smile,
    description: "Effortless vitality and graceful equilibrium",
    href: "/products?skinType=normal",
    delay: "0.4s",
  },
  {
    id: "sensitive",
    title: "SENSITIVE",
    value: "Calm & Protect",
    percentage: 75,
    icon: ShieldCheck,
    description: "Gentle comfort and reinforced barrier strength",
    href: "/products?skinType=sensitive",
    delay: "1.2s",
  },
  {
    id: "all-skin",
    title: "ALL SKIN TYPES",
    value: "Universal Care",
    percentage: 100,
    icon: Sparkles,
    description: "Clean formulations crafted for every complexion",
    href: "/products",
    delay: "2.0s",
  },
];

export function SkinDiscoverySection() {
  const renderBadge = (metric: DiagnosticMetric) => {
    const Icon = metric.icon;

    return (
      <div 
        key={metric.id}
        style={{ animationDelay: metric.delay }}
        className="animate-skin-float"
      >
        <Link
          href={metric.href}
          className={cn(
            "group cursor-pointer select-none inline-block min-w-[210px] sm:min-w-[230px] w-auto transition-all duration-300 ease-out",
            "bg-white/95 backdrop-blur-md shadow-sm rounded-full px-5 py-2.5 border border-[#F2ECE5]",
            "hover:scale-105 hover:border-[#4A1E24]/60 hover:shadow-lg active:scale-98"
          )}
        >
          <div className="flex items-center gap-3">
            {/* Left Circle Icon */}
            <div className="w-7 h-7 rounded-full bg-[#4A1E24]/10 text-[#4A1E24] flex items-center justify-center text-xs shrink-0 group-hover:bg-[#4A1E24] group-hover:text-white transition-colors duration-300">
              <Icon className="size-3.5" strokeWidth={2.2} />
            </div>

            {/* Text & Progress */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6B66] whitespace-nowrap block">
                {metric.title}
              </span>
              <span className="text-xs font-serif font-medium text-[#241815] whitespace-nowrap block mt-0.5">
                {metric.value}
              </span>
              <div className="h-[2px] w-full bg-[#4A1E24]/20 rounded-full mt-1.5 overflow-hidden transition-colors duration-300 group-hover:bg-[#4A1E24]/30">
                <div
                  className="h-full rounded-full bg-[#4A1E24] transition-all duration-700 ease-out group-hover:bg-[#3D141A] group-hover:shadow-[0_0_8px_rgba(74,30,36,0.6)]"
                  style={{ width: `${metric.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-transparent border-t border-[#F2ECE5]/70">
      {/* Inline Pure CSS Keyframe Styles for Scanner & Gentle Floating */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes skinFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-skin-float {
          animation: skinFloat 5s ease-in-out infinite;
        }

        @keyframes skinScannerBeam {
          0% {
            top: 2%;
            opacity: 0.15;
          }
          15% {
            opacity: 0.9;
          }
          50% {
            top: 96%;
            opacity: 0.9;
          }
          65% {
            opacity: 0.9;
          }
          85% {
            opacity: 0.9;
          }
          100% {
            top: 2%;
            opacity: 0.15;
          }
        }
        .skin-scanner-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 15%, rgba(255, 240, 245, 0.95) 50%, rgba(255, 255, 255, 0.4) 85%, transparent 100%);
          box-shadow: 0 0 14px 3px rgba(255, 255, 255, 0.7), 0 0 28px 6px rgba(186, 116, 126, 0.35);
          animation: skinScannerBeam 4.5s ease-in-out infinite;
          pointer-events: none;
          z-index: 25;
        }
      ` }} />

      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[#4A1E24]/3 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#7A6B66] uppercase">
            SKIN ANALYSIS
          </p>
          <h2 className="mt-2.5 font-heading font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#241815]">
            Understand what your skin really needs
          </h2>
        </div>

        {/* Desktop Layout: 3 Columns (Left Badges | Model | Right Badges) */}
        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 max-w-5xl mx-auto">
          {/* Left Badges (aligned towards the model) */}
          <div className="flex flex-col items-end space-y-8 z-20">
            {leftMetrics.map((badge) => renderBadge(badge))}
          </div>

          {/* Center Model Frame with Diagnostic Scanner Beam */}
          <div className="relative w-full max-w-[380px] xl:max-w-[420px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/80 ring-1 ring-[#F2ECE5] bg-[#FDFBF7] z-10 shrink-0">
            <Image
              src="/images/skin-model.png"
              alt="Skin Analysis Diagnostic Model"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1280px) 380px, 420px"
            />

            {/* Glowing Skin Scanner Laser Line */}
            <div aria-hidden="true" className="skin-scanner-line" />

            {/* Subtle soft vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent"
            />
          </div>

          {/* Right Badges (aligned towards the model) */}
          <div className="flex flex-col items-start space-y-8 z-20">
            {rightMetrics.map((badge) => renderBadge(badge))}
          </div>
        </div>

        {/* Mobile & Tablet Layout (Model on top, 6 badges below) */}
        <div className="lg:hidden flex flex-col items-center">
          {/* Centered Model with Scanner Beam */}
          <div className="relative w-full max-w-[300px] sm:max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white/80 ring-1 ring-[#F2ECE5] bg-[#FDFBF7] mx-auto mb-8">
            <Image
              src="/images/skin-model.png"
              alt="Skin Analysis Diagnostic Model"
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 300px, 360px"
            />

            {/* Glowing Skin Scanner Laser Line */}
            <div aria-hidden="true" className="skin-scanner-line" />

            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent"
            />
          </div>

          {/* 6 Badges in a clean 2-column grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
            {leftMetrics.map((badge) => renderBadge(badge))}
            {rightMetrics.map((badge) => renderBadge(badge))}
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="mt-10 sm:mt-14 flex justify-center">
          <Link
            href="/build-package"
            className="group inline-flex items-center justify-center gap-2.5 bg-[#4A1E24] text-white px-8 py-3 rounded-full hover:bg-[#38151A] transition-all shadow-md font-medium text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A1E24]/50"
          >
            <span>Find Your Custom Routine</span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}