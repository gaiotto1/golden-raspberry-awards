import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Menu from '../../app/components/sidebar/menu';

export default {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {
  },
} as Meta;

const Template: StoryFn = (args) => <Menu {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  viewport: {
    defaultViewport: 'responsive',
  },
};

export const Collapsed = Template.bind({});
Collapsed.play = async ({ canvasElement }) => {
  const toggleButton = canvasElement.querySelector('button');
  toggleButton && toggleButton.click();
};
Collapsed.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
