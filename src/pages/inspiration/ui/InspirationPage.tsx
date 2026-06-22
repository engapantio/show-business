import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { newsQueries, BigNewsCard } from '@/entities/news/';
import { AUTHOR_NAME, PageContainer } from '@/shared';
import { CommentsSection } from '@/widgets/comments-section';

export function InspirationPage() {
  const [randomId, setRandomId] = useState<number>(() => Math.ceil(Math.random() * 150));

  const postQuery = useQuery(newsQueries.detail(randomId));

  const handleShuffle = () => {
    setRandomId(Math.ceil(Math.random() * 150));
  };

  if (!postQuery.data) {
    return (
      <PageContainer maxWidth="md">
        <Skeleton variant="rectangular" height={480} sx={{ borderRadius: 2, mb: 2 }} />
        <Skeleton height={48} />
        <Skeleton height={24} />
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="md" >
      <BigNewsCard post={postQuery.data}  />
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
        <Button variant="contained" onClick={handleShuffle} startIcon={<AutoAwesomeIcon />}>
          Next inspiration
        </Button>
      </Box>
      <CommentsSection postId={randomId} />
    </PageContainer>
  );
}
