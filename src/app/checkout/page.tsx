"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, Loader2, CreditCard } from "lucide-react";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";
import { orderService } from "@/services/order.service";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { getApiErrorMessage } from "@/lib/errors";

function CheckoutContent() {
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  const { items, getSubtotal, clearCart } = useCartStore();

  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const subtotal = getSubtotal();
  const shipping = items.length > 0 ? 15.0 : 0.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast("Your cart is empty.", "error");
      return;
    }
    if (!address.trim() || !city.trim() || !phone.trim()) {
      showToast("Please fill in all shipping details.", "error");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const orderPayload = {
        address,
        city,
        phone,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      };

      await orderService.createOrder(orderPayload);
      showToast("Thank you! Your sanctuary order has been placed successfully.", "success");
      clearCart();
      router.push("/orders");
    } catch (err) {
      const errMsg = getApiErrorMessage(err);
      setErrorMessage(errMsg);
      showToast(errMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center space-y-5">
        <span className="text-5xl">🌿</span>
        <h2 className="font-heading text-3xl font-medium text-cocoa">
          Sanctuary Cart is Empty
        </h2>
        <p className="text-sm text-charcoal/70">
          You must add some skincare essentials to your cart before proceeding to checkout.
        </p>
        <Button variant="default" className="cursor-pointer" onClick={() => router.push("/products")}>
          Explore Products
        </Button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-10 text-[#3A2820]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header link */}
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 text-sm font-medium text-cocoa/60 hover:text-terracotta transition-colors duration-200 mb-8 cursor-pointer"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Continue Shopping
        </Link>

        <h1 className="font-heading text-3.5xl font-medium tracking-tight text-cocoa mb-10">
          Secure Sanctuary Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-[55fr_45fr] items-start">
          {/* Shipping Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-taupe/40 bg-cream p-8 space-y-6 shadow-xs"
          >
            <h2 className="font-heading text-xl font-medium text-cocoa pb-3 border-b border-taupe/20">
              1. Shipping Address & Contact
            </h2>

            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800">
                {errorMessage}
              </div>
            )}

            {/* Address */}
            <div className="space-y-1.5">
              <label htmlFor="address" className="text-[0.68rem] font-bold tracking-widest text-muted-foreground uppercase">
                Street Address
              </label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Serenity Way, Suite 4B"
                required
                className="w-full text-sm p-3.5 rounded-xl border border-[#3A2820]/15 bg-white/50 focus:border-terracotta focus:ring-0 outline-none"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* City */}
              <div className="space-y-1.5">
                <label htmlFor="city" className="text-[0.68rem] font-bold tracking-widest text-muted-foreground uppercase">
                  City / State
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Sanctuary City"
                  required
                  className="w-full text-sm p-3.5 rounded-xl border border-[#3A2820]/15 bg-white/50 focus:border-terracotta focus:ring-0 outline-none"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-[0.68rem] font-bold tracking-widest text-muted-foreground uppercase">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 019-2834"
                  required
                  className="w-full text-sm p-3.5 rounded-xl border border-[#3A2820]/15 bg-white/50 focus:border-terracotta focus:ring-0 outline-none"
                />
              </div>
            </div>

            <h2 className="font-heading text-xl font-medium text-cocoa pt-4 pb-3 border-b border-taupe/20">
              2. Payment Method
            </h2>

            <div className="rounded-2xl border border-terracotta/20 bg-white/40 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-terracotta/10 text-terracotta">
                  <CreditCard className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-cocoa">Cash on Delivery (COD)</h4>
                  <p className="text-xs text-cocoa/60">Pay safely upon receipt of shipment.</p>
                </div>
              </div>
              <span className="text-[0.68rem] font-bold tracking-widest text-terracotta uppercase">
                Active
              </span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-sm font-semibold mt-4 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Securing Order...
                </>
              ) : (
                <>
                  <ShoppingBag className="size-4 mr-2" />
                  Place Order (${total.toFixed(2)})
                </>
              )}
            </Button>
          </form>

          {/* Order Summary Side Panel */}
          <div className="rounded-3xl border border-taupe/40 bg-cream p-6 sm:p-8 space-y-6 shadow-xs lg:sticky lg:top-24">
            <h2 className="font-heading text-xl font-medium text-cocoa pb-3 border-b border-taupe/20 flex items-center gap-2">
              <ShoppingBag className="size-5 text-terracotta" />
              Order Summary
            </h2>

            {/* List of Cart Items */}
            <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-center">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-taupe/10 border border-[#3A2820]/5">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-cocoa truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[0.68rem] text-muted-foreground">
                      Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-cocoa/80 shrink-0">
                    ${(item.quantity * item.product.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Details */}
            <div className="border-t border-taupe/30 pt-4 space-y-2.5 text-xs text-cocoa">
              <div className="flex justify-between">
                <span className="text-cocoa/60 font-medium">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa/60 font-medium">Shipping flat rate</span>
                <span className="font-semibold">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cocoa/60 font-medium">Estimated Tax (8%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-taupe/30 pt-3">
                <span className="text-cocoa font-semibold">Total Price</span>
                <span className="text-terracotta">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <RequireAuth>
      <CheckoutContent />
    </RequireAuth>
  );
}
