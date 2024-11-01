export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface MoviesResponse {
  content: Movie[];
  totalPages: number;
}

export interface GetMoviesParams {
  page: number;
  size: number;
  winner?: boolean;
  year?: number;
}

export interface YearWithWinner {
  year: number;
  winnerCount: number;
}

export interface YearsWithMultipleWinnersResponse {
  years: YearWithWinner[];
}

export interface Studio {
  name: string;
  winCount: number;
}

export interface StudiosWithWinsResponse {
  studios: Studio[];
}

export interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface ProducersWinIntervalResponse {
  min: ProducerWinInterval[];
  max: ProducerWinInterval[];
}

export type WinnersByYearResponse = Movie[];




