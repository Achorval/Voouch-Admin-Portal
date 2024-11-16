// src/pages/generals/GeneralRow.tsx
import { 
    XCircleIcon, 
    NoSymbolIcon,
    CheckCircleIcon,
    PencilSquareIcon
} from '@heroicons/react/24/solid';
import { 
    toast, 
    showConfirmationAlert, 
} from '@/components/ui/SweetAlert';
import { 
    useDeleteCategory, 
    useToggleCategoryStatus 
} from '@/hooks/useCategories';
import Swal from 'sweetalert2';
import Tippy from '@tippyjs/react';
import { cn } from '@/utilities/helpers';
import type { Category } from '@/types/CategoryTypes';

interface GeneralRowProps {
    category: Category;
    onEdit: () => void;
};

const GeneralRow: React.FC<GeneralRowProps> = ({ category, onEdit }) => {    
    const toggleStatus = useToggleCategoryStatus();
    const deleteCategory = useDeleteCategory();

    const handleToggleStatus = async () => {
        showConfirmationAlert({
            title: 'Are you sure?',
            text: `Are you sure you want to ${category.isEnabled ? 'disable' : 'enable'} this category?`,
            icon: 'warning',
            confirmButtonText: `Yes, ${category.isEnabled ? 'disable' : 'enable'} it!`,
            cancelButtonText: 'Cancel',
            onConfirm: async () => {
                try {
                    const response = await toggleStatus.mutateAsync(category.id);
                    toast(response.message, { icon: response.status ? 'success' : 'error' });
                } catch (error) {
                    console.error('Error toggling status:', error);
                    toast((error as Error).message, { icon: 'error' });
                }
            }
        });
    };

    const handleDelete = async () => {
        showConfirmationAlert({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this category?',
            icon: 'warning',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            onConfirm: async () => {
                try {
                    await deleteCategory.mutateAsync(category.id);
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'The category has been deleted.',
                        confirmButtonColor: '#3085d6',
                    });
                } catch (error) {
                    console.error('Error deleting category:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong! Could not delete the category.',
                    });
                }
            },
        });
    };
    return (
        <tr>
            <td>
                <div className="whitespace-nowrap">
                    <div className="flex items-center space-x-3 min-w-[200px]">
                        {category.icon ? (
                            <div className="flex-shrink-0 h-10 w-10">
                                <img
                                    src={category.icon}
                                    alt={category.name}
                                    className="h-10 w-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/placeholder.png';
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <span className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                                    {category.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                                {category.name}
                            </div>
                            {category.description && (
                                <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                                    {category.description}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </td>
            <td>{category.code}</td>
            <td>
                <div className="flex items-center">
                    <div className={cn(
                        "h-2.5 w-2.5 rounded-full mr-2",
                        category.isEnabled ? "bg-green-500" : "bg-gray-400"
                    )} />
                    <span className={cn(
                        "text-sm font-medium",
                        category.isEnabled ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                    )}>
                        {category.isEnabled ? 'Active' : 'Inactive'}
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

export default GeneralRow;