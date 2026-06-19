import { Box, Tab, Tabs, Typography } from '@mui/material';
import { Link, useRouterState } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';

export function AuthLayout() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const tabValue = pathname === '/register' ? '/register' : '/login';

  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: 'auto',
        mt: { xs: 6, md: 10 },
        px: 3,
        py: 4,
        border: '1px solid #e8eaed',
        borderRadius: 2,
        bgcolor: 'background.default',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          mb: 3,
          fontFamily: 'var(--font-family)',
          fontWeight: 700,
          fontSize: '32px',
          lineHeight: '120%',
          color: 'text.primary',
        }}
      >
        Account
      </Typography>

      <Tabs value={tabValue} sx={{ mb: 3 }}>
        <Tab label="Register" value="/register" component={Link} to="/register" />
        <Tab label="Login" value="/login" component={Link} to="/login" />
      </Tabs>

      <Outlet />
    </Box>
  );
}
