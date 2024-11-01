import React from 'react';
import { render, screen } from '@testing-library/react';
import ProducersWinInterval from '../producers-win-interval/producers-win-interval';
import { getProducersWinInterval } from '../../../services/apiService';
import { ProducersWinIntervalResponse } from '../../../types/movies.type';

jest.mock('../../../services/apiService');

const mockGetProducersWinInterval = getProducersWinInterval as jest.MockedFunction<typeof getProducersWinInterval>;

describe('ProducersWinInterval', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders ProducersWinInterval component titles', () => {
    render(<ProducersWinInterval />);

    expect(screen.getByText('Producers with longest and shortest interval between wins')).toBeInTheDocument();
    expect(screen.getByText('Maximum')).toBeInTheDocument();
    expect(screen.getByText('Minimum')).toBeInTheDocument();
  });

  test('renders data fetched from API correctly', async () => {
    const mockResponse: ProducersWinIntervalResponse = {
      max: [
        { producer: 'Producer X', interval: 13, previousWin: 2002, followingWin: 2015 },
      ],
      min: [
        { producer: 'Producer Y', interval: 1, previousWin: 1990, followingWin: 1991 },
      ],
    };

    mockGetProducersWinInterval.mockResolvedValueOnce(mockResponse);

    render(<ProducersWinInterval />);

    expect(await screen.findByText('Producer X')).toBeInTheDocument();
    expect(screen.getByText('13')).toBeInTheDocument();
    expect(screen.getByText('2002')).toBeInTheDocument();
    expect(screen.getByText('2015')).toBeInTheDocument();

    expect(screen.getByText('Producer Y')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('1990')).toBeInTheDocument();
    expect(screen.getByText('1991')).toBeInTheDocument();
  });

  test('handles empty data response gracefully', async () => {
    const emptyResponse: ProducersWinIntervalResponse = { max: [], min: [] };
    mockGetProducersWinInterval.mockResolvedValueOnce(emptyResponse);

    render(<ProducersWinInterval />);

    expect(screen.getByText('Maximum')).toBeInTheDocument();
    expect(screen.getByText('Minimum')).toBeInTheDocument();

    expect(screen.queryByRole('row', { name: /Producer X/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('row', { name: /Producer Y/i })).not.toBeInTheDocument();
  });
});
