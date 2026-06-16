import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { postApi } from '../api/post-api';
import { postKeys } from './query-keys';
import type { PostsResponse } from './types';

export function usePostsQuery(limit: number, skip: number): UseQueryResult<PostsResponse, Error> {
  return useQuery({
    queryKey: postKeys.list(limit, skip),
    queryFn: () => postApi.getAll(limit, skip),
  });
}

export function usePostSearchQuery(
  q: string,
  limit: number,
  skip: number,
): UseQueryResult<PostsResponse, Error> {
  return useQuery({
    queryKey: postKeys.search(q, limit, skip),
    queryFn: () => postApi.search(q, limit, skip),
    enabled: q.length > 0,
  });
}

export function usePostsByTagQuery(
  tag: string,
  limit: number,
  skip: number,
): UseQueryResult<PostsResponse, Error> {
  return useQuery({
    queryKey: postKeys.byTag(tag, limit, skip),
    queryFn: () => postApi.getByTag(tag, limit, skip),
    enabled: tag.length > 0,
  });
}
