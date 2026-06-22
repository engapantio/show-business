import { type ReactNode } from 'react';
import { Container } from '@mui/material';

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function PageContainer({ children, maxWidth = 'xl' }: PageContainerProps) {
  return (
    <Container maxWidth={maxWidth} sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 5 } }}>
      {children}
    </Container>
  );
}
