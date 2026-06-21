import { isApiError } from '@/shared/api/apiError';

const STATUS_MESSAGES: Record<number, string> = {
  400: 'The request was invalid. Please check your details and try again.',
  401: 'Incorrect username or password.',
  403: "You don't have permission to do that.",
  404: 'The requested resource was not found.',
  409: 'An account with these details already exists.',
  422: 'Some fields are invalid. Please review your input.',
  429: 'Too many attempts. Please wait a moment and try again.',
  500: 'Something went wrong on our end. Please try again later.',
  503: 'The service is temporarily unavailable. Please try again later.',
};

const FALLBACK = 'An unexpected error occurred. Please try again.';

export function getApiErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return STATUS_MESSAGES[error.status] ?? FALLBACK;
  }
  if (error instanceof Error) return error.message;
  return FALLBACK;
}
