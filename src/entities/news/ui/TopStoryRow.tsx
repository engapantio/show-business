import { Box, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import type { Post } from '../model/types';
import { AUTHOR_NAME } from '@/shared/config/constants';

export function TopStoryRow({ post, index }: { post: Post; index: number }) {
  const navigate = useNavigate();
  const thumb = `https://picsum.photos/seed/topstory-${post.id}/200/124`;

  return (
    <Box
      onClick={() => navigate({ to: '/news/$postId', params: { postId: String(post.id) } })}
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '32px 1fr 72px',
          sm: '32px 1fr 88px',
          md: '32px 1fr 120px',
          lg: '32px 1fr 160px',
          xl: '32px 1fr 20px',
        },
        gap: { xs: 1, sm: 1.5, md: 2 },
        alignItems: 'start',
        py: 1,
        cursor: 'pointer',
        '&:hover': { opacity: 0.8 },
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          bgcolor: '#e8eaed',
          color: '#2ad18a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-family)',
          fontWeight: 700,
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        {index + 1}
      </Box>

      <Box sx={{ minWidth: 0, maxWidth: 355, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-family)',
            fontWeight: 700,
            fontSize: { xs: '16px', md: '22px' },
            lineHeight: '140%',
            color: '#000',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.title}
        </Typography>

        <Typography
          sx={{
            fontFamily: 'var(--font-family)',
            fontWeight: 500,
            fontSize: { xs: '12px', md: '16px' },
            lineHeight: '140%',
            textTransform: 'uppercase',
            color: '#2ad18a',
            mt: 0.5,
          }}
        >
          {AUTHOR_NAME}
        </Typography>

        <Typography
          sx={{
            fontFamily: 'var(--font-family)',
            fontWeight: 500,
            fontSize: { xs: '12px', md: '16px' },
            lineHeight: '140%',
            textTransform: 'uppercase',
            color: '#9da3ae',
            mt: 0.25,
          }}
        >
          10:00 AM | 💬 {post.reactions?.likes ?? 0}
        </Typography>
      </Box>

      <Box
        component="img"
        src={thumb}
        alt={post.title}
        loading="lazy"
        sx={{
          width: { xs: 72, sm: 88, md: 120, lg: 160, xl: 200 },
          height: { xs: 54, sm: 66, md: 90, lg: 107, xl: 124 },
          objectFit: 'cover',
          borderRadius: 0,
          justifySelf: 'end',
        }}
      />
    </Box>
  );
}
