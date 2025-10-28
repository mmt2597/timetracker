import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authApi } from "~/api/auth";
import { useAuthStore } from "~/store/auth";
import { ROUTES, QUERY_KEYS } from "~/config/constants";
import type { LoginCredentials, RegisterData, ApiError } from "~/types/auth.types";

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate(ROUTES.DASHBOARD);
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate(ROUTES.DASHBOARD);
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
    },
    onError: () => {
      // Even if API call fails, clear local auth
      clearAuth();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
    },
  });
}

export function useAuth() {
  const { user, isAuthenticated, token } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    token,
  };
}
