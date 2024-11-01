import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import YearsWithMultipleWinners from '../years-with-multiple-winners/years-with-multiple-winners';
import { getYearsWithMultipleWinners } from '../../../services/apiService';
import { YearsWithMultipleWinnersResponse } from '../../../types/movies.type';

jest.mock('../../../services/apiService');

const mockGetYearsWithMultipleWinners = getYearsWithMultipleWinners as jest.MockedFunction<typeof getYearsWithMultipleWinners>;

describe('YearsWithMultipleWinners', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component title and table headers', () => {
    render(<YearsWithMultipleWinners />);

    expect(screen.getByText('List years with multiple winners')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Win Count')).toBeInTheDocument();
  });

  test('fetches and displays years with multiple winners from API', async () => {
    const mockResponse: YearsWithMultipleWinnersResponse = {
      years: [
        { year: 1986, winnerCount: 2 },
        { year: 1990, winnerCount: 3 },
        { year: 2015, winnerCount: 2 },
      ],
    };

    mockGetYearsWithMultipleWinners.mockResolvedValueOnce(mockResponse);

    render(<YearsWithMultipleWinners />);

    await waitFor(async () => {
      const yearCells = await screen.findAllByText(/1986|1990|2015/);
      const winnerCountCells = await screen.findAllByText(/2|3/);

      expect(yearCells).toHaveLength(3);
      expect(winnerCountCells).toHaveLength(4);
    });
  });

  test('handles empty data response gracefully', async () => {
    const emptyResponse: YearsWithMultipleWinnersResponse = { years: [] };
    mockGetYearsWithMultipleWinners.mockResolvedValueOnce(emptyResponse);

    render(<YearsWithMultipleWinners />);

    await waitFor(() => {
      expect(screen.queryByRole('row', { name: /1986/i })).not.toBeInTheDocument();
    });
  });
});
