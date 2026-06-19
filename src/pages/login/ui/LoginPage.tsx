import { LoginForm } from '@/features/auth-by-username';
import { AuthLayout } from '@/widgets/auth-layout';
import { Route } from '@/routes/login';

export function LoginPage() {
  const search = Route.useSearch();
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to find inspiration"
      redirect={search.redirect}
    >
      <LoginForm redirectTo={search.redirect} />
    </AuthLayout>
  );
}
