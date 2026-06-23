import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { getPostImageUrl } from '@/shared';
import { getCachedImageUrl, setCachedImageUrl } from '@/shared/lib/resolvedImageCache';

interface PostImageProps {
  postId: number;
  width: number;
  height: number;
  alt: string;
  eager?: boolean;
  fill?: boolean;
  sx?: SxProps<Theme>;
}

const PLACEHOLDER = '/placeholder.svg';

export function PostImage({
  postId,
  width,
  height,
  alt,
  fill = false,
  eager = false,
  sx,
}: PostImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const originalSrc = getPostImageUrl(postId, width, height);
  const src = errored ? PLACEHOLDER : getCachedImageUrl(originalSrc);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'action.hover',
        ...(fill
          ? { width: '100%', height: '100%' }
          : { width: '100%', aspectRatio: `${width} / ${height}` }),
        ...sx,
      }}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          sx={{ position: 'absolute', inset: 0, height: '100%', transform: 'none' }}
        />
      )}

      <Box
        component="img"
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
          const resolvedSrc = e.currentTarget.currentSrc;
          if (resolvedSrc && resolvedSrc !== originalSrc) {
            setCachedImageUrl(originalSrc, resolvedSrc);
          }
          setLoaded(true);
        }}
        onError={() => {
          setErrored(true);
          setLoaded(true);
        }}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 220ms ease',
        }}
      />
    </Box>
  );
}
