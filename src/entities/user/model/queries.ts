import { queryOptions } from '@tanstack/react-query';
import { userApi } from '../api/userApi';

export const userQueries = {
  detail: (id: number) =>
    queryOptions({
      queryKey: ['users', 'detail', id],
      queryFn: () => userApi.getUser(id),
    }),
};
