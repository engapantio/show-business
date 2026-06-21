import { Box, Container, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/Person2Outlined';
import { Link, useLocation } from '@tanstack/react-router';
import { Logo, AppButton } from '@/shared';
import { useHeader } from '../model/useHeader';
import { NavDrawer } from './NavDrawer';
import { NAV } from '../config/nav';

export function Header() {
  const location = useLocation();
  const { isAuthenticated, isCheckingOut, isDrawerOpen, openDrawer, closeDrawer, handleLogout } =
    useHeader();

  return (
    <Box
      component="header"
      sx={{ position: 'sticky', top: 0, zIndex: 100, bgcolor: 'background.default' }}
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

        {/* Desktop nav */}
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
                color: location.pathname === item.to ? 'primary.main' : 'text.primary',
                fontFamily: 'var(--font-family)',
                fontWeight: 400,
                fontSize: { sm: 14, md: 16 },
                borderBottom:
                  location.pathname === item.to ? '2px solid #2ad18a' : '2px solid transparent',
                pb: 0.25,
              }}
            >
              {item.label}
            </Box>
          ))}
        </Box>

        {/* Right side */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {isAuthenticated ? (
              <AppButton
                startIcon={<PersonOutlineIcon />}
                loading={isCheckingOut}
                onClick={handleLogout}
              >
                {isCheckingOut ? 'Logging out…' : 'Logout'}
              </AppButton>
            ) : (
              <AppButton component={Link} to="/login" size="small">
                Sign in
              </AppButton>
            )}
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            onClick={openDrawer}
            aria-label="Open navigation menu"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Container>

      <NavDrawer
        open={isDrawerOpen}
        isAuthenticated={isAuthenticated}
        isCheckingOut={isCheckingOut}
        onClose={closeDrawer}
        onLogout={handleLogout}
      />
    </Box>
  );
}
