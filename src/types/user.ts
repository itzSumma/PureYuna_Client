export const Role = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  user: AuthUser;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
}