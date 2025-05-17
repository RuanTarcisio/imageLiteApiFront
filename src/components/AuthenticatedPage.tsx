"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/contexts/AuthStore";

type Props = {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
};

export default function AuthenticatedPage({ children, loadingComponent }: Props) {
  const router = useRouter();
  const { isAuthenticated, loading, checkSession } = useAuthStore();

  // Chama checkSession assim que o componente montar
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Quando terminar de carregar e não estiver autenticado, redireciona
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  // Enquanto estiver carregando, exibe um loader (pode ser personalizado)
  if (loading) {
    return (
      loadingComponent || (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
        </div>
      )
    );
  }

  // Se já carregou e está autenticado, exibe a página normalmente
  return <>{children}</>;
}
