import { httpGet } from '@/shared/api/http';
import type { CommentsResponse } from '../model/types';

export const commentApi = {
  getByPostId: (postId: number): Promise<CommentsResponse> =>
    httpGet<CommentsResponse>(`/comments/post/${postId}`),
};
