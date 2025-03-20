export class User {
    name?: string;
    email?: string;
    password?: string;
    birthdate?: Date ;
    cpf?: string;
}

export class UserProfile{
    name?: string;
    email?: string;
    birthdate?: Date;
    cpf?: string;
}

export class Credentials {
    email?: string;
    password?: string;
}

export class AccessToken {
    accessToken?: string;
}

export class UserSessionToken {
    name?: string;
    email?: string;
    userId?: number;
    accessToken: string | null = null; // Define um valor padrão
    expiration?: number;
}


export class UserDto {
    id?: number;  // Ou 'string', caso o backend retorne como string
    name?: string;
    email?: string;
    cpf?: string;
    birthdate?: Date;
}