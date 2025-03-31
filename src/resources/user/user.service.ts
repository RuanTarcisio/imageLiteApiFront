import { UserDto, useAuth } from "@/resources";

class UserService {
    baseURL: string = "http://localhost:8080";
    baseURLUser: string = `${this.baseURL}/v1/users`;
    authService = useAuth();

    private getAuthToken(): string | null {
        if (typeof window !== "undefined") {
            const authData = localStorage.getItem("_auth");
            return authData ? JSON.parse(authData).accessToken : null;
        }
        return null;
    }

    async getProfile(): Promise<UserDto> {
        try {
          const userId = this.authService.getUserIdFromToken(); 

            const response = await fetch(`${this.baseURLUser}/profile/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.getAuthToken()}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch profile");
            }

            return await response.json();
        } catch (error: any) {
            throw new Error(error.message || "An error occurred while fetching the profile");
        }
    }

    async updateProfile(values: {
        name: string;
        email: string;
        password?: string;
        birthdate: Date | null;
        profileImage?: File | null;
    }): Promise<void> {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            if (values.password) formData.append("password", values.password);
            if (values.birthdate) formData.append("birthdate", values.birthdate.toISOString());
            if (values.profileImage) formData.append("profileImage", values.profileImage);

            const response = await fetch(`${this.baseURLUser}/profile`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${this.getAuthToken()}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile");
            }
        } catch (error: any) {
            throw new Error(error.message || "An error occurred while updating the profile");
        }
    }

    async uploadProfileImage(file: File): Promise<void> {
        try {
          const userId = this.authService.getUserIdFromToken(); // Suponha que você já tenha essa função

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch(`${this.baseURLUser}/profile/${userId}/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.getAuthToken()}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to upload profile image");
            }
        } catch (error: any) {
            throw new Error(error.message || "An error occurred while uploading the profile image");
        }
    }

    async getProfileImage(): Promise<string | null> {
        try {
            const userId = this.authService.getUserIdFromToken(); 
    
            const response = await fetch(`${this.baseURLUser}/profile/${userId}/photo`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.getAuthToken()}`,
                },
            });
    
            if (!response.ok) {
                return null; // Retorna null se não encontrar a imagem
            }
    
            const blob = await response.blob();
            return URL.createObjectURL(blob); // Cria um URL para exibir a imagem no navegador
        } catch (error) {
            console.error("Error fetching profile image:", error);
            return null;
        }
    }
}

export const useUserService = () => new UserService();
