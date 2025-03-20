"use client";

import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAuth } from "@/resources";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";

export const Header = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsAuthenticated(auth.isSessionValid());
  }, [auth]);

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!isMounted) return null;

  return (
    <nav className="navbar bg-base-100 shadow flex justify-between items-center p-4 dark:bg-gray-800">
      {/* Menu Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-haspopup="menu"
          aria-expanded={isDropdownOpen}
          aria-label="Dropdown"
        >
          <span className="text-gray-900 dark:text-gray-100 text-xl">☰</span>
        </button>

        {isDropdownOpen && (
          <ul
            className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-10 text-black dark:text-white"
            role="menu"
          >
            <li className="mt-2">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Link 1
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Link 2
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Link 3
              </a>
            </li>
            {/* <hr className="border-gray-300 dark:border-gray-600" /> */}
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                Link 4
              </a>
            </li>
          </ul>
        )}
      </div>

      {/* Logo */}
      <Button className="hover:text-indigo-600" onClick={() => router.push("/")}>
        <div className="flex space-x-4 ml-24">
          <Image src="/next.svg" alt="Logo" width={40} height={40} />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">
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

            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 
                              focus:outline-none z-50 transition-opacity duration-200 text-black dark:text-white">
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
                    <small className="text-gray-500 dark:text-gray-400">Admin</small>
                  </div>
                </div>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => router.push("/profile")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Meu Perfil
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => router.push("/settings")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
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
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Sair
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        ) : (
          <div className="flex space-x-4">
            <Button
              className="text-white font-semibold py-2 px-4 rounded focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              style="bg-teal-900 hover:bg-green-600"
              label="SignIn"
              onClick={() => router.push("/login")}
            />
            <Button
              className="text-white font-semibold py-2 px-4 rounded focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
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
