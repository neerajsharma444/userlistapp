import { useState, useCallback, useMemo } from 'react';
import { useGetUsersQuery } from '../services/api';
import { User } from '../types';

interface UseGetUsersResult {
  users: User[];
  filteredUsers: User[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: any;
  refetch: () => void;
  loadMore: () => void;
  hasMore: boolean;
  setSearchQuery: (query: string) => void;
  searchQuery: string;
}

export const useGetUsers = (limit: number = 5): UseGetUsersResult => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isFetching, isError, error, refetch } = useGetUsersQuery({ page, limit });

  useMemo(() => {
    if (data) {
      if (data.length < page * limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [data, page, limit]);

  const handleLoadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  const handleRefetch = useCallback(() => {
    setPage(1);
    setHasMore(true);
    refetch();
  }, [refetch]);

  const filteredUsers = useMemo(() => {
    if (!data) return [];
    if (!searchQuery.trim()) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((user) =>
      user.name.toLowerCase().includes(lowerQuery)
    );
  }, [data, searchQuery]);

  return {
    users: data || [],
    filteredUsers,
    isLoading,
    isFetching,
    isError,
    error,
    refetch: handleRefetch,
    loadMore: handleLoadMore,
    hasMore,
    setSearchQuery,
    searchQuery,
  };
};
