import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';

export function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, md: 14 } }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: { xs: 48, md: 88 }, mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Page not found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          The page you’re looking for doesn’t exist or has been moved.
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Go home
        </Button>
      </Box>
    </Container>
  );
}
