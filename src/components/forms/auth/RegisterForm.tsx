"use client";

import { useFormik } from "formik";
import { FieldError, InputText } from "../../common/input";
import { Button } from "@/components";
import {
  RegisterFormValues,
  registerValidationScheme,
} from "@/app/register/registerFormSchema";
import { CustomDatePicker } from "@/components";
import { ChangeEvent, useEffect, useState } from "react";

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
  onCancel: () => void;
}

export const RegisterForm = ({ onSubmit, onCancel }: RegisterFormProps) => {
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
  } = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordMatch: "",
      birthdate: null,
      cpf: "",
      profileImage: null,
    },
    validationSchema: registerValidationScheme,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
      } catch (error) {
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericCpf = e.target.value.replace(/\D/g, "");
    setFieldValue("cpf", numericCpf);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      setFieldValue("profileImage", file);

      // Criar URL para preview da imagem
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setFieldValue("profileImage", null);
    setImagePreview(null);
  };
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Name:
        </label>
        <InputText
          style="w-full dark:bg-gray-700"
          id="name"
          value={values.name}
          onChange={handleChange}
        />
        <FieldError error={touched.name ? errors.name : null} />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Email:
        </label>
        <InputText
          style="w-full dark:bg-gray-700"
          id="email"
          value={values.email}
          onChange={handleChange}
        />
        <FieldError error={touched.email ? errors.email : null} />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Password:
        </label>
        <InputText
          style="w-full dark:bg-gray-700"
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
        />
        <FieldError error={touched.password ? errors.password : null} />
      </div>

      <div>
        <label
          htmlFor="passwordMatch"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Repeat Password:
        </label>
        <InputText
          style="w-full dark:bg-gray-700"
          type="password"
          id="passwordMatch"
          value={values.passwordMatch}
          onChange={handleChange}
        />
        <FieldError
          error={touched.passwordMatch ? errors.passwordMatch : null}
        />
      </div>
      <div>
        <label
          htmlFor="cpf"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          CPF:
        </label>
        <InputText
          style="w-full dark:bg-gray-700"
          id="cpf"
          value={values.cpf}
          onChange={handleCpfChange} // Apenas números
        />
        <FieldError error={touched.cpf ? errors.cpf : null} />
      </div>

      <div>
        <label
          htmlFor="birthdate"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Data de Nascimento:
        </label>
        <CustomDatePicker
          selected={values.birthdate}
          onChange={(date) => setFieldValue("birthdate", date)}
          allowFutureDates={false}
        />
        <div></div>
        <FieldError error={touched.birthdate ? errors.birthdate : null} />
      </div>

      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
          Profile Image:
        </label>
        <input
          type="file"
          name="profileImage" // <- ESSENCIAL
          accept="image/*"
          onChange={handleFileChange}
          onBlur={() => setFieldTouched("profileImage", true)}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
        {imagePreview && (
          <div className="mt-2 flex items-center gap-4">
            <img
              src={imagePreview}
              alt="Profile preview"
              className="w-20 h-20 object-cover rounded-md border"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        )}
        <FieldError error={touched.profileImage ? errors.profileImage : null} />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          className="bg-indigo-700 hover:bg-indigo-500 text-white"
          label="Register"
        />
        <Button
          type="button"
          className="bg-red-700 hover:bg-red-500 text-white"
          label="Cancel"
          onClick={onCancel}
        />
      </div>
    </form>
  );
};
