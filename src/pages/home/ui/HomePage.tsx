import { Container, Box, Skeleton } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense } from 'react';
import { newsQueries } from '@/entities/news/model/queries';
import { NewsBand } from '@/widgets/news-band/';
import { Pagination } from '@/widgets/pagination/';
import { PAGE_SIZE } from '@/shared/config/constants';

function HomeContent() {
  const { page = 1 } = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });
  const { data } = useSuspenseQuery(newsQueries.list(page));
  const posts = data.posts;
  const totalPages = Math.ceil(data.total / PAGE_SIZE);

  const band1Big = posts[0];
  const band1Top = posts.slice(1, 5);
  const band2Big = posts[5];
  const band2Top = posts.slice(6, 10);

  return (
    <>
      {band1Big && <NewsBand bigPost={band1Big} topPosts={band1Top} />}
      {band2Big && <NewsBand bigPost={band2Big} topPosts={band2Top} reversed />}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => navigate({ search: { page: p } })}
      />
    </>
  );
}

function SkeletonBand() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' },
        gap: 4,
        py: 5,
      }}
    >
      <Skeleton variant="rectangular" height={420} sx={{ borderRadius: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rectangular" height={90} sx={{ borderRadius: 2 }} />
        ))}
      </Box>
    </Box>
  );
}

export function HomePage() {
  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Suspense
        fallback={
          <>
            <SkeletonBand />
            <SkeletonBand />
          </>
        }
      >
        <HomeContent />
      </Suspense>
    </Container>
  );
}
