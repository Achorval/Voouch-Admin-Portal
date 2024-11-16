export interface DashboardMetrics {
    transactions: {
        total: number;
        totalAmount: string;
        totalFees: string;
        completedCount: number;
        failedCount: number;
        pendingCount: number;
        todayCount: number;
        todayAmount: string;
    };
    users: {
        total: number;
        activeUsers: number;
        newUsers: number;
        kycVerified: number;
        kycPending: number;
    };
    providers: {
        total: number;
        activeProviders: number;
        totalTransactions: number;
        successRate: number;
    };
    categories: {
        total: number;
        activeCategories: number;
        topCategories: TopCategory[];
    };
}

export interface AnalyticsQueryParams {
    startDate?: Date;
    endDate?: Date;
    providerId?: string;
    categoryId?: string;
}

export interface PerformanceQueryParams {
    page?: number;
    limit?: number;
    startDate?: Date;
    endDate?: Date;
    minSuccessRate?: number;
}

export interface ServicePerformance {
    categoryId: string;
    categoryName: string;
    totalTransactions: number;
    successfulTransactions: number;
    failedTransactions: number;
    totalAmount: string;
    successRate: number;
    averageProcessingTime: number;
    providers: {
        providerId: string;
        providerName: string;
        transactionCount: number;
        successRate: number;
        totalAmount: string;
    }[];
}

export interface UserAnalytics {
    registrationTrend: {
        date: string;
        count: number;
    }[];
    kycStats: {
        level: number;
        count: number;
        percentage: number;
    }[];
    transactionStats: {
        activeUsers: number;
        averageTransactionSize: string;
    };
    referralStats: {
        totalReferrals: number;
        activeReferrers: number;
        totalEarnings: string;
    };
    recentActivity: Array<{
        id: string;
        type: string;
        description: string;
        ipAddress?: string;
        deviceInfo?: any;
        createdAt: Date;
    }>;
}

export interface DashboardStats {
    totalTransactionAmount: number;
    totalTransactions: number;
    totalUsers: number;
    totalWallets: number;
}

export interface RecentTransaction {
    id: string;
    reference: string;
    amount: number;
    createdAt: Date;
    firstName: string;
    lastName: string;
}

export interface TopCategory {
    id: string;
    name: string;
    code: string;
    transactionCount: number;
    totalAmount: number;
}

export interface TopServiceProvider {
    id: string;
    name: string;
    code: string;
    transactionCount: number;
    totalAmount: number;
}
