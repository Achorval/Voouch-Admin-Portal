import HttpClient from '@/services/HttpService';
import type { TransactionStats, ProductRevenue, ProviderRevenue, TransactionFee, FinancialQueryParams, ReferralQueryParams, ReferralStats } from '@/types/FinancialTypes';
import { ApiResponse } from '@/types/HttpTypes';

class FinancialService {
    private baseUrl = '/api/v1/admin/financials';

    async getTransactionStats(params: FinancialQueryParams): Promise<ApiResponse<TransactionStats>> {
        return HttpClient.get(`${this.baseUrl}/transactions/stats`, { params });
    }

    async getProductRevenue(params: FinancialQueryParams): Promise<ApiResponse<ProductRevenue[]>> {
        return HttpClient.get(`${this.baseUrl}/products/revenue`, { params });
    }

    async getProviderRevenue(params: FinancialQueryParams): Promise<ApiResponse<ProviderRevenue[]>> {
        return HttpClient.get(`${this.baseUrl}/providers/revenue`, { params });
    }

    async getProductProviderFee(productId: string, providerId: string): Promise<ApiResponse<TransactionFee | null>> {
        return HttpClient.get(`${this.baseUrl}/products/${productId}/providers/${providerId}/fee`);
    }

    async getReferralStats(params: ReferralQueryParams): Promise<ApiResponse<ReferralStats>> {
        return HttpClient.get(`${this.baseUrl}/referrals/stats`, { params });
    }
}

export const financialService = new FinancialService();
