import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

type RegisterSearch = {
  redirect?: string;
};

export const Route = createFileRoute('/register')({
  validateSearch: (search: Record<string, unknown>): RegisterSearch => {
    return typeof search.redirect === 'string' ? { redirect: search.redirect } : {};
  },
  component: lazyRouteComponent(() =>
    import('@/pages/register').then((m) => ({ default: m.RegisterPage })),
  ),
});
