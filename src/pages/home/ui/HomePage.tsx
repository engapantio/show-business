import { Box, Skeleton } from '@mui/material';
import { useSuspenseQuery, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { newsQueries } from '@/entities/news/model/queries';
import { NewsBand } from '@/widgets/news-band/';
import { Pagination } from '@/widgets/pagination/';
import { PAGE_SIZE, PageContainer, ErrorView } from '@/shared';
import { sliceNewsBands } from '../model/useNewsBands';
import { usePreloadHomeImages } from '../model/usePreloadImages';

function HomeContent() {
  const { page = 1 } = useSearch({ from: '/' });
  const navigate = useNavigate({ from: '/' });
  const { data } = useSuspenseQuery(newsQueries.list(page));
  const posts = data.posts;
  const totalPages = Math.ceil(data.total / PAGE_SIZE);
  const [band1, band2] = sliceNewsBands(posts);

  usePreloadHomeImages(posts);

  return (
    <>
      {band1 && <NewsBand bigPost={band1.big} topPosts={band1.top} />}
      {band2 && <NewsBand bigPost={band2.big} topPosts={band2.top} reversed />}
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
  const { reset } = useQueryErrorResetBoundary();

  return (
    <PageContainer maxWidth="xl">
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <ErrorView message="Failed to load news." onRetry={resetErrorBoundary} />
        )}
      >
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
      </ErrorBoundary>
    </PageContainer>
  );
}
