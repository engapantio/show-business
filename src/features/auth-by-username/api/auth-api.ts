import { httpPost } from '@/shared/api/client';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
}

export const authApi = {
  login: (payload: LoginPayload): Promise<LoginResponse> =>
    httpPost<LoginResponse>('/auth/login', { ...payload, expiresInMins: 60 }),
  register: (payload: RegisterPayload): Promise<RegisterResponse> =>
    httpPost<RegisterResponse>('/users/add', payload),
};
