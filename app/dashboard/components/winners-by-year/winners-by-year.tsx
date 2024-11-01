import React, { useState } from 'react';
import { getWinnersByYear } from '../../../services/apiService';
import { Movie } from '../../../types/movies.type';

const WinnersByYear: React.FC = () => {
  const [year, setYear] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!/^\d{4}$/.test(year)) {
      setError('Please enter a valid 4-digit year.');
      return;
    }

    setError(null);

    const data = await getWinnersByYear(year);
    setMovies(data);
  };

  return (
    <div className="card">
      <div className="card-header" style={{ fontSize: '1.25rem' }}>List movie winners by year</div>
      <div className="card-body">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by year"
            aria-label="Search by year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <button className="btn btn-primary" type="button" onClick={handleSearch}>
            <i className="bi bi-search"></i> Search
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Year</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {movies?.length > 0 ? (
              movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>{movie.year}</td>
                  <td>{movie.title}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WinnersByYear;
