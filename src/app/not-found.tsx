'use client';

import Link from 'next/link';
import { Template } from '@/components';
import type { Metadata } from 'next'


export const metadata: Metadata = {
    title: '404 - Página Não Encontrada | ImageLite App',
    description: 'A página que você procurou não existe. Volte à página inicial ou explore outras seções do nosso site.',
    openGraph: {
      title: '404 - Página Não Encontrada | ImageLite App',
      description: 'A página não foi encontrada. Volte à página inicial ou explore outras seções do nosso site.',
      url: 'https://imagelite.app/notfound',
      type: 'website',
     
    },
  };

export default function NotFound() {
  return (
    
    <Template>
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center mt-[75px]">
        <h1 className="text-6xl font-bold text-gray-800 mb-4 mt-[75px] dark:text-white">404</h1>
        <p className="text-xl text-gray-600 mb-6 dark:text-gray-300">Oops! Página não encontrada.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          Voltar para a Home
        </Link>
      </div>
    </Template>
  );
}
