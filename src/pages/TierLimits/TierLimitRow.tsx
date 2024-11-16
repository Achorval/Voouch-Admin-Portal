// src/pages/tierLimits/TierLimitRow.tsx
import React from 'react';
import Tippy from '@tippyjs/react';
import { 
    toast, 
    showConfirmationAlert, 
} from '@/components/ui/SweetAlert';
import { 
    useToggleProduct, 
    useToggleProductMaintenance 
} from '@/hooks/useProducts';
import { 
    XCircleIcon,
    NoSymbolIcon,
    CheckCircleIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/utilities/helpers';
import type { Product } from '@/types/ProductTypes';

interface TierLimitRowProps {
    product: Product;
    onEdit: () => void;
}

const TierLimitRow: React.FC<TierLimitRowProps> = ({ product, onEdit }) => {
    const toggleStatus = useToggleProduct();
    const toggleMaintenance = useToggleProductMaintenance();

    const handleToggleStatus = async () => {
        const action = product.isEnabled ? 'disable' : 'enable';
        showConfirmationAlert({
            title: 'Are you sure?',
            text: `Are you sure you want to ${action} this product?`,
            icon: 'warning',
            confirmButtonText: `Yes, ${action} it!`,
            cancelButtonText: 'Cancel',
            onConfirm: async () => {
                try {
                    const response = await toggleStatus.mutateAsync(product.id);
                    toast(response.message, { icon: response.status ? 'success' : 'error' });
                } catch (error) {
                    console.error('Error toggling status:', error);
                    toast((error as Error).message, { icon: 'error' });
                }
            }
        });
    };

    const handleToggleMaintenance = async () => {
        const action = product.maintenanceMode ? 'disable' : 'enable';
        showConfirmationAlert({
            title: 'Are you sure?',
            text: `Are you sure you want to ${action} maintenance mode?`,
            icon: 'warning',
            confirmButtonText: `Yes, ${action} it!`,
            cancelButtonText: 'Cancel',
            onConfirm: async () => {
                try {
                    const response = await toggleMaintenance.mutateAsync({
                        id: product.id,
                        enabled: !product.maintenanceMode
                    });
                    toast(response.message, { icon: response.status ? 'success' : 'error' });
                } catch (error) {
                    console.error('Error toggling maintenance:', error);
                    toast((error as Error).message, { icon: 'error' });
                }
            }
        });
    };

    return (
        <tr>
            <td>
                <div className="whitespace-nowrap">
                    <div className="flex items-center space-x-3 min-w-[200px]">
                        {product.icon ? (
                            <div className="flex-shrink-0 h-10 w-10">
                                <img
                                    src={product.icon}
                                    alt={product.name}
                                    className="h-10 w-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/placeholder.png';
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <span className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                                    {product.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                                {product.name}
                            </div>
                            {product.description && (
                                <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                                    {product.description}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </td>
            <td>{product.code}</td>
            <td>
                <div className="flex items-center">
                    <div className={cn(
                        "h-2.5 w-2.5 rounded-full mr-2",
                        product.maintenanceMode 
                            ? "bg-warning"
                            : product.isEnabled 
                                ? "bg-success"
                                : "bg-gray-400"
                    )} />
                    <span className={cn(
                        "text-sm font-medium",
                        product.maintenanceMode 
                            ? "text-warning dark:text-warning"
                            : product.isEnabled 
                                ? "text-success dark:text-success"
                                : "text-gray-600 dark:text-gray-400"
                    )}>
                        {product.maintenanceMode 
                            ? 'Maintenance'
                            : product.isEnabled 
                                ? 'Active'
                                : 'Inactive'}
                    </span>
                </div>
            </td>
            <td className="text-center">
                <ul className="flex items-center justify-center gap-2">
                    <li>
                        <Tippy content="Edit">
                            <button type="button" onClick={onEdit}>
                                <CheckCircleIcon className="w-5 h-5 text-primary" />
                            </button>
                        </Tippy>
                    </li>
                    <li>
                        <Tippy content="Delete">
                            <button type="button" onClick={handleToggleMaintenance}>
                                <XCircleIcon className="w-5 h-5 text-danger" />
                            </button>
                        </Tippy>
                    </li>
                </ul>
            </td>
        </tr>
    );
};

export default TierLimitRow;