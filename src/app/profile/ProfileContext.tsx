"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/resources";
import { useUserService } from "@/resources";

interface AuthContextType {
  isAuthenticated: boolean;
  profileImage: string | null;
  reloadProfileImage: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  profileImage: null,
  reloadProfileImage: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const userService = useUserService();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const fetchProfileImage = async () => {
    if (auth.isSessionValid()) {
      try {
        const image = await userService.getProfileImage();
        setProfileImage(image || "/default-avatar.png");
      } catch (error) {
        console.error("Erro ao carregar imagem do perfil:", error);
        setProfileImage("/default-avatar.png");
      }
    }
  };

  useEffect(() => {
    setIsAuthenticated(auth.isSessionValid());
    fetchProfileImage();
  }, [auth.isSessionValid()]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, profileImage, reloadProfileImage: fetchProfileImage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);