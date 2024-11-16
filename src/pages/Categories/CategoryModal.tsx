// src/pages/categories/CategoryModal.tsx
import { z } from 'zod';
import React from 'react';
import { 
    useCategory, 
    useCreateCategory, 
    useUpdateCategory 
} from '@/hooks/useCategories';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/SweetAlert';
import FileUpload from '@/components/ui/FileUpload';
import { zodResolver } from '@hookform/resolvers/zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';

// Validation schema
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const categoryFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters'),
    code: z.string()
        .min(2, 'Code must be at least 2 characters')
        .max(50, 'Code cannot exceed 100 characters')
    .regex(/^[A-Z0-9_]+$/, 'Code must contain only uppercase letters, numbers and underscores'),
    description: z.string().max(255).optional().or(z.literal('')),
    displayOrder: z.number().min(0).optional(),
    icon: z.any()
        .refine((file) => {
            if (!file) return true;
            return file instanceof File;
        }, 'Icon must be a file')
        .refine((file) => {
            if (!file) return true;
            return file.size <= MAX_FILE_SIZE;
        }, 'Max file size is 2MB')
        .refine((file) => {
            if (!file) return true;
            return ACCEPTED_IMAGE_TYPES.includes(file.type);
        }, 'Only .jpg, .jpeg, .png and .webp formats are supported')
        .optional()
        .nullable()
});

type CategoryFormData = z.infer<typeof categoryFormSchema>;

interface CategoryModalProps {
    categoryId?: string | null;
}

const CategoryModal = ({ categoryId }: CategoryModalProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: '',
            code: '',
            description: '',
            displayOrder: 0,
            icon: null
        }
    });

    const { data: category, isLoading: isLoadingCategory } = useCategory(categoryId || null, {
        enabled: !!categoryId
    });
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory(categoryId!);

    // Helper function to create FormData
    const onSubmit = async (data: CategoryFormData) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
    
            if (data.description) {
                formData.append('description', data.description);
            }
    
            if (data.displayOrder) {
                formData.append('displayOrder', data.displayOrder.toString());
            }
    
            if (data.icon) {
                formData.append('icon', data.icon);
            }

            let response;
            if (categoryId) {
                response = await updateCategory.mutateAsync(formData);
            } else {
                response = await createCategory.mutateAsync(formData);
            }

            toast(response.message, { icon: response.status ? 'success' : 'error' });
            onClose();
        } catch (error) {
            console.error('Error saving category:', error);
            toast((error as Error).message, { icon: 'error' });
        }
    };

    // Reset form when category data is loaded
    React.useEffect(() => {
        if (category?.data) {
            reset({
                name: category.data.name,
                code: category.data.code,
                description: category.data.description || '',
                displayOrder: category.data.displayOrder,
                icon: null
            });
        } else {
            reset({
                name: '',
                code: '',
                description: '',
                displayOrder: 0,
                icon: null,
            });
        }
    }, [category, reset]);

    const onClose = () => {
        navigate('/app/systems/categories');
    };

    const isOpen = location.pathname.includes('/new') || location.pathname.includes('/edit');

    if (isLoadingCategory) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} position="right" className="flex flex-col h-full !m-0">
            {/* Fixed Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                <h2 className="text-xl font-semibold">{categoryId ? 'Edit Category' : 'Add Category'}</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col min-h-0">
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-6 py-4 space-y-6">
                        <Input
                            label="Name"
                            placeholder="Enter category name"
                            error={errors.name?.message}
                            {...register('name')}
                        />
                        <Input
                            label="Code"
                            placeholder="Enter category code"
                            error={errors.code?.message}
                            disabled={!!categoryId}
                            {...register('code')}
                        />

                        <Input
                            label="Description"
                            placeholder="Enter category description"
                            error={errors.description?.message}
                            {...register('description')}
                        />
                        <Input
                            type="number"
                            label="Display Order"
                            placeholder="Enter display order"
                            error={errors.displayOrder?.message}
                            {...register('displayOrder', {
                                valueAsNumber: true
                            })}
                        />
                        <FileUpload
                            control={control}
                            name="icon"
                            label="Icon"
                            maxFileSize={2}
                            accept={ACCEPTED_IMAGE_TYPES.join(',')}
                            placeholder="Click or drop an image here"
                        />
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="mt-auto px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                    <div className="flex justify-center gap-3">
                        <Button
                            type="button"
                            variant="outline-danger"
                            onClick={onClose}
                            className="w-full"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            loading={isSubmitting}
                        >
                            {categoryId ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default CategoryModal;