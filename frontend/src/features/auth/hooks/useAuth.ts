"use client";

import { useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    accessToken: session?.user?.accessToken,
  };
};

export const useRequireAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  return {
    user,
    isAuthenticated,
    isLoading,
  };
};
