'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './AuthStore'; 

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { checkSession, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkSession();
      
      if (!isAuthenticated) {
        router.push('/login');
      }
    };

    verifyAuth();
  }, [checkSession, isAuthenticated, router]);

  return <>{children}</>;
};