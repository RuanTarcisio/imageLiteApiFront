export interface UpdateUserDto {
  name?: string;
  email?: string;
  birthdate?: Date;
  profileImage?: File | string | undefined;
}

export interface UserDto {
  id?: number;
  name?: string;
  email?: string;
  birthdate?: Date | null;
  cpf?: string;
}

export interface UserInputRegister {
  name?: string;
  email?: string;
  password?: string;
  cpf: string;
  birthday?: Date | null;
  profileImage?: File | string | undefined;
}

export interface UserImage{
    profileImage?: File | string | undefined;
}