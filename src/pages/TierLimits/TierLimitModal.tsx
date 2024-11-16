// src/pages/tierLimits/TierLimitModal.tsx
import { z } from 'zod';
import React from 'react';
import { 
    useLocation, 
    useNavigate 
} from 'react-router-dom';
import { 
    useProduct, 
    useCreateProduct, 
    useUpdateProduct 
} from '@/hooks/useProducts';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/SweetAlert';
import { zodResolver } from '@hookform/resolvers/zod';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Form schema
const productFormSchema = z.object({
    categoryId: z.string().min(1, 'Category is required'),
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters'),
    code: z.string()
        .min(2, 'Code must be at least 2 characters')
        .max(50, 'Code cannot exceed 50 characters')
        .regex(/^[A-Z0-9_]+$/, 'Code must contain only uppercase letters, numbers and underscores')
        .optional()
        .or(z.literal('')),
    description: z.string().max(255).optional().or(z.literal('')),
    minimumAmount: z.string().optional(),
    maximumAmount: z.string().optional(),
    displayOrder: z.number().min(0).optional(),
    }).refine((data) => {
        if (data.minimumAmount && data.maximumAmount) {
            return Number(data.maximumAmount) >= Number(data.minimumAmount);
        }
        return true;
    }, {
    message: "Maximum amount must be greater than minimum amount",
    path: ["maximumAmount"]
});

type TierLimitFormData = z.infer<typeof productFormSchema>;

interface TierLimitModalProps {
    productId?: string | null;
}

const TierLimitModal = ({ productId }: TierLimitModalProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control,
        watch
    } = useForm<TierLimitFormData>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: '',
            code: '',
            description: '',
            displayOrder: 0,
            minimumAmount: '',
            maximumAmount: ''
        }
    });

    const { data: productData, isLoading: isLoadingProduct } = useProduct(productId || null, {
        enabled: !!productId
    });
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct(productId!);

    const onSubmit = async (data: TierLimitFormData) => {
        try {
            const response = productId
                ? await updateProduct.mutateAsync(data)
                : await createProduct.mutateAsync(data);

            toast(response.message, { icon: response.status ? 'success' : 'error' });
            onClose();
        } catch (error) {
            console.error('Error saving product:', error);
            toast((error as Error).message, { icon: 'error' });
        }
    };

    React.useEffect(() => {
        if (productData?.data) {
            reset({
                name: productData.data.name,
                code: productData.data.code,
                description: productData.data.description || '',
                categoryId: productData.data.categoryId,
                displayOrder: productData.data.displayOrder,
                minimumAmount: productData.data.minimumAmount,
                maximumAmount: productData.data.maximumAmount
            });
        }
    }, [productData, reset]);

    const onClose = () => {
        navigate('/app/settings/tier-limits');
    };

    const isOpen = location.pathname.includes('/new') || location.pathname.includes('/edit');

    if (isLoadingProduct) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} position="right" className="flex flex-col h-full !m-0">
            {/* Fixed Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                <h2 className="text-xl font-semibold">{productId ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col min-h-0">
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-6 py-4 space-y-6">
                        <Input
                            label="Name"
                            placeholder="Enter product name"
                            error={errors.name?.message}
                            {...register('name')}
                        />
                        <Input
                            label="Code"
                            placeholder="Enter product code"
                            error={errors.code?.message}
                            disabled={!!productId}
                            {...register('code')}
                        />
                        <Input
                            label="Description"
                            placeholder="Enter product description"
                            error={errors.description?.message}
                            {...register('description')}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Minimum Amount"
                                placeholder="Enter minimum amount"
                                type="number"
                                step="0.01"
                                error={errors.minimumAmount?.message}
                                {...register('minimumAmount')}
                            />
                            <Input
                                label="Maximum Amount"
                                placeholder="Enter maximum amount"
                                type="number"
                                step="0.01"
                                error={errors.maximumAmount?.message}
                                {...register('maximumAmount')}
                            />
                        </div>
                        <Input
                            type="number"
                            label="Display Order"
                            placeholder="Enter display order"
                            error={errors.displayOrder?.message}
                            {...register('displayOrder', {
                                valueAsNumber: true
                            })}
                        />
                    </div>
                </div>
                {/* Fixed Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
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
                            {productId ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default TierLimitModal;