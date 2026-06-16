import { Card, CardContent, CardActionArea, Box, Typography, Stack, Divider } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Link } from '@tanstack/react-router';
import { PostTag } from '@/entities/post';
import type { Post } from '@/entities/post';

interface PostCardProps {
  post: Post;
  onTagClick?: (tag: string) => void;
}

export function PostCard({ post, onTagClick }: PostCardProps) {
  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onTagClick?.(tag);
  };

  return (
    <Card>
      <Box sx={{ px: 2.5, pt: 2.5 }}>
        <Stack direction="row" flexWrap="wrap" gap={0.75}>
          {post.tags.slice(0, 3).map((tag) => (
            <PostTag key={tag} tag={tag} onClick={handleTagClick(tag)} />
          ))}
        </Stack>
      </Box>

      <CardActionArea component={Link} to="/posts/$postId" params={{ postId: String(post.id) }}>
        <CardContent sx={{ pt: 1.5, pb: 0 }}>
          <Typography
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              lineHeight: 1.25,
              mb: 1,
              fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' },
              color: 'text.primary',
              transition: 'color 180ms ease',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.body}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Box sx={{ px: 2.5, pt: 1, pb: 2 }}>
        <Divider sx={{ mb: 1.5 }} />
        <Stack direction="row" alignItems="center" gap={2}>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <FavoriteBorderIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
            <Typography variant="caption" color="text.disabled">
              {post.reactions.likes}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <VisibilityOutlinedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
            <Typography variant="caption" color="text.disabled">
              {post.views}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
