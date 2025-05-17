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

  checkSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: FormData) => Promise<void>;
  setProfileImage: (img: string | null) => void;
  loadProfileImage: () => Promise<void>;
  redirectToSocialLogin: (provider: "google" | "github") => void;
  getUserId: () => number | null;
}

const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:8080/v1";

// Helper para gerenciar o localStorage
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
  profileImage: getStoredImage(), // Inicializa com o valor do localStorage

  register: async (formData: FormData) => {
    console.log("[AuthStore] Iniciando registro...");
    try {
      console.log("[AuthStore] Enviando para:", `${baseURL}/auth/signup`);
      const response = await fetch(`${baseURL}/auth/signup`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      console.log("[AuthStore] Resposta recebida:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[AuthStore] Erro na resposta:", errorText);
        throw new Error(errorText || "Failed to register user");
      }

      if (response.status === 201) {
        console.log(
          "[AuthStore] Registro criado com sucesso, sem conteúdo JSON."
        );
        return null;
      }

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return await response.json();
      }

      return null;
    } catch (error) {
      console.error("[AuthStore] Erro completo:", error);
      throw error;
    }
  },

  login: async (email, password) => {
    const response = await fetch(`${baseURL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Erro no login");
    }

    await get().checkSession();
  },

  redirectToSocialLogin: (provider) => {
    // Verifica se está no client-side
    if (typeof window !== "undefined") {
      window.location.href = `${baseURL}/oauth2/authorization/${provider}`;
    } else {
      console.warn("redirectToSocialLogin só pode ser chamado no client-side");
    }
  },

  logout: async () => {
    try {
      await fetch(`${baseURL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      // Limpa tudo
      localStorage.removeItem("profileImage");
      set({ isAuthenticated: false, user: null, profileImage: null });
    } catch (error) {
      console.error("Erro durante logout:", error);
      set({ isAuthenticated: false, user: null, profileImage: null });
    }
  },

  checkSession: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${baseURL}/auth/check-session`, {
        credentials: "include",
      });

      if (res.ok) {
        const { id, email, name, profileImage } = await res.json();

        // Atualiza a imagem no localStorage se vier do backend
        if (profileImage) {
          localStorage.setItem("profileImage", profileImage);
        }

        set({
          isAuthenticated: true,
          user: { id, email, name },
          profileImage: profileImage || getStoredImage(),
          loading: false,
        });
      } else {
        set({ isAuthenticated: false, user: null, loading: false });
      }
    } catch (error) {
      set({ isAuthenticated: false, user: null, loading: false });
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
      // Obtém o user atual do estado
      const currentUser = get().user;

      // Se não houver usuário logado, não faz sentido carregar a imagem
      if (!currentUser?.id) {
        console.warn("Nenhum usuário logado para carregar imagem");
        return;
      }

      const response = await fetch(
        `${baseURL}/users/profile/${currentUser.id}/photo`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        // Se for imagem binária
        if (response.headers.get("content-type")?.includes("image")) {
          const blob = await response.blob();
          const reader = new FileReader();
          const base64 = await new Promise<string>((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          get().setProfileImage(base64);
        }
        // Se for URL
        else {
          const { url } = await response.json();
          get().setProfileImage(url);
        }
      } else {
        // Se a resposta não for OK, remove a imagem existente
        get().setProfileImage(null);
      }
    } catch (error) {
      console.error("Erro ao carregar imagem:", error);
      get().setProfileImage(null);
    }
  },
  getUserId: () => {
    const currentUser = get().user;
    return currentUser?.id || null;
  },
}));