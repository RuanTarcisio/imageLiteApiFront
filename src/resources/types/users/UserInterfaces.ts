export interface UpdateUserDto {
  name?: string;
  email?: string;
  birthdate?: Date;
  profileImage?: File | string | undefined;
}

export interface UserDto {
  name: string;
  email: string;
  cpf?: string;
  birthdate?: Date | null;
  profileImage?: string | File | null;
}

export interface UserInputRegister {
  name?: string;
  email?: string;
  password?: string;
  cpf: string;
  birthdate?: Date | null;
  profileImage?: File | string | undefined;
}

export interface UserImage{
    profileImage?: File | string | undefined;
}