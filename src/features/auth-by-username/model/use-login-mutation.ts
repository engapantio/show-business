import { useNavigate } from '@tanstack/react-router';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { authApi, type LoginPayload, type LoginResponse } from '../api/auth-api';
import { setAuthState } from './auth-store';
import { Route } from '@/routes/login';

export function useLoginMutation(): UseMutationResult<LoginResponse, Error, LoginPayload> {
  const navigate = useNavigate();
  const search = Route.useSearch();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: (payload) => authApi.login(payload),
    onSuccess: (data) => {
      setAuthState({
        token: data.accessToken,
        user: {
          id: data.id,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
        },
      });
      navigate({ to: search.redirect ?? '/inspiration' });
    },
  });
}
