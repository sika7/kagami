import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'text' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  isLoading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-sky-blue text-white hover:bg-[#2980b9] hover:scale-[1.02] active:bg-[#2573a7] active:scale-[0.98]',
  secondary: 'bg-white text-sky-blue border border-sky-blue hover:bg-sky-blue/5 active:bg-sky-blue/10',
  text: 'text-sky-blue hover:underline bg-transparent',
  danger: 'bg-soft-coral text-white hover:bg-[#c0392b] hover:scale-[1.02] active:bg-[#a93226] active:scale-[0.98]',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isFullWidth = false,
      isLoading = false,
      leadingIcon,
      trailingIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'rounded-md font-medium transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-sky-blue/50',
          variantClasses[variant],
          sizeClasses[size],
          isFullWidth ? 'w-full' : '',
          (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : '',
          className
        )}
        {...props}
      >
        <span className="flex items-center justify-center">
          {isLoading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {leadingIcon && !isLoading && <span className="mr-2">{leadingIcon}</span>}
          {children}
          {trailingIcon && <span className="ml-2">{trailingIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;