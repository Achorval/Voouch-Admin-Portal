// src/services/UserService/index.ts
import HttpClient from '@/services/HttpService';
import type { User, UserListQueryParams, CreateUserDTO, UpdateUserDTO, SecurityResetOptions, UpdateUserPermissionsDto, AdminActionResponse, UserStats } from '@/pages/home/users/UserTypes';
import { ApiResponse } from '../types/HttpTypes';

class UserService {
    // private static readonly BASE_PATH = '/api/v1/admin/products';
    private baseUrl = '/api/v1/admin/users';

    async listUsers(params: UserListQueryParams): Promise<ApiResponse<User[]>> {
        const queryParams: Record<string, string> = {};

        if (params.page) queryParams.page = params.page.toString();
        if (params.limit) queryParams.limit = params.limit.toString();
        if (params.search) queryParams.search = params.search;
        if (params.sortBy) queryParams.sortBy = params.sortBy;
        if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
        if (params.status !== undefined) queryParams.status = params.status.toString();
        return HttpClient.get(this.baseUrl, {
            params: queryParams,
        });
    }

    async getUser(id: string): Promise<ApiResponse<User>> {
        return HttpClient.get(`${this.baseUrl}/${id}`);
    }

    async createUser(data: CreateUserDTO): Promise<ApiResponse<User>> {
        return HttpClient.post(this.baseUrl, data);
    }

    async updateUser(id: string, data: UpdateUserDTO): Promise<ApiResponse<User>> {
        return HttpClient.patch(`${this.baseUrl}/${id}`, data);
    }

    async deleteUser(id: string): Promise<ApiResponse<void>> {
        return HttpClient.delete(`${this.baseUrl}/${id}`);
    }

    async toggleStatus(id: string): Promise<ApiResponse<User>> {
        return HttpClient.post(`${this.baseUrl}/${id}/toggle`);
    }

    async resetSecurity(id: string, options: SecurityResetOptions): Promise<ApiResponse<AdminActionResponse>> {
        return HttpClient.post(`${this.baseUrl}/${id}/security/reset`, options);
    }

    async updatePermissions(id: string, data: UpdateUserPermissionsDto): Promise<ApiResponse<AdminActionResponse>> {
        return HttpClient.patch(`${this.baseUrl}/${id}/permissions`, data);
    }

    async resetPassword(id: string): Promise<ApiResponse<void>> {
        return HttpClient.post(`${this.baseUrl}/${id}/reset-password`);
    }

    async getUserStats(id: string): Promise<ApiResponse<UserStats>> {
        return HttpClient.get(`${this.baseUrl}/${id}/stats`);
    }

    async updateKyc(id: string, level: number): Promise<ApiResponse<User>> {
        return HttpClient.patch(`${this.baseUrl}/${id}/kyc`, { level });
    }
}

export const userService = new UserService();
