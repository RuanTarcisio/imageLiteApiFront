import * as Yup from 'yup';

export interface LoginForm {
  email: string;
  password: string;
}

export const loginValidationScheme = Yup.object().shape({
  email: Yup.string().trim().required('Email is required!').email('Invalid Email!'),
  password: Yup.string().required('Password is required').min(8, 'Password must have at least 8 characters!'),
});