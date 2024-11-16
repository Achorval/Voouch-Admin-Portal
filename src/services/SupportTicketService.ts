// src/services/SupportTicketService/index.ts
import HttpClient from '@/services/HttpService';
import type { CreateNewSupportTicketDTO, SupportTicket, SupportTicketListQueryParams, SupportTicketUpdateDTO } from '@/pages/home/supportTickets/TicketTypes';
import { ApiResponse } from '../types/HttpTypes';

class SupportTicketService {
    private baseUrl = '/api/v1/admin/support-tickets';

    async createTicket(data: CreateNewSupportTicketDTO): Promise<ApiResponse<SupportTicket>> {
        return HttpClient.post(this.baseUrl, data);
    }

    async updateTicket(id: string, data: SupportTicketUpdateDTO): Promise<ApiResponse<SupportTicket>> {
        return HttpClient.patch(`${this.baseUrl}/${id}`, data);
    }

    async closeTicket(id: string): Promise<ApiResponse<void>> {
        return HttpClient.post(`${this.baseUrl}/${id}/close`);
    }

    async assignTicket(id: string, assignedTo: string): Promise<ApiResponse<SupportTicket>> {
        return HttpClient.post(`${this.baseUrl}/${id}/assign`, { assignedTo });
    }

    async getTicket(id: string): Promise<ApiResponse<SupportTicket>> {
        return HttpClient.get(`${this.baseUrl}/${id}`);
    }

    async listTickets(params: SupportTicketListQueryParams): Promise<ApiResponse<SupportTicket[]>> {
        const queryParams: Record<string, string> = {};
    
        if (params.page) queryParams.page = params.page.toString();
        if (params.limit) queryParams.limit = params.limit.toString();
        if (params.status !== undefined) queryParams.isEnabled = params.status.toString();
        if (params.priority) queryParams.sortBy = params.priority;
        if (params.search) queryParams.search = params.search;

        return HttpClient.get<ApiResponse<SupportTicket[]>>(this.baseUrl, {
            params: queryParams
        });
    }
}

export const supportTicketService = new SupportTicketService();
