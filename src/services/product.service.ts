import { apiGet } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type { Product, ProductQueryParams, Category } from "@/types/product";

export const productService = {
  /**
   * Fetch list of products with filters, sorting, and pagination
   */
  async getProducts(params?: ProductQueryParams): Promise<ApiSuccessResponse<Product[]>> {
    const queryParams: Record<string, string> = {};
    if (params) {
      if (params.search) {
        queryParams.search = params.search;
      }
      if (params.category) {
        queryParams.category = params.category;
      }
      if (params.skinType) {
        queryParams.skinType = params.skinType;
      }
      if (params.targetAudience) {
        queryParams.targetAudience = params.targetAudience;
      }
      if (params.productType) {
        queryParams.productType = params.productType;
      }
      if (params.sort) {
        queryParams.sort = params.sort;
      }
      if (params.page !== undefined) {
        queryParams.page = String(params.page);
      }
      if (params.limit !== undefined) {
        queryParams.limit = String(params.limit);
      }
    }

    return apiGet<ApiSuccessResponse<Product[]>>("/products", {
      params: queryParams,
    });
  },

  /**
   * Fetch single product details by ID
   */
  async getProductById(id: string): Promise<Product> {
    const result = await apiGet<ApiSuccessResponse<Product>>(`/products/${id}`);
    return result.data;
  },

  /**
   * Fetch all categories
   */
  async getCategories(): Promise<Category[]> {
    const result = await apiGet<ApiSuccessResponse<Category[]>>("/categories");
    return result.data;
  },
};
