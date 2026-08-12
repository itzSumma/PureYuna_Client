export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  meta?: PaginationMeta | null;
  data: T;
}

export interface ApiErrorSource {
  path: string;
  message: string;
}

export interface ApiNotFoundDetail {
  path: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorSources?: ApiErrorSource[];
  error?: ApiNotFoundDetail;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;