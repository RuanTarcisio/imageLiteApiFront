import * as Yup from 'yup';

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  passwordMatch: string;
}

export const registerValidationScheme = Yup.object().shape({
  name: Yup.string().required('Name is required!'),
  email: Yup.string().trim().required('Email is required!').email('Invalid Email!'),
  password: Yup.string().required('Password is required').min(8, 'Password must have at least 8 characters!'),
  passwordMatch: Yup.string().oneOf([Yup.ref('password')], 'Password must match!'),
});