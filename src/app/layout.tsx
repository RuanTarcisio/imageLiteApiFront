import './globals.css';
import 'react-toastify/ReactToastify.min.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@/contexts/theme-provider';
import { useAuthStore } from '@/contexts/AuthStore'; 
import { ClientSideInitializer } from '@/components/ClientSideInitializer'; 


const roboto = Roboto({ subsets: ['latin'], weight: "300" });

export const metadata: Metadata = {
  title: 'ImageLite App',
  description: 'Uma galeria de imagens com busca por tags e formatos',
  icons: {
    icon: '/camera.svg',
  },
  openGraph: {
    title: 'ImageLite',
    description: 'Veja, busque e gerencie suas imagens com facilidade.',
    url: 'https://imagelite.app',
    siteName: 'ImageLite',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Remove AuthProvider e adiciona ClientSideInitializer */}
          <ClientSideInitializer>
            {children}
          </ClientSideInitializer>
        </ThemeProvider>
      </body>
    </html>
  );
}