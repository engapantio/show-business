import { Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import { FormShell, FormField } from '@/shared';
import { useContactForm } from '../model/useContactForm';

export function ContactForm() {
  const {
    values,
    fieldErrors,
    isPending,
    isError,
    isSubmitted,
    error,
    handleChange,
    handleSubmit,
    handleReset,
  } = useContactForm();

  if (isSubmitted) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
          py: 6,
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 56, color: 'primary.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Message sent!
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '40ch' }}>
          Thanks for reaching out. We'll get back to you as soon as possible.
        </Typography>
        <Button variant="outlined" onClick={handleReset} sx={{ mt: 1 }}>
          Send another message
        </Button>
      </Box>
    );
  }

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
