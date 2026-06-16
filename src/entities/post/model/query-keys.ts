export const postKeys = {
  all: (): readonly string[] => ['posts'],
  list: (l: number, s: number): readonly [string, string, number, number] => [
    'posts',
    'list',
    l,
    s,
  ],
  search: (q: string, l: number, s: number): readonly [string, string, string, number, number] => [
    'posts',
    'search',
    q,
    l,
    s,
  ],
  byTag: (t: string, l: number, s: number): readonly [string, string, string, number, number] => [
    'posts',
    'tag',
    t,
    l,
    s,
  ],
  detail: (id: number): readonly [string, string, number] => ['posts', 'detail', id],
} as const;
