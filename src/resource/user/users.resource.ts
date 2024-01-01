export class User {
    name?: string;
    email?: string;
    password?: string

}
export class Credentials{
    email?: string;
    password?: string;
}

export class AcessToken{
    acessToken?: string;
}

export class UserSessionToken{
    name?: string;
    email?: string;
    acessToken?: string;
    expiration?: number;
}