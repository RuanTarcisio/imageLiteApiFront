"use client";
import { useEffect, useState, useMemo } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Sun, Moon, User, Settings, LogOut } from "lucide-react";
import { Button } from "../common";
import { useAuthStore } from "@/contexts/AuthStore";

export const Header = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const router = useRouter();
  const { isAuthenticated, profileImage, logout, loading } = useAuthStore();

  useEffect(() => setIsMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      setTimeout(() => router.refresh(), 100);
    } catch (error) {
      console.error("Falha no logout:", error);
    }
  };

  const avatarSrc = useMemo(() => {
    if (avatarError || !profileImage || profileImage.trim() === "") {
      return "/darth-vader-profile.svg";
    }
    return profileImage;
  }, [profileImage, avatarError]);

  if (!isMounted || loading) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
          aria-label="Home"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/next.svg"
              alt="Logo ImageLite"
              width={32}
              height={32}
              className="dark:invert"
              priority
            />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              ImageLite
            </h1>
          </div>
        </Button>

        {/* Área de Controle */}
        <div className="flex items-center gap-4">
          {/* Alternador de Tema */}
          <Button
            variant="ghost"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            aria-label={`Alternar para tema ${
              currentTheme === "dark" ? "claro" : "escuro"
            }`}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {currentTheme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </Button>

          {/* Auth Section */}
          {isAuthenticated ? (
            <Menu as="div" className="relative">
              <MenuButton
                as={Button}
                variant="ghost"
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary-500 dark:ring-primary-400">
                  <img
                    src={avatarSrc}
                    alt="User avatar"
                    width={48}
                    height={48}
                    onError={() => setAvatarError(true)}
                    className="w-full h-full object-cover dark:bg-red-200"
                  />
                </div>
              </MenuButton>

              <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                <div className="p-1">
                  <MenuItem>
                    <button
                      onClick={() => router.push("/me/profile")}
                      className="flex items-center w-full px-4 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Meu Perfil
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => router.push("/me/settings")}
                      className="flex items-center w-full px-4 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Configurações
                    </button>
                  </MenuItem>
                </div>
                <div className="p-1 border-t border-gray-200 dark:border-gray-700">
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm rounded text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                className="hidden sm:inline-flex border border-gray-300 bg-green-300 hover:bg-green-400 dark:border-gray-600 dark:text-white dark:bg-green-600 dark:hover:bg-green-800"
              >
                Entrar
              </Button>
              <Button
                onClick={() => router.push("/register")}
                className="hidden sm:inline-flex bg-blue-400 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Registrar
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
  