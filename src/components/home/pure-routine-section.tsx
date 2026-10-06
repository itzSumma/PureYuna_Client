"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Droplets, ShieldCheck, Sparkles } from "lucide-react";

import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { PURE_ROUTINE_STEPS } from "@/data/home-sections";

const stepIcons = [Droplets, Sparkles, ShieldCheck];

export function PureRitualSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-transparent border-t border-[#4A1E24]/10">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-[500px] rounded-full bg-[#4A1E24]/3 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 size-[500px] rounded-full bg-[#4A1E24]/3 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1360px] px-4 md:px-8 z-10">
        {/* ================= 1. THE 3-STEP EDITORIAL FLOW ================= */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold tracking-[0.24em] text-[#4A1E24] uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-[#4A1E24]/30" />
              The Pure Ritual
              <span aria-hidden="true" className="h-px w-8 bg-[#4A1E24]/30" />
            </p>
            <h2 className="mt-4 font-heading font-serif text-3xl font-medium tracking-tight text-[#241815] sm:text-4xl lg:text-[2.75rem] leading-tight lg:leading-snug py-1">
              Simplicity in three thoughtful steps
            </h2>
            <p className="mt-3.5 text-base sm:text-lg text-[#5C4F4A] leading-relaxed max-w-xl mx-auto">
              We stripped away unnecessary fillers and confusing 12-step rituals. Clean, potent, and effortless morning-to-night care.
            </p>
          </div>
        </Reveal>

        {/* Cardless Editorial Step Columns */}
        <div className="mt-12 sm:mt-16 grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
          {PURE_ROUTINE_STEPS.map((stepItem, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            const cleanCategory = stepItem.category
              .replace(/^Step\s*\d+\s*[·•-]\s*/i, "")
              .toUpperCase();

            return (
              <Reveal key={stepItem.step} delay={index * 0.12} className="h-full">
                <div className="group relative flex h-full flex-col justify-between">
                  <div>
                    {/* Top: Delicate Numbering & Phase Header */}
                    <div className="flex items-baseline justify-between border-b border-[#4A1E24]/10 pb-3 mb-4">
                      <span className="font-heading font-serif text-4xl md:text-5xl font-normal text-[#4A1E24]/40 leading-none select-none tracking-tight">
                        {stepItem.step}
                      </span>
                      <span className="text-xs md:text-sm tracking-widest font-semibold text-[#7A6B66] uppercase">
                        {index === 0 ? "Phase I" : index === 1 ? "Phase II" : "Phase III"}
                      </span>
                    </div>

                    {/* Center: Premium Soft Arch Shape Image */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[80px] rounded-b-2xl bg-[#FAF6F0] shadow-sm transition-all duration-500 ease-out group-hover:shadow-md">
                      <ImageWithFallback
                        fill
                        src={stepItem.image}
                        alt={`${stepItem.title} - Step ${stepItem.step}`}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Subtle bottom vignette gradient */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60"
                      />

                      {/* Step Icon Badge */}
                      <div className="absolute top-4 right-4 grid size-9 place-items-center rounded-full bg-white/90 backdrop-blur-md text-[#4A1E24] shadow-xs transition-colors duration-300 group-hover:bg-[#4A1E24] group-hover:text-white">
                        <Icon className="size-4" />
                      </div>

                      {/* Step Name Floating Pill */}
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-block rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-xs font-semibold tracking-wide text-[#4A1E24] shadow-xs">
                          {stepItem.title}
                        </span>
                      </div>
                    </div>

                    {/* Bottom: Typography & Content */}
                    <div className="pt-6">
                      {/* Step Sub-label */}
                      <p className="text-xs md:text-[13px] tracking-wider font-semibold text-[#4A1E24] uppercase">
                        STEP {stepItem.step} — {cleanCategory}
                      </p>

                      {/* Main Step Name */}
                      <h3 className="font-heading font-serif text-3xl md:text-4xl text-[#241815] font-normal my-2.5 tracking-tight">
                        {stepItem.title}
                      </h3>

                      {/* Benefit Tagline */}
                      <p className="text-base md:text-lg font-medium text-[#241815]/90 leading-snug mb-2">
                        {stepItem.tagline}
                      </p>

                      {/* Detailed Description */}
                      <p className="text-sm md:text-base text-[#5C4F4A] leading-relaxed">
                        {stepItem.description}
                      </p>

                      {/* Recommended Skin Types */}
                      {stepItem.recommendedTypes && (
                        <p className="mt-3 text-xs md:text-sm text-[#7A6B66] flex items-center gap-2">
                          <span className="size-1.5 rounded-full bg-[#4A1E24]/50" />
                          {stepItem.recommendedTypes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Ritual Tip Separator Line (Anchored at the bottom for equal baseline) */}
                  <div className="border-t border-[#4A1E24]/15 pt-3.5 mt-5 text-xs md:text-sm italic text-[#4A1E24] leading-relaxed">
                    <span className="font-semibold not-italic">Ritual tip:</span>{" "}
                    {stepItem.tip}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ================= 2. BORDERLESS GLASSPHORMIC PACKAGE BANNER ================= */}
        <Reveal delay={0.25}>
          <div className="mt-14 sm:mt-16 max-w-6xl mx-auto rounded-3xl border border-[#4A1E24]/20 bg-white/40 backdrop-blur-md p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_rgba(74,30,36,0.03)]">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A1E24] mb-2">
                <Sparkles className="size-3.5" />
                <span>Sanctuary Routine Package</span>
              </div>
              <h4 className="font-heading font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-[#241815]">
                Ready to build your complete custom 3-step routine?
              </h4>
              <p className="mt-2 text-sm md:text-base text-[#5C4F4A] leading-relaxed">
                Bundle your cleanser, targeted serum, and barrier cream for special sanctuary bundle pricing.
              </p>
            </div>
            <Button
              size="lg"
              variant="default"
              nativeButton={false}
              render={<Link href="/build-package" />}
              className="shrink-0 gap-2 bg-[#4A1E24] hover:bg-[#38151A] text-white text-xs sm:text-sm font-semibold h-11 px-7 rounded-full shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 group/btn"
            >
              <span>Build Your Package</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export const PureRoutineSection = PureRitualSection;
