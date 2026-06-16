import { Container, Stack, Skeleton, Box } from '@mui/material';

export function PostDetailsSkeleton(){
  return (
    <Container maxWidth="md" sx={{ py: { xs: 5, sm: 6, md: 8 } }}>
      <Stack spacing={3}>
        <Skeleton width={80} height={20} />
        <Skeleton height={48} width="90%" />
        <Skeleton height={48} width="70%" />
        <Stack direction="row" gap={1.5} alignItems="center">
          <Skeleton variant="circular" width={44} height={44} />
          <Stack gap={0.5}>
            <Skeleton width={120} height={18} />
            <Skeleton width={80} height={14} />
          </Stack>
        </Stack>
        <Skeleton variant="rounded" height={200} />
        <Box>
          <Skeleton width="100%" />
          <Skeleton width="100%" />
          <Skeleton width="85%" />
          <Skeleton width="92%" />
          <Skeleton width="70%" />
        </Box>
      </Stack>
    </Container>
  );
}
