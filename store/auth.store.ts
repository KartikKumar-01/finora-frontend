import { authApi } from "@/lib/api/auth.api";
import { clearToken, persistToken } from "@/lib/token";
import {
  AuthState,
  AuthStore,
  LoginRequest,
  OAuthProvider,
  SignUpRequest,
  User,
} from "@/types/auth.types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authStore = create<AuthStore>()(
  devtools(
    (set) => ({
      ...initialState,
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null }, false, "auth/loginStart");
        try {
          const { success, message, data } = await authApi.login(credentials);

          if (!success) throw Error(message);

          const user: User = {
            id: data.userId,
            name: data.name,
            email: data.email,
            avatarUrl: data.avatarUrl,
            provider: data.authProvider,
          };
          persistToken(data.accessToken);
          set(
            {
              accessToken: data.accessToken,
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
          const { success, message, data } = await authApi.signup(credentials);

          if (!success) throw Error(message);

          const user: User = {
            id: data.userId,
            name: data.name,
            email: data.email,
            avatarUrl: data.avatarUrl,
            provider: data.authProvider,
          };

          persistToken(data.accessToken);
          set(
            {
              accessToken: data.accessToken,
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
      setTokens: async (accessToken: string) => {
          set({isLoading: true, error: null}, false, "auth/hydrateStart");
          try{
              persistToken(accessToken);
              const user = await authApi.getMe();
              set(
                  {accessToken, user, isAuthenticated: true, isLoading: false},
                  false,
                  "auth/hydrateSuccess",
              );
          }catch{
              clearToken();
              set(
                  {...initialState, isLoading: false},
                  false,
                  "auth/hydrateError",
              );
          }
      },
      handleOAuthCallback: async (code: string) => {
        set({ isLoading: true, error: null }, false, "auth/oauthStart");
        try {
          const { success, message, data } = await authApi.handleOAuthCallback(
            code
          );
          if (!success) throw new Error(message);

          const user: User = {
            id: data.userId,
            name: data.name,
            email: data.email,
            avatarUrl: data.avatarUrl,
            provider: data.authProvider,
          };
          persistToken(data.accessToken);

          set(
            {
              accessToken: data.accessToken,
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
      logout: () => {
        clearToken();
        set({ ...initialState }, false, "auth/logout");
      },
      clearError: () => set({ error: null }, false, "auth/clearError"),
    }),
    { name: "AuthStore" }
  )
);
