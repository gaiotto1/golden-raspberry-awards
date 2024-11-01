import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TopStudiosWithWinners from '../../app/dashboard/components/top-studios-with-winners/top-studios-with-winners';
import { Studio } from '../../app/types/movies.type';


const mockStudios: Studio[] = [
  { name: 'Studio A', winCount: 10 },
  { name: 'Studio B', winCount: 8 },
  { name: 'Studio C', winCount: 5 },
];

export default {
  title: 'Dashboard/TopStudiosWithWinners',
  component: TopStudiosWithWinners,
} as Meta;

const Template: StoryFn = (args) => <TopStudiosWithWinners {...args} />;

export const Default = Template.bind({});
Default.args = {
  studios: mockStudios,
};


Default.decorators = [
  (Story) => {
    const [studios, setStudios] = React.useState<Studio[]>([]);

    React.useEffect(() => {
      setStudios(mockStudios);
    }, []);

    return <Story />;
  },
];
