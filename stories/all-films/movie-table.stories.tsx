import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import MovieTable from '../../app/all-films/components/movie-table/movie-table';
import { Movie } from '../../app/types/movies.type';

export default {
  title: 'AllFilms/MovieTable',
  component: MovieTable,
  argTypes: {
    movies: { control: 'object', description: 'Lista de filmes a ser exibida na tabela' },
  },
} as Meta;

const Template: StoryFn<{ movies: Movie[] }> = (args) => <MovieTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  movies: [
    {
      id: 1,
      year: 2021,
      title: 'Film A',
      studios: ['Studio A'],
      producers: ['Producer A', 'Producer B'],
      winner: true,
    },
    {
      id: 2,
      year: 2020,
      title: 'Film B',
      studios: ['Studio B'],
      producers: ['Producer C'],
      winner: false,
    },
    {
      id: 3,
      year: 2019,
      title: 'Film C',
      studios: ['Studio C'],
      producers: ['Producer D', 'Producer E'],
      winner: true,
    },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  movies: [],
};
