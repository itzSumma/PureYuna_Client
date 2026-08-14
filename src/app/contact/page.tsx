"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ChevronDown, CheckCircle, HelpCircle } from "lucide-react";
import { useToastStore } from "@/stores/toastStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INPUT_UNDERLINE } from "@/constants/design-tokens";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "How do I determine my correct skin type?",
    answer: "Wash your face with a gentle cleanser and pat dry. Wait 60 minutes without applying any products. If your skin feels tight or flakey, you have Dry skin. If it shows shine on the T-zone and cheeks, you have Oily skin. If the shine is only on your forehead, nose, and chin, you have Combination skin. If it feels balanced and comfortable, you have Normal skin. Sensitive skin easily reacts, burns, or becomes red.",
  },
  {
    question: "Are PureYuna formulas safe for highly sensitive skin?",
    answer: "Yes! All of our products are specifically formulated to support and nourish compromised skin barriers. We avoid common irritants, synthetic fragrances, drying alcohols, and harsh sulfates. Our Blue Tansy Calming Oil and Camellia Cleansing Balm are ideal starting points for highly reactive skin.",
  },
  {
    question: "What is the difference between Organic and Formulated ranges?",
    answer: "Our Organic Care range focuses on cold-pressed botanical extracts and unrefined plant oils to nurture the skin naturally. Our Precision Formulated range utilizes safe, clinical-grade active ingredients (like Niacinamide, BHA, and Hyaluronic Acid) engineered for targeted skin concerns like acne, pigmentation, or aging.",
  },
  {
    question: "How long does shipping take and what is the return policy?",
    answer: "We process all orders within 1-2 business days. Domestic shipping takes 3-5 business days. Because our products are made in fresh, small batches with organic botanicals, we accept returns on unopened items within 14 days of delivery.",
  },
  {
    question: "How should I layer my serums and oils?",
    answer: "The golden rule of skincare layering is to apply products from thinnest to thickest consistency. Start with water-based serums (like Niacinamide), follow with moisturizers or creams, and finish with facial oils to seal in all active hydration.",
  },
];

export default function ContactPage() {
  const showToast = useToastStore((state) => state.showToast);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skinConcern: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.skinConcern || !formData.message) {
      showToast("Please fill out all fields.", "error");
      return;
    }
    setSubmitted(true);
    showToast("Consultation request sent!", "success");
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20">
      {/* Header */}
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold tracking-[0.25em] text-terracotta uppercase">
          Get in Touch
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-medium tracking-tight text-cocoa">
          Sanctuary Concierge
        </h1>
        <p className="text-charcoal/70 leading-relaxed font-light">
          Whether you need assistance with an order, or would like a bespoke skin consultation with our experts, we are here to guide you.
        </p>
      </header>

      {/* 2-Column Consultation & Contact Form */}
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left Column: Form */}
        <section className="bg-[#FAF5F0] text-[#3D1B22] shadow-sm border border-golden-border rounded-3xl p-8">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-6">
              <CheckCircle className="size-16 text-caramel animate-bounce" />
              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-medium text-[#3D1B22]">
                  Consultation Request Received
                </h3>
                <p className="text-sm text-[#3D1B22]/80 max-w-[40ch] mx-auto leading-relaxed">
                  Our Skincare Concierge will review your skin concerns and email you a personalized routine recommendation within 24 hours.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", skinConcern: "", message: "" });
                }}
                className="border-golden-border text-[#3D1B22] hover:bg-[#4A1E27]/5 cursor-pointer"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-heading text-2xl font-medium text-[#3D1B22]">
                  Skin Consultation
                </h3>
                <p className="text-xs text-[#3D1B22]/70">
                  Share your skin profile for a tailored routine response.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[0.62rem] font-bold tracking-widest text-[#3D1B22]/80 uppercase">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-10 rounded-none border-x-0 border-t-0 border-b border-[#EBDCD2] bg-[#FAF6F2] px-3 focus-visible:ring-0 focus-visible:ring-transparent transition-colors text-[#3D1B22] placeholder-[#3D1B22]/50 placeholder:text-[#3D1B22]/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[0.62rem] font-bold tracking-widest text-[#3D1B22]/80 uppercase">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-10 rounded-none border-x-0 border-t-0 border-b border-[#EBDCD2] bg-[#FAF6F2] px-3 focus-visible:ring-0 focus-visible:ring-transparent transition-colors text-[#3D1B22] placeholder-[#3D1B22]/50 placeholder:text-[#3D1B22]/50"
                  />
                </div>

                <div className="space-y-2 flex flex-col">
                  <Label htmlFor="skinConcern" className="text-[0.62rem] font-bold tracking-widest text-[#3D1B22]/80 uppercase mb-2">
                    Primary Skin Concern
                  </Label>
                  <Select
                    value={formData.skinConcern}
                    onValueChange={(val) => setFormData({ ...formData, skinConcern: val || "" })}
                  >
                    <SelectTrigger className="w-full h-10 border border-golden-border bg-[#FAF5F0] hover:bg-[#FAF5F0]/80 text-[#3D1B22] focus:ring-2 focus:ring-[#8B6230]/40 transition-all cursor-pointer">
                      <SelectValue placeholder="Select your main concern" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#FAF5F0] border border-[#EBDCD2]">
                      <SelectItem value="Acne">Acne & Congestion</SelectItem>
                      <SelectItem value="Aging">Aging & Fine Lines</SelectItem>
                      <SelectItem value="Hydration">Dehydration & Dryness</SelectItem>
                      <SelectItem value="Sensitivity">Redness & Sensitivity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[0.62rem] font-bold tracking-widest text-[#3D1B22]/80 uppercase">
                    Message / Skin Notes
                  </Label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your current products and skin goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-[#EBDCD2] bg-[#FAF6F2] p-3 text-sm text-[#3D1B22] placeholder-[#3D1B22]/50 placeholder:text-[#3D1B22]/50 focus:ring-1 focus:ring-[#4A1E27] focus:border-[#4A1E27] outline-none resize-none"
                  />
                </div>

                <Button type="submit" variant="default" className="w-full cursor-pointer h-11 text-sm font-semibold">
                  Submit Skin Analysis Request
                </Button>
              </form>
            </div>
          )}
        </section>

        {/* Right Column: Contact Details */}
        <section className="flex flex-col justify-between space-y-8 lg:py-6">
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-medium text-cocoa">
              Sanctuary Concierge Info
            </h3>
            <p className="text-charcoal/80 leading-relaxed font-light">
              Our team of certified estheticians and customer care advocates are available Monday through Friday, 9:00 AM to 6:00 PM EST. We typically reply to all inquiries within 1 business day.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="flex gap-4 items-start p-5 rounded-2xl bg-[#FAF5F0] text-[#3D1B22] border border-golden-border shadow-sm">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#4A1E27]/10 text-[#4A1E27]">
                <Mail className="size-5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-semibold text-[#3D1B22] text-sm">Email Address</h5>
                <p className="text-xs text-[#3D1B22]/70 mt-0.5">concierge@pureyuna.com</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-5 rounded-2xl bg-[#FAF5F0] text-[#3D1B22] border border-golden-border shadow-sm">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#4A1E27]/10 text-[#4A1E27]">
                <Phone className="size-5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-semibold text-[#3D1B22] text-sm">Concierge Hotline</h5>
                <p className="text-xs text-[#3D1B22]/70 mt-0.5">+1 (800) 555-YUNA</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-5 rounded-2xl bg-[#FAF5F0] text-[#3D1B22] border border-golden-border shadow-sm">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#4A1E27]/10 text-[#4A1E27]">
                <MapPin className="size-5" />
              </div>
              <div className="min-w-0">
                <h5 className="font-semibold text-[#3D1B22] text-sm">Sanctuary Spa Location</h5>
                <p className="text-xs text-[#3D1B22]/70 mt-0.5">
                  128 Editorial Way, Suite 400, SoHo, New York, NY 10012
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Skincare FAQ Section */}
      <section className="space-y-8 max-w-4xl mx-auto border-t border-taupe/60 pt-16">
        <div className="text-center space-y-2">
          <HelpCircle className="size-8 text-[#4A1E27] mx-auto" />
          <h2 className="font-heading text-3xl font-medium text-cocoa">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-charcoal/60">
            Find immediate answers regarding skin concerns, shipping, and routine orders.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm group ${
                  isOpen
                    ? "bg-[#4A1E27] border-transparent text-[#FAF5F0]"
                    : "bg-[#FAF5F0] border-[#EBDCD2] text-[#3D1B22] hover:bg-[#4A1E27] hover:border-transparent"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors"
                >
                  <span className={`font-heading text-lg font-medium transition-colors duration-300 ${
                    isOpen ? "text-[#FAF5F0]" : "text-[#3D1B22] group-hover:text-[#FAF5F0]"
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`size-5 transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 text-[#FAF5F0]"
                        : "text-[#3D1B22]/70 group-hover:text-[#FAF5F0]"
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className={`px-6 pb-6 text-sm leading-relaxed font-light transition-colors duration-300 ${
                      isOpen ? "text-[#FAF5F0]/90" : "text-[#3D1B22]/80 group-hover:text-[#FAF5F0]/90"
                    }`}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
