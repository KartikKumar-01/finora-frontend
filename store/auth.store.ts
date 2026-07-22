import { authApi } from "@/lib/api/auth.api";
import { clearToken } from "@/lib/token";
import {
  AuthState,
  AuthStore,
  LoginRequest,
  OAuthProvider,
  SignUpRequest,
} from "@/types/auth.types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  initialized: false,
  error: null,
};

export const authStore = create<AuthStore>()(
  devtools(
    (set) => ({
      ...initialState,
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null }, false, "auth/loginStart");
        try {
          const { success, message, data: user } = await authApi.login(credentials);

          if (!success) throw Error(message);

          set(
            {
              user,
              isAuthenticated: true,
              isLoading: false,
            },
            false,
            "auth/loginSuccess"
          );
        } catch (err) {
          const error = err instanceof Error ? err.message : "Login failed";
          set({ error, isLoading: false }, false, "auth/loginError");
          throw err;
        }
      },
      signup: async (credentials: SignUpRequest) => {
        set({ isLoading: true, error: null }, false, "auth/signupStart");
        try {
          const { success, message, data: user } = await authApi.signup(credentials);

          if (!success) throw Error(message);

          set(
            {
              user,
              isAuthenticated: true,
              isLoading: false,
            },
            false,
            "auth/signupSuccess"
          );
        } catch (err) {
          const error = err instanceof Error ? err.message : "Signup failed";
          set({ error, isLoading: false }, false, "auth/signupError");
          throw err;
        }
      },
      loginWithOAuth: (provider: OAuthProvider) => {
        if (typeof window !== "undefined") {
          window.location.href = authApi.getOAuthUrl(provider);
        }
      },
      hydrate: async () => {
          set({isLoading: true, error: null}, false, "auth/hydrateStart");
          try{
              const user = await authApi.getMe();
              set(
                  {user, isAuthenticated: true, isLoading: false, initialized: true},
                  false,
                  "auth/hydrateSuccess",
              );
          }catch{
              set(
                  {...initialState, isLoading: false, initialized: true},
                  false,
                  "auth/hydrateError",
              );
          }
      },
      handleOAuthCallback: async (code: string) => {
        set({ isLoading: true, error: null }, false, "auth/oauthStart");
        try {
          const { success, message, data: user } = await authApi.handleOAuthCallback(
            code
          );
          if (!success) throw new Error(message);

          set(
            {
              user,
              isAuthenticated: true,
              isLoading: false,
            },
            false,
            "auth/oauthSuccess"
          );
        } catch (err) {
          clearToken();
          const error =
            err instanceof Error ? err.message : "OAuth login failed.";
          set(
            {
              ...initialState,
              error,
              isLoading: false,
            },
            false,
            "auth/oauthError"
          );
          throw err;
        }
      },
      logout: async () => {
        try{
          await authApi.logout();
        }finally{
          set({ ...initialState , initialized: true}, false, "auth/logout");
        }
      },
      clearError: () => set({ error: null }, false, "auth/clearError"),
    }),
    { name: "AuthStore" }
  )
);
