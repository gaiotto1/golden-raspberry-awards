import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieTable from '../movie-table/movie-table';

const mockMovies = [
  {
    id: 1,
    year: 2022,
    title: "Movie One",
    studios: ["Studio A", "Studio B"],
    producers: ["Producer X", "Producer Y"],
    winner: true,
  },
  {
    id: 2,
    year: 2021,
    title: "Movie Two",
    studios: ["Studio C"],
    producers: ["Producer Z"],
    winner: false,
  },
];

describe('MovieTable', () => {
  test('renders MovieTable with movie data', () => {
    render(<MovieTable movies={mockMovies} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Studios')).toBeInTheDocument();
    expect(screen.getByText('Producers')).toBeInTheDocument();
    expect(screen.getByText('Winner')).toBeInTheDocument();

    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.id)).toBeInTheDocument();
      expect(screen.getByText(movie.year)).toBeInTheDocument();
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      expect(screen.getByText(movie.studios.join(', '))).toBeInTheDocument();
      expect(screen.getByText(movie.producers.join(', '))).toBeInTheDocument();
      expect(screen.getByText(movie.winner ? 'Yes' : 'No')).toBeInTheDocument();
    });
  });

  test('renders "No movies found" message when there are no movies', () => {
    render(<MovieTable movies={[]} />);

    expect(screen.getByText('No movies found')).toBeInTheDocument();
  });
});
