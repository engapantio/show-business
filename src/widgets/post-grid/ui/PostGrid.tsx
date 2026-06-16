import { Grid } from '@mui/material';
import { PostCard } from '@/widgets/post-card';
import { SkeletonCard } from './SkeletonCard';
import { EmptyState } from './EmptyState';
import type { Post } from '@/entities/post';

interface PostGridProps {
  posts: Post[];
  isLoading: boolean;
  onTagClick?: (tag: string) => void;
}

export function PostGrid({ posts, isLoading, onTagClick }: PostGridProps) {
  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (posts.length === 0) return <EmptyState />;

  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <Grid key={post.id} item xs={12} sm={6} md={4}>
          <PostCard post={post} onTagClick={onTagClick} />
        </Grid>
      ))}
    </Grid>
  );
}
