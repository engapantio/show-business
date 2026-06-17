import { apiGet } from '@/shared/api/client';
import type { Post, PostsResponse, CommentsResponse } from '../model/types';

export const newsApi = {
  getPosts: (limit: number, skip: number) =>
    apiGet<PostsResponse>(`/posts?limit=${limit}&skip=${skip}`),

  getPost: (id: number) => apiGet<Post>(`/posts/${id}`),

  searchPosts: (q: string, limit = 10, skip = 0) =>
    apiGet<PostsResponse>(`/posts/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`),

  getComments: (postId: number) => apiGet<CommentsResponse>(`/posts/${postId}/comments?limit=30`),

  getRandomPost: () => apiGet<Post>(`/posts/${Math.ceil(Math.random() * 150)}`),
};
