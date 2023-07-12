import { useRef, useState, useMemo, useCallback, useTransition } from 'react';
import { fetchMovies, Movie } from '../services/movie';

interface UseMoviesResult {
  movies: Movie[];
  loading: boolean;
  getMovies: () => Promise<void>;
}

export const useMovies = (search: string, sort: boolean): UseMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<string>(search);
  const [isPending, startTransition] = useTransition();

  const getMovies = useCallback(async (result: string): Promise<void> => {
    if (result === searchRef.current) return;
    try {
      console.log(result);
      setIsFetching(true);
      setError(null);
      searchRef.current = result;
      const fetchedMovies = await fetchMovies(result);
      startTransition(() => {
        setMovies(fetchedMovies);
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const sortedMovies = useMemo<Movie[]>(() => {
    return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, loading: isFetching || isPending, getMovies };
};
