import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import WinnersByYear from '../../app/dashboard/components/winners-by-year/winners-by-year';
import { Movie } from '../../app/types/movies.type';

const mockMovies: Movie[] = [
  { id: 1, year: 2021, title: 'Film A', studios: ['Studio A'], producers: ['Producer A'], winner: true },
  { id: 2, year: 2021, title: 'Film B', studios: ['Studio B'], producers: ['Producer B'], winner: true },
];

export default {
  title: 'Dashboard/WinnersByYear',
  component: WinnersByYear,
} as Meta;

const Template: StoryFn = (args) => <WinnersByYear {...args} />;

export const Default = Template.bind({});
Default.args = {};

Default.decorators = [
  (Story) => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [year, setYear] = React.useState('2021');
    const [error, setError] = React.useState<string | null>(null);

    const handleSearch = () => {
      if (!/^\d{4}$/.test(year)) {
        setError('Please enter a valid 4-digit year.');
        return;
      }
      setError(null);
      setMovies(mockMovies);
    };

    return (
      <div>
        <Story />
        <WinnersByYear />
      </div>
    );
  },
];
