import React from 'react';

interface ResponsiveProps {
  children: React.ReactNode;
  hideOn?: ('mobile' | 'tablet' | 'desktop' | 'wide')[];
  showOn?: ('mobile' | 'tablet' | 'desktop' | 'wide')[];
}

// 特定のブレイクポイントで表示/非表示を制御するコンポーネント
export const Responsive = ({
  children,
  hideOn = [],
  showOn = [],
}: ResponsiveProps) => {
  if (hideOn.length > 0 && showOn.length > 0) {
    console.warn('Both hideOn and showOn props are provided. hideOn will take precedence.');
  }
  
  let className = '';
  
  if (hideOn.length > 0) {
    const hideClasses = {
      mobile: 'sm:block hidden',
      tablet: 'hidden sm:block md:hidden',
      desktop: 'hidden md:block lg:hidden',
      wide: 'hidden lg:block',
    };
    
    hideOn.forEach((breakpoint) => {
      className += ` ${hideClasses[breakpoint]}`;
    });
  } else if (showOn.length > 0) {
    const showClasses = {
      mobile: 'block sm:hidden',
      tablet: 'hidden sm:block md:hidden',
      desktop: 'hidden md:block lg:hidden',
      wide: 'hidden lg:block',
    };
    
    className = 'hidden'; // デフォルトで非表示
    
    showOn.forEach((breakpoint) => {
      className += ` ${showClasses[breakpoint]}`;
    });
  }
  
  return <div className={className}>{children}</div>;
};

// モバイルのみ表示
export const MobileOnly = ({ children }: { children: React.ReactNode }) => (
  <div className="block sm:hidden">{children}</div>
);

// タブレット以上で表示
export const TabletUp = ({ children }: { children: React.ReactNode }) => (
  <div className="hidden sm:block">{children}</div>
);

// デスクトップ以上で表示
export const DesktopUp = ({ children }: { children: React.ReactNode }) => (
  <div className="hidden md:block">{children}</div>
);

// ワイド画面のみ表示
export const WideOnly = ({ children }: { children: React.ReactNode }) => (
  <div className="hidden lg:block">{children}</div>
);

export default Object.assign(Responsive, {
  MobileOnly,
  TabletUp,
  DesktopUp,
  WideOnly,
});