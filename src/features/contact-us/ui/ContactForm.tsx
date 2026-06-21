// src/features/contact-us/ui/ContactForm.tsx
import { Box, Alert } from '@mui/material';
import { FormField, AppButton } from '@/shared';
import { useContactForm } from '../model/useContactForm';

export function ContactForm() {
  const { values, fieldErrors, isPending, isError, error, handleChange, handleSubmit } =
    useContactForm();

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}
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

      {isError && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error?.message}
        </Alert>
      )}

      <AppButton
        type="submit"
        size="large"
        loading={isPending}
        sx={{ py: 1.5, mt: 1, px: 6, alignSelf: 'center' }}
      >
        {isPending ? 'Sending…' : 'Leave Comment'}
      </AppButton>
    </Box>
  );
}
