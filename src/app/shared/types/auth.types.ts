export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginRequest extends LoginCredentials { }

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthSession {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: number;
}

export interface LogoutResponse {
  message: string;
}
