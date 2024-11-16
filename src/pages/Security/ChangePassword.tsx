// src/pages/AccessControl/AssignRoleModal.tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/SweetAlert';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateCategory } from '@/hooks/useCategories';
// import * as z from 'zod';

const changePasswordSchema = z.object({
    currentPassword: z.string().min(8, 'Current password must be at least 8 characters'),
    newPassword: z
        .string()
        .min(8, 'New password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    confirmPassword: z.string().min(8, 'New password must be at least 8 characters'),
    }).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password must match',
    path: ['confirmPassword'],
});

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    const createCategory = useCreateCategory();

    // Helper function to change Password FormData
    const onSubmit = async (data: ChangePasswordFormData) => {
        try {
            // const response = await createCategory.mutateAsync(data);
            // toast(response.message, { icon: response.status ? 'success' : 'error' });
            onClose();
        } catch (error) {
            console.error('Error changing password:', error);
            toast((error as Error).message, { icon: 'error' });
        }
    };

    const onClose = () => {
        navigate('/app/settings/security');
    };

    const isOpen = location.pathname.includes('/change-password');

    return (
        <Modal isOpen={isOpen} onClose={onClose} position="center" className="flex flex-col !m-0">
            {/* Fixed Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
                <h2 className="text-xl font-semibold">Change Password</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col min-h-0">
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-6 py-4 space-y-4">
                        <Input
                            label="Current Password"
                            placeholder="Enter Current Password"
                            error={errors.currentPassword?.message}
                            {...register('currentPassword')}
                            endIcon={
                                <EyeIcon className="w-5 h-5" />
                            }
                        />
                        <Input
                            label="New Password"
                            placeholder="Enter New Password"
                            error={errors.newPassword?.message}
                            {...register('newPassword')}
                        />
                        <Input
                            label="Confirm Password"
                            placeholder="Enter Confirm Password"
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword')}
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
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default ChangePassword;