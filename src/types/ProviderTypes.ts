// src/pages/providers/ProviderTypes.ts
export interface Provider {
  id: string;
  name: string;
  code: string;
  description?: string;
  logo?: string;
  isEnabled: boolean;
  isLive: boolean;
  baseUrl: string;
  testBaseUrl?: string;
  apiKey?: string;
  secretKey?: string;
  webhookSecret?: string;
  createdAt: string;
  updatedAt: string;
}
  
export type ProviderSortBy = 'name' | 'code' | 'createdAt';
export type SortOrder = 'asc' | 'desc';
  
export interface ProviderListQueryParams {
  page?: number;
  limit?: number;
  isEnabled?: boolean;
  isLive?: boolean;
  search?: string;
  sortBy?: ProviderSortBy;
  sortOrder?: SortOrder;
}

export interface ProductProvider {
  id: string;
  productId: string;
  providerId: string;
  providerProductCode: string;
  priority: number;
  isEnabled: boolean;
  isDefault: boolean;
  feeType: 'flat' | 'percentage';
  feeValue: string;
  minFee?: string;
  maxFee?: string;
  endPoints?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ConfigureProviderDto {
  productId: string;
  providerId: string;
  config: {
    providerProductCode: string;
    priority: number;
    isDefault: boolean;
    feeType: 'flat' | 'percentage';
    feeValue: string;
    minFee?: string;
    maxFee?: string;
    endPoints?: Record<string, any>;
  };
}