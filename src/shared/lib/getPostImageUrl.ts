type ImageCategory = 'showbusiness' | 'music' | 'theater' | 'cinema';

const CATEGORIES: ImageCategory[] = ['showbusiness', 'music', 'theater', 'cinema'];

export function getPostImageUrl(postId: number, width: number, height: number): string {
  const category = CATEGORIES[postId % CATEGORIES.length];
  return `https://loremflickr.com/${width}/${height}/${category}?lock=${postId}`;
}
