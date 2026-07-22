import { ApiResponse, AuthResponse, LoginRequest, OAuthCallbackCode, SignUpRequest, User} from "@/types/auth.types";
import { api } from "../axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";


export const authApi = {
    login: async (
        credentials: LoginRequest
    ): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/login", credentials);
        return response.data;
    },
    signup: async (
        data: SignUpRequest
    ): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>("/auth/signup", data);
        return response.data;
    },
    getOAuthUrl: (provider: "GOOGLE" | "GITHUB"): string => {
        return `${BASE_URL}/oauth2/authorization/${provider.toLowerCase()}`
    },
    handleOAuthCallback: async (code: OAuthCallbackCode): Promise<AuthResponse> => {
        const response = await api.get<AuthResponse>(`/auth/exchange-details?code=${code}`);
        return response.data;
    },
    getMe: async (): Promise<User> => {
        const response = await api.get<ApiResponse<User>>('/auth/get-me');
        return response.data.data;
    },
    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
    }
}