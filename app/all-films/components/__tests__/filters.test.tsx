import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../filters/filters';

describe('Filters', () => {
  const mockSetYearFilter = jest.fn();
  const mockSetWinnerFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Filters component with correct initial values', () => {
    render(
      <Filters
        yearFilter=""
        winnerFilter=""
        setYearFilter={mockSetYearFilter}
        setWinnerFilter={mockSetWinnerFilter}
      />
    );

    const yearInput = screen.getByPlaceholderText('Filter by year');
    expect(yearInput).toBeInTheDocument();
    expect(yearInput).toHaveValue('');

    const winnerSelect = screen.getByLabelText('Filter by winner');
    expect(winnerSelect).toBeInTheDocument();
    expect(winnerSelect).toHaveValue('');
  });

  test('calls setYearFilter on year input change', () => {
    render(
      <Filters
        yearFilter=""
        winnerFilter=""
        setYearFilter={mockSetYearFilter}
        setWinnerFilter={mockSetWinnerFilter}
      />
    );

    const yearInput = screen.getByPlaceholderText('Filter by year');
    fireEvent.change(yearInput, { target: { value: '2022' } });

    expect(mockSetYearFilter).toHaveBeenCalledTimes(1);
    expect(mockSetYearFilter).toHaveBeenCalledWith('2022');
  });

  test('calls setWinnerFilter on winner select change', () => {
    render(
      <Filters
        yearFilter=""
        winnerFilter=""
        setYearFilter={mockSetYearFilter}
        setWinnerFilter={mockSetWinnerFilter}
      />
    );

    const winnerSelect = screen.getByLabelText('Filter by winner');
    fireEvent.change(winnerSelect, { target: { value: 'true' } });

    expect(mockSetWinnerFilter).toHaveBeenCalledTimes(1);
    expect(mockSetWinnerFilter).toHaveBeenCalledWith('true');
  });
});
