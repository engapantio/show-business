import { createFileRoute } from '@tanstack/react-router';
import { NewsDetailsPage } from '@/pages/news-details/';

export const Route = createFileRoute('/news/$postId')({ component: NewsDetailsPage });
