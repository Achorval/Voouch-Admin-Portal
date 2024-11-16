import { ApiResponse } from '@/types/HttpTypes';
import { providerService } from '@/services/ProviderService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ConfigureProviderDto, ProductProvider, Provider, ProviderListQueryParams } from '@/pages/home/providers/ProviderTypes';

export const useProviders = (params: ProviderListQueryParams) => {
  return useQuery<ApiResponse<Provider[]>, Error>({
    queryKey: ['providers', params],
    queryFn: () => providerService.listProviders(params),
  });
};

export const useProvider = (id: string | null, options?: { enabled?: boolean }) => {
  return useQuery<ApiResponse<Provider>, Error>({
    queryKey: ['providers', id],
    queryFn: () => providerService.getProvider(id!),
    enabled: !!id && options?.enabled !== false,
  });
};

export const useCreateProvider = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Provider>, Error, FormData>({
    mutationFn: (data) => providerService.createProvider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['providers'],
      });
    },
  });
};

export const useUpdateProvider = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Provider>, Error, FormData>({
    mutationFn: (data) => providerService.updateProvider(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['providers'],
      });
      queryClient.invalidateQueries({
        queryKey: ['providers', id],
      });
    },
  });
};

export const useDeleteProvider = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, Error, string>({
    mutationFn: (id) => providerService.deleteProvider(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['providers'],
      });
    },
  });
};

export const useToggleProviderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Provider>, Error, string>({
    mutationFn: (id) => providerService.toggleStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['providers'],
      });
    },
  });
};

export const useConfigureProvider = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<ProductProvider>, Error, ConfigureProviderDto>({
    mutationFn: (data) => providerService.configureProvider(data.productId, data.providerId, data.config),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
};