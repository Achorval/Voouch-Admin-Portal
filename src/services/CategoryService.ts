// src/services/CategoryService.ts
import HttpService from '@/services/HttpService';
import { ApiResponse } from '../types/HttpTypes';
import type { Category, CategoryListQueryParams, CreateCategoryDto, UpdateCategoryDto } from '@/pages/home/categories/CategoryTypes';

class CategoryService {
    // List categories
    async listCategories(params: CategoryListQueryParams): Promise<ApiResponse<Category[]>> {
        const response = await HttpService.get<ApiResponse<Category[]>>('/api/v1/admin/categories', { 
            params: {
                page: params.page?.toString() ?? "",
                limit: params.limit?.toString() ?? "",
                isEnabled: params.isEnabled?.toString() ?? "",
                search: params.search ?? "",
                sortBy: params.sortBy ?? "",
                sortOrder: params.sortOrder ?? "",
            }
        });
        return response;
    }

    // Get single category
    async getCategory(id: string): Promise<ApiResponse<Category>> {
        const response = await HttpService.get<ApiResponse<Category>>(`/api/v1/admin/categories/${id}`);
        return response;
    }

    // Create category
    async createCategory(data: FormData): Promise<ApiResponse<Category>> {
        console.log(data)
        console.log(Array.from(data.entries()));
        const response = await HttpService.post<ApiResponse<Category>>('/api/v1/admin/categories', data);
        return response;
    }

    // Update category
    async updateCategory(id: string, data: FormData): Promise<ApiResponse<Category>> {
        const response = await HttpService.patch<ApiResponse<Category>>(`/api/v1/admin/categories/${id}`, data);
        return response;
    }

    // Delete category
    async deleteCategory(id: string): Promise<ApiResponse<void>> {
        const response = await HttpService.delete<ApiResponse<void>>(`/api/v1/admin/categories/${id}`);
        return response;
    }

    // Toggle category status
    async toggleStatus(id: string): Promise<ApiResponse<Category>> {
        const response = await HttpService.post<ApiResponse<Category>>(`/api/v1/admin/categories/${id}/toggle`);
        return response;
    }

    // Update display order
    async updateDisplayOrder(id: string, displayOrder: number): Promise<ApiResponse<Category>> {
        const response = await HttpService.patch<ApiResponse<Category>>(`/api/v1/admin/categories/${id}/display-order`, {
            displayOrder
        });
        return response;
    }
}

export const categoryService = new CategoryService();