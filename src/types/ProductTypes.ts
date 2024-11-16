// src/pages/home/products/productTypes.ts

export interface Product {
    id: string;
    categoryId: string;
    name: string;
    code: string;
    description?: string | null;
    icon?: string | null;
    isEnabled: boolean;
    maintenanceMode: boolean;
    maintenanceMessage?: string | null;
    maintenanceStartTime?: Date | null;
    maintenanceEndTime?: Date | null;
    minimumAmount?: string;
    maximumAmount?: string;
    displayOrder: number;
    metadata?: Record<string, any> | null;
    createdAt: Date;
    updatedAt: Date;
}

export type ProductSortBy = 'name' | 'code' | 'displayOrder' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface ProductListQueryParams {
    page?: number;
    limit?: number;
    categoryId?: string;
    isEnabled?: boolean;
    maintenanceMode?: boolean;
    search?: string;
    sortBy?: ProductSortBy;
    sortOrder?: SortOrder;
}

export interface CreateProductDto {
    categoryId: string;
    name: string;
    code: string;
    description?: string;
    icon?: File | null;
    minimumAmount?: string;
    maximumAmount?: string;
    displayOrder?: number;
    metadata?: Record<string, any> | null;
}

export interface UpdateProductDto {
    name?: string;
    description?: string;
    minimumAmount?: string;
    maximumAmount?: string;
    displayOrder?: number;
    isEnabled?: boolean;
    maintenanceMode?: boolean;
    maintenanceMessage?: string;
    maintenanceStartTime?: Date;
    maintenanceEndTime?: Date;
    metadata?: Record<string, any>;
    icon?: File | null;
}