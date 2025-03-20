"use client";

import { LoginFormValues, loginValidationScheme } from "@/app/login/formScheme";
import { InputText, Button, FieldError } from "@/components";
import { useFormik } from "formik";
import { useAuth } from "@/resources";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
}

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const auth = useAuth(); // Use o AuthService
  const { values, handleChange, handleSubmit, errors } =
    useFormik<LoginFormValues>({
      initialValues: { email: "", password: "" },
      validationSchema: loginValidationScheme,
      onSubmit,
    });

  // Função para redirecionar para o login com Google
  const handleGoogleLogin = () => {
    auth.redirectToSocialLogin("google");
  };

  // Função para redirecionar para o login com GitHub
  const handleGitHubLogin = () => {
    auth.redirectToSocialLogin("github");
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
            Email:{" "}
          </label>
          <InputText
            style="w-full dark:bg-gray-700"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
          <FieldError error={errors.email} />
        </div>

        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
            Password:{" "}
          </label>
          <InputText
            style="w-full dark:bg-gray-700"
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
          <FieldError error={errors.password} />
        </div>

        <Button
          type="submit"
          style="bg-indigo-100 hover:bg-indigo-500 dark:text-white dark:bg-gray-700"
          label={loading ? "Logging in..." : "Confirm"}
          disabled={loading}
        />
      </form>

      <div className="relative">
        {/* <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div> */}
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <Button
          style="bg-red-700"
          variant="outline"
          type="button"
          disabled={loading}
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <div className="flex items-center justify-center px-6 py-2">
            <FaGoogle className="mr-2 h-4 w-5" /> {/* Ícone do Google */}
            <span>Google</span>
          </div>
        </Button>

        <Button
          style="bg-gray-800"
          variant="outline"
          type="button"
          disabled={loading}
          className="w-full"
          onClick={handleGitHubLogin}
        >
          <div className="flex items-center justify-center px-6 py-2">
            <FaGithub className="mr-2 h-4 w-5" /> {/* Ícone do GitHub */}
            <span className="text-white">GitHub</span>
          </div>
        </Button>
      </div>
    </div>
  );
};
