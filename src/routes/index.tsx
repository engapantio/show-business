import { createFileRoute, type SearchSchemaInput } from '@tanstack/react-router';
import { HomePage } from '@/pages/home';

export const Route = createFileRoute('/')({
  validateSearch: (search: unknown & SearchSchemaInput) => {
    const next = search as { page?: number };
    return {
      page: next.page ?? 1,
    };
  },
  component: HomePage,
});
