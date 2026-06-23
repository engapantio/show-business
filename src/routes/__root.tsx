import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { Header } from '@/widgets/header';
import { NotFoundPage } from '@/pages/not-found/ui/NotFound';
import { NewsPageSkeleton } from '@/widgets/news-page-skeleton';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  pendingComponent: PendingLayout,
  pendingMs: 200,
});

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function PendingLayout() {
  return (
    <>
      <Header />
      <NewsPageSkeleton />
    </>
  );
}
