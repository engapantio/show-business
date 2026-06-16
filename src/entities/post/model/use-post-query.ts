import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { postApi } from '../api/post-api';
import { postKeys } from './query-keys';
import type { Post } from './types';

export function usePostQuery(id: number): UseQueryResult<Post, Error> {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postApi.getById(id),
    enabled: id > 0,
  });
}
