"use client";

import { useFormik, FormikHelpers } from "formik";
import { FieldError, InputText } from "@/components/common/input";
import { Button } from "@/components";
import { CustomDatePicker } from "@/components";
import { ProfileFormValues, profileValidationScheme } from "@/app/profile/profileFormSchema";
import { useState } from "react";

interface ProfileFormProps {
  user: {
    name: string;
    email: string;
    birthdate: Date | null;
    profileImage?: File | null;
  };
  
  onSubmit: (
    values: ProfileFormValues,
    formikHelpers: FormikHelpers<ProfileFormValues>
  ) => void;
  loading?: boolean;
  onCancel: () => void;
}

export const ProfileForm = ({
  user,
  onSubmit,
  loading,
  onCancel,
}: ProfileFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { values, handleChange, handleSubmit, errors, setFieldValue } =
    useFormik<ProfileFormValues>({
      initialValues: {
        name: user.name,
        email: user.email,
        password: "", // Certifique-se de incluir este campo
        birthdate: user.birthdate,
        profileImage: user.profileImage || null,
      },
      validationSchema: profileValidationScheme,
      onSubmit,
    });

  // Lida com a troca de imagem de perfil
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFieldValue("profileImage", file);

    // Gerar uma pré-visualização da imagem
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo Nome */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">
          Name:
        </label>
        <InputText
          style="w-full dark:bg-gray-700"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <FieldError error={errors.name} />
      </div>

      {/* Campo Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
          Email:
        </label>
        <InputText
          style="w-full dark:bg-gray-700"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <FieldError error={errors.email} />
      </div>

      {/* Campo Senha */}
        {/* <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
            Password:
          </label>
          <InputText
            style="w-full dark:bg-gray-700"
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <FieldError error={errors.password} />
        </div> */}

      {/* Campo Data de Nascimento */}
      
      <div>
        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-900 dark:text-white">
          Birth Date:
        </label>
        <CustomDatePicker
          selected={values.birthdate}
          onChange={(date) => setFieldValue("birthdate", date)}
          allowFutureDates={false}
        />
        <FieldError error={errors.birthdate} />
      </div>

      {/* Campo Imagem de Perfil */}
      <div>
        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-900 dark:text-white">
          Profile Image:
        </label>
        {previewImage ? (
          <img
            src={previewImage}
            alt="Profile Preview"
            className="w-24 h-24 object-cover rounded-full border border-gray-300 mb-2"
          />
        ) : user.profileImage ? (
          <img
            src={URL.createObjectURL(user.profileImage)}
            alt="Profile Preview"
            className="w-24 h-24 object-cover rounded-full border border-gray-300 mb-2"
          />
        ) : null}

        <input
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        <FieldError error={errors.profileImage} />
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          style="bg-indigo-700 hover:bg-indigo-500"
          label="Save"
          disabled={loading}
        />
        <Button
          type="button"
          style="bg-red-700 hover:bg-red-500"
          label="Cancel"
          onClick={onCancel}
        />
      </div>
    </form>
  );
};
