// @/stores/userStore.ts
import { create } from "zustand";
import { UserDto } from "@/resources";
import { useAuthStore } from "./AuthStore"; 
import { 
  NotAuthenticatedError, 
  UserIdNotAvailableError,
  ProfileUpdateError
} from "@/errors/AuthErrors";

interface UserState {
  user: UserDto | null;
  loading: boolean;
  error: string | null;
  fetchUser: (force?: boolean) => Promise<void>;
  updateUser: (data: Partial<UserDto>) => Promise<UserDto>;
  clearUser: () => void;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users` || "http://localhost:8080/v1/users";

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async (force = false) => {
    const { user, loading } = get();
    
    if ((loading || user) && !force) return;
    
    const authStore = useAuthStore.getState();
    
    if (!authStore.isAuthenticated) {
      set({ loading: false, error: "Authentication required" });
      throw new NotAuthenticatedError();
    }

    const userId = authStore.getUserId();
    if (!userId) {
      set({ loading: false, error: "User ID not found" });
      throw new UserIdNotAvailableError();
    }

    set({ loading: true, error: null });
    
    try {
      const response = await fetch(`${API_URL}/profile/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new ProfileUpdateError(`Failed to fetch user data (${response.status})`);
      }
      
      const userData = await response.json();
      set({ user: userData, loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch user data";
      set({ loading: false, error: errorMessage });
      throw error;
    }
  },

  updateUser: async (data) => {
    const authStore = useAuthStore.getState();
    
    if (!authStore.isAuthenticated) {
      throw new NotAuthenticatedError();
    }

    const userId = authStore.getUserId();
    if (!userId) {
      throw new UserIdNotAvailableError();
    }

    set({ loading: true, error: null });
    
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      });

      const response = await fetch(`${API_URL}/profile/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new ProfileUpdateError(`Update failed (${response.status})`);
      }

      const updatedUser = await response.json();
      set({ user: updatedUser, loading: false });
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update user";
      set({ loading: false, error: errorMessage });
      throw error;
    }
  },

  clearUser: () => set({ user: null, loading: false, error: null })
}));