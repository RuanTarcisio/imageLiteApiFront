import * as Yup from 'yup';

// Função para calcular a data máxima (6 anos atrás a partir de hoje)
const getMaxBirthDate = () => {
  const currentDate = new Date();
  return new Date(
    currentDate.getFullYear() - 6, // Subtrai 6 anos para definir a idade mínima
    currentDate.getMonth(),
    currentDate.getDate()
  );
};

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  passwordMatch: string;
  birthdate: Date | null;
  cpf: string;
}

export const registerValidationScheme = Yup.object({
  name: Yup.string().required('Name is required'),
  
  email: Yup.string()
    .email('Invalid e-mail format') // Melhor mensagem
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters') // Requisito comum
    .required('Password is required'),

  passwordMatch: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),

  birthdate: Yup.date()
    .nullable()
    .required('Date of birth is required')
    .max(new Date(), 'Date cannot be in the future')
    .max(getMaxBirthDate(), 'Minimum age is 6 years old'),

  cpf: Yup.string()
    .transform((value) => value.replace(/\D/g, '')) // Remove caracteres não numéricos
    .matches(/^\d{11}$/, 'CPF must contain exactly 11 digits')
    .required('CPF is required'),
});
