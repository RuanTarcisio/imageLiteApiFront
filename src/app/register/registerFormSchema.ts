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
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
  passwordMatch: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('Confirme a senha'),
  birthDate: Yup.date()
    .nullable()
    .required('Data de nascimento é obrigatória')
    .max(new Date(), 'A data não pode ser no futuro')
    .max(getMaxBirthDate(), 'Idade mínima, 06 anos de idade'), 
  });