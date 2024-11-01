import { useEffect, useState } from 'react';
import { getMovies } from '../services/apiService';
import { Movie } from '../types/movies.type';
import { useDebounce } from './useDebounce';

export const useMovies = (pageSize: number) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [yearFilter, setYearFilter] = useState('');
  const [winnerFilter, setWinnerFilter] = useState('');

  const debouncedYearFilter = useDebounce(yearFilter, 500);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const page = yearFilter ? 0 : currentPage;
        const size = yearFilter ? 99 : pageSize;
        const winner = winnerFilter ? winnerFilter === 'true' : undefined;

        const moviesData = await getMovies(
          page,
          size,
          winner,
          debouncedYearFilter ? Number(debouncedYearFilter) : undefined
        );

        setMovies(moviesData.content);
        setTotalPages(moviesData.totalPages);

        if (yearFilter) setCurrentPage(0);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    loadMovies();
  }, [currentPage, pageSize, debouncedYearFilter, winnerFilter]);

  return {
    movies,
    currentPage,
    totalPages,
    yearFilter,
    winnerFilter,
    setYearFilter,
    setWinnerFilter,
    setCurrentPage,
  };
};
