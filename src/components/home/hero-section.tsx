"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";

const trustPoints = ["Cruelty-free", "Vegan formulas", "Traceable sourcing"];

const EASE_OUT = [0.25, 1, 0.5, 1] as any;

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 15 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_OUT },
    },
  };

  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[45fr_55fr] lg:gap-16 lg:px-8 lg:pt-20 lg:pb-24">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="max-w-xl"
        >
          <motion.p
            variants={itemVariants}
            className="flex items-center gap-3 text-xs font-semibold tracking-widest text-deep-brown uppercase"
          >
            <span aria-hidden="true" className="h-px w-8 bg-caramel/30" />
            Pure care, made for your skin
          </motion.p>
 
          <h1 className="mt-6 font-heading text-5xl leading-[1.05] font-medium tracking-tight text-balance sm:text-6xl lg:text-[4.75rem] text-deep-brown">
            <motion.span variants={itemVariants} className="block">
              Luxurious.
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="block italic text-caramel"
            >
              Effective.
            </motion.span>
            <motion.span variants={itemVariants} className="block">
              Conscious.
            </motion.span>
          </h1>
 
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-[42ch] text-lg leading-relaxed text-deep-brown/75"
          >
            Honest, minimal routines built on botanical and precision
            actives — matched to your skin type, and priced without the
            hidden extras.
          </motion.p>
 
          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col gap-3.5 sm:flex-row"
          >
            <Button
              size="lg"
              render={<Link href="/products" />}
              className="gap-2 text-lg font-medium h-12 px-7"
            >
              Explore Products
              <ArrowRight className="size-5 transition-transform group-hover/button:translate-x-0.5" />
            </Button>
            <Button
              size="lg"
              variant="secondary-terracotta"
              render={<Link href="/build-package" />}
              className="gap-2 text-lg font-medium h-12 px-7"
            >
              <Sparkles className="size-5" />
              Build Your Package
            </Button>
          </motion.div>
 
          <motion.ul
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2.5"
          >
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2.5 text-sm text-deep-brown/80"
              >
                <span className="grid size-5 place-items-center rounded-full bg-caramel/10 text-caramel">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>
 
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={reduceMotion ? false : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.25 }}
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:h-full lg:max-w-none lg:min-h-[34rem]"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-transparent rounded-3xl shadow-[0_20px_50px_rgba(74,52,32,0.12)] lg:absolute lg:inset-0 lg:aspect-auto">
            <img
              src="/hero-portrait.jpg"
              alt="Luxury editorial beauty portrait with warm directional lighting"
              className="absolute inset-0 object-cover w-full h-full rounded-3xl"
              loading="eager"
            />
          </div>
 
          {/* Floating glassmorphic chip ("100% TRACEABLE") */}
          <div className="absolute -left-4 bottom-12 rounded-full border border-white/20 bg-white/90 px-6 py-3.5 shadow-[0_10px_30px_rgba(74,52,32,0.08)] backdrop-blur-sm flex items-center gap-3.5">
            <span className="h-2 w-2 rounded-full bg-caramel animate-pulse" />
            <div className="flex flex-col leading-none">
              <span className="text-[0.65rem] font-bold tracking-widest text-deep-brown/60 uppercase">100% TRACEABLE</span>
              <span className="mt-1 font-heading text-lg font-bold text-caramel">Honest Sourcing</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}