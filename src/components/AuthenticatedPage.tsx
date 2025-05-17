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
  const { isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      loadingComponent || (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
        </div>
      )
    );
  }

  return <>{children}</>;
}
