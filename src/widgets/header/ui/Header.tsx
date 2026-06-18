import { useState } from 'react';
import { Box, Container, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import PersonOutlineIcon from '@mui/icons-material/Person2Outlined';
import { useAuthState, logout } from '@/features/auth-by-username';
import { Logo } from '@/shared/ui/';

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Inspiration', to: '/inspiration' },
  { label: 'Contact us', to: '/contact' },
] as const;

export function Header() {
  const auth = useAuthState();
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const isAuthenticated = Boolean(auth.token);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      logout();
      navigate({ to: '/login', search: {} });
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        bgcolor: '#fff',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: 72,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Logo />
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { sm: 2, md: 4 },
          }}
        >
          {NAV.map((item) => (
            <Box
              key={item.to}
              component={Link}
              to={item.to}
              sx={{
                textDecoration: 'none',
                color: location.pathname === item.to ? '#2ad18a' : '#000',
                fontFamily: 'var(--font-family)',
                fontWeight: 400,
                fontSize: { xs: 12, sm: 14, md: 16 },
                borderBottom:
                  location.pathname === item.to ? '2px solid #2ad18a' : '2px solid transparent',
                pb: 0.25,
              }}
            >
              {item.label}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {isAuthenticated ? (
            <Button startIcon={<PersonOutlineIcon />} onClick={handleLogout} variant="contained">
              {isCheckingOut ? 'Logging out' : 'Logout'}
            </Button>
          ) : (
            <Button component={Link} to="/login" variant="contained" color="primary" size="small">
              Sign in
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}
