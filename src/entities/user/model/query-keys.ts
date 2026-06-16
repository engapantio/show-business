export const userKeys = {
  all: (): readonly string[] => ['users'],
  detail: (id: number): readonly [string, string, number] => ['users', 'detail', id],
} as const;
