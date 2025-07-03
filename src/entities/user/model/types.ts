export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  photo: string;
  tokens: number;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
