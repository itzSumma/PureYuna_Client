import { apiGet, apiPost } from "@/lib/axios";
import type { ApiSuccessResponse } from "@/types/api";
import type {
  AuthUser,
  LoginPayload,
  LoginResponseData,
  RegisterPayload,
  User,
} from "@/types/user";

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponseData> {
    const result = await apiPost<ApiSuccessResponse<LoginResponseData>>(
      "/auth/login",
      payload
    );
    return result.data;
  },

  async register(payload: RegisterPayload): Promise<User> {
    const result = await apiPost<ApiSuccessResponse<User>>(
      "/auth/register",
      payload
    );
    return result.data;
  },

  async getProfile(): Promise<User> {
    const result = await apiGet<ApiSuccessResponse<User>>("/auth/profile");
    return result.data;
  },
};

export type { AuthUser };