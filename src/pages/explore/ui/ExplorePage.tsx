import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Container, InputAdornment, TextField, Typography, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { newsQueries } from '@/entities/news/';
import { TopStoryRow } from '@/entities/news/';
import { Pagination } from '@/widgets/pagination';
import { PAGE_SIZE } from '@/shared/config/constants';

export function ExplorePage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery(newsQueries.search(query, page));
  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h1" sx={{ mb: 3 }}>
        Explore
      </Typography>
      <TextField
        fullWidth
        placeholder="Search news..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#9da3ae' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 4, '& .MuiInputBase-root': { borderRadius: 2 } }}
      />
      {isLoading && query && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={88} variant="rectangular" sx={{ borderRadius: 2 }} />
          ))}
        </Box>
      )}
      {data?.posts.map((post, i) => (
        <TopStoryRow key={post.id} post={post} index={i} />
      ))}
      {!!data && data.total > PAGE_SIZE && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}
    </Container>
  );
}
