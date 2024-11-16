import HttpClient from '@/services/HttpService';
import type { Transaction, TransactionWithUser, TransactionListQueryParams, TransactionActionDto, TransactionStats } from '@/types/TransactionTypes';
import { ApiResponse } from '@/types/HttpTypes';

class TransactionService {
    private baseUrl = '/api/v1/admin/transactions';

    async listTransactions(params: TransactionListQueryParams): Promise<ApiResponse<TransactionWithUser[]>> {
        return HttpClient.get(this.baseUrl, { params });
    }

    async getTransactionDetails(id: string): Promise<ApiResponse<TransactionWithUser>> {
        return HttpClient.get(`${this.baseUrl}/${id}`);
    }

    async performTransactionAction(id: string, action: string, reason: string): Promise<void> {
        await HttpClient.post(`${this.baseUrl}/${id}/action`, { action, reason });
    }

    async getTransactionStats(startDate?: Date, endDate?: Date): Promise<ApiResponse<TransactionStats>> {
        return HttpClient.get(`${this.baseUrl}/stats`, { params: { startDate, endDate } });
    }
}

export const transactionService = new TransactionService();
