import { useNavigate } from '@tanstack/react-router';
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { authApi, type RegisterPayload, type RegisterResponse } from '../api/auth-api';
import { setAuthState } from './auth-store';

export function useRegisterMutation(
  redirectTo?: string,
): UseMutationResult<RegisterResponse, Error, RegisterPayload> {
  const navigate = useNavigate();

  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuthState({
        token: `registered-${data.id}`,
        user: {
          id: data.id,
          username: data.username,
          firstName: data.username,
          lastName: '',
          image: '',
        },
      });

      navigate({ to: redirectTo ?? '/inspiration' });
    },
  });
}
