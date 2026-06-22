import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { newsQueries, BigNewsCard } from '@/entities/news/';
import { AUTHOR_NAME, PageContainer } from '@/shared';
import { CommentsSection } from '@/widgets/comments-section';
import { NewsPageSkeleton } from '@/widgets/news-page-skeleton';

export function InspirationPage() {
  const [randomId, setRandomId] = useState<number>(() => Math.ceil(Math.random() * 150));

  const postQuery = useQuery(newsQueries.detail(randomId));
  const queryClient = useQueryClient();

  const handleShuffle = () => {
    setRandomId(Math.ceil(Math.random() * 150));
  };

  const isPostLoading = !postQuery.data || postQuery.isLoading || postQuery.isFetching;

  if (isPostLoading) {
    return (
      <PageContainer maxWidth="md">
        <NewsPageSkeleton />
        {/* <Skeleton variant="rectangular" height={480} sx={{ borderRadius: 0, mb: 2 }} />
        <Skeleton height={72} sx={{ mb: 2 }} />
        <Skeleton height={32} sx={{ width: 180, mb: 4 }} />
        <Skeleton height={120} />
        <Skeleton height={120} /> */}
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="md">
      <BigNewsCard post={postQuery.data} />
      <Box
        sx={{
          display: 'flex',
          mt: 2,
          mb: 4,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle1">{AUTHOR_NAME}</Typography>
        <Button
          variant="contained"
          onClick={handleShuffle}
          startIcon={<AutoAwesomeIcon />}
          onMouseEnter={() => queryClient.prefetchQuery(newsQueries.detail(randomId))}
          onFocus={() => queryClient.prefetchQuery(newsQueries.detail(randomId))}
        >
          Next inspiration
        </Button>
      </Box>
      <CommentsSection postId={randomId} />
    </PageContainer>
  );
}
