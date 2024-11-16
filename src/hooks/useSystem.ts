import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { systemService } from '@/services/SystemService';
import type { ApiResponse } from '@/types/HttpTypes';
import type { 
    TierLimit, 
    TierLimitInput, 
    FeeConfiguration, 
    FeeConfigInput, 
    AuditLogQueryParams, 
    SecuritySettings, 
    SecuritySettingsInput, 
    AuditLogs
} from '@/pages/home/systems/SystemTypes';

export const useTierLimits = () => {
    return useQuery<ApiResponse<TierLimit[]>, Error>({
        queryKey: ['tier-limits'],
        queryFn: () => systemService.listTierLimits(),
    });
};

export const useCreateTierLimit = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<TierLimit>, Error, TierLimitInput>({
        mutationFn: (data) => systemService.createTierLimit(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tier-limits'] });
        },
    });
};

export const useUpdateTierLimit = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<TierLimit>, Error, Partial<TierLimitInput>>({
        mutationFn: (data) => systemService.updateTierLimit(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tier-limits'] });
        },
    });
};

export const useConfigureFee = (productId: string, providerId: string) => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<FeeConfiguration>, Error, FeeConfigInput>({
        mutationFn: (data) => systemService.configureFee(productId, providerId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fee-configuration'] });
        },
    });
};

export const useServiceProviders = (params: { isEnabled?: boolean }) => {
    return useQuery<ApiResponse<FeeConfiguration[]>, Error>({
        queryKey: ['service-providers', params],
        queryFn: () => systemService.listServiceProviders(params),
    });
};

export const useAuditLogs = (params: AuditLogQueryParams) => {
    return useQuery<ApiResponse<AuditLogs[]>, Error>({
        queryKey: ['audit-logs', params],
        queryFn: () => systemService.listAuditLogs(params),
    });
};

export const useUpdateSecuritySettings = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<SecuritySettings>, Error, SecuritySettingsInput>({
        mutationFn: (data) => systemService.updateSecuritySettings(userId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['security-settings', userId] });
        },
    });
};
