import { AccessToken, Credentials, User, UserDto, UserSessionToken } from "./auth.resource";
import { jwtDecode } from 'jwt-decode';

class AuthService {
    baseURL: string = "http://localhost:8080";
    baseURLUser: string = `${this.baseURL}/v1/auth`;
    static AUTH_PARAM: string = "_auth";

    async authenticate(credentials: Credentials): Promise<AccessToken> {
        try {
            const response = await fetch(`${this.baseURLUser}/signin`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Authentication failed");
            }

            const data: AccessToken = await response.json();
            this.initSession(data); // Salva o token na sessão automaticamente
            return data;
        } catch (error: any) {
            throw new Error(error.message || "An error occurred during authentication");
        }
    }

    redirectToSocialLogin(provider: "google" | "github") {
        window.location.href = `${this.baseURL}/oauth2/authorization/${provider}`;
    }

    checkSessionAfterRedirect(): boolean {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            this.initSession({ accessToken: token });
            return true;
        }

        return this.isSessionValid();
    }

    async save(user: User): Promise<void> {
        try {
            const response = await fetch(`${this.baseURLUser}/signup`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save user");
            }
        } catch (error: any) {
            throw new Error(error.message || "An error occurred while saving the user");
        }
    }

    getUserIdFromToken(): number | null {
        const token = this.getAccessToken();
        if (!token) return null;
    
        try {
            const payload = jwtDecode<{ sub: string | number }>(token); // Define o tipo do payload
    
            const userId = Number(payload.sub);
            return isNaN(userId) ? null : userId; // Evita retornar NaN
        } catch (error) {
            console.error("Failed to decode JWT:", error);
            return null;
        }
    }

    async getProfile(): Promise<UserDto> {
        const userId = this.getUserIdFromToken();
        if (!userId) throw new Error("User ID not found in token");

        try {
            const response = await fetch(`${this.baseURLUser}/profile/${userId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.getAccessToken()}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch user profile");
            }

            const data = await response.json();
            return { ...data, birthdate: new Date(data.birthdate) };
        } catch (error: any) {
            throw new Error(error.message || "An error occurred while fetching the user profile");
        }
    }

    initSession(token: AccessToken): void {
        if (!token.accessToken) throw new Error("Invalid token: accessToken is missing");

        try {
            const decodedToken: any = jwtDecode(token.accessToken);

            if (!decodedToken.sub || !decodedToken.exp) {
                throw new Error("Invalid token: missing required fields");
            }

            const userSessionToken: UserSessionToken = {
                accessToken: token.accessToken ?? null, // Usa null se for undefined
                userId: decodedToken.sub, 
                email: decodedToken.email || '',
                name: decodedToken.name || '',
                expiration: decodedToken.exp
            };
            

            this.setUserSession(userSessionToken);
        } catch (error: any) {
            throw new Error(`Failed to initialize session: ${error.message}`);
        }
    }

    setUserSession(userSessionToken: UserSessionToken): void {
        try {
            localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(userSessionToken));
        } catch (error: any) {
            throw new Error(`Failed to set user session: ${error.message}`);
        }
    }

    getUserSession(): UserSessionToken | null {
        try {
            const authString = localStorage.getItem(AuthService.AUTH_PARAM);
            return authString ? JSON.parse(authString) : null;
        } catch (error: any) {
            throw new Error(`Failed to get user session: ${error.message}`);
        }
    }

    getAccessToken(): string | null {
        const session = this.getUserSession();
        return session ? session.accessToken : null;
    }

    isSessionValid(): boolean {
        const userSession = this.getUserSession();
        if (!userSession) return false;

        const expiration = userSession.expiration;
        return expiration ? new Date() < new Date(expiration * 1000) : false;
    }

    invalidateSession(): void {
        try {
            localStorage.removeItem(AuthService.AUTH_PARAM);
        } catch (error: any) {
            throw new Error(`Failed to invalidate session: ${error.message}`);
        }
    }
}

export const useAuth = () => new AuthService();
