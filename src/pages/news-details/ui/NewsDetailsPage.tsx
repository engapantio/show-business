import { Suspense } from 'react';
import { useParams } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Box, Container, Divider, Skeleton, Typography } from '@mui/material';
import { newsQueries } from '@/entities/news/';
import { BigNewsCard } from '@/entities/news/';
import { CommentCard } from '@/entities/news/';
import { AUTHOR_NAME } from '@/shared/config/constants';

function NewsDetailContent() {
  const { postId } = useParams({ from: '/news/$postId' });
  const id = Number(postId);
  const { data: post } = useSuspenseQuery(newsQueries.detail(id));
  const { data: commentsData } = useSuspenseQuery(newsQueries.comments(id));

  return (
    <>
      <BigNewsCard post={post} imgSeed={`detail-${id}`} />
      <Box sx={{ mt: 2, mb: 4 }}>
        <Typography variant="subtitle1">{AUTHOR_NAME}</Typography>
        <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
          {post.body}
        </Typography>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h2" sx={{ mb: 3 }}>
        Comments ({commentsData.total})
      </Typography>
      {commentsData.comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </>
  );
}

function SkeletonView() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Skeleton variant="rectangular" height={480} sx={{ borderRadius: 2 }} />
      <Skeleton height={48} />
      <Skeleton height={24} width="85%" />
      <Skeleton height={24} width="65%" />
    </Box>
  );
}

export function NewsDetailsPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Suspense fallback={<SkeletonView />}>
        <NewsDetailContent />
      </Suspense>
    </Container>
  );
}
