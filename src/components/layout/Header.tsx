"use client";

import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAuth } from "@/resource";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components";
import Image from "next/image";
import { Moon, Sun, Bell } from "lucide-react";

export const Header = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsAuthenticated(auth.isSessionValid());
  }, [auth]);

  // Define o tema atual, considerando o sistema
  const currentTheme = theme === "system" ? systemTheme : theme;
  console.log("Tema atual:", theme, "Tema do sistema:", systemTheme);

  // Evita problemas de renderização no servidor
  if (!isMounted) return null;

  return (
    <nav className="navbar bg-base-100 shadow flex justify-between items-center p-4 dark:bg-gray-800">
      <div className="flex items-center gap-4">
        {/* Links de Navegação */}
        <div className="hidden md:flex gap-6 text-gray-600 dark:text-gray-300">
          <button
            onClick={() => router.push("/")}
            className="hover:text-indigo-600"
          >
            Home
          </button>
          <button
            onClick={() => router.push("/products")}
            className="hover:text-indigo-600"
          >
            Produtos
          </button>
          <button
            onClick={() => router.push("/contact")}
            className="hover:text-indigo-600"
          >
            Contato
          </button>
        </div>
      </div>

      <Button
        className="hover:text-indigo-600"
        onClick={() => router.push("/")}
      >
        <div className="flex space-x-4">
          <Image src="/next.svg" alt="Logo" width={40} height={40} />

          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">
            ImageLite
          </h1>
        </div>
      </Button>

      {/*  <Button
          style="bg-red-700"
          variant="outline"
          type="button"
          disabled={loading}
          className="w-full"
          onClick={handleGoogleLogin}
        >
        */}

      {/* Barra de Pesquisa
      <div className="hidden md:flex items-center border border-gray-300 rounded-full px-4 py-1 bg-white dark:bg-gray-700">
        <input
          type="text"
          placeholder="Buscar..."
          className="bg-transparent outline-none text-sm w-40 md:w-64 text-gray-900 dark:text-gray-100"
        />
      </div> */}

      {/* Área Direita: Notificações, Tema, Avatar/Login */}
      <div className="flex items-center gap-4">
        {/* Botão de Notificações */}
        <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            3
          </span>
        </button>

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

        {/* Dropdown do Avatar */}
        {isAuthenticated ? (
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="flex items-center focus:outline-none">
              <div className="avatar">
                <div className="size-9.5 rounded-full">
                  <Image
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                    alt="avatar"
                    width={38}
                    height={38}
                    className="rounded-full"
                  />
                </div>
              </div>
            </MenuButton>

            {/* Menu Dropdown */}
            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transition-opacity duration-200">
              <MenuItem>
                <div className="p-4 flex items-center gap-2">
                  <div className="avatar">
                    <Image
                      src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h6 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      John Doe
                    </h6>
                    <small className="text-gray-500 dark:text-gray-400">
                      Admin
                    </small>
                  </div>
                </div>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => router.push("/profile")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Meu Perfil
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => router.push("/settings")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sair
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        ) : (
          <div className="flex space-x-4">
            {" "}
            {/* Flexbox para alinhar os botões horizontalmente com espaçamento */}
            <Button
              className=" text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              style="bg-teal-900 hover:bg-green-600 "
              label="SignIn"
              onClick={() => router.push("/login")}
            />
            <Button
              className=" text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              style="bg-indigo-700 hover:bg-blue-500"
              label="SignUp"
              onClick={() => router.push("/register")}
            />
          </div>
        )}
      </div>
    </nav>
  );
};
