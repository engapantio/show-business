export const commentKeys = {
  all: (): readonly string[] => ['comments'],
  byPost: (postId: number): readonly [string, string, number] => ['comments', 'post', postId],
} as const;
