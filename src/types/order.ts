import type { Product } from "./product";
import type { User } from "./user";

export const OrderStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  address: string;
  city: string;
  phone: string;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  user?: User;
}

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  address: string;
  city: string;
  phone: string;
  items: OrderItemInput[];
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}