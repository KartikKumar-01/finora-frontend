export interface User {
    userId: string;
    name: string;
    email: string;
    avatarUrl?: string;
    authProvider?: "EMAIL" | "GOOGLE" | "GITHUB";
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


export type AuthResponse = ApiResponse<User>;

export type OAuthProvider = "GOOGLE" | "GITHUB";

export type OAuthCallbackCode = string

export type TokenResponse = ApiResponse<AuthTokens>

export interface AuthState{
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    initialized: boolean;
    error: string | null;
}

export interface AuthActions{
    login: (credentials: LoginRequest) => Promise<void>;
    signup: (data: SignUpRequest) => Promise<void>;
    loginWithOAuth: (provider: OAuthProvider) => void;
    handleOAuthCallback: (code: string) => Promise<void>
    logout: () => void;
    clearError: () => void;
    hydrate: () => Promise<void>;
}

export type AuthStore = AuthState & AuthActions;