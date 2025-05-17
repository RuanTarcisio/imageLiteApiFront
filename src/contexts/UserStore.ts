import { create } from "zustand";
import { UserDto } from "@/resources";
import { useAuthStore } from "./AuthStore"; // Importe o AuthStore

interface UserState {
  user: UserDto | null;
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>; // Remove userId como parâmetro
  updateUser: (data: Partial<UserDto>) => Promise<void>; // Remove userId como parâmetro
  setUser: (user: UserDto) => void;
  clearUser: () => void;
}

const baseURL = process.env.NEXT_PUBLIC_URL || "http://localhost:8080/v1";

// Crie uma função que retorna o store com acesso ao AuthStore
export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    const authStore = useAuthStore.getState(); // Acessa o estado atual do AuthStore
    
    if (!authStore.isAuthenticated) {
      const errorMsg = "User is not authenticated";
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }

    const userId = authStore.getUserId();
    if (!userId) {
      const errorMsg = "User ID not available";
      set({ error: errorMsg, loading: false });
      throw new Error(errorMsg);
    }

    set({ loading: true, error: null });
    try {
      const response = await fetch(`${baseURL}/users/profile/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const userData = await response.json();
      
      set({ 
        user: userData,
        loading: false 
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to fetch user';
      set({ 
        error: errorMsg,
        loading: false 
      });
      throw error;
    }
  },

  updateUser: async (data: Partial<UserDto>) => {
    const authStore = useAuthStore.getState();
    
    if (!authStore.isAuthenticated) {
      throw new Error("User is not authenticated");
    }

    const userId = authStore.getUserId();
    if (!userId) {
      throw new Error("User ID not available");
    }

    set({ loading: true });
    try {
      const response = await fetch(`${baseURL}/users/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = await response.json();

      set((state) => ({
        user: { ...state.user, ...updatedUser } as UserDto,
        loading: false
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  setUser: (user: UserDto) => set({ user }),
  
  clearUser: () => set({ user: null, loading: false, error: null })
}));