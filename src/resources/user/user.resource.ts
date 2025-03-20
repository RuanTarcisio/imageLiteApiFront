export class User {
    name: string;
    email: string;
    password: string;
    birthdate: Date;
    cpf: string;
    profileImage?: File | string;

    constructor(
        name: string,
        email: string,
        password: string,
        birthdate: Date,
        cpf: string,
        profileImage?: File | string
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.cpf = cpf;
        this.profileImage = profileImage;
    }
}



export class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    birthdate?: Date;
    cpf?: string;
    profileImage?: File | string;
}

export class UserDto {
    id?: number;
    name?: string;
    email?: string;
    birthdate?: Date | null;
    cpf?: string;
    profileImage?: File | string| undefined;
}
