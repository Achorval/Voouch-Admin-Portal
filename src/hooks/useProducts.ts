// src/hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiResponse } from '@/types/HttpTypes';
import type { Product, ProductListQueryParams } from '@/types/productTypes';
import { productService } from '@/services/ProductService';

export const useProducts = (params: ProductListQueryParams) => {
    return useQuery<ApiResponse<Product[]>>({
        queryKey: ['products', params],
        queryFn: () => productService.listProducts(params),
    });
};

export const useProduct = (id: string | null, options?: { enabled?: boolean }) => {
    return useQuery<ApiResponse<Product>>({
        queryKey: ['products', id],
        queryFn: () => productService.getProduct(id!),
        enabled: !!id && options?.enabled !== false,
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Product>, Error, FormData>({
        mutationFn: (data) => productService.createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useUpdateProduct = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Product>, Error, FormData>({
        mutationFn: (data) => productService.updateProduct(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['products', id] });
        },
    });
};

export const useToggleProduct = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Product>, Error, string>({
        mutationFn: (id) => productService.toggleStatus(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};

export const useToggleProductMaintenance = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<Product>, Error, { id: string; enabled: boolean; message?: string; endTime?: Date }>({
        mutationFn: (params) => productService.toggleMaintenance(params.id, params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });
};