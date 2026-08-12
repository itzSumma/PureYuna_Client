import { isAxiosError } from "axios";

import type { ApiErrorResponse } from "@/types/api";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message;
    if (message) return message;
    if (error.code === "ECONNABORTED") {
      return "The request timed out. Please try again.";
    }
    if (!error.response) {
      return "Unable to reach the server. Check your connection and try again.";
    }
  }
  return fallback;
}

export function getRegisterErrorMessage(
  error: unknown,
  fallback = "Registration failed. Please try again."
): string {
  const message = getApiErrorMessage(error, fallback);
  if (/unique constraint|already exists/i.test(message)) {
    return "An account with this email already exists.";
  }
  return message;
}