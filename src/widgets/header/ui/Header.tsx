import { AppBar, Toolbar, Box, Button, Typography, Stack, Avatar } from '@mui/material';
import { Link, useLocation } from '@tanstack/react-router';
import { useAuthState, logout } from '@/features/auth-by-username';

interface NavLink {
  label: string;
  to: '/' | '/posts';
}

const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Stories', to: '/posts' },
] as const;

export function Header() {
  const { user } = useAuthState();
  const loc = useLocation();

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2, px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography
          component={Link}
          to="/"
          sx={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' },
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: '-0.02em',
          }}
        >
          SHOW{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            BUSINESS
          </Box>
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          gap={{ xs: 2, md: 4 }}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = loc.pathname === link.to;
            return (
              <Typography
                key={link.to}
                component={Link}
                to={link.to}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive ? 'primary.main' : 'text.secondary',
                  borderBottom: '2px solid',
                  borderColor: isActive ? 'primary.main' : 'transparent',
                  pb: 0.25,
                  transition: 'color 180ms ease',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {link.label}
              </Typography>
            );
          })}

          {user !== null ? (
            <Stack direction="row" alignItems="center" gap={1.5}>
              <Avatar src={user.image} alt={user.firstName} sx={{ width: 32, height: 32 }} />
              <Typography variant="caption" fontWeight={600}>
                {user.firstName}
              </Typography>
              <Button variant="outlined" size="small" onClick={logout} sx={{ borderRadius: 9999 }}>
                Log out
              </Button>
            </Stack>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              size="small"
              sx={{ borderRadius: 9999, px: 2.5 }}
            >
              Log in
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
