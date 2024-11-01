import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../page';

describe('Dashboard', () => {
  test('renders Dashboard title and all sections', () => {
    render(<Dashboard />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('List years with multiple winners')).toBeInTheDocument();
    expect(screen.getByText('Top 3 studios with winners')).toBeInTheDocument();
    expect(screen.getByText('Producers with longest and shortest interval between wins')).toBeInTheDocument();
    expect(screen.getByText('List movie winners by year')).toBeInTheDocument();
  });
});
