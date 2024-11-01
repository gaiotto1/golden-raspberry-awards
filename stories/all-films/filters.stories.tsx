import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Filters from '../../app/all-films/components/filters/filters';

export default {
  title: 'AllFilms/Filters',
  component: Filters,
  argTypes: {
    yearFilter: { control: 'text', description: 'O filtro de ano inserido pelo usuário' },
    winnerFilter: { 
      control: 'select',
      options: ['', 'true', 'false'],
      description: 'Define se o filtro é para vencedores ou não'
    },
    setYearFilter: { action: 'setYearFilter', description: 'Atualiza o filtro de ano' },
    setWinnerFilter: { action: 'setWinnerFilter', description: 'Atualiza o filtro de vencedores' },
  },
} as Meta;

const Template: StoryFn = (args) => <Filters yearFilter={''} winnerFilter={''} setYearFilter={() => {}} setWinnerFilter={() => {}} {...args} />;

export const Default = Template.bind({});
Default.args = {
  yearFilter: '',
  winnerFilter: '',
};

export const WithYearFilter = Template.bind({});
WithYearFilter.args = {
  yearFilter: '2022',
  winnerFilter: '',
};

export const WithWinnerFilter = Template.bind({});
WithWinnerFilter.args = {
  yearFilter: '',
  winnerFilter: 'true',
};

export const WithBothFilters = Template.bind({});
WithBothFilters.args = {
  yearFilter: '2022',
  winnerFilter: 'true',
};
