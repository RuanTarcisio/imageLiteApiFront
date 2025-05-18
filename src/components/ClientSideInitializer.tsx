"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/contexts/AuthStore";
import { LoadingScreen } from "@/components/LoadingScreen";

export function ClientSideInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { loading, checkSession } = useAuthStore();

  useEffect(() => {
    setIsMounted(true);
    checkSession();
  }, [checkSession]);

  if (!isMounted || loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}