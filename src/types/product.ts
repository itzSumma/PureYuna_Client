export const ProductType = {
  ORGANIC: "ORGANIC",
  FORMULATED: "FORMULATED",
} as const;

export type ProductType = (typeof ProductType)[keyof typeof ProductType];

export const SkinType = {
  OILY: "OILY",
  DRY: "DRY",
  NORMAL: "NORMAL",
  COMBINATION: "COMBINATION",
  SENSITIVE: "SENSITIVE",
} as const;

export type SkinType = (typeof SkinType)[keyof typeof SkinType];

export const ProductSort = {
  PRICE_LOW: "price-low",
  PRICE_HIGH: "price-high",
  NEWEST: "newest",
} as const;

export type ProductSort = (typeof ProductSort)[keyof typeof ProductSort];

export const PRODUCT_LIST_LIMIT = 12;

export interface Category {
  id: string;
  name: string;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: string;
  skinType: SkinType;
  targetAudience: string;
  productType: ProductType;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

export interface ProductQueryParams {
  search?: string;
  category?: string;
  skinType?: SkinType;
  targetAudience?: string;
  productType?: ProductType;
  sort?: ProductSort;
  page?: number;
  limit?: number;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  skinType: SkinType;
  targetAudience: string;
  productType: ProductType;
  image: string;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;