import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useTheme, useMediaQuery } from '@mui/material';
import { useAuthState, logout } from '@/features/auth-by-username';

export interface UseHeaderReturn {
  isAuthenticated: boolean;
  isCheckingOut: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  handleLogout: () => void;
}

export function useHeader(): UseHeaderReturn {
  const auth = useAuthState();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [drawerRequested, setDrawerRequested] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const isDrawerOpen = drawerRequested && !isDesktop;

  const handleLogout = () => {
    setIsCheckingOut(true);
    setDrawerRequested(false);
    setTimeout(() => {
      logout();
      navigate({ to: '/login', search: {} });
      setIsCheckingOut(false);
    }, 1500);
  };

  return {
    isAuthenticated: Boolean(auth.token),
    isCheckingOut,
    isDrawerOpen,
    openDrawer: () => setDrawerRequested(true),
    closeDrawer: () => setDrawerRequested(false),
    handleLogout,
  };
}
