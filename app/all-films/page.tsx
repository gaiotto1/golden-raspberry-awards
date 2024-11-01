'use client'
import React from 'react';
import { useMovies } from '../hooks/useMovies';
import Filters from './components/filters/filters';
import MovieTable from './components/movie-table/movie-table';
import Pagination from './components/pagination/pagination';
import styles from './all-films.module.scss';

const AllFilms: React.FC = () => {
  const pageSize = 15;
  const {
    movies,
    currentPage,
    totalPages,
    yearFilter,
    winnerFilter,
    setYearFilter,
    setWinnerFilter,
    setCurrentPage,
  } = useMovies(pageSize);

  return (
    <div className={`container ${styles.content}`}>
      <h2 className="mb-4">All Films</h2>

      <Filters yearFilter={yearFilter} winnerFilter={winnerFilter} setYearFilter={setYearFilter} setWinnerFilter={setWinnerFilter} />
      <MovieTable movies={movies} />
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default AllFilms;
