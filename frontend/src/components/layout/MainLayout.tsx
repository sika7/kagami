'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow py-8">
          <div className="container mx-auto px-4">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default MainLayout;