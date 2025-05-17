'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/contexts/AuthStore'; 
import { useRouter } from 'next/navigation';
import { IoShieldCheckmark, IoAlertCircle, IoTime } from "react-icons/io5";
import Link from 'next/link';
import { Footer } from '@/components/layout';

type AuthStatus = 'loading' | 'success' | 'error';

export default function OAuthCallbackPage() {
  const { isAuthenticated, loading } = useAuthStore();
  const router = useRouter();
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [counter, setCounter] = useState(3);

  // Atualiza status baseado no loading e isAuthenticated do store
  useEffect(() => {
    if (loading) {
      setStatus('loading');
    } else {
      if (isAuthenticated) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    }
  }, [loading, isAuthenticated]);

  // Redirecionamentos após sucesso
  useEffect(() => {
    if (status !== 'success') return;

    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    const interval = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [status, router]);

  // Redirecionar após erro
  useEffect(() => {
    if (status !== 'error') return;

    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [status, router]);

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
        <h2 className='text-4xl font-bold'>Autenticação Falhou</h2>
        <p className='text-lg'>Falha ao verificar autenticação.</p>
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
      <h2 className='text-4xl font-bold'>Bem vindo outra vez!</h2>
      <p className='text-lg'>Redirecionando eem {counter} segundos...</p>
      <Link href="/" className='mt-4 px-6 py-2 bg-green-500 text-white rounded-lg'>
        Go Now
      </Link>
      <Footer />
    </div>
  );
}
