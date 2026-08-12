import type { Product } from "./product";

export interface PackageItem {
  id: string;
  packageId: string;
  productId: string;
  product?: Product;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
  packageItems: PackageItem[];
}

export interface CreatePackagePayload {
  name: string;
  description: string;
  price: number;
  image: string;
  productIds: string[];
}

export type UpdatePackagePayload = Partial<CreatePackagePayload>;