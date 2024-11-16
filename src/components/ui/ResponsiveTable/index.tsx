// src/components/ui/ResponsiveTable/index.tsx
import React from 'react';
import { cn } from '@/utilities/helpers';

interface ResponsiveTableProps {
    children: React.ReactNode;
    className?: string;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ children, className }) => {
    return (
        <div className={cn(
            "relative rounded-lg border border-gray-200 dark:border-gray-700",
            "bg-white dark:bg-black shadow-sm",
            className
        )}>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        {children}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveTable;