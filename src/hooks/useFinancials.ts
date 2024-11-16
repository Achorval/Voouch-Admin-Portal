import { useQuery } from '@tanstack/react-query';
import { financialService } from '@/services/FinancialService';
import type { ApiResponse } from '@/types/HttpTypes';
import type { TransactionStats, ProductRevenue, ProviderRevenue, TransactionFee, FinancialQueryParams, ReferralQueryParams, ReferralStats } from '@/types/FinancialTypes';

export const useTransactionStats = (startDate?: Date, endDate?: Date) => {
    return useQuery<ApiResponse<TransactionStats>, Error>({
        queryKey: ['transaction-stats', startDate, endDate],
        queryFn: () => financialService.getTransactionStats({ startDate, endDate }),
    });
};

export const useProductRevenue = (params: FinancialQueryParams) => {
    return useQuery<ApiResponse<ProductRevenue[]>, Error>({
        queryKey: ['product-revenue', params],
        queryFn: () => financialService.getProductRevenue(params),
    });
};

export const useProviderRevenue = (params: FinancialQueryParams) => {
    return useQuery<ApiResponse<ProviderRevenue[]>, Error>({
        queryKey: ['provider-revenue', params],
        queryFn: () => financialService.getProviderRevenue(params),
    });
};

export const useProductProviderFee = (productId: string, providerId: string) => {
    return useQuery<ApiResponse<TransactionFee | null>, Error>({
        queryKey: ['product-provider-fee', productId, providerId],
        queryFn: () => financialService.getProductProviderFee(productId, providerId),
    });
};

export const useReferralStats = (params: ReferralQueryParams) => {
    return useQuery<ApiResponse<ReferralStats>, Error>({
        queryKey: ['referral-stats', params],
        queryFn: () => financialService.getReferralStats(params),
    });
};
