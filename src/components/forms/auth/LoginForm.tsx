"use client";

import { LoginFormValues, loginValidationScheme } from "@/app/login/formScheme";
import { InputText, Button, FieldError } from "@/components";
import { useFormik } from "formik";
import { useAuthStore } from "@/contexts/AuthStore"; 
import { FaGithub, FaGoogle } from "react-icons/fa";

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
}

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const auth = useAuthStore();  
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
          className="bg-indigo-100 hover:bg-indigo-500 dark:text-white dark:bg-gray-700"
          label={loading ? "Logging in..." : "Confirmar"}
          disabled={loading}
        />
      </form>

      <div className="relative">
        <div className="relative flex justify-center text-xs uppercase font-bold">
          <span className="bg-background px-2 text-muted-foreground ">
            Ou continue com:
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <Button
          variant="outline"
          type="button"
          disabled={loading}
          className="w-full bg-red-700"
          onClick={handleGoogleLogin}
        >
          <div className="flex items-center justify-center px-6 py-2">
            <FaGoogle className="mr-2 h-4 w-5" /> {/* Ícone do Google */}
            <span>Google</span>
          </div>
        </Button>

        <Button
         variant="outline"
          type="button"
          disabled={loading}
          className="w-full bg-gray-600"
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
