import React from 'react';
import { action } from '@storybook/addon-actions';
import { createTemplate, createMeta } from '../../../story-utils';
import { Pen, Times } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import Chip from './Chip';

const Template = createTemplate(Chip);

export const Primitive = Template.bind({});
Primitive.args = {
  label: 'Label',
  onClick: action('onClick'),
  disabled: false,
};
Primitive.storyName = 'noIcon';

export const StartIcon = Template.bind({});

StartIcon.args = {
  ...Primitive.args,
  startIcon: <Icon icon={Pen} />,
};
StartIcon.storyName = 'startIcon';

export const EndIcon = Template.bind({});
EndIcon.args = {
  ...Primitive.args,
  endIcon: <Icon icon={Times} />,
  onEndIconClick: () => {},
};
EndIcon.storyName = 'endIcon';

export default createMeta({
  component: Chip,
  title: 'Components/Chips/Chip',
  argTypes: {
    onClick: {
      action: { argTypesRegex: '^on.*' },
      control: { disable: true },
      table: {
        type: {
          summary: '(event: any) => void',
        },
      },
    },
    onEndIconClick: {
      action: { argTypesRegex: '^on.*' },
      control: { disable: true },
      table: {
        type: {
          summary: '(event: any) => void',
        },
      },
    },
    startIcon: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Icon with FontAwesome definition' },
      },
    },
    endIcon: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'Icon with FontAwesome definition' },
      },
    },
    buttonProps: {
      table: {
        disable: true,
      },
    },
    endButtonProps: {
      table: {
        disable: true,
      },
    },
  },
});
