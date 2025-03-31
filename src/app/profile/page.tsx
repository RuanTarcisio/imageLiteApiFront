"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, useNotification, ProfileForm, Template } from "@/components";
import { useTheme } from "next-themes";
import { useUserService, UserDto, useAuth } from "@/resources";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserDto>({} as UserDto);
  const auth = useAuth(); 
  const notification = useNotification();
  const { theme, systemTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const userService = useUserService();

  useEffect(() => {
    setIsMounted(true);
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const userData = await userService.getProfile();
        // const profileImage = await userService.ge

      setUser({
        name: userData.name ?? "",
        email: userData.email ?? "",
        cpf: userData.cpf ?? "",
        birthdate: userData.birthdate ? new Date(userData.birthdate) : null,
        profileImage: userData.profileImage ?? "",
      });
    } catch (error: any) {
      notification.notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (values: {
    name: string;
    email: string;
    password?: string;
    birthdate: Date | null;
    profileImage?: File | null;
  }) => {
    try {
      setLoading(true);

      await userService.updateProfile(values);
      notification.notify("Profile updated successfully!", "success");

      setUser((prevUser) => ({
        ...prevUser,
        name: values.name,
        email: values.email,
        birthdate: values.birthdate,
        profileImage: values.profileImage
          ? URL.createObjectURL(values.profileImage)
          : prevUser.profileImage, // Mantém a imagem caso não tenha sido alterada
      }));

      setIsEditing(false);
    } catch (error: any) {
      notification.notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const currentTheme = isMounted
    ? theme === "system"
      ? systemTheme
      : theme
    : "light";

  if (!isMounted) return null;

  return (
    <Template loading={loading}>
      <div
        className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 
        ${
          currentTheme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight dark:text-white">
            User Profile
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {isEditing ? (
            <ProfileForm
              user={{
                name: user.name ?? "",
                email: user.email ?? "",
                birthdate: user.birthdate ?? null,
                profileImage:
                  user.profileImage instanceof File ? user.profileImage : null,
              }}
              onSubmit={handleUpdateProfile}
              loading={loading}
              onCancel={toggleEditMode}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
  {/* Name */}
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Name:</span>
    <p className="text-sm text-gray-900 dark:text-white">{user.name || "N/A"}</p>
  </div>

  {/* Email */}
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email:</span>
    <p className="text-sm text-gray-900 dark:text-white">{user.email || "N/A"}</p>
  </div>

  {/* CPF */}
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cpf:</span>
    <p className="text-sm text-gray-900 dark:text-white">{user.cpf || "N/A"}</p>
  </div>

  {/* Birthdate */}
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Birthdate:</span>
    <p className="text-sm text-gray-900 dark:text-white">
      {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : "N/A"}
    </p>
  </div>

  {/* Profile Image */}
  <div className="flex items-center gap-4">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Image:</span>
    {user.profileImage ? (
      <img
        src={
          user.profileImage instanceof File
            ? URL.createObjectURL(user.profileImage)
            : user.profileImage
        }
        alt="Profile"
        className="h-20 w-20 rounded-full object-cover border border-gray-300 dark:border-gray-600"
      />
    ) : (
      <span className="text-sm text-gray-500">No image</span>
    )}
  </div>

  {/* Buttons */}
  <div className="flex justify-end">
    <Button
      type="button"
      style="bg-indigo-700 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow"
      label="Edit"
      onClick={toggleEditMode}
    />
  </div>
</div>

          )}
        </div>
      </div>
    </Template>
  );
}
