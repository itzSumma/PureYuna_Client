"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

import { useCartStore } from "@/stores/cartStore";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  const handleCheckout = () => {
    onOpenChange(false);
    router.push("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-champagne border-l border-golden-border text-deep-brown flex flex-col h-full p-0 shadow-xl [&_button[data-slot=sheet-close]]:text-deep-brown/80 [&_button[data-slot=sheet-close]]:hover:text-deep-brown [&_button[data-slot=sheet-close]]:hover:bg-deep-brown/10"
      >
        <SheetHeader className="p-6 border-b border-golden-border/40 flex items-center justify-between">
          <SheetTitle className="font-serif text-lg font-normal text-deep-brown flex items-center gap-2">
            <ShoppingBag className="size-5 text-deep-brown/80" />
            Your Sanctuary Cart
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-5">
              <span className="text-4xl">🌿</span>
              <p className="text-sm text-deep-brown/85">
                Your cart is currently empty.
              </p>
              <Link
                href="/products"
                onClick={() => onOpenChange(false)}
                className="inline-block bg-caramel hover:bg-caramel/90 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-colors shadow-sm"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const isOrganic = item.product.productType === "ORGANIC";
              return (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-[#FFF9EE]/80 border border-golden-border/50 rounded-2xl p-3 text-deep-brown items-start shadow-xs"
                >
                  {/* Thumbnail Image */}
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-white/40 border border-golden-border/30">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <span className="text-[0.6rem] font-bold tracking-widest text-deep-brown/60 uppercase">
                      {isOrganic ? "🌿 Organic" : "🧪 Formulated"}
                    </span>
                    <h4 className="font-heading text-sm font-medium text-deep-brown truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs font-semibold text-caramel">
                      ${item.product.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-md border border-golden-border/50 bg-[#FFF9EE] h-8">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="grid size-8 place-items-center text-deep-brown/80 hover:text-deep-brown disabled:opacity-30 cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-deep-brown">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="grid size-8 place-items-center text-deep-brown/80 hover:text-deep-brown disabled:opacity-30 cursor-pointer"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="text-deep-brown/40 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Subtotal & Checkout button */}
        {items.length > 0 && (
          <SheetFooter className="p-6 border-t border-golden-border/40 bg-white/10 backdrop-blur-xs flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm font-medium text-deep-brown">
              <span>Subtotal</span>
              <span className="text-base font-bold text-[#8B6230]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-[0.68rem] text-deep-brown/60 leading-normal">
              Shipping fees and taxes are calculated at checkout.
            </p>
            <button
              type="button"
              className="w-full h-12 bg-caramel text-white hover:bg-caramel/90 font-semibold rounded-xl shadow-md transition-all text-sm flex items-center justify-center cursor-pointer"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
