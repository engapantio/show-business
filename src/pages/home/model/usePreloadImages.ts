import { useEffect } from 'react';
import { getPostImageUrl } from '@/shared';
import type { Post } from '@/entities/news';

export function usePreloadHomeImages(posts: Post[]): void {
  useEffect(() => {
    if (!posts.length) return;

    const heroIds = [posts[0], posts[5]].filter(Boolean).map((p) => p.id);
    const thumbIds = [...posts.slice(1, 5), ...posts.slice(6, 10)].filter(Boolean).map((p) => p.id);

    const links: HTMLLinkElement[] = [];

    heroIds.forEach((id) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getPostImageUrl(id, 620, 409);
      document.head.appendChild(link);
      links.push(link);
    });

    thumbIds.forEach((id) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getPostImageUrl(id, 200, 124);
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((link) => document.head.removeChild(link));
    };
  }, [posts]);
}
