// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/UserService';
import type { ApiResponse } from '@/types/HttpTypes';
import type { User, UserStats, UserListQueryParams, CreateUserDTO, UpdateUserDTO, AdminActionResponse, SecurityResetOptions, UpdateUserPermissionsDto } from '@/pages/home/users/UserTypes';

export const useUsers = (params: UserListQueryParams) => {
    return useQuery<ApiResponse<User[]>, Error>({
        queryKey: ['users', params],
        queryFn: () => userService.listUsers(params),
    });
};

export const useUser = (id: string | null, options?: { enabled?: boolean }) => {
    return useQuery<ApiResponse<User>, Error>({
        queryKey: ['users', id],
        queryFn: () => userService.getUser(id!),
        enabled: !!id && options?.enabled !== false,
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<User>, Error, CreateUserDTO>({
        mutationFn: (data) => userService.createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
        },
    });
};

export const useUpdateUser = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<User>, Error, UpdateUserDTO>({
        mutationFn: (data) => userService.updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
            queryClient.invalidateQueries({
                queryKey: ['users', id],
            });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<void>, Error, string>({
        mutationFn: (id) => userService.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
        },
    });
};

export const useToggleUserStatus = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<User>, Error, string>({
        mutationFn: (id) => userService.toggleStatus(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
        },
    });
};

export const useUserStats = (userId: string) => {
    return useQuery<ApiResponse<UserStats>, Error>({
        queryKey: ['users', userId, 'stats'],
        queryFn: () => userService.getUserStats(userId),
        enabled: !!userId,
    });
};

export const useUserSecurityReset = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<AdminActionResponse>, Error, SecurityResetOptions>({
        mutationFn: (options) => userService.resetSecurity(userId, options),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users', userId],
            });
        },
    });
};

export const useUserPermissions = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse<AdminActionResponse>, Error, UpdateUserPermissionsDto>({
        mutationFn: (data) => userService.updatePermissions(userId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users', userId],
            });
        },
    });
};
