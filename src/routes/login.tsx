import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '@/pages/login';

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return typeof search.redirect === 'string' ? { redirect: search.redirect } : {};
  },
  component: LoginPage,
});
