"use client";

import * as React from "react";
import Link from "next/link";
import { Loader2, Calendar, ShoppingBag, MapPin, Phone } from "lucide-react";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { orderService } from "@/services/order.service";
import { useToastStore } from "@/stores/toastStore";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { getApiErrorMessage } from "@/lib/errors";
import type { Order } from "@/types/order";
import { cn } from "@/lib/utils";

function OrderHistoryContent() {
  const showToast = useToastStore((state) => state.showToast);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadOrders() {
      try {
        const data = await orderService.getMyOrders();
        // Sort orders by date descending
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(sorted);
      } catch (err) {
        const errMsg = getApiErrorMessage(err);
        setError(errMsg);
        showToast(errMsg, "error");
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, [showToast]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[50vh]">
        <Loader2 className="size-6 animate-spin text-terracotta" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center space-y-4">
        <span className="text-4xl">⚠️</span>
        <h3 className="text-lg font-semibold text-red-800">Connection Error</h3>
        <p className="text-sm text-red-600">{error}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry Loading
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center space-y-5">
        <span className="text-5xl">📦</span>
        <h2 className="font-heading text-3xl font-medium text-cocoa">
          No Orders Placed Yet
        </h2>
        <p className="text-sm text-charcoal/70">
          Your order history is currently empty. Visit our organic and precision sanctuary to find what you need.
        </p>
        <Button variant="default" render={<Link href="/products" />} className="cursor-pointer">
          Shop Skincare
        </Button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-10 text-[#3A2820]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3.5xl font-medium tracking-tight text-cocoa mb-1">
          Your Order History
        </h1>
        <p className="text-sm text-cocoa/60 mb-10">
          Review and track the status of all your sanctuary shipments.
        </p>

        <div className="space-y-8">
          {orders.map((order) => {
            const dateStr = new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            // Status Styling Rules
            const isPending = order.status === "PENDING";
            const isShipped = order.status === "SHIPPED";
            const isDelivered = order.status === "DELIVERED";
            const isCancelled = order.status === "CANCELLED";

            return (
              <div
                key={order.id}
                className="rounded-3xl border border-taupe/40 bg-cream overflow-hidden shadow-xs"
              >
                {/* Order Top Summary Bar */}
                <div className="bg-white/40 border-b border-taupe/20 p-5 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                    <div>
                      <span className="text-cocoa/50 font-medium block uppercase tracking-wider">
                        Date Placed
                      </span>
                      <span className="font-semibold text-cocoa flex items-center gap-1.5 mt-0.5">
                        <Calendar className="size-3.5 text-terracotta" />
                        {dateStr}
                      </span>
                    </div>
                    <div>
                      <span className="text-cocoa/50 font-medium block uppercase tracking-wider">
                        Order Reference
                      </span>
                      <span className="font-semibold text-cocoa mt-0.5 block">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-cocoa/50 font-medium block uppercase tracking-wider">
                        Total Amount
                      </span>
                      <span className="font-bold text-terracotta mt-0.5 block text-sm">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={cn(
                      "text-[0.62rem] font-bold tracking-widest uppercase px-3 py-1 rounded-full border",
                      isPending && "bg-amber-50 text-amber-700 border-amber-200",
                      isShipped && "bg-blue-50 text-blue-700 border-blue-200",
                      isDelivered && "bg-emerald-50 text-emerald-700 border-emerald-200",
                      isCancelled && "bg-rose-50 text-rose-700 border-rose-200"
                    )}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="p-6 grid gap-6 md:grid-cols-[60fr_40fr] items-start">
                  {/* Items List */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold tracking-widest text-cocoa/60 uppercase pb-2 border-b border-[#3A2820]/5">
                      Sanctuary Formulas
                    </h3>
                    <div className="space-y-3">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center">
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-taupe/10 border border-[#3A2820]/5">
                            <ImageWithFallback
                              src={item.product?.image || ""}
                              alt={item.product?.name || "Product"}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-cocoa truncate">
                              {item.product?.name || "Product"}
                            </h4>
                            <p className="text-[0.68rem] text-muted-foreground">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info Card */}
                  <div className="bg-white/30 border border-[#3A2820]/5 rounded-2xl p-4 text-xs space-y-3">
                    <h3 className="font-bold tracking-wider text-cocoa uppercase pb-1 border-b border-[#3A2820]/5 flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-terracotta" />
                      Shipment Details
                    </h3>
                    <div className="space-y-2 text-cocoa/80">
                      <div>
                        <span className="font-semibold block text-cocoa">Recipient Address:</span>
                        <span>{order.address}</span>
                      </div>
                      <div>
                        <span className="font-semibold block text-cocoa">City / State:</span>
                        <span>{order.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5 pt-1">
                        <Phone className="size-3 text-cocoa/50" />
                        <span>{order.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function OrderHistoryPage() {
  return (
    <RequireAuth>
      <OrderHistoryContent />
    </RequireAuth>
  );
}
