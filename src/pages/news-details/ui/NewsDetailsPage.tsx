import { useParams } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import { newsQueries, BigNewsCard } from '@/entities/news/';
import { CommentsSection } from '@/widgets/comments-section/';
import { NewsPageSkeleton } from '@/widgets/news-page-skeleton';
import { AUTHOR_NAME, PageContainer } from '@/shared';

function NewsDetailContent() {
  const { postId } = useParams({ from: '/news/$postId' });
  const id = Number(postId);
  const { data: post, isFetching, isLoading } = useSuspenseQuery(newsQueries.detail(id));

  const isPostLoading = !post || isLoading || isFetching;

  if (isPostLoading) {
    return <SkeletonView />;
  }

  return (
    <>
      <BigNewsCard post={post} />
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="subtitle1">{AUTHOR_NAME}</Typography>
        <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
          {post.body}
        </Typography>
      </Box>
      <CommentsSection postId={id} />
    </>
  );
}

function SkeletonView() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <NewsPageSkeleton />
    </Box>
  );
}

export function NewsDetailsPage() {
  return (
    <PageContainer maxWidth="md">
      <NewsDetailContent />
    </PageContainer>
  );
}
