// src/pages/users/UserModal.tsx
import { 
  useUser, 
  useUpdateUser, 
  useCreateUser, 
} from '@/hooks/useUsers';
import type { 
  CreateUserDTO, 
  UpdateUserDTO 
} from '@/types/UserTypes';
import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/SweetAlert';
import { roleOptions, tierOptions } from './UserList';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '@/components/ui/Select/Select';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Validation schema
const userFormSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email cannot exceed 255 characters'),
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(255, 'First name cannot exceed 255 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(255, 'Last name cannot exceed 255 characters'),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(20, 'Phone number cannot exceed 20 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .optional()
    .or(z.literal('')),
  role: z.enum(['user', 'admin', 'super_admin']).optional(),
  tierLevel: z.enum(['basic', 'silver', 'gold']).optional()
});

type UserFormData = z.infer<typeof userFormSchema>;

interface UserModalProps {
  userId?: string | null;
}

const UserModal: React.FC<UserModalProps> = ({ userId }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      role: 'user',
      tierLevel: 'basic'
    }
  });

  const { data: user, isLoading: isLoadingUser } = useUser(userId || null, {
    enabled: !!userId
  });
  const createUser = useCreateUser();
  const updateUser = useUpdateUser(userId!);

  // Reset form when user data is loaded
  React.useEffect(() => {
    if (user?.data) {
      reset({
        username: user.data.username,
        email: user.data.email,
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        phoneNumber: user.data.phoneNumber,
        role: user.data.role,
        tierLevel: user.data.tierLevel,
        password: ''
      });
    } else {
      reset({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        role: 'user',
        tierLevel: 'basic',
        password: ''
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserFormData) => {
    try {
      let response;
      if (userId) {
        const updateData: UpdateUserDTO = {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          role: data.role,
          tierLevel: data.tierLevel
        };
        response = await updateUser.mutateAsync(updateData);
      } else {
        const createData: CreateUserDTO = {
          ...data,
          password: data.password!,
          role: data.role || 'user',
          tierLevel: data.tierLevel || 'basic'
        };
        response = await createUser.mutateAsync(createData);
      }
      toast(response.message, { icon: response.status ? 'success' : 'error' });
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
      toast((error as Error).message, { icon: 'error' });
    }
  };

  const onClose = () => {
    navigate('/app/users/user-list');
  };

  const isOpen = location.pathname.includes('/new') || location.pathname.includes('/edit');

  if (isLoadingUser) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} position="right" className="flex flex-col h-full !m-0">
      {/* Fixed Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
        <h2 className="text-xl font-semibold">
          {userId ? 'Edit User' : 'Add User'}
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col min-h-0">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4 space-y-6">
            <Input
              label="Username"
              placeholder="Enter username"
              error={errors.username?.message}
              disabled={!!userId}
              {...register('username')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter email address"
              error={errors.email?.message}
              disabled={!!userId}
              {...register('email')}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="Enter first name"
                error={errors.firstName?.message}
                {...register('firstName')}
              />

              <Input
                label="Last Name"
                placeholder="Enter last name"
                error={errors.lastName?.message}
                {...register('lastName')}
              />
            </div>

            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              error={errors.phoneNumber?.message}
              {...register('phoneNumber')}
            />

            {!userId && (
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                error={errors.password?.message}
                {...register('password')}
              />
            )}

            <Select
              label="Role"
              options={roleOptions}
              error={errors.role?.message}
              {...register('role')}
            />

            <Select
              label="Tier Level"
              options={tierOptions}
              error={errors.tierLevel?.message}
              {...register('tierLevel')}
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
              {userId ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;