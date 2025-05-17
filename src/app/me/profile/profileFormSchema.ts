import * as Yup from 'yup';

// Função para calcular a data máxima (6 anos atrás a partir de hoje)
const getMaxBirthDate = () => {
  const currentDate = new Date();
  return new Date(
    currentDate.getFullYear() - 6, 
    currentDate.getMonth(),
    currentDate.getDate()
  );
};

export interface ProfileFormValues {
  name: string;
  email: string;
  password?: string;
  birthdate: Date | null;
  profileImage?: File | null;
}

export const profileValidationScheme = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().optional(), // Opcional para edição de perfil
  birthdate: Yup.date()
    .nullable()
    .required('Date of birth is required')
    .max(new Date(), 'Date cannot be in the future')
    .max(getMaxBirthDate(), 'Minimum age is 6 years old'), // Ajuste na mensagem
  profileImage: Yup.mixed<File>()
    .nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true; // Permite nulo
      return value instanceof File && value.type.startsWith('image/');
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 5 * 1024 * 1024; // 5MB
    }),
});
