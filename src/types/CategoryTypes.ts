// src/types/admin/category.types.ts
// export interface Category {
//     id: string;
//     name: string;
//     code: string;
//     description?: string | null;
//     icon?: string | null;
//     isEnabled: boolean;
//     displayOrder: number;
//     createdAt: Date;
//     updatedAt: Date;
// }

// export interface CategoryWithProducts extends Category {
//     productsCount: number;
//     activeProducts: number;
// }

// export interface CategoryListQueryParams {
//     page?: number;
//     limit?: number;
//     isEnabled?: boolean;
//     search?: string;
//     sortBy?: 'name' | 'code' | 'displayOrder' | 'createdAt';
//     sortOrder?: 'asc' | 'desc';
// }


// export interface CategoryListResponse {
//     categories: CategoryWithProducts[];
//     meta: {
//         total: number;
//         pages: number;
//         page: number;
//         limit: number;
//     };
// }

// export interface CategoryProductsResponse {
//     products: {
//         id: string;
//         name: string;
//         code: string;
//         isEnabled: boolean;
//         maintenanceMode: boolean;
//         displayOrder: number;
//         createdAt: Date;
//     }[];
//     meta: {
//         total: number;
//         pages: number;
//         page: number;
//         limit: number;
//     };
// }

// export type CategorySortBy = 'name' | 'code' | 'displayOrder' | 'createdAt';
// export type SortOrder = 'asc' | 'desc';

// export interface CategoryListQueryParams {
//     page?: number;
//     limit?: number;
//     isEnabled?: boolean;
//     search?: string;
//     sortBy?: CategorySortBy;
//     sortOrder?: SortOrder;
// }

// export interface ApiResponse<T> {
//     status: boolean;
//     message: string;
//     data: T;
//     meta: {
//         total: number;
//         pages: number;
//         page: string;
//         limit: string;
//     };
// }




// export interface CreateCategoryDto {
//     name: string;
//     code: string;
//     description?: string;
//     displayOrder?: number;
//     icon?: File | null;
// }

// export interface UpdateCategoryDto {
//     name?: string;
//     description?: string;
//     displayOrder?: number;
//     isEnabled?: boolean;
//     icon?: File | null;
// }

export interface CreateCategoryDto {
    name: string;
    code?: string;
    description?: string;
    displayOrder?: number;
    icon?: File | null;
}

export interface UpdateCategoryDto {
    name?: string;
    description?: string;
    displayOrder?: number;
    isEnabled?: boolean;
    icon?: File | null;
}

export interface Category {
    id: string;
    name: string;
    code: string;
    description?: string | null;
    icon?: string | null;
    isEnabled: boolean;
    displayOrder: number;
}

export type CategorySortBy = 'name' | 'code' | 'displayOrder' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface CategoryListQueryParams {
    page?: number;
    limit?: number;
    isEnabled?: boolean;
    search?: string;
    sortBy?: CategorySortBy;
    sortOrder?: SortOrder;
}