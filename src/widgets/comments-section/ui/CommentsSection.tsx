import { useSuspenseQuery } from '@tanstack/react-query';
import { Divider, Typography } from '@mui/material';
import { CommentCard, newsQueries } from '@/entities/news';

interface CommentsSectionProps {
  postId: number;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const commentsQuery = useSuspenseQuery(newsQueries.comments(postId));
  if (!commentsQuery.data) return null;

  return (
    <>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h2" sx={{ mb: 3 }}>
        Comments ({commentsQuery.data.total})
      </Typography>
      {commentsQuery.data.comments.map((c) => (
        <CommentCard key={c.id} comment={c} />
      ))}
    </>
  );
}
