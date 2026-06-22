import { useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { getPostImageUrl } from '@/shared';

interface PostImageProps {
  postId: number;
  width: number;
  height: number;
  alt: string;
  eager?: boolean;
  sx?: SxProps<Theme>;
}

export function PostImage({ postId, width, height, alt, eager = false, sx }: PostImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const src = errored
    ? `https://placehold.co/${width}x${height}/e8eaed/9aa0a6?text=No+Image`
    : getPostImageUrl(postId, width, height);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: `${width} / ${height}`,
        overflow: 'hidden',
        bgcolor: 'action.hover',
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
        decoding="async"
        onLoad={() => setLoaded(true)}
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
