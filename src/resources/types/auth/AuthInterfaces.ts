
export interface Credentials {
    email?: string;
    password?: string;
}

export interface AccessToken {
    accessToken?: string;
}

export interface UserSessionToken {
    name?: string;
    email?: string;
    userId?: number;
    accessToken: string | null; // Define um valor padrão
    expiration?: number;
}