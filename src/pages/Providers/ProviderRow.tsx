// src/pages/providers/ProviderRow.tsx
import React from 'react';
import { 
  NoSymbolIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Tippy from '@tippyjs/react';
import { cn } from '@/utilities/helpers';
import { 
  useDeleteProvider, 
  useToggleProviderStatus, 
} from '@/hooks/useProviders';
import { useNavigate } from 'react-router-dom';
import type { Provider } from '@/types/ProviderTypes';
import { showConfirmationAlert, toast } from '@/components/ui/SweetAlert';
import { PencilSquareIcon, WrenchScrewdriverIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface ProviderRowProps {
  provider: Provider;
  onEdit: () => void;
}

const ProviderRow: React.FC<ProviderRowProps> = ({ provider, onEdit }) => {
  const toggleStatus = useToggleProviderStatus();
  const deleteProvider = useDeleteProvider();
  const navigate = useNavigate();

  const handleToggleStatus = async () => {
    showConfirmationAlert({
      title: 'Are you sure?',
      text: `Are you sure you want to ${provider.isEnabled ? 'disable' : 'enable'} this provider?`,
      icon: 'warning',
      confirmButtonText: `Yes, ${provider.isEnabled ? 'disable' : 'enable'} it!`,
      cancelButtonText: 'Cancel',
      onConfirm: async () => {
        try {
          const response = await toggleStatus.mutateAsync(provider.id);
          toast(response.message, { icon: response.status ? 'success' : 'error' });
        } catch (error) {
          console.error('Error toggling status:', error);
          toast((error as Error).message, { icon: 'error' });
        }
      }
    })
  };

  const handleConfigureProvider = () => {
    console.log(provider)
    navigate(`/app/systems/providers/configure?productId=${provider.id}&providerId=${provider.id}`);
  };

  const handleDelete = async () => {
    showConfirmationAlert({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this provider?',
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      onConfirm: async () => {
        try {
          await deleteProvider.mutateAsync(provider.id);
          toast('Provider deleted successfully!', { icon: 'success' });
        } catch (error) {
          console.error('Error deleting provider:', error);
          toast('Something went wrong! Could not delete the provider.', { icon: 'error' });
        }
      },
    });
  };

  return (
    <tr>
      <td>  
        <div className="flex items-center space-x-3 min-w-[200px]">
          {provider.logo ? (
            <div className="flex-shrink-0 h-10 w-10">
              <img
                src={provider.logo}
                alt={provider.name}
                className="h-10 w-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.png';
                }}
              />
            </div>
          ) : (
            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                {provider.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {provider.name}
            </div>
            {provider.description && (
              <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                {provider.description}
              </div>
            )}
          </div>
        </div>
      </td>
      <td>{provider.code}</td>
      <td>
        {provider.baseUrl}
      </td>
      <td>
        <div className="flex items-center">
          <div className={cn(
            "h-2.5 w-2.5 rounded-full mr-2",
            provider.isLive ? "bg-green-500" : "bg-gray-400"
          )} />
          <span className={cn(
            "text-sm font-medium",
            provider.isLive ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
          )}>
            {provider.isLive ? 'Live' : 'Test'}
          </span>
        </div>
      </td>
      <td className="text-center">
        <ul className="flex items-center justify-center gap-2">
          <li>
            <Tippy content="Edit">
              <button type="button" onClick={onEdit}>
                <PencilSquareIcon className="w-5 h-5 text-primary" />
              </button>
            </Tippy>
          </li>
          <li>
            <Tippy content="Edit">
              <button type="button" onClick={handleConfigureProvider}>
                <WrenchScrewdriverIcon className="w-5 h-5 text-primary" />
              </button>
            </Tippy>
          </li>
          <li>
            <Tippy content={provider.isEnabled ? "Disable" : "Enable"}>
              <button type="button" onClick={handleToggleStatus}>
                {provider.isEnabled ? <NoSymbolIcon className="w-5 h-5 text-primary" /> : <CheckCircleIcon className="w-5 h-5 text-primary" />}
              </button>
            </Tippy>
          </li>
          <li>
            <Tippy content="Delete">
              <button type="button" onClick={handleDelete}>
                <XCircleIcon className="w-5 h-5 text-danger" />
              </button>
            </Tippy>
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default ProviderRow;