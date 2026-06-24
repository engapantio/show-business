import { Box, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import '@gouch/to-title-case';
import type { Post } from '../model/types';
import { PostImage } from '@/shared';

export function ExploreNewsCard({ post }: { post: Post }) {
  return (
    <Link
      to="/news/$postId"
      params={{ postId: String(post.id) }}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: '100%',
          maxWidth: 290,
          textDecoration: 'none',
          '&:hover': { opacity: 0.85 },
        }}
      >
        <PostImage key={post.id} postId={post.id} width={290} height={242} variant='explore' alt={post.title} />
        <Typography
          sx={{
            width: '100%',
            maxWidth: 290,
            minHeight: '61.6px',
            fontFamily: 'var(--font-family)',
            fontWeight: 700,
            fontSize: '22px',
            lineHeight: '140%',
            color: 'text.primary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textDecoration: 'none',
          }}
        >
          {post.title.toTitleCase()}
        </Typography>
        <Typography
          sx={{
            width: '100%',
            maxWidth: 290,
            fontFamily: 'var(--font-family)',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '160%',
            color: 'text.primary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            wordBreak: 'break-word',
          }}
        >
          {post.body}
        </Typography>
      </Box>
    </Link>
  );
}
