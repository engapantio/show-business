import type { ZodError } from 'zod';

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export function mapZodErrors<T extends string>(error: ZodError): FieldErrors<T> {
  const result: Partial<Record<string, string>> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !result[key]) {
      result[key] = issue.message;
    }
  }

  return result as FieldErrors<T>;
}
