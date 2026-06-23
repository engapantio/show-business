import { RegisterPage } from '@/pages/register';
import { createFileRoute } from '@tanstack/react-router';

type RegisterSearch = {
  redirect?: string;
};

export const Route = createFileRoute('/register')({
  validateSearch: (search: Record<string, unknown>): RegisterSearch => {
    return typeof search.redirect === 'string' ? { redirect: search.redirect } : {};
  },
  component: RegisterPage,
});
