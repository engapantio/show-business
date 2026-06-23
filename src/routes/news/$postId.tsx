import { createFileRoute } from '@tanstack/react-router';
import { newsQueries } from '@/entities/news';
import { NewsDetailsPage } from '@/pages/news-details/';

export const Route = createFileRoute('/news/$postId')({
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(newsQueries.detail(Number(params.postId))),
  component: NewsDetailsPage,
});
