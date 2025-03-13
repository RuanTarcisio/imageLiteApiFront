import { AccessToken, Credentials, User, UserSessionToken } from "./users.resource";
import { jwtDecode } from 'jwt-decode';

class AuthService {
    baseURL: string = "http://localhost:8080";
    baseURLUser: string = `${this.baseURL}/v1/users` ;
    static AUTH_PARAM: string = "_auth";

    async authenticate(credentials: Credentials): Promise<AccessToken> {
        console.log(this.baseURLUser)

        try {
            const response = await fetch(`${this.baseURLUser}/auth`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Authentication failed");
            }

            const data: AccessToken = await response.json();
            return data;
        } catch (error: any) {
            throw new Error(error.message || "An error occurred during authentication");
        }

        
    }

    redirectToSocialLogin(provider: "google" | "github") {
        console.log(this.baseURLUser)

        const redirectUrl = `${this.baseURL}/oauth2/authorization/${provider}`;
        window.location.href = redirectUrl; // Redireciona o usuário para o backend
    }

    // Verifica se o usuário está autenticado após o redirecionamento
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
            const response = await fetch(this.baseURLUser, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save user");
            }
        } catch (error: any) {
            throw new Error(error.message || "An error occurred while saving the user");
        }
    }

    initSession(token: AccessToken): void {
        if (!token.accessToken) {
            throw new Error("Invalid token: accessToken is missing");
        }

        try {
            const decodedToken: any = jwtDecode(token.accessToken);

            if (!decodedToken.sub || !decodedToken.exp) {
                throw new Error("Invalid token: missing required fields");
            }

            const userSessionToken: UserSessionToken = {
                accessToken: token.accessToken,
                email: decodedToken.sub,
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
            if (typeof window !== "undefined") {
                localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(userSessionToken));
            }
        } catch (error: any) {
            throw new Error(`Failed to set user session: ${error.message}`);
        }
    }

    getUserSession(): UserSessionToken | null {
        try {
            if (typeof window !== "undefined") {
                const authString = localStorage.getItem(AuthService.AUTH_PARAM);
                if (!authString) {
                    return null;
                }

                const token: UserSessionToken = JSON.parse(authString);
                return token;
            }
            return null;
        } catch (error: any) {
            throw new Error(`Failed to get user session: ${error.message}`);
        }
    }

    isSessionValid(): boolean {
        const userSession = this.getUserSession();
        if (!userSession) {
            return false;
        }

        const expiration = userSession.expiration;
        if (expiration) {
            const expirationDateInMillis = expiration * 1000;
            return new Date() < new Date(expirationDateInMillis);
        }

        return false;
    }

    invalidateSession(): void {
        try {
            if (typeof window !== "undefined") {
                localStorage.removeItem(AuthService.AUTH_PARAM);
            }
        } catch (error: any) {
            throw new Error(`Failed to invalidate session: ${error.message}`);
        }
    }
}

export const useAuth = () => new AuthService();