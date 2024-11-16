export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'reversed';

export interface TransactionStats {
    totalAmount: string;
    totalFees: string;
    totalTransactions: number;
    completedTransactions: number;
    failedTransactions: number;
    pendingTransactions: number;
    reversedTransactions: number;
    referralStats: {
        totalReferrals: number;
        totalEarnings: string;
    };
}

export interface ProductRevenue {
    productId: string;
    categoryId: string;
    categoryName: string;
    totalAmount: string;
    totalFee: string;
    transactionCount: number;
}

export interface ProviderRevenue {
    providerId: string;
    providerName: string;
    totalAmount: string;
    totalFee: string;
    transactionCount: number;
}

export interface TransactionFee {
    feeType: 'flat' | 'percentage';
    feeValue: number;
    minFee?: number;
    maxFee?: number;
}

export interface FinancialQueryParams {
    startDate?: Date;
    endDate?: Date;
    status?: TransactionStatus;
    categoryId?: string;
    providerId?: string;
}

export interface ReferralQueryParams {
    startDate?: Date;
    endDate?: Date;
    minAmount?: number;
}

export interface ReferralStats {
    totalReferrals: number;
    totalEarnings: string;
}