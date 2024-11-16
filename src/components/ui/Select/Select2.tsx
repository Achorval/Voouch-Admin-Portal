// src/components/forms/Select.tsx
import { cn } from '../../../utilities/helpers';
import React, { forwardRef, SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string | number; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="mb-1.5 block font-semibold">
                        {label}
                    </label>
                )}
                <select
                    className={cn(
                        'form-select w-full rounded-md border border-white-light bg-white px-4 py-2 text-sm font-semibold !outline-none focus:border-primary dark:border-[#17263c] dark:bg-[#121e32] dark:text-white-dark dark:focus:border-primary',
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && (
                    <p className="mt-1 text-xs text-danger">{error}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export { Select };