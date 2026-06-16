import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { commentApi } from '../api/comment-api';
import { commentKeys } from './query-keys';
import type { CommentsResponse } from './types';

export function useCommentsQuery(postId: number): UseQueryResult<CommentsResponse, Error> {
  return useQuery({
    queryKey: commentKeys.byPost(postId),
    queryFn: () => commentApi.getByPostId(postId),
  });
}
