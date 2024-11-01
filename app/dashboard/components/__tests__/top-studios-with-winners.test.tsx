import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TopStudiosWithWinners from '../top-studios-with-winners/top-studios-with-winners';
import { getTopStudiosWithWins } from '../../../services/apiService';
import { StudiosWithWinsResponse } from '../../../types/movies.type';

jest.mock('../../../services/apiService');

const mockGetTopStudiosWithWins = getTopStudiosWithWins as jest.MockedFunction<typeof getTopStudiosWithWins>;

describe('TopStudiosWithWinners', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component title and table headers', () => {
    render(<TopStudiosWithWinners />);

    expect(screen.getByText('Top 3 studios with winners')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Win Count')).toBeInTheDocument();
  });

  test('fetches and displays top 3 studios from API', async () => {
    const mockResponse: StudiosWithWinsResponse = {
      studios: [
        { name: 'Studio A', winCount: 10 },
        { name: 'Studio B', winCount: 8 },
        { name: 'Studio C', winCount: 6 },
        { name: 'Studio D', winCount: 4 },
      ],
    };
    mockGetTopStudiosWithWins.mockResolvedValueOnce(mockResponse);

    render(<TopStudiosWithWinners />);

    await waitFor(() => {
      expect(screen.getByText('Studio A')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('Studio B')).toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.getByText('Studio C')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
    });

    expect(screen.queryByText('Studio D')).not.toBeInTheDocument();
  });

  test('handles empty data response gracefully', async () => {
    const emptyResponse: StudiosWithWinsResponse = { studios: [] };
    mockGetTopStudiosWithWins.mockResolvedValueOnce(emptyResponse);

    render(<TopStudiosWithWinners />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Win Count')).toBeInTheDocument();

    expect(screen.queryByRole('row', { name: /Studio/i })).not.toBeInTheDocument();
  });
});
