"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, HeartHandshake, Leaf, Quote, ShieldCheck, Sparkles, Star, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { CUSTOMER_REVIEWS, COMMUNITY_STATS, type CommunityStatIcon } from "@/data/home-sections";

const STAT_ICONS: Record<CommunityStatIcon, LucideIcon> = {
  Star,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Leaf,
  CheckCircle2,
};

function ReviewAvatar({ name, src }: { name: string; src: string }) {
  const [imageError, setImageError] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative size-11 sm:size-12 shrink-0 rounded-full overflow-hidden border border-golden-border/80 bg-champagne shadow-xs flex items-center justify-center font-heading text-xs font-semibold text-caramel select-none">
      {!imageError ? (
        <Image
          fill
          src={src}
          alt={`${name} portrait`}
          sizes="48px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

export function CustomerReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-cream py-12 sm:py-16 lg:py-20 border-t border-golden-border/60">
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            {/* Rating Stars Header */}
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
              ))}
            </div>

            <p className="text-xs font-bold tracking-[0.24em] text-caramel uppercase">
              Sanctuary Community
            </p>
            <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight text-deep-brown sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Real skin. Honest transformations.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-deep-brown/80 leading-relaxed">
              Read how thousands of conscious skincare lovers simplified their daily rituals and achieved balanced, lasting radiance.
            </p>
          </div>
        </Reveal>

        {/* Testimonials Grid */}
        <div className="mt-10 sm:mt-12 grid gap-6 md:grid-cols-3">
          {CUSTOMER_REVIEWS.map((review, index) => (
            <Reveal key={review.id} delay={index * 0.1} className="h-full">
              <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-golden-border bg-white/70 p-6 sm:p-7 shadow-xs transition-all duration-700 ease-in-out hover:-translate-y-1.5 hover:bg-[#FDF6F0] hover:shadow-xl hover:border-caramel/40">
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <Quote className="size-5 text-caramel/20 transition-colors duration-500 ease-in-out group-hover:text-caramel/40" />
                  </div>

                  {/* Skin Type Tag */}
                  <div className="mt-4">
                    <span className="inline-block rounded-full bg-deep-brown/5 border border-deep-brown/10 px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-wider text-deep-brown/80 uppercase">
                      {review.skinType}
                    </span>
                  </div>

                  {/* Review Quote Text */}
                  <p className="mt-4 font-serif text-sm sm:text-[15px] italic text-deep-brown/85 leading-relaxed">
                    &ldquo;{review.review}&rdquo;
                  </p>
                </div>

                {/* Author Info with Authentic Avatar & Verified Badge */}
                <div className="mt-6 pt-5 border-t border-golden-border/60">
                  <div className="flex items-center gap-3">
                    <ReviewAvatar name={review.name} src={review.avatar} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-heading text-base font-semibold text-deep-brown truncate">
                          {review.name}
                        </p>
                        {review.verified && (
                          <span className="shrink-0 flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-2 py-0.5">
                            <CheckCircle2 className="size-3 text-emerald-600" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-deep-brown/60 truncate">
                        {review.location}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-[10px] text-caramel/75 font-medium truncate">
                    Used: {review.productUsed}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Trust Stat Bar */}
        <Reveal delay={0.2}>
          <div className="mt-10 sm:mt-12 rounded-3xl border border-golden-border/60 bg-[#FBF6F1]/80 backdrop-blur-md shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-golden-border/50 text-center">
              {COMMUNITY_STATS.map((stat) => {
                const IconComponent = stat.icon ? STAT_ICONS[stat.icon] : null;
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center justify-center py-6 sm:py-7 px-4"
                  >
                    {IconComponent && (
                      <div className="size-10 sm:size-11 rounded-full bg-caramel/10 text-caramel flex items-center justify-center mb-3">
                        <IconComponent className="size-5" />
                      </div>
                    )}
                    <p className="font-heading text-3xl sm:text-4xl font-semibold text-deep-brown">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] sm:text-xs font-bold tracking-[0.2em] text-deep-brown/70 uppercase">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
