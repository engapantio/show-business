import { apiGet } from '@/shared/api/client';
import type { User } from '../model/types';

export const userApi = {
  getUser: (id: number) => apiGet<User>(`/users/${id}`),
};
