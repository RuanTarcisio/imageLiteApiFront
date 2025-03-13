"use client";

import { RegisterForm, Template, useNotification } from "@/components";
import { useAuth } from "@/resource";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const auth = useAuth();
  const notification = useNotification();
  const router = useRouter();
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRegister = async (values: { name: string; email: string; password: string }) => {
    try {
      const user = { email: values.email, name: values.name, password: values.password };
      await auth.save(user);
      notification.notify("Success on saving user!", "success");
      router.push("/login");
    } catch (error: any) {
      notification.notify(error?.message, "error");
    }
  };

  // Define o tema corretamente
  const currentTheme = isMounted ? (theme === "system" ? systemTheme : theme) : "light";

  if (!isMounted) return null; // Evita erro de renderização no SSR

  return (
    <Template loading={loading}>
      <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 
        ${currentTheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
            Create New User
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <RegisterForm onSubmit={handleRegister} loading={loading} onCancel={() => router.push("/login")} />
        </div>
      </div>
    </Template>
  );
}
