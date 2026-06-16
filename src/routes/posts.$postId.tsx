import { createFileRoute } from '@tanstack/react-router';
import { PostDetailsPage } from '@/pages/post-details';

export const Route = createFileRoute('/posts/$postId')({
  component: PostDetailsPage,
});
