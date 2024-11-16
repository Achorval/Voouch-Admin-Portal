import HttpService from './HttpService';
import type { ApiResponse } from '../types/HttpTypes';
import type { ConfigureProviderDto, ProductProvider, Provider, ProviderListQueryParams } from '@/pages/home/providers/ProviderTypes';

class ProviderService {
  private static readonly BASE_PATH = '/api/v1/admin/providers';

  /**
   * List providers with query parameters
   */
  static async listProviders(params: ProviderListQueryParams): Promise<ApiResponse<Provider[]>> {
    const queryParams: Record<string, string> = {};
    
    if (params.page) queryParams.page = params.page.toString();
    if (params.limit) queryParams.limit = params.limit.toString();
    if (params.search) queryParams.search = params.search;
    if (params.isEnabled !== undefined) queryParams.isEnabled = params.isEnabled.toString();
    if (params.sortBy) queryParams.sortBy = params.sortBy;
    if (params.sortOrder) queryParams.sortOrder = params.sortOrder;

    return HttpService.get<ApiResponse<Provider[]>>(this.BASE_PATH, {
      params: queryParams
    });
  }

  /**
   * Get product details
   */
  static async getProvider(id: string): Promise<ApiResponse<Provider>> {
    return HttpService.get<ApiResponse<Provider>>(`${this.BASE_PATH}/${id}`);
  }

  /**
   * Create new product
   */
  static async createProvider(data: FormData): Promise<ApiResponse<Provider>> {
    return HttpService.post<ApiResponse<Provider>>(
      this.BASE_PATH,
      data
    );
  }

  /**
   * Update provider
   */
  static async updateProvider(id: string, data: FormData): Promise<ApiResponse<Provider>> {
    return HttpService.patch<ApiResponse<Provider>>(
      `${this.BASE_PATH}/${id}`,
      data
    );
  }

  /**
   * Toggle provider status
   */
  static async toggleStatus(id: string): Promise<ApiResponse<Provider>> {
    return HttpService.post<ApiResponse<Provider>>(
        `${this.BASE_PATH}/${id}/toggle`,
        undefined
    );
  }

  /**
   * Configure provider
   */
  static async configureProvider (productId: string, providerId: string, config: ConfigureProviderDto['config']): Promise<ApiResponse<ProductProvider>> {
    return HttpService.post(`/products/${productId}/providers/${providerId}/configure`, config);
  }

  /**
   * Delete provider
   */
  static async deleteProvider(id: string): Promise<ApiResponse<void>> {
    return HttpService.delete<ApiResponse<void>>(`${this.BASE_PATH}/${id}`);
  }
}

export const providerService = ProviderService;