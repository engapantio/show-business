import { httpGet } from '@/shared/api/http';
import type { User } from '../model/types';

export const userApi = {
  getById: (id: number): Promise<User> => httpGet<User>(`/users/${id}`),
};
