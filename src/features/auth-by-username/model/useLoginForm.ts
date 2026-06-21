import { useState } from 'react';
import { mapZodErrors, type FieldErrors } from '@/shared';
import { loginSchema, type LoginFormValues } from './auth-schema';
import { useLoginMutation } from './useLoginMutation';

type LoginFields = keyof LoginFormValues;

export interface UseLoginFormReturn {
  values: LoginFormValues;
  fieldErrors: FieldErrors<LoginFields>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  showPwd: boolean;
  togglePwd: () => void;
  handleChange: (field: LoginFields) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export function useLoginForm(redirectTo?: string): UseLoginFormReturn {
  const [values, setValues] = useState<LoginFormValues>({
    username: 'emilys',
    password: 'emilyspass',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<LoginFields>>({});
  const [showPwd, setShowPwd] = useState(false);
  const { mutate, isPending, isError, error } = useLoginMutation(redirectTo);

  const handleChange = (field: LoginFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      setFieldErrors(mapZodErrors<LoginFields>(result.error));
      return;
    }
    setFieldErrors({});
    mutate(result.data);
  };

  return {
    values,
    fieldErrors,
    isPending,
    isError,
    error,
    showPwd,
    togglePwd: () => setShowPwd((v) => !v),
    handleChange,
    handleSubmit,
  };
}
