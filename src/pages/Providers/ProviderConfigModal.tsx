// src/pages/providers/ProviderConfigModal.tsx
import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/SweetAlert';
import { zodResolver } from '@hookform/resolvers/zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useConfigureProvider } from '@/hooks/useProviders';
import { useLocation, useNavigate } from 'react-router-dom';

// Validation schema
const providerConfigSchema = z.object({
    productId: z.string().min(1, 'Product ID is required'),
    providerId: z.string().min(1, 'Provider ID is required'),
    providerProductCode: z.string().min(1, 'Provider product code is required'),
    priority: z.number().min(1, 'Priority must be greater than 0'),
    isDefault: z.boolean(),
    feeType: z.enum(['flat', 'percentage']),
    feeValue: z.string().min(1, 'Fee value is required'),
    minFee: z.string().optional(),
    maxFee: z.string().optional(),
    endPoints: z.record(z.string(), z.string()).optional()
});

type ProviderConfigFormData = z.infer<typeof providerConfigSchema>;

interface ProviderConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    providerId: string;
}

const ProviderConfigModal: React.FC<ProviderConfigModalProps> = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProviderConfigFormData>({
      resolver: zodResolver(providerConfigSchema),
        defaultValues: {
            productId: '',
            providerId: '',
            providerProductCode: '',
            priority: 1,
            isDefault: false,
            feeType: 'flat',
            feeValue: '',
            minFee: '',
            maxFee: '',
            endPoints: {},
        }
    });

    const onClose = () => {
        navigate('/app/systems/providers');
    };
    
    const isOpen = location.pathname.includes('/app/systems/providers/configure');
    
    // Reset form when modal opens
    React.useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const productId = searchParams.get('productId') || '';
        const providerId = searchParams.get('providerId') || '';
    
        reset({
          productId,
          providerId,
          providerProductCode: '',
          priority: 1,
          isDefault: false,
          feeType: 'flat',
          feeValue: '',
          minFee: '',
          maxFee: '',
          endPoints: {},
        });
    }, [isOpen, location.search, reset]);

    const configureProvider = useConfigureProvider();

    const onSubmit = async (data: ProviderConfigFormData) => {
        try {
            const response = await configureProvider.mutateAsync({
                productId: data.productId,
                providerId: data.providerId,
                config: {
                    ...data,
                    endPoints: data.endPoints || {}
                }
            });

            toast(response.message, { icon: response.status ? 'success' : 'error' });
            onClose();
        } catch (error) {
            console.error('Error configuring provider:', error);
            toast((error as Error).message, { icon: 'error' });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} position="center" className="flex flex-col !m-0">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold">Configure Provider</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col min-h-0">
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-6 py-4 space-y-6">
                        <Input
                            label="Provider Product Code"
                            placeholder="Enter provider product code"
                            error={errors.providerProductCode?.message}
                            {...register('providerProductCode')}
                        />

                        <Input
                            type="number"
                            label="Priority"
                            placeholder="Enter priority"
                            error={errors.priority?.message}
                            {...register('priority', { valueAsNumber: true })}
                        />

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-primary"
                                {...register('isDefault')}
                            />
                            <label className="ml-2 mb-0 block text-sm text-gray-900 dark:text-gray-300">
                                Is Default
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Fee Type
                            </label>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-800 dark:text-white"
                                {...register('feeType')}
                            >
                                <option value="flat">Flat</option>
                                <option value="percentage">Percentage</option>
                            </select>
                        </div>

                        <Input
                            label="Fee Value"
                            placeholder="Enter fee value"
                            error={errors.feeValue?.message}
                            {...register('feeValue')}
                        />

                        <Input
                            label="Minimum Fee"
                            placeholder="Enter minimum fee (optional)"
                            error={errors.minFee?.message}
                            {...register('minFee')}
                        />

                        <Input
                            label="Maximum Fee"
                            placeholder="Enter maximum fee (optional)"
                            error={errors.maxFee?.message}
                            {...register('maxFee')}
                        />

                        <Input
                            label="EndPoints"
                            placeholder="Enter endPoints (optional)"
                            {...register('endPoints')}
                        />
                    </div>
                </div>

                {/* Fixed Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                    <div className="flex justify-center gap-3">
                        <Button
                            type="button"
                            variant="outline-secondary"
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
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default ProviderConfigModal;