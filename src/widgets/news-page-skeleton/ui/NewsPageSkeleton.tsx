import { Skeleton } from '@mui/material';
import { PageContainer } from '@/shared';

export function NewsPageSkeleton() {
  return (
    <PageContainer maxWidth="md">
      <Skeleton variant="rectangular" height={420} sx={{ borderRadius: 0, mb: 3 }} />
      <Skeleton height={72} sx={{ mb: 2 }} />
      <Skeleton height={28} sx={{ mb: 4 }} />
      <Skeleton height={110} sx={{ mb: 2 }} />
      <Skeleton height={110} sx={{ mb: 2 }} />
      <Skeleton height={110} />
    </PageContainer>
  );
}
