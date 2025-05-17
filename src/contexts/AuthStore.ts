// @/stores/authStore.ts
import { create } from "zustand";
import { toast } from "react-toastify";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  profileImage: string | null;

  checkSession: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: FormData) => Promise<void>;
  setProfileImage: (img: string | null) => void;
  loadProfileImage: () => Promise<void>;
  redirectToSocialLogin: (provider: "google" | "github") => void;
  getUserId: () => number | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/v1";

const getStoredImage = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("profileImage");
  }
  return null;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  loading: true,
  user: null,
  profileImage: getStoredImage(),

  register: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to register user");
      }

      // Se registro foi bem-sucedido, verifica a sessão
      await get().checkSession();
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login failed");
      }

      await get().checkSession();
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  redirectToSocialLogin: (provider) => {
    if (typeof window !== "undefined") {
      window.location.href = `${API_URL}/oauth2/authorization/${provider}`;
    }
  },

  logout: async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("profileImage");
      set({
        isAuthenticated: false,
        user: null,
        profileImage: null,
        loading: false,
      });
    }
  },

  checkSession: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${API_URL}/auth/check-session`, {
        credentials: "include",
      });

      if (res.ok) {
        const { id, email, name, profileImage } = await res.json();
        
        if (profileImage) {
          localStorage.setItem("profileImage", profileImage);
        }

        set({
          isAuthenticated: true,
          user: { id, email, name },
          profileImage: profileImage || getStoredImage(),
          loading: false,
        });
        return true;
      }

      set({ isAuthenticated: false, user: null, loading: false });
      return false;
    } catch (error) {
      set({ isAuthenticated: false, user: null, loading: false });
      return false;
    }
  },

  setProfileImage: (img) => {
    if (img) {
      localStorage.setItem("profileImage", img);
    } else {
      localStorage.removeItem("profileImage");
    }
    set({ profileImage: img });
  },

  loadProfileImage: async () => {
    try {
      const currentUser = get().user;
      if (!currentUser?.id) return;

      const response = await fetch(
        `${API_URL}/users/profile/${currentUser.id}/photo`,
        { credentials: "include" }
      );

      if (response.ok) {
        if (response.headers.get("content-type")?.includes("image")) {
          const blob = await response.blob();
          const reader = new FileReader();
          const base64 = await new Promise<string>((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          get().setProfileImage(base64);
        } else {
          const { url } = await response.json();
          get().setProfileImage(url);
        }
      } else {
        get().setProfileImage(null);
      }
    } catch (error) {
      console.error("Error loading profile image:", error);
      get().setProfileImage(null);
    }
  },

  getUserId: () => get().user?.id || null,
}));