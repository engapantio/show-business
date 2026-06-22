import { Box, Button, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { BigNewsCard } from '@/entities/news/';
import { AUTHOR_NAME, PageContainer } from '@/shared';
import { CommentsSection } from '@/widgets/comments-section';
import { NewsPageSkeleton } from '@/widgets/news-page-skeleton';
import { useInspiration } from '../model/useInspiration';

export function InspirationPage() {
  const { post, currentId, isLoading, handleShuffle, handlePrefetchNext } = useInspiration();

  if (isLoading || !post) {
    return (
      <PageContainer maxWidth="md">
        <NewsPageSkeleton />
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="md">
      <BigNewsCard key={currentId} post={post} />
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
          onMouseEnter={handlePrefetchNext}
          onFocus={handlePrefetchNext}
        >
          Next inspiration
        </Button>
      </Box>
      <CommentsSection postId={currentId} />
    </PageContainer>
  );
}
