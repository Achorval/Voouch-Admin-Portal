// src/components/ui/ActionButton.tsx
import { cn } from '@/utilities/helpers';

interface ActionButtonProps {
    icon: typeof import('@heroicons/react/24/outline').PencilIcon;
    onClick: () => void;
    label: string;
    variant?: 'default' | 'danger' | 'success' | 'warning' | 'info';
}

const ActionButton = ({ icon: Icon, onClick, label, variant = 'default' }: ActionButtonProps) => (
    <button
        onClick={onClick}
        className={cn(
            "inline-flex items-center justify-center p-2 rounded-lg transition-colors",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "focus:outline-none focus:ring-2 focus:ring-offset-2",
            {
                'text-gray-600 dark:text-gray-400 focus:ring-gray-500': variant === 'default',
                'text-red-600 dark:text-red-400 hover:text-red-700 focus:ring-red-500': variant === 'danger',
                'text-green-600 dark:text-green-400 hover:text-green-700 focus:ring-green-500': variant === 'success'
            }
        )}
        title={label}
    >
        <Icon className="w-5 h-5" />
    </button>
);

export default ActionButton;