import { useState } from 'react';
import { Box, Container, Typography, Stack, Pagination } from '@mui/material';
import { PostGrid } from '@/widgets/post-grid';
import { SearchInput } from '@/features/search';
import { TagFilter } from '@/features/filter-by-tag';
import { usePostsQuery, usePostSearchQuery, usePostsByTagQuery, type Post } from '@/entities/news';
import { DEFAULT_LIMIT } from '@/shared/config/constants';

export function PostsPage() {
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

  const heading = isSearching
    ? `Results for "${search}"`
    : isTagging
      ? `Stories tagged #${activeTag}`
      : 'All Stories';

  return (
    <Box component="main" sx={{ py: { xs: 5, sm: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack spacing={{ xs: 4, sm: 5, md: 6 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            gap={2}
          >
            <Typography
              component="h1"
              sx={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: { xs: '1.875rem', sm: '2.25rem', md: '2.75rem' },
              }}
            >
              Stories
            </Typography>
            <SearchInput value={search} onChange={handleSearch} />
          </Stack>

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
                fontWeight: 600,
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' },
                color: 'text.secondary',
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
  );
}
