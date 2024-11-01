import React from 'react';
import styles from './movie-table.module.scss';
import { Movie } from '../../../types/movies.type';

interface MovieTableProps {
  movies: Movie[];
}

const MovieTable: React.FC<MovieTableProps> = ({ movies }) => (
  <div className={styles.tableResponsive}>
    <table className={`table table-striped table-bordered ${styles.customTable}`}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Year</th>
          <th>Title</th>
          <th>Studios</th>
          <th>Producers</th>
          <th>Winner</th>
        </tr>
      </thead>
      <tbody>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.id}</td>
              <td>{movie.year}</td>
              <td>{movie.title}</td>
              <td>{movie.studios.join(', ')}</td>
              <td>{movie.producers.join(', ')}</td>
              <td>{movie.winner ? 'Yes' : 'No'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="text-center">No movies found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default MovieTable;
