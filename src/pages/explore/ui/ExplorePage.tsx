import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Container, InputAdornment, TextField, Typography, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { newsQueries, ExploreNewsCard } from '@/entities/news/';
import { Pagination } from '@/widgets/pagination';
import { PAGE_SIZE } from '@/shared/config/constants';

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function ExplorePage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length > 0;
  const { data: listData, isLoading: isListLoading } = useQuery(newsQueries.listAll());
  const { data: searchData, isLoading: isSearchLoading } = useQuery(
    newsQueries.search(trimmedQuery, page),
  );

  const initialPosts = useMemo(() => {
    const posts = listData?.posts ?? [];
    return shuffle(posts).slice(0, 8);
  }, [listData?.posts]);

  const searchPosts = searchData?.posts ?? [];
  const searchPostsCountDivisibleBy4 = Math.floor(searchPosts.length / 4) * 4;

  const posts = isSearching ? searchPosts.slice(0, searchPostsCountDivisibleBy4) : initialPosts;
  const isLoading = isSearching ? isSearchLoading : isListLoading;
  const totalPages = searchData ? Math.ceil(searchData.total / PAGE_SIZE) : 1;

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography
        variant="h1"
        sx={{
          mb: 3,
          textAlign: 'center',
          fontFamily: 'var(--third-family)',
          fontWeight: 400,
          fontSize: { xs: '36px', md: '72px' },
          lineHeight: '110%',
          color: 'text.primary',
          width: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
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
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 5, '& .MuiInputBase-root': { borderRadius: 2 } }}
      />
      {isLoading ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 4,
            alignItems: 'start',
            justifyContent: 'center',
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Skeleton variant="rectangular" width="100%" height={242} />
              <Skeleton height={40} />
              <Skeleton height={90} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            px: 4,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 4,
            alignItems: 'start',
            justifyContent: 'center',
          }}
        >
          {posts.map((post) => (
            <ExploreNewsCard key={post.id} post={post} />
          ))}
        </Box>
      )}
      {!isSearching && !!searchData && searchData.total > PAGE_SIZE && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}
    </Container>
  );
}
