const cache = new Map<string, string>();

export function getCachedImageUrl(src: string): string {
  return cache.get(src) ?? src;
}

export function setCachedImageUrl(originalSrc: string, resolvedSrc: string): void {
  cache.set(originalSrc, resolvedSrc);
}
