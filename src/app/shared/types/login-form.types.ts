// src/app/shared/types/login-form.types.ts
import type { LoginCredentials } from './auth.types';

export interface LoginFormData extends LoginCredentials {
  rememberMe: boolean;
}
