import { useState } from 'react';
import { mapZodErrors, type FieldErrors } from '@/shared';
import { contactSchema, type ContactFormValues } from './contact-schema';
import { useContactSubmitMutation } from './useContactSubmitMutation';

type ContactFields = keyof ContactFormValues;

export interface UseContactFormReturn {
  values: ContactFormValues;
  fieldErrors: FieldErrors<ContactFields>;
  isPending: boolean;
  isError: boolean;
  isSubmitted: boolean;
  error: Error | null;
  handleChange: (
    field: ContactFields,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  handleReset: () => void;
}

const INITIAL_VALUES: ContactFormValues = { name: '', email: '', message: '' };

export function useContactForm(): UseContactFormReturn {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<ContactFields>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate, isPending, isError, error, reset } = useContactSubmitMutation();

  const handleChange =
    (field: ContactFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      setFieldErrors(mapZodErrors<ContactFields>(result.error));
      return;
    }
    setFieldErrors({});
    mutate(result.data, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
    });
  };

  const handleReset = (): void => {
    setValues(INITIAL_VALUES);
    setFieldErrors({});
    setIsSubmitted(false);
    reset();
  };

  return {
    values,
    fieldErrors,
    isPending,
    isError,
    isSubmitted,
    error,
    handleChange,
    handleSubmit,
    handleReset,
  };
}
