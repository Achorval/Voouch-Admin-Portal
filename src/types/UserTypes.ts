// src/pages/home/users/Usertypes.ts
export type UserStatus = 'active' | 'pending' | 'suspended' | 'blocked' | 'deleted';
export type UserRole = 'user' | 'admin' | 'super_admin';
export type UserTier = 'basic' | 'silver' | 'gold';
export type SortOrder = 'asc' | 'desc';
export type Gender = 'male' | 'female' | 'other';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender?: Gender;
  dateOfBirth?: Date | null;
  avatar?: string | null;
  role: UserRole;
  status: UserStatus;
  kycLevel: number;
  tierLevel: UserTier;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  lastLogin?: Date | null;
  lastActiveAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface UserListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: UserStatus;
  role?: UserRole;
  tierLevel?: UserTier;
  kycLevel?: number;
  isActive?: boolean;
  startDate?: Date;
  endDate?: Date;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender?: Gender;
  dateOfBirth?: Date;
  role?: UserRole;
  tierLevel?: UserTier;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: Gender;
  dateOfBirth?: Date;
  role?: UserRole;
  tierLevel?: UserTier;
  status?: UserStatus;
  kycLevel?: number;
  isActive?: boolean;
}

export interface SecurityResetOptions {
  password?: boolean;
  pin?: boolean;
  twoFactor?: boolean;
  sessions?: boolean;
  reason?: string;
  notifyUser?: boolean;
}

export interface UpdateUserPermissionsDto {
  role: UserRole;
  permissions?: string[];
  reason?: string;
}

export interface AdminActionResponse {
  success: boolean;
  message: string;
  timestamp: Date;
}

export interface UserStats {
  transactions: {
    total: number;
    successful: number;
    failed: number;
    totalAmount: string;
  };
  login: {
    failedAttempts: number;
    currentAttempts: number;
    lastLogin?: Date;
    lastFailedLogin?: Date;
    lastActive?: Date;
  };
  kyc: {
    totalAttempts: number;
    approved: number;
    rejected: number;
    lastAttempt?: Date;
  };
  support: {
    totalTickets: number;
    openTickets: number;
    resolvedTickets: number;
  };
  cards: {
    total: number;
    active: number;
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
