import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Menu from '../menu';

describe('Menu', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth });
  });

  test('renders Menu component with expanded state by default on large screens', () => {
    render(<Menu />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('All Films')).toBeInTheDocument();
  });

  test('collapses menu on initial render if window width is less than 900px', () => {
    Object.defineProperty(window, 'innerWidth', { value: 800 });
    render(<Menu />);

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('All Films')).not.toBeInTheDocument();
  });

  test('toggles menu on button click', () => {
    render(<Menu />);

    const toggleButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(toggleButton);

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('All Films')).not.toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('All Films')).toBeInTheDocument();
  });

  test('collapses menu on window resize below 900px', () => {
    render(<Menu />);

    fireEvent.resize(window, { target: { innerWidth: 800 } });

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('All Films')).not.toBeInTheDocument();
  });

  test('renders navigation links correctly', () => {
    render(<Menu />);
    const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });
    const allFilmsLink = screen.getByRole('link', { name: /All Films/i });

    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    expect(allFilmsLink).toHaveAttribute('href', '/all-films');
  });
});
