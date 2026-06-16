import { Box, Container, Typography, Stack, Divider, Paper, Avatar, Chip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from '@tanstack/react-router';
import { usePostQuery, PostTag } from '@/entities/post';
import { useUserQuery } from '@/entities/user';
import { useCommentsQuery, type Comment } from '@/entities/comment';
import { PostDetailsSkeleton } from './PostDetailsSkeleton';

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: 'divider' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              fontSize: '0.75rem',
              bgcolor: 'primary.light',
              color: 'primary.main',
            }}
          >
            {comment.user.fullName.charAt(0)}
          </Avatar>
          <Typography variant="caption" fontWeight={600}>
            {comment.user.fullName}
          </Typography>
          <Typography variant="caption" color="text.disabled">
            @{comment.user.username}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <FavoriteBorderIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
          <Typography variant="caption" color="text.disabled">
            {comment.likes}
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        {comment.body}
      </Typography>
    </Paper>
  );
}

export function PostDetailsPage(): JSX.Element {
  const { postId } = useParams({ from: '/posts/$postId' });
  const id = Number(postId);

  const postQuery = usePostQuery(id);
  const userQuery = useUserQuery(postQuery.data?.userId ?? 0);
  const cmtQuery = useCommentsQuery(id);

  if (postQuery.isLoading) return <PostDetailsSkeleton />;
  if (postQuery.data === undefined) return <></>;

  const post = postQuery.data;
  const user = userQuery.data;
  const comments = cmtQuery.data?.comments ?? [];

  return (
    <Box component="main" sx={{ py: { xs: 5, sm: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Typography
            component={Link}
            to="/posts"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: 'primary.main',
              fontSize: '0.875rem',
              fontWeight: 500,
              width: 'fit-content',
              transition: 'gap 180ms ease',
              '&:hover': { gap: 1.5 },
            }}
          >
            <ArrowBackIcon fontSize="small" /> Back to stories
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {post.tags.map((tag) => (
              <PostTag key={tag} tag={tag} />
            ))}
          </Stack>

          <Typography
            component="h1"
            sx={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              lineHeight: 1.15,
              fontSize: { xs: '1.875rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            {post.title}
          </Typography>

          <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap">
            {user !== undefined && (
              <Stack direction="row" alignItems="center" gap={1.5}>
                <Avatar src={user.image} alt={user.firstName} sx={{ width: 40, height: 40 }} />
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    @{user.username}
                  </Typography>
                </Box>
              </Stack>
            )}
            <Stack direction="row" alignItems="center" gap={2} sx={{ ml: 'auto' }}>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <FavoriteBorderIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled">
                  {post.reactions.likes}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <ThumbDownOffAltIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled">
                  {post.reactions.dislikes}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <VisibilityOutlinedIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                <Typography variant="caption" color="text.disabled">
                  {post.views}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Divider />

          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            {post.body}
          </Typography>

          <Divider />

          <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Typography
                component="h2"
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 600,
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                }}
              >
                Comments
              </Typography>
              {cmtQuery.data !== undefined && <Chip label={cmtQuery.data.total} size="small" />}
            </Stack>

            {cmtQuery.isLoading ? (
              <Stack spacing={2}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Paper key={i} variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                    <Stack spacing={1}>
                      <Stack direction="row" gap={1} alignItems="center">
                        <Box
                          sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: 'divider' }}
                        />
                        <Box sx={{ width: 120, height: 14, bgcolor: 'divider', borderRadius: 1 }} />
                      </Stack>
                      <Box
                        sx={{ width: '100%', height: 14, bgcolor: 'divider', borderRadius: 1 }}
                      />
                      <Box sx={{ width: '80%', height: 14, bgcolor: 'divider', borderRadius: 1 }} />
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Stack spacing={2}>
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
