import { apiGet, apiPost } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type { Order, CreateOrderPayload } from "@/types/order";

export const orderService = {
  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    const result = await apiPost<ApiSuccessResponse<Order>>("/orders", payload);
    return result.data;
  },

  async getMyOrders(): Promise<Order[]> {
    const result = await apiGet<ApiSuccessResponse<Order[]>>("/orders/my-orders");
    return result.data || [];
  },
};
