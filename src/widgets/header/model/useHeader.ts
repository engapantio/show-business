import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    setIsCheckingOut(true);
    setIsDrawerOpen(false);
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
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
    handleLogout,
  };
}
