import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supportTicketService } from '@/services/SupportTicketService';
import type { ApiResponse } from '@/types/HttpTypes';
import type { SupportTicket, SupportTicketUpdateDTO, SupportTicketListQueryParams, CreateNewSupportTicketDTO } from '@/pages/home/supportTickets/TicketTypes';

export const useSupportTickets = (params: SupportTicketListQueryParams) => {
    return useQuery<ApiResponse<SupportTicket[]>, Error>({
        queryKey: ['support-tickets', params],
        queryFn: () => supportTicketService.listTickets(params),
    });
};

export const useSupportTicket = (id: string | null, options?: { enabled?: boolean }) => {
    return useQuery<ApiResponse<SupportTicket>, Error>({
        queryKey: ['support-tickets', id],
        queryFn: () => supportTicketService.getTicket(id!),
        enabled: !!id && options?.enabled !== false,
    });
};

export const useCreateSupportTicket = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<SupportTicket>, Error, CreateNewSupportTicketDTO>({
        mutationFn: (data) => supportTicketService.createTicket(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['support-tickets'],
            });
        },
    });
};

export const useUpdateSupportTicket = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<SupportTicket>, Error, SupportTicketUpdateDTO>({
        mutationFn: (data) => supportTicketService.updateTicket(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['support-tickets'],
            });
            queryClient.invalidateQueries({
                queryKey: ['support-tickets', id],
            });
        },
    });
};

export const useCloseSupportTicket = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<void>, Error, string>({
        mutationFn: (id) => supportTicketService.closeTicket(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['support-tickets'],
            });
        },
    });
};

export const useAssignSupportTicket = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<SupportTicket>, Error, { id: string; assignedTo: string }>({
        mutationFn: ({ id, assignedTo }) => supportTicketService.assignTicket(id, assignedTo),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['support-tickets'],
            });
        },
    });
};
