import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/DashboardService';
import type { ApiResponse } from '@/types/HttpTypes';
import type { DashboardMetrics, AnalyticsQueryParams, ServicePerformance, UserAnalytics, DashboardStats, RecentTransaction, TopCategory, TopServiceProvider } from '@/types/DashboardTypes';
import { PerformanceQueryParams } from '@/types/DashboardTypes';

export const useDashboardMetrics = (params: AnalyticsQueryParams) => {
    return useQuery<ApiResponse<DashboardMetrics>, Error>({
        queryKey: ['dashboard-metrics', params],
        queryFn: () => dashboardService.getDashboardMetrics(params),
    });
};

export const useServicePerformance = (params: PerformanceQueryParams) => {
    return useQuery<ApiResponse<ServicePerformance[]>, Error>({
        queryKey: ['service-performance', params],
        queryFn: () => dashboardService.getServicePerformance(params),
    });
};

export const useUserAnalytics = (params: AnalyticsQueryParams) => {
    return useQuery<ApiResponse<UserAnalytics>, Error>({
        queryKey: ['user-analytics', params],
        queryFn: () => dashboardService.getUserAnalytics(params),
    });
};

export const useDashboardStats = () => {
    return useQuery<ApiResponse<DashboardStats>, Error>({
        queryKey: ['dashboard-stats'],
        queryFn: () => dashboardService.getDashboardStats(),
    });
};

export const useRecentTransactions = (limit: number) => {
    return useQuery<ApiResponse<RecentTransaction[]>, Error>({
        queryKey: ['recent-transactions', limit],
        queryFn: () => dashboardService.getRecentTransactions(limit),
    });
};

export const useTopCategories = (limit: number) => {
    return useQuery<ApiResponse<TopCategory[]>, Error>({
        queryKey: ['top-categories', limit],
        queryFn: () => dashboardService.getTopCategories(limit),
    });
};

export const useTopServiceProviders = (limit: number) => {
    return useQuery<ApiResponse<TopServiceProvider[]>, Error>({
        queryKey: ['top-service-providers', limit],
        queryFn: () => dashboardService.getTopServiceProviders(limit),
    });
};
