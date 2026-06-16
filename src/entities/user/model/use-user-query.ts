import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { userApi } from '../api/user-api';
import { userKeys } from './query-keys';
import type { User } from './types';

export function useUserQuery(id: number): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getById(id),
    enabled: id > 0,
  });
}
