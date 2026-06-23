import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { newsQueries } from '@/entities/news';
import { shuffle, useDebounce, PAGE_SIZE } from '@/shared';
import type { Post } from '@/entities/news';

export interface UseExploreNewsReturn {
  inputValue: string;
  page: number;
  posts: Post[];
  isLoading: boolean;
  isSearching: boolean;
  isEmpty: boolean;
  totalPages: number;
  handleQueryChange: (value: string) => void;
  handlePageChange: (page: number) => void;
}

export function useExploreNews(): UseExploreNewsReturn {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(inputValue.trim(), 400);
  const isSearching = debouncedQuery.length > 0;

  const { data: listData, isLoading: isListLoading } = useQuery(newsQueries.listAll());
  const { data: searchData, isLoading: isSearchLoading } = useQuery(
    newsQueries.search(debouncedQuery, page),
  );

  const initialPosts = useMemo(() => {
    const posts = listData?.posts ?? [];
    return shuffle(posts).slice(0, 8);
  }, [listData?.posts]);

  const searchPosts = searchData?.posts ?? [];
  const trimmedToGrid =
    searchPosts.length <= 4 ? searchPosts.length : Math.floor(searchPosts.length / 4) * 4;
  const posts = isSearching ? searchPosts.slice(0, trimmedToGrid) : initialPosts;
  const isLoading = isSearching ? isSearchLoading : isListLoading;
  const totalPages = searchData ? Math.ceil(searchData.total / PAGE_SIZE) : 1;
  const isEmpty = isSearching && !isSearchLoading && searchPosts.length === 0;

  const handleQueryChange = (value: string) => {
    setInputValue(value);
    setPage(1);
  };

  return {
    inputValue,
    page,
    posts,
    isLoading,
    isSearching,
    isEmpty,
    totalPages,
    handleQueryChange,
    handlePageChange: setPage,
  };
}
