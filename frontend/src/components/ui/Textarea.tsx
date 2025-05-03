import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  isFullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      isFullWidth = false,
      className,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;
    
    return (
      <div className={cn('flex flex-col', isFullWidth ? 'w-full' : '', className)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1 text-sm font-medium text-dark-blue"
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'bg-light-grey text-dark-blue p-3 rounded-md border border-[#E2E8F0] focus:border-sky-blue focus:ring-1 focus:ring-sky-blue focus:outline-none w-full resize-y',
            error ? 'border-soft-coral' : ''
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          {...props}
        />
        
        {error ? (
          <p
            id={`${textareaId}-error`}
            className="mt-1 text-sm text-soft-coral"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${textareaId}-helper`}
            className="mt-1 text-xs text-dark-blue/70"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;