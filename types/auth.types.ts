export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    provider?: "EMAIL" | "GOOGLE" | "GITHUB";
}

export interface AuthTokens{
    accessToken: string;
}

export interface LoginRequest{
    email: string;
    password: string;
}

export interface SignUpRequest{
    name: string;
    email: string;
    password: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface AuthData{
    userId: string;
    name: string;
    email: string;
    avatarUrl?: string;
    authProvider?: OAuthProvider;
    accessToken: string;
}

export type AuthResponse = ApiResponse<AuthData>;

export type OAuthProvider = "GOOGLE" | "GITHUB";

export type OAuthCallbackCode = string

export type TokenResponse = ApiResponse<AuthTokens>

export interface AuthState{
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthActions{
    login: (credentials: LoginRequest) => Promise<void>;
    signup: (data: SignUpRequest) => Promise<void>;
    loginWithOAuth: (provider: OAuthProvider) => void;
    handleOAuthCallback: (code: string) => Promise<void>
    logout: () => void;
    clearError: () => void;
    setTokens: (accessToken: string) => Promise<void>;
}

export type AuthStore = AuthState & AuthActions;