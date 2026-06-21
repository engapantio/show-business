import { FormShell, FormField, } from '@/shared';
import { useContactForm } from '../model/useContactForm';

export function ContactForm() {
  const { values, fieldErrors, isPending, isError, error, handleChange, handleSubmit } =
    useContactForm();

  return (
    <FormShell
      onSubmit={handleSubmit}
      isPending={isPending}
      isError={isError}
      error={error}
      submitLabel="Leave Comment"
      pendingLabel="Sending…"
      buttonSx={{ alignSelf: 'center', mx: 'auto', width: 'auto', px: 6 }}
    >
      <FormField
        label="Name"
        value={values.name}
        onChange={handleChange('name')}
        error={!!fieldErrors.name}
        helperText={fieldErrors.name}
        required
      />
      <FormField
        label="Email"
        type="email"
        value={values.email}
        onChange={handleChange('email')}
        error={!!fieldErrors.email}
        helperText={fieldErrors.email}
        required
      />
      <FormField
        label="Comment"
        value={values.message}
        onChange={handleChange('message')}
        error={!!fieldErrors.message}
        helperText={fieldErrors.message}
        multiline
        minRows={5}
        required
      />
    </FormShell>
  );
}
