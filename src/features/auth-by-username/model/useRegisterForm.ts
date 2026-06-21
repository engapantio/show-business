import { useState } from 'react';
import { mapZodErrors, type FieldErrors } from '@/shared';
import { registerSchema, type RegisterFormValues } from './auth-schema';
import { useRegisterMutation } from './useRegisterMutation';

type RegisterFields = keyof RegisterFormValues;

export interface UseRegisterFormReturn {
  values: RegisterFormValues;
  fieldErrors: FieldErrors<RegisterFields>;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  showPwd: boolean;
  togglePwd: () => void;
  handleChange: (field: RegisterFields) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export function useRegisterForm(redirectTo?: string): UseRegisterFormReturn {
  const [values, setValues] = useState<RegisterFormValues>({
    username: '',
    email: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<RegisterFields>>({});
  const [showPwd, setShowPwd] = useState(false);
  const { mutate, isPending, isError, error } = useRegisterMutation(redirectTo);

  const handleChange = (field: RegisterFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const result = registerSchema.safeParse(values);
    if (!result.success) {
      setFieldErrors(mapZodErrors<RegisterFields>(result.error));
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
