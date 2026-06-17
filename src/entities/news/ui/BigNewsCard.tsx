import { Box, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import type { Post } from '../model/types';

export function BigNewsCard({ post, imgSeed }: { post: Post; imgSeed?: string }) {
  const navigate = useNavigate();
  const seed = imgSeed ?? String(post.id);
  const img = `https://picsum.photos/seed/${seed}/620/409`;

  return (
    <Box
      onClick={() => navigate({ to: '/news/$postId', params: { postId: String(post.id) } })}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        cursor: 'pointer',
        '&:hover': { opacity: 0.86 },
      }}
    >
      <Box
        component="img"
        src={img}
        alt={post.title}
        loading="lazy"
        sx={{
          width: '100%',
          aspectRatio: '16 / 10',
          objectFit: 'cover',
          borderRadius: 2,
          display: 'block',
        }}
      />
      <Typography
        sx={{
          fontFamily: 'var(--font-family)',
          fontWeight: 700,
          fontSize: { xs: '30px', md: '48px' },
          lineHeight: '120%',
          color: '#000',
          width: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {post.title}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'var(--font-family)',
          fontWeight: 400,
          fontSize: '17px',
          lineHeight: '160%',
          color: '#000',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {post.body}
      </Typography>
    </Box>
  );
}
