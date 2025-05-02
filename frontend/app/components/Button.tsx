import React from "react";
import { Link } from "@remix-run/react";
import type { LinkProps } from "@remix-run/react";

type ButtonVariant = "primary" | "secondary" | "text" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
}

interface ButtonAsButtonProps extends BaseButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
  to?: never;
}

interface ButtonAsLinkProps extends BaseButtonProps, Omit<LinkProps, "className"> {
  as: "link";
  to: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "", 
  disabled = false,
  as = "button",
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-medium focus:outline-none transition-all";
  
  const variantClasses = {
    primary: "bg-sky-blue text-white hover:bg-sky-blue/90 active:bg-sky-blue/95 focus:ring-2 focus:ring-sky-blue/50",
    secondary: "bg-white text-sky-blue border border-sky-blue hover:bg-sky-blue/5 active:bg-sky-blue/10 focus:ring-2 focus:ring-sky-blue/50",
    text: "bg-transparent text-sky-blue hover:underline focus:ring-2 focus:ring-sky-blue/50",
    danger: "bg-soft-coral text-white hover:bg-soft-coral/90 active:bg-soft-coral/95 focus:ring-2 focus:ring-soft-coral/50"
  };
  
  const sizeClasses = {
    sm: "text-sm px-4 py-2 rounded-md",
    md: "text-body px-6 py-3 rounded-md",
    lg: "text-lg px-8 py-4 rounded-md"
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
  
  if (as === "link") {
    const { to, ...linkProps } = props as ButtonAsLinkProps;
    return (
      <Link to={to} className={buttonClasses} {...linkProps}>
        {children}
      </Link>
    );
  }
  
  const { to, ...buttonProps } = props as ButtonAsButtonProps;
  return (
    <button className={buttonClasses} disabled={disabled} {...buttonProps}>
      {children}
    </button>
  );
}