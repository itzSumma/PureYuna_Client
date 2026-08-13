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
        className="w-full sm:max-w-md bg-[#FAF5EF] border-l border-[#3A2820]/10 text-[#3A2820] flex flex-col h-full p-0"
      >
        <SheetHeader className="p-6 border-b border-[#3A2820]/10 flex items-center justify-between">
          <SheetTitle className="font-heading text-2xl font-medium text-[#3A2820] flex items-center gap-2">
            <ShoppingBag className="size-5 text-[#B86B4B]" />
            Your Sanctuary Cart
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-4xl">🌿</span>
              <p className="text-base font-medium text-cocoa/60">
                Your cart is currently empty.
              </p>
              <Link
                href="/products"
                onClick={() => onOpenChange(false)}
                className="text-sm font-semibold text-terracotta hover:underline"
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
                  className="flex gap-4 pb-4 border-b border-[#3A2820]/5 items-start"
                >
                  {/* Thumbnail Image */}
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-taupe/20 border border-[#3A2820]/5">
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
                    <span className="text-[0.6rem] font-bold tracking-widest text-[#B86B4B] uppercase">
                      {isOrganic ? "🌿 Organic" : "🧪 Formulated"}
                    </span>
                    <h4 className="font-heading text-sm font-medium text-cocoa truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs font-semibold text-terracotta">
                      ${item.product.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-md border border-[#3A2820]/15 bg-white/50 h-8">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="grid size-8 place-items-center text-cocoa/60 hover:text-cocoa disabled:opacity-30 cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-cocoa">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="grid size-8 place-items-center text-cocoa/60 hover:text-cocoa disabled:opacity-30 cursor-pointer"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="text-cocoa/40 hover:text-red-600 transition-colors p-1 cursor-pointer"
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
          <SheetFooter className="p-6 border-t border-[#3A2820]/10 bg-white/20 backdrop-blur-xs flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm font-medium text-cocoa">
              <span>Subtotal</span>
              <span className="text-base font-bold text-terracotta">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-[0.68rem] text-muted-foreground leading-normal">
              Shipping fees and taxes are calculated at checkout.
            </p>
            <Button
              type="button"
              variant="default"
              size="lg"
              className="w-full h-12 text-sm font-semibold cursor-pointer"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
