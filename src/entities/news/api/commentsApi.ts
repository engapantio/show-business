import { apiGet } from '@/shared/api/client';
import type { CommentsListResponse } from '../model/types';

export const commentsApi = {
  listAllPostIds: () => apiGet<CommentsListResponse>('/comments?limit=0&select=postId'),
};

