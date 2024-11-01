import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import YearsWithMultipleWinners from '../../app/dashboard/components/years-with-multiple-winners/years-with-multiple-winners';
import { YearWithWinner } from '../../app/types/movies.type';

const mockYears: YearWithWinner[] = [
  { year: 1986, winnerCount: 2 },
  { year: 1990, winnerCount: 3 },
  { year: 2015, winnerCount: 2 },
];

export default {
  title: 'Dashboard/YearsWithMultipleWinners',
  component: YearsWithMultipleWinners,
} as Meta;

const Template: StoryFn = (args) => <YearsWithMultipleWinners {...args} />;

export const Default = Template.bind({});
Default.args = {};

Default.decorators = [
  (Story) => {
    const [years, setYears] = React.useState<YearWithWinner[]>([]);

    React.useEffect(() => {
      setYears(mockYears);
    }, []);

    return <Story />;
  },
];
