import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import type { ReactNode } from 'react';

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  redirect?: string;
};

export function AuthLayout({ title, subtitle, children, redirect }: AuthLayoutProps) {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const tabValue = pathname === '/register' ? '/register' : '/login';

  const handleTabChange = (_: React.SyntheticEvent, value: string) => {
    navigate({
      to: value,
      search: redirect ? { redirect } : {},
    });
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100dvh - 64px)',
        display: 'flex',
        alignItems: 'flex-start',
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
          minHeight: 560,
          p: { xs: 3, sm: 4 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 4 }}>
          <Tab key="register-form" label="Register" value="/register" />
          <Tab key="login-form" label="Login" value="/login" />
        </Tabs>

        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: 'var(--third-family)',
              fontWeight: 700,
              fontSize: { xs: 56, sm: 72 },
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>

        {children}
      </Paper>
    </Box>
  );
}
