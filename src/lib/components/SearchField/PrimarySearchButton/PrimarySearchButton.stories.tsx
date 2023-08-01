// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { action } from '@storybook/addon-actions';
import PrimarySearchButton from './PrimarySearchButton';
import { createMeta, createTemplate } from '../../../story-utils';
import { buttonBaseStoryArgs } from '../../ButtonBase';

const Template = createTemplate(PrimarySearchButton);

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  onClick: action('onClick'),
  size: 'xs',
};

WithoutIcon.storyName = 'iconOnly';

export const WithLabel = Template.bind({});
WithLabel.args = {
  onClick: action('onClick'),
  label: 'Label',
  size: 'xs',
};

WithLabel.storyName = 'iconWithLabel';

export default createMeta({
  component: PrimarySearchButton,
  title: 'Components/SearchFields/PrimarySearchButton',
  argTypes: {
    onClick: {
      control: { disable: true },
    },
    icon: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Icon with FontAwesome definition' },
      },
    },
    ...buttonBaseStoryArgs,
  },
});
