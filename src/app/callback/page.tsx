'use client';

import { useEffect, useState } from 'react';
import { useAuth } from "@/resource";
import { useRouter } from 'next/navigation';
import { IoShieldCheckmark } from "react-icons/io5";
import Link from 'next/link';


export default function AuthCallbackPage() {
  const auth = useAuth();
  const router = useRouter();
  const [counter, setCounter] = useState(3)


  useEffect(() => {
    if (auth.checkSessionAfterRedirect()) {
      const interval = setInterval(() => {
        setCounter((prev) => prev - 1)
        if (counter === 1) {
          router.push('/'); // Redireciona para a página inicial
        }
      }, 1000)
  
      return () => clearInterval(interval)
    } else {
      router.push('/login'); // Redireciona para a página de login em caso de falha
    }
  }, [auth, router]);

  return (
    <div className='flex h-screen w-full justify-center items-center flex-col gap-8 mt-4 md:mt-0'>
      <IoShieldCheckmark className='text-9xl text-primary' />
      <h2 className='text-4xl font-bold'>You're logged in!</h2>
      <p className='text-lg'>Redirecting to your profile in {counter} seconds...</p>
      <Link href={"/"} className='text-primary underline'>Take me home</Link>
    </div>
  )
}