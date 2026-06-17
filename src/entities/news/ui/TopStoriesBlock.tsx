import { Box, Typography } from '@mui/material';
import type { Post } from '../model/types';
import { TopStoryRow } from './TopStoryRow';

export function TopStoriesBlock({ posts }: { posts: Post[] }) {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontFamily: 'var(--font-family)',
          fontWeight: 700,
          fontSize: 14,
          textTransform: 'uppercase',
          color: '#2ad18a',
          letterSpacing: '0.08em',
        }}
      >
        Top Stories
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {posts.slice(0, 4).map((post, i) => (
          <Box key={post.id}>
            <TopStoryRow post={post} index={i} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
