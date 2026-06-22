import type { Post } from '@/entities/news';

export interface NewsBand {
  big: Post;
  top: Post[];
}

export function sliceNewsBands(posts: Post[]): [NewsBand | null, NewsBand | null] {
  const band1 = posts[0] ? { big: posts[0], top: posts.slice(1, 5) } : null;
  const band2 = posts[5] ? { big: posts[5], top: posts.slice(6, 10) } : null;
  return [band1, band2];
}
