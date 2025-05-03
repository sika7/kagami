import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = ({
  children,
  maxWidth = 'lg',
  className,
  ...props
}: ContainerProps) => {
  const maxWidthClasses = {
    sm: 'max-w-screen-mobile',
    md: 'max-w-screen-tablet',
    lg: 'max-w-screen-desktop',
    xl: 'max-w-screen-wide',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 md:px-8',
        maxWidthClasses[maxWidth],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;