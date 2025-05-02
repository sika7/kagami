import React, { forwardRef } from "react";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ 
    label, 
    error, 
    fullWidth = true, 
    helperText,
    className = "", 
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
        {label && (
          <label 
            htmlFor={inputId} 
            className="block mb-2 text-sm font-medium text-dark-blue"
          >
            {label}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 bg-light-grey text-dark-blue 
            rounded-md border border-solid border-gray-200
            focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-sky-blue
            ${error ? "border-soft-coral ring-1 ring-soft-coral" : ""}
          `}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-sm text-soft-coral">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;