"use client";

import { useEffect, useState } from "react";
import { Template, useNotification } from "@/components";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/resource";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const auth = useAuth();
  const notification = useNotification();
  const router = useRouter();
  const { theme, systemTheme } = useTheme();

  // Verifica se o componente foi montado e redireciona se o usuário já estiver autenticado
  useEffect(() => {
    setIsMounted(true);
    if (auth.isSessionValid()) {
      router.push("/galeria"); // Redireciona para a página inicial
    }
  }, [auth, router]);

  // Função para lidar com o login
  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const credentials = { email: values.email, password: values.password };
      const accessToken = await auth.authenticate(credentials);
      auth.initSession(accessToken);
      router.push("/galeria"); // Redireciona após o login
    } catch (error: any) {
      notification.notify(error?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Define o tema atual corretamente
  const currentTheme = isMounted ? (theme === "system" ? systemTheme : theme) : "light";

  // Evita renderização no servidor até que o componente esteja montado
  if (!isMounted) return null;

  return (
    <Template loading={loading}>
      <div
        className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 
          ${currentTheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Login to Your Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm onSubmit={handleLogin} loading={loading} />
        </div>
      </div>
    </Template>
  );
}