"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/contexts/AuthStore";
import { LoadingScreen } from "@/components/LoadingScreen";

export function ClientSideInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  const { loading, isAuthenticated } = useAuthStore();
  const checkSession = useAuthStore((state) => state.checkSession);

  console.log("isAuthenticated:", isAuthenticated, "loading:", loading);
  
  useEffect(() => {
    setIsClient(true);
    
    async function init() {
      await checkSession();
    }
    
    init();
  }, [checkSession]);

  if (!isClient || loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
