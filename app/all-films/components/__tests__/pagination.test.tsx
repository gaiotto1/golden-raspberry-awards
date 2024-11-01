import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../pagination/pagination';

describe('Pagination', () => {
  const mockSetCurrentPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Pagination component with correct number of page buttons', () => {
    render(<Pagination currentPage={0} totalPages={5} setCurrentPage={mockSetCurrentPage} />);

    expect(screen.getByLabelText('Previous')).toBeInTheDocument();
    expect(screen.getByLabelText('Previous')).toBeDisabled();

    expect(screen.getByLabelText('Next')).toBeInTheDocument();
    expect(screen.getByLabelText('Next')).not.toBeDisabled();

    expect(screen.getAllByRole('button', { name: /^[0-9]+$/ })).toHaveLength(5);
  });

  test('highlights the current page as active', () => {
    render(<Pagination currentPage={2} totalPages={5} setCurrentPage={mockSetCurrentPage} />);
  
    const activePageItem = screen.getByText('3').closest('li');
    expect(activePageItem).toHaveClass('active');
  });

  test('disables "Previous" button on the first page', () => {
    render(<Pagination currentPage={0} totalPages={5} setCurrentPage={mockSetCurrentPage} />);

    const previousButton = screen.getByLabelText('Previous');
    expect(previousButton).toBeDisabled();
  });

  test('disables "Next" button on the last page', () => {
    render(<Pagination currentPage={4} totalPages={5} setCurrentPage={mockSetCurrentPage} />);

    const nextButton = screen.getByLabelText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('calls setCurrentPage when a page button is clicked', () => {
    render(<Pagination currentPage={0} totalPages={5} setCurrentPage={mockSetCurrentPage} />);

    const pageButton = screen.getByRole('button', { name: '3' });
    fireEvent.click(pageButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  test('calls setCurrentPage with correct value when "Next" and "Previous" are clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} setCurrentPage={mockSetCurrentPage} />);

    const previousButton = screen.getByLabelText('Previous');
    fireEvent.click(previousButton);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);

    const nextButton = screen.getByLabelText('Next');
    fireEvent.click(nextButton);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });
});
