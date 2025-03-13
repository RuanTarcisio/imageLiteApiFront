import * as Yup from 'yup';

// Função para calcular a data máxima (10 anos atrás a partir de hoje)
const getMaxBirthDate = () => {
  const currentDate = new Date();
  const maxBirthDate = new Date(
    currentDate.getFullYear() - 6, // Subtrai 10 anos
    currentDate.getMonth(),
    currentDate.getDate()
  );
  return maxBirthDate;
};

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  passwordMatch: string;
  birthDate: Date | null;
}

export const registerValidationScheme = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('E-mail wrong').required('Email is required'),
  password: Yup.string().required('Senha é obrigatória'),
  passwordMatch: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password'),
  birthDate: Yup.date()
    .nullable()
    .required('Date of birth is required')
    .max(new Date(), 'A data não pode ser no futuro')
    .max(getMaxBirthDate(), 'Minimum age, 6 years old'), 
  });