import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ProducersWinInterval from '../../app/dashboard/components/producers-win-interval/producers-win-interval';
import { ProducersWinIntervalResponse } from '../../app/types/movies.type';

const mockData: ProducersWinIntervalResponse = {
  min: [
    { producer: 'Producer A', interval: 1, previousWin: 1990, followingWin: 1991 },
    { producer: 'Producer B', interval: 2, previousWin: 2000, followingWin: 2002 },
  ],
  max: [
    { producer: 'Producer C', interval: 13, previousWin: 1985, followingWin: 1998 },
    { producer: 'Producer D', interval: 10, previousWin: 1995, followingWin: 2005 },
  ],
};

export default {
  title: 'Dashboard/ProducersWinInterval',
  component: ProducersWinInterval,
  parameters: {
    controls: { expanded: true },
  },
} as Meta;

const Template: StoryFn = () => <ProducersWinInterval />;

export const Default = Template.bind({});
Default.args = {
  ...mockData,
};

function setData(mockData: ProducersWinIntervalResponse) {
    throw new Error('Function not implemented.');
}

