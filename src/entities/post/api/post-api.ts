import { httpGet } from '@/shared/api/http';
import type { Post, PostsResponse } from '../model/types';

export const postApi = {
  getAll: (limit: number, skip: number): Promise<PostsResponse> =>
    httpGet<PostsResponse>(`/posts?limit=${limit}&skip=${skip}`),

  getById: (id: number): Promise<Post> => httpGet<Post>(`/posts/${id}`),

  search: (q: string, limit: number, skip: number): Promise<PostsResponse> =>
    httpGet<PostsResponse>(`/posts/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`),

  getByTag: (tag: string, limit: number, skip: number): Promise<PostsResponse> =>
    httpGet<PostsResponse>(`/posts/tag/${tag}?limit=${limit}&skip=${skip}`),
};
