import { apiGet } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type { Product, ProductQueryParams, Category } from "@/types/product";
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "@/constants/fallback-data";

/**
 * Safely extracts products list from various API response shapes.
 */
function extractProductsList(res: any): Product[] {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (res.data) {
    if (Array.isArray(res.data)) return res.data;
    if (res.data.products && Array.isArray(res.data.products)) return res.data.products;
    if (res.data.data && Array.isArray(res.data.data)) return res.data.data;
  }
  if (res.products && Array.isArray(res.products)) return res.products;
  return [];
}

/**
 * Client-side filter and paginate utility for fallback catalog.
 */
function filterAndPaginateLocal(
  products: Product[],
  params?: ProductQueryParams
): ApiSuccessResponse<Product[]> {
  let list = [...products];

  if (params) {
    // 1. Filter by productType
    if (params.productType) {
      list = list.filter((p) => p.productType === params.productType);
    }
    // 2. Filter by category
    if (params.category && params.category !== "ALL") {
      list = list.filter((p) => p.categoryId === params.category);
    }
    // 3. Filter by skinType
    if (params.skinType) {
      list = list.filter((p) => p.skinType === params.skinType);
    }
    // 4. Filter by search text
    if (params.search) {
      const query = params.search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }
    // 5. Sort products
    if (params.sort) {
      if (params.sort === "price-low") {
        list.sort((a, b) => a.price - b.price);
      } else if (params.sort === "price-high") {
        list.sort((a, b) => b.price - a.price);
      } else if (params.sort === "newest") {
        list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    }
  }

  // 6. Pagination
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 12;
  const startIndex = (page - 1) * limit;
  const paginatedList = list.slice(startIndex, startIndex + limit);

  return {
    success: true,
    message: "Products loaded from fallback catalog successfully",
    meta: {
      page,
      limit,
      total: list.length,
      totalPages: Math.ceil(list.length / limit),
    },
    data: paginatedList,
  };
}

export const productService = {
  /**
   * Fetch list of products with filters, sorting, and pagination
   */
  async getProducts(params?: ProductQueryParams): Promise<ApiSuccessResponse<Product[]>> {
    const queryParams: Record<string, string> = {};
    if (params) {
      if (params.search) queryParams.search = params.search;
      if (params.category) queryParams.category = params.category;
      if (params.skinType) queryParams.skinType = params.skinType;
      if (params.targetAudience) queryParams.targetAudience = params.targetAudience;
      if (params.productType) queryParams.productType = params.productType;
      if (params.sort) queryParams.sort = params.sort;
      if (params.page !== undefined) queryParams.page = String(params.page);
      if (params.limit !== undefined) queryParams.limit = String(params.limit);
    }

    try {
      const response = await apiGet<any>("/products", {
        params: queryParams,
      });

      const extracted = extractProductsList(response);
      
      if (extracted.length > 0) {
        // Return structured API response
        return {
          success: true,
          message: response.message || "Products fetched successfully",
          meta: response.meta || {
            page: params?.page ?? 1,
            limit: params?.limit ?? 12,
            total: extracted.length,
            totalPages: 1,
          },
          data: extracted,
        };
      }
    } catch (error) {
      console.warn("Product API failed/warming up, falling back to local catalog:", error);
    }

    // Fallback to local filtering & pagination if API fails or returns no products
    return filterAndPaginateLocal(FALLBACK_PRODUCTS, params);
  },

  /**
   * Fetch single product details by ID
   */
  async getProductById(id: string): Promise<Product> {
    try {
      if (!id.startsWith("fb-")) {
        const result = await apiGet<any>(`/products/${id}`);
        if (result) {
          if (result.data) return result.data;
          if (result.name) return result;
        }
      }
    } catch (err) {
      console.warn(`Product API failed for ID ${id}, searching fallback catalog:`, err);
    }

    const found = FALLBACK_PRODUCTS.find((p) => p.id === id);
    if (found) return found;

    throw new Error(`Product with ID ${id} not found in catalog.`);
  },

  /**
   * Fetch all categories
   */
  async getCategories(): Promise<Category[]> {
    try {
      const result = await apiGet<any>("/categories");
      let cats: Category[] = [];
      if (result) {
        if (Array.isArray(result)) cats = result;
        else if (result.data && Array.isArray(result.data)) cats = result.data;
      }
      if (cats.length > 0) return cats;
    } catch (err) {
      console.warn("Category API failed/empty, using fallback categories:", err);
    }
    return FALLBACK_CATEGORIES;
  },
};
