export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'reversed';
export type TransactionType = 'credit' | 'debit';
export type TransactionActionType = 'approve' | 'decline' | 'reverse';

export interface Transaction {
    id: string;
    userId: string;
    walletId?: string;
    categoryId: string;
    providerId?: string;
    status: TransactionStatus;
    type: TransactionType;
    amount: number;
    fee: number;
    total: number;
    paymentMethod: string;
    cardId?: string;
    reference: string;
    externalReference?: string;
    description?: string;
    providerData?: any;
    serviceData?: any;
    metadata?: any;
    createdAt: Date;
    updatedAt: Date;
    completedAt: Date;
}

export interface TransactionWithUser extends Transaction {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
    };
    category: {
        id: string;
        name: string;
        code: string;
    };
}

export interface TransactionListQueryParams {
    page?: number;
    limit?: number;
    status?: TransactionStatus;
    type?: TransactionType;
    startDate?: Date;
    endDate?: Date;
    minAmount?: number;
    maxAmount?: number;
    paymentMethod?: string;
    categoryId?: string;
    reference?: string;
    search?: string;
    userId?: string;
}

export interface TransactionActionDto {
    id: string;
    action: TransactionActionType;
    reason: string;
}

export interface TransactionStats {
    totalTransactions: number;
    totalAmount: string;
    totalFees: string;
    successfulTransactions: number;
    failedTransactions: number;
    pendingTransactions: number;
    reversedTransactions: number;
    todayStats: {
        count: number;
        amount: string;
        fees: string;
    };
    recentActivity: Array<{
        timestamp: Date;
        action: string;
        details: string;
    }>;
}
