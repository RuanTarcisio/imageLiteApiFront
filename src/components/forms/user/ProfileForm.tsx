"use client";

import { useFormik } from "formik";
import { FieldError, InputText } from "@/components/common/input";
import { Button } from "@/components";
import { CustomDatePicker } from "@/components";
import { ProfileFormValues, profileValidationScheme } from "@/app/me/profile/profileFormSchema"
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
  onCancel?: () => void;
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

  const getImageUrl = () => {
    if (previewImage) return previewImage;
    if (values.profileImage instanceof File) return URL.createObjectURL(values.profileImage);
    if (typeof user.profileImage === 'string') return user.profileImage;
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Profile Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full border-4 border-indigo-200 dark:border-indigo-800 group-hover:opacity-80 transition-opacity"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
            <label className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <div className="bg-black bg-opacity-50 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <FieldError error={errors.profileImage} />
          <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Click on image to change</span>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <InputText
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              style="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
            />
            <FieldError error={errors.name} />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <InputText
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              style="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
            />
            <FieldError error={errors.email} />
          </div>

          {/* Birthdate Field */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Birth Date
            </label>
            <CustomDatePicker
              selected={values.birthdate}
              onChange={(date) => setFieldValue("birthdate", date)}
              allowFutureDates={false}
              // className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
            <FieldError error={errors.birthdate} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {onCancel && (
            <Button
              type="button"
              btnStyle="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-lg transition-colors"
              label="Cancel"
              onClick={onCancel}
            />
          )}
          <Button
            type="submit"
            btnStyle="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-70"
            label={loading ? "Saving..." : "Save Changes"}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};