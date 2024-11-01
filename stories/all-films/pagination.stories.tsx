import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Pagination, { PaginationProps } from '../../app/all-films/components/pagination/pagination';
export default {
  title: 'AllFilms/Pagination',
  component: Pagination,
  argTypes: {
    currentPage: { control: 'number', description: 'Página atual sendo exibida' },
    totalPages: { control: 'number', description: 'Total de páginas' },
    setCurrentPage: { action: 'setCurrentPage', description: 'Função para mudar a página atual' },
  },
} as Meta;

const Template: StoryFn<PaginationProps> = (args) => <Pagination {...args} />;

export const FirstPage = Template.bind({});
FirstPage.args = {
  currentPage: 0,
  totalPages: 5,
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
  currentPage: 2,
  totalPages: 5,
};

export const LastPage = Template.bind({});
LastPage.args = {
  currentPage: 4,
  totalPages: 5,
};
