import { queryOptions } from '@tanstack/react-query';
import { newsApi } from '../api/newsApi';
import { commentsApi } from '../api/commentsApi';
import { PAGE_SIZE } from '@/shared/config/constants';

export const newsQueries = {
  list: (page: number) =>
    queryOptions({
      queryKey: ['posts', 'list', page],
      queryFn: () => newsApi.getPosts(PAGE_SIZE, (page - 1) * PAGE_SIZE),
    }),

  listAll: () =>
    queryOptions({
      queryKey: ['posts', 'list', 'all'],
      queryFn: () => newsApi.getPosts(0, 0),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: ['posts', 'detail', id],
      queryFn: () => newsApi.getPost(id),
    }),

  comments: (postId: number) =>
    queryOptions({
      queryKey: ['posts', 'comments', postId],
      queryFn: () => newsApi.getComments(postId),
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
        }, {})
      },
    }),
};
