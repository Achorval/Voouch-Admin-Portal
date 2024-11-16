// src/services/HttpService/types.ts
export interface FetchOptions extends Omit<RequestInit, 'body'> {
  params?: Record<string, string>;
  baseURL?: string;
  body?: any;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  meta: {
    total: number;
    pages: number;
    page: string;
    limit: string;
  };
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

// Helper type for request options
export type RequestOptions = Omit<FetchOptions, 'body' | 'method'>;

// Helper type for response data
export type ApiResponseData<T> = Promise<ApiResponse<T>>;