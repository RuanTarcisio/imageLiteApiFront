import * as Yup from 'yup';

const getMaxBirthDate = () => {
  const currentDate = new Date();
  return new Date(
    currentDate.getFullYear() - 6,
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
  profileImage?: File | null;
}

export const registerValidationScheme = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid e-mail format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
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
    .transform((value) => value.replace(/\D/g, ''))
    .matches(/^\d{11}$/, 'CPF must contain exactly 11 digits')
    .required('CPF is required'),
  profileImage: Yup.mixed()
    .nullable()
    .test('fileSize', 'File too large', (value) => {
      if (!value) return true; // optional
      return (value as File).size <= 5 * 1024 * 1024; // 5MB
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true; // optional
      return ['image/jpeg', 'image/png', 'image/gif'].includes((value as File).type);
    }),
});