import { queryOptions } from '@tanstack/react-query';
import { newsApi } from '../api/newsApi';
import { commentsApi } from '../api/commentsApi';
import { PAGE_SIZE } from '@/shared/config/constants';

const LIST_STALE_MS = 60_000;

export const newsQueries = {
  list: (page: number) =>
    queryOptions({
      queryKey: ['posts', 'list', page],
      queryFn: () => newsApi.getPosts(PAGE_SIZE, (page - 1) * PAGE_SIZE),
      staleTime: LIST_STALE_MS,
    }),

  listAll: () =>
    queryOptions({
      queryKey: ['posts', 'list', 'all'],
      queryFn: () => newsApi.getPosts(100, 0),
      staleTime: Infinity,
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: ['posts', 'detail', id],
      queryFn: () => newsApi.getPost(id),
      staleTime: LIST_STALE_MS,
    }),

  comments: (postId: number) =>
    queryOptions({
      queryKey: ['posts', 'comments', postId],
      queryFn: () => newsApi.getComments(postId),
      staleTime: LIST_STALE_MS,
    }),

  search: (q: string, page: number) =>
    queryOptions({
      queryKey: ['posts', 'search', q, page],
      queryFn: () => newsApi.searchPosts(q, PAGE_SIZE, (page - 1) * PAGE_SIZE),
      enabled: q.trim().length > 0,
    }),
  commentsCountMap: () =>
    queryOptions({
      queryKey: ['posts', 'comments-count-map'],
      queryFn: async () => {
        const data = await commentsApi.listAllPostIds();

        return data.comments.reduce<Record<number, number>>((acc, comment) => {
          acc[comment.postId] = (acc[comment.postId] ?? 0) + 1;
          return acc;
        }, {});
      },
      staleTime: Infinity,
    }),
};
