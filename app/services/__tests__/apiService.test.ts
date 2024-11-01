import axios from 'axios';
import {
  getMovies,
  getYearsWithMultipleWinners,
  getTopStudiosWithWins,
  getProducersWinInterval,
  getWinnersByYear,
} from '../apiService';
import {
  MoviesResponse,
  YearsWithMultipleWinnersResponse,
  StudiosWithWinsResponse,
  ProducersWinIntervalResponse,
  WinnersByYearResponse,
} from '../../types/movies.type';

const BASE_URL = 'https://challenge.outsera.tech/api/movies';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches movies with correct parameters', async () => {
    const mockResponse: MoviesResponse = {
      content: [{ id: 1, year: 2022, title: 'Sample Movie', studios: ['Studio A'], producers: ['Producer X'], winner: true }],
      totalPages: 5,
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getMovies(1, 10, true, 2022);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}`, { params: { page: 1, size: 10, winner: true, year: 2022 } });
    expect(result).toEqual(mockResponse);
  });

  test('fetches years with multiple winners', async () => {
    const mockResponse: YearsWithMultipleWinnersResponse = {
      years: [{ year: 1986, winnerCount: 2 }, { year: 1990, winnerCount: 3 }],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getYearsWithMultipleWinners();

    expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}?projection=years-with-multiple-winners`);
    expect(result).toEqual(mockResponse);
  });

  test('fetches top studios with wins', async () => {
    const mockResponse: StudiosWithWinsResponse = {
      studios: [{ name: 'Studio A', winCount: 5 }, { name: 'Studio B', winCount: 3 }],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getTopStudiosWithWins();

    expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}?projection=studios-with-win-count`);
    expect(result).toEqual(mockResponse);
  });

  test('fetches producers with longest and shortest win intervals', async () => {
    const mockResponse: ProducersWinIntervalResponse = {
      min: [{ producer: 'Producer X', interval: 1, previousWin: 1990, followingWin: 1991 }],
      max: [{ producer: 'Producer Y', interval: 10, previousWin: 2000, followingWin: 2010 }],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getProducersWinInterval();

    expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}?projection=max-min-win-interval-for-producers`);
    expect(result).toEqual(mockResponse);
  });

  test('fetches winners by year with correct parameter', async () => {
    const mockResponse: WinnersByYearResponse = [
      { id: 1, year: 2022, title: 'Sample Winner', studios: ['Studio A'], producers: ['Producer X'], winner: true },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const result = await getWinnersByYear('2022');

    expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}?winner=true&year=2022`);
    expect(result).toEqual(mockResponse);
  });
});
