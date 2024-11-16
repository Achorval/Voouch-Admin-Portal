export type SupportTicketStatus = 'open' | 'pending' | 'resolved' | 'closed';
export type SupportTicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface SupportTicket {
    id: string;
    ticketNumber: string;
    userId: string;
    assignedTo: string | undefined;
    categoryId: string;
    subject: string;
    description: string;
    status: SupportTicketStatus;
    priority: SupportTicketPriority;
    transactionId: string;
    attachments: any[];
    metadata: any;
    lastRepliedAt: Date;
    resolvedAt: Date;
    closedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateNewSupportTicketDTO {
    userId: string;
    categoryId: string;
    subject: string;
    description: string;
    status?: SupportTicketStatus;
    priority?: SupportTicketPriority;
    transactionId: string;
    assignedTo?: string;
    attachments?: any[];
    metadata?: any;
}

export interface SupportTicketUpdateDTO {
    subject?: string;
    description?: string;
    status?: SupportTicketStatus;
    priority?: SupportTicketPriority;
    assignedTo?: string;
}
export interface SupportTicketListQueryParams {
    page?: number;
    limit?: number;
    status?: SupportTicketStatus;
    priority?: SupportTicketPriority;
    search?: string;
}

export interface SupportTicketListResponse {
    tickets: SupportTicket[];
    meta: {
        total: number;
        pages: number;
    };
}