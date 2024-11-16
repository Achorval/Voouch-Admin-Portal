// src/schemas/admin/category.schema.ts
import { z } from 'zod';

export const listCategoriesSchema = z.object({
    query: z.object({
        page: z.string().optional().transform(val => val ? parseInt(val) : 1),
        limit: z.string().optional().transform(val => val ? parseInt(val) : 10),
        isEnabled: z.string().optional().transform(val => val === 'true'),
        search: z.string().optional(),
        sortBy: z.enum(['name', 'code', 'displayOrder', 'createdAt']).optional(),
        sortOrder: z.enum(['asc', 'desc']).optional()
    })
});

export const createCategorySchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters'),
    code: z.string()
        .min(2, 'Code must be at least 2 characters')
        .max(50, 'Code cannot exceed 50 characters')
        .regex(/^[A-Z0-9_]+$/, 'Code must contain only uppercase letters, numbers and underscores'),
    description: z.string().max(255).optional(),
    displayOrder: z.number().min(0).optional().default(0)
});

export const updateCategorySchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters')
        .optional(),
    description: z.string().max(255).optional(),
    displayOrder: z.number().min(0).optional(),
    isEnabled: z.boolean().optional()
});

// Schema for updating display order
export const updateDisplayOrderSchema = z.object({
    displayOrder: z.number()
        .min(0, 'Display order must be a positive number')
});

// Schema for list category products query parameters
export const listCategoryProductsSchema = z.object({
    params: z.object({
        id: z.string().min(1, 'Category ID is required')
    }),
    query: z.object({
        page: z.string().optional().transform(val => val ? parseInt(val) : 1),
        limit: z.string().optional().transform(val => val ? parseInt(val) : 10)
    })
});

// Custom error map for better error messages
export const zodCustomErrorMap: z.ZodErrorMap = (issue, ctx) => {
    switch (issue.code) {
        case z.ZodIssueCode.invalid_type:
            if (issue.expected === 'string') {
                return { message: 'This field is required' };
            }
            break;
        case z.ZodIssueCode.too_small:
            if (issue.type === 'string') {
                return { message: `Must be at least ${issue.minimum} characters` };
            }
            break;
        case z.ZodIssueCode.too_big:
            if (issue.type === 'string') {
                return { message: `Must not exceed ${issue.maximum} characters` };
            }
            break;
    }
    return { message: ctx.defaultError };
};

// Set custom error map
z.setErrorMap(zodCustomErrorMap);