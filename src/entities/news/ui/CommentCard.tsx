import { Box, Typography } from '@mui/material';
import type { Comment } from '../model/types';

export function CommentCard({ comment }: { comment: Comment }) {
  return (
    <Box
      sx={{
        py: 2,
        borderBottom: '1px solid #e8eaed',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-family)',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '140%',
          textTransform: 'uppercase',
          color: 'primary.main',
        }}
      >
        {comment.user.fullName}
      </Typography>

      <Typography
        sx={{
          fontFamily: 'var(--font-family)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '160%',
          color: 'text.primary',
        }}
      >
        {comment.body}
      </Typography>

      <Typography
        sx={{
          fontFamily: 'var(--font-family)',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '140%',
          textTransform: 'uppercase',
          color: 'text.secondary',
        }}
      >
        👍 {comment.likes}
      </Typography>
    </Box>
  );
}
