// src/components/ui/Input/index.tsx
import { cn } from '@/utilities/helpers';
import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva('w-full rounded-md border bg-white px-4 py-2 text-sm font-semibold !outline-none transition duration-300', {
    variants: {
        variant: {
            default: 'border-white-light focus:border-primary dark:border-[#17263c] dark:bg-[#121e32] dark:text-white-dark dark:focus:border-primary',
            danger: 'border-danger text-danger bg-danger/[0.08] placeholder-danger/70 focus:border-danger',
            success: 'border-success text-success bg-success/[0.08] placeholder-success/70 focus:border-success',
        },
        inputSize: {
            // renamed from 'size' to 'inputSize'
            default: 'py-2',
            sm: 'py-1.5 text-xs',
            lg: 'py-2.5 text-base',
        },
    },
    defaultVariants: {
        variant: 'default',
        inputSize: 'default',
    },
});

// Omit the native 'size' attribute to avoid conflict
type InputBaseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface InputProps extends InputBaseProps, VariantProps<typeof inputVariants> {
    label?: string;
    error?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, label, error, variant, inputSize, startIcon, endIcon, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
            <div className="relative">
                {startIcon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white-dark">{startIcon}</div>}
                <input type={type} className={cn(inputVariants({ variant, inputSize }), startIcon && 'pl-12', endIcon && 'pr-12', className)} ref={ref} {...props} />
                {endIcon && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white-dark">{endIcon}</div>}
            </div>
            {error && <p className="mt-1 text-xs text-danger">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export { Input, inputVariants };
