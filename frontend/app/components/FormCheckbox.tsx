import React, { forwardRef } from "react";

export interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ 
    label, 
    error, 
    helperText,
    className = "", 
    id,
    ...props 
  }, ref) => {
    const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className={`flex items-start ${className}`}>
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="w-4 h-4 text-sky-blue border-gray-300 rounded focus:ring-sky-blue"
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={inputId} className="font-medium text-dark-blue">
            {label}
          </label>
          
          {error && (
            <p className="mt-1 text-sm text-soft-coral">{error}</p>
          )}
          
          {helperText && !error && (
            <p className="text-gray-500">{helperText}</p>
          )}
        </div>
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";

export default FormCheckbox;