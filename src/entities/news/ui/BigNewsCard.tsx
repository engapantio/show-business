import { useState } from 'react';
import { Box, Skeleton, Button, Typography } from '@mui/material';
import '@gouch/to-title-case';
import { useNavigate, useMatchRoute } from '@tanstack/react-router';
import type { Post } from '../model/types';

export function BigNewsCard({ post, imgSeed }: { post: Post; imgSeed?: string }) {
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const [loaded, setLoaded] = useState(false);
  const isPostDetailsPage = Boolean(matchRoute({ to: '/news/$postId' }));
  const seed = imgSeed ?? `post-${post.id}`;
  const img = `https://picsum.photos/seed/${seed}/620/409`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        height: '100%',
        '&:hover': { opacity: 0.96 },
      }}
    >
      <Box key={img} sx={{ position: 'relative', width: '100%', aspectRatio: 16 / 10 }}>
        {!loaded && (
          <Skeleton
            variant="circular"
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: 0,
            }}
          />
        )}
        <Box
          component="img"
          src={img}
          alt={post.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          sx={{
            width: '100%',
            aspectRatio: 16 / 10,
            objectFit: 'cover',
            display: 'block',
            flexGrow: '1',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 180ms ease',
          }}
        />
      </Box>
      <Typography
        sx={{
          fontFamily: 'var(--third-family)',
          fontWeight: 400,
          fontSize: { xs: '36px', md: '72px' },
          lineHeight: '110%',
          color: '#000',
          width: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {post.title.toTitleCase()}
      </Typography>
      {!isPostDetailsPage && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              flex: 1,
              minWidth: 0,
              fontFamily: 'var(--font-family)',
              fontWeight: 400,
              fontSize: '18px',
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
          <Button
            variant="contained"
            sx={{ flexShrink: 0, alignSelf: 'flex-end', whiteSpace: 'nowrap', py: 0.25, px: 0.75 }}
            onClick={() => navigate({ to: '/news/$postId', params: { postId: String(post.id) } })}
          >
            Read more
          </Button>
        </Box>
      )}
    </Box>
  );
}
