import React from 'react';
import { createMeta, createTemplate } from '../../../story-utils';
import { buttonBaseStoryArgs } from '../../ButtonBase';
import { AngleLeft, AngleRight } from '../../Icon/icons/functional';
import Icon from '../../Icon';
import Button from './Button';

const Template = createTemplate(Button);

const Primitive = Template.bind({});

Primitive.args = {
  label: 'Label',
  variant: 'primary',
  type: 'button',
  size: 'md',
  fullWidth: false,
  disabled: false,
  isLoading: false,
  buttonProps: { 'data-testid': 'test' },
};

export const None = Template.bind({});
None.args = {
  ...Primitive.args,
};

None.storyName = 'none';

export const StartIcon = Template.bind({});
StartIcon.args = {
  ...Primitive.args,
  startIcon: <Icon icon={AngleLeft} />,
};

StartIcon.storyName = 'startIcon';

export const EndIcon = Template.bind({});
EndIcon.args = {
  ...Primitive.args,
  endIcon: <Icon icon={AngleRight} />,
};

EndIcon.storyName = 'endIcon';

export default createMeta({
  component: Button,
  title: 'Components/Buttons/Button',
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
        type: { summary: 'Icon FontAwesome definition' },
      },
    },
    ...buttonBaseStoryArgs,
  },
});
