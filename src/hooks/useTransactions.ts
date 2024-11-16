import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/services/TransactionService';
import type { ApiResponse } from '@/types/HttpTypes';
import type { Transaction, TransactionWithUser, TransactionListQueryParams, TransactionActionDto, TransactionStats } from '@/types/TransactionTypes';

export const useTransactions = (params: TransactionListQueryParams) => {
    return useQuery<ApiResponse<TransactionWithUser[]>, Error>({
        queryKey: ['transactions', params],
        queryFn: () => transactionService.listTransactions(params),
    });
};

export const useTransactionDetails = (id: string) => {
    return useQuery<ApiResponse<TransactionWithUser>, Error>({
        queryKey: ['transactions', id],
        queryFn: () => transactionService.getTransactionDetails(id),
    });
};

export const useTransactionAction = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, TransactionActionDto>({
        mutationFn: (data) => transactionService.performTransactionAction(data.id, data.action, data.reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        },
    });
};

export const useTransactionStats = (startDate?: Date, endDate?: Date) => {
    return useQuery<ApiResponse<TransactionStats>, Error>({
        queryKey: ['transaction-stats', startDate, endDate],
        queryFn: () => transactionService.getTransactionStats(startDate, endDate),
    });
};
