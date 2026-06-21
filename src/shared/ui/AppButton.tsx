import { Button, CircularProgress } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import type { LinkProps } from '@tanstack/react-router';

/**
 * When used as a router link, pass `component={Link}` and `to` from TanStack Router.
 * We merge LinkProps optionally so callers get type-safe `to` when they need it.
 */
type AppButtonProps = ButtonProps & {
  loading?: boolean;
  /**
   * Optional `to` for TanStack Router Link usage.
   * Must be combined with `component={Link}` from '@tanstack/react-router'.
   */
  to?: LinkProps['to'];
};

export function AppButton({
  loading = false,
  disabled,
  startIcon,
  children,
  ...rest
}: AppButtonProps) {
  return (
    <Button
      variant="contained"
      disabled={disabled ?? loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      {...rest}
    >
      {children}
    </Button>
  );
}
