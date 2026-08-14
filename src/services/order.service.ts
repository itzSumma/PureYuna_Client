import { apiGet, apiPost, apiPatch } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type { Order, CreateOrderPayload } from "@/types/order";

const CACHED_ORDERS_KEY = "pureyuna_cached_orders";

function getCachedOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CACHED_ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function saveCachedOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHED_ORDERS_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error("Failed to save orders to cache:", err);
  }
}

export const orderService = {
  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    const result = await apiPost<ApiSuccessResponse<Order>>("/orders", payload);
    const newOrder = result.data;
    if (newOrder) {
      const cached = getCachedOrders();
      // Prepend to show newest first
      saveCachedOrders([newOrder, ...cached]);
    }
    return newOrder;
  },

  async getMyOrders(): Promise<Order[]> {
    try {
      const result = await apiGet<ApiSuccessResponse<Order[]>>("/orders/my-orders");
      const orders = result.data || [];
      saveCachedOrders(orders);
      return orders;
    } catch (err) {
      console.warn("Failed to fetch orders from backend, reading from cache fallback:", err);
      return getCachedOrders();
    }
  },

  async getAllOrders(): Promise<Order[]> {
    const result = await apiGet<ApiSuccessResponse<Order[]>>("/orders");
    return result.data || [];
  },

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const result = await apiPatch<ApiSuccessResponse<Order>>(`/orders/${id}/status`, { status });
    return result.data;
  },
};

