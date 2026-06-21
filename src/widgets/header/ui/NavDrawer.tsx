import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/Person2Outlined';
import { Link, useLocation } from '@tanstack/react-router';
import { AppButton } from '@/shared';
import { NAV } from '../config/nav';

interface NavDrawerProps {
  open: boolean;
  isAuthenticated: boolean;
  isCheckingOut: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function NavDrawer({
  open,
  isAuthenticated,
  isCheckingOut,
  onClose,
  onLogout,
}: NavDrawerProps) {
  const location = useLocation();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: 260 } } }}
    >
      {/* Drawer header */}
      <Box
        sx={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: 2,
        }}
      >
        <IconButton onClick={onClose} aria-label="Close navigation menu">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Nav links */}
      <List disablePadding>
        {NAV.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <ListItemButton
              key={item.to}
              component={Link}
              to={item.to}
              onClick={onClose}
              selected={isActive}
              sx={{
                px: 3,
                py: 1.5,
                borderLeft: isActive ? '3px solid #2ad18a' : '3px solid transparent',
                '&.Mui-selected': {
                  bgcolor: 'transparent',
                  color: 'primary.main',
                },
                '&.Mui-selected:hover': { bgcolor: 'action.hover' },
              }}
            >
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontFamily: 'var(--font-family)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: 16,
                      color: isActive ? 'primary.main' : 'text.primary',
                    },
                  },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider />

      {/* Auth action */}
      <Box sx={{ p: 3 }}>
        {isAuthenticated ? (
          <AppButton
            startIcon={<PersonOutlineIcon />}
            loading={isCheckingOut}
            onClick={onLogout}
            fullWidth
          >
            {isCheckingOut ? 'Logging out…' : 'Logout'}
          </AppButton>
        ) : (
          <AppButton component={Link} to="/login" onClick={onClose} fullWidth>
            Sign in
          </AppButton>
        )}
      </Box>
    </Drawer>
  );
}
