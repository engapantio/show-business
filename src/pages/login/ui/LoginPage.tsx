import { Box, Paper, Typography } from '@mui/material';
import { LoginForm } from '@/features/auth-by-username';

export function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100dvh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 440,
          p: { xs: 3, sm: 4 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
        }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2rem' },
              mb: 1,
            }}
          >
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to find inspiration
          </Typography>
        </Box>
        <LoginForm />
      </Paper>
    </Box>
  );
}
