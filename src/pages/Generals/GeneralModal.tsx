// src/pages/generals/GeneralModal.tsx
import { 
    useCategory, 
    useCreateCategory, 
    useUpdateCategory 
} from '@/hooks/useCategories';
import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/SweetAlert';
import { zodResolver } from '@hookform/resolvers/zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';

const generalFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters'),
    code: z.string()
        .min(2, 'Code must be at least 2 characters')
        .max(50, 'Code cannot exceed 100 characters')
});

type GeneralFormData = z.infer<typeof generalFormSchema>;

interface GeneralModalProps {
    categoryId?: string | null;
}

const GeneralModal = ({ categoryId }: GeneralModalProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control
    } = useForm<GeneralFormData>({
        resolver: zodResolver(generalFormSchema),
        defaultValues: {
            name: '',
            code: '',
        }
    });

    const { data: category, isLoading: isLoadingCategory } = useCategory(categoryId || null, {
        enabled: !!categoryId
    });
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory(categoryId!);

    // Helper function to create FormData
    const onSubmit = async (data: GeneralFormData) => {
        try {
            let response;
            if (categoryId) {
                response = await updateCategory.mutateAsync(data);
            } else {
                response = await createCategory.mutateAsync(data);
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
            });
        } else {
            reset({
                name: '',
                code: '',
            });
        }
    }, [category, reset]);

    const onClose = () => {
        navigate('/app/settings/generals');
    };

    const isOpen = location.pathname.includes('/new') || location.pathname.includes('/edit');

    if (isLoadingCategory) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} position="right" className="flex flex-col h-full !m-0">
            {/* Fixed Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                <h2 className="text-xl font-semibold">{categoryId ? 'Edit General' : 'Add General'}</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col min-h-0">
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-6 py-4 space-y-6">
                        <Input
                            label="Key"
                            placeholder="Enter key"
                            error={errors.key?.message}
                            {...register('key')}
                        />
                        <Input
                            label="Value"
                            placeholder="Enter value"
                            error={errors.value?.message}
                            {...register('value')}
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

export default GeneralModal;