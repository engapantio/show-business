import { createFileRoute } from '@tanstack/react-router';
import { ExplorePage } from '@/pages/explore';
import { newsQueries } from '@/entities/news';

export const Route = createFileRoute('/explore')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(newsQueries.listAll()),
  component: ExplorePage,
});
