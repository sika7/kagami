import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  isFullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      isFullWidth = false,
      leadingIcon,
      trailingIcon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className={cn('flex flex-col', isFullWidth ? 'w-full' : '', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 text-sm font-medium text-dark-blue"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leadingIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-dark-blue/70">
              {leadingIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'bg-light-grey text-dark-blue p-3 rounded-md border border-[#E2E8F0] focus:border-sky-blue focus:ring-1 focus:ring-sky-blue focus:outline-none w-full',
              error ? 'border-soft-coral' : '',
              leadingIcon ? 'pl-10' : '',
              trailingIcon ? 'pr-10' : ''
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />
          
          {trailingIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-dark-blue/70">
              {trailingIcon}
            </div>
          )}
        </div>
        
        {error ? (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-soft-coral"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            className="mt-1 text-xs text-dark-blue/70"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;