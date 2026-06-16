import { httpPost } from '@/shared/api/http';

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

export const authApi = {
  login: (payload: LoginPayload): Promise<LoginResponse> =>
    httpPost<LoginResponse>('/auth/login', { ...payload, expiresInMins: 60 }),
};
