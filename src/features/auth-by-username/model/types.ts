export interface AuthUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
}
