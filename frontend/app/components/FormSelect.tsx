import React, { forwardRef } from "react";

export interface FormSelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  options: FormSelectOption[];
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ 
    label, 
    error, 
    fullWidth = true, 
    helperText,
    className = "", 
    id,
    options,
    ...props 
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
        {label && (
          <label 
            htmlFor={selectId} 
            className="block mb-2 text-sm font-medium text-dark-blue"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`
              w-full px-4 py-3 bg-white text-dark-blue 
              rounded-md border border-solid border-gray-200 appearance-none
              focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-sky-blue
              ${error ? "border-soft-coral ring-1 ring-soft-coral" : ""}
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
        
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

FormSelect.displayName = "FormSelect";

export default FormSelect;