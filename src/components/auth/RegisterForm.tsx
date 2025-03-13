'use client';


import { useFormik } from 'formik';
import { FieldError, InputText } from '../common/input';
import { Button } from '@/components';
import { RegisterForm as RegisterFormValues, registerValidationScheme } from '@/app/register/registerFormSchema';

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
  loading?: boolean;
  onCancel: () => void;
}

export const RegisterForm = ({ onSubmit, loading, onCancel }: RegisterFormProps) => {
  const { values, handleChange, handleSubmit, errors } = useFormik<RegisterFormValues>({
    initialValues: { name: '', email: '', password: '', passwordMatch: '' },
    validationSchema: registerValidationScheme,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Name: </label>
        <InputText
          style="w-full"
          id="name"
          value={values.name}
          onChange={handleChange}
        />
        <FieldError error={errors.name} />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Email: </label>
        <InputText
          style="w-full"
          id="email"
          value={values.email}
          onChange={handleChange}
        />
        <FieldError error={errors.email} />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Password: </label>
        <InputText
          style="w-full"
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
        />
        <FieldError error={errors.password} />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">Repeat Password: </label>
        <InputText
          style="w-full"
          type="password"
          id="passwordMatch"
          value={values.passwordMatch}
          onChange={handleChange}
        />
        <FieldError error={errors.passwordMatch} />
      </div>

      <Button
        type="submit"
        style="bg-indigo-700 hover:bg-indigo-500"
        label="Save"
        //disabled={loading}
      />
      <Button
        type="button"
        style="bg-red-700 hover:bg-red-500 mx-2"
        label="Cancel"
        onClick={onCancel}
      />
    </form>
  );
};