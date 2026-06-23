import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute('/login')({
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    return typeof search.redirect === 'string' ? { redirect: search.redirect } : {};
  },
  component: lazyRouteComponent(() =>
    import('@/pages/login').then((m) => ({ default: m.LoginPage })),
  ),
});
