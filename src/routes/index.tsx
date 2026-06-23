import { createFileRoute, type SearchSchemaInput } from '@tanstack/react-router';
import { newsQueries } from '@/entities/news';
import { HomePage } from '@/pages/home';

export const Route = createFileRoute('/')({
  validateSearch: (search: unknown & SearchSchemaInput) => {
    const next = search as { page?: number };
    return {
      page: next.page ?? 1,
    };
  },
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: ({ context: { queryClient }, deps: { page } }) =>
    queryClient.ensureQueryData(newsQueries.list(page ?? 1)),
  component: HomePage,
});
