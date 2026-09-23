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
    <section className="relative overflow-hidden bg-cream py-12 sm:py-16 lg:py-20 border-t border-golden-border/60">
      {/* Background ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-[#E3C2B0]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-[#E3C2B0]/15 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
        {/* ================= 1. THE 3-STEP ROUTINE ================= */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="flex items-center justify-center gap-2.5 text-xs font-bold tracking-[0.24em] text-caramel uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-caramel/40" />
              The Pure Ritual
              <span aria-hidden="true" className="h-px w-8 bg-caramel/40" />
            </p>
            <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-deep-brown sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Simplicity in three thoughtful steps
            </h2>
            <p className="mt-4 text-base sm:text-lg text-deep-brown/80 leading-relaxed">
              We stripped away unnecessary fillers and confusing 12-step rituals. Clean, potent, and effortless morning-to-night care.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-12 grid gap-6 md:grid-cols-3">
          {PURE_ROUTINE_STEPS.map((stepItem, index) => {
            const Icon = stepIcons[index % stepIcons.length];
            return (
              <Reveal key={stepItem.step} delay={index * 0.1} className="h-full">
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-golden-border bg-white/70 shadow-xs transition-all duration-700 ease-in-out hover:-translate-y-1.5 hover:bg-[#FDF6F0] hover:shadow-xl hover:border-caramel/40">
                  {/* Top Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand/20">
                    <ImageWithFallback
                      fill
                      src={stepItem.image}
                      alt={`${stepItem.title} - Step ${stepItem.step}`}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Floating Step Number badge over image */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-cream/90 backdrop-blur-md border border-golden-border/60 px-3 py-1 shadow-xs">
                      <span className="font-heading text-xs font-bold text-caramel tracking-wider">
                        STEP {stepItem.step}
                      </span>
                    </div>
                    {/* Floating Step Icon */}
                    <div className="absolute top-3.5 right-3.5 grid size-9 place-items-center rounded-full bg-cream/90 backdrop-blur-md border border-golden-border/60 text-caramel shadow-xs transition-all duration-500 ease-in-out group-hover:bg-caramel group-hover:text-warm-white">
                      <Icon className="size-4" />
                    </div>
                  </div>

                  {/* Step Title & Details */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[11px] font-bold tracking-[0.2em] text-caramel/90 uppercase">
                        {stepItem.category}
                      </span>
                      <h3 className="mt-1 font-heading text-2xl font-semibold tracking-tight text-deep-brown">
                        {stepItem.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm font-medium text-deep-brown/90 leading-snug">
                        {stepItem.tagline}
                      </p>
                      <p className="mt-3 text-xs sm:text-sm text-deep-brown/75 leading-relaxed">
                        {stepItem.description}
                      </p>
                    </div>

                    {/* Ritual Tip Pill */}
                    <div className="mt-6 pt-4 border-t border-golden-border/60">
                      <p className="text-[11px] text-deep-brown/70 leading-relaxed">
                        <span className="font-bold text-caramel">Ritual tip:</span> {stepItem.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Build Package CTA Link Banner */}
        <Reveal delay={0.25}>
          <div className="mt-10 sm:mt-12 rounded-2xl border border-golden-border bg-gradient-to-r from-[#FAF5F0] via-champagne to-[#FAF5F0] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <h4 className="font-heading text-xl sm:text-2xl font-medium text-deep-brown">
                Ready to build your complete custom 3-step routine?
              </h4>
              <p className="mt-1 text-sm text-deep-brown/75">
                Bundle your cleanser, targeted serum, and barrier cream for special sanctuary bundle pricing.
              </p>
            </div>
            <Button
              size="lg"
              variant="default"
              nativeButton={false}
              render={<Link href="/build-package" />}
              className="shrink-0 gap-2 text-sm font-semibold h-11 px-6 shadow-sm cursor-pointer"
            >
              Build Your Package
              <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
            </Button>
          </div>
        </Reveal>

        {/* ================= 2. KEY INGREDIENTS PHILOSOPHY ================= */}
        <div className="mt-14 sm:mt-16 pt-10 sm:pt-14 border-t border-golden-border/60">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="flex items-center justify-center gap-2.5 text-xs font-bold tracking-[0.24em] text-caramel uppercase">
                <Leaf className="size-3.5 text-caramel" />
                Ingredients That Matter
              </p>
              <h2 className="mt-4 font-heading text-3xl font-medium tracking-tight text-deep-brown sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Botanical elegance. Clinical potency.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-deep-brown/80 leading-relaxed">
                Every formula begins with sustainably sourced wild botanicals and is amplified by bio-fermented clinical actives.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 sm:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {KEY_INGREDIENTS.map((ingredient, index) => (
              <Reveal key={ingredient.id} delay={index * 0.08} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-golden-border bg-white/70 shadow-xs transition-all duration-700 ease-in-out hover:-translate-y-1.5 hover:bg-[#4A1E27] hover:border-[#4A1E27] hover:shadow-xl">
                  {/* Top Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand/20">
                    <ImageWithFallback
                      fill
                      src={ingredient.image}
                      alt={ingredient.name}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Category pill overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-cream/90 backdrop-blur-md border border-golden-border/60 px-2.5 py-0.5 text-[0.62rem] font-bold tracking-wider text-caramel uppercase shadow-xs transition-all duration-500 ease-in-out group-hover:bg-[#FAF5F0] group-hover:text-[#4A1E27] group-hover:border-white/90 group-hover:shadow-sm">
                        {ingredient.type}
                      </span>
                    </div>
                    {/* Concentration pill overlay */}
                    {ingredient.concentration && (
                      <div className="absolute bottom-2.5 right-2.5">
                        <span className="rounded-full bg-deep-brown/85 backdrop-blur-md border border-white/10 px-2 py-0.5 text-[0.62rem] font-medium tracking-wide text-warm-white shadow-xs transition-all duration-500 ease-in-out group-hover:bg-black/60 group-hover:border-white/30 group-hover:text-white">
                          {ingredient.concentration}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Name & Origin */}
                      <h3 className="font-heading text-xl font-semibold text-deep-brown leading-snug transition-colors duration-500 ease-in-out group-hover:text-white">
                        {ingredient.name}
                      </h3>
                      <p className="text-[11px] font-medium text-caramel tracking-wide mt-0.5 transition-colors duration-500 ease-in-out group-hover:text-warm-white/80">
                        Source: {ingredient.origin}
                      </p>

                      {/* Description */}
                      <p className="mt-3 text-xs leading-relaxed text-deep-brown/75 transition-colors duration-500 ease-in-out group-hover:text-warm-white/80">
                        {ingredient.description}
                      </p>
                    </div>

                    {/* Benefits Checkmarks */}
                    <div className="mt-5 pt-4 border-t border-golden-border/60 transition-colors duration-500 ease-in-out group-hover:border-white/15">
                      <ul className="space-y-1.5">
                        {ingredient.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-2 text-xs font-medium text-deep-brown/85 transition-colors duration-500 ease-in-out group-hover:text-[#FAF5F0]">
                            <span className="grid size-4 place-items-center rounded-full bg-caramel/15 text-caramel shrink-0 border border-caramel/20 transition-all duration-500 ease-in-out group-hover:bg-white/20 group-hover:border-white/40 group-hover:text-white">
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
