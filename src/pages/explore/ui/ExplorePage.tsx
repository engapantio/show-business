import { Box, InputAdornment, TextField, Typography, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ExploreNewsCard } from '@/entities/news/';
import { Pagination } from '@/widgets/pagination';
import { PageContainer } from '@/shared/';
import { useExploreNews } from '../model/useExploreNews';

const cardGridSx = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
  gap: 4,
  alignItems: 'start',
  justifyItems: 'center',
} as const;

export function ExplorePage() {
  const {
    inputValue,
    page,
    posts,
    isLoading,
    isSearching,
    isEmpty,
    totalPages,
    handleQueryChange,
    handlePageChange,
  } = useExploreNews();

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
            handleQueryChange(e.target.value);
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
      {isEmpty && (
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', py: 8 }}>
          No results for &ldquo;{inputValue}&rdquo;
        </Typography>
      )}
      {!isSearching && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
      )}
    </PageContainer>
  );
}
