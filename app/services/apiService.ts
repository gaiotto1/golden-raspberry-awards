import axios from 'axios';
import {
  GetMoviesParams,
  MoviesResponse,
  YearsWithMultipleWinnersResponse,
  StudiosWithWinsResponse,
  ProducersWinIntervalResponse,
  WinnersByYearResponse
} from '../types/movies.type';

const BASE_URL = 'https://challenge.outsera.tech/api/movies';


export const getMovies = async (page: number, size: number, winner?: boolean, year?: number): Promise<MoviesResponse> => {
  const params: GetMoviesParams = { page, size };

  if (winner !== undefined) params.winner = winner;
  if (year !== undefined) params.year = year;

  const response = await axios.get<MoviesResponse>(`${BASE_URL}`, { params });
  return response.data;
};

export const getYearsWithMultipleWinners = async (): Promise<YearsWithMultipleWinnersResponse> => {
  const response = await axios.get<YearsWithMultipleWinnersResponse>(`${BASE_URL}?projection=years-with-multiple-winners`);
  return response.data;
};

export const getTopStudiosWithWins = async (): Promise<StudiosWithWinsResponse> => {
  const response = await axios.get<StudiosWithWinsResponse>(`${BASE_URL}?projection=studios-with-win-count`);
  return response.data;
};

export const getProducersWinInterval = async (): Promise<ProducersWinIntervalResponse> => {
  const response = await axios.get<ProducersWinIntervalResponse>(`${BASE_URL}?projection=max-min-win-interval-for-producers`);
  return response.data;
};

export const getWinnersByYear = async (year: string): Promise<WinnersByYearResponse> => {
  const response = await axios.get<WinnersByYearResponse>(`${BASE_URL}?winner=true&year=${year}`);
  return response.data;
};
