import { RegisterForm } from '@/features/auth-by-username';
import { AuthLayout } from '@/widgets/auth-layout';
import { Route } from '@/routes/register';

export function RegisterPage() {
  const search = Route.useSearch();

  return (
    <AuthLayout title="Sign up" subtitle="Register to find inspiration" redirect={search.redirect}>
      <RegisterForm redirectTo={search.redirect} />
    </AuthLayout>
  );
}
