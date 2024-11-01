import { renderHook, act, waitFor } from '@testing-library/react';
import { useMovies } from '../useMovies';
import { getMovies } from '../../services/apiService';
import { useDebounce } from '../useDebounce';

jest.mock('../../services/apiService');
jest.mock('../useDebounce');

const mockGetMovies = getMovies as jest.MockedFunction<typeof getMovies>;
const mockUseDebounce = useDebounce as jest.MockedFunction<typeof useDebounce>;

describe('useMovies', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseDebounce.mockImplementation((value) => value);
  });

  test('initializes with default values', () => {
    const { result } = renderHook(() => useMovies(10));

    expect(result.current.movies).toEqual([]);
    expect(result.current.currentPage).toBe(0);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.yearFilter).toBe('');
    expect(result.current.winnerFilter).toBe('');
  });

  test('fetches movies with initial parameters', async () => {
    mockGetMovies.mockResolvedValueOnce({
      content: [{ id: 1, year: 2022, title: 'Movie 1', studios: ['Studio A'], producers: ['Producer X'], winner: true }],
      totalPages: 3,
    });

    const { result } = renderHook(() => useMovies(10));

    await waitFor(() => expect(mockGetMovies).toHaveBeenCalledWith(0, 10, undefined, undefined));
    expect(result.current.movies).toEqual([
      { id: 1, year: 2022, title: 'Movie 1', studios: ['Studio A'], producers: ['Producer X'], winner: true },
    ]);
    expect(result.current.totalPages).toBe(3);
  });

  test('applies debounced year filter', async () => {
    mockGetMovies.mockResolvedValueOnce({
      content: [{ id: 1, year: 2022, title: 'Filtered Movie', studios: ['Studio A'], producers: ['Producer X'], winner: true }],
      totalPages: 1,
    });

    const { result } = renderHook(() => useMovies(10));

    act(() => {
      result.current.setYearFilter('2022');
    });

    await waitFor(() => expect(mockGetMovies).toHaveBeenCalledWith(0, 99, undefined, 2022));
    expect(result.current.movies).toEqual([
      { id: 1, year: 2022, title: 'Filtered Movie', studios: ['Studio A'], producers: ['Producer X'], winner: true },
    ]);
    expect(result.current.currentPage).toBe(0);
  });

  test('applies winner filter correctly', async () => {
    mockGetMovies.mockResolvedValueOnce({
      content: [{ id: 2, year: 2021, title: 'Winner Movie', studios: ['Studio B'], producers: ['Producer Y'], winner: true }],
      totalPages: 1,
    });

    const { result } = renderHook(() => useMovies(10));

    act(() => {
      result.current.setWinnerFilter('true');
    });

    await waitFor(() => expect(mockGetMovies).toHaveBeenCalledWith(0, 10, true, undefined));
    expect(result.current.movies).toEqual([
      { id: 2, year: 2021, title: 'Winner Movie', studios: ['Studio B'], producers: ['Producer Y'], winner: true },
    ]);
  });

  test('updates current page', async () => {
    mockGetMovies.mockResolvedValue({
      content: [{ id: 3, year: 2020, title: 'Paged Movie', studios: ['Studio C'], producers: ['Producer Z'], winner: false }],
      totalPages: 3,
    });

    const { result } = renderHook(() => useMovies(10));

    act(() => {
      result.current.setCurrentPage(2);
    });

    await waitFor(() => expect(mockGetMovies).toHaveBeenCalledWith(2, 10, undefined, undefined));
    expect(result.current.currentPage).toBe(2);
    expect(result.current.movies).toEqual([
      { id: 3, year: 2020, title: 'Paged Movie', studios: ['Studio C'], producers: ['Producer Z'], winner: false },
    ]);
  });
});
