// src/shared/ui/FormShell.tsx
import { Box, Alert, type SxProps, type Theme} from '@mui/material';
import type { SubmitEvent, ReactNode } from 'react';
import { AppButton, getApiErrorMessage } from '@/shared/';

interface FormShellProps {
  children: ReactNode;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  submitLabel: string;
  pendingLabel: string;
  buttonSx?: SxProps<Theme>;
}

export function FormShell({
  children,
  onSubmit,
  isPending,
  isError,
  error,
  submitLabel,
  pendingLabel,
  buttonSx
}: FormShellProps) {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={onSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, width: '100%' }}
    >
      {children}

      <Box sx={{ height: 40, display: 'flex', alignItems: 'center' }}>
        {isError && (
          <Alert
            severity="error"
            sx={{
              width: '100%',
              py: 0,
              borderRadius: 2,
              '& .MuiAlert-message': { py: 0.5 },
            }}
          >
            {getApiErrorMessage(error)}
          </Alert>
        )}
      </Box>

      <AppButton
        type="submit"
        size="large"
        fullWidth
        loading={isPending}
        sx={{ py: 1.5, ...buttonSx }}
      >
        {isPending ? pendingLabel : submitLabel}
      </AppButton>
    </Box>
  );
}
