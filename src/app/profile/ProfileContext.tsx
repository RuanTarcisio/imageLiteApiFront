"use client";
import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { useAuth, useUserService } from "@/resources";

interface AuthContextType {
  isAuthenticated: boolean;
  profileImage: string | null;
  updateAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  profileImage: null,
  updateAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const userService = useUserService();
  const [state, setState] = useState({
    isAuthenticated: false,
    profileImage: null as string | null,
  });
  const isMounted = useRef(true);

  const fetchProfileImage = useCallback(async () => {
    if (!auth.isSessionValid()) return null;
    
    try {
      return await userService.getProfileImage() || "/default-avatar.png";
    } catch (error) {
      console.error("Error loading profile image:", error);
      return "/default-avatar.png";
    }
  }, [auth, userService]);

  const updateAuth = useCallback(async () => {
    if (!isMounted.current) return;
    
    const isAuthenticated = auth.isSessionValid();
    const profileImage = isAuthenticated ? await fetchProfileImage() : null;
    
    setState(prev => {
      // Só atualiza se os valores realmente mudaram
      if (prev.isAuthenticated === isAuthenticated && prev.profileImage === profileImage) {
        return prev;
      }
      return { isAuthenticated, profileImage };
    });
  }, [auth, fetchProfileImage]);

  useEffect(() => {
    // Atualização inicial
    updateAuth();

    // Listener para mudanças no storage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === '_auth') {
        updateAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      isMounted.current = false;
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [updateAuth]); // Dependência estável graças ao useCallback

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      updateAuth 
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