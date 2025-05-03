import React from 'react';
import { cn } from '@/lib/utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    wide?: number;
  };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Grid = ({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
  gap = 'md',
  className,
  ...props
}: GridProps) => {
  const gapClasses = {
    xs: 'gap-xs',
    sm: 'gap-sm',
    md: 'gap-md',
    lg: 'gap-lg',
    xl: 'gap-xl',
  };

  const getColumnsClass = () => {
    const mobileClass = columns.mobile ? `grid-cols-${columns.mobile}` : 'grid-cols-1';
    const tabletClass = columns.tablet ? `sm:grid-cols-${columns.tablet}` : '';
    const desktopClass = columns.desktop ? `md:grid-cols-${columns.desktop}` : '';
    const wideClass = columns.wide ? `lg:grid-cols-${columns.wide}` : '';

    return `${mobileClass} ${tabletClass} ${desktopClass} ${wideClass}`;
  };

  return (
    <div
      className={cn(
        'grid',
        getColumnsClass(),
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  colSpan?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    wide?: number;
  };
}

export const GridItem = ({
  children,
  colSpan,
  className,
  ...props
}: GridItemProps) => {
  const getColSpanClass = () => {
    if (!colSpan) return '';
    
    const mobileClass = colSpan.mobile ? `col-span-${colSpan.mobile}` : '';
    const tabletClass = colSpan.tablet ? `sm:col-span-${colSpan.tablet}` : '';
    const desktopClass = colSpan.desktop ? `md:col-span-${colSpan.desktop}` : '';
    const wideClass = colSpan.wide ? `lg:col-span-${colSpan.wide}` : '';

    return `${mobileClass} ${tabletClass} ${desktopClass} ${wideClass}`;
  };

  return (
    <div
      className={cn(
        getColSpanClass(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Object.assign(Grid, {
  Item: GridItem,
});