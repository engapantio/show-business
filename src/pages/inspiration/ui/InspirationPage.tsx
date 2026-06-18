import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Container, Divider, Skeleton, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { newsQueries } from '@/entities/news/';
import { BigNewsCard } from '@/entities/news/';
import { CommentCard } from '@/entities/news/';
import { AUTHOR_NAME } from '@/shared/config/constants';

export function InspirationPage() {
  const [randomId, setRandomId] = useState<number>(() => Math.ceil(Math.random() * 150));

  const postQuery = useQuery(newsQueries.detail(randomId));
  const commentsQuery = useQuery(newsQueries.comments(randomId));

  const handleShuffle = () => {
    setRandomId(Math.ceil(Math.random() * 150));
  };

  if (!postQuery.data) {
    return (
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Skeleton variant="rectangular" height={480} sx={{ borderRadius: 2, mb: 2 }} />
        <Skeleton height={48} />
        <Skeleton height={24} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <BigNewsCard post={postQuery.data} imgSeed={`post-${randomId}`} />
      <Box
        sx={{
          display: 'flex',
          mt: 2,
          mb: 4,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle1">{AUTHOR_NAME}</Typography>
        <Button variant="contained" onClick={handleShuffle} startIcon={<AutoAwesomeIcon />}>
          Next inspiration
        </Button>
      </Box>
      {commentsQuery.data && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h2" sx={{ mb: 3 }}>
            Comments ({commentsQuery.data.total})
          </Typography>
          {commentsQuery.data.comments.map((c) => (
            <CommentCard key={c.id} comment={c} />
          ))}
        </>
      )}
    </Container>
  );
}
