import { Box, Typography, Paper, Stack } from '@mui/material';
import { ContactForm } from '@/features/contact-us';
import { PageContainer } from '@/shared';

export function ContactPage() {
  return (
    <PageContainer maxWidth="md">
      <Paper
        elevation={0}
        sx={{ p: { xs: 3, md: 5 }, border: '1px solid', borderColor: 'divider', borderRadius: 3 }}
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
            <Typography variant="body1" sx={{ maxWidth: '60ch', color: 'text.secondary' }}>
              Send us a message and we will get back to you.
            </Typography>
          </Box>
          <ContactForm />
        </Stack>
      </Paper>
    </PageContainer>
  );
}
