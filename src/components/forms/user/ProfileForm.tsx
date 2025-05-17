"use client";

import { useFormik } from "formik";
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
    profileImage?: string | File | null;
  };
  onSubmit: (values: ProfileFormValues) => Promise<void> | void;
  loading?: boolean;
  onCancel?: () => void; // Tornando opcional
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
        password: "",
        birthdate: user.birthdate,
        profileImage: null,
      },
      validationSchema: profileValidationScheme,
      onSubmit,
    });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFieldValue("profileImage", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  // Obter URL da imagem para exibição
  const getImageUrl = () => {
    if (previewImage) return previewImage;
    if (values.profileImage instanceof File) return URL.createObjectURL(values.profileImage);
    if (typeof user.profileImage === 'string') return user.profileImage;
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo Nome */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Name:
        </label>
        <InputText
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          style="w-full dark:bg-gray-700"
        />
        <FieldError error={errors.name} />
      </div>

      {/* Campo Email */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Email:
        </label>
        <InputText
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          style="w-full dark:bg-gray-700"
        />
        <FieldError error={errors.email} />
      </div>

      {/* Campo Data de Nascimento */}
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
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
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Profile Image:
        </label>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Profile Preview"
            className="w-24 h-24 object-cover rounded-full border border-gray-300 mb-2"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
        <FieldError error={errors.profileImage} />
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            btnStyle="bg-red-700 hover:bg-red-500"
            label="Cancel"
            onClick={onCancel}
          />
        )}
        <Button
          type="submit"
          btnStyle="bg-indigo-700 hover:bg-indigo-500"
          label={loading ? "Saving..." : "Save"}
          disabled={loading}
        />
      </div>
    </form>
  );
};