// src/hooks/useCategories.ts
import { ApiResponse } from '@/types/HttpTypes';
import { categoryService } from '@/services/CategoryService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Category, CategoryListQueryParams, CreateCategoryDto, UpdateCategoryDto } from '@/pages/home/categories/CategoryTypes';

export const useCategories = (params: CategoryListQueryParams) => {
    return useQuery<ApiResponse<Category[]>, Error>({
        queryKey: ['categories', params],
        queryFn: () => categoryService.listCategories(params),
    });
};

export const useCategory = (id: string | null, options?: { enabled?: boolean }) => {
    return useQuery<ApiResponse<Category>, Error>({
      queryKey: ['categories', id],
      queryFn: () => categoryService.getCategory(id!),
      enabled: !!id && options?.enabled !== false,
    });
};

export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    
    return useMutation<ApiResponse<Category>, Error, FormData>({
        mutationFn: (data) => categoryService.createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useUpdateCategory = (id: string) => {
    const queryClient = useQueryClient();
    
    return useMutation<ApiResponse<Category>, Error, FormData>({
        mutationFn: (data) => categoryService.updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['categories', id] });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<void>, Error, string>({
        mutationFn: (id) => categoryService.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            });
        },
    });
};

export const useToggleCategoryStatus = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Category>, Error, string>({
        mutationFn: (id) => categoryService.toggleStatus(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            });
        },
    });
};
