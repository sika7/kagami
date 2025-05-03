import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isHoverable?: boolean;
}

export const Card = ({
  children,
  isHoverable = true,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-md p-4 shadow-light',
        isHoverable && 'transition-all duration-normal hover:translate-y-[-2px] hover:shadow-medium',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader = ({ children, className, ...props }: CardHeaderProps) => {
  return (
    <div
      className={cn('pb-3 mb-3 border-b border-light-grey', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const CardTitle = ({ children, className, ...props }: CardTitleProps) => {
  return (
    <h3
      className={cn('text-h3 font-semibold text-dark-blue', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent = ({ children, className, ...props }: CardContentProps) => {
  return (
    <div className={cn('text-dark-blue', className)} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = ({ children, className, ...props }: CardFooterProps) => {
  return (
    <div
      className={cn('pt-3 mt-3 border-t border-light-grey', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Content: CardContent,
  Footer: CardFooter,
});