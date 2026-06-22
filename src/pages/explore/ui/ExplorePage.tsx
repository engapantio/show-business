import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, InputAdornment, TextField, Typography, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { newsQueries, ExploreNewsCard } from '@/entities/news/';
import { Pagination } from '@/widgets/pagination';
import { shuffle, useDebounce, PAGE_SIZE, PageContainer } from '@/shared/';

const cardGridSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
  gap: 4,
  alignItems: 'start',
  justifyItems: 'center',
} as const;

export function ExplorePage() {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const debouncedQuery = useDebounce(inputValue.trim(), 900);
  const isSearching = debouncedQuery.length > 0;
  const { data: listData, isLoading: isListLoading } = useQuery(newsQueries.listAll());
  const { data: searchData, isLoading: isSearchLoading } = useQuery(
    newsQueries.search(debouncedQuery, page),
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
    <PageContainer maxWidth="xl">
      <Box sx={{ maxWidth: 480, mx: 'auto', textAlign: 'center', mb: 5 }}>
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
          size="small"
          placeholder="Search news..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setPage(1);
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 5, '& .MuiInputBase-root': { borderRadius: 6 } }}
        />
      </Box>
      {isLoading ? (
        <Box sx={cardGridSx}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: 290,
              }}
            >
              <Skeleton variant="rectangular" width="100%" height={242} />
              <Skeleton height={40} />
              <Skeleton height={90} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={cardGridSx}>
          {posts.map((post) => (
            <ExploreNewsCard key={post.id} post={post} />
          ))}
        </Box>
      )}
      {!isSearching && !!searchData && searchData.total > PAGE_SIZE && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}
    </PageContainer>
  );
}
