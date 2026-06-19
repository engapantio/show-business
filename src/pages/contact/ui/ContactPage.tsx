import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Stack, Alert } from '@mui/material';
import { mapZodErrors, type FieldErrors } from '@/shared';
import { contactSchema } from '@/features/contact-us';
import { useContactSubmitMutation } from '@/features/contact-us';

type ContactFields = 'name' | 'email' | 'message';

const initialValues = {
  name: '',
  email: '',
  message: '',
};

export function ContactPage() {
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<ContactFields>>({});
  const { mutate, isPending, isError, error, reset } = useContactSubmitMutation();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactSchema.safeParse(values);

    if (!result.success) {
      setFieldErrors(mapZodErrors<ContactFields>(result.error));
      return;
    }

    setFieldErrors({});

    mutate(result.data, {
      onSuccess: () => {
        // showToast('Comment submitted successfully', 'success'); // not implemented yet
        setValues(initialValues);
        setFieldErrors({});
        reset();
      },
    });
  };
  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          border: '1px solid #e8eaed',
          borderRadius: 3,
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'var(--third-family)',
                fontSize: { xs: '56px', md: '72px' },
                mb: 1,
              }}
            >
              Contact us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '60ch',
              }}
            >
              Send us a message and we will get back to you.
            </Typography>
          </Box>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
          >
            <TextField
              label="Name"
              value={values.name}
              onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
              error={!!fieldErrors.name}
              helperText={fieldErrors.name}
              fullWidth
            />

            <TextField
              label="Email"
              value={values.email}
              onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
              fullWidth
            />

            <TextField
              label="Comment"
              value={values.message}
              onChange={(e) => setValues((prev) => ({ ...prev, message: e.target.value }))}
              error={!!fieldErrors.message}
              helperText={fieldErrors.message}
              multiline
              minRows={5}
              fullWidth
            />

            {isError && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {error.message}
              </Alert>
            )}

            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? 'Sending…' : 'Leave Comment'}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
