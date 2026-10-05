"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Droplets, Leaf, ShieldCheck, Sparkles } from "lucide-react";

import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { KEY_INGREDIENTS, PURE_ROUTINE_STEPS } from "@/data/home-sections";

const stepIcons = [Droplets, Sparkles, ShieldCheck];

export function PureRoutineSection() {
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

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
        {/* ================= 1. THE 3-STEP EDITORIAL FLOW ================= */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="flex items-center justify-center gap-2.5 text-xs font-bold tracking-[0.24em] text-[#4A1E24] uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-[#4A1E24]/30" />
              The Pure Ritual
              <span aria-hidden="true" className="h-px w-8 bg-[#4A1E24]/30" />
            </p>
            <h2 className="mt-4 font-heading font-serif text-3xl font-medium tracking-tight text-[#241815] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Simplicity in three thoughtful steps
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-[#7A6B66] leading-relaxed max-w-xl mx-auto">
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
                  {/* Top: Delicate Numbering & Phase Header */}
                  <div className="flex items-baseline justify-between border-b border-[#4A1E24]/10 pb-3 mb-4">
                    <span className="font-heading font-serif text-4xl sm:text-5xl font-light text-[#4A1E24]/25 leading-none select-none tracking-tight">
                      {stepItem.step}
                    </span>
                    <span className="text-[10px] tracking-[0.25em] font-semibold text-[#7A6B66] uppercase">
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
                    <div className="absolute top-4 right-4 grid size-8 place-items-center rounded-full bg-white/90 backdrop-blur-md text-[#4A1E24] shadow-xs transition-colors duration-300 group-hover:bg-[#4A1E24] group-hover:text-white">
                      <Icon className="size-3.5" />
                    </div>

                    {/* Step Name Floating Pill */}
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium tracking-wide text-[#4A1E24] shadow-xs">
                        {stepItem.title}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Typography & Content */}
                  <div className="flex flex-col flex-1 justify-between pt-5">
                    <div>
                      {/* Step Sub-label */}
                      <p className="text-[11px] tracking-widest uppercase font-semibold text-[#7A6B66]">
                        STEP {stepItem.step} — {cleanCategory}
                      </p>

                      {/* Main Step Name */}
                      <h3 className="font-heading font-serif text-2xl font-medium text-[#241815] mt-1.5 mb-2 tracking-tight">
                        {stepItem.title}
                      </h3>

                      {/* Benefit Tagline */}
                      <p className="text-xs sm:text-sm font-medium text-[#241815]/90 leading-snug mb-2">
                        {stepItem.tagline}
                      </p>

                      {/* Detailed Description */}
                      <p className="text-xs sm:text-sm text-[#7A6B66] leading-relaxed">
                        {stepItem.description}
                      </p>

                      {/* Recommended Skin Types */}
                      {stepItem.recommendedTypes && (
                        <p className="mt-2.5 text-[11px] font-medium text-[#4A1E24]/80 flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-[#4A1E24]/40" />
                          {stepItem.recommendedTypes}
                        </p>
                      )}
                    </div>

                    {/* Ritual Tip Separator Line */}
                    <div className="border-t border-[#4A1E24]/10 pt-3 mt-4 text-xs italic text-[#7A6B66]">
                      <span className="font-semibold not-italic text-[#4A1E24]">Ritual tip:</span>{" "}
                      {stepItem.tip}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ================= 2. BORDERLESS GLASSPHORMIC PACKAGE BANNER ================= */}
        <Reveal delay={0.25}>
          <div className="mt-14 sm:mt-16 rounded-3xl border border-[#4A1E24]/20 bg-white/40 backdrop-blur-md p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_30px_rgba(74,30,36,0.03)]">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A1E24] mb-2">
                <Sparkles className="size-3.5" />
                <span>Sanctuary Routine Package</span>
              </div>
              <h4 className="font-heading font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-[#241815]">
                Ready to build your complete custom 3-step routine?
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#7A6B66] leading-relaxed">
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

        {/* ================= 3. KEY INGREDIENTS PHILOSOPHY ================= */}
        <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-[#4A1E24]/10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="flex items-center justify-center gap-2 text-xs font-bold tracking-[0.24em] text-[#4A1E24] uppercase">
                <Leaf className="size-3.5 text-[#4A1E24]" />
                Ingredients That Matter
              </p>
              <h2 className="mt-3.5 font-heading font-serif text-3xl font-medium tracking-tight text-[#241815] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Botanical elegance. Clinical potency.
              </h2>
              <p className="mt-3.5 text-xs sm:text-sm text-[#7A6B66] leading-relaxed">
                Every formula begins with sustainably sourced wild botanicals and is amplified by bio-fermented clinical actives.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {KEY_INGREDIENTS.map((ingredient, index) => (
              <Reveal key={ingredient.id} delay={index * 0.08} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#4A1E24]/15 bg-white/60 backdrop-blur-xs shadow-xs transition-all duration-700 ease-in-out hover:-translate-y-1.5 hover:bg-[#4A1E24] hover:border-[#4A1E24] hover:shadow-xl">
                  {/* Top Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F0]">
                    <ImageWithFallback
                      fill
                      src={ingredient.image}
                      alt={ingredient.name}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Category pill overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-white/90 backdrop-blur-md border border-[#4A1E24]/10 px-2.5 py-0.5 text-[0.62rem] font-bold tracking-wider text-[#4A1E24] uppercase shadow-xs transition-all duration-500 ease-in-out group-hover:bg-[#FAF5F0] group-hover:text-[#4A1E24] group-hover:border-white/90 group-hover:shadow-sm">
                        {ingredient.type}
                      </span>
                    </div>
                    {/* Concentration pill overlay */}
                    {ingredient.concentration && (
                      <div className="absolute bottom-2.5 right-2.5">
                        <span className="rounded-full bg-[#241815]/85 backdrop-blur-md border border-white/10 px-2 py-0.5 text-[0.62rem] font-medium tracking-wide text-white shadow-xs transition-all duration-500 ease-in-out group-hover:bg-black/60 group-hover:border-white/30 group-hover:text-white">
                          {ingredient.concentration}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Name & Origin */}
                      <h3 className="font-heading font-serif text-lg font-semibold text-[#241815] leading-snug transition-colors duration-500 ease-in-out group-hover:text-white">
                        {ingredient.name}
                      </h3>
                      <p className="text-[11px] font-medium text-[#4A1E24] tracking-wide mt-0.5 transition-colors duration-500 ease-in-out group-hover:text-[#FAF6F0]/80">
                        Source: {ingredient.origin}
                      </p>

                      {/* Description */}
                      <p className="mt-2.5 text-xs leading-relaxed text-[#7A6B66] transition-colors duration-500 ease-in-out group-hover:text-[#FAF6F0]/85">
                        {ingredient.description}
                      </p>
                    </div>

                    {/* Benefits Checkmarks */}
                    <div className="mt-5 pt-3.5 border-t border-[#4A1E24]/10 transition-colors duration-500 ease-in-out group-hover:border-white/15">
                      <ul className="space-y-1.5">
                        {ingredient.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-center gap-2 text-xs font-medium text-[#241815] transition-colors duration-500 ease-in-out group-hover:text-[#FAF6F0]"
                          >
                            <span className="grid size-4 place-items-center rounded-full bg-[#4A1E24]/10 text-[#4A1E24] shrink-0 border border-[#4A1E24]/20 transition-all duration-500 ease-in-out group-hover:bg-white/20 group-hover:border-white/40 group-hover:text-white">
                              <Check className="size-2.5" strokeWidth={3} />
                            </span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
