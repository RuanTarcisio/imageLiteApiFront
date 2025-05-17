"use client";

import { useAuthStore } from "@/contexts/AuthStore";

export function ClientSideInitializer({ children }: { children: React.ReactNode }) {
  useAuthStore(); // Executa apenas no client-side

  return <>{children}</>;
}