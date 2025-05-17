import { Credentials } from "../types";

export class AuthService {
  baseURL = process.env.NEXT_PUBLIC_URL || 'http://localhost:8080/v1';

  async authenticate(credentials: Credentials): Promise<void> {
    const res = await fetch(`${this.baseURL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include', // importante pra cookies httpOnly
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Falha na autenticação');
    }
  }

  async logout(): Promise<void> {
    const res = await fetch(`${this.baseURL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Falha ao deslogar');
    }
  }

  async checkAuth(): Promise<boolean> {
    const res = await fetch(`${this.baseURL}/auth/me`, {
      credentials: 'include',
    });
    return res.ok;
  }
}











// import { jwtDecode } from "jwt-decode";
// import {
//   Credentials,
//   UserInputRegister,
//   UserDto,
//   UserSessionToken,
// } from "@/resources";

// export class AuthService {
//   private user: any | null = null;
//   private token: string | null = null;
//   baseURL: string = "http://localhost:8080";
//   baseURLUser: string = `${this.baseURL}/v1/auth`;
//   static AUTH_PARAM: string = "_auth";
//   private checkSessionPromise: Promise<boolean> | null = null;
//   private isCheckingSession = false; // Flag para controlar verificações em andamento

//   async authenticate(credentials: Credentials): Promise<void> {
//     try {
//       const response = await fetch(`${this.baseURLUser}/signin`, {
//         method: "POST",
//         body: JSON.stringify(credentials),
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // Envia/recebe cookies
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Authentication failed");
//       }

//       const userData = await response.json();
//       this.initSession(userData);
//     } catch (error: any) {
//       throw new Error(
//         error.message || "An error occurred during authentication"
//       );
//     }
//   }

//   async handleOAuthCallback(): Promise<void> {
//     try {
//       // Verifica se há um token no cookie
//       const response = await fetch(`${this.baseURL}/auth/oauth2/success`, {
//         credentials: "include", // Importante para enviar cookies
//       });

//       if (!response.ok) {
//         throw new Error("OAuth authentication failed");
//       }

//       // Extrai informações do usuário da resposta
//       const userData = await response.json();
//       this.initSession(userData);
//     } catch (error: any) {
//       throw new Error(error.message || "Failed to complete OAuth login");
//     }
//   }

//   getUserIdFromToken(): number | null {
//     const session = this.getUserSession();
//     return session?.userId || null;
//   }

//   public initSession(userData: any): void {
//     const sessionData: UserSessionToken = {
//       userId: userData.id,
//       email: userData.email,
//       name: userData.name,
//       expiration: userData.expiration,
//       accessToken: null, // Não armazenamos mais o token no localStorage
//     };
//     console.log(sessionData);
//     this.setUserSession(sessionData);
//   }

//   async handleSocialLoginCallback(): Promise<void> {
//     try {
//       const response = await fetch(`${this.baseURL}/oauth2/success`, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to complete social login");
//       }

//       const userData = await response.json();
//       this.initSession(userData);
//     } catch (error: any) {
//       throw new Error(error.message || "Social login failed");
//     }
//   }

//   redirectToSocialLogin(provider: "google" | "github") {
//     window.location.href = `${this.baseURL}/oauth2/authorization/${provider}`;
//   }

//   private lastCheckTime: number = 0;
//   private readonly checkInterval: number = 5000; // 5 segundos entre verificações

//   async checkSession(): Promise<boolean> {
//     // Evita múltiplas verificações simultâneas
//     if (this.isCheckingSession) {
//       return false;
//     }

//     // Implementação de debounce - evita verificações muito frequentes
//     const now = Date.now();
//     if (now - this.lastCheckTime < this.checkInterval) {
//       return this.user !== null; // Retorna o estado atual se a verificação for muito recente
//     }

//     this.isCheckingSession = true;
//     this.lastCheckTime = now;

//     try {
//       const response = await fetch(`${this.baseURL}/check-session`, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (response.status === 401) {
//         this.clearLocalSession();
//         return false;
//       }

//       if (!response.ok) {
//         throw new Error("Session check failed");
//       }

//       const userData = await response.json();
//       this.initSession(userData);
//       return true;
//     } catch (error) {
//       console.error("Session check error:", error);
//       this.clearLocalSession();
//       return false;
//     } finally {
//       this.isCheckingSession = false;
//     }
//   }

//   private clearLocalSession(): void {
//     localStorage.removeItem("_auth");
//     sessionStorage.removeItem("_auth");
//     this.user = null;
//     this.token = null;
//   }

//   clearSession(): void {
//     this.clearLocalSession();

//     // Chamada opcional para logout no backend
//     // Não bloqueia se falhar
//     fetch(`${this.baseURL}/logout`, {
//       method: "POST",
//       credentials: "include",
//     }).catch(() => {});
//   }

//   async save(user: UserInputRegister): Promise<void> {
//     try {
//       const response = await fetch(`${this.baseURLUser}/signup`, {
//         method: "POST",
//         body: JSON.stringify(user),
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to save user");
//       }
//     } catch (error: any) {
//       throw new Error(
//         error.message || "An error occurred while saving the user"
//       );
//     }
//   }

//   async getProfile(): Promise<UserDto> {
//     try {
//       const response = await this.fetchWithAuth(`${this.baseURLUser}/profile`);

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to fetch user profile");
//       }

//       const data = await response.json();
//       return { ...data, birthdate: new Date(data.birthdate) };
//     } catch (error: any) {
//       throw new Error(
//         error.message || "An error occurred while fetching the user profile"
//       );
//     }
//   }

//   // private initSession(userData: any): void {
//   //     try {
//   //         const decodedToken: any = jwtDecode(userData.accessToken);

//   //         const userSessionToken: UserSessionToken = {
//   //             userId: decodedToken.sub,
//   //             email: decodedToken.email || '',
//   //             name: decodedToken.name || '',
//   //             expiration: decodedToken.exp,
//   //             // Não armazenamos mais o token no localStorage
//   //             accessToken: null
//   //         };

//   //         this.setUserSession(userSessionToken);
//   //     } catch (error: any) {
//   //         throw new Error(`Failed to initialize session: ${error.message}`);
//   //     }
//   // }

//   private setUserSession(userSessionToken: UserSessionToken): void {
//     try {
//       localStorage.setItem(
//         AuthService.AUTH_PARAM,
//         JSON.stringify(userSessionToken)
//       );
//     } catch (error: any) {
//       throw new Error(`Failed to set user session: ${error.message}`);
//     }
//   }

//   getUserSession(): UserSessionToken | null {
//     try {
//       const authString = localStorage.getItem(AuthService.AUTH_PARAM);
//       return authString ? JSON.parse(authString) : null;
//     } catch (error: any) {
//       throw new Error(`Failed to get user session: ${error.message}`);
//     }
//   }

//   isSessionValid(): boolean {
//     const userSession = this.getUserSession();
//     if (!userSession) return false;

//     const expiration = userSession.expiration;
//     return expiration ? new Date() < new Date(expiration * 1000) : false;
//   }

//   invalidateSession(): void {
//     try {
//       // Limpa o localStorage
//       localStorage.removeItem(AuthService.AUTH_PARAM);

//       // Faz logout no servidor
//       fetch(`${this.baseURLUser}/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch (error: any) {
//       throw new Error(`Failed to invalidate session: ${error.message}`);
//     }
//   }

//   private async fetchWithAuth(
//     input: RequestInfo,
//     init?: RequestInit
//   ): Promise<Response> {
//     const response = await fetch(input, {
//       ...init,
//       credentials: "include",
//     });

//     if (response.status === 401) {
//       // Token expirado - tentar renovar
//       const refreshed = await this.refreshToken();
//       if (!refreshed) {
//         this.invalidateSession();
//         throw new Error("Session expired");
//       }
//       return this.fetchWithAuth(input, init);
//     }

//     return response;
//   }

//   private async refreshToken(): Promise<boolean> {
//     try {
//       const response = await fetch(`${this.baseURLUser}/refresh-token`, {
//         method: "POST",
//         credentials: "include",
//       });
//       return response.ok;
//     } catch (error) {
//       return false;
//     }
//   }
// }

// export const useAuth = () => new AuthService();
