import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";

export interface PackageProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  productType: "ORGANIC" | "FORMULATED";
}

export interface PackageRoutineSteps {
  am: string[];
  pm: string[];
}

export interface ApiPackage {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  steps: PackageRoutineSteps | any;
  products: PackageProduct[];
}

export const packageService = {
  async getPackages(): Promise<ApiPackage[]> {
    const result = await apiGet<ApiSuccessResponse<any[]>>("/packages");
    const packages = result.data || [];
    return packages.map((pkg) => {
      const products = (pkg.packageItems || []).map((item: any) => item.product).filter(Boolean);
      const originalPrice = products.reduce((sum: number, p: any) => sum + p.price, 0);
      
      // Dynamically generate AM/PM steps based on products if not provided
      const steps = pkg.steps || {
        am: [
          `Cleanse skin gently.`,
          products.length > 0 ? `Apply 2-3 drops of ${products[0].name}.` : "Apply treatment serum.",
          products.length > 1 ? `Seal hydration with ${products[1].name}.` : "Follow with moisturizer."
        ],
        pm: [
          `Cleanse skin thoroughly.`,
          products.length > 2 ? `Apply ${products[2].name} to target concerns.` : products.length > 0 ? `Apply ${products[0].name}.` : "Apply treatment.",
          products.length > 1 ? `Apply ${products[1].name} for overnight repair.` : "Follow with overnight barrier cream."
        ]
      };
      
      return {
        id: pkg.id,
        name: pkg.name,
        description: pkg.description,
        image: pkg.image,
        price: pkg.price,
        originalPrice: originalPrice || pkg.price,
        steps,
        products,
      };
    });
  },

  async createPackage(payload: {
    name: string;
    description: string;
    price: number;
    image: string;
    productIds: string[];
  }): Promise<ApiPackage> {
    const result = await apiPost<ApiSuccessResponse<any>>("/packages", payload);
    const pkg = result.data;
    const products = (pkg.packageItems || []).map((item: any) => item.product).filter(Boolean);
    const originalPrice = products.reduce((sum: number, p: any) => sum + p.price, 0);
    return {
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      image: pkg.image,
      price: pkg.price,
      originalPrice: originalPrice || pkg.price,
      steps: pkg.steps || { am: [], pm: [] },
      products,
    };
  },

  async updatePackage(
    id: string,
    payload: {
      name?: string;
      description?: string;
      price?: number;
      image?: string;
      productIds?: string[];
    }
  ): Promise<ApiPackage> {
    const result = await apiPatch<ApiSuccessResponse<any>>(`/packages/${id}`, payload);
    const pkg = result.data;
    const products = (pkg.packageItems || []).map((item: any) => item.product).filter(Boolean);
    const originalPrice = products.reduce((sum: number, p: any) => sum + p.price, 0);
    return {
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      image: pkg.image,
      price: pkg.price,
      originalPrice: originalPrice || pkg.price,
      steps: pkg.steps || { am: [], pm: [] },
      products,
    };
  },

  async deletePackage(id: string): Promise<void> {
    await apiDelete<ApiSuccessResponse<any>>(`/packages/${id}`);
  },
};
