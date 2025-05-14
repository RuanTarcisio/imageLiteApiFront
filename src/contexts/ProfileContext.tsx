"use client";
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { useAuth, useUserService } from "@/resources";

interface AuthContextType {
  isAuthenticated: boolean;
  profileImage: string | null;
  updateAuth: () => Promise<void>;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  profileImage: null,
  updateAuth: async () => {},
  clearAuth: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useRef(useAuth());
  const userService = useRef(useUserService());

  const [state, setState] = useState({
    isAuthenticated: false,
    profileImage: null as string | null,
  });

  const fetchProfileImage = useCallback(async () => {
    if (!auth.current.isSessionValid()) return null;
  
    const cached = sessionStorage.getItem("profileImage");
    if (cached) return cached;
  
    try {
      const img = await userService.current.getProfileImage();
      const finalImage = img || "/default-avatar.png";
      sessionStorage.setItem("profileImage", finalImage);
      return finalImage;
    } catch (error) {
      console.error("Error loading profile image:", error);
      return "/default-avatar.png";
    }
  }, []);

  const updateAuth = useCallback(async () => {
    const isAuthenticated = auth.current.isSessionValid();
    const profileImage = isAuthenticated ? await fetchProfileImage() : null;

    setState({ isAuthenticated, profileImage });
  }, [fetchProfileImage]);

  const clearAuth = useCallback(() => {
    setState({
      isAuthenticated: false,
      profileImage: null
    });
  }, []);

  // ⚠️ useEffect com array vazio só roda 1x
  useEffect(() => {
    updateAuth();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === '_auth') updateAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [updateAuth]);

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      updateAuth,
      clearAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
