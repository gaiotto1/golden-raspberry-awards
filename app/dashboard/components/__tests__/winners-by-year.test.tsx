import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WinnersByYear from '../winners-by-year/winners-by-year';
import { getWinnersByYear } from '../../../services/apiService';
import { Movie } from '../../../types/movies.type';

jest.mock('../../../services/apiService');

const mockGetWinnersByYear = getWinnersByYear as jest.MockedFunction<typeof getWinnersByYear>;

describe('WinnersByYear', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component title, input, and search button', () => {
    render(<WinnersByYear />);
    expect(screen.getByText('List movie winners by year')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by year')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  test('displays error message for invalid year input', () => {
    render(<WinnersByYear />);

    const input = screen.getByPlaceholderText('Search by year');
    const searchButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: '20' } });
    fireEvent.click(searchButton);

    expect(screen.getByText('Please enter a valid 4-digit year.')).toBeInTheDocument();
  });

  test('fetches and displays movies for a valid year', async () => {
    const mockMovies: Movie[] = [
      { id: 1, year: 2022, title: 'Winning Movie 1', studios: ['Studio A'], producers: ['Producer X'], winner: true },
      { id: 2, year: 2022, title: 'Winning Movie 2', studios: ['Studio B'], producers: ['Producer Y'], winner: true },
    ];

    mockGetWinnersByYear.mockResolvedValueOnce(mockMovies);

    render(<WinnersByYear />);

    const input = screen.getByPlaceholderText('Search by year');
    const searchButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: '2022' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockGetWinnersByYear).toHaveBeenCalledWith('2022');
      expect(screen.getByText('Winning Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Winning Movie 2')).toBeInTheDocument();
    });
  });

  test('displays "No results found" message when no movies are returned for a valid year', async () => {
    mockGetWinnersByYear.mockResolvedValueOnce([]);

    render(<WinnersByYear />);

    const input = screen.getByPlaceholderText('Search by year');
    const searchButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: '2023' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockGetWinnersByYear).toHaveBeenCalledWith('2023');
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });
});
