// client/types/auth.ts

export interface User {
  id: string;
  username: string;
  email: string;
  // Otros campos del usuario
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}