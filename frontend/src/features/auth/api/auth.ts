import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { LoginRequest } from "@/types/api";

export type RegisterCredentials = {
  username: string;
  email: string;
  fullname: string;
  password: string;
  dateOfBirth: string;
};

export const useLogin = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (data: LoginRequest) => apiClient.post("/auth/login", data),
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (data: RegisterCredentials) => apiClient.post("/auth/register", data),
    onSuccess: () => {
      router.push("/login");
    },
  });
};
