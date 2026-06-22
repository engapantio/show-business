import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { Post } from '../model/types';
import { newsQueries } from '../model/queries';
import { TopStoryRow } from './TopStoryRow';

export function TopStoriesBlock({ posts }: { posts: Post[] }) {
  const { data: commentsCountMap = {} } = useQuery(newsQueries.commentsCountMap());
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
          fontSize: 16,
          color: 'primary.main',
          lineHeight: 1.4,
          ml: 6,
        }}
      >
        Top Stories
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {posts.slice(0, 4).map((post, i) => (
          <Box key={post.id}>
            <TopStoryRow post={post} index={i} commentsCount={commentsCountMap[post.id] ?? 0} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
