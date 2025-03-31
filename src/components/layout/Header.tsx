import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
// import { useAuth } from "@/hooks/useAuth";
import { useUserService, useAuth } from "@/resources";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Sun, Moon } from "lucide-react";
import { Button } from "../common";

import { useAuthContext } from "@/app/profile/ProfileContext";

export const Header = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const { isAuthenticated, profileImage, reloadProfileImage } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!isMounted) return null;

  return (
    <nav className="navbar bg-base-100 shadow flex justify-between items-center p-4 dark:bg-gray-800">
      {/* Logo */}
      <Button className="hover:text-indigo-600" onClick={() => router.push("/")}>
        <div className="flex space-x-4">
          <Image src="/next.svg" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            ImageLite
          </h1>
        </div>
      </Button>

      {/* Área Direita */}
      <div className="flex items-center gap-4">
        {/* Alternador de Tema */}
        <button
          onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
        >
          {currentTheme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Avatar Dropdown */}
        {isAuthenticated ? (
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="flex items-center focus:outline-none">
              <div className="avatar">
                <div className="size-9.5 rounded-full">
                  <Image
                    src={profileImage || "/default-avatar.png"}
                    alt="avatar"
                    width={38}
                    height={38}
                    className="rounded-full"
                  />
                </div>
              </div>
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 text-black dark:text-white">
              <MenuItem>
                <button
                  onClick={() => router.push("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Meu Perfil
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => router.push("/settings")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Configurações
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => {
                    auth.invalidateSession();
                    router.push("/login");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sair
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        ) : (
          <div className="flex space-x-4">
            <Button onClick={() => router.push("/login")}>Entrar</Button>
            <Button onClick={() => router.push("/register")}>Registrar</Button>
          </div>
        )}
      </div>
    </nav>
  );
};