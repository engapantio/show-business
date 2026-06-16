import { useState } from 'react';
import { Box, Container, Typography, Stack, Pagination } from '@mui/material';
import { PostGrid } from '@/widgets/post-grid';
import { SearchInput } from '@/features/search';
import { TagFilter } from '@/features/filter-by-tag';
import { usePostsQuery, usePostSearchQuery, usePostsByTagQuery, type Post } from '@/entities/post';
import { DEFAULT_LIMIT } from '@/shared/config/env';

export function HomePage() {
  const [search, setSearch] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const skip = (page - 1) * DEFAULT_LIMIT;

  const allQuery = usePostsQuery(DEFAULT_LIMIT, skip);
  const searchQuery = usePostSearchQuery(search, DEFAULT_LIMIT, skip);
  const tagQuery = usePostsByTagQuery(activeTag, DEFAULT_LIMIT, skip);

  const isSearching = search.length > 0;
  const isTagging = activeTag.length > 0 && !isSearching;

  const posts: Post[] = isSearching
    ? (searchQuery.data?.posts ?? [])
    : isTagging
      ? (tagQuery.data?.posts ?? [])
      : (allQuery.data?.posts ?? []);

  const total =
    (isSearching
      ? searchQuery.data?.total
      : isTagging
        ? tagQuery.data?.total
        : allQuery.data?.total) ?? 0;
  const maxPages = Math.max(1, Math.ceil(total / DEFAULT_LIMIT));
  const isLoading = isSearching
    ? searchQuery.isLoading
    : isTagging
      ? tagQuery.isLoading
      : allQuery.isLoading;

  const heading = isSearching
    ? `Results for "${search}"`
    : isTagging
      ? `Stories tagged #${activeTag}`
      : 'Top Stories';

  const handleTagClick = (tag: string): void => {
    setActiveTag(tag);
    setSearch('');
    setPage(1);
  };

  const handleSearch = (value: string): void => {
    setSearch(value);
    setActiveTag('');
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number): void => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          textAlign: 'center',
          py: { xs: 6, sm: 8, md: 10 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            lineHeight: 1.15,
            fontSize: { xs: '2.25rem', sm: '3rem', md: '3.75rem' },
            mb: 2,
          }}
        >
          Your dream destination
          <br />
          for celebrity news
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            fontSize: { xs: '1rem', sm: '1.0625rem', md: '1.125rem' },
            mb: 4,
            maxWidth: 520,
            mx: 'auto',
          }}
        >
          Breaking stories, exclusive features, and the latest from the world of show business.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SearchInput value={search} onChange={handleSearch} />
        </Box>
      </Box>

      <Box component="main" sx={{ py: { xs: 5, sm: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Stack spacing={{ xs: 4, sm: 5, md: 6 }}>
            <TagFilter activeTag={activeTag} onSelect={handleTagClick} />

            <Stack
              direction="row"
              alignItems="baseline"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={1}
            >
              <Typography
                component="h2"
                sx={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 700,
                  fontSize: { xs: '1.375rem', sm: '1.625rem', md: '1.875rem' },
                }}
              >
                {heading}
              </Typography>
              {total > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {total} {total === 1 ? 'story' : 'stories'}
                </Typography>
              )}
            </Stack>

            <PostGrid posts={posts} isLoading={isLoading} onTagClick={handleTagClick} />

            {total > DEFAULT_LIMIT && (
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                <Pagination
                  count={maxPages}
                  page={page}
                  color="primary"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              </Box>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
