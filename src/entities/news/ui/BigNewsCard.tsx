import { Box, Button, Typography } from '@mui/material';
import '@gouch/to-title-case';
import { useNavigate, useMatchRoute } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { truncateAtWord, PostImage } from '@/shared';
import { newsQueries } from '../model/queries';
import type { Post } from '../model/types';

export function BigNewsCard({ post }: { post: Post; imgSeed?: string }) {
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const isNewsDetailsPage = Boolean(matchRoute({ to: '/news/$postId' }));
  const isInspirationPage = Boolean(matchRoute({ to: '/inspiration' }));
  const queryClient = useQueryClient();

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
      <PostImage key={post.id} postId={post.id} width={620} height={isNewsDetailsPage || isInspirationPage ? 259 : 409} alt={post.title} eager />
      <Typography
        sx={{
          fontFamily: 'var(--third-family)',
          fontWeight: 400,
          fontSize: { xs: '36px', md: '72px' },
          lineHeight: '110%',
          color: 'text.primary',
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {truncateAtWord(post.title.toTitleCase(), 34)}
      </Typography>
      {!isNewsDetailsPage && (
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
              color: 'text.primary',
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
            onMouseEnter={() => queryClient.prefetchQuery(newsQueries.detail(post.id))}
            onFocus={() => queryClient.prefetchQuery(newsQueries.detail(post.id))}
          >
            Read more
          </Button>
        </Box>
      )}
    </Box>
  );
}
