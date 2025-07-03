import type { User } from "../../../entities/user/model/types";

export interface RegistrationData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerificationData {
  code: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  registrationEmail: string | null;
}
