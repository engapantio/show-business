import { createFileRoute, redirect } from '@tanstack/react-router';
import { getAuthState } from '@/features/auth-by-username';
import { InspirationPage } from '@/pages/inspiration';

export const Route = createFileRoute('/inspiration')({
  beforeLoad: ({ location }) => {
    const auth = getAuthState();

    if (!auth.token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: InspirationPage,
});
