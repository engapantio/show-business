import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { newsQueries } from '@/entities/news';
import type { Post } from '@/entities/news';

const MAX_POST_ID = 150;
const randomPostId = () => Math.ceil(Math.random() * MAX_POST_ID);

export interface UseInspirationReturn {
  post: Post | undefined;
  currentId: number;
  isLoading: boolean;
  handleShuffle: () => void;
  handlePrefetchNext: () => void;
}

export function useInspiration(): UseInspirationReturn {
  const [currentId, setCurrentId] = useState<number>(randomPostId);
  const queryClient = useQueryClient();
  const { data: post, isLoading, isFetching } = useQuery(newsQueries.detail(currentId));

  const handleShuffle = () => setCurrentId(randomPostId());

  const handlePrefetchNext = () => {
    const nextId = randomPostId();
    void queryClient.prefetchQuery(newsQueries.detail(nextId));
  };

  return {
    post,
    currentId,
    isLoading: isLoading || isFetching,
    handleShuffle,
    handlePrefetchNext,
  };
}
