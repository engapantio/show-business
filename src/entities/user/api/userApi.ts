import { apiGet } from '@/shared/api/client';
import type { DJUser } from '../model/types';

export const userApi = {
  getUser: (id: number) => apiGet<DJUser>(`/users/${id}`),
};
