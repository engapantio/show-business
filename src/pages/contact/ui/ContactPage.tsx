import { Box, Container, Typography, TextField, Button, Paper, Stack } from '@mui/material';

export function ContactPage() {
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

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5}>
              <TextField fullWidth label="Full name" />
              <TextField fullWidth label="Email" type="email" />
            </Stack>

            <TextField fullWidth label="Subject" />
            <TextField fullWidth label="Message" multiline minRows={6} />

            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button variant="contained" color="primary" sx={{ minWidth: 180 }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
