// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '@/widgets/header';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
