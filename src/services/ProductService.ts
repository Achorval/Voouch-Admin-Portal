// src/services/ProductService/index.ts
import HttpService from './HttpService';
import type { 
    Product, 
    ProductListQueryParams,
    CreateProductDto,
    UpdateProductDto 
} from '@/pages/home/products/ProductTypes';
import type { ApiResponse } from '../types/HttpTypes';
import { ConfigureProviderDto, ProductProvider } from '@/pages/home/providers/ProviderTypes';

class ProductService {
    private static readonly BASE_PATH = '/api/v1/admin/products';

    /**
     * List products with query parameters
     */
    static async listProducts(params: ProductListQueryParams): Promise<ApiResponse<Product[]>> {
        const queryParams: Record<string, string> = {};
        
        if (params.page) queryParams.page = params.page.toString();
        if (params.limit) queryParams.limit = params.limit.toString();
        if (params.search) queryParams.search = params.search;
        if (params.categoryId) queryParams.categoryId = params.categoryId;
        if (params.isEnabled !== undefined) queryParams.isEnabled = params.isEnabled.toString();
        if (params.maintenanceMode !== undefined) queryParams.maintenanceMode = params.maintenanceMode.toString();
        if (params.sortBy) queryParams.sortBy = params.sortBy;
        if (params.sortOrder) queryParams.sortOrder = params.sortOrder;

        return HttpService.get<ApiResponse<Product[]>>(this.BASE_PATH, {
            params: queryParams
        });
    }

    /**
     * Get product details
     */
    static async getProduct(id: string): Promise<ApiResponse<Product>> {
        return HttpService.get<ApiResponse<Product>>(`${this.BASE_PATH}/${id}`);
    }

    /**
     * Create new product
     */
    static async createProduct(data: FormData): Promise<ApiResponse<Product>> {
        return HttpService.post<ApiResponse<Product>>(
            this.BASE_PATH,
            data,
            // {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // }
        );
    }

    /**
     * Update product
     */
    static async updateProduct(id: string, data: FormData): Promise<ApiResponse<Product>> {
        return HttpService.patch<ApiResponse<Product>>(
            `${this.BASE_PATH}/${id}`,
            data,
            // {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // }
        );
    }

    /**
     * Toggle product status
     */
    static async toggleStatus(id: string): Promise<ApiResponse<Product>> {
        return HttpService.post<ApiResponse<Product>>(
            `${this.BASE_PATH}/${id}/toggle`,
            undefined
        );
    }

    /**
     * Toggle maintenance mode
     */
    static async toggleMaintenance(
        id: string, 
        data: {
            enabled: boolean;
            message?: string;
            endTime?: Date;
        }
    ): Promise<ApiResponse<Product>> {
        return HttpService.post<ApiResponse<Product>>(
            `${this.BASE_PATH}/${id}/maintenance`,
            data
        );
    }

    /**
     * Delete product
     */
    static async deleteProduct(id: string): Promise<ApiResponse<void>> {
        return HttpService.delete<ApiResponse<void>>(`${this.BASE_PATH}/${id}`);
    }
}

export const productService = ProductService;