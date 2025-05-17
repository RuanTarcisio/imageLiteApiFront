"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/contexts/AuthStore";

const publicRoutes = ["/login", "/register", "/password-reset"];

export function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && !isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }
    
    if (!loading && isAuthenticated && publicRoutes.includes(pathname)) {
      router.push("/");
    }
  }, [isAuthenticated, loading, pathname, router]);
}