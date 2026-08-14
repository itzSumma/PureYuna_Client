import { apiGet } from "@/lib/axios";
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
    const result = await apiGet<ApiSuccessResponse<ApiPackage[]>>("/packages");
    return result.data || [];
  },
};
