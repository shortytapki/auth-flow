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

export interface UserInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  photo: string;
  tokens: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
}

export interface RegistrationResponse {
  message: string;
  success: boolean;
}

export interface VerificationResponse {
  message: string;
  success: boolean;
}

export interface LoginResponse {
  message: string;
  success: boolean;
  user?: UserInfo;
}

export * from "./index";
