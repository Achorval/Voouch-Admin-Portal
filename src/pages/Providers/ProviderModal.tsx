// src/pages/home/providers/ProviderModal.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/SweetAlert';
import FileUpload from '@/components/ui/FileUpload';
import { useProvider, useCreateProvider, useUpdateProvider } from '@/hooks/useProviders';
import { z } from 'zod';

// Validation schema
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const providerFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  code: z.string()
    .min(2, 'Code must be at least 2 characters')
    .max(50, 'Code cannot exceed 100 characters')
    .regex(/^[A-Z0-9_]+$/, 'Code must contain only uppercase letters, numbers and underscores'),
  description: z.string().max(255).optional().or(z.literal('')),
  baseUrl: z.string().url('Invalid URL'),
  testBaseUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  apiKey: z.string().optional().or(z.literal('')),
  secretKey: z.string().optional().or(z.literal('')),
  webhookSecret: z.string().optional().or(z.literal('')),
  isLive: z.boolean(),
  logo: z.any()
    .refine((file) => {
      if (!file) return true;
      return file instanceof File;
    }, 'Logo must be a file')
    .refine((file) => {
      if (!file) return true;
      return file.size <= MAX_FILE_SIZE;
    }, 'Max file size is 2MB')
    .refine((file) => {
      if (!file) return true;
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, 'Only .jpg, .jpeg, .png and .webp formats are supported')
    .optional()
    .nullable(),
});

type ProviderFormData = z.infer<typeof providerFormSchema>;

interface ProviderModalProps {
  providerId?: string | null;
}

const ProviderModal = ({ providerId }: ProviderModalProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<ProviderFormData>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      baseUrl: '',
      testBaseUrl: '',
      apiKey: '',
      secretKey: '',
      webhookSecret: '',
      isLive: false,
      logo: null,
    },
  });

  const { data: provider, isLoading: isLoadingProvider } = useProvider(providerId || null, {
    enabled: !!providerId,
  });
  const createProvider = useCreateProvider();
  const updateProvider = useUpdateProvider(providerId!);

  // Helper function to create FormData
  const onSubmit = async (data: ProviderFormData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('code', data.code);
      formData.append('baseUrl', data.baseUrl);
      formData.append('isLive', data.isLive ? '1' : '0');

      if (data.description) {
        formData.append('description', data.description);
      }

      if (data.testBaseUrl) {
        formData.append('testBaseUrl', data.testBaseUrl);
      }

      if (data.apiKey) {
        formData.append('apiKey', data.apiKey);
      }

      if (data.secretKey) {
        formData.append('secretKey', data.secretKey);
      }

      if (data.webhookSecret) {
        formData.append('webhookSecret', data.webhookSecret);
      }

      if (data.logo) {
        formData.append('logo', data.logo);
      }

      let response;
      if (providerId) {
        response = await updateProvider.mutateAsync(formData);
      } else {
        response = await createProvider.mutateAsync(formData);
      }

      toast(response.message, { icon: response.status ? 'success' : 'error' });
      onClose();
    } catch (error) {
      console.error('Error saving provider:', error);
      toast((error as Error).message, { icon: 'error' });
    }
  };

  // Reset form when provider data is loaded
  React.useEffect(() => {
    if (provider?.data) {
      reset({
        name: provider.data.name,
        code: provider.data.code,
        description: provider.data.description || '',
        baseUrl: provider.data.baseUrl,
        testBaseUrl: provider.data.testBaseUrl || '',
        apiKey: provider.data.apiKey || '',
        secretKey: provider.data.secretKey || '',
        webhookSecret: provider.data.webhookSecret || '',
        isLive: provider.data.isLive,
        logo: null,
      });
    } 
    // else {
    //   reset({
    //     name: '',
    //     code: '',
    //     description: '',
    //     baseUrl: '',
    //     testBaseUrl: '',
    //     apiKey: '',
    //     secretKey: '',
    //     webhookSecret: '',
    //     isLive: false,
    //     logo: null,
    //   });
    // }
  }, [provider, reset]);

  const onClose = () => {
    navigate('/app/systems/providers');
  };

  const isOpen = location.pathname.includes('/new') || location.pathname.includes('/edit');

  if (isLoadingProvider) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} position="right" className="flex flex-col h-full !m-0">
      {/* Fixed Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
        <h2 className="text-xl font-semibold">{providerId ? 'Edit Provider' : 'Add Provider'}</h2>
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
              placeholder="Enter provider name"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Code"
              placeholder="Enter provider code"
              error={errors.code?.message}
              disabled={!!providerId}
              {...register('code')}
            />

            <Input
              label="Description"
              placeholder="Enter provider description"
              error={errors.description?.message}
              {...register('description')}
            />

            <Input
              label="Base URL"
              placeholder="Enter base URL"
              error={errors.baseUrl?.message}
              {...register('baseUrl')}
            />

            <Input
              label="Test Base URL"
              placeholder="Enter test base URL"
              error={errors.testBaseUrl?.message}
              {...register('testBaseUrl')}
            />

            <Input
              label="API Key"
              placeholder="Enter API key"
              error={errors.apiKey?.message}
              {...register('apiKey')}
            />

            <Input
              label="Secret Key"
              placeholder="Enter secret key"
              error={errors.secretKey?.message}
              {...register('secretKey')}
            />

            <Input
              label="Webhook Secret"
              placeholder="Enter webhook secret"
              error={errors.webhookSecret?.message}
              {...register('webhookSecret')}
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary"
                {...register('isLive')}
              />
              <label className="ml-2 mb-0 block text-sm text-gray-900 dark:text-gray-300">
                Live Mode
              </label>
            </div>

            <FileUpload
              control={control}
              name="logo"
              label="Logo"
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
              {providerId ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ProviderModal;