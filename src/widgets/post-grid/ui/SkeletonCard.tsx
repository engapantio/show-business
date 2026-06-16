import { Card, CardContent, Box, Skeleton } from '@mui/material';

export function SkeletonCard() {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 9999 }} />
          <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 9999 }} />
        </Box>
        <Skeleton variant="text" height={28} width="85%" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
      </CardContent>
    </Card>
  );
}
