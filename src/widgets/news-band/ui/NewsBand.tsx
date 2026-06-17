import { Box } from '@mui/material';
import type { Post } from '@/entities/news/model/types';
import { BigNewsCard } from '@/entities/news/ui/BigNewsCard';
import { TopStoriesBlock } from '@/entities/news/ui/TopStoriesBlock';

export function NewsBand({
  bigPost,
  topPosts,
  reversed = false,
}: {
  bigPost: Post;
  topPosts: Post[];
  reversed?: boolean;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: reversed ? 'row-reverse' : 'row' },
        gap: 4,
        py: { xs: 4, md: 5 },
      }}
    >
      <Box sx={{ flex: '0 0 50%', minWidth: 0 }}>
        <BigNewsCard post={bigPost} />
      </Box>

      <Box sx={{ flex: '0 0 50%', minWidth: 0 }}>
        <TopStoriesBlock posts={topPosts} />
      </Box>
    </Box>
  );
}
