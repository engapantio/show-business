import { useNavigate } from '@tanstack/react-router';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { authApi, type LoginPayload, type LoginResponse } from '../api/auth-api';
import { setAuthState } from './auth-store';
import { findRegisteredUser } from './registered-users-store';

export function useLoginMutation(
  redirectTo?: string,
): UseMutationResult<LoginResponse, Error, LoginPayload> {
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const local = await findRegisteredUser(payload.username, payload.password);
      if (local) {
        return {
          accessToken: `registered-${local.id}`,
          id: local.id,
          username: local.username,
          firstName: local.username,
          lastName: '',
          image: '',
        } satisfies LoginResponse;
      }
      return authApi.login(payload);
    },
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
      navigate({ to: redirectTo ?? '/inspiration' });
    },
  });
}
