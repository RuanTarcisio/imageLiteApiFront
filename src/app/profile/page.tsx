"use client";

import { useEffect } from "react";
import { useNotification, ProfileForm, Template } from "@/components";
import { useUserStore } from "@/contexts/UserStore"; 

export default function ProfilePage() {
  const { user, loading, fetchUser, updateUser } = useUserStore();
  const notification = useNotification();

  const handleUpdateProfile = async (values: {
    name: string;
    email: string;
    password?: string;
    birthdate: Date | null;
    profileImage?: File | null;
  }) => {
    try {
      await updateUser(values);
      notification.notify("Profile updated successfully!", "success");
    } catch (error: any) {
      notification.notify(error.message, "error");
    }
  };

  useEffect(() => {
    if (!user && !loading) {
      fetchUser();
    }
  }, [user, loading, fetchUser]);

  if (!user) {
    return <Template loading={loading} />;
  }

  return (
    <Template>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            User Profile
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <ProfileForm
            user={{
              name: user.name ?? "",
              email: user.email ?? "",
              birthdate: user.birthdate ?? null,
              profileImage: user.profileImage
            }}
            onSubmit={handleUpdateProfile}
            loading={loading}
          />
        </div>
      </div>
    </Template>
  );
}