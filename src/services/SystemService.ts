import HttpClient from '@/services/HttpService';
import type { 
    TierLimit, 
    TierLimitInput, 
    FeeConfiguration, 
    FeeConfigInput, 
    AuditLogQueryParams, 
    AuditLogs, 
    SecuritySettings, 
    SecuritySettingsInput 
} from '@/pages/home/systems/SystemTypes';
import { ApiResponse } from '@/types/HttpTypes';

class SystemService {
    private baseUrl = '/api/v1/admin/system';

    async createTierLimit(data: TierLimitInput): Promise<ApiResponse<TierLimit>> {
        return HttpClient.post(`${this.baseUrl}/tier-limits`, data);
    }

    async updateTierLimit(id: string, data: Partial<TierLimitInput>): Promise<ApiResponse<TierLimit>> {
        return HttpClient.patch(`${this.baseUrl}/tier-limits/${id}`, data);
    }

    async listTierLimits(): Promise<ApiResponse<TierLimit[]>> {
        return HttpClient.get(`${this.baseUrl}/tier-limits`);
    }

    async configureFee(productId: string, providerId: string, data: FeeConfigInput): Promise<ApiResponse<FeeConfiguration>> {
        return HttpClient.post(`${this.baseUrl}/products/${productId}/providers/${providerId}/fee`, data);
    }

    async listServiceProviders(params: { isEnabled?: boolean }): Promise<ApiResponse<FeeConfiguration[]>> {
        return HttpClient.get(`${this.baseUrl}/providers`, { params });
    }

    async listAuditLogs(params: AuditLogQueryParams): Promise<ApiResponse<AuditLogs>> {
        return HttpClient.get(`${this.baseUrl}/audit-logs`, { params });
    }

    async updateSecuritySettings(userId: string, data: SecuritySettingsInput): Promise<ApiResponse<SecuritySettings>> {
        return HttpClient.patch(`${this.baseUrl}/users/${userId}/security-settings`, data);
    }
}

export const systemService = new SystemService();
