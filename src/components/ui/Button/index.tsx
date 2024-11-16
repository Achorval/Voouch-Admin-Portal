// src/components/ui/Button/index.tsx
import React, { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utilities/helpers';

// Explicitly define button variants
export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-dark';

// Explicitly define button sizes
export type ButtonSize = 'default' | 'sm' | 'lg';

// Define the button variants configuration
const buttonVariants = cva(
  'relative flex items-center justify-center rounded-md border font-semibold shadow-[0_10px_20px_-10px] outline-none transition duration-300 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'border-primary bg-primary text-white shadow-primary/60',
        secondary: 'border-secondary bg-secondary text-white shadow-secondary/60',
        success: 'border-success bg-success text-white shadow-success/60',
        danger: 'border-danger bg-danger text-white shadow-danger/60',
        warning: 'border-warning bg-warning text-white shadow-warning/60',
        info: 'border-info bg-info text-white shadow-info/60',
        dark: 'border-dark bg-dark text-white shadow-dark/60',
        'outline-primary': 'border-primary text-primary shadow-none hover:bg-primary hover:text-white',
        'outline-secondary': 'border-secondary text-secondary shadow-none hover:bg-secondary hover:text-white',
        'outline-success': 'border-success text-success shadow-none hover:bg-success hover:text-white',
        'outline-danger': 'border-danger text-danger shadow-none hover:bg-danger hover:text-white',
        'outline-warning': 'border-warning text-warning shadow-none hover:bg-warning hover:text-white',
        'outline-info': 'border-info text-info shadow-none hover:bg-info hover:text-white',
        'outline-dark': 'border-dark text-dark shadow-none hover:bg-dark hover:text-white',
      } as const,
      size: {
        default: 'px-5 py-2 text-sm',
        sm: 'px-2.5 py-1.5 text-xs',
        lg: 'px-7 py-2.5 text-base',
      } as const,
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

// Define button props interface
export interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  variant = 'primary',
  size = 'default',
  loading = false,
  startIcon,
  endIcon,
  disabled,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {startIcon && <span className="mr-2">{startIcon}</span>}
          {children}
          {endIcon && <span className="ml-2">{endIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

// Export the button variants type and configuration
export type { VariantProps };
export { buttonVariants };