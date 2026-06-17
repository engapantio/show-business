import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { authApi, type LoginPayload, type LoginResponse } from '../api/auth-api';
import { setAuthState } from './auth-store';

export function useLoginMutation(): UseMutationResult<LoginResponse, Error, LoginPayload> {
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
    },
  });
}
