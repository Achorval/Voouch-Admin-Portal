import HttpClient from '@/services/HttpService';
import type {
    AnalyticsQueryParams,
    PerformanceQueryParams,
    DashboardMetrics,
    ServicePerformance,
    UserAnalytics,
    DashboardStats,
    RecentTransaction,
    TopCategory,
    TopServiceProvider,
} from '@/types/DashboardTypes';
import { ApiResponse } from '@/types/HttpTypes';

class DashboardService {
    private baseUrl = '/api/v1/admin/dashboard';

    async getDashboardMetrics(params: AnalyticsQueryParams): Promise<ApiResponse<DashboardMetrics>> {
        return HttpClient.get(`${this.baseUrl}/metrics`, { params });
    }

    async getServicePerformance(params: PerformanceQueryParams): Promise<ApiResponse<ServicePerformance[]>> {
        return HttpClient.get(`${this.baseUrl}/performance`, { params });
    }

    async getUserAnalytics(params: AnalyticsQueryParams): Promise<ApiResponse<UserAnalytics>> {
        return HttpClient.get(`${this.baseUrl}/users`, { params });
    }

    async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
        return HttpClient.get(`${this.baseUrl}/stats`);
    }

    async getRecentTransactions(limit: number): Promise<ApiResponse<RecentTransaction[]>> {
        return HttpClient.get(`${this.baseUrl}/recent-transactions`, { params: { limit } });
    }

    async getTopCategories(limit: number): Promise<ApiResponse<TopCategory[]>> {
        return HttpClient.get(`${this.baseUrl}/top-categories`, { params: { limit } });
    }

    async getTopServiceProviders(limit: number): Promise<ApiResponse<TopServiceProvider[]>> {
        return HttpClient.get(`${this.baseUrl}/top-service-providers`, { params: { limit } });
    }
}

export const dashboardService = new DashboardService();
