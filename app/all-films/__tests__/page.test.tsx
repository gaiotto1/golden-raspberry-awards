import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AllFilms from '../page';
import { useMovies } from '../../hooks/useMovies';

jest.mock('../../hooks/useMovies');

const mockUseMovies = useMovies as jest.MockedFunction<typeof useMovies>;

describe('AllFilms', () => {
  beforeEach(() => {
    mockUseMovies.mockReturnValue({
      movies: [
        {
          id: 1,
          year: 2022,
          title: 'Mocked Movie 1',
          studios: ['Studio A'],
          producers: ['Producer X'],
          winner: true,
        },
      ],
      currentPage: 0,
      totalPages: 3,
      yearFilter: '',
      winnerFilter: '',
      setYearFilter: jest.fn(),
      setWinnerFilter: jest.fn(),
      setCurrentPage: jest.fn(),
    } as ReturnType<typeof useMovies>);
  });

  test('renders AllFilms with Filters, MovieTable, and Pagination', () => {
    render(<AllFilms />);

    expect(screen.getByText('All Films')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Filter by year')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Page navigation')).toBeInTheDocument();
  });

  test('updates year filter when typed in Filters component', () => {
    const setYearFilterMock = jest.fn();
    const pageSize = 10;
    mockUseMovies.mockReturnValueOnce({
      ...mockUseMovies(pageSize),
      setYearFilter: setYearFilterMock,
    });

    render(<AllFilms />);
    
    const yearInput = screen.getByPlaceholderText('Filter by year');
    fireEvent.change(yearInput, { target: { value: '2021' } });

    expect(setYearFilterMock).toHaveBeenCalledWith('2021');
  });

  test('updates winner filter when selected in Filters component', () => {
    const setWinnerFilterMock = jest.fn();
    const pageSize = 10;
    mockUseMovies.mockReturnValueOnce({
      ...mockUseMovies(pageSize),
      setWinnerFilter: setWinnerFilterMock,
    });

    render(<AllFilms />);

    const winnerSelect = screen.getByLabelText('Filter by winner');
    fireEvent.change(winnerSelect, { target: { value: 'true' } });

    expect(setWinnerFilterMock).toHaveBeenCalledWith('true');
  });

  test('updates current page when a page is selected in Pagination', () => {
    const setCurrentPageMock = jest.fn();
    const pageSize = 10;
    mockUseMovies.mockReturnValueOnce({
      ...mockUseMovies(pageSize),
      setCurrentPage: setCurrentPageMock,
    });

    render(<AllFilms />);

    const pageButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(pageButton);

    expect(setCurrentPageMock).toHaveBeenCalledWith(1);
  });
});
