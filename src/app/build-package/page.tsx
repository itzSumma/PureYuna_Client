"use client";

import React, { useState, useEffect } from "react";
import { Check, ShoppingBag, ArrowLeft, ArrowRight, Sparkles, Smile, Flame, Droplets, Heart } from "lucide-react";
import { productService } from "@/services/product.service";
import type { Product } from "@/types/product";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Button } from "@/components/ui/button";

export default function BuildPackagePage() {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  // General States
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);

  // Step 1 States
  const [skinType, setSkinType] = useState<string>("");
  const [concern, setConcern] = useState<string>("");

  // Step 2 States
  const [selectedCleanser, setSelectedCleanser] = useState<Product | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<Product | null>(null);
  const [selectedMoisturizer, setSelectedMoisturizer] = useState<Product | null>(null);
  const [selectedSpf, setSelectedSpf] = useState<Product | null>(null);

  // Fetch all products
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const response = await productService.getProducts({ limit: 100 });
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to load products in builder:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Filter products by category
  const cleansers = products.filter(
    (p) =>
      p.categoryId === "cat-cleansers" ||
      p.category?.name.toLowerCase().includes("cleanse")
  );
  const treatments = products.filter(
    (p) =>
      p.categoryId === "cat-serums" ||
      p.category?.name.toLowerCase().includes("serum") ||
      p.category?.name.toLowerCase().includes("treatment") ||
      p.category?.name.toLowerCase().includes("oil")
  );
  const moisturizers = products.filter(
    (p) =>
      p.categoryId === "cat-moisturizers" ||
      p.category?.name.toLowerCase().includes("moisturize") ||
      p.category?.name.toLowerCase().includes("cream") ||
      p.category?.name.toLowerCase().includes("mist")
  );
  const spfs = products.filter(
    (p) =>
      p.categoryId === "cat-sunscreens" ||
      p.category?.name.toLowerCase().includes("sunscreen") ||
      p.category?.name.toLowerCase().includes("spf")
  );

  // Calculations
  const getSubtotal = () => {
    let sum = 0;
    if (selectedCleanser) sum += selectedCleanser.price;
    if (selectedTreatment) sum += selectedTreatment.price;
    if (selectedMoisturizer) sum += selectedMoisturizer.price;
    if (selectedSpf) sum += selectedSpf.price;
    return sum;
  };

  const subtotal = getSubtotal();
  const DISCOUNT_RATE = 0.15; // 15% bundle discount
  const discountAmount = subtotal * DISCOUNT_RATE;
  const total = subtotal - discountAmount;

  // Add to cart handler
  const handleAddCustomRoutineToCart = () => {
    if (!selectedCleanser || !selectedTreatment || !selectedMoisturizer || !selectedSpf) {
      showToast("Please select all 4 routine items.", "error");
      return;
    }
    addItem(selectedCleanser);
    addItem(selectedTreatment);
    addItem(selectedMoisturizer);
    addItem(selectedSpf);
    showToast("Bespoke custom routine added to cart!", "success");
    setStep(1);
    setSkinType("");
    setConcern("");
    setSelectedCleanser(null);
    setSelectedTreatment(null);
    setSelectedMoisturizer(null);
    setSelectedSpf(null);
  };

  const handleNextStep1 = () => {
    if (!skinType || !concern) {
      showToast("Please choose your skin type & primary concern first.", "info");
      return;
    }
    setStep(2);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
          Routine Lab
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-medium tracking-tight text-cocoa">
          Build Your Custom Routine
        </h1>
        <p className="text-charcoal/70 leading-relaxed font-light">
          Design a personalized 4-step daily ritual tailored to your specific skin needs and save 15% on the bundle.
        </p>
      </header>

      {/* Step Indicators */}
      <div className="flex justify-center items-center gap-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <span
            className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
              step >= 1 ? "bg-terracotta text-cream" : "bg-taupe text-cocoa"
            }`}
          >
            1
          </span>
          <span className="text-xs font-semibold text-cocoa uppercase tracking-wider hidden sm:inline">Profile</span>
        </div>
        <div className="h-px bg-taupe/60 flex-1" />
        <div className="flex items-center gap-2">
          <span
            className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
              step >= 2 ? "bg-terracotta text-cream" : "bg-taupe text-cocoa"
            }`}
          >
            2
          </span>
          <span className="text-xs font-semibold text-cocoa uppercase tracking-wider hidden sm:inline">Choose Items</span>
        </div>
        <div className="h-px bg-taupe/60 flex-1" />
        <div className="flex items-center gap-2">
          <span
            className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
              step >= 3 ? "bg-terracotta text-cream" : "bg-taupe text-cocoa"
            }`}
          >
            3
          </span>
          <span className="text-xs font-semibold text-cocoa uppercase tracking-wider hidden sm:inline">Review & Save</span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <p className="font-heading text-xl font-medium animate-pulse text-cocoa">Loading Routine Ingredients...</p>
        </div>
      ) : (
        <div className="w-full">
          {/* STEP 1: profile */}
          {step === 1 && (
            <div className="space-y-10 max-w-3xl mx-auto bg-[#D4937A] p-8 border border-[#C58068] rounded-3xl">
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-medium text-[#3A2820] text-center">
                  Tell us about your skin
                </h3>
                
                {/* Skin Type */}
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-widest text-[#3A2820]/80 uppercase block text-center">
                    1. What is your skin type?
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { name: "OILY", icon: "✨", desc: "Excess shine" },
                      { name: "DRY", icon: "🍂", desc: "Flakey or tight" },
                      { name: "NORMAL", icon: "🌸", desc: "Balanced skin" },
                      { name: "COMBINATION", icon: "⚖️", desc: "Oily T-zone" },
                      { name: "SENSITIVE", icon: "🛡️", desc: "Easily irritated" },
                    ].map((type) => (
                      <button
                        key={type.name}
                        type="button"
                        onClick={() => setSkinType(type.name)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                          skinType === type.name
                            ? "bg-[#FAF5EF] border-[#3A2820] text-[#3A2820] scale-105 shadow-sm font-bold"
                            : "bg-[#FAF5EF]/40 border-[#C58068]/50 text-[#3A2820] hover:bg-[#FAF5EF]/70"
                        }`}
                      >
                        <span className="text-2xl mb-1.5">{type.icon}</span>
                        <span className="text-xs tracking-wider uppercase font-semibold">{type.name}</span>
                        <span className="text-[0.62rem] text-[#3A2820]/70 mt-0.5">{type.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Concerns */}
                <div className="space-y-3 pt-4 border-t border-[#C58068]/30">
                  <span className="text-xs font-bold tracking-widest text-[#3A2820]/80 uppercase block text-center">
                    2. Choose your primary target concern
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "Acne", label: "Acne & Clogs", icon: <Flame className="size-5" /> },
                      { name: "Aging", label: "Aging & Wrinkles", icon: <Smile className="size-5" /> },
                      { name: "Hydration", label: "Dehydration", icon: <Droplets className="size-5" /> },
                      { name: "Sensitivity", label: "Redness & Sensitivity", icon: <Heart className="size-5" /> },
                    ].map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setConcern(c.name)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                          concern === c.name
                            ? "bg-[#FAF5EF] border-[#3A2820] text-[#3A2820] scale-105 shadow-sm font-bold"
                            : "bg-[#FAF5EF]/40 border-[#C58068]/50 text-[#3A2820] hover:bg-[#FAF5EF]/70"
                        }`}
                      >
                        <div className="text-[#3A2820] mb-2">{c.icon}</div>
                        <span className="text-xs tracking-wider uppercase font-semibold">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#C58068]/30 flex justify-end">
                <Button
                  onClick={handleNextStep1}
                  variant="default"
                  className="cursor-pointer font-semibold flex items-center gap-1.5"
                >
                  Continue to Selection
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Selection */}
          {step === 2 && (
            <div className="space-y-12">
              {/* Product Type Categorized Grid */}
              <div className="space-y-16">
                {/* 1. Cleansers */}
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl font-medium text-[#3A2820] border-b border-[#C58068]/40 pb-2">
                    Step 1: Choose a Cleanser
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cleansers.map((p) => {
                      const isSelected = selectedCleanser?.id === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedCleanser(p)}
                          className={`flex gap-4 border rounded-2xl p-4 cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[#D4937A] border-[#3A2820] shadow-xs"
                              : "bg-[#E0A58E] border-[#C58068] hover:bg-[#E0A58E]/80"
                          }`}
                        >
                          <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-taupe/10">
                            <ImageWithFallback src={p.image} alt={p.name} fill className="object-cover" sizes="80px" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-[#3A2820]/40 grid place-items-center">
                                <Check className="size-6 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <h4 className="font-semibold text-[#3A2820] text-sm truncate">{p.name}</h4>
                              <p className="text-xs text-[#4A3528] line-clamp-2 mt-0.5">{p.description}</p>
                            </div>
                            <span className="text-xs font-bold text-[#3A2820] mt-2">${p.price.toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Treatment/Serums */}
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl font-medium text-[#3A2820] border-b border-[#C58068]/40 pb-2">
                    Step 2: Choose a Treatment / Serum / Oil
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {treatments.map((p) => {
                      const isSelected = selectedTreatment?.id === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedTreatment(p)}
                          className={`flex gap-4 border rounded-2xl p-4 cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[#D4937A] border-[#3A2820] shadow-xs"
                              : "bg-[#E0A58E] border-[#C58068] hover:bg-[#E0A58E]/80"
                          }`}
                        >
                          <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-taupe/10">
                            <ImageWithFallback src={p.image} alt={p.name} fill className="object-cover" sizes="80px" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-[#3A2820]/40 grid place-items-center">
                                <Check className="size-6 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <h4 className="font-semibold text-[#3A2820] text-sm truncate">{p.name}</h4>
                              <p className="text-xs text-[#4A3528] line-clamp-2 mt-0.5">{p.description}</p>
                            </div>
                            <span className="text-xs font-bold text-[#3A2820] mt-2">${p.price.toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Moisturizers */}
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl font-medium text-[#3A2820] border-b border-[#C58068]/40 pb-2">
                    Step 3: Choose a Moisturizer
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {moisturizers.map((p) => {
                      const isSelected = selectedMoisturizer?.id === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedMoisturizer(p)}
                          className={`flex gap-4 border rounded-2xl p-4 cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[#D4937A] border-[#3A2820] shadow-xs"
                              : "bg-[#E0A58E] border-[#C58068] hover:bg-[#E0A58E]/80"
                          }`}
                        >
                          <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-taupe/10">
                            <ImageWithFallback src={p.image} alt={p.name} fill className="object-cover" sizes="80px" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-[#3A2820]/40 grid place-items-center">
                                <Check className="size-6 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <h4 className="font-semibold text-[#3A2820] text-sm truncate">{p.name}</h4>
                              <p className="text-xs text-[#4A3528] line-clamp-2 mt-0.5">{p.description}</p>
                            </div>
                            <span className="text-xs font-bold text-[#3A2820] mt-2">${p.price.toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. SPF */}
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl font-medium text-[#3A2820] border-b border-[#C58068]/40 pb-2">
                    Step 4: Choose a Sunscreen (SPF)
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {spfs.map((p) => {
                      const isSelected = selectedSpf?.id === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setSelectedSpf(p)}
                          className={`flex gap-4 border rounded-2xl p-4 cursor-pointer transition-all ${
                            isSelected
                              ? "bg-[#D4937A] border-[#3A2820] shadow-xs"
                              : "bg-[#E0A58E] border-[#C58068] hover:bg-[#E0A58E]/80"
                          }`}
                        >
                          <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-taupe/10">
                            <ImageWithFallback src={p.image} alt={p.name} fill className="object-cover" sizes="80px" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-[#3A2820]/40 grid place-items-center">
                                <Check className="size-6 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <h4 className="font-semibold text-[#3A2820] text-sm truncate">{p.name}</h4>
                              <p className="text-xs text-[#4A3528] line-clamp-2 mt-0.5">{p.description}</p>
                            </div>
                            <span className="text-xs font-bold text-[#3A2820] mt-2">${p.price.toFixed(2)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Control Bar */}
              <div className="sticky bottom-0 z-30 flex items-center justify-between border border-[#C58068] bg-[#D4937A]/95 backdrop-blur-md p-6 rounded-2xl shadow-lg mt-8 text-[#3A2820]">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="cursor-pointer flex items-center gap-1.5 font-semibold text-[#3A2820] border-[#C58068]/50 hover:bg-[#FAF5EF]/10"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>

                <div className="hidden md:flex items-center gap-6 text-xs text-[#3A2820]/80">
                  <div className="flex flex-col">
                    <span>Cleanser:</span>
                    <span className="font-bold">{selectedCleanser ? "Selected" : "Empty"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Treatment:</span>
                    <span className="font-bold">{selectedTreatment ? "Selected" : "Empty"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Moisturizer:</span>
                    <span className="font-bold">{selectedMoisturizer ? "Selected" : "Empty"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>SPF:</span>
                    <span className="font-bold">{selectedSpf ? "Selected" : "Empty"}</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (!selectedCleanser || !selectedTreatment || !selectedMoisturizer || !selectedSpf) {
                      showToast("Please choose 1 item from each category.", "info");
                      return;
                    }
                    setStep(3);
                  }}
                  variant="default"
                  className="cursor-pointer font-semibold flex items-center gap-1.5"
                >
                  Review Bundle
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Summary */}
          {step === 3 && (
            <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-[2fr_1fr]">
              {/* Left Column: Summary Checklist */}
              <div className="bg-[#D4937A] border border-[#C58068] p-8 rounded-3xl space-y-6">
                <h3 className="font-heading text-2xl font-medium text-[#3A2820] pb-3 border-b border-[#C58068]/30">
                  Routine Summary
                </h3>

                <div className="space-y-4">
                  {/* Cleanser */}
                  {selectedCleanser && (
                    <div className="flex gap-4 p-4 rounded-xl bg-[#E0A58E] border border-[#C58068]">
                      <div className="relative size-16 overflow-hidden rounded-lg bg-taupe/10">
                        <ImageWithFallback src={selectedCleanser.image} alt={selectedCleanser.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-[#3A2820]/80 tracking-widest uppercase">Cleanser</span>
                        <h4 className="font-semibold text-[#3A2820] text-sm">{selectedCleanser.name}</h4>
                        <span className="text-xs text-[#4A3528]">${selectedCleanser.price.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {/* Treatment */}
                  {selectedTreatment && (
                    <div className="flex gap-4 p-4 rounded-xl bg-[#E0A58E] border border-[#C58068]">
                      <div className="relative size-16 overflow-hidden rounded-lg bg-taupe/10">
                        <ImageWithFallback src={selectedTreatment.image} alt={selectedTreatment.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-[#3A2820]/80 tracking-widest uppercase">Treatment</span>
                        <h4 className="font-semibold text-[#3A2820] text-sm">{selectedTreatment.name}</h4>
                        <span className="text-xs text-[#4A3528]">${selectedTreatment.price.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {/* Moisturizer */}
                  {selectedMoisturizer && (
                    <div className="flex gap-4 p-4 rounded-xl bg-[#E0A58E] border border-[#C58068]">
                      <div className="relative size-16 overflow-hidden rounded-lg bg-taupe/10">
                        <ImageWithFallback src={selectedMoisturizer.image} alt={selectedMoisturizer.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-[#3A2820]/80 tracking-widest uppercase">Moisturizer</span>
                        <h4 className="font-semibold text-[#3A2820] text-sm">{selectedMoisturizer.name}</h4>
                        <span className="text-xs text-[#4A3528]">${selectedMoisturizer.price.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {/* SPF */}
                  {selectedSpf && (
                    <div className="flex gap-4 p-4 rounded-xl bg-[#E0A58E] border border-[#C58068]">
                      <div className="relative size-16 overflow-hidden rounded-lg bg-taupe/10">
                        <ImageWithFallback src={selectedSpf.image} alt={selectedSpf.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-[#3A2820]/80 tracking-widest uppercase">Sunscreen (SPF)</span>
                        <h4 className="font-semibold text-[#3A2820] text-sm">{selectedSpf.name}</h4>
                        <span className="text-xs text-[#4A3528]">${selectedSpf.price.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Calculations */}
              <div className="space-y-6">
                <div className="bg-[#D4937A] border border-[#C58068] p-6 rounded-3xl space-y-6 text-[#3A2820]">
                  <h4 className="font-heading text-xl font-medium text-[#3A2820]">
                    Order Summary
                  </h4>

                  <div className="space-y-3.5 text-sm">
                    <div className="flex justify-between text-[#4A3528]">
                      <span>Skin Type:</span>
                      <span className="font-semibold text-[#3A2820]">{skinType}</span>
                    </div>
                    <div className="flex justify-between text-[#4A3528]">
                      <span>Goal Concern:</span>
                      <span className="font-semibold text-[#3A2820]">{concern}</span>
                    </div>
                    <div className="h-px bg-[#C58068]/30" />
                    <div className="flex justify-between text-[#4A3528]">
                      <span>4 Items Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-950 font-bold">
                      <span>15% Bundle Discount:</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-[#C58068]/30" />
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="text-base font-semibold text-[#3A2820]">Total:</span>
                      <span className="text-2xl font-black text-[#3A2820]">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddCustomRoutineToCart}
                    variant="default"
                    className="w-full cursor-pointer h-12 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="size-4" />
                    Add Custom Routine
                  </Button>

                  <div className="text-[0.62rem] text-center text-[#4A3528]/80 leading-relaxed pt-2">
                    *Bundle items can be individually returned or exchanged in accordance with our return guidelines.
                  </div>
                </div>

                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="w-full cursor-pointer font-semibold border-[#C58068]/50 text-[#3A2820] hover:bg-[#FAF5EF]/10"
                >
                  Adjust Items Selection
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
