export type ImageVariant = 'hero' | 'card' | 'detail' | 'explore';

const SIZES: Record<ImageVariant, { w: number; h: number }> = {
  hero: { w: 620, h: 409 },
  explore: {w: 290, h: 242 },
  card: { w: 200, h: 124 },
  detail: { w: 620, h: 259 }, 
};

export function getPostImageUrl(postId: number, variant: ImageVariant = 'card'): string {
  const { w, h } = SIZES[variant];
  return `https://picsum.photos/seed/post-${postId}-${variant}/${w}/${h}`;
}
