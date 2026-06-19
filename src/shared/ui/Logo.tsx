import { Link } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';

export function Logo() {
  return (
    <Box component={Link} to="/" sx={{ textDecoration: 'none', display: 'inline-flex' }}>
      <Typography
        sx={{
          fontFamily: 'var(--second-family)',
          fontWeight: 600,
          fontSize: { xs: '16px', md: '24px' },
          color: 'primary.main',
          textTransform: 'uppercase',
          letterSpacing: '0.01em',
        }}
      >
        Show Business
      </Typography>
    </Box>
  );
}
