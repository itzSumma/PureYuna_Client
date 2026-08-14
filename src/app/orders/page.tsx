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
    <div className="relative min-h-screen py-10 text-[#3D1B22] bg-[#FDF4EE]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3.5xl font-medium tracking-tight text-[#3D1B22] mb-1">
          Your Order History
        </h1>
        <p className="text-sm text-[#3D1B22]/60 mb-10">
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
                className="rounded-3xl border border-[#EBDCD2] bg-[#FAF5F0] overflow-hidden shadow-xs"
              >
                {/* Order Top Summary Bar */}
                <div className="bg-[#FAF5F0]/65 border-b border-[#EBDCD2]/50 p-5 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                    <div>
                      <span className="text-[#3D1B22]/50 font-medium block uppercase tracking-wider">
                        Date Placed
                      </span>
                      <span className="font-semibold text-[#3D1B22] flex items-center gap-1.5 mt-0.5">
                        <Calendar className="size-3.5 text-[#4A1E27]" />
                        {dateStr}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#3D1B22]/50 font-medium block uppercase tracking-wider">
                        Order Reference
                      </span>
                      <span className="font-semibold text-[#3D1B22] mt-0.5 block">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#3D1B22]/50 font-medium block uppercase tracking-wider">
                        Total Amount
                      </span>
                      <span className="font-bold text-[#4A1E27] mt-0.5 block text-sm">
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
                    <h3 className="text-xs font-bold tracking-widest text-[#3D1B22]/60 uppercase pb-2 border-b border-[#EBDCD2]/30">
                      Sanctuary Formulas
                    </h3>
                    <div className="space-y-3">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center">
                          <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-[#FAF6F2] border border-[#EBDCD2]/30">
                            <ImageWithFallback
                              src={item.product?.image || ""}
                              alt={item.product?.name || "Product"}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-[#3D1B22] truncate">
                              {item.product?.name || "Product"}
                            </h4>
                            <p className="text-[0.68rem] text-charcoal/70">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Info Card */}
                  <div className="bg-[#FAF5F0]/50 border border-[#EBDCD2]/30 rounded-2xl p-4 text-xs space-y-3">
                    <h3 className="font-bold tracking-wider text-[#3D1B22] uppercase pb-1 border-b border-[#EBDCD2]/30 flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-[#4A1E27]" />
                      Shipment Details
                    </h3>
                    <div className="space-y-2 text-[#3D1B22]/80">
                      <div>
                        <span className="font-semibold block text-[#3D1B22]">Recipient Address:</span>
                        <span>{order.address}</span>
                      </div>
                      <div>
                        <span className="font-semibold block text-[#3D1B22]">City / State:</span>
                        <span>{order.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5 pt-1">
                        <Phone className="size-3 text-[#3D1B22]/50" />
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
