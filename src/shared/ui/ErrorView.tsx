import { Box, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlined';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorView({ message = 'Something went wrong.', onRetry }: ErrorViewProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 10,
        color: 'text.secondary',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main' }} />
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        {message}
      </Typography>
      {onRetry && (
        <Button variant="outlined" onClick={onRetry} size="small">
          Try again
        </Button>
      )}
    </Box>
  );
}
