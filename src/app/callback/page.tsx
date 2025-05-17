'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/contexts/AuthStore'; 
import { useRouter } from 'next/navigation';
import { IoShieldCheckmark, IoAlertCircle, IoTime } from "react-icons/io5";
import Link from 'next/link';
import { Footer } from '@/components/layout';

type AuthStatus = 'loading' | 'success' | 'error';

export default function OAuthCallbackPage() {
  const { isAuthenticated, checkSession } = useAuthStore();
  const router = useRouter();
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [counter, setCounter] = useState(3); // Reduzi para 3 segundos
  const [error, setError] = useState<string | null>(null);

  // Efeito único para verificação
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // 1. Força verificação da sessão/cookie
        await checkSession();
        
        // 2. Verifica o estado atualizado
        if (isAuthenticated) {
          setStatus('success');
        } else {
          throw new Error('Authentication not confirmed');
        }
      } catch (err) {
        console.error("OAuth verification error:", err);
        setStatus('error');
        setError('Failed to verify authentication. Please try again.');
      }
    };

    verifyAuth();
  }, [isAuthenticated, checkSession]);

  // Redirecionamentos
  useEffect(() => {
    if (status !== 'success') return;

    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    const interval = setInterval(() => {
      setCounter(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [status, router]);

  useEffect(() => {
    if (status === 'error') {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  // Renderização condicional
  if (status === 'loading') {
    return (
      <div className='flex h-screen w-full justify-center items-center flex-col gap-8'>
        <IoTime className='text-9xl text-blue-500 animate-pulse' />
        <p className='text-lg'>Verifying your session...</p>
        <Footer />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className='flex h-screen w-full justify-center items-center flex-col gap-8'>
        <IoAlertCircle className='text-9xl text-red-500' />
        <h2 className='text-4xl font-bold'>Authentication Failed</h2>
        <p className='text-lg'>{error}</p>
        <Link href="/login" className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg'>
          Return to Login
        </Link>
        <Footer />
      </div>
    );
  }

  return (
    <div className='flex h-screen w-full justify-center items-center flex-col gap-8'>
      <IoShieldCheckmark className='text-9xl text-green-500' />
      <h2 className='text-4xl font-bold'>Welcome Back!</h2>
      <p className='text-lg'>Redirecting in {counter} seconds...</p>
      <Link href="/" className='mt-4 px-6 py-2 bg-green-500 text-white rounded-lg'>
        Go Now
      </Link>
      <Footer />
    </div>
  );
}